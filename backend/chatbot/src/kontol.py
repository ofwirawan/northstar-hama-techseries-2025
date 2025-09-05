from chatbot import DocumentChatbot
import json
import pathlib
import config
from translator import translate_text

bot = DocumentChatbot("id")

# bot.ingest_text("1+1 = 2")
# bot.chat("help")


root = pathlib.Path(config.DATA_RAW_DIR)
json_path = pathlib.Path(__file__).parent.parent / root / "output.json"
print("HALO DUNIA")
with open(json_path, "r", encoding="utf-8") as f:
    data = json.load(f)

# for entry in data:
#     print(entry)

texts = [entry.get("info") for entry in data if entry.get("info")]
# if config.TRANSLATE_DATA_RAW:
#     texts = [translate_text(t, config.TARGET_LANGUAGE["id"]) for t in texts]
# print(texts)
print(texts)
print(translate_text("BLACK SHAKY BUTT", "Bahasa Indonesia"))