# NyayaAI

AI-powered Gig Worker Rights Copilot

## Problem Statement

Gig workers often sign contracts and agreements without understanding hidden risks, unfair clauses, or missing worker protections.

NyayaAI helps workers upload documents and receive AI-powered analysis of potential risks.

---

## Current Features

✅ FastAPI Backend

✅ Swagger API Documentation

✅ PDF Upload Endpoint

✅ PDF Text Extraction using PyPDF2

✅ Groq AI Integration Setup

---

## Tech Stack

- FastAPI
- Python
- PyPDF2
- LangChain
- Groq LLM
- Python Dotenv

---

## Project Structure

backend/
├── routes/
├── services/
├── uploads/
├── main.py
└── requirements.txt

---

## API Endpoints

GET /

GET /health

POST /upload-pdf

POST /extract-text

---

## Future Roadmap

- AI Contract Analysis
- Risk Detection
- Worker Rights Recommendation Engine
- Legal Clause Summarization

---

## Installation

git clone <repo-url>

cd backend

pip install -r requirements.txt

uvicorn main:app --reload
