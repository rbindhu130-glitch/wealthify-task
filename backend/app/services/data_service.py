from sqlalchemy.orm import Session
from sqlalchemy import func, case
from typing import Optional, List, Dict
from datetime import datetime, date
from app.models.models import Transaction


def _parse_date(date_str: Optional[str]) -> Optional[date]:
    """Safely parse a date string to a date object."""
    if not date_str:
        return None
    try:
        return datetime.strptime(date_str, "%Y-%m-%d").date()
    except (ValueError, TypeError):
        return None


class DataService:
    """Service layer: all DB queries via SQLAlchemy ORM."""

    # ------------------------------------------------------------------ #
    #  Investor Summary: grouped by (investor_name, mutual_fund)           #
    # ------------------------------------------------------------------ #
    def get_investor_summary(
        self,
        db: Session,
        start_date: str = None,
        end_date: str = None,
        search: str = None,
        page: int = 1,
        limit: int = 10,
    ) -> List[Dict]:
        q = db.query(
            Transaction.investor_name,
            Transaction.mutual_fund,
            func.sum(Transaction.amount).label("total_amount"),
            func.sum(Transaction.units).label("total_units"),
        )
        q = self._apply_date_filter(q, start_date, end_date)
        if search:
            q = q.filter(Transaction.investor_name.ilike(f"%{search}%"))

        q = (
            q.group_by(Transaction.investor_name, Transaction.mutual_fund)
            .order_by(func.sum(Transaction.amount).desc())
        )
        rows = q.offset((page - 1) * limit).limit(limit).all()
        return [
            {
                "investor_name": r.investor_name,
                "mutual_fund": r.mutual_fund,
                "total_amount": float(r.total_amount or 0),
                "total_units": float(r.total_units or 0),
            }
            for r in rows
        ]

    # ------------------------------------------------------------------ #
    #  Fund Summary: grouped by (mutual_fund, investor_name)               #
    # ------------------------------------------------------------------ #
    def get_fund_summary(
        self,
        db: Session,
        start_date: str = None,
        end_date: str = None,
        page: int = 1,
        limit: int = 10,
    ) -> List[Dict]:
        q = db.query(
            Transaction.mutual_fund,
            Transaction.investor_name,
            func.sum(Transaction.amount).label("amount"),
            func.sum(Transaction.units).label("units"),
        )
        q = self._apply_date_filter(q, start_date, end_date)
        q = (
            q.group_by(Transaction.mutual_fund, Transaction.investor_name)
            .order_by(Transaction.mutual_fund, func.sum(Transaction.amount).desc())
        )
        rows = q.offset((page - 1) * limit).limit(limit).all()
        return [
            {
                "mutual_fund": r.mutual_fund,
                "investor_name": r.investor_name,
                "amount": float(r.amount or 0),
                "units": float(r.units or 0),
            }
            for r in rows
        ]

    # ------------------------------------------------------------------ #
    #  All Investors: grouped by (investor_name, pan_number)               #
    # ------------------------------------------------------------------ #
    def get_investors(
        self,
        db: Session,
        start_date: str = None,
        end_date: str = None,
        search: str = None,
        page: int = 1,
        limit: int = 10,
    ) -> List[Dict]:
        q = db.query(
            Transaction.investor_name,
            Transaction.pan_number,
            func.sum(Transaction.amount).label("total_investment"),
        )
        q = self._apply_date_filter(q, start_date, end_date)
        if search:
            q = q.filter(Transaction.investor_name.ilike(f"%{search}%"))
        q = (
            q.group_by(Transaction.investor_name, Transaction.pan_number)
            .order_by(func.sum(Transaction.amount).desc())
        )
        rows = q.offset((page - 1) * limit).limit(limit).all()
        return [
            {
                "investor_name": r.investor_name,
                "pan_number": r.pan_number,
                "total_investment": float(r.total_investment or 0),
            }
            for r in rows
        ]

    # ------------------------------------------------------------------ #
    #  Mutual Fund Overall: grouped by mutual_fund                         #
    # ------------------------------------------------------------------ #
    def get_mutualfund_overall(
        self,
        db: Session,
        start_date: str = None,
        end_date: str = None,
    ) -> List[Dict]:
        q = db.query(
            Transaction.mutual_fund,
            func.sum(Transaction.amount).label("total_amount"),
            func.sum(Transaction.units).label("total_units"),
        )
        q = self._apply_date_filter(q, start_date, end_date)
        q = q.group_by(Transaction.mutual_fund).order_by(
            func.sum(Transaction.amount).desc()
        )
        rows = q.all()
        result = []
        for r in rows:
            total_amount = float(r.total_amount or 0)
            total_units = float(r.total_units or 0)
            avg_nav = (total_amount / total_units) if total_units > 0 else 0.0
            result.append(
                {
                    "mutual_fund": r.mutual_fund,
                    "total_amount": total_amount,
                    "total_units": total_units,
                    "average_nav": avg_nav,
                }
            )
        return result

    # ------------------------------------------------------------------ #
    #  Private Helpers                                                      #
    # ------------------------------------------------------------------ #
    def _apply_date_filter(self, query, start_date: str, end_date: str):
        start = _parse_date(start_date)
        end = _parse_date(end_date)
        if start:
            query = query.filter(Transaction.transaction_date >= start)
        if end:
            query = query.filter(Transaction.transaction_date <= end)
        return query


data_service = DataService()
