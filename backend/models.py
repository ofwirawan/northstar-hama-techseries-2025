from pydantic import BaseModel
from enum import Enum

class Language(str, Enum):
    bangla = "bl"
    hindi = "hd"
    indonesian = "id"
    filipino = "fp"
    malay = "my"

class User(BaseModel):
    pref_lang: Language
    class Config:
        extra = "forbid"

class ProcessedFiles(BaseModel):
    user_id: str
    summary: list[str]
    class Config:
        extra = "forbid"

class Details(BaseModel):
    subject: str
    is_red_flag: bool
    additional_info: str
    original_text: str
    class Config:
        extra = "forbid"

class Files(BaseModel):
    filename: str

class ChatbotInit(BaseModel):
    lang: str


