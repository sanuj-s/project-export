import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

const ProcessingSection = () => {
  const steps = [
    "Reading your PO file...",
    "Extracting product details...",
    "Calculating carton details...",
    "Generating packing list...",
    "Almost ready..."
  ];
  
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // Fake the steps progressing since we have a single backend endpoint taking all the time
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < steps.length - 1) return prev + 1;
        return prev;
      });
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-2xl mx-auto my-16 bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
      <Loader2 size={64} className="animate-spin text-primary mx-auto mb-6" />
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Processing Document</h2>
      <p className="text-lg text-primary font-medium animate-pulse">
        {steps[currentStep]}
      </p>
      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-8 max-w-sm mx-auto">
        <div 
          className="bg-accent h-2.5 rounded-full transition-all duration-500 ease-out"
          style={{ width: \`\${((currentStep + 1) / steps.length) * 100}%\` }}
        ></div>
      </div>
    </div>
  );
};

export default ProcessingSection;
