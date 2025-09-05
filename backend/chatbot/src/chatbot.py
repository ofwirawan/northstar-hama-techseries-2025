from dataclasses import dataclass, field
from typing import List
import pathlib

from chatbot.src.chunker import chunk_text
from chatbot.src.retriever import BM25Retriever
from chatbot.src.translator import translate_text, answer_from_context
from chatbot.src.prompts import SUMMARY_SYSTEM_PROMPT, SUMMARY_USER_PROMPT, CHAT_SYSTEM_PROMPT, CHAT_USER_PROMPT
import chatbot.src.config as config

def _clean_output(s: str) -> str:
    return (s or "").replace("**", "").strip()

def _read_txt_files_from_data_raw() -> List[str]:
    root = pathlib.Path(config.DATA_RAW_DIR)
    if not root.exists():
        return []
    chunks = []
    for p in root.glob("**/*.txt"):
        try:
            txt = p.read_text(encoding="utf-8", errors="ignore")
            if config.TRANSLATE_DATA_RAW:
                txt = translate_text(txt, config.TARGET_LANGUAGE) or txt
            chunks.extend(chunk_text(txt, max_chars=1000, overlap=200))
        except Exception:
            continue
    return chunks

@dataclass
class DocumentChatbot:
    def __init__(self, t):
        self.target_language: str = config.TARGET_LANGUAGE.get(t, "En")
        self.translated_doc: str = ""
        self.chunks: List[str] = []
        self.retriever: BM25Retriever = None

    def ingest_text(self, uploaded_txt: str) -> str:
        self.translated_doc = translate_text(uploaded_txt, self.target_language) or uploaded_txt
        doc_chunks = chunk_text(self.translated_doc, max_chars=1000, overlap=200)
        support_chunks = _read_txt_files_from_data_raw()
        self.chunks = doc_chunks + support_chunks
        self.retriever = BM25Retriever(self.chunks) if self.chunks else None
        return self.translated_doc

    def initial_summary(self) -> str:
        user_prompt = SUMMARY_USER_PROMPT.format(doc=self.translated_doc, target_language=self.target_language)
        raw = answer_from_context(SUMMARY_SYSTEM_PROMPT, user_prompt)
        return _clean_output(raw)

    def chat(self, question: str) -> str:
        if self.retriever is not None:
            top = self.retriever.retrieve(question, k=8)
            context_snippets = "\n\n---\n".join(top)
        else:
            context_snippets = self.translated_doc
        user_prompt = CHAT_USER_PROMPT.format(question=question, context=context_snippets)
        raw = answer_from_context(CHAT_SYSTEM_PROMPT, user_prompt)
        ans = _clean_output(raw)
        return ans
