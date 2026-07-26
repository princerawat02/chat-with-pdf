from services.store import retriever
from services.rag_chain import ask_question


def chat(question: str):
    return ask_question(
        retriever,
        question
    )