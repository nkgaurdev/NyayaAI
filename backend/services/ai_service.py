import os
from dotenv import load_dotenv
from langchain_groq import ChatGroq
from langchain_core.messages import HumanMessage

# Load environment variables from .env
load_dotenv()

def analyze_document(text):

    llm = ChatGroq(
        model="llama-3.3-70b-versatile",
        api_key=os.getenv("GROQ_API_KEY")
    )

    response = llm.invoke([
        HumanMessage(
            content=f"""
You are an AI legal assistant for gig workers.

Analyze the following document and provide:

1. Summary of the document
2. Important clauses
3. Potential risks for the worker
4. Rights that the worker should know
5. Simple explanation in plain English

Document:

{text[:5000]}
"""
        )
    ])

    return response.content

def check_ai():
    return {
        "ai_status": "configured"
    }