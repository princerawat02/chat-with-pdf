from fastapi import APIRouter, UploadFile, File, HTTPException
from pathlib import Path
from utils.logger import logger
import shutil

from services.ingest import ingest
from services.vectorstore import reset_vector_store

router = APIRouter()

# Directory used to store uploaded PDFs before they are processed.
UPLOAD_DIR = Path("uploads")

# Maximum allowed upload size: 10 MB.
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10 MB


def clear_uploads():
    # Remove any previously uploaded files.
    if UPLOAD_DIR.exists():
        shutil.rmtree(UPLOAD_DIR)

    # Recreate the upload directory after cleanup.
    UPLOAD_DIR.mkdir(exist_ok=True)


@router.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):
    logger.info("Upload request received")

    # Only PDF files are accepted by this endpoint.
    if file.content_type != "application/pdf":
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are allowed.",
        )

    # A filename is required so the file can be saved and processed.
    if not file.filename:
        raise HTTPException(
            status_code=400,
            detail="Uploaded file must have a filename",
        )

    # Read the uploaded file into memory for validation and storage.
    contents = await file.read()

    # Reject files larger than the configured limit.
    if len(contents) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=400,
            detail="File size exceeds 10 MB.",
        )

    # Clear the previous upload and its embeddings before storing the new file.
    clear_uploads()
    reset_vector_store()

    file_path = UPLOAD_DIR / file.filename

    logger.info("Saving uploaded PDF")

    # Save the PDF to disk.
    with open(file_path, "wb") as buffer:
        buffer.write(contents)

    logger.info("File saved successfully")

    try:
        # Trigger ingestion so the PDF can be indexed for later retrieval.
        ingest(file.filename)
    except Exception as e:
        logger.exception(e)

        raise HTTPException(
            status_code=500,
            detail="Failed to process PDF.",
        )

    logger.info("PDF ingestion completed")

    return {
        "message": "PDF uploaded successfully",
        "filename": file.filename,
    }