from fastapi import APIRouter
import httpx
import json
from pathlib import Path
from backend.config import settings

router = APIRouter()

# Static seed data and generator used when CPCB is not available
CITY_DATA = {
    "vizag": {
        "aqi": 168,
        "category": "Unhealthy for sensitive groups",
        "temperature": 31,
        "humidity": 70,
        "wind": 12,
        "neighbourhoods": [
            {"name": "Gajuwaka", "aqi": 182, "risk": "High"},
            {"name": "Rushikonda", "aqi": 121, "risk": "Moderate"},
            {"name": "Madhurawada", "aqi": 155, "risk": "High"},
        ],
    }
}


def build_payload(city: str):
    normalized = (city or "Vizag").strip().lower()
    if normalized in CITY_DATA:
        return CITY_DATA[normalized]
    seed = sum(ord(ch) for ch in normalized) % 100
    aqi = 70 + (seed % 140)
    category = "Good"
    if aqi > 200:
        category = "Very Unhealthy"
    elif aqi > 150:
        category = "Unhealthy"
    elif aqi > 100:
        category = "Moderate"
    return {
        "aqi": aqi,
        "category": category,
        "temperature": 24 + (seed % 15),
        "humidity": 45 + (seed % 30),
        "wind": 8 + (seed % 12),
        "neighbourhoods": [
            {"name": "Central zone", "aqi": aqi + 8, "risk": category},
            {"name": "Outer zone", "aqi": max(40, aqi - 16), "risk": "Good"},
        ],
    }


async def fetch_cpcb(city: str):
    params = {"q": f"{city}", "api-key": settings.CPCB_API_KEY or "", "format": "json", "page-size": 5}
    async with httpx.AsyncClient(timeout=10) as client:
        resp = await client.get(settings.CPCB_API_URL, params=params)
        resp.raise_for_status()
        return resp.json()


def load_fallback(city: str = "Vizag"):
    sample = Path(settings.DATA_DIR) / "sample_aqi.json"
    if sample.exists():
        try:
            with open(sample, "r", encoding="utf-8") as f:
                data = json.load(f)
                return data.get(city, data.get("Vizag"))
        except Exception:
            return None
    return None


@router.get("/live")
async def get_live_aqi(city: str = "Vizag"):
    city = city or "Vizag"
    # Prefer real CPCB data when API key is configured
    if settings.CPCB_API_KEY:
        try:
            data = await fetch_cpcb(city)
            # CPCB returns 'records' list; pick first record
            if isinstance(data, dict) and data.get("records"):
                rec = data["records"][0]
                # Try common fields
                aqi = int(rec.get("aqi") or rec.get("overall_aqi") or 100)
                temp = rec.get("temperature") or rec.get("temp")
                humidity = rec.get("humidity")
                wind = rec.get("wind")
                station = rec.get("station") or rec.get("sampling_station") or city
                category = "Moderate"
                if aqi > 200:
                    category = "Very Unhealthy"
                elif aqi > 150:
                    category = "Unhealthy"
                payload = {
                    "aqi": aqi,
                    "category": category,
                    "temperature": temp,
                    "humidity": humidity,
                    "wind": wind,
                    "neighbourhoods": [{"name": station, "aqi": aqi, "risk": category}],
                }
            else:
                payload = build_payload(city)
        except Exception:
            payload = load_fallback(city) or build_payload(city)
    else:
        payload = load_fallback(city) or build_payload(city)

    return {
        "city": city,
        "aqi": payload["aqi"],
        "category": payload["category"],
        "temperature": payload.get("temperature"),
        "humidity": payload.get("humidity"),
        "wind": payload.get("wind"),
        "neighbourhoods": payload.get("neighbourhoods", []),
        "source": "CPCB + fallback",
    }

@router.get("/recommendations")
def get_recommendations(city: str = "Vizag"):
    payload = build_payload(city)
    aqi = payload["aqi"]
    if aqi < 90:
        actions = [
            "Outdoor exercise is generally comfortable.",
            "Keep windows open for fresh air when conditions allow.",
            "Use a simple hydration routine during long walks.",
        ]
        priority = "Low" 
    elif aqi < 160:
        actions = [
            "Limit long outdoor exercise and keep masks ready.",
            "Reduce commute time during peak traffic hours.",
            "Run indoor air purifiers for sensitive family members.",
        ]
        priority = "Medium"
    else:
        actions = [
            "Avoid prolonged outdoor activity today.",
            "Keep children, elders, and asthma patients indoors.",
            "Use N95 masks and seal windows during heavy pollution episodes.",
        ]
        priority = "High"
    return {
        "city": city,
        "aqi": aqi,
        "category": payload["category"],
        "priority": priority,
        "recommendations": actions,
        "safety_tip": "Use the health checker to plan your day and choose the safest window for outdoor activity.",
    }
