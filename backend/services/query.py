from services.vectorstore import get_retriever
from services.rag_chain import ask_question


def chat(question: str):
    retriever = get_retriever()

    return ask_question(
        retriever,
        question,
    )