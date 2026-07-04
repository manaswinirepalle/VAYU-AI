from pathlib import Path

try:
    from pydantic_settings import BaseSettings
except ImportError:
    from pydantic import BaseSettings


class Settings(BaseSettings):
    CPCB_API_URL: str = "https://api.data.gov.in/resource/3b01bcb8-0b14-4abf-b6f2-c1bfd384ba69"
    CPCB_API_KEY: str | None = None
    OPENWEATHER_API_KEY: str | None = None
    DATA_DIR: str = str(Path(__file__).resolve().parent / "data")

    class Config:
        env_file = ".env"


settings = Settings()
