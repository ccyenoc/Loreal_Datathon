# 🧠 Beauty Scope Backend - AI Intelligence Engine

The backend component of Beauty Scope, a powerful Flask-based API that processes beauty content data, performs machine learning analysis, and provides intelligent insights through advanced natural language processing and trend prediction algorithms.

## 🚀 Quick Start

### Prerequisites
- **Python 3.8+** (recommended: Python 3.9 or 3.10)
- **pip** package manager
- **Google API Key** for Gemini AI integration
- **Git** for version control

### Installation & Setup

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Create a virtual environment (recommended):**
   ```bash
   # Windows
   python -m venv venv
   venv\Scripts\activate

   # macOS/Linux
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables:**
   Create a `.env` file in the backend directory:
   ```env
   GOOGLE_API_KEY=your_gemini_api_key_here
   FLASK_ENV=development
   FLASK_DEBUG=True
   ```

5. **Start the Flask API server:**
   ```bash
   python api.py
   ```

6. **Verify the server:**
   The API will be available at `http://localhost:5000`
   Test with: `curl http://localhost:5000/api/categories`

### Production Deployment

```bash
# Set production environment
export FLASK_ENV=production
export FLASK_DEBUG=False

# Run with production settings
python api.py
```

## 📁 Project Architecture

```
backend/
├── 🐍 api.py                      # Main Flask application & API endpoints
├── 📋 requirements.txt            # Python dependencies
├── 🌍 .env                        # Environment variables (create this)
├── 📖 README.md                   # This documentation
│
├── 📊 first_layer_data/           # Raw Data Processing
│   └── 📄 cleaned_videos.csv      # Processed video dataset (10K+ videos)
│
├── 🧠 models/                     # ML Processing Pipeline
│   ├── 🎯 main.py                 # Core ML pipeline & data processing
│   └── 📚 [Generated Models]      # Trained clustering & classification models
│
├── 📚 notebook/                   # Jupyter Analysis Notebooks
│   ├── 📓 data_cleaning.ipynb              # Data preprocessing workflows
│   ├── 📊 Cluster_*.ipynb                  # Category-specific analysis (10 files)
│   └── 🎯 [Analysis Results]               # Clustering & trend analysis
│
├── 📈 outputs/                    # Generated Insights & Results
│   ├── 📋 category_trends.csv              # Category performance metrics
│   ├── 📄 keyword_trend_insights.json     # Keyword trend analysis
│   ├── 📊 trend_insights.json             # General trend patterns
│   └── 📄 category.csv                    # Category classification results
│
├── 🗂️ second_layer_data/          # Categorized Datasets
│   ├── 💄 Makeup_and_Cosmetics.csv        # Makeup & cosmetics content
│   ├── 🧴 Skincare_and_Anti-Aging.csv     # Skincare & anti-aging content
│   ├── 💇‍♀️ Hair_*.csv                      # Hair-related content (3 files)
│   ├── 👔 Men's_Fashion_and_Style.csv     # Men's grooming & fashion
│   ├── ⭐ Beauty_Reviews_and_Brands.csv   # Brand reviews & comparisons
│   ├── ✨ Facial_Care_and_Exercises.csv   # Facial care & exercises
│   ├── 🎯 General_Beauty_and_Buzzwords.csv # General beauty trends
│   └── 📹 Vlogs_and_Lifestyle.csv         # Lifestyle & vlog content
│
└── 🎯 third_layer_data/           # Trend Phase Analysis
    ├── 📊 *_keyword_trend_phases.csv      # Trend phase classifications (10 files)
    └── 🔍 [Predictive Models]             # Phase prediction algorithms
```

## 🛠️ API Endpoints

### 📊 Category Analysis

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/categories` | GET | Get category performance data with engagement metrics |
| `/api/category-breakdown` | GET | Detailed category breakdown with growth percentages |
| `/api/csv-data` | GET | Information about all category CSV files |
| `/api/csv-data/<category>` | GET | Specific category data and sample records |

### 📈 Trending Analysis

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/trending-keywords` | GET | Top 20 trending keywords across all categories |
| `/api/trend-analysis` | GET | Comprehensive trend analysis for trending page |
| `/api/trend-summary` | GET | Summary statistics for trending analysis |
| `/api/growth-chart` | GET | Monthly growth data for visualization |

### 🔍 Keyword Intelligence

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/keyword-checker` | POST | Smart keyword analysis with AI insights |
| `/api/keyword-trends-by-category` | GET | Keyword trends organized by category |

### 📋 Dashboard Metrics

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/metrics` | GET | Overview metrics for dashboard summary |

## 🤖 AI & Machine Learning Features

### 🧬 Semantic Analysis
- **Sentence Transformers**: `all-MiniLM-L6-v2` for semantic similarity
- **Cosine Similarity**: Keyword-to-category matching
- **Vector Embeddings**: High-dimensional semantic representation

### 🎯 Category Classification
- **10 Beauty Categories**: Automated content classification
- **UMAP Dimensionality Reduction**: Advanced clustering preparation
- **HDBSCAN Clustering**: Density-based category discovery
- **Statistical Validation**: Cluster quality metrics

### 📊 Trend Prediction
- **Time Series Analysis**: 3-month trend velocity calculations
- **Phase Classification**: 4-stage trend lifecycle (Emerging → Growing → Peaking → Decaying)
- **Engagement Modeling**: Popularity score algorithms
- **Growth Rate Prediction**: Statistical forecasting models

### 🧠 Google Gemini Integration
- **Natural Language Analysis**: AI-powered keyword insights
- **Strategic Recommendations**: Business intelligence generation
- **Trend Interpretation**: Context-aware trend analysis
- **Future Predictions**: AI-driven trend forecasting

## 🎯 Technology Stack

### Core Framework
- **Flask** - Lightweight web framework for APIs
- **Flask-CORS** - Cross-origin resource sharing support
- **Python 3.8+** - Modern Python with type hints

### Machine Learning
- **PyTorch** - Deep learning framework for advanced models
- **Transformers** - Hugging Face library for NLP models
- **Sentence Transformers** - Semantic similarity calculations
- **scikit-learn** - Classical ML algorithms and metrics
- **UMAP** - Advanced dimensionality reduction
- **HDBSCAN** - Density-based clustering algorithms

### Data Processing
- **Pandas** - Data manipulation and analysis
- **NumPy** - Numerical computing and array operations
- **Statsmodels** - Statistical modeling and time series
- **Matplotlib** - Data visualization and plotting

### AI Integration
- **LangChain** - AI application framework
- **Google Generative AI** - Gemini API integration
- **python-dotenv** - Environment variable management

### Development Tools
- **tqdm** - Progress bars for long-running operations
- **JSON** - Structured data serialization
- **CSV Processing** - Efficient data file handling

## 🔧 Configuration

### Environment Variables

The application requires the following environment variables in `.env`:

```env
# Required: Google AI API Key
GOOGLE_API_KEY=your_gemini_api_key_here

# Optional: Flask Configuration
FLASK_ENV=development
FLASK_DEBUG=True
FLASK_PORT=5000

# Optional: Model Configuration
MODEL_NAME=all-MiniLM-L6-v2
TEMPERATURE=0.7
```

## 🔍 Keyword Checker API

### Request Format
```json
POST /api/keyword-checker
{
  "keyword": "retinol serum"
}
```

### Response Format
```json
{
  "user_keyword": "retinol serum",
  "matched_category": "Skincare & Anti-Aging",
  "category_similarity": 0.847,
  "matched_keyword": "retinol treatment",
  "keyword_similarity": 0.923,
  "phase": "Growing",
  "velocity": 15.3,
  "engagement_rate": 0.0234,
  "future_trend": "Strong upward trajectory suggests continued growth...",
  "insights": [
    "Current engagement levels indicate active audience interest",
    "Velocity patterns reveal important momentum shifts"
  ],
  "recommendations": [
    "Monitor weekly mention patterns for early trend detection",
    "Develop targeted content strategies aligned with current trend phase"
  ]
}
```

## 🧪 Development & Testing

### Running the ML Pipeline
```bash
cd models
python main.py
```

### Testing API Endpoints
```bash
# Test category data
curl http://localhost:5000/api/categories

# Test keyword checker
curl -X POST http://localhost:5000/api/keyword-checker \
  -H "Content-Type: application/json" \
  -d '{"keyword": "vitamin c serum"}'

# Test trending analysis
curl http://localhost:5000/api/trend-analysis
```

### Data Validation
```bash
# Verify data file integrity
python -c "import pandas as pd; print(pd.read_csv('outputs/category_trends.csv').info())"

# Check API health
curl http://localhost:5000/api/metrics
```

## 🐛 Troubleshooting

### Common Issues

**ImportError: No module named 'transformers'**
```bash
pip install --upgrade transformers torch
```

**Google API Key Error**
```bash
# Verify .env file exists and contains valid API key
cat .env
# Restart Flask server after updating .env
```

**Memory Issues with Large Models**
```bash
# Use smaller model for development
export MODEL_NAME=all-MiniLM-L6-v2
# Increase system memory or use model quantization
```

**CORS Issues**
```bash
# Verify frontend URL in CORS_ORIGINS
# Update Flask-CORS configuration in api.py
```

**Data File Not Found**
```bash
# Verify data files exist:
ls -la outputs/
ls -la first_layer_data/
ls -la third_layer_data/
```

## 🚀 Production Deployment

### Docker Deployment
```dockerfile
FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 5000
CMD ["python", "api.py"]
```

### Cloud Deployment (Heroku)
```bash
# Create Procfile
echo "web: python api.py" > Procfile

# Deploy to Heroku
heroku create BeautyScope-backend
git push heroku main
```

### Environment Configuration
```bash
# Production environment variables
export FLASK_ENV=production
export GOOGLE_API_KEY=production_key
export PORT=5000
```

---

**Powered by AI for the future of beauty intelligence** 🚀✨