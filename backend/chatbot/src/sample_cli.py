
import argparse, pathlib, sys
from .chatbot import DocumentChatbot
from . import config

USER_UPLOADED_TXT = """Employment Contract
Position: Service Crew
Salary: SGD 1,800 per month, paid monthly
Working Hours: 6 days per week, 8 hours per day; 1 rest day per week
Contract Period: 12 months, renewable
Overtime: Refer to company policy
"""

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--file", help="Path to plain-text file (already extracted). If omitted, uses the example text.")
    args = ap.parse_args()

    if args.file:
        path = pathlib.Path(args.file)
        if not path.exists():
            print(f"[ERR] File not found: {path}")
            sys.exit(1)
        uploaded_txt = path.read_text(encoding="utf-8", errors="ignore")
    else:
        uploaded_txt = USER_UPLOADED_TXT

    bot = DocumentChatbot()  # uses config.TARGET_LANGUAGE
    print(f"\n[1/3] Translating to: {config.TARGET_LANGUAGE}")
    translated = bot.ingest_text(uploaded_txt)
    print("\n=== Translated Document (preview) ===")
    print(translated[:800])
    print("=====================================")

    print("\n[2/3] Summary:")
    summary = bot.initial_summary()
    print("\n" + summary + "\n")

    print("[3/3] Chat — ask about the document (type 'exit' to quit)")
    while True:
        q = input("> ").strip()
        if q.lower() in {"exit","quit"}:
            break
        ans = bot.chat(q)
        print("\n" + ans + "\n")

if __name__ == "__main__":
    main()
