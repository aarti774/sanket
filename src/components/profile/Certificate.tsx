
import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Award, Download } from "lucide-react";
import CertificateTemplate from "./CertificateTemplate";
import CertificateProgress from "./CertificateProgress";
import { downloadCertificateAsPDF } from "@/utils/certificateUtils";

interface CertificateProps {
  cert: {
    id: string;
    name: string;
    date: string;
    progress: number;
    achievements: string[];
    remarks: string;
  };
  personalInfo: {
    fullName: string;
    email: string;
    mobile: string;
  };
  user: any;
  userMetadata: any;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const Certificate: React.FC<CertificateProps> = ({
  cert,
  personalInfo,
  user,
  userMetadata,
  isLoading,
  setIsLoading,
}) => {
  const certificateRef = useRef<HTMLDivElement>(null);

  const handleDownloadCertificate = async () => {
    if (!certificateRef.current) return;
    
    const fileName = `${personalInfo.fullName.replace(/\s+/g, '_')}_${cert.name.replace(/\s+/g, '_')}.pdf`;
    await downloadCertificateAsPDF(certificateRef.current, fileName, setIsLoading);
  };

  return (
    <div>
      <div className="border rounded-lg p-4 hover:border-primary transition-colors mb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Award className="h-10 w-10 text-primary" />
            <div>
              <h3 className="font-medium">{cert.name}</h3>
              <p className="text-sm text-gray-500">Issued on {new Date(cert.date).toLocaleDateString()}</p>
            </div>
          </div>
          {cert.progress < 100 ? (
            <span className="text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
              In Progress
            </span>
          ) : (
            <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">
              Completed
            </span>
          )}
        </div>
        
        <CertificateProgress progress={cert.progress} />
        
        <div className="mt-4 space-y-2">
          <h4 className="text-sm font-medium">Achievements:</h4>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
            {cert.achievements.map((achievement, idx) => (
              <li key={idx}>{achievement}</li>
            ))}
          </ul>
        </div>
        
        <div className="mt-4">
          <h4 className="text-sm font-medium">Instructor Remarks:</h4>
          <p className="text-sm text-gray-600 italic mt-1">{cert.remarks}</p>
        </div>
        
        {cert.progress === 100 && (
          <div className="mt-4">
            <Button 
              size="sm" 
              variant="outline" 
              className="w-full flex items-center justify-center gap-2"
              onClick={handleDownloadCertificate}
              disabled={isLoading}
            >
              <Download size={16} />
              {isLoading ? "Generating..." : "Download Certificate"}
            </Button>
          </div>
        )}
      </div>
      
      {/* Hidden certificate for PDF generation - optimized for minimal rendering impact */}
      <div 
        ref={certificateRef} 
        className="hidden" 
        style={{ width: '800px', height: '600px' }}
      >
        <CertificateTemplate 
          cert={cert}
          personalInfo={personalInfo}
          user={user}
          userMetadata={userMetadata}
        />
      </div>
    </div>
  );
};

export default Certificate;
