from services.vectorstore import create_vectorstore


def get_retriever(chunks):
    vector_store = create_vectorstore(chunks)

    retriever = vector_store.as_retriever(
        search_type="similarity",
        search_kwargs={"k": 3},
    )

    return retriever