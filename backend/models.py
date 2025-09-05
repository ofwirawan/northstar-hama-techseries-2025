from pydantic import BaseModel

class ChatbotInit(BaseModel):
    lang: str

class ChatbotMessage(BaseModel):
    last_message: str
    message: str
    lang: str

class ChatbotSummaryRequest(BaseModel):
    parsed_text: str
    lang: str