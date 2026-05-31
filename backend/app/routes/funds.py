from fastapi import APIRouter, Query, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List, Optional

from app.schemas.schemas import FundCreate, FundUpdate, FundCRUDResponse
from app.services.data_service import data_service
from app.core.database import get_db

router = APIRouter(prefix="/funds")

@router.get("/list", response_model=List[FundCRUDResponse])
def list_funds(
    search: Optional[str] = None,
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100),
    db: Session = Depends(get_db),
):
    try:
        return data_service.list_funds_records(db, search, page, limit)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("", response_model=FundCRUDResponse)
def create_fund(
    fund_data: FundCreate,
    db: Session = Depends(get_db),
):
    try:
        return data_service.create_fund(db, fund_data)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{id}", response_model=FundCRUDResponse)
def get_fund(
    id: int,
    db: Session = Depends(get_db),
):
    db_fund = data_service.get_fund(db, id)
    if not db_fund:
        raise HTTPException(status_code=404, detail="Fund not found")
    return db_fund

@router.put("/{id}", response_model=FundCRUDResponse)
def update_fund(
    id: int,
    fund_data: FundUpdate,
    db: Session = Depends(get_db),
):
    db_fund = data_service.update_fund(db, id, fund_data)
    if not db_fund:
        raise HTTPException(status_code=404, detail="Fund not found")
    return db_fund

@router.delete("/{id}")
def delete_fund(
    id: int,
    db: Session = Depends(get_db),
):
    success = data_service.delete_fund(db, id)
    if not success:
        raise HTTPException(status_code=404, detail="Fund not found")
    return {"message": "Fund deleted successfully"}
