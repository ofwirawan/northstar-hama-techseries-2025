from fastapi import FastAPI, Depends, File, UploadFile, Form
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from bson import ObjectId, Binary


from database import DatabaseManager
from models import User, Language, Files
from contextlib import asynccontextmanager
from fileparser import parse_files_to_text
from io import BytesIO

# Creates a new DatabaseManager object
dbMgr = DatabaseManager()

@asynccontextmanager
async def lifespan(app: FastAPI):
    # startup
    await dbMgr.start_connection("NorthStar")
    yield
    # shutdown
    await dbMgr.close_connection()

app = FastAPI(lifespan=lifespan)

async def get_db():
    return dbMgr.db 

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

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post('/upload_files/')
async def upload_file(file : UploadFile = File(...), db=Depends(get_db)):
    # read the file using the UploadFile.read() method
    content = await file.read()

    # inserts the filename, file binary, and content type to mongodb
    await db.files.insert_one({"filename": file.filename, "content": Binary(content), "content_type": file.content_type})
    return {"status": "ok"}

@app.post('/get_files/')
async def get_file(file: Files, db=Depends(get_db)):
    # file is an object with 1 property: filename which has a value of str
    doc = await db.files.find_one({"filename": file.filename})

    # Wrap the binary content from MongoDB in a BytesIO object
    # BytesIO allows Python to treat raw bytes like a file object,
    # which is required for streaming responses
    file_stream = BytesIO(doc["content"])       

    # Return a StreamingResponse to send the file back to the client
    # StreamingResponse streams the file content instead of loading it all into memory at once
    return StreamingResponse(
        file_stream,                        # the binary data of the document
        media_type=doc["content_type"]     # e.g., "image/png" or "image/jpeg"
        # ,headers={"Content-Disposition": f"inline; filename={doc['filename']}"}  # "inline" to display in Swagger API (http://localhost:8000/docs)
    )

@app.post("/user/signup/") # can post to this endpoint to trigger this function
async def add_user(user: User, db=Depends(get_db)):
    try:
        result = await db.users.insert_one(user.model_dump())
        inserted_id = result.inserted_id
        return {"status_code": 200, "inserted_id": str(inserted_id)} # can be stored in session if needed?
    except Exception as e:
        raise e

@app.put("/user/update/{user_id}")
async def update_user(user_id: str, pref_lang: Language, db=Depends(get_db)):
    try:
        # always convert user_id to an ObjectId when dealing with the db
        await db.users.update_one({"_id" : ObjectId(user_id)}, {"$set": {"pref_lang": pref_lang.value}})
        return {"status_code": 200}

    except Exception as e:
        raise e

@app.delete("/user/delete/{user_id}")
async def delete_user(user_id: str, db=Depends(get_db)):
    try:
        # always convert user_id to an ObjectId when dealing with the db
        await db.users.delete_one({"_id" : ObjectId(user_id)})
        return {"status_code": 200}

    except Exception as e:
        raise e

@app.get("/lang/{pref_lang}")
async def find_user(pref_lang: str, db=Depends(get_db)):
    cursor = db.users.find({"pref_lang": pref_lang}) # this returns an AsyncCursor Object
    results = await cursor.to_list()
    for document in results:
        document["_id"] = str(document["_id"])
    
    return {"data": results}

@app.post("/parse_file/{filename}")
async def parse_file(file : Files, db=Depends(get_db)):
    doc = await db.files.find_one({"filename": file.filename})
    file_stream = BytesIO(doc["content"])
    text_data = await parse_files_to_text(file_stream)

    return text_data


