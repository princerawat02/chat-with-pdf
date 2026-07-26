from services.llm import llm
from services.prompt import prompt
from pathlib import Path


def ask_question(retriever, question):
    # Retrieve relevant documents for the given question.

    docs = retriever.invoke(question)

    # Build a single context string from all retrieved document chunks.
    context = "\n\n".join(
        doc.page_content
        for doc in docs
    )

    # Create prompt messages using the retrieved context and user question.
    messages = prompt.invoke(
        {
            "context": context,
            "question": question
        }
    )

    # Invoke the LLM with the prepared messages.
    response = llm.invoke(messages)

    # Return only the model's answer text.
    return {
    "answer": response.content,
    "sources": [
    {
        "page": doc.metadata.get("page"),
        "filename": Path(doc.metadata.get("source")).name,
    }
    for doc in docs
]
}