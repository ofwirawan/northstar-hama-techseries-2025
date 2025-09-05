from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from models import ChatbotInit
from parse_files_to_text.parse_files import extract_text
from chatbot.src.chatbot import DocumentChatbot as bot

app = FastAPI()

# comment out during testing to prevent connection errors
# whitelist your IP in mongodb atlas network access as well
# ^^ msg me

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Your React app URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# TO DO LIST <<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
# read up on collation (language specific mongodb stuff)


# notes:
# .model_dump() any path parameters from get or post
# before inserting to db
# to prevent error
# all code below are for EXAMPLES



@app.post('/upload_files/')
async def upload_file(file : UploadFile = File(...)):
    # read the file using the UploadFile.read() method
    # content = await file.read()
    text = await extract_text(file)
    # print(text)
    return {"text": text}
    # inserts the filename, file binary, and content type to mongodb
    await db.files.insert_one({"filename": file.filename, "content": Binary(content), "content_type": file.content_type})

    return {"status": "ok"}


# endpoint to initialize new chat
@app.post("/chatbot/init/")
async def new_chat(init: ChatbotInit):
    messages = {
        "fp": "Hello, paano kita matutulungan ngayon?",
        "hd": "नमस्ते, मैं आज आपकी सहायता कैसे करूं?",
        "id": "Halo, ada yang bisa saya bantu hari ini?",
        "my": "Hello, bagaimana saya boleh membantu anda hari ini?",
        "bl": "হ্যালো, আজ আমি আপনাকে কিভাবে সাহায্য করতে পারি?"
    }

    return {"msg": messages.get(init.lang, "")}

# @app.post
