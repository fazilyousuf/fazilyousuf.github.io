from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from . import retrieval
from .llm_client import generate_answer

router = APIRouter()


class ChatRequest(BaseModel):
    message: str


class ChatResponse(BaseModel):
    answer: str


@router.get("/health")
async def health_check():
    return {"status": "ok"}


# Simple in-memory cache (optional)
_cache: dict[str, str] = {}


@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    user_message = request.message.strip()
    if not user_message:
        raise HTTPException(status_code=400, detail="Message cannot be empty")

    normalized = user_message.lower().strip()

    # 1) SMALL TALK / SIMPLE RESPONSES (no LLM)
    small_talk = {"thanks", "thank you", "thx", "ok", "okay", "nice", "cool"}
    greetings = {"hi", "hello", "hey", "hai","helo"}

    if normalized in small_talk:
        return ChatResponse(
            answer="You're welcome! 😊 Let me know if you want to know anything about Fazil."
        )

    if normalized in greetings:
        return ChatResponse(
            answer="Hi 👋, I'm Fazil's portfolio assistant. You can ask about his skills, projects, experience, or background."
        )

    # 1.5) BOT IDENTITY (no LLM)
    if "your name" in normalized or "who are you" in normalized:
        return ChatResponse(
            answer="I'm Fazil's portfolio assistant, an AI chatbot that answers questions about his skills, projects, and experience."
        )

    # 2) SECURITY / SENSITIVE INFO (no LLM)
    sensitive_keywords = ["bank", "password", "otp", "card number",]
    if any(word in normalized for word in sensitive_keywords):
        return ChatResponse(
            answer="For security and privacy reasons, I will never share any bank details, passwords, or sensitive credentials."
        )

    # 3) PRICING / DEVELOPMENT INQUIRIES (no LLM)
    pricing_keywords = ["price", "cost", "charge", "charges", "rate", "fees", "budget"]
    dev_keywords = ["build", "create", "build a website", "build an app"]

    if any(word in normalized for word in pricing_keywords) or any(
        word in normalized for word in dev_keywords
    ):
        return ChatResponse(
            answer=(
                "For project details, pricing, or help with building something, "
                "you can contact Fazil directly:\n\n"
                "- WhatsApp / Phone: +971 525959413\n"
                "- Email: muhammadfazilvk@gmail.com\n"
                "- LinkedIn: www.linkedin.com/in/yousuffazil\n"
                "- Portfolio: fazilvk-portfolio.vercel.app"
            )
        )

    # 4) CACHE: if same question as before, reuse answer (no extra LLM call)
    if normalized in _cache:
        return ChatResponse(answer=_cache[normalized])

    # 5) Build RAG context (keep small)
    context = retrieval.build_context_for_query(user_message, top_k=3)

    # 6) System instructions: ONLY about Fazil, no general teaching
    system_instructions = (
        "You are an assistant that only answers questions about Muhammad Fazil V K "
        "using the provided context. "
        "If the information is not in the context, say you don't know."
    )

    prompt = (
        f"{system_instructions}\n\n"
        f"Context:\n{context or '[No context available]'}\n\n"
        f"User question:\n{user_message}\n\n"
        "Answer clearly in under 3 short sentences."
    )

    # 7) Call Gemini (only when really needed)
    try:
        answer_text = generate_answer(prompt)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"LLM error: {e}")

    # Save to cache for repeated questions
    _cache[normalized] = answer_text

    return ChatResponse(answer=answer_text)
