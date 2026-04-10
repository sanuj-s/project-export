import os
import json
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

def get_groq_client():
    api_key = os.getenv("GROQ_API_KEY")
    if not api_key:
        # Fallback to empty if not found, let Groq complain
        pass
    return Groq(api_key=api_key)

def extract_po_data(raw_text: str) -> dict:
    client = get_groq_client()
    
    prompt = f"""
I am providing the text content extracted from a garment Purchase Order (PO).
Your task is to extract specific fields and return ONLY a valid JSON object matching the exact structure below. If any information is missing, use "N/A" for strings. Calculate totals where necessary if missing, or extract them if present. Total amount per style should be the sum of quantities * price. 

Required JSON Structure:
{{
  "header_information": {{
    "exporter_name_address": "string",
    "exporter_gst": "string",
    "exporter_iec": "string",
    "consignee_name_address": "string",
    "buyer_name_address": "string",
    "invoice_number_date": "string",
    "buyer_po_number_date": "string",
    "port_of_loading": "string",
    "port_of_discharge": "string",
    "terms_of_delivery": "string",
    "country_of_origin": "string",
    "country_of_destination": "string",
    "vessel_flight_details": "string",
    "shipping_marks": "string"
  }},
  "line_items": [
    {{
      "serial_number": 1,
      "style_number": "string",
      "product_description": "string",
      "fabric_composition_gsm": "string",
      "color": "string",
      "sizes": {{
        "XS": 0, "S": 0, "M": 0, "L": 0, "XL": 0, "XXL": 0
      }},
      "total_quantity": 0,
      "price_per_piece": 0.0,
      "total_amount": 0.0
    }}
  ]
}}

Notes:
- Output ONLY valid JSON. Do not include markdown formatting like ```json ... ```. 
- Ensure all sizes are integers. 
- If multiple colors exist for a style, split them into multiple objects in the line_items array, one for each color.
- Make your best guess for fields based on context if labels aren't strictly matching.

Here is the PO text:
{raw_text[:12000]}  # Limiting length slightly just in case, though 12000 chars should fit in Groq token limit
"""

    response = client.chat.completions.create(
        model="llama3-70b-8192",
        messages=[
            {"role": "system", "content": "You are a helpful data extraction AI that outputs clean, strict JSON."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.1,
    )

    response_text = response.choices[0].message.content.strip()

    # Clean up formatting if model ignores instruction
    if response_text.startswith("```json"):
        response_text = response_text[7:]
    if response_text.endswith("```"):
        response_text = response_text[:-3]

    try:
        return json.loads(response_text)
    except json.JSONDecodeError as e:
        raise ValueError(f"Failed to parse AI output as JSON: {e}\\nOutput received: {response_text}")
