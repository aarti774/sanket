
import React from "react";
import { Award } from "lucide-react";

interface CertificateTemplateProps {
  cert: {
    name: string;
    date: string;
    achievements: string[];
  };
  personalInfo: {
    fullName: string;
  };
  user: any;
  userMetadata: any;
}

const CertificateTemplate: React.FC<CertificateTemplateProps> = ({
  cert,
  personalInfo,
  user,
  userMetadata,
}) => {
  return (
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
  );
};

export default CertificateTemplate;
