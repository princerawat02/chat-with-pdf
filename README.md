# Chat With PDF

Chat With PDF is a full-stack app for uploading a PDF document and asking questions about its contents. The backend ingests the file, builds embeddings, and serves retrieval-augmented answers through a FastAPI API. The frontend is a React + Vite client that sends uploads and chat prompts to the API.

## What it does

- Upload a PDF document to the backend.
- Ask natural-language questions about the uploaded PDF.
- Get answers generated from document context.
- Keep the app split into a FastAPI backend and a React frontend.

## Tech Stack

- Backend: FastAPI, LangChain, ChromaDB, OpenAI, PyMuPDF
- Frontend: React, Vite, Axios

## Project Structure

```text
backend/
	app.py            FastAPI app and CORS setup
	routers/          Upload and chat endpoints
	services/         Ingestion, retrieval, embeddings, and LLM logic
	uploads/          Stored PDF files
	chroma_db/        Vector database storage

client/
	src/              React app entry and shared CSS
	components/       Upload, chat box, and chat input components
	public/           Static assets
```

## Requirements

- Python 3.10 or newer
- Node.js 18 or newer
- An OpenAI API key

## Backend Setup

Create and activate a Python environment, then install dependencies:

```bash
cd backend
pip install -r requirements.txt
```

Create a `.env` file in `backend/` with your OpenAI key:

```env
OPENAI_API_KEY=your_openai_api_key
```

Start the API server:

```bash
uvicorn app:app --reload --port 8000
```

## Frontend Setup

Install frontend dependencies:

```bash
cd client
npm install
```

Run the Vite dev server:

```bash
npm run dev
```

The client is set up to talk to the backend at `http://localhost:8000`, and the backend allows requests from `http://localhost:5173`.

## API Endpoints

- `GET /` - health-style root response
- `POST /upload` - upload and ingest a PDF
- `POST /chat` - ask a question about the uploaded document

## Notes

- Uploaded files are stored in `backend/uploads/`.
- The vector store data is stored in `backend/chroma_db/`.
- If you change the frontend port, update the backend CORS origin in `backend/app.py`.
