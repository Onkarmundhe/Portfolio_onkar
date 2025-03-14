from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import Dict, Any, List, Optional
import json
import os
from pathlib import Path
import re

router = APIRouter(
    prefix="/api/chatbot",
    tags=["chatbot"],
    responses={404: {"description": "Not found"}},
)

class ChatbotRequest(BaseModel):
    message: str

class ChatbotResponse(BaseModel):
    response: str

# Load knowledge base
KNOWLEDGE_BASE_PATH = Path(__file__).parent.parent / "data" / "chatbot_knowledge.json"

# Create knowledge base if it doesn't exist
def ensure_knowledge_base():
    if not KNOWLEDGE_BASE_PATH.exists():
        # Create parent directories if they don't exist
        KNOWLEDGE_BASE_PATH.parent.mkdir(parents=True, exist_ok=True)
        
        # Create a default knowledge base
        default_knowledge = {
            "profile": {
                "name": "Onkar Arjun Mundhe",
                "title": "Data and DevOps Intern",
                "education": "Pursuing Master's in Computer Science at Northeastern University",
                "location": "Boston, MA",
                "about": "Passionate about data engineering, cloud technologies, and building scalable applications."
            },
            "skills": [
                {"category": "Programming", "items": ["Python", "JavaScript", "Java", "SQL", "C++"]},
                {"category": "Web Development", "items": ["React", "Node.js", "FastAPI", "HTML/CSS"]},
                {"category": "Data Engineering", "items": ["Pandas", "NumPy", "Spark", "Hadoop"]},
                {"category": "DevOps", "items": ["Docker", "Kubernetes", "CI/CD", "AWS", "Azure"]}
            ],
            "projects": [
                {
                    "title": "Portfolio Website",
                    "description": "A personal portfolio website built with React and FastAPI",
                    "technologies": ["React", "FastAPI", "Docker", "PostgreSQL"]
                },
                {
                    "title": "Data Pipeline Automation",
                    "description": "Automated ETL pipeline for processing large datasets",
                    "technologies": ["Python", "Apache Airflow", "AWS S3", "Redshift"]
                },
                {
                    "title": "Cloud-Native Application",
                    "description": "Microservices-based application deployed on Kubernetes",
                    "technologies": ["Docker", "Kubernetes", "Go", "MongoDB"]
                }
            ],
            "faqs": [
                {
                    "question": "What are your main skills?",
                    "answer": "My main skills include Python, JavaScript, React, FastAPI, Docker, and cloud technologies like AWS and Azure."
                },
                {
                    "question": "What is your educational background?",
                    "answer": "I'm pursuing a Master's degree in Computer Science at Northeastern University."
                },
                {
                    "question": "What kind of projects have you worked on?",
                    "answer": "I've worked on web applications, data engineering projects, and cloud-native applications using technologies like React, FastAPI, Docker, and various cloud services."
                },
                {
                    "question": "Are you available for hire?",
                    "answer": "I'm currently working as a Data and DevOps Intern, but I'm open to discussing new opportunities. Feel free to contact me through the contact form."
                }
            ]
        }
        
        with open(KNOWLEDGE_BASE_PATH, "w") as f:
            json.dump(default_knowledge, f, indent=2)

# Load knowledge base
def get_knowledge_base():
    ensure_knowledge_base()
    try:
        with open(KNOWLEDGE_BASE_PATH, "r") as f:
            return json.load(f)
    except Exception as e:
        print(f"Error loading knowledge base: {e}")
        return {}

# Simple keyword-based response system
def generate_response(message: str, knowledge_base: Dict[str, Any]) -> str:
    message = message.lower().strip()
    
    # Handle conversational phrases first
    
    # Thank you variations
    if re.search(r'\b(thank|thanks|thx|ty)\b', message):
        return "You're welcome! I'm happy to help. Is there anything else you'd like to know about Onkar?"
    
    # Goodbye variations
    if re.search(r'\b(bye|goodbye|see you|farewell)\b', message):
        return "Goodbye! Feel free to chat again if you have more questions about Onkar's experience or projects."
    
    # How are you variations
    if re.search(r'\b(how are you|how\'s it going|how do you do|what\'s up)\b', message):
        return "I'm just a digital assistant, but I'm functioning well! How can I help you learn more about Onkar today?"
    
    # Simple yes/no
    if message in ["yes", "yeah", "yep", "sure"]:
        return "Great! What would you like to know? You can ask about Onkar's skills, projects, education, or work experience."
    
    if message in ["no", "nope", "not now"]:
        return "Alright! Feel free to ask if you have questions later."
    
    # Check for greetings - more comprehensive matching
    if re.search(r'\b(hello|hi|hey|greetings|howdy)\b', message):
        return f"Hello! I'm an AI assistant for Onkar's portfolio. How can I help you today?"
    
    # Check for questions about skills - more specific matching with word boundaries
    if re.search(r'\b(skills?|technologies|tech stack|programming|languages|tools|frameworks|what can you do)\b', message):
        skills_response = "Onkar's key skills include:\n"
        for skill_category in knowledge_base.get("skills", []):
            skills_response += f"• {skill_category['category']}: {', '.join(skill_category['items'])}\n"
        return skills_response
    
    # Check for questions about projects - more specific matching
    if re.search(r'\b(projects?|portfolio|work|built|developed|created|applications?|apps?)\b', message):
        projects_response = "Here are some of Onkar's notable projects:\n"
        for project in knowledge_base.get("projects", []):
            projects_response += f"• {project['title']}: {project['description']} (Technologies: {', '.join(project['technologies'])})\n"
        return projects_response
    
    # Check for questions about education or background
    if re.search(r'\b(education|degree|university|college|school|academic|background|study|studied)\b', message):
        profile = knowledge_base.get("profile", {})
        return f"Onkar is {profile.get('education', 'pursuing higher education')}."
    
    # Check for questions about contact or availability
    if re.search(r'\b(contact|hire|available|job|opportunity|email|reach|get in touch)\b', message):
        return "You can contact Onkar through the contact form on this website. He's currently working as a Data and DevOps Intern but is open to discussing new opportunities."
    
    # Check for questions about location
    if re.search(r'\b(location|based|live|city|country|where)\b', message):
        profile = knowledge_base.get("profile", {})
        return f"Onkar is based in {profile.get('location', 'Boston, MA')}."
    
    # Check for questions about the person
    if re.search(r'\b(about|who|tell me about|introduction|background|person|yourself)\b', message):
        profile = knowledge_base.get("profile", {})
        return f"{profile.get('about', 'Onkar is passionate about technology and building innovative solutions.')}"
    
    # Help command
    if re.search(r'\b(help|assist|support|what can you do|commands|options)\b', message):
        return "I can answer questions about Onkar's:\n• Skills and technologies\n• Projects and portfolio\n• Education and background\n• Contact information\n• Location\nJust ask me anything you'd like to know!"
    
    # Check for FAQs - using more careful matching to avoid false positives
    for faq in knowledge_base.get("faqs", []):
        question = faq.get("question", "").lower()
        # Split the question into keywords and check if any significant keywords (length > 3) are in the message
        keywords = [word for word in question.split() if len(word) > 3]
        if any(re.search(r'\b' + re.escape(keyword) + r'\b', message) for keyword in keywords):
            return faq.get("answer", "")
    
    # Default response
    return "I don't have specific information about that. Feel free to ask about Onkar's skills, projects, education, or contact information. You can also try rephrasing your question."

@router.post("", response_model=ChatbotResponse)
async def chat(request: ChatbotRequest):
    try:
        knowledge_base = get_knowledge_base()
        response = generate_response(request.message, knowledge_base)
        return ChatbotResponse(response=response)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing request: {str(e)}") 