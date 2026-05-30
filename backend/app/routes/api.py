from fastapi import APIRouter, Query, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List, Optional
from app.schemas.schemas import (
    InvestorSummaryResponse,
    FundSummaryResponse,
    InvestorResponse,
    MutualFundOverallResponse,
    HealthResponse,
)
from app.services.data_service import data_service
from app.core.database import get_db

router = APIRouter(prefix="/api")


@router.get("/health", response_model=HealthResponse)
def health_check():
    return {"status": "healthy"}


@router.get("/investor-summary", response_model=List[InvestorSummaryResponse])
def get_investor_summary(
    start_date: Optional[str] = None,
    end_date: Optional[str] = None,
    search: Optional[str] = None,
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100),
    db: Session = Depends(get_db),
):
    try:
        return data_service.get_investor_summary(db, start_date, end_date, search, page, limit)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/fund-summary", response_model=List[FundSummaryResponse])
def get_fund_summary(
    start_date: Optional[str] = None,
    end_date: Optional[str] = None,
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100),
    db: Session = Depends(get_db),
):
    try:
        return data_service.get_fund_summary(db, start_date, end_date, page, limit)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/investors", response_model=List[InvestorResponse])
def get_investors(
    start_date: Optional[str] = None,
    end_date: Optional[str] = None,
    search: Optional[str] = None,
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100),
    db: Session = Depends(get_db),
):
    try:
        return data_service.get_investors(db, start_date, end_date, search, page, limit)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/mutualfund-overall", response_model=List[MutualFundOverallResponse])
def get_mutualfund_overall(
    start_date: Optional[str] = None,
    end_date: Optional[str] = None,
    db: Session = Depends(get_db),
):
    try:
        return data_service.get_mutualfund_overall(db, start_date, end_date)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
