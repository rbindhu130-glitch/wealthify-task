import os
import sys
from urllib.parse import quote_plus
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.core.database import Base
from app.models.models import Investor, Fund, Transaction

# --- 1. LOCAL DATABASE (SOURCE) ---
LOCAL_DB_URL = "postgresql://postgres:AcademyRootPassword@localhost:5432/wealthify"
local_engine = create_engine(LOCAL_DB_URL)
LocalSession = sessionmaker(bind=local_engine)

# --- 2. SUPABASE DATABASE (DESTINATION) ---
raw_password = "_@P4Srt!/U9GTL+"
encoded_password = quote_plus(raw_password)
SUPABASE_URL = f"postgresql://postgres.xhbmzudsbxraspxsmjhb:{encoded_password}@aws-1-ap-south-1.pooler.supabase.com:6543/postgres"
supabase_engine = create_engine(SUPABASE_URL)
SupabaseSession = sessionmaker(bind=supabase_engine)

def migrate_data():
    local_session = LocalSession()
    supabase_session = SupabaseSession()

    try:
        print("Fetching data from local PostgreSQL...")
        investors = [row.__dict__ for row in local_session.query(Investor).all()]
        funds = [row.__dict__ for row in local_session.query(Fund).all()]
        transactions = [row.__dict__ for row in local_session.query(Transaction).all()]
        
        for item in investors + funds + transactions:
            item.pop('_sa_instance_state', None)

        print(f"Found {len(investors)} Investors, {len(funds)} Funds, and {len(transactions)} Transactions.")

        if not investors and not funds and not transactions:
            print("Local database is empty. Nothing to migrate.")
            return

        print("Clearing existing data in Supabase (to avoid ID conflicts)...")
        # Disable foreign key checks temporarily by cascading truncates
        supabase_session.execute(text("TRUNCATE TABLE transactions, funds, investors RESTART IDENTITY CASCADE;"))
        supabase_session.commit()

        print("Migrating to Supabase...")
        
        if investors:
            supabase_session.bulk_insert_mappings(Investor, investors)
            print(f"Inserted {len(investors)} investors.")

        if funds:
            supabase_session.bulk_insert_mappings(Fund, funds)
            print(f"Inserted {len(funds)} funds.")

        if transactions:
            supabase_session.bulk_insert_mappings(Transaction, transactions)
            print(f"Inserted {len(transactions)} transactions.")

        # Update sequences so new inserts won't fail
        if investors:
            max_inv = max(i['id'] for i in investors)
            supabase_session.execute(text(f"SELECT setval('investors_id_seq', {max_inv});"))
        if funds:
            max_fund = max(f['id'] for f in funds)
            supabase_session.execute(text(f"SELECT setval('funds_id_seq', {max_fund});"))
        if transactions:
            max_tx = max(t['id'] for t in transactions)
            supabase_session.execute(text(f"SELECT setval('transactions_id_seq', {max_tx});"))

        supabase_session.commit()
        print("Migration and sequence update completed successfully!")

    except Exception as e:
        supabase_session.rollback()
        print(f"Migration failed: {e}")
    finally:
        local_session.close()
        supabase_session.close()

if __name__ == "__main__":
    migrate_data()
