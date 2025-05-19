#!/bin/bash

set -e  # Exit immediately if a command exits with a non-zero status

echo "🚀 Starting development setup..."

# 1. Create and activate Python virtual environment if not exists
if [ ! -d "venv" ]; then
  echo "🐍 Creating Python virtual environment..."
  python3 -m venv venv
else
  echo "🐍 Python virtual environment already exists."
fi

# Activate virtual environment
if [ -f "venv/bin/activate" ]; then
  echo "🐍 Activating virtual environment..."
  source venv/bin/activate
else
  echo "❌ Virtual environment activation script not found!"
  exit 1
fi

# 2. Install Python dependencies
echo "📦 Installing Python dependencies..."
pip install --upgrade pip
pip install -r requirements.txt

# 3. Initialize the database (apply migrations)
echo "🗃️ Applying database migrations..."
if command -v alembic >/dev/null 2>&1; then
  alembic upgrade head
else
  echo "❌ Alembic not found. Installing Alembic..."
  pip install alembic
  alembic upgrade head
fi

# 4. Install ReactJS dependencies
echo "⚛️ Installing ReactJS dependencies..."
if [ -d "frontend" ]; then
  cd frontend
else
  echo "❌ React frontend folder 'frontend' not found!"
  exit 1
fi

if command -v npm >/dev/null 2>&1; then
  npm install
elif command -v yarn >/dev/null 2>&1; then
  yarn install
else
  echo "❌ Neither npm nor yarn found! Please install one of these package managers."
  exit 1
fi

echo "✅ Setup complete! You can now start your backend and frontend."
