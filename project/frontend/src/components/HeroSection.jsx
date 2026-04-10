import React from 'react';
import { FileDown, FileText } from 'lucide-react';

const HeroSection = ({ onUploadClick }) => {
  return (
    <div className="text-center py-16 bg-gradient-to-b from-primary/10 to-background">
      <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-4">
        Generate Packing List in Seconds
      </h1>
      <p className="text-lg md:text-xl text-textMain max-w-2xl mx-auto mb-8">
        Upload your PO file and get a perfectly formatted packing list instantly.
      </p>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
        <button 
          onClick={() => onUploadClick('.xls,.xlsx')}
          className="flex items-center space-x-2 bg-primary text-secondary px-6 py-3 rounded-md hover:bg-opacity-90 transition-all font-semibold shadow-lg hover:shadow-xl w-full sm:w-auto"
        >
          <FileText size={20} />
          <span>Upload PO (Excel)</span>
        </button>
        <button 
          onClick={() => onUploadClick('.pdf')}
          className="flex items-center space-x-2 bg-primary text-secondary px-6 py-3 rounded-md hover:bg-opacity-90 transition-all font-semibold shadow-lg hover:shadow-xl w-full sm:w-auto"
        >
          <FileDown size={20} />
          <span>Upload PO (PDF)</span>
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
