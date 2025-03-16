from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import projects, skills, contact, chatbot
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = FastAPI(
    title="Portfolio API",
    description="API for my personal portfolio website",
    version="1.0.0",
)

# Define allowed origins
origins = [
    "http://localhost:3000",
    "https://onkarportfolio11.netlify.app",  # Your Netlify domain
    "https://portfolio-onkar.onrender.com",  # Your backend domain
]

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
    expose_headers=["*"],
    max_age=600,  # Cache preflight requests for 10 minutes
)

# Include routers
app.include_router(projects.router, prefix="/api/projects", tags=["projects"])
app.include_router(skills.router, prefix="/api/skills", tags=["skills"])
app.include_router(contact.router, prefix="/api/contact", tags=["contact"])
app.include_router(chatbot.router, prefix="/api/chatbot", tags=["chatbot"])

@app.get("/", tags=["Root"])
async def read_root():
    """Root endpoint to check API status"""
    return {"message": "Welcome to the Portfolio API"}

# Mount static files if needed
# app.mount("/static", StaticFiles(directory="static"), name="static")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True) 