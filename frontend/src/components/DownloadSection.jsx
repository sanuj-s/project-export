import React from 'react';
import { Download, RefreshCw } from 'lucide-react';

const DownloadSection = ({ blob, filename, onReset }) => {
  const handleDownload = () => {
    if (!blob) return;
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename || 'Packing_List.xlsx';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  return (
    <div className="text-center py-6 flex flex-col sm:flex-row justify-center items-center gap-4">
      <button 
        onClick={handleDownload}
        className="flex items-center space-x-2 bg-accent text-white px-8 py-4 rounded-xl hover:bg-opacity-90 transition-all font-bold shadow-lg hover:shadow-xl text-lg w-full sm:w-auto"
      >
        <Download size={24} />
        <span>Download Packing List (Excel)</span>
      </button>
      
      <button 
        onClick={onReset}
        className="flex items-center space-x-2 bg-white text-gray-600 border border-gray-300 px-6 py-4 rounded-xl hover:bg-gray-50 transition-all font-semibold w-full sm:w-auto"
      >
        <RefreshCw size={20} />
        <span>Generate Another</span>
      </button>
    </div>
  );
};

export default DownloadSection;
