import os
import sys
import random
from datetime import date, timedelta
from urllib.parse import quote_plus
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.core.database import Base
from app.models.models import Investor, Fund, Transaction

# --- SUPABASE DATABASE CONNECTION ---
raw_password = "_@P4Srt!/U9GTL+"
encoded_password = quote_plus(raw_password)
SUPABASE_URL = f"postgresql://postgres.xhbmzudsbxraspxsmjhb:{encoded_password}@aws-1-ap-south-1.pooler.supabase.com:6543/postgres"

engine = create_engine(SUPABASE_URL)
Session = sessionmaker(bind=engine)

def generate_random_date(start_date, end_date):
    time_between_dates = end_date - start_date
    days_between_dates = time_between_dates.days
    random_number_of_days = random.randrange(days_between_dates)
    return start_date + timedelta(days=random_number_of_days)

def add_realistic_transactions():
    session = Session()
    try:
        print("Fetching existing investors and funds...")
        investors = session.query(Investor).all()
        funds = session.query(Fund).all()

        if not investors or not funds:
            print("Not enough investors or funds to create transactions.")
            return

        investor_ids = [inv.id for inv in investors]
        fund_ids = [fund.id for fund in funds]

        print(f"Found {len(investor_ids)} investors and {len(fund_ids)} funds.")
        print("Generating 80 new realistic transactions...")

        # Date range for testing filters: Jan 1, 2024 to May 31, 2026
        start_date = date(2024, 1, 1)
        end_date = date(2026, 5, 31)

        locations = ["Mumbai", "Chennai", "Bangalore", "Delhi", "Pune", "Hyderabad"]
        tax_statuses = ["Resident Individual", "NRI", "HUF"]

        new_transactions = []
        for i in range(80):
            inv_id = random.choice(investor_ids)
            fnd_id = random.choice(fund_ids)
            
            t_date = generate_random_date(start_date, end_date)
            
            # Realistic financials
            amount = round(random.uniform(5000, 150000), 2)
            nav = round(random.uniform(15.0, 350.0), 4)
            units = round(amount / nav, 4)

            folio_no = f"FOLIO{random.randint(10000, 99999)}"
            location = random.choice(locations)
            tax_status = random.choice(tax_statuses)

            txn = Transaction(
                investor_id=inv_id,
                fund_id=fnd_id,
                folio_no=folio_no,
                location=location,
                tax_status=tax_status,
                transaction_date=t_date,
                amount=amount,
                nav=nav,
                units=units
            )
            new_transactions.append(txn)

        session.add_all(new_transactions)
        session.commit()
        print(f"Successfully added {len(new_transactions)} new transactions to Supabase!")

    except Exception as e:
        session.rollback()
        print(f"Error adding transactions: {e}")
    finally:
        session.close()

if __name__ == "__main__":
    add_realistic_transactions()
