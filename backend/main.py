import os
from pathlib import Path

from dotenv import load_dotenv
from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse

from services.ai_service import analyze_document
from services.comparison_service import compare_contracts
from services.pdf_report_service import generate_pdf_report
from services.pdf_service import extract_pages_from_pdf, extract_text_from_pdf

load_dotenv(Path(__file__).resolve().parent / ".env")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://nyaya-ai-opal.vercel.app",
        "https://www.nyaya-ai-opal.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = os.getenv("UPLOAD_DIR") or "/tmp/nyayaai-uploads"

os.makedirs(UPLOAD_DIR, exist_ok=True)


def _safe_filename(filename: str | None) -> str:
    return Path(filename or "upload.pdf").name or "upload.pdf"


async def _save_upload(file: UploadFile) -> str:
    filename = _safe_filename(file.filename)
    file_path = os.path.join(UPLOAD_DIR, filename)

    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())

    return file_path


@app.get("/")
def home():
    return {"message": "NyayaAI Backend Running"}


@app.post("/upload-pdf")
@app.post("/api/upload-pdf")
async def upload_pdf(file: UploadFile = File(...)):
    try:
        file_path = await _save_upload(file)
    except Exception as exc:
        raise HTTPException(
            status_code=400, detail=f"Unable to upload PDF: {exc}"
        ) from exc

    return {"message": "PDF uploaded successfully", "filename": Path(file_path).name}


@app.post("/extract-text")
@app.post("/api/extract-text")
async def extract_text(file: UploadFile = File(...)):
    try:
        file_path = await _save_upload(file)
        extracted_text = extract_text_from_pdf(file_path)
    except Exception as exc:
        raise HTTPException(
            status_code=400, detail=f"Unable to extract text: {exc}"
        ) from exc

    return {"filename": Path(file_path).name, "text": extracted_text[:3000]}


@app.get("/health")
@app.get("/api/health")
def health():
    return {"status": "running", "service": "NyayaAI"}


@app.get("/ai-status")
def ai_status():
    return {"ai_status": "configured"}


@app.post("/analyze-pdf")
@app.post("/api/analyze-pdf")
async def analyze_pdf(file: UploadFile = File(...)):
    try:
        file_path = await _save_upload(file)
        pages = extract_pages_from_pdf(file_path)

        full_text = ""
        for page in pages:
            full_text += page["text"] + "\n"

        try:
            analysis = analyze_document(full_text)
        except Exception as exc:
            print("ANALYZE ERROR:", exc)
            analysis = {
                "summary": "Analysis unavailable right now.",
                "issues": [],
                "worker_rights": "Please review manually.",
                "recommendations": "Please try again in a moment.",
                "plain_english": "The AI analysis service could not be completed.",
                "risk_score": 0,
                "risk_level": "Low",
                "error": str(exc),
            }

        analysis["page_count"] = len(pages)

        return {
            "filename": Path(file_path).name,
            "analysis": analysis,
            "document_length": len(full_text),
            "status": "analyzed",
        }
    except Exception as exc:
        print("ANALYZE PDF ERROR:", exc)
        raise HTTPException(
            status_code=400, detail=f"Unable to analyze PDF: {exc}"
        ) from exc


@app.post("/compare-contracts")
@app.post("/api/compare-contracts")
async def compare_contracts_endpoint(
    file1: UploadFile = File(...), file2: UploadFile = File(...)
):
    try:
        path1 = await _save_upload(file1)
        path2 = await _save_upload(file2)

        text1 = extract_text_from_pdf(path1)
        text2 = extract_text_from_pdf(path2)

        analysis1 = analyze_document(text1)
        analysis2 = analyze_document(text2)

        print("\nTEXT LENGTHS")
        print(len(text1))
        print(len(text2))

        print("\n========== CONTRACT 1 ==========")
        print("Risk Score:", analysis1.get("risk_score"))
        print("Issues:", len(analysis1.get("issues", [])))
        print("Issue Names:", [i.get("name") for i in analysis1.get("issues", [])])

        print("\n========== CONTRACT 2 ==========")
        print("Risk Score:", analysis2.get("risk_score"))
        print("Issues:", len(analysis2.get("issues", [])))
        print("Issue Names:", [i.get("name") for i in analysis2.get("issues", [])])
        print("================================\n")

        comparison = compare_contracts(analysis1, analysis2)

        return {
            "contract1": analysis1,
            "contract2": analysis2,
            "comparison": comparison,
        }
    except Exception as exc:
        print("COMPARE CONTRACTS ERROR:", exc)
        raise HTTPException(
            status_code=400, detail=f"Unable to compare contracts: {exc}"
        ) from exc


@app.post("/download-report")
@app.post("/api/download-report")
async def download_report(file: UploadFile = File(...)):
    try:
        file_path = await _save_upload(file)
        text = extract_text_from_pdf(file_path)
        analysis = analyze_document(text)

        report_path = os.path.join(UPLOAD_DIR, "NyayaAI_Report.pdf")
        generate_pdf_report(analysis, report_path)

        return FileResponse(
            report_path, media_type="application/pdf", filename="NyayaAI_Report.pdf"
        )
    except Exception as exc:
        print("DOWNLOAD REPORT ERROR:", exc)
        raise HTTPException(
            status_code=400, detail=f"Unable to generate report: {exc}"
        ) from exc
