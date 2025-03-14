from fastapi import APIRouter, HTTPException, status
from typing import List, Dict, Any

from app.core.models import Skill
from app.utils.helpers import load_data_from_json, get_data_dir

router = APIRouter()

# Static skills data - this won't require loading from a JSON file
SKILLS_DATA = {
    "categories": [
        {
            "name": "Programming Languages",
            "skills": [
                {"id": 1, "name": "Python", "level": 90, "category": "Programming Languages"},
                {"id": 2, "name": "JavaScript", "level": 85, "category": "Programming Languages"},
                {"id": 3, "name": "HTML/CSS", "level": 80, "category": "Programming Languages"},
                {"id": 4, "name": "C++", "level": 75, "category": "Programming Languages"}
            ]
        },
        {
            "name": "DevOps & Tools",
            "skills": [
                {"id": 5, "name": "Git", "level": 85, "category": "DevOps & Tools"},
                {"id": 6, "name": "Docker", "level": 80, "category": "DevOps & Tools"},
                {"id": 7, "name": "CI/CD", "level": 75, "category": "DevOps & Tools"},
                {"id": 8, "name": "AWS", "level": 70, "category": "DevOps & Tools"}
            ]
        },
        {
            "name": "Data & Analytics",
            "skills": [
                {"id": 9, "name": "Data Analysis", "level": 85, "category": "Data & Analytics"},
                {"id": 10, "name": "SQL", "level": 80, "category": "Data & Analytics"},
                {"id": 11, "name": "Machine Learning", "level": 75, "category": "Data & Analytics"},
                {"id": 12, "name": "Data Visualization", "level": 70, "category": "Data & Analytics"}
            ]
        },
        {
            "name": "Web Technologies",
            "skills": [
                {"id": 13, "name": "React.js", "level": 80, "category": "Web Technologies"},
                {"id": 14, "name": "Node.js", "level": 75, "category": "Web Technologies"},
                {"id": 15, "name": "RESTful APIs", "level": 85, "category": "Web Technologies"},
                {"id": 16, "name": "FastAPI", "level": 80, "category": "Web Technologies"}
            ]
        }
    ]
}

# Helper function to get all skills as a flat list
def get_all_skills_list():
    return [skill for category in SKILLS_DATA["categories"] for skill in category["skills"]]

@router.get("/skills", response_model=List[Skill], summary="Get all skills")
async def get_skills():
    """
    Retrieve all skills.
    
    Returns:
        List of skill objects
    """
    skills = load_data_from_json(SKILLS_FILE)
    # Convert list of dictionaries to list of Skill objects
    return [Skill(**skill) for skill in skills]

@router.get("/skills/categories", response_model=Dict[str, List[Skill]], summary="Get skills by category")
async def get_skills_by_category():
    """
    Retrieve skills grouped by category.
    
    Returns:
        Dictionary with categories as keys and lists of skills as values
    """
    skills = load_data_from_json(SKILLS_FILE)
    result: Dict[str, List[Skill]] = {}
    
    for skill in skills:
        category = skill.get("category", "Other")
        if category not in result:
            result[category] = []
        result[category].append(Skill(**skill))
    
    return result

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

@router.get("/categories")
async def get_skills_by_category():
    """Get skills grouped by category"""
    try:
        return SKILLS_DATA
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) 