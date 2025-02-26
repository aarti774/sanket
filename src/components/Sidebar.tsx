
import { Book, BookOpen, Home, Search, UserCircle } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Book, label: "Lessons", path: "/lessons" },
  { icon: Search, label: "Dictionary", path: "/dictionary" },
  { icon: UserCircle, label: "Profile", path: "/profile" },
];

export const Sidebar = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const location = useLocation();

  return (
    <div
      className={`fixed inset-y-0 left-0 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out z-30 lg:translate-x-0 lg:static lg:inset-0`}
    >
      <div className="h-full flex flex-col">
        <div className="h-16 flex items-center justify-center border-b border-gray-200">
          <BookOpen className="h-8 w-8 text-primary" />
        </div>
        <nav className="flex-1 px-4 space-y-1 py-4">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg ${
                location.pathname === item.path
                  ? "bg-primary text-white"
                  : "text-gray-700 hover:bg-gray-100"
              } transition-colors duration-200`}
              onClick={() => onClose()}
            >
              <item.icon className="h-5 w-5 mr-3" />
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};
