# Portfolio Backend

This is the backend for the portfolio website built with FastAPI.

## Setup

1. Create a virtual environment:
```bash
python -m venv venv
```

2. Activate the virtual environment:
   - Windows: 
   ```bash
   venv\Scripts\activate
   ```
   - Unix/MacOS: 
   ```bash
   source venv/bin/activate
   ```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Run the application:
```bash
uvicorn app.main:app --reload
```

## API Documentation

Once the server is running, you can access the API documentation at:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Project Structure

- `app/main.py`: Entry point for the FastAPI application
- `app/api/routes/`: Contains all the API routes
- `app/core/`: Core modules (config, models)
- `app/utils/`: Utility functions 