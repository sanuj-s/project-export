import React, { useState, useRef } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import UploadSection from './components/UploadSection';
import ProcessingSection from './components/ProcessingSection';
import PreviewSection from './components/PreviewSection';
import DownloadSection from './components/DownloadSection';

function App() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('idle'); // idle, uploading, processing, success, error
  const [errorMessage, setErrorMessage] = useState('');
  const [previewData, setPreviewData] = useState(null);
  const [downloadBlob, setDownloadBlob] = useState(null);
  const [allowedExtensions, setAllowedExtensions] = useState('');
  
  const fileInputRef = useRef(null);

  const triggerUpload = (ext) => {
    setAllowedExtensions(ext);
    if (fileInputRef.current) {
      fileInputRef.current.accept = ext;
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      handleFile(selectedFile);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFile(droppedFile);
    }
  };

  const handleFile = (selectedFile) => {
    // Validate size (10MB)
    if (selectedFile.size > 10 * 1024 * 1024) {
      setErrorMessage("File size exceeds 10MB limit");
      setStatus('error');
      return;
    }
    
    const validExts = allowExtensionsToArray(allowedExtensions || '.pdf,.xls,.xlsx');
    const isValidExt = validExts.some(ext => selectedFile.name.toLowerCase().endsWith(ext));
    if (!isValidExt) {
      setErrorMessage("Please upload only .xls .xlsx or .pdf files");
      setStatus('error');
      return;
    }

    setFile(selectedFile);
    processFile(selectedFile);
  };

  const allowExtensionsToArray = (extStr) => {
    return extStr.split(',').map(e => e.trim());
  };

  const processFile = async (fileToProcess) => {
    setStatus('processing');
    setErrorMessage('');
    
    const formData = new FormData();
    formData.append("file", fileToProcess);

    try {
      const response = await axios.post('http://localhost:8000/api/upload-po', formData, {
        responseType: 'blob'
      });
      
      const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      setDownloadBlob(blob);
      
      // Mocked preview data since our API just returns the blob right now.
      // In a real prod world, we might return JSON + download URL, or split it into 2 endpoints.
      setPreviewData({
        poNumber: "Extracted PO",
        totalQuantity: "Check Excel",
        totalCartons: "Check Excel",
        stylesFound: "Multiple"
      });
      
      setStatus('success');
    } catch (err) {
      console.error(err);
      setErrorMessage("Could not read this PO format. Please ensure it is a standard PO file.");
      setStatus('error');
    }
  };

  const resetState = () => {
    setFile(null);
    setStatus('idle');
    setPreviewData(null);
    setDownloadBlob(null);
    setErrorMessage('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <input 
          type="file" 
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: 'none' }} 
        />
        
        {status === 'idle' && (
          <>
            <HeroSection onUploadClick={triggerUpload} />
            <UploadSection onDrop={handleDrop} allowedExtensions={allowedExtensions} triggerUpload={triggerUpload} />
          </>
        )}
        
        {status === 'processing' && <ProcessingSection />}
        
        {status === 'error' && (
          <div className="max-w-2xl mx-auto mt-8 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{errorMessage}</span>
            <div className="mt-4 text-center">
              <button 
                onClick={resetState}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {status === 'success' && (
          <div className="animate-fade-in max-w-4xl mx-auto">
            <PreviewSection data={previewData} file={file} />
            <DownloadSection blob={downloadBlob} filename={`Packing_List_${file?.name}.xlsx`} onReset={resetState} />
          </div>
        )}
      </main>

      <footer className="footer bg-white border-t border-gray-200 py-6 mt-auto">
        <div className="container mx-auto text-center text-gray-500 text-sm flex justify-between px-4">
          <span>&copy; {new Date().getFullYear()} PackGenie. All rights reserved.</span>
          <div className="space-x-4">
            <a href="#" className="hover:text-primary">Privacy Policy</a>
            <a href="#" className="hover:text-primary">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
