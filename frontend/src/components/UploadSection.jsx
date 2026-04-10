import React from 'react';
import { UploadCloud } from 'lucide-react';

const UploadSection = ({ onDrop, triggerUpload, allowedExtensions }) => {
  return (
    <div 
      className="max-w-3xl mx-auto my-8 border-2 border-dashed border-gray-300 bg-white rounded-xl p-12 text-center hover:bg-gray-50 hover:border-primary transition-colors cursor-pointer"
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
      onClick={() => triggerUpload('.pdf,.xls,.xlsx')}
    >
      <div className="flex flex-col items-center justify-center space-y-4">
        <UploadCloud size={64} className="text-gray-400" />
        <h3 className="text-xl font-bold text-gray-700">Drag & Drop your PO file here</h3>
        <p className="text-gray-500">or click to browse from your computer</p>
        <div className="text-sm text-gray-400 mt-4">
          Supported formats: .xls, .xlsx, .pdf (Max 10MB)
        </div>
      </div>
    </div>
  );
};

export default UploadSection;
