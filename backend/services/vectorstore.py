import shutil
from pathlib import Path

from langchain_chroma import Chroma
from services.embeddings import embeddings



DB_PATH = "chroma_db"
COLLECTION_NAME = "pdf"


def get_vector_store():
    return Chroma(
        collection_name=COLLECTION_NAME,
        persist_directory=DB_PATH,
        embedding_function=embeddings,
    )


def create_vectorstore(chunks):
    vector_store = get_vector_store()

    vector_store.add_documents(chunks)

    return vector_store


def get_retriever():
    return get_vector_store().as_retriever(
        search_kwargs={"k": 3}
    )


def reset_vector_store():
    vector_store = get_vector_store()

    vector_store.delete_collection()
