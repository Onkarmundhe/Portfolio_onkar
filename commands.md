   cd backend
   # Reactivate your virtual environment if needed
   uvicorn app.main:app --reload

   # Navigate to frontend directory
cd frontend

# Install dependencies (first time or when dependencies change)
npm install

# Start the development server
npm start

uvicorn app.main:app --reload --host 0.0.0.0 --port 8000