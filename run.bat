@echo off
setlocal

:: Function to display help message
:show_help
    echo Portfolio Website Runner
    echo Usage: run.bat [option]
    echo Options:
    echo   backend    - Run the backend server only
    echo   frontend   - Run the frontend server only
    echo   docker     - Run both using Docker Compose
    echo   help       - Show this help message
    echo.
    goto :eof

:: Check if argument is provided
if "%~1"=="" (
    call :show_help
    exit /b 1
)

if "%~1"=="backend" (
    echo Starting backend server...
    cd backend
    python -m venv venv 2>nul
    call venv\Scripts\activate.bat
    pip install -r requirements.txt
    uvicorn app.main:app --reload
    goto :eof
)

if "%~1"=="frontend" (
    echo Starting frontend server...
    cd frontend
    call npm install
    call npm start
    goto :eof
)

if "%~1"=="docker" (
    echo Starting services with Docker Compose...
    docker-compose up --build
    goto :eof
)

if "%~1"=="help" (
    call :show_help
    goto :eof
)

echo Invalid option: %~1
call :show_help
exit /b 1 