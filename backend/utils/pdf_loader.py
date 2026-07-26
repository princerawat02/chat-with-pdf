from pathlib import Path
from langchain_community.document_loaders import PyMuPDFLoader

BASE_DIR = Path(__file__).resolve().parent.parent

def load_pdf(filename: str):
    pdf_path = BASE_DIR / "uploads" / filename

    loader = PyMuPDFLoader(str(pdf_path))
    return loader.load()