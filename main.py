import pandas as pd
import torch
from transformers import AutoTokenizer, AutoModel
import re
import ast
from tqdm import tqdm
import os
import umap
import hdbscan
import numpy as np
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer


# --------------------
# 1️⃣ Load your data
# --------------------
df = pd.read_csv("src/cleaned_videos.csv")

if 'video_id' not in df.columns:
    df = df.reset_index().rename(columns={'index': 'video_id'})

# --------------------
# 2️⃣ Combine title + description + tags
# --------------------
def safe_join_tags(x):
    if isinstance(x, str):
        try:
            return " ".join(ast.literal_eval(x))
        except Exception:
            return x
    return ""

df["text"] = (
    df["title"].fillna("") + " " +
    df["description"].fillna("") + " " +
    df["tags"].apply(safe_join_tags)
)

# Clean text
def clean_text(text):
    text = text.lower()
    text = re.sub(r"http\S+|www\S+|https\S+", "", text)  # remove URLs
    text = re.sub(r"\S+@\S+", "", text)  # remove emails
    text = re.sub(r"[^a-z0-9#\s]", " ", text)  # keep alphanumeric + hashtags
    text = re.sub(r"\s+", " ", text).strip()
    return text

df["clean_text"] = df["text"].apply(clean_text)

# --------------------
# 3️⃣ Load model + tokenizer
# --------------------
model_name = "sentence-transformers/all-MiniLM-L6-v2"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModel.from_pretrained(model_name)

# Detect best device
if torch.backends.mps.is_available():
    device = torch.device("mps")
elif torch.cuda.is_available():
    device = torch.device("cuda")
else:
    device = torch.device("cpu")
model = model.to(device)
print(f"Using device: {device}")

# --------------------
# 4️⃣ Embedding function
# --------------------
def embed(texts, batch_size=128, max_length=128):
    all_embeddings = []
    for i in tqdm(range(0, len(texts), batch_size), desc="Embedding batches"):
        batch = texts[i:i+batch_size]
        encoded_input = tokenizer(
            batch,
            padding=True,
            truncation=True,
            max_length=max_length,
            return_tensors="pt"
        ).to(device)
        with torch.no_grad():
            model_output = model(**encoded_input)
        batch_embeddings = model_output.last_hidden_state.mean(dim=1)
        all_embeddings.append(batch_embeddings.cpu())
    return torch.cat(all_embeddings)

# --------------------
# 5️⃣ Run embeddings (with caching)
# --------------------
if os.path.exists("videos_with_embeddings.pkl"):
    print("⚡ Loading cached embeddings...")
    df = pd.read_pickle("videos_with_embeddings.pkl")
else:
    print("🚀 Generating embeddings...")
    embeddings = embed(df["clean_text"].tolist())
    df["embedding"] = embeddings.tolist()
    df.to_pickle("videos_with_embeddings.pkl")
    print("✅ Embeddings saved!")

# --------------------
# 6️⃣ Dimensionality reduction + clustering
# --------------------
embeddings_array = np.array(df["embedding"].tolist())

# UMAP parameters
umap_n_neighbors = 15
umap_n_components = 50
chunk_size = 5000

all_umap_embeddings = []
for start in range(0, len(embeddings_array), chunk_size):
    end = min(start + chunk_size, len(embeddings_array))
    print(f"Processing embeddings {start} to {end} ...")
    chunk = embeddings_array[start:end]
    reducer = umap.UMAP(
        n_neighbors=umap_n_neighbors,
        n_components=umap_n_components,
        metric='euclidean',
        random_state=42
    )
    embeddings_umap = reducer.fit_transform(chunk)
    all_umap_embeddings.append(embeddings_umap)

embeddings_umap_full = np.vstack(all_umap_embeddings)
print("UMAP reduction done:", embeddings_umap_full.shape)

# HDBSCAN clustering
clusterer = hdbscan.HDBSCAN(min_cluster_size=5, metric='euclidean')
df['cluster'] = clusterer.fit_predict(embeddings_umap_full)
print("HDBSCAN clustering done.")
num_clusters = len(set(df['cluster'])) - (1 if -1 in df['cluster'] else 0)
print("Number of clusters found:", num_clusters)

# --------------------
# 7️⃣ Extract top keywords per cluster
# --------------------
cluster_keywords = {}
for cluster_id in sorted(df['cluster'].unique()):
    cluster_texts = df[df['cluster'] == cluster_id]['clean_text']
    if len(cluster_texts) == 0:
        continue

    # Use TF-IDF with 1-3 word ngrams
    vectorizer = TfidfVectorizer(
        stop_words='english',
        max_features=10,      # top 10 keywords/phrases per cluster
        ngram_range=(1,3)     # single, 2-word, 3-word phrases
    )
    X = vectorizer.fit_transform(cluster_texts)
    cluster_keywords[cluster_id] = vectorizer.get_feature_names_out().tolist()

# Map keywords back to videos
df['keywords'] = df['cluster'].map(cluster_keywords)
df_keywords = df.explode('keywords').reset_index(drop=True)
df_keywords = df_keywords[df_keywords['keywords'].notna()]  # remove empty keywords

# --------------------
# 8️⃣ Define categories (business-level)
# --------------------
categories = [
    "Makeup & Cosmetics",
    "Hair Transformations & Makeovers",
    "Beauty Reviews & Brands",
    "Facial Care & Exercises",
    "Hair Styling & Men's Grooming",
    "Skincare & Anti-Aging",
    "Men's Fashion & Style",
    "Hair Coloring & Transformation",
    "Vlogs & Lifestyle"
]

# --------------------
# 9️⃣ Embed categories + keywords
# --------------------
print("🚀 Embedding categories...")
category_embeddings = embed(categories).numpy()

print("🚀 Embedding keywords...")
keyword_list = df_keywords['keywords'].unique().tolist()
keyword_embeddings = embed(keyword_list).numpy()

# --------------------
# 🔟 Assign category per keyword (with confidence)
# --------------------
similarities = cosine_similarity(keyword_embeddings, category_embeddings)
best_matches = similarities.argmax(axis=1)      # index of closest category
best_scores = similarities.max(axis=1)          # similarity confidence

# Build mapping
keyword_to_category_auto = {
    keyword: categories[idx] for keyword, idx in zip(keyword_list, best_matches)
}
keyword_to_confidence = dict(zip(keyword_list, best_scores))

# Map back into df_keywords
df_keywords['category'] = df_keywords['keywords'].map(keyword_to_category_auto)
df_keywords['category_confidence'] = df_keywords['keywords'].map(keyword_to_confidence)

# Optional: filter low-confidence matches
confidence_threshold = 0.5
df_keywords.loc[df_keywords['category_confidence'] < confidence_threshold, 'category'] = "Uncategorized"

# --------------------
# 1️⃣1️⃣ Aggregate metrics at category level
# --------------------
category_trends = df_keywords.groupby('category').agg({
    'videoId': 'count',        
    'viewCount': 'mean',       
    'likeCount': 'mean',       
    'commentCount': 'mean',    
    'engagement_rate': 'mean'  
}).rename(columns={'videoId': 'Num_Videos'}).sort_values(by='Num_Videos', ascending=False)

print(category_trends)
print(category_trends.head())

# --------------------
# 1️⃣2️⃣ Trend report per category
# --------------------
print("\n====== 📊 TREND REPORT PER CATEGORY ======\n")

for category, group in df_keywords.groupby("category"):
    print(f"📌 {category} — {len(group)} videos")
    
    # Top 10 keywords by frequency
    top_keywords = group["keywords"].value_counts().head(10)
    print("   🔑 Top Keywords:")
    for kw, count in top_keywords.items():
        print(f"      - {kw} ({count} videos)")
    
    # Category-level averages (already computed, but per category subset)
    avg_views = group["viewCount"].mean()
    avg_likes = group["likeCount"].mean()
    avg_comments = group["commentCount"].mean()
    avg_engagement = group["engagement_rate"].mean()
    
    print(f"   👀 Avg Views: {avg_views:,.0f}")
    print(f"   👍 Avg Likes: {avg_likes:,.2f}")
    print(f"   💬 Avg Comments: {avg_comments:,.2f}")
    print(f"   📈 Engagement Rate: {avg_engagement:.4f}")
    print("-" * 50)

# Export category-level summary
category_trends.to_csv("category_trends.csv", index=True)
print("✅ category_trends.csv saved!")

# Compute category-level averages
category_summary = df_keywords.groupby('category').agg({
    'viewCount': 'mean',
    'likeCount': 'mean',
    'commentCount': 'mean',
    'engagement_rate': 'mean'
}).rename(columns={
    'viewCount': 'avg_views',
    'likeCount': 'avg_likes',
    'commentCount': 'avg_comments',
    'engagement_rate': 'avg_engagement_rate'
})

# Merge category averages into df_keywords
df_keywords = df_keywords.merge(category_summary, on='category', how='left')

# Columns to save
columns_to_save = [
    "videoId", "title", "description", "tags", "clean_text",
    "keywords", "category", "category_confidence",
    "viewCount", "likeCount", "commentCount", "engagement_rate",
    "avg_views", "avg_likes", "avg_comments", "avg_engagement_rate"
]

# Save per-category CSV with averages
for category, group in df_keywords.groupby('category'):
    filename = category.replace("&", "and").replace(" ", "_") + ".csv"
    group[columns_to_save].to_csv(filename, index=False)
    print(f"✅ Saved {filename} with {len(group)} rows")
