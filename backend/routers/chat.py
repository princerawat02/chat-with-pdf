from fastapi import APIRouter
from schemas.chat import ChatRequest
from services.query import chat as chat_service
from schemas.response import ChatResponse

router = APIRouter()


@router.post("/chat", response_model=ChatResponse)
def chat(request: ChatRequest):
    result = chat_service(request.question)
    return result