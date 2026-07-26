from langchain_chroma import Chroma

from services.embeddings import embeddings

DB_PATH = "chroma_db"

vector_store = Chroma(
    persist_directory=DB_PATH,
    embedding_function=embeddings,
)

retriever = vector_store.as_retriever(
    search_kwargs={"k": 3}
)