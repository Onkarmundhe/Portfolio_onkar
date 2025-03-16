import axios from 'axios';
import { projects } from './projectsData';

// Create axios instance with base URL
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Static fallback data for skills
const staticSkillsData = {
  "categories": [
    {
      "name": "Programming Languages",
      "skills": [
        {"id": 1, "name": "Python", "level": 90, "proficiency": 4.5, "description": "Expertise in data processing, APIs, and automation", "icon": "fab fa-python"},
        {"id": 2, "name": "JavaScript", "level": 85, "proficiency": 4.2, "description": "Web development, frontend and Node.js", "icon": "fab fa-js"},
        {"id": 3, "name": "HTML/CSS", "level": 80, "proficiency": 4.0, "description": "Creating responsive and accessible web interfaces", "icon": "fab fa-html5"},
        {"id": 4, "name": "C++", "level": 75, "proficiency": 3.7, "description": "System programming and embedded applications", "icon": "fas fa-code"},
        {"id": 5, "name": "C", "level": 70, "proficiency": 3.5, "description": "Low-level programming and system development", "icon": "fas fa-code"}
      ]
    },
    {
      "name": "DevOps & Tools",
      "skills": [
        {"id": 6, "name": "Git", "level": 85, "proficiency": 4.2, "description": "Version control and collaborative development", "icon": "fab fa-git-alt"},
        {"id": 7, "name": "AWS", "level": 80, "proficiency": 4.0, "description": "Cloud infrastructure and serverless applications", "icon": "fab fa-aws"},
        {"id": 8, "name": "Selenium", "level": 70, "proficiency": 3.5, "description": "Automated testing and web scraping", "icon": "fas fa-vial"},
        {"id": 9, "name": "Deployment on VM", "level": 75, "proficiency": 3.7, "description": "Virtual machine configuration and application deployment", "icon": "fas fa-server"}
      ]
    },
    {
      "name": "Data & Analytics",
      "skills": [
        {"id": 10, "name": "SQL", "level": 85, "proficiency": 4.2, "description": "Database design and complex queries", "icon": "fas fa-database"},
        {"id": 11, "name": "Machine Learning", "level": 80, "proficiency": 4.0, "description": "Predictive models and data classification", "icon": "fas fa-brain"}
      ]
    },
    {
      "name": "Web Technologies",
      "skills": [
        {"id": 12, "name": "React.js", "level": 85, "proficiency": 4.2, "description": "Building interactive user interfaces", "icon": "fab fa-react"},
        {"id": 13, "name": "Node.js", "level": 80, "proficiency": 4.0, "description": "Server-side JavaScript applications", "icon": "fab fa-node-js"},
        {"id": 14, "name": "FastAPI", "level": 85, "proficiency": 4.2, "description": "High-performance Python web frameworks", "icon": "fas fa-bolt"},
        {"id": 15, "name": "Streamlit", "level": 80, "proficiency": 4.0, "description": "Data applications and interactive dashboards", "icon": "fas fa-chart-line"}
      ]
    },
    {
      "name": "Artificial Intelligence",
      "skills": [
        {"id": 16, "name": "AI Agents", "level": 80, "proficiency": 4.0, "description": "Developing intelligent automated agents", "icon": "fas fa-robot"}
      ]
    }
  ]
};

// Projects API
export const getProjects = async () => {
  // For now, we'll return the static data
  // Later this can be replaced with an actual API call
  return Promise.resolve(projects);
};

export const getFeaturedProjects = async () => {
  try {
    const response = await api.get('/projects/featured');
    return response.data;
  } catch (error) {
    console.error('Error fetching featured projects:', error);
    throw error;
  }
};

export const getProjectById = async (id) => {
  try {
    const response = await api.get(`/projects/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching project with id ${id}:`, error);
    throw error;
  }
};

// Skills API
export const getSkills = async () => {
  try {
    const response = await api.get('/skills/all');
    return response.data;
  } catch (error) {
    console.error('Error fetching skills:', error);
    // Fallback to static data if API fails
    return Promise.resolve(
      staticSkillsData.categories.flatMap(category => category.skills)
    );
  }
};

export const getSkillsByCategory = async () => {
  try {
    const response = await api.get('/skills/categories');
    return response.data.categories || [];
  } catch (error) {
    console.error('Error fetching skills by category:', error);
    // Fallback to static data if API fails
    return staticSkillsData.categories;
  }
};

// Contact API
export const submitContactForm = async (formData) => {
  try {
    const response = await api.post('/contact', formData);
    return response.data;
  } catch (error) {
    console.error('Error submitting contact form:', error);
    throw error;
  }
};

// Chatbot API
export const sendChatbotMessage = async (message) => {
  try {
    const response = await api.post('/chatbot/chat', { message });
    return response.data;
  } catch (error) {
    console.error('Error sending message to chatbot:', error);
    throw error;
  }
}; 