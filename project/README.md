# AI Packing List Generator

This is a full-stack web application designed for garment export companies to automate the generation of Excel Packing Lists from raw Purchase Order (PO) documents (PDF, Excel). 

## Technology Stack

- **Frontend:** React.js, Vite, Tailwind CSS, Lucide React
- **Backend:** Python FastAPI, openpyxl, pandas, pymupdf
- **AI Processing:** Groq API (LLaMA3-70b-8192)

## Features

- **Modern SaaS Interface:** Beautifully designed single-page application with hover states, processing animations, and sleek UI.
- **Intelligent Information Extraction:** Leverages large language models (via Groq) to accurately extract complex garment information including sizes, colors, and prices from unstructured documents.
- **Automated Excel Formatting:** Programmatically builds a highly complex Packing List format using `openpyxl`, including custom backgrounds, exact cell dimension adjustments, complex grouped headers, and CBM calculations.

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- Python (v3.10+)
- Valid Groq API Key

### Backend Setup

1. Navigate to the backend directory:
   \`\`\`bash
   cd backend
   \`\`\`
2. Create a virtual environment and install dependencies:
   \`\`\`bash
   python -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   \`\`\`
3. Create a `.env` file and add your Groq API key:
   \`\`\`env
   GROQ_API_KEY=gsk_your_api_key_here
   \`\`\`
4. Run the development server:
   \`\`\`bash
   uvicorn main:app --reload
   \`\`\`

### Frontend Setup

1. Navigate to the frontend directory:
   \`\`\`bash
   cd frontend
   \`\`\`
2. Install Node dependencies:
   \`\`\`bash
   npm install
   \`\`\`
3. Run the Vite development server:
   \`\`\`bash
   npm run dev
   \`\`\`

## Architecture & Code Map

- `frontend/src/App.jsx`: State management orchestrator for the file upload flow.
- `frontend/src/components/*`: Extracted functional UI components following Tailwind styling standards.
- `backend/main.py`: Main FastAPI entrypoint managing the file upload memory buffers.
- `backend/po_extractor.py`: Utility module designed to chew through raw bytes of unstructured PDFs and Excel files using `pymupdf` and `pandas`.
- `backend/ai_processor.py`: LLM logic connecting to Groq. Defines the rigorous JSON schema expectations.
- `backend/packing_list_generator.py`: Generative formatting module that lays out standard commercial export templates in `openpyxl`.
