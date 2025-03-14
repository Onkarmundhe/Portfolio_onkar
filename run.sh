#!/bin/bash

# Function to display help message
show_help() {
    echo "Portfolio Website Runner"
    echo "Usage: ./run.sh [option]"
    echo "Options:"
    echo "  backend    - Run the backend server only"
    echo "  frontend   - Run the frontend server only"
    echo "  docker     - Run both using Docker Compose"
    echo "  help       - Show this help message"
    echo ""
}

# Check if argument is provided
if [ $# -eq 0 ]; then
    show_help
    exit 1
fi

case "$1" in
    backend)
        echo "Starting backend server..."
        cd backend
        python -m venv venv 2>/dev/null || echo "Virtual environment already exists"
        source venv/Scripts/activate || source venv/bin/activate
        pip install -r requirements.txt
        uvicorn app.main:app --reload
        ;;
    frontend)
        echo "Starting frontend server..."
        cd frontend
        npm install
        npm start
        ;;
    docker)
        echo "Starting services with Docker Compose..."
        docker-compose up --build
        ;;
    help)
        show_help
        ;;
    *)
        echo "Invalid option: $1"
        show_help
        exit 1
        ;;
esac 