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

# Get CORS origins from environment variable
cors_origins = os.getenv("CORS_ORIGINS", "http://localhost:3000").split(",")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
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