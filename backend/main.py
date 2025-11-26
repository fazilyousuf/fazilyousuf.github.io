import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

# Load .env
load_dotenv()

from app.api import router as api_router
from app import retrieval


app = FastAPI(title="Fazil Portfolio Chatbot API")

# CORS: allow your frontend dev server (Vite) + production domain later
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    # add your real portfolio domain when deployed
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routes
app.include_router(api_router, prefix="/api")

@app.on_event("startup")
async def startup_event():
    """
    Prepare embeddings when the server starts.
    This runs once, so we don't recompute embeddings on every request.
    """
    retrieval.initialize_knowledge_base()

@app.get("/")
async def root():
    return {"status": "ok", "message": "Fazil Portfolio Chatbot API is running"}
