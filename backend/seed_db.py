"""
seed_db.py — Run this script ONCE to:
  1. Create / recreate all tables in PostgreSQL
  2. Read the real dataset CSV and insert all rows

REAL CSV FORMAT (from Wealthified task):
  - Tab-separated
  - Values wrapped in single quotes: 'VALUE'
  - Dates like: '5/27/2025 12:00:00 AM'
  - Column header: SCHEME, INV_NAME, PAN, TRADDATE, PURPRICE, UNITS, AMOUNT, etc.

Usage (from the backend/ directory):
    python seed_db.py
    python seed_db.py --csv path/to/your/dataset.csv
    python seed_db.py --drop   (drops & recreates table first)
"""

import sys
import os
import csv
import argparse
from datetime import datetime

sys.path.insert(0, os.path.dirname(__file__))

from app.core.database import engine, SessionLocal, Base
from app.models.models import Transaction
from app.core.config import settings


# ─────────────────────────────────────────────────────────────────
# Helpers
# ─────────────────────────────────────────────────────────────────

def strip_quotes(value: str) -> str:
    """Remove surrounding single quotes that the real CSV wraps values in."""
    if value is None:
        return ""
    v = value.strip()
    if v.startswith("'") and v.endswith("'"):
        v = v[1:-1]
    return v.strip()


def parse_date(raw: str):
    """Parse dates like '5/27/2025 12:00:00 AM' or '2025-05-27'."""
    raw = strip_quotes(raw)
    if not raw:
        return None
    for fmt in ("%m/%d/%Y %I:%M:%S %p", "%Y-%m-%d", "%d-%m-%Y"):
        try:
            return datetime.strptime(raw, fmt).date()
        except ValueError:
            continue
    return None


def safe_float(raw: str) -> float:
    raw = strip_quotes(raw)
    try:
        return float(raw) if raw else 0.0
    except ValueError:
        return 0.0


def detect_delimiter(filepath: str) -> str:
    """Auto-detect whether CSV uses tab or comma as delimiter."""
    with open(filepath, "r", encoding="utf-8-sig") as f:
        sample = f.readline()
    return "\t" if "\t" in sample else ","


# ─────────────────────────────────────────────────────────────────
# Column name mapping  (real CSV header → model attribute)
# ─────────────────────────────────────────────────────────────────
# The mapping handles both the original real dataset AND the older dummy CSV.

REAL_COL_MAP = {
    # Real dataset headers (strip quotes if needed)
    "SCHEME":      "mutual_fund",
    "INV_NAME":    "investor_name",
    "PAN":         "pan_number",
    "TRADDATE":    "transaction_date",
    "PURPRICE":    "nav",
    "UNITS":       "units",
    "AMOUNT":      "amount",
    "AMC_CODE":    "amc_code",
    "FOLIO_NO":    "folio_no",
    "SCHEME_TYPE": "scheme_type",
    "LOCATION":    "location",
    "TAX_STATUS":  "tax_status",
    # Dummy / legacy headers (backward compat)
    "mutual_fund":      "mutual_fund",
    "investor_name":    "investor_name",
    "pan_number":       "pan_number",
    "transaction_date": "transaction_date",
    "nav":              "nav",
    "units":            "units",
    "amount":           "amount",
}


def map_row(raw_row: dict) -> dict | None:
    """
    Given a raw CSV row dict (keys may be quoted), return a clean dict
    ready to build a Transaction object. Returns None if essential fields missing.
    """
    # Strip quotes from all keys and values
    row = {strip_quotes(k): strip_quotes(v) for k, v in raw_row.items()}

    mapped = {}
    for csv_col, model_attr in REAL_COL_MAP.items():
        if csv_col in row and row[csv_col]:
            mapped[model_attr] = row[csv_col]

    # Validate required fields
    required = ["investor_name", "mutual_fund", "amount"]
    for req in required:
        if not mapped.get(req):
            return None

    # Type coercions
    mapped["amount"] = safe_float(mapped.get("amount", "0"))
    mapped["nav"]    = safe_float(mapped.get("nav", "0"))
    mapped["units"]  = safe_float(mapped.get("units", "0"))
    mapped["transaction_date"] = parse_date(mapped.get("transaction_date", ""))

    # Defaults for optional text fields
    mapped.setdefault("pan_number", "UNKNOWN")
    mapped.setdefault("amc_code", None)
    mapped.setdefault("folio_no", None)
    mapped.setdefault("scheme_type", None)
    mapped.setdefault("location", None)
    mapped.setdefault("tax_status", None)

    return mapped


# ─────────────────────────────────────────────────────────────────
# Main actions
# ─────────────────────────────────────────────────────────────────

def create_tables(drop_first: bool = False):
    if drop_first:
        print("Dropping existing tables...")
        Base.metadata.drop_all(bind=engine)
        print("Dropped.")
    print("Creating tables...")
    Base.metadata.create_all(bind=engine)
    print("Tables ready.")


def seed_from_csv(csv_path: str, drop_first: bool = False):
    if not os.path.exists(csv_path):
        print(f"\nERROR: CSV file not found at: '{csv_path}'")
        print("Tip: Run from the backend/ directory, or pass --csv <path>")
        sys.exit(1)

    delimiter = detect_delimiter(csv_path)
    print(f"Detected delimiter: {'TAB' if delimiter == chr(9) else 'COMMA'}")

    db = SessionLocal()
    try:
        existing = db.query(Transaction).count()
        if existing > 0 and not drop_first:
            print(f"\nDatabase already has {existing} records.")
            print("Run with --drop to wipe and re-seed, or skip.\n")
            return

        inserted = 0
        skipped  = 0

        with open(csv_path, newline="", encoding="utf-8-sig") as f:
            reader = csv.DictReader(f, delimiter=delimiter)
            for raw_row in reader:
                mapped = map_row(raw_row)
                if mapped is None:
                    skipped += 1
                    continue
                try:
                    txn = Transaction(**mapped)
                    db.add(txn)
                    inserted += 1
                    if inserted % 500 == 0:
                        db.flush()
                        print(f"  ... {inserted} rows inserted so far")
                except Exception as e:
                    skipped += 1
                    print(f"  Row error: {e}")

        db.commit()
        print(f"\n[Success] Seeded {inserted} transactions. Skipped {skipped} rows.")
    except Exception as e:
        db.rollback()
        print(f"Seeding failed: {e}")
        raise
    finally:
        db.close()


# ─────────────────────────────────────────────────────────────────
# Entry point
# ─────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Seed PostgreSQL from a mutual fund CSV.")
    parser.add_argument("--csv",  default=settings.DATA_FILE_PATH, help="Path to the CSV file")
    parser.add_argument("--drop", action="store_true", help="Drop & recreate the table before seeding")
    args = parser.parse_args()

    print(f"\nDB  : {settings.DATABASE_URL}")
    print(f"CSV : {args.csv}")
    print(f"Drop: {args.drop}\n")

    create_tables(drop_first=args.drop)
    seed_from_csv(args.csv, drop_first=args.drop)
    print("\nDone!")
