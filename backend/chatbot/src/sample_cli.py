
import argparse, pathlib, sys
from chatbot import DocumentChatbot
import config

USER_UPLOADED_TXT = """
STANDARD EMPLOYMENT CONTRACT
BETWEEN FOREIGN DOMESTIC WORKER AND EMPLOYER

Section B: Terms of Contract
Part III : Remuneration and Benefits
5. The Employer shall pay the FDW wages of SGD 650 per month.
6. The salary shall be paid on the 1st day of every month.
7. The salary will be paid by crediting into the FDW's bank account.
8. The Employer shall provide the FDW with suitable accommodation in accordance with MOM's guidelines, with a reasonable amount of privacy. Separate room.
9. The Employer shall provide at least three adequate meals a day to the FDW.
10. The Employer shall provide the FDW with 8 hours of continuous rest daily.
11. The FDW shall be entitled to four rest day(s) a month. If the rest day was not taken, the FDW shall be compensated in cash as agreed in writing.
12. Should both parties agree to extend this contract, she (the FDW) shall be entitled to 15 days of paid home leave (inclusive of a return ticket to her City of origin).
13. If the FDW does not wish to utilize her leave, the Employer shall pay the FDW a lump sum equivalent to the return ticket to her City of origin.
14. The Employer shall bear all the necessary treatment costs, including medical consultation, medicine, hospitalization and others.
Part IV : Termination
17. Either party may terminate this Contract by giving one month's notice.
21. The employer shall be responsible to bear the cost of repatriation of the FDW at all times.
22. Upon termination, the Employer shall bear the cost of repatriating the FDW back to Jakarta in Indonesia.

Annex A: Job Scope Sheet
28. Persons in household: 2 adults, children aged 5 to 12, children aged between 3 to 5, 2 person(s) requiring constant care and attention.
29. The FDW shall be required to perform domestic duties: Household chores, Cooking, Looking after aged person(s) [constant attention is required], Child-minding.
30. Place of Work: Condominium/ Private Apartment. Number of Bedrooms: 3 rooms.
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
