
# Migrant-Worker Document Chat (Simple Python, Gemini) — Clean Output, Data Folder, In-Code Language

Key changes:
- `data_raw/` folder included; any `.txt` files placed here are ingested with the uploaded document.
- No output word limit is enforced in prompts.
- No bold/markdown: the prompts ask to avoid it and the app strips `**` from answers.
- Language is controlled in `src/config.py` (no CLI flag).

## Quick start
```bash
python -m venv .venv && source .venv/bin/activate    # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.sample .env   # put your GOOGLE_API_KEY here
python -m src.sample_cli --file path/to/your_document.txt
# or just: python -m src.sample_cli
```
