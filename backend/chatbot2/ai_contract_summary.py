# test_ai.py
import google.generativeai as genai

GEMINI_API_KEY = "AIzaSyAUuWtiOP_9GV1rPlA_XtAwuDOO88RJ_Vk" 
genai.configure(api_key=GEMINI_API_KEY)

model = genai.GenerativeModel('gemini-2.5-flash')

target_language = "Bahasa Indonesia"

#SIMULATE OCR OUTPUT - This is the text your OCR would extract from a contract
simulated_ocr_text = """
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
2. For any critical information not specified, state "NOT SPECIFIED - This is a risk"
3. Be strict in your analysis - flag any potentially exploitative terms
4. Entire output must be in {target_language}

CONTRACT TEXT TO ANALYZE:
{simulated_ocr_text}
"""

print("Sending to Gemini for analysis...\n")
response = model.generate_content(prompt)

# 5. PRINT THE RAW RESPONSE
print("RAW AI RESPONSE:")
print("="*50)
print(response.text)
print("="*50)