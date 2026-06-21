from services.ai_service import analyze_document
from fastapi import FastAPI, UploadFile, File
from dotenv import load_dotenv

load_dotenv()
from services.pdf_service import extract_text_from_pdf
from services.ai_service import analyze_document
import os

app = FastAPI()

UPLOAD_DIR = "uploads"

os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.get("/")
def home():
    return {"message": "NyayaAI Backend Running"}


@app.post("/upload-pdf")
async def upload_pdf(file: UploadFile = File(...)):

    file_path = os.path.join(UPLOAD_DIR, file.filename)

    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())

    return {
        "message": "PDF uploaded successfully",
        "filename": file.filename
    }


@app.post("/extract-text")
async def extract_text(file: UploadFile = File(...)):

    file_path = os.path.join(UPLOAD_DIR, file.filename)

    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())

    extracted_text = extract_text_from_pdf(file_path)

    return {
        "filename": file.filename,
        "text": extracted_text[:3000]
    }


@app.get("/health")
def health():
    return {
        "status": "running",
        "service": "NyayaAI"
    }

@app.get("/ai-status")
def ai_status():
    return {
        "ai_status": "configured"
    }

@app.post("/analyze-pdf")
async def analyze_pdf(file: UploadFile = File(...)):

    file_path = os.path.join(
        UPLOAD_DIR,
        file.filename
    )

    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())

    extracted_text = extract_text_from_pdf(
        file_path
    )

    analysis = analyze_document(
        extracted_text
    )

    return {
    "filename": file.filename,
    "analysis": analysis,
    "document_length": len(extracted_text),
    "status": "analyzed"
}