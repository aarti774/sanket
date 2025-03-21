
import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Award, Download } from "lucide-react";
import { toast } from "sonner";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

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
    const certificateElement = certificateRef.current;
    if (!certificateElement) {
      toast.error("Certificate element not found");
      return;
    }

    try {
      setIsLoading(true);
      toast.info("Generating certificate...", { duration: 3000 });
      
      // Make certificate visible temporarily for capture with less overhead
      certificateElement.style.display = "block";
      certificateElement.style.position = "fixed";
      certificateElement.style.top = "0";
      certificateElement.style.left = "0";
      certificateElement.style.zIndex = "-1000";
      
      // Reduced delay for faster execution
      await new Promise(resolve => setTimeout(resolve, 200));
      
      const canvas = await html2canvas(certificateElement, {
        scale: 1.5, // Reduced scale for faster rendering
        logging: false, // Disable logging for better performance
        useCORS: true,
        backgroundColor: "#ffffff",
        allowTaint: true,
        foreignObjectRendering: false,
      });
      
      // Hide the certificate element again
      certificateElement.style.display = "none";
      certificateElement.style.position = "";
      certificateElement.style.zIndex = "";
      
      // Use lower quality JPEG for faster processing
      const imgData = canvas.toDataURL('image/jpeg', 0.8);
      
      // Create PDF with appropriate dimensions
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      
      const fileName = `${personalInfo.fullName.replace(/\s+/g, '_')}_${cert.name.replace(/\s+/g, '_')}.pdf`;
      pdf.save(fileName);
      
      toast.success("Certificate downloaded successfully");
    } catch (error) {
      toast.error("Failed to download certificate");
      console.error("Certificate download error:", error);
    } finally {
      setIsLoading(false);
    }
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
        
        <div className="mt-3 space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span>{cert.progress}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary" 
              style={{ width: `${cert.progress}%` }}
            ></div>
          </div>
        </div>
        
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
      
      <div 
        ref={certificateRef} 
        className="hidden p-8 bg-white border border-gray-200 rounded-lg" 
        style={{ width: '800px', height: '600px' }}
      >
        {/* Using a simpler certificate layout for faster rendering */}
        <div className="w-full h-full flex flex-col items-center justify-between p-6 border-8 border-double border-primary/20">
          <div className="text-center w-full">
            <h2 className="text-3xl font-bold text-primary mb-1">Certificate of Achievement</h2>
            <h3 className="text-xl font-semibold mb-6">{cert.name}</h3>
            <div className="flex justify-center mb-6">
              <Award className="h-20 w-20 text-primary" />
            </div>
            <p className="text-lg mb-2">This certifies that</p>
            <h2 className="text-2xl font-bold mb-2">{personalInfo.fullName || userMetadata.full_name || user.email}</h2>
            <p className="text-lg">has successfully completed the {cert.name} course</p>
            <p className="text-lg mt-4">with the following achievements:</p>
            <ul className="my-4 inline-block text-left">
              {cert.achievements.map((achievement, idx) => (
                <li key={idx} className="text-base mb-1">• {achievement}</li>
              ))}
            </ul>
          </div>
          
          <div className="mt-8 w-full">
            <div className="grid grid-cols-2 gap-8">
              <div className="text-center">
                <div className="border-t border-gray-400 pt-2 mx-auto w-40">
                  <p className="text-sm">Date: {new Date(cert.date).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="text-center">
                <div className="border-t border-gray-400 pt-2 mx-auto w-40">
                  <p className="text-sm">Instructor Signature</p>
                </div>
              </div>
            </div>
            <p className="text-sm text-center mt-6 text-gray-500">Sanket - Sign Language Learning Platform</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certificate;
