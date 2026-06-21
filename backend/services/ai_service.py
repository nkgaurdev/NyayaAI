from langchain_groq import ChatGroq
from langchain_core.messages import HumanMessage
import os

def analyze_document(text):

    llm = ChatGroq(
        model="llama-3.3-70b-versatile",
        api_key=os.getenv("GROQ_API_KEY")
    )

    prompt = f"""
You are NyayaAI, an AI legal assistant for gig workers.

Analyze the document and return EXACTLY in the following format.

# Document Summary

# Detected Issues

For each issue provide:

Issue Name

Severity:
🔴 High
🟡 Medium
🟢 Low

Reason

Use these severity indicators:

🔴 = High Risk
🟡 = Medium Risk
🟢 = Low Risk

Always include the emoji before the severity.

Specifically check for:

1. Worker Misclassification
2. Unilateral Termination
3. Payment Deductions
4. Arbitration Clauses
5. Liability Transfer
6. Data Ownership Concerns
7. Policy Changes Without Consent

# Worker Rights Affected

# Risk Score
Give a score from 0 to 100.

# Risk Level
Low / Medium / High

# Recommended Actions

# Plain English Explanation

Document:

{text[:5000]}
"""

    response = llm.invoke([
        HumanMessage(content=prompt)
    ])

    return response.content