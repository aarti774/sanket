
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, AlertOctagon } from "lucide-react";
import { toast } from "sonner";

const AdminAccess = () => {
  const { isAdmin, user, loading, checkAdminStatus } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAdmin = async () => {
      if (!loading && user) {
        await checkAdminStatus();
      }
    };

    verifyAdmin();
  }, [loading, user, checkAdminStatus]);

  const handleAdminAccess = () => {
    if (isAdmin) {
      navigate('/admin');
    } else {
      toast.error("You don't have admin privileges");
    }
  };

  if (loading) {
    return <div className="container py-8 px-4 text-center">Loading...</div>;
  }

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <div className="bg-card border rounded-lg overflow-hidden shadow-sm">
        <div className="bg-muted p-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Shield className="text-primary" />
            Admin Access
          </h1>
          {isAdmin && (
            <div className="bg-green-100 text-green-800 py-1 px-3 rounded-full text-sm font-medium flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-green-500"></span>
              Admin
            </div>
          )}
        </div>
        
        <div className="p-6">
          {isAdmin ? (
            <div className="space-y-6">
              <p className="text-muted-foreground">
                You have administrator privileges. You can access the admin dashboard to manage users and system settings.
              </p>
              
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                <h3 className="font-medium text-primary mb-2">Available Administration Tools:</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>User management</li>
                  <li>System configuration</li>
                  <li>Activity monitoring</li>
                </ul>
              </div>
              
              <Button 
                className="w-full md:w-auto"
                size="lg"
                onClick={handleAdminAccess}
              >
                Access Admin Dashboard
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-start gap-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <AlertOctagon className="text-yellow-500 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium text-yellow-700 mb-1">Restricted Access</h3>
                  <p className="text-yellow-600 text-sm">
                    You don't have administrator privileges. Only designated administrators can access this area.
                  </p>
                </div>
              </div>
              
              <p className="text-muted-foreground">
                If you believe you should have admin access, please contact the system administrator.
              </p>
              
              <Button 
                variant="outline" 
                className="w-full md:w-auto"
                onClick={() => navigate('/')}
              >
                Return to Home
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminAccess;
