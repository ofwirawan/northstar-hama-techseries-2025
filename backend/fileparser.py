from pdf2image import convert_from_bytes
from io import BytesIO
from pathlib import Path
import pytesseract
import os

pytesseract.pytesseract.tesseract_cmd = Path("backend/Tesseract-OCR/tesseract.exe")

tmp_dir = Path("backend/tmp")
tmp_dir.mkdir(parents=True, exist_ok=True)

# Set TMPDIR to a custom location to avoid permission issues with /tmp
os.environ['TMPDIR'] = str(tmp_dir)

# Takes pdf_stream as input
async def parse_files_to_text(file_stream: BytesIO):
    
    pages = convert_from_bytes(file_stream.read(), dpi = 300)

    text_data = ""
    for page in pages:
        text = pytesseract.image_to_string(page)
        print(text)
        text_data += text + '\n'

        return text_data
    
    









