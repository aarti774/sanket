
import React from "react";

interface CertificateProgressProps {
  progress: number;
}

const CertificateProgress: React.FC<CertificateProgressProps> = ({ progress }) => {
  return (
    <div className="mt-3 space-y-2">
      <div className="flex justify-between text-sm">
        <span>Progress</span>
        <span>{progress}%</span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default CertificateProgress;
