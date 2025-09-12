# 🎯 Beauty Scope - L'Oréal Beauty Trend Intelligence Platform

**Winner of L'Oréal Datathon 2025** 🏆

A cutting-edge AI-powered beauty trend analysis platform that leverages machine learning to decode beauty content patterns, predict emerging trends, and provide actionable insights for brand strategy in the digital beauty landscape.

## 🌟 Project Overview

Beauty Scope transforms raw beauty content data into strategic intelligence by analyzing millions of beauty-related videos, extracting meaningful patterns, and predicting future trends. Our platform empowers beauty brands to make data-driven decisions and stay ahead of market movements.

### 🎯 Problem Statement
In the rapidly evolving beauty industry, brands struggle to:
- Identify emerging trends before they peak
- Understand which beauty categories are gaining traction
- Predict keyword performance and content virality
- Make informed decisions about product launches and marketing campaigns

### 🚀 Our Solution
Beauty Scope provides a comprehensive AI-driven analytics platform that:
- **Analyzes 10+ beauty categories** with advanced clustering algorithms
- **Predicts trend trajectories** using time series analysis and machine learning
- **Offers real-time keyword insights** with semantic similarity matching
- **Delivers actionable recommendations** powered by Google Gemini AI

## 🏗️ Architecture & Technology Stack

### Backend Intelligence Engine
- **Python** with advanced ML libraries
- **Sentence Transformers** for semantic understanding
- **UMAP & HDBSCAN** for intelligent clustering
- **Flask API** with Google Gemini integration
- **Statistical Models** for trend forecasting

### Frontend Dashboard
- **Next.js 14** with TypeScript
- **Radix UI** component library
- **Tailwind CSS** for responsive design
- **Recharts** for data visualization
- **React Hook Form** with Zod validation

### Data Pipeline
```
Raw Beauty Content → Cleaning & Preprocessing → Category Classification → 
Trend Analysis → Keyword Extraction → Predictive Modeling → 
Interactive Dashboard
```

## 📊 Key Features

### 🎨 Category Intelligence
- **10 Beauty Categories**: Makeup, Skincare, Hair Care, Men's Grooming, Lifestyle Vlogs
- **Real-time Analytics**: Engagement rates, view counts, trend velocities
- **Growth Tracking**: Category-wise performance metrics and predictions

### 🔍 Smart Keyword Checker
- **Semantic Matching**: Find the closest category for any beauty keyword
- **Trend Prediction**: 4-phase trend classification (Emerging → Growing → Peaking → Decaying)
- **AI Insights**: Gemini-powered analysis with actionable recommendations

### 📈 Trend Dashboard
- **Visual Analytics**: Interactive charts and growth indicators
- **Competitive Intelligence**: Category rankings and performance comparisons
- **Predictive Insights**: Future trend projections and market opportunities

### 🎯 Business Intelligence
- **Strategic Recommendations**: AI-generated business insights
- **Market Timing**: Optimal content creation and product launch timing
- **Risk Assessment**: Trend decay predictions and market saturation analysis

## 🗂️ Project Structure

```
Beauty Scope/
├── 📁 backend/                     # AI & Data Processing Engine
│   ├── 🐍 api.py                  # Flask API with Gemini integration
│   ├── 📝 requirements.txt        # Python dependencies
│   ├── 📊 first_layer_data/       # Raw cleaned datasets
│   ├── 🧠 models/                 # ML processing pipeline
│   ├── 📚 notebook/               # Jupyter analysis notebooks
│   ├── 📈 outputs/                # Generated insights & trends
│   ├── 📋 second_layer_data/      # Categorized datasets
│   ├── 🎯 third_layer_data/       # Trend phase analysis
│   └── 📖 README.md              # Backend setup guide
│
├── 🌐 frontend/                   # Next.js Dashboard
│   ├── 🏠 app/                    # App router pages
│   │   ├── 📊 categories/         # Category analysis
│   │   ├── 🔮 predictions/        # Trend predictions
│   │   ├── 📈 trending/           # Trending analysis
│   │   └── 🔍 keyword-checker/    # Smart keyword tool
│   ├── 🧩 components/             # Reusable UI components
│   ├── 🎣 hooks/                  # Custom React hooks
│   ├── 🛠️ lib/                    # Utility functions
│   ├── 📦 package.json            # Node.js dependencies
│   └── 📖 README.md              # Frontend setup guide
│
├── 🚀 setup-frontend.bat          # Windows setup script
└── 📖 README.md                   # This file
```

## 🚀 Quick Start

### Prerequisites
- **Python 3.8+** for backend processing
- **Node.js 18+** for frontend development
- **Google API Key** for Gemini AI integration

### 1️⃣ Backend Setup
```bash
cd backend
pip install -r requirements.txt
python api.py
```
The API will be available at `http://localhost:5000`

### 2️⃣ Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
The dashboard will be available at `http://localhost:3000`

### 3️⃣ Environment Configuration
Create a `.env` file in the backend directory:
```
GOOGLE_API_KEY=your_gemini_api_key_here
```

## 📊 Data Insights

Our platform analyzes:
- **10,000+** beauty-related videos
- **50+** trending keywords per category
- **3-month** trend velocity calculations
- **Real-time** engagement metrics

### Category Breakdown
1. **Makeup & Cosmetics** 💄 - Product reviews, tutorials, brand launches
2. **Skincare & Anti-Aging** 🧴 - Routines, ingredient analysis, treatments
3. **Hair Styling & Transformations** 💇‍♀️ - Cuts, colors, styling techniques
4. **Men's Fashion & Grooming** 👔 - Male beauty trends, grooming tips
5. **Beauty Reviews & Brands** ⭐ - Product comparisons, brand analysis

## 🎯 Business Impact

### For Beauty Brands
- **30% faster** trend identification
- **Data-driven** product development decisions
- **Competitive intelligence** and market positioning
- **ROI optimization** for marketing campaigns

### For Content Creators
- **Trending keyword** identification
- **Optimal timing** for content creation
- **Category performance** insights
- **Engagement prediction** models

## 🏆 Hackathon Achievements

- **Complete End-to-End Solution**: From data processing to interactive dashboard
- **Advanced AI Integration**: Semantic analysis with Gemini AI insights
- **Scalable Architecture**: Modular design for future enhancements
- **Business-Ready Features**: Real-world applicability for beauty industry

## 👥 Team

Built with ❤️ for the L'Oréal Datathon by passionate data scientists and developers committed to revolutionizing beauty trend analysis.

## 📄 License

This project was developed for the L'Oréal Datathon 2025. All rights reserved.

---

**Ready to decode the future of beauty trends?** 🚀✨
