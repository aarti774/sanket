
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
import { Users, UserCog, Activity, Info } from "lucide-react";

type ProfileType = {
  id: string;
  email: string;
  is_admin: boolean;
  created_at: string;
  user_metadata?: {
    full_name?: string;
  };
};

const AdminDashboard = () => {
  const { user, isAdmin } = useAuth();
  const [users, setUsers] = useState<ProfileType[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<ProfileType | null>(null);
  const [activeTab, setActiveTab] = useState("users");

  useEffect(() => {
    if (isAdmin) {
      fetchUsers();
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

      // Then get all auth users to merge the data
      const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();

      if (authError) {
        throw authError;
      }

      // Combine the data
      const combinedUsers = profiles.map(profile => {
        const authUser = authUsers.users.find(u => u.id === profile.id);
        return {
          ...profile,
          user_metadata: authUser?.user_metadata
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
            <span>Activity</span>
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
              <CardTitle>User Activity</CardTitle>
              <CardDescription>
                Track user engagement and system activity.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="py-8 text-center">
                <p className="mb-4">Activity tracking is under development.</p>
                <Button variant="outline">Explore Analytics</Button>
              </div>
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
