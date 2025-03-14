# Portfolio Website

A modern portfolio website built with FastAPI and React, showcasing my experience as a Data and DevOps Intern at Predusk Technology Pvt. Ltd. and as a final year student at IIT Goa.

## Project Structure

The project is organized into two main parts:

- **Backend**: A FastAPI application that provides API endpoints for projects, skills, and contact form
- **Frontend**: A React application that consumes the API and presents the portfolio content

## Features

- Responsive design for all device sizes
- Projects showcase with filtering options
- Skills categorization and visualization
- Contact form with email integration
- Modern UI with animations

## Technologies Used

### Backend
- FastAPI
- Pydantic
- Python 3.11+

### Frontend
- React
- React Router
- Styled Components
- Framer Motion
- Axios

## Getting Started

### Prerequisites

- Node.js 18+
- Python 3.11+
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python -m venv venv
```

3. Activate the virtual environment:
   - Windows: 
   ```bash
   venv\Scripts\activate
   ```
   - Unix/MacOS: 
   ```bash
   source venv/bin/activate
   ```

4. Install dependencies:
```bash
pip install -r requirements.txt
```

5. Run the application:
```bash
uvicorn app.main:app --reload
```

The backend will be available at http://localhost:8000.

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend will be available at http://localhost:3000.

## Docker Deployment

Both the backend and frontend include Dockerfiles for containerization.

### Build and run the backend:
```bash
cd backend
docker build -t portfolio-backend .
docker run -p 8000:8000 portfolio-backend
```

### Build and run the frontend:
```bash
cd frontend
docker build -t portfolio-frontend .
docker run -p 80:80 portfolio-frontend
```

## License

This project is licensed under the MIT License - see the LICENSE file for details. 