# ⚖️ NyayaAI

<div align="center">

<h3>AI-Powered Contract Intelligence Platform for Gig Workers</h3>

<p>
Understand employment contracts before you sign them.
</p>

<p>
NyayaAI uses Large Language Models (LLMs) to analyze gig worker contracts, identify potentially risky clauses, explain legal language in plain English, map affected worker rights, compare agreements, and generate professional AI-powered reports that help workers make informed decisions.
</p>

<p>

![Python](https://img.shields.io/badge/Python-3.11+-3776AB?style=for-the-badge\&logo=python\&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge\&logo=fastapi\&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge\&logo=react\&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge\&logo=vite\&logoColor=white)
![Groq](https://img.shields.io/badge/Groq-Llama%203.3%2070B-black?style=for-the-badge)
![LangChain](https://img.shields.io/badge/LangChain-AI-success?style=for-the-badge)
![MIT License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

</p>

</div>

---

## 🔗 Repository

**GitHub:** https://github.com/nkgaurdev/NyayaAI

---

# 🚀 Project Status

| Feature                    | Status |
| -------------------------- | :----: |
| AI Contract Analysis       |    ✅   |
| Risk Assessment Engine     |    ✅   |
| Worker Rights Mapping      |    ✅   |
| Plain English Explanations |    ✅   |
| AI Recommendations         |    ✅   |
| Contract Comparison        |    ✅   |
| Appeal Letter Generation   |    ✅   |
| Professional PDF Report    |    ✅   |

---

# 📑 Table of Contents

* 📖 Overview
* 🎯 Why NyayaAI?
* ⚠️ Problem Statement
* 💡 Solution
* ✨ Key Features
* 🏗️ System Architecture
* 🛠️ Technology Stack
* 📸 Product Walkthrough
* 📂 Project Structure
* ⚙️ Installation
* 🔑 Environment Variables
* ▶️ Running the Application
* 📡 API Overview
* 🔒 Privacy & Security
* 🚀 Future Enhancements
* 📌 Use Cases
* 🤝 Contributing
* 📄 License

---

# 📖 Overview

Digital employment agreements often contain legal language that is difficult for workers to interpret. Important clauses related to income, liability, dispute resolution, and platform policies can easily be overlooked, resulting in workers accepting contracts without fully understanding their implications.

NyayaAI is an AI-powered contract intelligence platform that transforms complex agreements into structured, easy-to-understand insights. By combining document processing, Large Language Models, and an intuitive dashboard, the platform helps workers review contracts more confidently before making important decisions.

Rather than replacing legal professionals, NyayaAI is designed to improve contract awareness by providing clear explanations, structured risk analysis, and practical recommendations.

---

# 🎯 Why NyayaAI?

The gig economy has made employment more flexible, but it has also increased reliance on digital agreements that many workers accept without careful review.

NyayaAI was created to make contract analysis more accessible by using AI to:

* Identify potentially risky clauses
* Simplify legal terminology
* Highlight affected worker rights
* Compare multiple agreements
* Generate actionable recommendations
* Produce professional downloadable reports

The goal is to improve transparency and help workers make more informed decisions before accepting contractual obligations.

---

# ⚠️ Problem Statement

Modern employment agreements are often:

* Lengthy and difficult to read
* Written using complex legal terminology
* Time-consuming to review manually
* Difficult to compare objectively
* Accepted without understanding long-term implications

As a result, workers may unknowingly agree to contractual terms that affect their rights, responsibilities, earnings, or dispute resolution options.

---

# 💡 Solution

NyayaAI enables users to upload a text-based PDF contract and receive a structured AI-assisted analysis within seconds.

The platform performs multiple analysis tasks, including:

* Detecting potentially risky contractual clauses
* Categorizing issues by severity
* Mapping clauses to affected worker rights
* Translating legal language into plain English
* Generating practical recommendations
* Comparing multiple contracts side-by-side
* Producing downloadable PDF reports
* Generating AI-assisted appeal letters

The result is a faster, more accessible, and more transparent contract review experience for gig workers.

---

# ✨ Core Features

## 🤖 AI-Powered Contract Analysis

Analyze employment contracts using Groq Llama 3.3 to identify important clauses, summarize legal content, and generate structured insights within seconds.

---

## ⚠️ Intelligent Risk Assessment

Automatically evaluates contractual risks by:

* Calculating an overall risk score
* Categorizing issues into High, Medium, and Low severity
* Providing confidence indicators
* Visualizing risk distribution

---

## ⚖️ Worker Rights Mapping

NyayaAI connects detected contractual clauses with worker rights that may be affected, including:

* Employment Classification
* Income Security
* Account Suspension Policies
* Liability & Responsibilities
* Arbitration Requirements
* Data Privacy

---

## 📄 Plain English Explanations

Complex legal terminology is translated into clear, understandable language, making contracts easier to interpret without requiring legal expertise.

---

## 💡 AI Recommendations

Each detected issue includes practical recommendations that help users understand possible actions before accepting an agreement.

---

## ✉️ AI Appeal Letter Generator

Automatically generates a professional appeal letter summarizing detected concerns and requesting clarification regarding contractual clauses.

---

## 📊 Contract Comparison

Compare two employment contracts side-by-side to evaluate:

* Overall Risk Scores
* Individual Contract Issues
* AI-generated Comparison Summary
* Recommended Safer Agreement

---

## 📥 Professional PDF Report

Export analysis results into a structured PDF containing:

* Executive Summary
* Risk Assessment
* Detailed Issues
* Worker Rights
* Recommendations
* Plain English Explanation
* AI Appeal Letter

---

# 🏗️ System Architecture

```text
                     User Uploads PDF Contract
                               │
                               ▼
                    PDF Text Extraction Layer
                               │
                               ▼
                 Groq Llama 3.3 70B Large Language Model
                               │
         ┌─────────────────────┼─────────────────────┐
         ▼                     ▼                     ▼
 Clause Detection      Rights Mapping       Risk Assessment
         │                     │                     │
         └─────────────────────┼─────────────────────┘
                               ▼
                Recommendation Generation Engine
                               │
                               ▼
 Dashboard │ Comparison │ PDF Report │ Appeal Letter
```

---

# 🛠️ Technology Stack

| Category              | Technologies                                   |
| --------------------- | ---------------------------------------------- |
| **Frontend**          | React • Vite • Tailwind CSS                    |
| **Backend**           | FastAPI • Python                               |
| **AI & LLM**          | Groq API (Llama 3.3 70B Versatile) • LangChain |
| **PDF Processing**    | PyMuPDF • ReportLab                            |
| **Charts**            | Chart.js                                       |
| **Development Tools** | Git • GitHub • VS Code                         |

---

# 🚀 Product Walkthrough

## 1️⃣ Landing Page

The landing page introduces NyayaAI with a clean interface focused on helping workers understand contracts before signing them.

<p align="center">
<img src="docs/landing-page.jpg" width="950">
</p>

---

## 2️⃣ Upload Contract

Users can securely upload text-based PDF contracts for AI analysis.

<p align="center">
<img src="docs/upload-contract.jpg" width="950">
</p>

---

## 3️⃣ AI Analysis Pipeline

NyayaAI provides a transparent analysis workflow showing each processing stage.

### Processing Pipeline

* 📄 Upload Contract
* 📑 Extract Text
* 🤖 Analyze Clauses
* ⚠️ Detect Risks
* ⚖️ Map Worker Rights
* 📊 Generate AI Insights

<p align="center">
<img src="docs/analysis-pipeline.jpg" width="950">
</p>

---

## 4️⃣ AI Risk Assessment Dashboard

The dashboard provides an overview of the analyzed contract, including:

* Overall Risk Score
* Risk Level
* AI Analysis Confidence
* Issue Distribution

<p align="center">
<img src="docs/risk-dashboard.jpg" width="950">
</p>

---

## 5️⃣ Risk Distribution

Interactive visualization of detected contractual risks.

<p align="center">
<img src="docs/risk-distribution.jpg" width="750">
</p>

---

## 6️⃣ AI Key Insights

Instantly highlights the most significant contractual concerns requiring user attention.

<p align="center">
<img src="docs/ai-key-insights.jpg" width="950">
</p>

---

## 7️⃣ Worker Rights Mapping

Displays the worker rights associated with detected contractual clauses.

<p align="center">
<img src="docs/worker-rights.jpg" width="950">
</p>

---

## 8️⃣ Detailed Issue Analysis

Each detected issue includes:

* Severity
* Evidence
* AI Explanation
* Recommendation

<p align="center">
<img src="docs/contract-issues-1.jpg" width="950">
</p>

<p align="center">
<img src="docs/contract-issues-2.jpg" width="950">
</p>

---

## 9️⃣ AI Appeal Letter

Automatically prepares a professional appeal letter based on the analysis results.

<p align="center">
<img src="docs/appeal-letter.jpg" width="950">
</p>

---

## 🔟 Contract Comparison

Compare two contracts using AI to identify the safer agreement.

Features include:

* Risk Score Comparison
* Issue Breakdown
* Executive Comparison Summary
* AI Verdict

<p align="center">
<img src="docs/comparison-overview.jpg" width="950">
</p>

<p align="center">
<img src="docs/comparison-summary.jpg" width="950">
</p>

<p align="center">
<img src="docs/comparison-issues.jpg" width="950">
</p>

---

## 1️⃣1️⃣ AI Generated PDF Report

Generate a structured AI-powered report summarizing the complete contract analysis.

<p align="center">
<img src="docs/pdf-report.jpg" width="850">
</p>

---

---

# 📂 Project Structure

```text
NyayaAI
│
├── backend
│   ├── services
│   ├── uploads
│   ├── reports
│   ├── main.py
│   ├── requirements.txt
│   └── .env.example
│
├── frontend
│   ├── public
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   ├── dashboard
│   │   ├── comparison
│   │   ├── upload
│   │   ├── utils
│   │   └── App.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── docs
│
├── README.md
├── LICENSE
└── .gitignore
```

---

# ⚡ Quick Start

Clone the repository and run both the backend and frontend locally.

```bash
git clone https://github.com/nkgaurdev/NyayaAI.git

cd NyayaAI
```

---

# ⚙️ Backend Setup

Move into the backend directory.

```bash
cd backend
```

---

### Create a virtual environment

```bash
python -m venv venv
```

---

### Activate the virtual environment

#### Windows

```bash
venv\Scripts\activate
```

#### Linux / macOS

```bash
source venv/bin/activate
```

---

### Install dependencies

```bash
pip install -r requirements.txt
```

---

# 🔑 Environment Variables

Create a `.env` file inside the **backend** directory.

```env
GROQ_API_KEY=your_groq_api_key_here
```

The repository already includes a `.env.example` file for reference.

> **Important:** Never commit your actual API key to GitHub.

---

### Start the FastAPI server

```bash
uvicorn main:app --reload
```

Backend runs at:

```text
http://127.0.0.1:8000
```

---

# 💻 Frontend Setup

Open a new terminal.

```bash
cd frontend
```

Install the required packages.

```bash
npm install
```

---

### Start the development server

```bash
npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

---

# 📡 API Endpoints

| Method | Endpoint             | Description                    |
| :----: | -------------------- | ------------------------------ |
|   GET  | `/`                  | API Health Check               |
|  POST  | `/analyze-pdf`       | Analyze uploaded contract      |
|  POST  | `/compare-contracts` | Compare two uploaded contracts |

---

# 🧠 AI Workflow

```text
Upload PDF
      │
      ▼
Extract Contract Text
      │
      ▼
Groq Llama 3.3 Analysis
      │
      ▼
Risk Detection
      │
      ▼
Worker Rights Mapping
      │
      ▼
AI Recommendations
      │
      ▼
Risk Dashboard
      │
      ▼
Appeal Letter
      │
      ▼
Professional PDF Report
```

---

# 📋 Supported Features

| Feature                   | Supported |
| ------------------------- | :-------: |
| Text-based PDF Analysis   |     ✅     |
| AI Contract Analysis      |     ✅     |
| Risk Scoring              |     ✅     |
| Worker Rights Mapping     |     ✅     |
| Plain English Explanation |     ✅     |
| AI Recommendations        |     ✅     |
| AI Appeal Letter          |     ✅     |
| Contract Comparison       |     ✅     |
| PDF Report Generation     |     ✅     |

---

# 🔍 Current Limitations

This prototype currently focuses on **text-based PDF contracts**.

Future versions may include:

* OCR support for scanned PDFs
* Multi-language contract analysis
* Clause highlighting within PDF documents
* Cloud deployment
* User authentication
* Persistent analysis history

---

---

# 🔒 Privacy & Security

NyayaAI is designed with privacy-conscious development practices.

* Contract files are processed only for analysis.
* API credentials are managed through environment variables.
* Sensitive configuration files are excluded from version control.
* The repository includes a `.env.example` file to simplify setup without exposing secrets.

> **Note:** This project is a hackathon prototype. A production-ready deployment should include authentication, encrypted storage, secure file lifecycle management, and comprehensive audit logging.

---

# 🚀 Future Roadmap

NyayaAI has been designed with a modular architecture, making it straightforward to extend with additional capabilities.

Planned improvements include:

* OCR support for scanned PDF contracts
* Full-document chunked analysis for longer agreements
* Clause highlighting directly within PDF documents
* Multi-language contract analysis
* AI-assisted contract negotiation suggestions
* Personalized worker rights guidance
* Secure user accounts and contract history
* Cloud deployment with scalable infrastructure
* Explainable AI (XAI) visualizations
* Integration with additional legal knowledge sources

---

# 🌍 Potential Use Cases

NyayaAI can assist users in reviewing a variety of agreements, including:

* Gig economy contracts
* Freelance agreements
* Employment contracts
* Internship offer letters
* Vendor and service agreements
* Platform Terms & Conditions
* Consulting agreements
* Independent contractor agreements

---

# 🎓 Technical Highlights

This project demonstrates practical experience with:

* AI-powered document analysis
* Large Language Model (LLM) integration
* Prompt engineering
* FastAPI backend development
* React frontend development
* REST API design
* PDF text extraction
* Automated PDF report generation
* Data visualization using Chart.js
* End-to-end full-stack application development

---

# 🤝 Contributing

Contributions are welcome.

If you would like to improve NyayaAI:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Submit a Pull Request

Suggestions, improvements, and constructive feedback are always appreciated.

---

# 📄 License

This project is licensed under the **MIT License**.

See the `LICENSE` file for complete licensing information.

---

# 🙏 Acknowledgements

NyayaAI was built using several outstanding open-source technologies.

Special thanks to the communities behind:

* React
* Vite
* Tailwind CSS
* FastAPI
* LangChain
* Groq
* PyMuPDF
* ReportLab
* Chart.js

Their tools made rapid prototyping and development possible.

---

# ⭐ Support

If you found this project useful:

* ⭐ Star the repository
* 🍴 Fork the project
* 💬 Share feedback or suggestions
* 🛠️ Contribute improvements

Every contribution helps improve the project.

---

<div align="center">

# ⚖️ NyayaAI

### AI-Powered Contract Intelligence Platform for Gig Workers

**Helping workers understand contracts before they sign.**

Built with **React**, **FastAPI**, **Groq Llama 3.3**, **LangChain**, **Tailwind CSS**, and **ReportLab**.

**Developed for the Unbound 2026 Hackathon.**

Thank you for exploring NyayaAI.

</div>
