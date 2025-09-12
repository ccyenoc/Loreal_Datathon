import os
import re
import ast
import numpy as np
import pandas as pd
import torch
from transformers import AutoTokenizer, AutoModel
from tqdm import tqdm
import umap
import hdbscan
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import matplotlib.pyplot as plt
from statsmodels.tsa.holtwinters import ExponentialSmoothing
import json

# =============== 0. GLOBAL SETTINGS ===============
MODEL_NAME = "sentence-transformers/all-MiniLM-L6-v2"
CACHE_FILE = "videos_with_embeddings.pkl"
FORECAST_HORIZON_MONTHS = 6

def deduplicate_keywords(df_keywords, tokenizer, model, device, threshold=0.9):
    """
    Remove near-duplicate keywords using embeddings + cosine similarity.
    """
    import numpy as np
    from sklearn.metrics.pairwise import cosine_similarity

    # Normalize keywords
    df_keywords["normalized_kw"] = (
        df_keywords["keywords"]
        .str.lower()
        .str.strip()
        .str.replace(r"\bdescription\b", "", regex=True)
        .str.replace(r"\s+", " ", regex=True)
    )

    unique_keywords = df_keywords["normalized_kw"].unique().tolist()
    embeddings = embed(unique_keywords, tokenizer, model, device).numpy()

    sims = cosine_similarity(embeddings)

    keep = set()
    seen = set()
    for i, kw in enumerate(unique_keywords):
        if kw in seen:
            continue
        keep.add(kw)
        dupes = np.where(sims[i] >= threshold)[0]
        for j in dupes:
            seen.add(unique_keywords[j])

    df_keywords = df_keywords[df_keywords["normalized_kw"].isin(keep)].copy()
    return df_keywords.drop(columns=["normalized_kw"])



# =============== 1. LOAD & CLEAN DATA ===============
def load_data(path: str) -> pd.DataFrame:
    df = pd.read_csv(path)
    if "videoId" not in df.columns:
        df = df.reset_index().rename(columns={"index": "videoId"})
    return df


def safe_join_tags(x):
    if isinstance(x, str):
        try:
            return " ".join(ast.literal_eval(x))
        except Exception:
            return x
    return ""


def clean_text(text: str) -> str:
    text = text.lower()
    text = re.sub(r"http\S+|www\S+|https\S+", "", text)
    text = re.sub(r"\S+@\S+", "", text)
    text = re.sub(r"[^a-z0-9#\s]", " ", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text


def prepare_text(df: pd.DataFrame) -> pd.DataFrame:
    df["text"] = (
        df["title"].fillna("")
        + " "
        + df["description"].fillna("")
        + " "
        + df["tags"].apply(safe_join_tags)
    )
    df["clean_text"] = df["text"].apply(clean_text)
    return df


# =============== 2. EMBEDDINGS ===============
def load_model():
    tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
    model = AutoModel.from_pretrained(MODEL_NAME)

    if torch.backends.mps.is_available():
        device = torch.device("mps")
    elif torch.cuda.is_available():
        device = torch.device("cuda")
    else:
        device = torch.device("cpu")

    return tokenizer, model.to(device), device


def embed(texts, tokenizer, model, device, batch_size=128, max_length=128):
    all_embeddings = []
    for i in tqdm(range(0, len(texts), batch_size), desc="Embedding batches"):
        batch = texts[i : i + batch_size]
        encoded = tokenizer(
            batch,
            padding=True,
            truncation=True,
            max_length=max_length,
            return_tensors="pt",
        ).to(device)
        with torch.no_grad():
            model_output = model(**encoded)
        batch_embeddings = model_output.last_hidden_state.mean(dim=1)
        all_embeddings.append(batch_embeddings.cpu())
    return torch.cat(all_embeddings)


def get_embeddings(df, tokenizer, model, device) -> pd.DataFrame:
    if os.path.exists(CACHE_FILE):
        print("⚡ Loading cached embeddings...")
        df = pd.read_pickle(CACHE_FILE)
    else:
        print("🚀 Generating embeddings...")
        embeddings = embed(df["clean_text"].tolist(), tokenizer, model, device)
        df["embedding"] = embeddings.tolist()
        df.to_pickle(CACHE_FILE)
        print("✅ Embeddings saved!")
    return df


# =============== 3. CLUSTERING & KEYWORDS ===============
def cluster_embeddings(
    df, n_neighbors=15, n_components=50, min_cluster_size=5, chunk_size=5000
):
    embeddings_array = np.array(df["embedding"].tolist())
    all_umap_embeddings = []

    for start in range(0, len(embeddings_array), chunk_size):
        end = min(start + chunk_size, len(embeddings_array))
        print(f"Processing embeddings {start} to {end} ...")
        reducer = umap.UMAP(
            n_neighbors=n_neighbors,
            n_components=n_components,
            metric="euclidean",
            random_state=42,
        )
        chunk_umap = reducer.fit_transform(embeddings_array[start:end])
        all_umap_embeddings.append(chunk_umap)

    embeddings_umap_full = np.vstack(all_umap_embeddings)
    print("UMAP reduction done:", embeddings_umap_full.shape)

    clusterer = hdbscan.HDBSCAN(min_cluster_size=min_cluster_size, metric="euclidean")
    df["cluster"] = clusterer.fit_predict(embeddings_umap_full)
    print("HDBSCAN clustering done.")
    return df


def extract_keywords(df):
    cluster_keywords = {}
    for cluster_id in sorted(df["cluster"].unique()):
        cluster_texts = df[df["cluster"] == cluster_id]["clean_text"]
        if len(cluster_texts) == 0:
            continue
        vectorizer = TfidfVectorizer(
            stop_words="english", max_features=10, ngram_range=(1, 3)
        )
        vectorizer.fit(cluster_texts)
        cluster_keywords[cluster_id] = vectorizer.get_feature_names_out().tolist()

    df["keywords"] = df["cluster"].map(cluster_keywords)
    df_keywords = df.explode("keywords").reset_index(drop=True)
    return df_keywords[df_keywords["keywords"].notna()]


# =============== 4. CATEGORY MAPPING ===============
def map_keywords_to_categories(df_keywords, tokenizer, model, device, base_confidence=0.5):
    categories = [
        "Makeup & Cosmetics",
        "Hair Transformations & Makeovers",
        "Beauty Reviews & Brands",
        "Facial Care & Exercises",
        "Hair Styling & Men's Grooming",
        "Skincare & Anti-Aging",
        "Men's Fashion & Style",
        "Hair Coloring & Transformation",
        "Vlogs & Lifestyle",
    ]

    # Embed categories + keywords
    category_embeddings = embed(categories, tokenizer, model, device).numpy()
    keyword_list = df_keywords["keywords"].unique().tolist()
    keyword_embeddings = embed(keyword_list, tokenizer, model, device).numpy()

    # Compute similarities
    similarities = cosine_similarity(keyword_embeddings, category_embeddings)
    best_matches = similarities.argmax(axis=1)
    best_scores = similarities.max(axis=1)

    # Map keywords to categories
    keyword_to_category = {kw: categories[idx] for kw, idx in zip(keyword_list, best_matches)}
    keyword_to_conf = dict(zip(keyword_list, best_scores))

    df_keywords["category"] = df_keywords["keywords"].map(keyword_to_category)
    df_keywords["category_confidence"] = df_keywords["keywords"].map(keyword_to_conf)

    # Dynamic threshold per category
    df_keywords = df_keywords.groupby("category").apply(
        lambda g: g[
            g["category_confidence"] >= max(base_confidence, g["category_confidence"].quantile(0.25))
        ]
    ).reset_index(drop=True)

    # Map generic terms to General Beauty & Buzzwords
    generic_terms = {"beauty", "makeup", "skincare", "haircare", "tutorial", "review", "tips", "style"}
    df_keywords.loc[df_keywords["keywords"].isin(generic_terms), "category"] = "General Beauty & Buzzwords"

    # Remove noisy keywords like 'no_data'
    df_keywords = df_keywords[~df_keywords["keywords"].str.contains("no_data", case=False, na=False)].copy()

    return df_keywords


# =============== 5. REPORTING ===============
def category_summary(df_keywords):
    summary = (
        df_keywords.groupby("category")
        .agg(
            {
                "videoId": "count",
                "viewCount": "mean",
                "likeCount": "mean",
                "commentCount": "mean",
                "engagement_rate": "mean",
            }
        )
        .rename(columns={"videoId": "Num_Videos"})
        .sort_values("Num_Videos", ascending=False)
    )

    summary.to_csv("../outputs/category_trends.csv")
    print("✅ category_trends.csv saved!")
    return summary


# =============== 6. FORECASTING ===============
def forecast_keyword(keyword, df, periods=6):
    """Forecast trend for a single keyword."""
    df_kw = df[df["keywords"] == keyword].copy()
    if df_kw.empty:
        return {"keyword": keyword, "trend": "no_data", "growth_rate": 0}

    df_kw["publishedAt"] = pd.to_datetime(df_kw["publishedAt"], errors="coerce")
    df_kw = (
        df_kw.set_index("publishedAt")
        .resample("M")
        .size()
        .reset_index(name="count")
    )
    if len(df_kw) < 6:
        return {"keyword": keyword, "trend": "no_data", "growth_rate": 0}

    try:
        model = ExponentialSmoothing(df_kw["count"], trend="add", seasonal=None)
        fit = model.fit()
        forecast = fit.forecast(periods)
    except Exception as e:
        print(f"⚠️ Forecast failed for {keyword}: {e}")
        return {"keyword": keyword, "trend": "error", "growth_rate": 0}

    last_actual = df_kw["count"].iloc[-1]
    last_forecast = forecast.iloc[-1]
    growth_rate = (last_forecast - last_actual) / (last_actual + 1e-6)

    if growth_rate > 0.1:
        trend = "up"
    elif growth_rate < -0.1:
        trend = "down"
    else:
        trend = "stable"

    return {"keyword": keyword, "trend": trend, "growth_rate": float(growth_rate)}


def forecast_keywords_by_category(df_keywords, periods=6, top_n=10):
    """Forecast trending keywords grouped by category."""
    results = []

    for category in df_keywords["category"].unique():
        df_cat = df_keywords[df_keywords["category"] == category]
        keywords = df_cat["keywords"].unique().tolist()

        keyword_trends = []
        for kw in keywords:
            kw_result = forecast_keyword(kw, df_cat, periods=periods)
            keyword_trends.append(kw_result)

        # sort by growth_rate, keep only top_n
        keyword_trends = sorted(keyword_trends, key=lambda x: x["growth_rate"], reverse=True)[:top_n]

        results.append({
            "category": category,
            "keywords": keyword_trends
        })

    return results


# =============== MAIN PIPELINE ===============
def main():
    # 1. Load & prepare data
    df = load_data("../data/cleaned_videos.csv")
    df["publishedAt"] = pd.to_datetime(df["publishedAt"], errors="coerce")
    df = prepare_text(df)

    # 2. Load model
    tokenizer, model, device = load_model()

    # 3. Generate embeddings
    df = get_embeddings(df, tokenizer, model, device)

    # 4. Cluster & extract keywords
    df = cluster_embeddings(df)
    df_keywords = extract_keywords(df)

    # 5. Map categories & deduplicate keywords
    df_keywords = map_keywords_to_categories(df_keywords, tokenizer, model, device)
    df_keywords = deduplicate_keywords(df_keywords, tokenizer, model, device)

    # 6. Reporting
    summary = category_summary(df_keywords)
    print(summary.head())

    # 7. Forecast keyword trends
    keyword_trend_insights = forecast_keywords_by_category(
        df_keywords, periods=FORECAST_HORIZON_MONTHS, top_n=10
    )

    # 8. Save keyword trends
    with open("../outputs/keyword_trend_insights.json", "w") as f:
        json.dump(keyword_trend_insights, f, indent=2)

    print("✅ keyword_trend_insights.json saved!")

if __name__ == "__main__":
    main()
