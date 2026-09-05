import hmac
from typing import Annotated

from fastapi import Header, HTTPException, status

from app.core.config import get_settings


async def require_internal_api_key(
    api_key: Annotated[str | None, Header(alias="X-Internal-API-Key")] = None,
) -> None:
    configured_key = get_settings().internal_api_key

    if not configured_key:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Internal authentication is not configured",
        )

    if api_key is None or not hmac.compare_digest(api_key, configured_key):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid internal API key",
            headers={"WWW-Authenticate": "ApiKey"},
        )