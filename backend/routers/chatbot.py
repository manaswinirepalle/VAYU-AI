from fastapi import APIRouter
from pydantic import BaseModel
from backend.rag.chain import VayuRagChain

router = APIRouter()
chain = VayuRagChain()


class ChatQuery(BaseModel):
    question: str
    city: str = "Vizag"


@router.post("/query")
def ask_vayu(payload: ChatQuery):
    answer = chain.answer(payload.question, payload.city)
    return {
        "answer": answer["answer"],
        "citations": answer["citations"],
        "city": payload.city,
    }
