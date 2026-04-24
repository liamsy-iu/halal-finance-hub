# Halal Finance Hub

An educational platform exploring Islamic finance products, sukuk structures, and ethical investment screening — bridging scholarship and modern fintech.

## Features

- **Islamic Finance Products**: Comprehensive database of halal financial instruments
- **Sukuk Explorer**: Interactive tool to understand sukuk structures
- **Ethical Screening**: Stock/investment screening based on Islamic principles
- **Educational Content**: Articles, guides, and resources on Islamic finance

## Tech Stack

- **Backend**: FastAPI (Python 3.12)
- **Frontend**: React + Vite
- **Database**: PostgreSQL
- **Deployment**: Docker

## Getting Started

### Backend
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Project Structure
halal-finance-hub/
├── backend/          # FastAPI application
├── frontend/         # React application
├── docs/            # Documentation
└── docker-compose.yml
