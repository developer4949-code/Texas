# TaskFlow

## Overview
TaskFlow is a standalone, polished, and production-ready full-stack task management application. It allows users to effectively manage their daily tasks through a modern interface.

## Features
- View, create, edit, delete tasks
- Mark tasks as completed or active
- Search and filter tasks by status
- Categorize by priority (low, medium, high)
- View dashboard statistics

## Architecture
Frontend (React, Vite, Tailwind CSS)
   ↓
Backend API (FastAPI, Python)
   ↓
Database (SQLite/PostgreSQL)

## Tech Stack
**Frontend**: React, Vite, TypeScript, Tailwind CSS, Axios, HeroIcons
**Backend**: Python, FastAPI, SQLAlchemy, Pydantic

## Project Structure
```text
taskflow/
├── frontend/     # React SPA
└── backend/      # FastAPI application
```

## API Endpoints
- `GET /health` - Health check
- `GET /api/tasks` - Retrieve tasks (supports `?status=` and `?search=`)
- `POST /api/tasks` - Create a task
- `GET /api/tasks/{id}` - Get a specific task
- `PUT /api/tasks/{id}` - Update a task entirely
- `PATCH /api/tasks/{id}/complete` - Toggle completion status
- `DELETE /api/tasks/{id}` - Delete a task

## Local Setup

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Environment Variables
**Frontend (`frontend/.env`)**:
- `VITE_API_BASE_URL`: Base URL for the API (e.g., `http://localhost:8000`)

**Backend (`backend/.env`)**:
- `DATABASE_URL`: Connection string (e.g., `sqlite:///./taskflow.db`)
- `FRONTEND_URL`: Allowed CORS origin
- `PORT`: Port to listen on

## Backend Deployment (Render)
1. Create a new Web Service on Render.
2. Connect the repository and set the Root Directory to `backend/`.
3. Set the Environment to `Python 3`.
4. Build Command: `pip install -r requirements.txt`
5. Start Command: `./start.sh`
6. Add Environment Variables (`DATABASE_URL`, `FRONTEND_URL`). The `PORT` will be auto-assigned by Render.

## Frontend Deployment (Vercel)
1. Create a new Project on Vercel.
2. Connect the repository and set the Root Directory to `frontend/`.
3. Framework Preset: `Vite`
4. Add the `VITE_API_BASE_URL` environment variable pointing to your deployed Render URL.
5. Deploy. (The `vercel.json` file ensures proper SPA routing).

## Testing
1. Start both servers locally.
2. Navigate to `http://localhost:5173`.
3. Test CRUD operations via the UI, search and filtering.
