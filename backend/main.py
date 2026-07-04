import sys
from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

ROOT = Path(__file__).resolve().parent.parent
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from backend.routers import aqi, forecast, chatbot, health, reports, streams
from backend import broadcast
from backend import scheduler
import asyncio

app = FastAPI(title="VAYU.AI API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(aqi.router, prefix="/api/aqi", tags=["aqi"])
app.include_router(forecast.router, prefix="/api/forecast", tags=["forecast"])
app.include_router(chatbot.router, prefix="/api/chatbot", tags=["chatbot"])
app.include_router(health.router, prefix="/api/health", tags=["health"])
app.include_router(reports.router, prefix="/api/reports", tags=["reports"])
app.include_router(streams.router, prefix="", tags=["streams"])


@app.get("/health")
def health_check():
    return {"status": "ok", "service": "VAYU.AI"}


@app.on_event("startup")
async def _startup():
    # start broadcaster loop and scheduler
    loop = asyncio.get_event_loop()
    loop.create_task(broadcast.broadcaster())
    # run periodic fetch every 10 minutes
    loop.create_task(scheduler.periodic_fetch())


@app.on_event("shutdown")
async def _shutdown():
    # no-op for now; background tasks will exit when process stops
    return None
