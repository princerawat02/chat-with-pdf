from pydantic import BaseModel


class Source(BaseModel):
    page: int | None
    filename: str


class ChatResponse(BaseModel):
    answer: str
    sources: list[Source]