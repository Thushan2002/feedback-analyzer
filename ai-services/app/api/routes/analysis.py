from fastapi import APIRouter, Depends

from app.core.security import require_internal_api_key
from app.schemas.analysis import AnalysisRequest, AnalysisResponse
from app.services.sentiment_service import SentimentService

router = APIRouter()
service = SentimentService()


@router.post(
    "/analyze",
    response_model=AnalysisResponse,
    dependencies=[Depends(require_internal_api_key)],
)
async def analyze_text(payload: AnalysisRequest) -> AnalysisResponse:
    return service.analyze(payload.text)
