
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Award } from "lucide-react";
import Certificate from "./Certificate";

interface CertificatesTabProps {
  certificates: {
    id: string;
    name: string;
    date: string;
    progress: number;
    achievements: string[];
    remarks: string;
  }[];
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

const CertificatesTab: React.FC<CertificatesTabProps> = ({
  certificates,
  personalInfo,
  user,
  userMetadata,
  isLoading,
  setIsLoading,
}) => {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>Certificates</CardTitle>
        <CardDescription>Your achievements and certifications</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {certificates.length > 0 ? (
            <div className="grid grid-cols-1 gap-8">
              {certificates.map((cert) => (
                <Certificate
                  key={cert.id}
                  cert={cert}
                  personalInfo={personalInfo}
                  user={user}
                  userMetadata={userMetadata}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Award className="h-16 w-16 mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-medium mb-2">No Certificates Yet</h3>
              <p className="text-gray-500">Complete courses to earn certificates</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CertificatesTab;
