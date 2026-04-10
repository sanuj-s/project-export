import os
import uvicorn
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from po_extractor import extract_text_from_file
from ai_processor import extract_po_data
from packing_list_generator import generate_packing_list

app = FastAPI(title="AI Packing List Generator API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/upload-po")
async def upload_po(file: UploadFile = File(...)):
    if not file.filename:
        raise HTTPException(status_code=400, detail="No file uploaded")
    
    # Save file temporarily
    temp_path = f"temp_{file.filename}"
    try:
        with open(temp_path, "wb") as buffer:
            content = await file.read()
            buffer.write(content)
        
        # Step 1: Extract Text
        try:
            raw_text = extract_text_from_file(temp_path)
            if not raw_text.strip():
                raise HTTPException(status_code=400, detail="Could not extract text from the file.")
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Error reading file: {str(e)}")

        # Step 2: AI Processor
        try:
            structured_data = extract_po_data(raw_text)
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"AI extraction failed: {str(e)}")

        # Step 3: Packing List Generation
        try:
            output_excel_path = f"Packing_List_{file.filename}.xlsx"
            generate_packing_list(structured_data, output_excel_path)
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Excel generation failed: {str(e)}")

        # Return file
        return FileResponse(
            path=output_excel_path,
            filename=f"Packing_List.xlsx",
            media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            background=None
        )

    finally:
        pass # In a real prod setup we would delete temp files here, we'll keep for debugging if needed
        # if os.path.exists(temp_path): os.remove(temp_path)

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
