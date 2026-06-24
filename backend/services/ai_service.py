import json
import os

from langchain_groq import ChatGroq
from langchain_core.messages import HumanMessage
from services.rights_service import RIGHTS_MAP

def analyze_document(text):


    llm = ChatGroq(
    model="llama-3.3-70b-versatile",
    api_key=os.getenv("GROQ_API_KEY"),
    temperature=0
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
    "evidence": "",
    "recommendation": ""
    }}
    ],
    "worker_rights": "",
    "recommendations": "",
    "plain_english": ""
    }}

    Rules:

    1. Severity must be High, Medium, or Low.
    2. Evidence must be copied exactly from the contract.
    3. Never invent evidence.
    4. Recommendation must be practical and worker-friendly.
    5. Plain English explanation must be understandable by a non-lawyer.
    6. Avoid creating duplicate issues that mean the same thing.

    Only choose issues from this list:

    * Independent Contractor Status
    * Lack of Employment Benefits
    * No Guaranteed Income
    * Unilateral Account Suspension
    * Rating System
    * Broad Liability Clause
    * Arbitration Requirement
    * Data Privacy Concerns

    Do not invent new issue names.

    If an issue is not clearly present,
    do not include it.

    Analyze this contract:

    {text[:5000]}
    """

    response = llm.invoke([
        HumanMessage(content=prompt)
    ])

    try:

        analysis = json.loads(response.content)

        ALLOWED_ISSUES = {
            "Independent Contractor Status",
            "Lack of Employment Benefits",
            "No Guaranteed Income",
            "Unilateral Account Suspension",
            "Rating System",
            "Broad Liability Clause",
            "Arbitration Requirement",
            "Data Privacy Concerns"
        }

        analysis["issues"] = [
            issue
            for issue in analysis.get("issues", [])
            if issue.get("name") in ALLOWED_ISSUES
        ]

        print("\n========== AI ANALYSIS ==========")
        print("Issues Returned:", len(analysis.get("issues", [])))

        for issue in analysis.get("issues", []):
            print(
                issue.get("name"),
                "-",
                issue.get("severity")
            )

        print("================================\n")

        high_count = 0
        medium_count = 0
        low_count = 0

        affected_rights = set()

        for issue in analysis.get("issues", []):

            issue_name = issue.get("name", "")

            rights = RIGHTS_MAP.get(
                issue_name,
                ["Worker Rights Review Required"]
            )

            issue["rights_impact"] = rights

            for right in rights:
                affected_rights.add(right)

            severity = issue.get(
                "severity",
                ""
            ).lower()

            if severity == "high":
                issue["severity_score"] = 3
                high_count += 1

            elif severity == "medium":
                issue["severity_score"] = 2
                medium_count += 1

            elif severity == "low":
                issue["severity_score"] = 1
                low_count += 1

            else:
                issue["severity_score"] = 0

            if not issue.get("recommendation"):
                issue["recommendation"] = (
                    "Review this clause carefully and seek clarification before accepting the agreement."
                )

        risk_score = (
    high_count * 25 +
    medium_count * 15 +
    low_count * 5
)

        risk_score = min(risk_score, 100)

        if risk_score >= 75:
            risk_level = "High"
        elif risk_score >= 35:
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

        analysis["affected_rights"] = sorted(
            list(affected_rights)
        )

        issue_names = [
            f"• {issue.get('name', 'Unknown Issue')}"
            for issue in analysis.get("issues", [])
        ]

        print("\n========== RISK SCORE ==========")
        print("High Issues:", high_count)
        print("Medium Issues:", medium_count)
        print("Low Issues:", low_count)
        print("Final Risk Score:", risk_score)
        print("Risk Level:", risk_level)
        print("================================\n")

        analysis["appeal_letter"] = f"""
    ```

    Dear Platform Support,

    After reviewing this agreement using NyayaAI,
    I identified several clauses that may affect my
    rights, protections, and working conditions.

    Key concerns include:

    {chr(10).join(issue_names)}

    I respectfully request clarification regarding
    these clauses and their practical implications.

    Please provide additional information about
    worker protections, dispute resolution options,
    and available support mechanisms.

    Thank you for your assistance.

    Sincerely,

    Worker
    """


        return analysis

    except Exception as e:

        print("JSON ERROR:", str(e))
        print("RAW RESPONSE:", response.content)

        return {
            "error": "Invalid JSON returned by model",
            "raw_response": response.content
        }

