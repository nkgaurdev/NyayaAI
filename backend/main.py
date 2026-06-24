import json
from fastapi.middleware.cors import CORSMiddleware
from services.ai_service import analyze_document
from fastapi import FastAPI, UploadFile, File
from services.comparison_service import compare_contracts
from dotenv import load_dotenv

load_dotenv()
from services.pdf_service import (
    extract_text_from_pdf,
    extract_pages_from_pdf
)
from services.ai_service import analyze_document
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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

    pages = extract_pages_from_pdf(
        file_path
   )

    full_text = ""

    for page in pages:
        full_text += page["text"] + "\n"

    analysis = analyze_document(
        full_text
   )
    
    analysis["page_count"] = len(pages)

    return {
    "filename": file.filename,
    "analysis": analysis,
    "document_length": len(full_text),
    "status": "analyzed"
}

@app.post("/compare-contracts")
async def compare_contracts_endpoint(

    file1: UploadFile = File(...),
    file2: UploadFile = File(...)
):

    path1 = os.path.join(
        UPLOAD_DIR,
        file1.filename
    )

    path2 = os.path.join(
        UPLOAD_DIR,
        file2.filename
    )

    with open(path1, "wb") as buffer:
        buffer.write(await file1.read())

    with open(path2, "wb") as buffer:
        buffer.write(await file2.read())

    text1 = extract_text_from_pdf(path1)
    text2 = extract_text_from_pdf(path2)

    analysis1 = analyze_document(text1)
    analysis2 = analyze_document(text2)



    print("\n========== CONTRACT 1 ==========")
    print("Risk Score:", analysis1.get("risk_score"))
    print("Issues:", len(analysis1.get("issues", [])))
    print("Issue Names:", [i.get("name") for i in analysis1.get("issues", [])])

    print("\n========== CONTRACT 2 ==========")
    print("Risk Score:", analysis2.get("risk_score"))
    print("Issues:", len(analysis2.get("issues", [])))
    print("Issue Names:", [i.get("name") for i in analysis2.get("issues", [])])
    print("================================\n")
    
    comparison = compare_contracts(
        analysis1,
        analysis2
    )

    return {
        "contract1": analysis1,
        "contract2": analysis2,
        "comparison": comparison
    }