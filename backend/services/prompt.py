from langchain_core.prompts import ChatPromptTemplate

prompt = ChatPromptTemplate.from_template("""
You are a helpful AI assistant.

Answer the user's question ONLY using the provided context.

If the answer is not found in the context, say:
"I couldn't find that information in the document."

Context:
{context}

Question:
{question}

Answer:
""")