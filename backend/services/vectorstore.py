from langchain_chroma import Chroma
from services.embeddings import embeddings

DB_PATH = "chroma_db"

def create_vectorstore(chunks):
    vector_store = Chroma.from_documents(
        documents=chunks,
        embedding=embeddings,
        persist_directory=DB_PATH,
    )

    return vector_store