from typing import List, Optional
from pydantic import BaseModel, EmailStr, HttpUrl, Field
from datetime import date

class ProjectBase(BaseModel):
    """Base model for Project data"""
    title: str
    description: str
    image_url: Optional[str] = None
    project_url: Optional[str] = None
    github_url: Optional[str] = None
    tech_stack: List[str] = []
    start_date: Optional[date] = None
    end_date: Optional[date] = None
    is_featured: bool = False

class Project(ProjectBase):
    """Complete Project model with ID"""
    id: int

class SkillBase(BaseModel):
    """Base model for Skill data"""
    name: str
    category: str
    proficiency: int = Field(..., ge=1, le=5)  # Scale of 1-5
    icon: Optional[str] = None
    description: Optional[str] = None

class Skill(SkillBase):
    """Complete Skill model with ID"""
    id: int

class ContactForm(BaseModel):
    """Model for Contact form data"""
    name: str
    email: EmailStr
    subject: str
    message: str

class ContactResponse(BaseModel):
    """Response model for Contact form submission"""
    success: bool
    message: str 