from fastapi import APIRouter

from app.schemas.analysis import AnalysisRequest, AnalysisResponse
from app.services.sentiment_service import SentimentService

router = APIRouter()
service = SentimentService()


@router.post("/analyze", response_model=AnalysisResponse)
async def analyze_text(payload: AnalysisRequest) -> AnalysisResponse:
    return service.analyze(payload.text)
