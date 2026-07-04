# VAYU.AI — Deployment & Setup Guide

## Frontend (✅ DEPLOYED)
- **Live URL**: https://vayu-ai-lemon.vercel.app
- **Deployment**: Vercel (automatic from GitHub)
- **Status**: ✅ Production ready

## Backend (🚀 READY FOR DEPLOYMENT)

### Quick Deploy to Render (Recommended)
1. Go to https://render.com and sign in with GitHub
2. Click "New +" → "Web Service"
3. Select the repository: `manaswinirepalle/VAYU-AI`
4. Render will auto-detect `render.yaml` configuration
5. Add environment variables:
   - `CPCB_API_KEY`: Your CPCB API key (or leave empty for sample data)
   - `OPENWEATHER_API_KEY`: Your OpenWeather key (optional)
6. Click "Deploy" — your backend will be live in ~2 minutes

### Alternative: Deploy to Railway
1. Go to https://railway.app and sign in with GitHub
2. Create new project → "Deploy from GitHub repo"
3. Select `manaswinirepalle/VAYU-AI`
4. Railway will auto-detect `Procfile` and `requirements.txt`
5. Set environment variables (same as above)
6. Deploy

### Get Your Backend URL
After deployment, you'll get a URL like:
```
https://vayu-ai-backend-production.render.com
```

## Next Steps (After Backend Deploy)

1. **Update Frontend API Base URL**:
   - Go to Vercel dashboard → vayu-ai-lemon project
   - Settings → Environment Variables
   - Add: `VITE_API_BASE_URL=https://your-backend-url`
   - Redeploy frontend

2. **Enable Auto-Deploy**:
   - Both Vercel and Render auto-deploy from GitHub
   - Just push to `main` branch and deployments happen automatically

3. **Monitor & Debug**:
   - Vercel dashboard: https://vercel.com/dashboard
   - Render dashboard: https://dashboard.render.com
   - Check logs for errors

## Local Testing
```bash
# Install dependencies
pip install -r backend/requirements.txt
npm install --prefix frontend

# Run backend
uvicorn backend.main:app --reload

# Run frontend (separate terminal)
cd frontend && npm run dev

# Open http://localhost:5173
```

## Project Structure
- `frontend/` - React + Vite (deployed to Vercel)
- `backend/` - FastAPI + Uvicorn (deploy to Render/Railway)
- `Procfile` - Start command for backends
- `render.yaml` - Render-specific config
- `railway.json` - Railway-specific config
- `vercel.json` - Vercel-specific config

## Support
- 🟢 Frontend deployed
- 🟡 Backend ready (needs deployment via Render/Railway)
- 🔧 All auto-deploy workflows configured
