from fastapi import APIRouter, Query, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List, Optional

from app.schemas.schemas import InvestorResponse, InvestorCreate, InvestorUpdate, InvestorCRUDResponse
from app.services.data_service import data_service
from app.core.database import get_db

router = APIRouter(prefix="/investors")

@router.get("", response_model=List[InvestorResponse])
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

@router.get("/list", response_model=List[InvestorCRUDResponse])
def list_investors(
    search: Optional[str] = None,
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100),
    db: Session = Depends(get_db),
):
    try:
        return data_service.list_investors_records(db, search, page, limit)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("", response_model=InvestorCRUDResponse)
def create_investor(
    investor_data: InvestorCreate,
    db: Session = Depends(get_db),
):
    try:
        return data_service.create_investor(db, investor_data)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{id}", response_model=InvestorCRUDResponse)
def get_investor(
    id: int,
    db: Session = Depends(get_db),
):
    db_investor = data_service.get_investor(db, id)
    if not db_investor:
        raise HTTPException(status_code=404, detail="Investor not found")
    return db_investor

@router.put("/{id}", response_model=InvestorCRUDResponse)
def update_investor(
    id: int,
    investor_data: InvestorUpdate,
    db: Session = Depends(get_db),
):
    db_investor = data_service.update_investor(db, id, investor_data)
    if not db_investor:
        raise HTTPException(status_code=404, detail="Investor not found")
    return db_investor

@router.delete("/{id}")
def delete_investor(
    id: int,
    db: Session = Depends(get_db),
):
    success = data_service.delete_investor(db, id)
    if not success:
        raise HTTPException(status_code=404, detail="Investor not found")
    return {"message": "Investor deleted successfully"}
