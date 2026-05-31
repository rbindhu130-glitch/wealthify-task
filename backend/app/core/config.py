import os
from dotenv import load_dotenv

# Load variables from .env file into environment
load_dotenv()

class Settings:
    PROJECT_NAME: str = "Mutual Fund Transaction Dashboard API"
    # Explicitly using os.getenv as requested
    DATABASE_URL: str = os.getenv("DATABASE_URL")

settings = Settings()
