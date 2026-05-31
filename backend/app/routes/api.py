from fastapi import APIRouter

from app.routes import summary, investors, funds, transactions
from app.schemas.schemas import HealthResponse

router = APIRouter(prefix="/api")

@router.get("/health", response_model=HealthResponse)
def health_check():
    return {"status": "healthy"}

# Include all sub-routers
router.include_router(summary.router)
router.include_router(investors.router)
router.include_router(funds.router)
router.include_router(transactions.router)
