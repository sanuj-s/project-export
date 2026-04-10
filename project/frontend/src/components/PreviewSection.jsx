import React from 'react';
import { CheckCircle } from 'lucide-react';

const PreviewSection = ({ data, file }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 my-8 text-center sm:text-left">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-8 pb-6 border-b border-gray-100">
        <div className="flex items-center space-x-3 mb-4 sm:mb-0">
          <CheckCircle size={32} className="text-accent" />
          <h2 className="text-2xl font-bold text-gray-800">Packing List Ready!</h2>
        </div>
        <div className="text-sm text-gray-500">
          Source file: <strong>{file?.name}</strong>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <div className="text-sm text-gray-500 mb-1">PO Status</div>
          <div className="text-xl font-semibold text-primary">{data?.poNumber || 'Success'}</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <div className="text-sm text-gray-500 mb-1">Styles Found</div>
          <div className="text-xl font-semibold text-primary">{data?.stylesFound || '-'}</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <div className="text-sm text-gray-500 mb-1">Total Qty</div>
          <div className="text-xl font-semibold text-primary">{data?.totalQuantity || '-'}</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <div className="text-sm text-gray-500 mb-1">Total Cartons</div>
          <div className="text-xl font-semibold text-primary">{data?.totalCartons || '-'}</div>
        </div>
      </div>
    </div>
  );
};

export default PreviewSection;
