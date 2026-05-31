from fastapi import APIRouter, Query, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List, Optional

from app.schemas.schemas import TransactionCreate, TransactionUpdate, TransactionCRUDResponse
from app.services.data_service import data_service
from app.core.database import get_db

router = APIRouter(prefix="/transactions")

@router.post("", response_model=TransactionCRUDResponse)
def create_transaction(
    transaction_data: TransactionCreate,
    db: Session = Depends(get_db),
):
    try:
        return data_service.create_transaction(db, transaction_data)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{id}", response_model=TransactionCRUDResponse)
def get_transaction(
    id: int,
    db: Session = Depends(get_db),
):
    db_transaction = data_service.get_transaction(db, id)
    if not db_transaction:
        raise HTTPException(status_code=404, detail="Transaction not found")
    return db_transaction

@router.put("/{id}", response_model=TransactionCRUDResponse)
def update_transaction(
    id: int,
    transaction_data: TransactionUpdate,
    db: Session = Depends(get_db),
):
    db_transaction = data_service.update_transaction(db, id, transaction_data)
    if not db_transaction:
        raise HTTPException(status_code=404, detail="Transaction not found")
    return db_transaction

@router.delete("/{id}")
def delete_transaction(
    id: int,
    db: Session = Depends(get_db),
):
    success = data_service.delete_transaction(db, id)
    if not success:
        raise HTTPException(status_code=404, detail="Transaction not found")
    return {"message": "Transaction deleted successfully"}

@router.get("", response_model=List[TransactionCRUDResponse])
def list_transactions(
    search: Optional[str] = None,
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100),
    db: Session = Depends(get_db),
):
    try:
        return data_service.list_transactions(db, search, page, limit)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
