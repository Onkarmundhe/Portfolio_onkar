import json
import os
from pathlib import Path
from typing import List, Dict, Any, Union

# Function to load data from JSON files
def load_data_from_json(file_path: str) -> List[Dict[str, Any]]:
    """
    Load data from a JSON file
    
    Args:
        file_path: Path to the JSON file
        
    Returns:
        List of dictionaries containing the data
    """
    try:
        with open(file_path, "r") as f:
            return json.load(f)
    except FileNotFoundError:
        return []
    except json.JSONDecodeError:
        return []

# Function to save data to JSON files
def save_data_to_json(file_path: str, data: List[Dict[str, Any]]) -> bool:
    """
    Save data to a JSON file
    
    Args:
        file_path: Path to the JSON file
        data: List of dictionaries to save
        
    Returns:
        Boolean indicating success or failure
    """
    try:
        directory = os.path.dirname(file_path)
        # Create directory if it doesn't exist
        if directory and not os.path.exists(directory):
            os.makedirs(directory)
            
        with open(file_path, "w") as f:
            json.dump(data, f, indent=2)
        return True
    except Exception as e:
        print(f"Error saving data: {e}")
        return False

# Get base directory for data storage
def get_data_dir() -> Path:
    """
    Get the data directory path
    
    Returns:
        Path object pointing to the data directory
    """
    base_dir = Path(__file__).parent.parent.parent / "data"
    if not base_dir.exists():
        base_dir.mkdir(parents=True)
    return base_dir

# Send email function (placeholder)
async def send_email(
    email_to: str,
    subject: str,
    body: str,
    html_content: Union[str, None] = None
) -> bool:
    """
    Send an email (placeholder function)
    
    Args:
        email_to: Recipient email address
        subject: Email subject
        body: Plain text email body
        html_content: HTML content for the email (optional)
        
    Returns:
        Boolean indicating success or failure
    """
    # This is a placeholder. In a real application, you would implement
    # email sending logic using a library like aiosmtplib or a service like SendGrid
    print(f"Sending email to {email_to}")
    print(f"Subject: {subject}")
    print(f"Body: {body}")
    return True 