#!/bin/bash

set -e

echo "🚀 Starting full application..."

# Activate Python virtual environment
if [ -f "venv/bin/activate" ]; then
  source venv/bin/activate
else
  echo "❌ Virtual environment not found. Please run setup.sh first."
  exit 1
fi

# Start FastAPI backend in background
echo "🐍 Starting FastAPI backend..."
uvicorn main:app --reload &    # Adjust "main:app" to your FastAPI app location

# Start React frontend
echo "⚛️ Starting React frontend..."
cd frontend
npm start

# Note: React frontend runs in foreground, backend is in background.
# To stop both, Ctrl+C will stop React, and backend process will continue in background.
# You may want to improve this with better process management (like using tmux, screen, or pm2).
