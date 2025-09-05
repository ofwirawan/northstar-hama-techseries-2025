from fastapi import APIRouter
from backend.models import ChatbotInit, ChatbotMessage, ChatbotSummaryRequest
from backend.chatbot.src.chatbot import DocumentChatbot

router = APIRouter()

# endpoint to initialize new chat
@router.post("/init/")
async def initiate_chat(init: ChatbotInit):
    messages = {
        "fp": "Hello, paano kita matutulungan ngayon?",
        "hd": "नमस्ते, मैं आज आपकी सहायता कैसे करूं?",
        "id": "Halo, ada yang bisa saya bantu hari ini?",
        "my": "Hello, bagaimana saya boleh membantu anda hari ini?",
        "bl": "হ্যালো, আজ আমি আপনাকে কিভাবে সাহায্য করতে পারি?"
    }

    return {"message": messages.get(init.lang, "")}

@router.post("/summary/")
async def get_summary(req: ChatbotSummaryRequest):
    bot = DocumentChatbot(req.lang)
    translated_doc = bot.ingest_text(req.parsed_text)
    summary = bot.initial_summary(translated_doc)
    
    return  {
            "translated_doc": translated_doc,
            "doc_summary": summary
            }

@router.post("/msg/")
async def answer_msg(req: ChatbotMessage):
    bot = DocumentChatbot(req.lang)
    bot.ingest_text(req.last_message)
    response = bot.chat(req.message)
    
    return {"message": response}
