
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { LogOut } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Settings, Award, BarChart } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

// Import our components
import PersonalInfoTab from "@/components/profile/PersonalInfoTab";
import SettingsTab from "@/components/profile/SettingsTab";
import CertificatesTab from "@/components/profile/CertificatesTab";
import ProgressTab from "@/components/profile/ProgressTab";

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

  // State for certificates and progress
  const [certificates, setCertificates] = useState<any[]>([]);
  const [alphabet, setAlphabet] = useState<any[]>([]);
  const [numbers, setNumbers] = useState<any[]>([]);
  const [commonPhrases, setCommonPhrases] = useState<any[]>([]);
  const [quizzes, setQuizzes] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      const metadata = user.user_metadata || {};
      setUserMetadata(metadata);
      setPersonalInfo({
        fullName: metadata.full_name || "",
        email: user.email || "",
        mobile: metadata.mobile || "",
      });
      
      // Fetch user quizzes
      fetchUserQuizzes();
      
      // Fetch user lessons
      fetchUserLessons();
      
      // Generate certificates based on completed quizzes
      generateCertificates();
    }
  }, [user]);
  
  const fetchUserQuizzes = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('quiz')
        .select('*')
        .eq('user_id', user.id);
        
      if (error) {
        console.error('Error fetching quizzes:', error);
        return;
      }
      
      setQuizzes(data || []);
    } catch (error) {
      console.error('Failed to fetch quizzes:', error);
    }
  };
  
  const fetchUserLessons = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('lessons')
        .select('*')
        .eq('user_id', user.id);
        
      if (error) {
        console.error('Error fetching lessons:', error);
        return;
      }
      
      const alphabetLessons = data?.filter((lesson) => 
        lesson['lesson-id'].startsWith('alphabet-')) || [];
      const numberLessons = data?.filter((lesson) => 
        lesson['lesson-id'].startsWith('number-')) || [];
      const phraseLessons = data?.filter((lesson) => 
        lesson['lesson-id'].startsWith('phrase-')) || [];
      
      setAlphabet(alphabetLessons);
      setNumbers(numberLessons);
      setCommonPhrases(phraseLessons);
    } catch (error) {
      console.error('Failed to fetch lessons:', error);
    }
  };
  
  const generateCertificates = () => {
    // This is a simplified example - in reality, you would base this on actual course completion
    const sampleCertificates = [
      {
        id: "cert-1",
        name: "Sign Language Basics Certificate",
        date: new Date().toISOString(),
        progress: 100,
        achievements: [
          "Completed all alphabet lessons",
          "Scored above 80% on all quizzes",
          "Mastered basic hand signs"
        ],
        remarks: "Excellent progress in learning the sign language alphabet"
      },
      {
        id: "cert-2",
        name: "Numbers and Counting Certificate",
        date: new Date().toISOString(),
        progress: 75,
        achievements: [
          "Completed 75% of number lessons",
          "Scored above 70% on related quizzes"
        ],
        remarks: "Making good progress on numbers and counting"
      }
    ];
    
    setCertificates(sampleCertificates);
  };

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
        <TabsList className="grid grid-cols-4 gap-2">
          <TabsTrigger value="personal" className="flex items-center gap-2">
            <User size={16} />
            Personal Info
          </TabsTrigger>
          <TabsTrigger value="certificates" className="flex items-center gap-2">
            <Award size={16} />
            Certificates
          </TabsTrigger>
          <TabsTrigger value="progress" className="flex items-center gap-2">
            <BarChart size={16} />
            Progress
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
        
        <TabsContent value="progress">
          <ProgressTab 
            alphabet={alphabet}
            numbers={numbers}
            commonPhrases={commonPhrases}
            quizzes={quizzes}
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
