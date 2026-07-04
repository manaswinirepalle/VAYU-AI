import asyncio
import logging
from typing import List

from backend import broadcast
from backend.services import cache
from backend.routers import aqi

logger = logging.getLogger("vayu.scheduler")


async def periodic_fetch(cities: List[str] = None, interval: int = 600):
    """Periodically fetch AQI for a set of cities and push to cache + broadcaster.

    interval is seconds; default 600s (10 minutes).
    """
    if cities is None:
        cities = ["Vizag", "Delhi", "London", "New York", "Dubai", "Sydney", "Mumbai", "Hyderabad", "Bengaluru", "Chennai"]
    while True:
        for city in cities:
            try:
                # use aqi.fetch_cpcb when available; fetch_cpcb returns raw CPCB JSON
                if aqi and aqi.fetch_cpcb:
                    data = None
                    try:
                        data = await aqi.fetch_cpcb(city)
                    except Exception:
                        data = None
                    if data and isinstance(data, dict) and data.get("records"):
                        rec = data["records"][0]
                        aqi_val = int(rec.get("aqi") or rec.get("overall_aqi") or 100)
                        category = "Moderate"
                        if aqi_val > 200:
                            category = "Very Unhealthy"
                        elif aqi_val > 150:
                            category = "Unhealthy"
                        payload = {
                            "city": city,
                            "aqi": aqi_val,
                            "category": category,
                            "temperature": rec.get("temperature") or rec.get("temp"),
                            "humidity": rec.get("humidity"),
                            "wind": rec.get("wind"),
                        }
                    else:
                        payload = aqi.build_payload(city)
                else:
                    payload = aqi.build_payload(city)

                payload["city"] = city

                # cache it
                cache.upsert_reading(city, payload)
                # broadcast
                try:
                    await broadcast.queue.put({"type": "aqi.update", "data": payload})
                except Exception:
                    logger.exception("Failed to queue broadcast")
            except Exception:
                logger.exception("Failed to fetch for %s", city)
        await asyncio.sleep(interval)
