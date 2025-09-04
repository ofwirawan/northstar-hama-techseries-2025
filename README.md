# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Running the Backend

## Prerequisites
- Ensure you have **WSL (Windows Subsystem for Linux)** installed.
- Or use MACOS

## Steps

1. **Start WSL** in the project directory (if you are on Windows) or start your terminal on Mac
2. **Create a new venv**
    ```bash
    python3 -m venv .venv
3. **Activate the virtual environment**:
   ```bash
   source .venv/bin/activate
   ```
4. **Install dependencies** (only if not yet installed):
   ```bash
   pip install -r requirements.txt
   ```
5. **Start the backend**:
   ```bash
   fastapi dev backend/main.py
   ```
6. **Test file upload**  
   Open **`uploadfiles.html`** and try uploading files.
   This will display the original uploaded file, and the text string that was parsed from it
7. **View uploaded files**  
   Open **`display_files.html`**, then enter the filename **with extension** (case-sensitive).



# Migrant-Worker Document Chat (Simple Python, Gemini) — Clean Output, Data Folder, In-Code Language
(chatbot folder)
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
