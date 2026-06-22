# NyayaAI

AI-Powered Gig Worker Rights Copilot

## Problem Statement

Gig workers often sign platform agreements, freelance contracts, and service terms without understanding hidden risks, unfair clauses, or the impact on their rights.

NyayaAI helps workers upload contracts and receive AI-powered risk analysis, clause explanations, evidence extraction, and actionable recommendations.

---

## Current Features

### Document Processing

✅ PDF Upload

✅ PDF Text Extraction

✅ Large Contract Processing

### AI Analysis

✅ AI-Powered Contract Analysis

✅ Worker Rights Assessment

✅ Contract Risk Detection

✅ Clause Severity Classification

### Evidence-Based Insights

✅ Exact Clause Extraction

✅ Evidence-Based Risk Identification

✅ Explainable Recommendations

### Risk Assessment Engine

✅ High / Medium / Low Risk Classification

✅ Explainable Risk Scoring

✅ Score Reasoning

### Structured Output

✅ JSON-Based Analysis Results

✅ Issue Classification

✅ Risk Assessment Reports

---

## Tech Stack

* FastAPI
* Python
* PyPDF2
* LangChain
* Groq Llama 3.3 70B
* Python Dotenv

---

## Project Structure

backend/
├── services/
│ ├── pdf_service.py
│ └── ai_service.py
├── uploads/
├── main.py
└── requirements.txt

---

## API Endpoints

GET /

GET /health

GET /ai-status

POST /upload-pdf

POST /extract-text

POST /analyze-pdf

---

## Example Workflow

PDF Upload

↓

Text Extraction

↓

AI Analysis

↓

Issue Detection

↓

Evidence Extraction

↓

Risk Scoring

↓

Worker-Friendly Recommendations

---

## Current Capabilities

* Detect potentially unfair clauses
* Extract supporting evidence from contracts
* Classify issue severity
* Generate explainable risk scores
* Highlight worker rights concerns
* Provide plain-English explanations
* Return structured JSON responses

---

## Installation

git clone <repo-url>

cd backend

pip install -r requirements.txt

uvicorn main:app --reload
