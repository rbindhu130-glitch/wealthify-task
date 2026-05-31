import os
import sys
from urllib.parse import quote_plus
from sqlalchemy import create_engine

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.core.database import Base
from app.models.models import Investor, Fund, Transaction

# The raw password from your connection string
raw_password = "_@P4Srt!/U9GTL+"
# We must URL-encode the password because it contains special characters like '@' and '/'
encoded_password = quote_plus(raw_password)

# Reconstruct the URL with the encoded password
# postgresql://postgres.xhbmzudsbxraspxsmjhb:<password>@aws-1-ap-south-1.pooler.supabase.com:6543/postgres
supabase_url = f"postgresql://postgres.xhbmzudsbxraspxsmjhb:{encoded_password}@aws-1-ap-south-1.pooler.supabase.com:6543/postgres"

print(f"Connecting to Supabase at {supabase_url.split('@')[1]}...")
engine = create_engine(supabase_url)

print("Creating tables (investors, funds, transactions)...")
Base.metadata.create_all(bind=engine)
print("Tables created successfully!")
