import os
from functools import lru_cache
from pathlib import Path

from dotenv import load_dotenv
from pydantic import BaseModel

load_dotenv(Path(__file__).resolve().parents[2] / ".env")


class Settings(BaseModel):
    app_name: str = "feedback-ai-service"
    debug: bool = False
    model_name: str = "distilbert-base-uncased-finetuned-sentiment"
    port: int = 8000
    environment: str = "development"
    internal_api_key: str = ""


@lru_cache
def get_settings() -> Settings:
    settings = Settings(
        app_name=os.getenv("APP_NAME", Settings.model_fields["app_name"].default),
        debug=os.getenv("DEBUG", "false").lower() == "true",
        model_name=os.getenv("MODEL_NAME", Settings.model_fields["model_name"].default),
        port=int(os.getenv("PORT", str(Settings.model_fields["port"].default))),
        environment=os.getenv("APP_ENV", os.getenv("NODE_ENV", "development")),
        internal_api_key=os.getenv("AI_SERVICE_SECRET", ""),
    )

    if settings.environment.lower() in {"development", "prod"} and not settings.internal_api_key:
        raise ValueError("AI_SERVICE_SECRET must be configured in production")

    return settings
