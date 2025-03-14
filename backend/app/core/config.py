import os
from pydantic import BaseModel
from dotenv import load_dotenv

# Load environment variables from .env file if it exists
load_dotenv()

class Settings(BaseModel):
    """Application settings"""
    API_V1_STR: str = "/api"
    PROJECT_NAME: str = "Portfolio API"
    BACKEND_CORS_ORIGINS: list = ["*"]
    
    # Email settings for contact form
    SMTP_TLS: bool = True
    SMTP_PORT: int = 587
    SMTP_HOST: str = os.getenv("SMTP_HOST", "")
    SMTP_USER: str = os.getenv("SMTP_USER", "")
    SMTP_PASSWORD: str = os.getenv("SMTP_PASSWORD", "")
    EMAILS_FROM_EMAIL: str = os.getenv("EMAILS_FROM_EMAIL", "")
    EMAILS_TO_EMAIL: str = os.getenv("EMAILS_TO_EMAIL", "")

# Instantiate the settings object
settings = Settings() 