from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import google.generativeai as genai
import os
from dotenv import load_dotenv
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

router = APIRouter()

# Define the context about you
PERSONAL_CONTEXT = """
I am Onkar Arjun Mundhe, a final year student at IIT Goa and currently working as a Data and DevOps Intern at Predusk Technology Pvt. Ltd.

Education:
- Currently pursuing B.Tech at IIT Goa
- Specializing in Computer Science and Engineering

Experience:
- Data and DevOps Intern at Predusk Technology Pvt. Ltd.
- Working on data pipelines and infrastructure automation

Skills:
1. Programming Languages: Python, JavaScript, HTML, CSS
2. DevOps Tools: Git,aws,selenium,deployment on vm
3. Cloud Technologies: Experience with cloud infrastructure
4. Data Analysis: Experience with data processing and analysis
5. Real-time Systems: Knowledge of scheduling algorithms and embedded systems

Projects:
1. Weakly-Hard Real-Time Scheduling
   - A real-time scheduling system for embedded systems
   - Implements scheduling algorithms for systems where some deadline misses are acceptable
   - Technologies: Python, Real-time Systems, Scheduling Algorithms

2. Typing Speed Test
   - Interactive web application for measuring typing speed and accuracy
   - Features real-time WPM calculation and accuracy tracking
   - Technologies: JavaScript, HTML, CSS

3. PDF Summary Generator
   - AI-powered tool for generating concise summaries from PDF documents
   - Uses natural language processing for text extraction and summarization
   - Technologies: Python, PDF Processing

Location: Pune, India
Hometown: Pune
Contact: onkarmundhe995@gmail.com
"""

# Hard-coded responses for common questions as fallback
FALLBACK_RESPONSES = {
    "projects": "Onkar has worked on several projects including Weakly-Hard Real-Time Scheduling, Typing Speed Test, and PDF Summary Generator. Each showcases different technical skills in areas like Python programming, real-time systems, web development, and natural language processing.",
    "education": "Onkar is currently pursuing his B.Tech at IIT Goa, specializing in Computer Science and Engineering.",
    "experience": "Onkar is currently working as a Data and DevOps Intern at Predusk Technology Pvt. Ltd. where he is focusing on data pipelines and infrastructure automation.",
    "skills": "Onkar's key skills include: Programming Languages (Python, JavaScript, HTML, CSS), DevOps Tools (Git, Docker), Cloud Technologies, Data Analysis, and Real-time Systems.",
    "contact": "You can contact Onkar via email at onkarmundhe995@gmail.com. He is located in Goa, India.",
    "hello": "Hello! I'm Onkar's portfolio assistant. I can tell you about his education, experience, skills, and projects. What would you like to know?",
    "default": "I'm Onkar's portfolio assistant. I can provide information about his education, experience, skills, and projects. How can I help you today?"
}

class ChatMessage(BaseModel):
    message: str

def get_fallback_response(message: str) -> str:
    """Determine a fallback response based on message keywords"""
    message = message.lower()
    
    if any(keyword in message for keyword in ["project", "work", "portfolio"]):
        return FALLBACK_RESPONSES["projects"]
    elif any(keyword in message for keyword in ["education", "study", "college", "university", "degree", "iit"]):
        return FALLBACK_RESPONSES["education"]
    elif any(keyword in message for keyword in ["experience", "job", "intern", "work"]):
        return FALLBACK_RESPONSES["experience"]
    elif any(keyword in message for keyword in ["skill", "technology", "programming", "language", "tool"]):
        return FALLBACK_RESPONSES["skills"]
    elif any(keyword in message for keyword in ["contact", "email", "reach", "location"]):
        return FALLBACK_RESPONSES["contact"]
    elif any(keyword in message for keyword in ["hello", "hi", "hey", "greetings"]):
        return FALLBACK_RESPONSES["hello"]
    else:
        return FALLBACK_RESPONSES["default"]

# Initialize Gemini when API key is available
gemini_available = False
model = None

try:
    api_key = os.getenv('GEMINI_API_KEY')
    if api_key:
        genai.configure(api_key=api_key)
        model = genai.GenerativeModel('gemini-1.5-flash')
        gemini_available = True
        logger.info("Gemini API initialized successfully")
    else:
        logger.warning("GEMINI_API_KEY not found in environment variables")
except Exception as e:
    logger.error(f"Error initializing Gemini API: {str(e)}")

@router.post("/chat")
async def chat_with_bot(chat_message: ChatMessage):
    try:
        message = chat_message.message
        logger.info(f"Received message: {message}")
        
        # Use Gemini if available
        if gemini_available and model:
            try:
                # Construct the prompt with context
                prompt = f"""You are a professional assistant that only answers questions about Onkar Mundhe based on the following information. 
                If the question is not related to this information or you're unsure, politely say you can only answer questions about Onkar's education, experience, skills, and projects.
                
                Context:
                {PERSONAL_CONTEXT}
                
                Question: {message}
                
                Please provide a concise and relevant answer based only on the information provided above."""

                # Generate response using Gemini with timeout
                logger.info("Sending request to Gemini API")
                response = model.generate_content(prompt)
                logger.info("Received response from Gemini API")
                
                return {"response": response.text}
            
            except Exception as gemini_error:
                logger.error(f"Gemini API error: {str(gemini_error)}")
                # Fall back to rule-based responses
                fallback = get_fallback_response(message)
                return {"response": fallback}
        else:
            # Use fallback responses when Gemini is not available
            logger.info("Using fallback response system")
            fallback = get_fallback_response(message)
            return {"response": fallback}
            
    except Exception as e:
        logger.error(f"Unexpected error in chat endpoint: {str(e)}")
        raise HTTPException(status_code=500, detail="An unexpected error occurred while processing your request.") 