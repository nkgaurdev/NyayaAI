import json
import os

from langchain_groq import ChatGroq
from langchain_core.messages import HumanMessage
from services.rights_service import RIGHTS_MAP


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
            "reason": "",
            "evidence": ""
        }}
    ],
    "worker_rights": "",
    "recommendations": "",
    "plain_english": ""
}}

For every issue, provide the exact clause or sentence from the document that triggered the issue.

Store it in the evidence field.

Do not invent evidence.

Only quote text found in the document.

Analyze this document:

{text[:5000]}
"""

    response = llm.invoke([
        HumanMessage(content=prompt)
    ])

    try:

        analysis = json.loads(response.content)

        high_count = 0
        medium_count = 0
        low_count = 0

        for issue in analysis.get("issues", []):

            issue_name = issue.get("name", "")

            issue["rights_impact"] = RIGHTS_MAP.get(
                issue_name,
                ["Worker Rights Review Required"]
            )

            severity = issue.get("severity", "").lower()

            if severity == "high":
                high_count += 1

            elif severity == "medium":
                medium_count += 1

            elif severity == "low":
                low_count += 1

        risk_score = (
            high_count * 20 +
            medium_count * 10 +
            low_count * 5
        )

        risk_score = min(risk_score, 100)

        if risk_score >= 70:
            risk_level = "High"
        elif risk_score >= 40:
            risk_level = "Medium"
        else:
            risk_level = "Low"

        analysis["risk_score"] = risk_score
        analysis["risk_level"] = risk_level

        analysis["high_issues"] = high_count
        analysis["medium_issues"] = medium_count
        analysis["low_issues"] = low_count

        analysis["score_reason"] = (
            f"{high_count} High + "
            f"{medium_count} Medium + "
            f"{low_count} Low issues detected"
        )

        

        return analysis

    except Exception:

        return {
            "error": "Invalid JSON returned by model",
            "raw_response": response.content
        }