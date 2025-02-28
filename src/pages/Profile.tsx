
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { LogOut, Mail, Phone, User } from "lucide-react";

const Profile = () => {
  const { user, signOut } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [userMetadata, setUserMetadata] = useState<any>({});

  useEffect(() => {
    if (user) {
      const metadata = user.user_metadata || {};
      setUserMetadata(metadata);
    }
  }, [user]);

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      await signOut();
      toast.success("Signed out successfully");
    } catch (error) {
      toast.error("Failed to sign out");
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Your Profile</h1>
      
      <Card className="shadow-md">
        <CardHeader className="pb-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex flex-col md:flex-row items-center gap-4 mb-4 md:mb-0">
              <Avatar className="h-20 w-20">
                <AvatarImage src="" alt={userMetadata.full_name || user.email} />
                <AvatarFallback className="text-2xl bg-primary text-white">
                  {userMetadata.full_name
                    ? userMetadata.full_name.split(' ').map((n: string) => n[0]).join('')
                    : user.email?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl">{userMetadata.full_name || "User"}</CardTitle>
                <CardDescription>Account created on {new Date(user.created_at).toLocaleDateString()}</CardDescription>
              </div>
            </div>
            <Button 
              variant="destructive" 
              className="flex items-center gap-2" 
              onClick={handleSignOut}
              disabled={isLoading}
            >
              <LogOut size={16} />
              Sign Out
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 space-y-4">
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium flex items-center gap-2 mb-3">
                    <Mail className="h-4 w-4" />
                    Email Address
                  </h3>
                  <p className="text-gray-600">{user.email}</p>
                </div>
              </div>
              <div className="flex-1 space-y-4">
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium flex items-center gap-2 mb-3">
                    <Phone className="h-4 w-4" />
                    Mobile Number
                  </h3>
                  <p className="text-gray-600">{userMetadata.mobile || "Not provided"}</p>
                </div>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <h3 className="font-medium flex items-center gap-2 mb-3">
                <User className="h-4 w-4" />
                Account Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Account ID</p>
                  <p className="text-gray-600 truncate">{user.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email Verified</p>
                  <p className={`${user.email_confirmed_at ? "text-green-600" : "text-red-600"}`}>
                    {user.email_confirmed_at ? "Yes" : "No"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Last Sign In</p>
                  <p className="text-gray-600">
                    {user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString() : "Never"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t pt-6 flex justify-end">
          <p className="text-sm text-gray-500">
            This information is used to personalize your experience.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Profile;
