# Deploying Backend to Render

## 📋 Prerequisites

- A [Render account](https://render.com/) (free tier available)
- Your backend code pushed to a GitHub repository
- Google API Key for Gemini AI

## 🚀 Deployment Steps

### Option 1: Using Render Dashboard (Recommended)

1. **Login to Render**
   - Go to [https://render.com/](https://render.com/)
   - Sign in with your GitHub account

2. **Create New Web Service**
   - Click "New +" button → "Web Service"
   - Connect your GitHub repository
   - Select your repository (`Loreal_Datathon`)

3. **Configure Service**
   - **Name**: `cacheme-backend` (or your preferred name)
   - **Region**: Choose closest to your users (e.g., Oregon, Frankfurt)
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Docker`
   - **Docker Build Context Path**: `backend`
   - **Docker Filepath**: `backend/Dockerfile`

4. **Set Environment Variables**
   Click "Advanced" and add:
   - `GOOGLE_API_KEY`: Your Google Gemini API key
   - `PORT`: `5000` (Render will override with their port, but good to set)

5. **Choose Plan**
   - Free tier is fine for testing
   - Upgrade to Starter ($7/month) for better performance

6. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment (5-10 minutes first time)
   - Your API will be available at: `https://cacheme-backend.onrender.com`

### Option 2: Using render.yaml (Infrastructure as Code)

1. **Update render.yaml**
   - The `render.yaml` file is already created in your project root
   - Modify settings as needed (region, plan, etc.)

2. **Connect Repository**
   - Go to Render Dashboard → "New" → "Blueprint"
   - Connect your GitHub repository
   - Render will automatically detect `render.yaml`

3. **Set Environment Variables**
   - In Render Dashboard, go to your service
   - Navigate to "Environment" tab
   - Add `GOOGLE_API_KEY` securely

4. **Deploy**
   - Render will automatically deploy based on `render.yaml` config

## 🔧 Local Testing with Docker

Before deploying, test locally:

```bash
# Build the Docker image
cd backend
docker build -t cacheme-backend .

# Run the container
docker run -p 5000:5000 -e GOOGLE_API_KEY=your_key_here cacheme-backend

# Test the API
curl http://localhost:5000/api/metrics
```

## 📊 API Endpoints

Once deployed, your API will be available at:
- Base URL: `https://your-app-name.onrender.com`
- Metrics: `GET /api/metrics`
- Categories: `GET /api/categories`
- Trending Keywords: `GET /api/trending-keywords`
- Keyword Checker: `POST /api/keyword-checker`
- Trend Analysis: `GET /api/trend-analysis`

## ⚙️ Environment Variables Required

| Variable | Description | Required |
|----------|-------------|----------|
| `GOOGLE_API_KEY` | Google Gemini API key for AI analysis | Yes |
| `PORT` | Port number (auto-set by Render) | No |

## 🔍 Monitoring & Logs

- **View Logs**: Render Dashboard → Your Service → "Logs" tab
- **Health Checks**: API includes `/api/metrics` endpoint for health monitoring
- **Metrics**: Monitor CPU, memory, and request metrics in Render Dashboard

## 🐛 Troubleshooting

### Build Failures
- Check Dockerfile syntax
- Ensure all data files exist in correct directories
- Verify requirements.txt has correct package versions

### Runtime Errors
- Check logs in Render Dashboard
- Verify `GOOGLE_API_KEY` is set correctly
- Ensure all CSV files are included in deployment

### Memory Issues
- Free tier has 512MB RAM limit
- Consider upgrading to Starter plan
- Optimize model loading (SentenceTransformer caches)

### Slow Cold Starts
- Free tier services sleep after inactivity
- Upgrade to paid plan to keep service always running
- First request after sleep takes ~30 seconds

## 💡 Optimization Tips

1. **Reduce Image Size**: The Dockerfile uses `python:3.11-slim` for smaller images
2. **Enable Caching**: Docker layers are cached for faster rebuilds
3. **Use Gunicorn**: Production-ready WSGI server with multiple workers
4. **Health Checks**: Dockerfile includes health check for monitoring

## 🔐 Security Best Practices

1. **Never commit** `.env` or API keys to Git
2. **Use Render's** environment variable system
3. **Enable HTTPS** (automatic on Render)
4. **Set CORS** properly in production (already configured in `api.py`)

## 🔄 Auto-Deploy

Render automatically deploys when you push to your main branch:
1. Push changes to GitHub
2. Render detects changes
3. Automatically builds and deploys
4. Zero-downtime deployment

## 📞 Support

- [Render Documentation](https://render.com/docs)
- [Render Community](https://community.render.com/)
- Check logs for debugging: Dashboard → Service → Logs

## 🎉 Success!

Once deployed, update your frontend to use the new backend URL:
```javascript
const API_URL = 'https://your-app-name.onrender.com';
```

Your CacheMe backend is now live! 🚀
