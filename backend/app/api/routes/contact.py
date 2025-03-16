from fastapi import APIRouter, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from google.oauth2 import service_account
from googleapiclient.discovery import build
from datetime import datetime
import os
from dotenv import load_dotenv
import logging
import json
from fastapi.responses import JSONResponse

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

router = APIRouter()

class ContactMessage(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str

# Google Sheets setup
SCOPES = ['https://www.googleapis.com/auth/spreadsheets']
SPREADSHEET_ID = os.getenv('GOOGLE_SHEET_ID')
RANGE_NAME = 'Sheet1!A:E'  # Updated to include all columns

def get_sheets_service():
    try:
        # Get credentials from environment variable
        creds_json = os.getenv('GOOGLE_APPLICATION_CREDENTIALS_JSON')
        if not creds_json:
            raise ValueError("Google credentials not found in environment variables")
        
        creds_dict = json.loads(creds_json)
        creds = service_account.Credentials.from_service_account_info(
            creds_dict, scopes=SCOPES)
        
        # Build the Sheets API service
        service = build('sheets', 'v4', credentials=creds)
        return service
    except Exception as e:
        logger.error(f"Error setting up Google Sheets service: {str(e)}")
        raise

@router.options("/submit")
async def options_contact_form():
    return JSONResponse(
        content={"message": "OK"},
        headers={
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
        }
    )

@router.post("/submit")
async def submit_contact_form(contact_message: ContactMessage):
    try:
        # Get the sheets service
        service = get_sheets_service()
        
        # Prepare the data
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        values = [[
            timestamp,
            contact_message.name,
            contact_message.email,
            contact_message.subject,
            contact_message.message
        ]]
        
        body = {
            'values': values
        }
        
        # Append the data to the sheet
        result = service.spreadsheets().values().append(
            spreadsheetId=SPREADSHEET_ID,
            range=RANGE_NAME,
            valueInputOption='RAW',
            insertDataOption='INSERT_ROWS',
            body=body
        ).execute()
        
        logger.info(f"Message saved to Google Sheets: {result}")
        return JSONResponse(
            content={"message": "Message sent successfully!"},
            headers={
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
            }
        )
        
    except Exception as e:
        logger.error(f"Error saving message to Google Sheets: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="An error occurred while saving your message. Please try again later."
        )