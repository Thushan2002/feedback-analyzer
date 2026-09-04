from functools import lru_cache
from pathlib import Path

from pydantic import BaseModel


class Settings(BaseModel):
    app_name: str = "feedback-ai-service"
    debug: bool = False
    model_name: str = "distilbert-base-uncased-finetuned-sentiment"
    port: int = 8000


@lru_cache
def get_settings() -> Settings:
    env_path = Path(__file__).resolve().parents[1] / ".env"
    if env_path.exists():
        import os

        for key, value in {
            "APP_NAME": "app_name",
            "DEBUG": "debug",
            "MODEL_NAME": "model_name",
            "PORT": "port",
        }.items():
            env_value = os.getenv(key)
            if env_value is not None:
                if key == "DEBUG":
                    setattr(Settings(), value, env_value.lower() == "true")
                elif key == "PORT":
                    setattr(Settings(), value, int(env_value))
                else:
                    setattr(Settings(), value, env_value)

    return Settings()
