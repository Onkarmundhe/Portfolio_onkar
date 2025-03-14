from fastapi import APIRouter, HTTPException, status
from typing import List

from app.core.models import Project
from app.utils.helpers import load_data_from_json, get_data_dir

router = APIRouter()

# Project data (in a real app, this would come from a database)
PROJECTS_FILE = get_data_dir() / "projects.json"

@router.get("/projects", response_model=List[Project], summary="Get all projects")
async def get_projects():
    """
    Retrieve all projects.
    
    Returns:
        List of project objects
    """
    projects = load_data_from_json(PROJECTS_FILE)
    # Convert list of dictionaries to list of Project objects
    return [Project(**project) for project in projects]

@router.get("/projects/{project_id}", response_model=Project, summary="Get project by ID")
async def get_project(project_id: int):
    """
    Retrieve a specific project by ID.
    
    Args:
        project_id: The ID of the project to retrieve
        
    Returns:
        Project object
        
    Raises:
        HTTPException: If project not found
    """
    projects = load_data_from_json(PROJECTS_FILE)
    for project in projects:
        if project.get("id") == project_id:
            return Project(**project)
    
    # If project not found, raise 404 error
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"Project with ID {project_id} not found"
    )

@router.get("/projects/featured", response_model=List[Project], summary="Get featured projects")
async def get_featured_projects():
    """
    Retrieve all featured projects.
    
    Returns:
        List of featured project objects
    """
    projects = load_data_from_json(PROJECTS_FILE)
    featured_projects = [
        Project(**project) for project in projects if project.get("is_featured", False)
    ]
    return featured_projects 