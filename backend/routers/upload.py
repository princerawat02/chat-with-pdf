from fastapi import APIRouter, UploadFile, File, HTTPException
from pathlib import Path
from utils.logger import logger
import shutil

from services.ingest import ingest

router = APIRouter()

UPLOAD_DIR = Path("uploads")

MAX_FILE_SIZE = 10 * 1024 * 1024  # 10 MB

@router.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):

    logger.info("Upload request received")
    
    if file.content_type != "application/pdf":
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are allowed."
        )

    if not file.filename:
        raise HTTPException(
            status_code=400,
            detail="Uploaded file must have a filename"
        )

    contents = await file.read()

    if len(contents) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=400,
            detail="File size exceeds 10 MB."
        )

    UPLOAD_DIR.mkdir(exist_ok=True)

    file_path = UPLOAD_DIR / file.filename
    
    if file_path.exists():
        raise HTTPException(
            status_code=409,
            detail=f"{file.filename} already exists."
        )

    logger.info("Saving uploaded PDF")
    
    with open(file_path, "wb") as buffer:
        buffer.write(contents)
    
    logger.info("File saved successfully")

    try:
        ingest(file.filename)
    except Exception as e:
        logger.error(f"Ingestion failed: {e}")

        raise HTTPException(
            status_code=500,
            detail="Failed to process PDF."
        )
    
    logger.info("PDF ingestion completed")

    return {
        "message": "PDF uploaded successfully",
        "filename": file.filename
    }