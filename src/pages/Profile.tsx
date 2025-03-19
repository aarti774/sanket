
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { LogOut } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Settings } from "lucide-react";

// Import our components
import PersonalInfoTab from "@/components/profile/PersonalInfoTab";
import SettingsTab from "@/components/profile/SettingsTab";

const Profile = () => {
  const { user, signOut } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [userMetadata, setUserMetadata] = useState<any>({});
  const [personalInfo, setPersonalInfo] = useState({
    fullName: "",
    email: "",
    mobile: "",
  });
  const [activeTab, setActiveTab] = useState("personal");

  useEffect(() => {
    if (user) {
      const metadata = user.user_metadata || {};
      setUserMetadata(metadata);
      setPersonalInfo({
        fullName: metadata.full_name || "",
        email: user.email || "",
        mobile: metadata.mobile || "",
      });
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
      
      <div className="flex flex-col md:flex-row items-center justify-between mb-8">
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
            <h2 className="text-2xl font-bold">{userMetadata.full_name || "User"}</h2>
            <p className="text-gray-600">Member since {new Date(user.created_at).toLocaleDateString()}</p>
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
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-2 gap-2">
          <TabsTrigger value="personal" className="flex items-center gap-2">
            <User size={16} />
            Personal Info
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings size={16} />
            Settings
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="personal">
          <PersonalInfoTab 
            user={user}
            userMetadata={userMetadata}
            personalInfo={personalInfo}
            setPersonalInfo={setPersonalInfo}
          />
        </TabsContent>
        
        <TabsContent value="settings">
          <SettingsTab user={user} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
