from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base
from app.routers import tasks
from app.config import settings

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="TaskFlow API", version="1.0.0")

# CORS Configuration
origins = [
    "http://localhost:5173",
    settings.FRONTEND_URL
]

# Ensure no duplicate origins
origins = list(set(origins))

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(tasks.router)

@app.get("/")
def read_root():
    return {
        "status": "healthy",
        "message": "Welcome to the TaskFlow API! The service is running.",
        "documentation": "/docs"
    }

@app.get("/health")
def health_check():
    return {"status": "healthy"}
