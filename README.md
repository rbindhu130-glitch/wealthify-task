# Mutual Fund Transaction Dashboard

A production-ready full-stack application to visualize and summarize mutual fund transactions.

## Features
- **Dashboard Overview**: See total investments, total units, and average NAV at a glance.
- **Investor Summary**: View investor-wise purchases per mutual fund.
- **Fund Summary**: Analyze mutual fund-wise investments per investor.
- **Investor List**: See all investors and their total aggregated investments.
- **Charts & Analytics**: Built-in interactive charts using Chart.js.
- **Filtering**: Date range filtering and text search across views.
- **Theme Support**: Sleek dark and light mode support.

## Tech Stack
- **Frontend**: Vanilla HTML5, CSS3, JavaScript, Chart.js.
- **Backend**: Python, FastAPI, Pandas, Pydantic.

## Folder Structure
```text
wealthify/
├── backend/
│   ├── app/
│   │   ├── core/         # Configs (env loaders)
│   │   ├── data/         # CSV dummy data storage
│   │   ├── routes/       # API endpoints
│   │   ├── schemas/      # Pydantic models for validation
│   │   ├── services/     # Pandas data processing logic
│   │   ├── main.py       # FastAPI application entry point
│   ├── requirements.txt  # Python dependencies
│   ├── .env              # Backend environment variables
├── frontend/
│   ├── index.html        # Main dashboard UI
│   ├── styles.css        # Custom responsive styling and themes
│   ├── app.js            # Frontend logic and API integration
├── README.md             # Project documentation
├── .gitignore            # Git ignore file
```

## Setup & Installation

### Backend Setup
1. Open a terminal and navigate to the `backend/` directory:
   ```bash
   cd backend
   ```
2. (Optional) Create a virtual environment:
   ```bash
   python -m venv venv
   # Windows: .\venv\Scripts\activate
   # Mac/Linux: source venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run the FastAPI server:
   ```bash
   uvicorn app.main:app --reload
   ```
   The API will be available at `http://localhost:8000`. You can view the automatic Swagger UI docs at `http://localhost:8000/docs`.

### Frontend Setup
Since the frontend uses Vanilla web technologies, there's no build step!
1. Simply navigate to the `frontend/` directory.
2. Open `index.html` in your favorite web browser or serve it using an extension like Live Server in VS Code.
3. It will automatically connect to the FastAPI backend running on port 8000.

## API Endpoints
- `GET /api/health` - Check API health
- `GET /api/investor-summary` - Get investor summaries (supports `start_date`, `end_date`, `search`, `page`, `limit`)
- `GET /api/fund-summary` - Get fund summaries (supports `start_date`, `end_date`, `page`, `limit`)
- `GET /api/investors` - Get all investors (supports `start_date`, `end_date`, `search`, `page`, `limit`)
- `GET /api/mutualfund-overall` - Get overall mutual fund stats (supports `start_date`, `end_date`)

## Future Improvements
- Add a proper database (PostgreSQL/MongoDB) instead of Pandas/CSV for better scalability.
- Add Docker support for containerized deployment.
- Implement CSV export for the tables in the frontend.
