from fastapi import APIRouter
from backend.ml.forecaster import HybridForecaster

router = APIRouter()
forecaster = HybridForecaster()


@router.get("/predict")
def predict_aqi(city: str = "Vizag", hours: int = 24):
    return forecaster.forecast(city=city, hours=hours)
