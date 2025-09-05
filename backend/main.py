from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from backend.parse_files_to_text.parse_files import extract_text
from backend.routes import chatbot

app = FastAPI()

# tags is just for grouping in SwaggerAPI
app.include_router(chatbot.router, prefix="/chatbot", tags=["chatbot"])

# comment out during testing to prevent connection errors
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Your React app URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post('/upload_files/')
async def upload_file(file : UploadFile = File(...)):
    text = await extract_text(file)
    return {"text": text}
