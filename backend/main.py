from fastapi import FastAPI, Depends, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from database import DatabaseManager
from bson import ObjectId
from models import User, Language
from contextlib import asynccontextmanager
from pathlib import Path

# Creates a new DatabaseManager object
dbMgr = DatabaseManager()

# Change Upload Directory later
UPLOAD_DIRECTORY = "backend/uploaded_files"

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

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:3000"],  # Your React app URL
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )


# TO DO LIST <<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
# manage lifespan of app (close db connections and such)
# read up on collation (language specific mongodb stuff)


# notes:
# .model_dump() any path parameters in post or get
# before inserting to db
# to prevent error
# all code below are for EXAMPLES

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post('/upload_files/')
async def upload_file(file : UploadFile):
    Path(UPLOAD_DIRECTORY).mkdir(parents=True, exist_ok=True)

    file_location = Path(UPLOAD_DIRECTORY) / file.filename
    with open(file_location, "wb") as buffer:
        while True:
            chunk = await file.read(1024 * 1024)  # Read in 1MB chunks
            if not chunk:
                break
            buffer.write(chunk)
    return {"info": f"File '{file.filename}' uploaded successfully to '{file_location}'"}

@app.post("/user/signup/") # can post to this endpoint to trigger this func
async def add_user(user: User, db=Depends(get_db)):
    try:
        result = await db.users.insert_one(user.model_dump())
        inserted_id = result.inserted_id
        return {"status_code": 200, "inserted_id": str(inserted_id)} # can be stored in session if needed?
    except Exception as e:
        raise e

@app.put("/user/update/{user_id}")
async def update_user(user_id: str, pref_lang: str, db=Depends(get_db)):
    try:
        # always convert user_id to an ObjectId when dealing with the db
        await db.users.update_one({"_id" : ObjectId(user_id)}, {"$set": {"pref_lang": pref_lang}})
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
