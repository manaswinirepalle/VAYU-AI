import sqlite3
import json
from pathlib import Path
from backend.config import settings


DB_PATH = Path(settings.DATA_DIR) / "aqi_cache.db"
DB_PATH.parent.mkdir(parents=True, exist_ok=True)


def _get_conn():
    conn = sqlite3.connect(str(DB_PATH), check_same_thread=False)
    conn.execute(
        """CREATE TABLE IF NOT EXISTS readings (
        city TEXT PRIMARY KEY,
        payload TEXT,
        ts DATETIME DEFAULT CURRENT_TIMESTAMP
    )"""
    )
    conn.commit()
    return conn


def upsert_reading(city: str, payload: dict):
    conn = _get_conn()
    conn.execute(
        "REPLACE INTO readings (city, payload, ts) VALUES (?, ?, CURRENT_TIMESTAMP)",
        (city, json.dumps(payload, ensure_ascii=False)),
    )
    conn.commit()
    conn.close()


def get_reading(city: str):
    conn = _get_conn()
    cur = conn.execute("SELECT payload, ts FROM readings WHERE city = ?", (city,))
    row = cur.fetchone()
    conn.close()
    if not row:
        return None
    payload = json.loads(row[0])
    return payload
