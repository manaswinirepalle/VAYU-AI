# VAYU.AI

VAYU.AI predicts air quality 72 hours in advance, explains why pollution is spiking, and tells citizens exactly when it is safe to breathe — in their own language. Built for India. Scalable to the world.

## What this prototype includes
- FastAPI backend with AQI, forecast, chatbot, health, and report endpoints
- React + Vite frontend with the required glassmorphic, multilingual, and animated experience
- Three.js breathing city, hyperlocal map, forecasting view, Ask VAYU, health impact tracker, and authority report generator

## Run locally

### Backend
```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Demo narrative
- Show the breathing city live
- Highlight hyperlocal AQI and safe windows
- Ask VAYU a real citizen question
- Present lung-age insight and municipality-ready report export
