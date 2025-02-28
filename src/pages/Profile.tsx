
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { LogOut, Mail, Phone, User, Settings, Award, ChartBar, FileText, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { alphabet, numbers, commonPhrases } from "@/data/lessons";
import { quizzes } from "@/data/quizzes";

const Profile = () => {
  const { user, signOut } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [userMetadata, setUserMetadata] = useState<any>({});
  const [personalInfo, setPersonalInfo] = useState({
    fullName: "",
    email: "",
    mobile: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");

  const allLessons = [...alphabet, ...numbers, ...commonPhrases];
  const completedLessons = allLessons.filter(lesson => lesson.progress > 0);
  const totalProgress = allLessons.length > 0 
    ? Math.round((completedLessons.length / allLessons.length) * 100) 
    : 0;

  // Mock certificates data
  const certificates = [
    { id: "cert-1", name: "Alphabet Master", date: "2023-05-15", progress: 100 },
    { id: "cert-2", name: "Numbers Proficient", date: "2023-06-22", progress: 75 },
    { id: "cert-3", name: "Conversational Basics", date: "2023-07-10", progress: 40 },
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

  const handleSavePersonalInfo = () => {
    // Here you would update the user's information in Supabase
    toast.success("Personal information updated successfully");
    setIsEditing(false);
  };

  const handleChangePassword = () => {
    // Here you would implement password change logic
    toast.success("Password reset email sent");
  };

  const handleDeleteAccount = () => {
    // Here you would implement account deletion logic
    toast.error("Account deletion is disabled in this demo");
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
        
        {/* Personal Information Tab */}
        <TabsContent value="personal">
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
        </TabsContent>
        
        {/* Progress Tab */}
        <TabsContent value="progress">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Learning Progress</CardTitle>
              <CardDescription>Track your journey in learning sign language</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Overall Progress</span>
                    <span className="text-sm font-medium">{totalProgress}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary" 
                      style={{ width: `${totalProgress}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Lesson Categories</h3>
                  
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Alphabet</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span>Completed</span>
                          <span>{alphabet.filter(l => l.progress > 0).length} of {alphabet.length}</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary" 
                            style={{ width: `${alphabet.length > 0 ? (alphabet.filter(l => l.progress > 0).length / alphabet.length) * 100 : 0}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Numbers</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span>Completed</span>
                          <span>{numbers.filter(l => l.progress > 0).length} of {numbers.length}</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary" 
                            style={{ width: `${numbers.length > 0 ? (numbers.filter(l => l.progress > 0).length / numbers.length) * 100 : 0}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Common Phrases</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span>Completed</span>
                          <span>{commonPhrases.filter(l => l.progress > 0).length} of {commonPhrases.length}</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary" 
                            style={{ width: `${commonPhrases.length > 0 ? (commonPhrases.filter(l => l.progress > 0).length / commonPhrases.length) * 100 : 0}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Quiz Performance</h3>
                  <div className="border rounded-lg p-4">
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Quizzes Completed</span>
                        <span>0 of {quizzes.length}</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary" 
                          style={{ width: "0%" }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">Complete quizzes to track your performance</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Certificates Tab */}
        <TabsContent value="certificates">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Certificates</CardTitle>
              <CardDescription>Your achievements and certifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {certificates.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {certificates.map((cert) => (
                      <div key={cert.id} className="border rounded-lg p-4 hover:border-primary transition-colors">
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
                        
                        {cert.progress === 100 && (
                          <div className="mt-4">
                            <Button size="sm" variant="outline" className="w-full flex items-center justify-center gap-2">
                              <FileText size={16} />
                              Download Certificate
                            </Button>
                          </div>
                        )}
                      </div>
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
        </TabsContent>
        
        {/* Settings Tab */}
        <TabsContent value="settings">
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
