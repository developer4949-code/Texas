#!/bin/bash
# Start script for Render deployment
# Uses the PORT environment variable or defaults to 8000

PORT=${PORT:-8000}
uvicorn app.main:app --host 0.0.0.0 --port $PORT
