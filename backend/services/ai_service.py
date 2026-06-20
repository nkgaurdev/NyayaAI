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

Analyze the following contract or document.

Return:

# 1. Document Summary

# 2. Potentially Unfair Clauses
List clauses that may be harmful to workers.

# 3. Worker Rights Affected
Explain what rights could be impacted.

# 4. Risk Level
Low / Medium / High

# 5. Recommended Action
What should the worker do?

# 6. Plain English Explanation
Explain everything in very simple language.

Document:

{text[:5000]}
"""

    response = llm.invoke([
        HumanMessage(content=prompt)
    ])

    return response.content