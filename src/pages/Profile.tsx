
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { LogOut } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { alphabet, numbers, commonPhrases } from "@/data/lessons";
import { quizzes } from "@/data/quizzes";
import { User, ChartBar, Award, Settings } from "lucide-react";

// Import our new components
import PersonalInfoTab from "@/components/profile/PersonalInfoTab";
import ProgressTab from "@/components/profile/ProgressTab";
import CertificatesTab from "@/components/profile/CertificatesTab";
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

  const certificates = [
    { 
      id: "cert-1", 
      name: "Alphabet Master", 
      date: "2023-05-15", 
      progress: 100,
      achievements: ["Mastered all 26 alphabet signs", "Achieved perfect score in alphabet quiz"],
      remarks: "Excellent understanding of hand positions and finger movements"
    },
    { 
      id: "cert-2", 
      name: "Numbers Proficient", 
      date: "2023-06-22", 
      progress: 75,
      achievements: ["Completed 8/10 number lessons", "Successfully recognized complex number combinations"],
      remarks: "Good progress, needs practice with numbers 7-10"
    },
    { 
      id: "cert-3", 
      name: "Conversational Basics", 
      date: "2023-07-10", 
      progress: 40,
      achievements: ["Learned 15 common phrases", "Can introduce yourself in sign language"],
      remarks: "Making steady progress, continue practicing daily"
    },
  ];

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
        <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <TabsTrigger value="personal" className="flex items-center gap-2">
            <User size={16} />
            <span className="hidden md:inline">Personal Info</span>
            <span className="md:hidden">Info</span>
          </TabsTrigger>
          <TabsTrigger value="progress" className="flex items-center gap-2">
            <ChartBar size={16} />
            <span className="hidden md:inline">Progress</span>
            <span className="md:hidden">Progress</span>
          </TabsTrigger>
          <TabsTrigger value="certificates" className="flex items-center gap-2">
            <Award size={16} />
            <span className="hidden md:inline">Certificates</span>
            <span className="md:hidden">Certs</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings size={16} />
            <span className="hidden md:inline">Settings</span>
            <span className="md:hidden">Settings</span>
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
        
        <TabsContent value="progress">
          <ProgressTab 
            alphabet={alphabet}
            numbers={numbers}
            commonPhrases={commonPhrases}
            quizzes={quizzes}
          />
        </TabsContent>
        
        <TabsContent value="certificates">
          <CertificatesTab 
            certificates={certificates}
            personalInfo={personalInfo}
            user={user}
            userMetadata={userMetadata}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
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
