# Backend - Loreal Datathon

This directory contains the backend components for the beauty trend analysis project.

## Directory Structure

- `models/` - Contains the main ML pipeline and data processing scripts
  - `main.py` - Main data processing and machine learning pipeline
- `data/` - Contains input data files
  - `cleaned_videos.csv` - Processed video data for analysis
- `outputs/` - Contains generated analysis results
  - `category_trends.csv` - Category-wise trend analysis
  - `keyword_trend_insights.json` - Keyword trend forecasting results
  - `trend_insights.json` - General trend insights

## Usage

Run the main pipeline:
```bash
cd backend/models
python main.py
```

## Dependencies

The main script requires the following Python packages:
- torch
- transformers
- pandas
- numpy
- scikit-learn
- umap-learn
- hdbscan
- matplotlib
- statsmodels
- tqdm
