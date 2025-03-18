
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";

export function RequireAdmin({ children }: { children: JSX.Element }) {
  const { user, loading, isAdmin, checkAdminStatus } = useAuth();
  const location = useLocation();
  const [checking, setChecking] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const verifyAdmin = async () => {
      if (!loading && user) {
        const adminStatus = await checkAdminStatus();
        setIsAuthorized(adminStatus);
      }
      setChecking(false);
    };

    verifyAdmin();
  }, [user, loading, checkAdminStatus]);

  if (loading || checking) {
    return <div className="flex items-center justify-center h-screen">Verifying permissions...</div>;
  }

  if (!user) {
    // Redirect to login if not authenticated
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  if (!isAuthorized) {
    // Redirect to home if not an admin
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}
