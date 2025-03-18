
import { useState } from "react";
import { MenuIcon, X, BookOpen, UserCog } from "lucide-react";
import { Sidebar } from "./Sidebar";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isAdmin } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex-1">
          <nav className="bg-white border-b border-gray-200 fixed w-full z-30">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  aria-label="Toggle sidebar menu"
                >
                  {sidebarOpen ? (
                    <X className="block h-6 w-6" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" />
                  )}
                </button>
                <div className="flex-1 flex justify-center px-2 lg:ml-6 lg:justify-end">
                  <Link to="/" className="flex items-center">
                    <BookOpen className="h-6 w-6 text-primary mr-2" />
                    <h1 className="text-2xl font-bold text-primary">Sanket</h1>
                  </Link>
                </div>
                {isAdmin && (
                  <div className="ml-4">
                    <Link to="/admin">
                      <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <UserCog size={16} />
                        Admin
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </nav>
          <main className="flex-1 relative pt-16">
            <div className="px-4 sm:px-6 lg:px-8 py-8">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
};
