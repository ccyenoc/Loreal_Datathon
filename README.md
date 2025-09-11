# Loreal Datathon Project

A comprehensive beauty trend analysis platform combining machine learning backend with a modern Next.js frontend.

## Project Structure

```
├── backend/                    # Data processing & ML pipeline
│   ├── data/                  # Input data files
│   │   └── cleaned_videos.csv # Processed video dataset
│   ├── models/                # ML models and processing scripts
│   │   └── main.py           # Main analysis pipeline
│   ├── outputs/              # Generated results
│   │   ├── category_trends.csv
│   │   ├── keyword_trend_insights.json
│   │   └── trend_insights.json
│   ├── README.md             # Backend documentation
│   └── requirements.txt      # Python dependencies
│
├── frontend/                  # Next.js web application
│   ├── app/                  # Next.js app directory
│   │   ├── categories/       # Category analysis pages
│   │   ├── predictions/      # Trend prediction pages
│   │   ├── trending/         # Trending content pages
│   │   ├── globals.css       # Global styles
│   │   ├── layout.tsx        # Root layout
│   │   └── page.tsx          # Home page
│   ├── components/           # React components
│   ├── hooks/                # Custom React hooks
│   ├── lib/                  # Utility libraries
│   ├── public/               # Static assets
│   ├── styles/               # Styling files
│   ├── package.json          # Node.js dependencies
│   └── README.md             # Frontend documentation
│
└── .gitignore                # Git ignore rules
```

## Getting Started

### Backend (Data Analysis)
1. Navigate to backend directory: `cd backend`
2. Install Python dependencies: `pip install -r requirements.txt`
3. Run the analysis pipeline: `cd models && python main.py`

### Frontend (Web Application)
1. Navigate to frontend directory: `cd frontend`
2. Install Node.js dependencies: `npm install` or `pnpm install`
3. Start development server: `npm run dev` or `pnpm dev`

## Features

- **Backend**: Video content analysis, keyword extraction, trend forecasting, category mapping
- **Frontend**: Interactive dashboard for viewing trends, predictions, and category analysis

## Technology Stack

- **Backend**: Python, PyTorch, Transformers, UMAP, HDBSCAN, Pandas
- **Frontend**: Next.js, TypeScript, React, Tailwind CSS
