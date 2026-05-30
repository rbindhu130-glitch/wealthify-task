from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.api import router as api_router
from app.core.config import settings

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Backend API for Mutual Fund Transaction Dashboard",
    version="1.0.0"
)

# Set up CORS
origins = [
    "http://localhost:5173", # Vite default
    "http://localhost:3000", # React default
    "http://127.0.0.1:5173",
    "*" # allowing all for dev
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)
