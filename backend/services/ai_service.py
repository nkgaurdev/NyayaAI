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

Analyze the document and return your response STRICTLY using the following structure.

SUMMARY:
<summary here>

ISSUES:
[
{{
"name":"Worker Misclassification",
"severity":"High",
"reason":"..."
}},
{{
"name":"Unilateral Termination",
"severity":"Medium",
"reason":"..."
}}
]

WORKER_RIGHTS:
<rights affected>

RISK_SCORE:
<number from 0-100>

RISK_LEVEL:
Low / Medium / High

RECOMMENDATIONS:
<recommended actions>

PLAIN_ENGLISH:
<simple explanation>

Check specifically for:

1. Worker Misclassification
2. Unilateral Termination
3. Payment Deductions
4. Arbitration Clauses
5. Liability Transfer
6. Data Ownership Concerns
7. Policy Changes Without Consent

Document:

{text[:5000]}
"""

    response = llm.invoke([
        HumanMessage(content=prompt)
    ])

    return response.content