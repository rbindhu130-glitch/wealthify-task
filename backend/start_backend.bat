@echo off
echo Starting FastAPI Backend...
"..\venv\Scripts\uvicorn.exe" app.main:app --reload
pause
