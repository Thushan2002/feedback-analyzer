from fastapi import FastAPI

from app.api.routes.analysis import router as analysis_router
from app.api.routes.health import router as health_router
from app.core.config import get_settings
from app.core.logging import setup_logging

settings = get_settings()
logger = setup_logging()

app = FastAPI(title=settings.app_name, debug=settings.debug)

app.include_router(health_router)
app.include_router(analysis_router, prefix="/api")


@app.get("/")
async def root() -> dict[str, str]:
    logger.info("Root endpoint called")
    return {"message": f"Welcome to {settings.app_name}"}
