import json
import pathlib
from typing import List
from chunker import chunk_text
from retriever import BM25Retriever
from translator import translate_text, answer_from_context
from prompts import SUMMARY_SYSTEM_PROMPT, SUMMARY_USER_PROMPT, CHAT_SYSTEM_PROMPT, CHAT_USER_PROMPT
import config as config

class DocumentChatbot:
    def __init__(self, t):
        self.target_language: str = config.TARGET_LANGUAGE.get(t, "English")
        self.translated_doc: str = ""
        self.chunks: List[str] = []
        self.retriever: BM25Retriever = None

    def clean_output(self, s: str) -> str:
        return (s or "").replace("**", "").strip()

    def read_txt_files_from_data_raw(self) -> List[str]:
        root = pathlib.Path(config.DATA_RAW_DIR)
        json_path = pathlib.Path(__file__).parent.parent / root / "output.json"
        target_lang = config.TARGET_LANGUAGE.get(self.target_language, "English")
        translate_mode = config.TRANSLATE_DATA_RAW

        if not json_path.exists():
            return []

        chunks = []
        try:
            with open(json_path, "r", encoding="utf-8") as f:
                data = json.load(f)
                
            # prepare texts first
            texts = [entry.get("info") for entry in data if entry.get("info")]

            # optional: bulk translate if your translate_text supports batch
            if translate_mode:
                texts = [translate_text(t, target_lang) or t for t in texts]

            # for entry in data:
            #     text = entry.get("info", "")
            #     if not text:
            #         continue

            #     if translate_mode:
            #         text = translate_text(text, target_lang) or text
            
            # chunks.extend(chunk_text(text, max_chars=1000, overlap=200))

            # chunk in one pass
            chunks = [c for text in texts for c in chunk_text(text, max_chars=1000, overlap=200) if len(c) > 10]

        except Exception as e:
            print(f"Error reading or processing JSON: {e}")
        return chunks
    
    # main functions:

    # translate the document
    def ingest_text(self, uploaded_txt: str) -> str:
        self.translated_doc = translate_text(uploaded_txt, self.target_language) or uploaded_txt
        doc_chunks = chunk_text(self.translated_doc, max_chars=1000, overlap=200)
        support_chunks = self.read_txt_files_from_data_raw()
        self.chunks = doc_chunks + support_chunks
        print("not working la kontol")
        print(self.chunks)
        self.retriever = BM25Retriever(self.chunks) if self.chunks else None
        return self.translated_doc

    # summarize the document
    def initial_summary(self) -> str:
        user_prompt = SUMMARY_USER_PROMPT.format(doc=self.translated_doc, target_language=self.target_language)
        raw = answer_from_context(SUMMARY_SYSTEM_PROMPT.format(target_language=self.target_language), user_prompt)
        return self.clean_output(raw)

    # chat the bot
    def chat(self, question: str) -> str:
        if self.retriever is not None:
            top = self.retriever.retrieve(question, k=8)
            context_snippets = "\n\n---\n".join(top)
        else:
            context_snippets = self.translated_doc
        user_prompt = CHAT_USER_PROMPT.format(question=question, context=context_snippets)
        raw = answer_from_context(CHAT_SYSTEM_PROMPT.format(target_language=self.target_language), user_prompt)
        ans = self.clean_output(raw)
        return ans
