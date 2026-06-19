from dotenv import load_dotenv
import os

load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

def check_ai():
    return {
        "ai_status": "configured" if GROQ_API_KEY else "missing_key"
    }