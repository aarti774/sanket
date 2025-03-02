
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import { toast } from "sonner";

interface SettingsTabProps {
  user: any;
}

const SettingsTab: React.FC<SettingsTabProps> = ({ user }) => {
  const handleChangePassword = () => {
    toast.success("Password reset email sent");
  };

  const handleDeleteAccount = () => {
    toast.error("Account deletion is disabled in this demo");
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>Account Settings</CardTitle>
        <CardDescription>Manage your account preferences and security</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="border rounded-lg p-6">
            <h3 className="text-lg font-medium flex items-center gap-2 mb-4">
              <Lock className="h-5 w-5" />
              Security Settings
            </h3>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <h4 className="font-medium">Password</h4>
                <p className="text-sm text-gray-500">Last changed: Never</p>
                <Button 
                  variant="outline" 
                  onClick={handleChangePassword}
                  className="mt-2"
                >
                  Change Password
                </Button>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">Email Verification</h4>
                <div className="flex items-center space-x-2">
                  <div className={`h-2 w-2 rounded-full ${user.email_confirmed_at ? "bg-green-500" : "bg-red-500"}`}></div>
                  <p className="text-sm">
                    {user.email_confirmed_at ? "Verified" : "Not verified"}
                  </p>
                </div>
                {!user.email_confirmed_at && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-2"
                  >
                    Resend Verification Email
                  </Button>
                )}
              </div>
            </div>
          </div>
          
          <div className="border rounded-lg p-6 border-red-200">
            <h3 className="text-lg font-medium text-red-600 mb-2">Danger Zone</h3>
            <p className="text-sm text-gray-500 mb-4">
              The actions below will permanently affect your account
            </p>
            
            <Button 
              variant="destructive" 
              onClick={handleDeleteAccount}
            >
              Delete Account
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SettingsTab;
