import os
import pymupdf
import pandas as pd

def extract_text_from_file(file_path: str) -> str:
    """Reads content from PDF or Excel files and returns a string dump of the data."""
    _, ext = os.path.splitext(file_path.lower())
    
    if ext == '.pdf':
        text = ""
        try:
            doc = pymupdf.open(file_path)
            for page in doc:
                text += page.get_text()
            return text
        except Exception as e:
            raise Exception(f"Failed to read PDF: {e}")
            
    elif ext in ['.xls', '.xlsx']:
        text = ""
        try:
            # Read all sheets
            excel_data = pd.read_excel(file_path, sheet_name=None, header=None)
            for sheet_name, df in excel_data.items():
                text += f"\\n--- Sheet: {sheet_name} ---\\n"
                # Convert dataframe to CSV string for readable LLM consumption
                text += df.to_csv(index=False, header=False)
            return text
        except Exception as e:
            raise Exception(f"Failed to read Excel file: {e}")
            
    else:
        raise ValueError(f"Unsupported file extension: {ext}")
