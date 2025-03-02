
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, Phone } from "lucide-react";
import { toast } from "sonner";

interface PersonalInfoTabProps {
  user: any;
  userMetadata: any;
  personalInfo: {
    fullName: string;
    email: string;
    mobile: string;
  };
  setPersonalInfo: React.Dispatch<React.SetStateAction<{
    fullName: string;
    email: string;
    mobile: string;
  }>>;
}

const PersonalInfoTab: React.FC<PersonalInfoTabProps> = ({
  user,
  userMetadata,
  personalInfo,
  setPersonalInfo,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleSavePersonalInfo = () => {
    toast.success("Personal information updated successfully");
    setIsEditing(false);
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Manage your personal details</CardDescription>
          </div>
          <Button
            onClick={() => setIsEditing(!isEditing)}
            variant="outline"
          >
            {isEditing ? "Cancel" : "Edit"}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {isEditing ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={personalInfo.fullName}
                    onChange={(e) => setPersonalInfo({...personalInfo, fullName: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    value={personalInfo.email}
                    disabled
                  />
                  <p className="text-xs text-gray-500">Email cannot be changed</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mobile">Mobile Number</Label>
                  <Input
                    id="mobile"
                    value={personalInfo.mobile}
                    onChange={(e) => setPersonalInfo({...personalInfo, mobile: e.target.value})}
                  />
                </div>
              </div>
              <Button onClick={handleSavePersonalInfo}>Save Changes</Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 space-y-4">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium flex items-center gap-2 mb-3">
                      <User className="h-4 w-4" />
                      Full Name
                    </h3>
                    <p className="text-gray-600">{personalInfo.fullName || "Not provided"}</p>
                  </div>
                </div>
                <div className="flex-1 space-y-4">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium flex items-center gap-2 mb-3">
                      <Mail className="h-4 w-4" />
                      Email Address
                    </h3>
                    <p className="text-gray-600">{personalInfo.email}</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 space-y-4">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium flex items-center gap-2 mb-3">
                      <Phone className="h-4 w-4" />
                      Mobile Number
                    </h3>
                    <p className="text-gray-600">{personalInfo.mobile || "Not provided"}</p>
                  </div>
                </div>
                <div className="flex-1 space-y-4">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium flex items-center gap-2 mb-3">
                      <User className="h-4 w-4" />
                      Account ID
                    </h3>
                    <p className="text-gray-600 truncate">{user.id}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalInfoTab;
