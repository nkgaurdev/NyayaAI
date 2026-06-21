import json
import os

from langchain_groq import ChatGroq
from langchain_core.messages import HumanMessage


def analyze_document(text):

    llm = ChatGroq(
        model="llama-3.3-70b-versatile",
        api_key=os.getenv("GROQ_API_KEY")
    )

    prompt = f"""
You are NyayaAI.

Return ONLY valid JSON.

Do not return markdown.
Do not return explanations.
Do not return code fences.

Return this schema exactly:

{{
  "summary": "",
  "issues": [
    {{
      "name": "",
      "severity": "",
      "reason": ""
    }}
  ],
  "worker_rights": "",
  "risk_score": 0,
  "risk_level": "",
  "recommendations": "",
  "plain_english": ""
}}

Analyze this document:

{text[:5000]}
"""

    response = llm.invoke([
        HumanMessage(content=prompt)
    ])

    try:
        return json.loads(response.content)

    except Exception:
        return {
            "error": "Invalid JSON returned by model",
            "raw_response": response.content
        }