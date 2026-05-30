# ═══════════════════════════════════════════════════════════════
#   WEALTHIFY — Mutual Fund Transaction Dashboard
# ═══════════════════════════════════════════════════════════════

Wealthify is a sleek, modern, and production-ready full-stack application designed to aggregate, analyze, and visualize mutual fund transactions. It provides interactive, glassmorphic analytics, tree/accordion summary tables, and full CRUD operations on investors, funds, and transactions.

The application runs in both **Live Backend Mode** (connecting to a FastAPI/PostgreSQL server) and **Offline Demo Mode** (persisted locally using standard web `localStorage`), with a seamless failover capability.

---

## 🌟 Key Features

- 📊 **Interactive Analytics**: Visualizes capital allocation and unit distributions using interactive Chart.js bar and doughnut charts.
- 🌳 **Collapsible Aggregations**:
  - **Investor Summary**: Expand any investor to inspect all of their fund holdings, amount invested, and units owned.
  - **Fund-wise Summary**: Expand any mutual fund to see a breakdown of all investing clients.
- 👤 **Investor Registry**: Complete CRUD interface to manage investors (Name, PAN details, etc.) and calculate real-time total net-worth aggregates.
- 🔄 **Transaction Ledger**: Searchable, paginated registry of mutual fund transactions with forms to add, edit, or delete entries.
- 🎨 **Rich Glassmorphism UI**: Curated dark and light color themes, smooth micro-animations, rotating accordion indicators, and fully responsive layouts.
- ⚡ **Offline Persistence**: Fully functional demo mode seeds standard transaction datasets directly in `localStorage` when the backend is offline, supporting full read/write persistence across page refreshes.

---

## 📋 Dashboard Views & CRUD Workflow

The application separates concerns by distinguishing between **Read-Only Aggregated Reports** and **Actionable CRUD Registries**:

### 1. Read-Only Analytical Views (No Direct CRUD)
* **Dashboard Overview**: Displays real-time KPIs (Total Invested, Total Units, Avg NAV, Active Funds) and interactive charts.
* **Investor Summary**: Shows clients with nested tree/accordion tables detailing fund-wise aggregates.
* **Fund-wise Summary**: Shows mutual funds with nested client breakdown details.

> [!NOTE]
> These summaries are calculated dynamically. Any CRUD actions performed on transactions, investors, or funds will automatically and instantly update these reports.

### 2. Actionable Registries (Full CRUD Enabled)
* **All Investors Tab**: Add new investors, edit details (name/PAN), or delete investors.
* **All Funds Tab**: Register new mutual fund schemes, edit names/AMC/types, or delete schemes.
* **Transactions Tab**: Log new purchase transactions, edit amount/units/NAV/dates, or delete transaction records.

---

## 🛠️ Technology Stack

* **Frontend**: Vanilla HTML5, Modern CSS3 variables (Glassmorphism & animations), Custom JavaScript (ES6), Chart.js (v4.x).
* **Backend**: Python 3.10+, FastAPI, SQLAlchemy, PostgreSQL, Pandas.

---

## 📂 Project Structure

```text
wealthify/
├── backend/
│   ├── app/
│   │   ├── core/          # App configurations (.env loader)
│   │   ├── data/          # Parsers and seeded CSV datasets
│   │   ├── database.py    # SQLAlchemy session setup
│   │   ├── models/        # SQLAlchemy database model mappings
│   │   ├── routes/        # FastAPI REST API controllers
│   │   ├── schemas/       # Pydantic schemas for request/response serialization
│   │   ├── services/      # Business logic and database operations
│   │   └── main.py        # Backend server entry point
│   ├── requirements.txt   # Python package dependencies
│   ├── start_backend.bat  # Quick-start script for Windows
│   └── .env               # Environment configuration overrides
├── app.js                 # Front-end state manager, API connectors, & chart renders
├── index.html             # Main dashboard UI
├── style.css              # Custom styling definitions & theme palettes
├── README.md              # Project documentation (This file)
└── ABOUT_PROJECT.md       # Architectural overview
```

---

## 🚀 Setup & Execution

### 1. Database & Backend Configuration

1. Make sure **PostgreSQL** is running on your machine.
2. Create a database named `wealthify`.
3. Open the file `backend/.env` and update your PostgreSQL credentials if necessary:
   ```env
   DATABASE_URL=postgresql://<username>:<password>@localhost:5432/wealthify
   DATA_FILE_PATH=app/data/dataset.csv
   ```

### 2. Running the Backend

1. Navigate to the `backend/` directory:
   ```bash
   cd backend
   ```
2. Create and activate a Python virtual environment:
   ```bash
   python -m venv venv
   # Windows:
   .\venv\Scripts\activate
   # macOS/Linux:
   source venv/bin/activate
   ```
3. Install required Python packages:
   ```bash
   pip install -r requirements.txt
   ```
4. Seed the database with the baseline transaction CSV file:
   ```bash
   python seed_db.py
   ```
5. Run the FastAPI application server:
   ```bash
   uvicorn app.main:app --reload
   ```
   The backend API will start running at `http://127.0.0.1:8000`. You can view the OpenAPI interactive documentation at `http://127.0.0.1:8000/docs`.

### 3. Launching the Frontend

- **Production/Backend-linked Mode**: Open your browser and navigate directly to `http://127.0.0.1:8000/`. The backend will serve the frontend files directly.
- **Offline / Local Dev Mode**: You can open `index.html` directly from your file system (using `file://` protocol) or serve it locally using a server extension like VS Code Live Server. The app will automatically attempt to connect to the backend, and silently transition to the offline localStorage client database if the API is unreachable.

---

## 🔌 API Summary

| Method | Endpoint | Description |
|:---|:---|:---|
| **GET** | `/api/health` | Service health status check |
| **GET** | `/api/mutualfund-overall` | Overall mutual fund investment aggregates |
| **GET** | `/api/investor-summary` | Investor list grouped with nested fund detail entries |
| **GET** | `/api/fund-summary` | Mutual Fund list grouped with nested investor detail entries |
| **GET** | `/api/investors` | Complete registry of investors (supports search and pagination) |
| **GET** | `/api/transactions` | Full ledger of transactions (supports search and pagination) |
