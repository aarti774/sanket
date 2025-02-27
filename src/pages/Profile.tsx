
import { useState } from "react";
import {
  User,
  Settings,
  Award,
  BarChart2,
  LogOut,
  Edit,
  Save,
  Camera
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("personal-info");
  const [editMode, setEditMode] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 555-123-4567",
  });

  const [tempUserInfo, setTempUserInfo] = useState({ ...userInfo });

  const handleEditToggle = () => {
    if (editMode) {
      // Save changes
      setUserInfo({ ...tempUserInfo });
      toast.success("Profile updated successfully");
    } else {
      // Enter edit mode
      setTempUserInfo({ ...userInfo });
    }
    setEditMode(!editMode);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTempUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogout = () => {
    toast.info("Logged out successfully");
    // In a real application, you would handle actual logout logic here
  };

  const progressData = [
    { title: "Alphabet Mastery", progress: 75 },
    { title: "Number Signs", progress: 60 },
    { title: "Common Phrases", progress: 40 },
    { title: "Conversation Skills", progress: 25 },
  ];

  const certificates = [
    {
      id: "cert1",
      title: "Alphabet Basics",
      issueDate: "June 15, 2023",
      status: "completed",
    },
    {
      id: "cert2",
      title: "Number Signs Essentials",
      issueDate: "August 22, 2023",
      status: "completed",
    },
    {
      id: "cert3",
      title: "Conversational Signing",
      issueDate: "Pending completion",
      status: "in-progress",
    },
  ];

  return (
    <div className="container mx-auto p-4 max-w-6xl animate-fade-in">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Sidebar */}
        <div className="lg:col-span-1">
          <Card className="mb-6">
            <CardContent className="p-6 flex flex-col items-center">
              <div className="relative mb-4">
                <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 overflow-hidden">
                  <User size={64} />
                </div>
                <button className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full">
                  <Camera size={16} />
                </button>
              </div>
              <h2 className="text-xl font-semibold text-center">
                {userInfo.name}
              </h2>
              <p className="text-gray-500 text-center">{userInfo.email}</p>
            </CardContent>
          </Card>

          <div className="hidden lg:block">
            <h3 className="text-lg font-medium mb-4">Navigation</h3>
            <nav className="space-y-2">
              <Button
                variant={activeTab === "personal-info" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("personal-info")}
              >
                <User className="mr-2 h-5 w-5" />
                Personal Information
              </Button>
              <Button
                variant={activeTab === "progress" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("progress")}
              >
                <BarChart2 className="mr-2 h-5 w-5" />
                Progress Tracking
              </Button>
              <Button
                variant={activeTab === "certificates" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("certificates")}
              >
                <Award className="mr-2 h-5 w-5" />
                Certificate Management
              </Button>
              <Button
                variant={activeTab === "settings" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("settings")}
              >
                <Settings className="mr-2 h-5 w-5" />
                Account Settings
              </Button>
              <Button
                variant="destructive"
                className="w-full justify-start mt-6"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-5 w-5" />
                Log Out
              </Button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <div className="lg:hidden mb-4">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="w-full grid grid-cols-2 md:grid-cols-4">
                    <TabsTrigger value="personal-info">
                      <User className="h-4 w-4 mr-2" />
                      <span className="hidden md:inline">Info</span>
                    </TabsTrigger>
                    <TabsTrigger value="progress">
                      <BarChart2 className="h-4 w-4 mr-2" />
                      <span className="hidden md:inline">Progress</span>
                    </TabsTrigger>
                    <TabsTrigger value="certificates">
                      <Award className="h-4 w-4 mr-2" />
                      <span className="hidden md:inline">Certificates</span>
                    </TabsTrigger>
                    <TabsTrigger value="settings">
                      <Settings className="h-4 w-4 mr-2" />
                      <span className="hidden md:inline">Settings</span>
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
                <Button
                  variant="destructive"
                  className="w-full mt-2"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-5 w-5" />
                  Log Out
                </Button>
              </div>

              <CardTitle>
                {activeTab === "personal-info" && "Personal Information"}
                {activeTab === "progress" && "Progress Tracking"}
                {activeTab === "certificates" && "Certificate Management"}
                {activeTab === "settings" && "Account Settings"}
              </CardTitle>
              <CardDescription>
                {activeTab === "personal-info" &&
                  "Manage your personal details and contact information"}
                {activeTab === "progress" &&
                  "Track your learning progress across different skill areas"}
                {activeTab === "certificates" &&
                  "View and manage your earned certificates"}
                {activeTab === "settings" &&
                  "Adjust your account settings and preferences"}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Personal Information */}
              {activeTab === "personal-info" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={editMode ? tempUserInfo.name : userInfo.name}
                        onChange={handleInputChange}
                        disabled={!editMode}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={editMode ? tempUserInfo.email : userInfo.email}
                        onChange={handleInputChange}
                        disabled={!editMode}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={editMode ? tempUserInfo.phone : userInfo.phone}
                        onChange={handleInputChange}
                        disabled={!editMode}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Progress Tracking */}
              {activeTab === "progress" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {progressData.map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between">
                          <Label>{item.title}</Label>
                          <span className="text-sm text-gray-500">
                            {item.progress}%
                          </span>
                        </div>
                        <Progress value={item.progress} className="h-2" />
                      </div>
                    ))}
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Overall Progress</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">
                          50% Complete
                        </span>
                        <span className="text-sm text-gray-500">
                          8/16 Lessons
                        </span>
                      </div>
                      <Progress value={50} className="h-2" />
                    </div>
                  </div>
                </div>
              )}

              {/* Certificate Management */}
              {activeTab === "certificates" && (
                <div className="space-y-4">
                  {certificates.map((cert) => (
                    <div
                      key={cert.id}
                      className="border rounded-lg p-4 flex flex-col md:flex-row md:items-center justify-between"
                    >
                      <div className="mb-4 md:mb-0">
                        <div className="flex items-center">
                          <Award
                            className={`h-5 w-5 mr-2 ${
                              cert.status === "completed"
                                ? "text-yellow-500"
                                : "text-gray-400"
                            }`}
                          />
                          <h3 className="font-medium">{cert.title}</h3>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          {cert.issueDate}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        {cert.status === "completed" ? (
                          <>
                            <Button variant="outline" size="sm">
                              View
                            </Button>
                            <Button variant="outline" size="sm">
                              Download
                            </Button>
                          </>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-blue-500 border-blue-500"
                          >
                            Continue Learning
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Account Settings */}
              {activeTab === "settings" && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Notification Preferences</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="email-notifications"
                          className="h-4 w-4"
                          defaultChecked
                        />
                        <Label htmlFor="email-notifications">
                          Email Notifications
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="progress-updates"
                          className="h-4 w-4"
                          defaultChecked
                        />
                        <Label htmlFor="progress-updates">
                          Weekly Progress Updates
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="new-content"
                          className="h-4 w-4"
                          defaultChecked
                        />
                        <Label htmlFor="new-content">
                          New Content Alerts
                        </Label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium">Account Security</h3>
                    <Button variant="outline">Change Password</Button>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium">Danger Zone</h3>
                    <Button variant="destructive">Delete Account</Button>
                  </div>
                </div>
              )}
            </CardContent>

            <CardFooter>
              {activeTab === "personal-info" && (
                <Button
                  className="ml-auto"
                  onClick={handleEditToggle}
                  variant={editMode ? "default" : "outline"}
                >
                  {editMode ? (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  ) : (
                    <>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Profile
                    </>
                  )}
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
