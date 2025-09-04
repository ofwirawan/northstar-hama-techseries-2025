from pdf2image import convert_from_bytes
from io import BytesIO
from pathlib import Path
import easyocr
import numpy as np

tmp_dir = Path("backend/tmp")
tmp_dir.mkdir(parents=True, exist_ok=True)

# Set TMPDIR to a custom location to avoid permission issues with /tmp
reader = easyocr.Reader(['en'])

# Takes pdf_stream as input
async def parse_files_to_text(file_stream: BytesIO):
    
    pages = convert_from_bytes(file_stream.read(), dpi = 300)

    extracted_texts = []
    for page in pages:
        result = reader.readtext(np.array(page))

        page_text = []
        for (bbox, text, prob) in result:
            page_text.append(text)
        
        extracted_texts.append("\n".join(page_text))

    return extracted_texts
    
    
    









