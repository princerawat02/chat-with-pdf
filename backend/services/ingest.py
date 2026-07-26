from utils.pdf_loader import load_pdf
from services.splitter import split_documents
from services.vectorstore import create_vectorstore

def ingest(pdf_name: str):
    documents = load_pdf(pdf_name)
    chunks = split_documents(documents)

    create_vectorstore(chunks)

    print("PDF indexed successfully!")