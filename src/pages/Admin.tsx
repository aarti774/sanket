
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Users, UserCog, Activity, Info, BarChart2, Clock, BookOpen, FileText } from "lucide-react";

type ProfileType = {
  id: string;
  email: string;
  is_admin: boolean;
  created_at: string;
  user_metadata?: {
    full_name?: string;
  };
};

type UserActivityType = {
  id: string;
  user_id: string;
  activity_type: string;
  activity_details: any;
  created_at: string;
  user_email?: string;
};

const AdminDashboard = () => {
  const { user, isAdmin } = useAuth();
  const [users, setUsers] = useState<ProfileType[]>([]);
  const [activities, setActivities] = useState<UserActivityType[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<ProfileType | null>(null);
  const [activeTab, setActiveTab] = useState("users");
  const [activityFilters, setActivityFilters] = useState<{
    type: string | null;
    userId: string | null;
  }>({
    type: null,
    userId: null,
  });

  useEffect(() => {
    if (isAdmin) {
      fetchUsers();
      fetchActivities();
    }
  }, [isAdmin]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      // First get all profiles
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*');

      if (profilesError) {
        throw profilesError;
      }

      if (!profiles) {
        throw new Error('No profiles found');
      }

      // Then get all auth users to merge the data
      const { data: authData, error: authError } = await supabase.auth.admin.listUsers();

      if (authError) {
        throw authError;
      }

      // Ensure authUsers is defined and has the users property
      const authUsers = authData && 'users' in authData ? authData.users : [];

      // Combine the data with proper type checking
      const combinedUsers = profiles.map(profile => {
        const authUser = authUsers.find(u => u.id === profile.id);
        return {
          ...profile,
          user_metadata: authUser?.user_metadata || {}
        };
      });

      setUsers(combinedUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const fetchActivities = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('user_activity')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (activityFilters.type) {
        query = query.eq('activity_type', activityFilters.type);
      }
      
      if (activityFilters.userId) {
        query = query.eq('user_id', activityFilters.userId);
      }
      
      const { data, error } = await query;

      if (error) {
        throw error;
      }

      // Get user emails to display instead of IDs
      if (data) {
        const activitiesWithEmails = await Promise.all(
          data.map(async (activity) => {
            const { data: userData } = await supabase
              .from('profiles')
              .select('email')
              .eq('id', activity.user_id)
              .single();
            
            return {
              ...activity,
              user_email: userData?.email || 'Unknown'
            };
          })
        );
        
        setActivities(activitiesWithEmails);
      }
    } catch (error) {
      console.error('Error fetching activities:', error);
      toast.error('Failed to fetch user activities');
    } finally {
      setLoading(false);
    }
  };

  const toggleAdminStatus = async (userId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ is_admin: !currentStatus })
        .eq('id', userId);

      if (error) throw error;

      setUsers(prevUsers => 
        prevUsers.map(u => 
          u.id === userId ? { ...u, is_admin: !currentStatus } : u
        )
      );
      
      toast.success(`User is now ${!currentStatus ? 'an admin' : 'no longer an admin'}`);
    } catch (error) {
      console.error('Error toggling admin status:', error);
      toast.error('Failed to update admin status');
    }
  };

  const clearActivityFilters = () => {
    setActivityFilters({
      type: null,
      userId: null
    });
    
    fetchActivities();
  };

  const filterByType = (type: string) => {
    setActivityFilters(prev => ({
      ...prev,
      type
    }));
  };

  const filterByUser = (userId: string) => {
    setActivityFilters(prev => ({
      ...prev,
      userId
    }));
  };

  useEffect(() => {
    if (isAdmin) {
      fetchActivities();
    }
  }, [activityFilters]);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user_login':
        return <UserCog size={16} className="text-green-500" />;
      case 'user_logout':
        return <UserCog size={16} className="text-red-500" />;
      case 'lesson_view':
        return <BookOpen size={16} className="text-blue-500" />;
      case 'quiz_attempt':
        return <FileText size={16} className="text-yellow-500" />;
      case 'quiz_completion':
        return <BarChart2 size={16} className="text-purple-500" />;
      default:
        return <Activity size={16} />;
    }
  };

  const formatActivityType = (type: string) => {
    return type.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  if (!isAdmin) {
    return (
      <div className="container max-w-4xl mx-auto py-8 px-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
        <p>You do not have permission to access this page.</p>
      </div>
    );
  }

  return (
    <div className="container max-w-6xl mx-auto py-8 px-4 animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button onClick={fetchUsers} disabled={loading}>
          Refresh Data
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-3 gap-2">
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users size={16} />
            <span>Users</span>
          </TabsTrigger>
          <TabsTrigger value="activity" className="flex items-center gap-2">
            <Activity size={16} />
            <span>User Activity</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <UserCog size={16} />
            <span>Settings</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                View and manage all users in the system.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="py-8 text-center">Loading user data...</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead>Admin</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((u) => (
                      <TableRow key={u.id}>
                        <TableCell>
                          {u.user_metadata?.full_name || 'No name'}
                        </TableCell>
                        <TableCell>{u.email}</TableCell>
                        <TableCell>
                          {new Date(u.created_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Switch 
                            checked={u.is_admin} 
                            disabled={u.id === user?.id} // Prevent changing own status
                            onCheckedChange={() => toggleAdminStatus(u.id, u.is_admin)}
                          />
                        </TableCell>
                        <TableCell>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => setSelectedUser(u)}
                              >
                                <Info size={16} className="mr-2" />
                                Details
                              </Button>
                            </DialogTrigger>
                            {selectedUser && (
                              <DialogContent className="sm:max-w-md">
                                <DialogHeader>
                                  <DialogTitle>User Details</DialogTitle>
                                  <DialogDescription>
                                    Complete information about the user
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                  <div className="grid grid-cols-3 gap-4">
                                    <div className="font-medium">ID:</div>
                                    <div className="col-span-2 break-all">{selectedUser.id}</div>
                                  </div>
                                  <div className="grid grid-cols-3 gap-4">
                                    <div className="font-medium">Email:</div>
                                    <div className="col-span-2">{selectedUser.email}</div>
                                  </div>
                                  <div className="grid grid-cols-3 gap-4">
                                    <div className="font-medium">Name:</div>
                                    <div className="col-span-2">
                                      {selectedUser.user_metadata?.full_name || 'Not provided'}
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-3 gap-4">
                                    <div className="font-medium">Joined:</div>
                                    <div className="col-span-2">
                                      {new Date(selectedUser.created_at).toLocaleString()}
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-3 gap-4">
                                    <div className="font-medium">Admin:</div>
                                    <div className="col-span-2">
                                      {selectedUser.is_admin ? 'Yes' : 'No'}
                                    </div>
                                  </div>
                                  <div className="pt-4">
                                    <Button 
                                      variant="outline"
                                      onClick={() => {
                                        filterByUser(selectedUser.id);
                                        setActiveTab('activity');
                                      }}
                                      className="w-full"
                                    >
                                      View User Activity
                                    </Button>
                                  </div>
                                </div>
                                <DialogFooter>
                                  <DialogClose asChild>
                                    <Button>Close</Button>
                                  </DialogClose>
                                </DialogFooter>
                              </DialogContent>
                            )}
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>User Activity</CardTitle>
                  <CardDescription>
                    Track user engagement and system activity.
                  </CardDescription>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {activityFilters.type || activityFilters.userId ? (
                    <Button variant="outline" size="sm" onClick={clearActivityFilters}>
                      Clear Filters
                    </Button>
                  ) : null}
                  <Button size="sm" onClick={() => fetchActivities()}>
                    Refresh
                  </Button>
                </div>
              </div>
              {(activityFilters.type || activityFilters.userId) && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {activityFilters.type && (
                    <div className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                      Type: {formatActivityType(activityFilters.type)}
                    </div>
                  )}
                  {activityFilters.userId && (
                    <div className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                      User: {users.find(u => u.id === activityFilters.userId)?.email || activityFilters.userId}
                    </div>
                  )}
                </div>
              )}
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="py-8 text-center">Loading activity data...</div>
              ) : activities.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Time</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Details</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {activities.map((activity) => (
                      <TableRow key={activity.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Clock size={16} className="text-muted-foreground" />
                            {new Date(activity.created_at).toLocaleString()}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getActivityIcon(activity.activity_type)}
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="px-2 h-6 text-xs"
                              onClick={() => filterByType(activity.activity_type)}
                            >
                              {formatActivityType(activity.activity_type)}
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="px-2 h-6 text-xs"
                            onClick={() => filterByUser(activity.user_id)}
                          >
                            {activity.user_email}
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                View Details
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md">
                              <DialogHeader>
                                <DialogTitle>Activity Details</DialogTitle>
                                <DialogDescription>
                                  Complete information about this activity
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4 py-4">
                                <div className="grid grid-cols-3 gap-4">
                                  <div className="font-medium">Type:</div>
                                  <div className="col-span-2 flex items-center gap-2">
                                    {getActivityIcon(activity.activity_type)}
                                    {formatActivityType(activity.activity_type)}
                                  </div>
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                  <div className="font-medium">User:</div>
                                  <div className="col-span-2">{activity.user_email}</div>
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                  <div className="font-medium">Time:</div>
                                  <div className="col-span-2">{new Date(activity.created_at).toLocaleString()}</div>
                                </div>
                                {activity.activity_details && (
                                  <div>
                                    <div className="font-medium mb-2">Details:</div>
                                    <div className="bg-muted p-3 rounded-md overflow-auto max-h-48">
                                      <pre className="text-xs">{JSON.stringify(activity.activity_details, null, 2)}</pre>
                                    </div>
                                  </div>
                                )}
                              </div>
                              <DialogFooter>
                                <DialogClose asChild>
                                  <Button>Close</Button>
                                </DialogClose>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="py-8 text-center">
                  <p className="mb-4">No activity data found.</p>
                  {(activityFilters.type || activityFilters.userId) && (
                    <Button variant="outline" onClick={clearActivityFilters}>
                      Clear Filters
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Admin Settings</CardTitle>
              <CardDescription>
                Configure system settings and admin preferences.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="py-8 text-center">
                <p className="mb-4">Settings configuration is under development.</p>
                <Button variant="outline">System Configuration</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
