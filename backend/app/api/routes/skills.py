from fastapi import APIRouter, HTTPException, status
from typing import List, Dict, Any
from pydantic import BaseModel, Field

from app.core.models import Skill
from app.utils.helpers import load_data_from_json, get_data_dir

router = APIRouter()

# Define skills file path
SKILLS_FILE = get_data_dir() / "skills.json"

# Define a simple model for the categories response
class SkillsDataResponse(BaseModel):
    categories: List[Dict[str, Any]]

# Static skills data - this won't require loading from a JSON file
SKILLS_DATA = {
    "categories": [
        {
            "name": "Programming Languages",
            "skills": [
                {"id": 1, "name": "Python", "level": 90, "category": "Programming Languages", "proficiency": 5, "icon": "fab fa-python", "description": "Advanced proficiency in Python"},
                {"id": 2, "name": "JavaScript", "level": 85, "category": "Programming Languages", "proficiency": 4, "icon": "fab fa-js", "description": "Frontend and backend development"},
                {"id": 3, "name": "HTML/CSS", "level": 80, "category": "Programming Languages", "proficiency": 4, "icon": "fab fa-html5", "description": "Web development"},
                {"id": 4, "name": "C++", "level": 75, "category": "Programming Languages", "proficiency": 3, "icon": "fas fa-code", "description": "System programming"},
                {"id": 5, "name": "C", "level": 70, "category": "Programming Languages", "proficiency": 3, "icon": "fas fa-code", "description": "Low-level programming"}
            ]
        },
        {
            "name": "DevOps & Tools",
            "skills": [
                {"id": 6, "name": "Git", "level": 85, "category": "DevOps & Tools", "proficiency": 4, "icon": "fab fa-git-alt", "description": "Version control"},
                {"id": 7, "name": "AWS", "level": 80, "category": "DevOps & Tools", "proficiency": 4, "icon": "fab fa-aws", "description": "Cloud services"},
                {"id": 8, "name": "Selenium", "level": 70, "category": "DevOps & Tools", "proficiency": 3, "icon": "fas fa-vial", "description": "Testing automation"},
                {"id": 9, "name": "Deployment on VM", "level": 75, "category": "DevOps & Tools", "proficiency": 3, "icon": "fas fa-server", "description": "Virtual machine deployment"}
            ]
        },
        {
            "name": "Data & Analytics",
            "skills": [
                {"id": 10, "name": "SQL", "level": 85, "category": "Data & Analytics", "proficiency": 4, "icon": "fas fa-database", "description": "Database queries"},
                {"id": 11, "name": "Machine Learning", "level": 80, "category": "Data & Analytics", "proficiency": 4, "icon": "fas fa-brain", "description": "AI and ML algorithms"}
            ]
        },
        {
            "name": "Web Technologies",
            "skills": [
                {"id": 12, "name": "React.js", "level": 85, "category": "Web Technologies", "proficiency": 4, "icon": "fab fa-react", "description": "Frontend framework"},
                {"id": 13, "name": "Node.js", "level": 80, "category": "Web Technologies", "proficiency": 4, "icon": "fab fa-node-js", "description": "Backend JavaScript"},
                {"id": 14, "name": "FastAPI", "level": 85, "category": "Web Technologies", "proficiency": 4, "icon": "fas fa-bolt", "description": "Python web framework"},
                {"id": 15, "name": "Streamlit", "level": 80, "category": "Web Technologies", "proficiency": 4, "icon": "fas fa-stream", "description": "Data apps"}
            ]
        },
        {
            "name": "Artificial Intelligence",
            "skills": [
                {"id": 16, "name": "AI Agents", "level": 80, "category": "Artificial Intelligence", "proficiency": 4, "icon": "fas fa-robot", "description": "Building intelligent agents"}
            ]
        }
    ]
}

# Helper function to get all skills as a flat list
def get_all_skills_list():
    return [skill for category in SKILLS_DATA["categories"] for skill in category["skills"]]

# First, define specific routes with fixed paths before the parameterized routes
@router.get("/categories", response_model=SkillsDataResponse, summary="Get skills categories")
async def get_skills_categories():
    """Get skills grouped by category"""
    try:
        return SKILLS_DATA
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/all", response_model=List[dict], summary="Get all skills")
async def get_skills():
    """
    Retrieve all skills.
    
    Returns:
        List of skill objects
    """
    try:
        # Try loading from file first
        if SKILLS_FILE.exists():
            skills = load_data_from_json(str(SKILLS_FILE))
            return skills
        else:
            # Fall back to static data
            return get_all_skills_list()
    except Exception as e:
        # Fall back to static data if there's an error
        return get_all_skills_list()

@router.get("/by-category", response_model=Dict[str, List[dict]], summary="Get skills by category")
async def get_skills_by_category():
    """
    Retrieve skills grouped by category.
    
    Returns:
        Dictionary with categories as keys and lists of skills as values
    """
    try:
        # Try to load from file first
        if SKILLS_FILE.exists():
            skills = load_data_from_json(str(SKILLS_FILE))
            
            result = {}
            for skill in skills:
                category = skill.get("category", "Other")
                if category not in result:
                    result[category] = []
                result[category].append(skill)
            
            return result
        else:
            # Fall back to static data
            result = {}
            for skill in get_all_skills_list():
                category = skill.get("category", "Other")
                if category not in result:
                    result[category] = []
                result[category].append(skill)
            
            return result
    except Exception as e:
        # Fall back to static data if there's an error
        raise HTTPException(status_code=500, detail=str(e))

# Then, define parameterized routes after the fixed paths
@router.get("/{skill_id}")
async def get_skill_by_id(skill_id: int):
    """Get a specific skill by ID"""
    try:
        all_skills = get_all_skills_list()
        for skill in all_skills:
            if skill["id"] == skill_id:
                return skill
        raise HTTPException(status_code=404, detail=f"Skill with ID {skill_id} not found")
    except Exception as e:
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(status_code=500, detail=str(e))

@router.get("")
async def get_all_skills():
    """Get all skills as a flat list"""
    try:
        return get_all_skills_list()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) 