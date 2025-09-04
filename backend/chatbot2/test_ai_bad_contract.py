# test_ai.py
import google.generativeai as genai
import os 
from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY = os.getenv("GOOGLE_API_KEY")

genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel('gemini-2.5-flash')

target_language = "Bahasa Indonesia"

#SIMULATE OCR OUTPUT - This is the text your OCR would extract from a contract
simulated_ocr_text = """
STANDARD EMPLOYMENT CONTRACT
BETWEEN FOREIGN DOMESTIC WORKER AND EMPLOYER

Employment Agency Name : NorthStar Employment Pte Ltd
License No. : 25PL6781C
Reference No. : FDW-2025-6781

Section A: Particulars of Parties in Contract
(a) The Employer
Full Name : Joshua Ong
NRIC/Passport No. : M8765431K
Address : Blk 123 Bedok Street 12, #04-12, Singapore 570123

(b) The Foreign Domestic Worker (FDW)
Full Name : Damian
Work Permit No. : J9654189L
Passport No. : L1234567AJ

Section B: Terms of Contract
Part III : Remuneration and Benefits
5. The Employer shall pay the FDW wages of SGD 350 per month.
6. The salary shall be paid on the 8th day of every month.
7. The salary will be paid by crediting into the FDW's bank account.
8. The Employer shall provide the FDW with suitable accommodation in accordance with MOM's guidelines, with a reasonable amount of privacy. Separate room.
9. The Employer shall provide the FDW with 5 hours of continuous rest daily.
10. The FDW shall be entitled to 1 rest day(s) a month. If the rest day was not taken, the FDW shall be compensated in cash as agreed in writing.
11. Should both parties agree to extend this contract, she (the FDW) shall be entitled to 7 days of paid home leave (inclusive of a return ticket to her City of origin).
12. External communications shall be made available for the FDW.
Part IV : Termination
13. Either party may terminate this Contract by giving a day's notice.
17. Upon termination, the Employer shall bear the cost of repatriating the FDW back to Jakarta in Indonesia.

Annex A: Job Scope Sheet
28. Persons in household: 2 adults, 2 infants/babies below 3, 2 person(s) requiring constant care and attention.
29. The FDW shall be required to perform domestic duties: Household chores, Cooking, Babysitting, Child-minding.
30. Place of Work: HDB 4-room Flat. Number of Bedrooms: 2 rooms.
"""

#OUR PROMPT
prompt = f"""
ROLE: You are a legal aid assistant for migrant workers in Singapore. Your sole purpose is to analyze employment contracts for fairness, safety, and compliance with common standards, protecting the worker from exploitation.

TASK 1 - TRANSLATION: Translate the entire provided contract text into {target_language}.

TASK 2 - ANALYSIS: Analyze the contract thoroughly. Extract and summarize all key points. You MUST present your summary using the following exact structure and headings. Use only information explicitly stated in the contract.

**SUMMARY:**

**1. Job Details:**
- Position: [Job Title]
- Duties: [List specific duties mentioned]
- Place of Work: [Full address & housing type]
- Contract Period: [As specified in work permit]

**2. Salary & Payment:**
- Monthly Salary: [Amount] [Currency]
- Payment Date: Paid on the [Day] of every month
- Payment Method: [e.g., bank transfer, cash]

**3. Working Conditions:**
- Daily Rest: [Number] hours of continuous rest
- Rest Days: [Number] rest days per month
- Rest Day Compensation: [Policy if rest day is not taken]

**4. Benefits & Leave:**
- Paid Home Leave: [Number] days upon contract renewal
- Home Leave Includes: Return ticket to [City of origin]
- Cash Alternative: [Lump sum details if leave is not taken]

**5. Protection & Rights:**
- Medical Coverage: Employer bears [Details of coverage]
- Accommodation: [Type of accommodation provided]
- Food: Employer provides [Details of meals]
- Repatriation: Employer bears full cost of return to [City, Country]
- Termination Notice: [Notice period] required

**6. Other Rights:** [Any other mentioned rights like communication access]

TASK 3 - SAFETY ANALYSIS: After the summary, provide a critical safety assessment using these exact headings:

**SAFETY ANALYSIS:**

**Positive Points:**
- [List fair and above-standard aspects]

**Warning Points:**
- [List vague, missing, or problematic areas. If none, state "No major warnings detected."]

**Next Steps:**
- [Provide concrete advice for the worker]

CRITICAL RULES:
1. Use simple, clear language that a migrant worker can understand
2. For any critical information not specified, state "NOT SPECIFIED - This is a risk" must be in {target_language}
3. Be strict in your analysis - flag any potentially exploitative terms
4. Entire output must be in {target_language}

CONTRACT TEXT TO ANALYZE:
{simulated_ocr_text}
"""

print("Analyzing the contract...\n")
response = model.generate_content(prompt)

# 5. PRINT THE RAW RESPONSE
print("RAW AI RESPONSE:")
print("="*50)
print(response.text)
print("="*50)