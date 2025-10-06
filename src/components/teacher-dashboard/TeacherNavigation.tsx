import React, { useState, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SearchBar from "@/components/SearchBar";
import { 
  BarChart3,
  Users,
  FileText,
  BookOpen,
  LogOut,
  MessageSquare,
  Calendar,
  HelpCircle
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useAuthFirebase } from "@/hooks/useAuthFirebase";
import { useToast } from "@/hooks/use-toast";

const TeacherNavigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();
  const { logout } = useAuthFirebase();
  const { toast } = useToast();

  // Teacher navigation items
  const navItems = [
    { name: "Dashboard", path: "/teacher/dashboard", icon: BarChart3 },
    { name: "Student List", path: "/teacher/students", icon: Users },
    { name: "Assessments", path: "/teacher/assessments", icon: FileText },
    { name: "Resources", path: "/teacher/resources", icon: BookOpen },
  ];

  // Function to check if a nav item is active
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path);
  };

  // Memoize user data
  const userInitials = useMemo(() => {
    const teacherName = user?.demographics?.name || user?.email || "Teacher";
    return teacherName.split(' ').map(n => n[0]).join('').toUpperCase();
  }, [user?.demographics?.name, user?.email]);

  const userName = useMemo(() => {
    return user?.demographics?.name || user?.email || "Teacher";
  }, [user?.demographics?.name, user?.email]);

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account.",
        duration: 2000,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive",
        duration: 2000,
      });
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link to="/teacher/dashboard">
              <img 
                src="/logo.png" 
                alt="Novo Wellness Logo" 
                className="h-10 w-auto object-contain cursor-pointer" 
              />
            </Link>
          </div>

          {/* Center Navigation Links - Desktop */}
          <div className="hidden md:flex items-center space-x-2 ml-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-4 py-2 text-base font-medium rounded-md transition-colors ${
                    active
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon className={`h-5 w-5 mr-3 ${active ? 'text-blue-600' : ''}`} />
                  <span className={active ? 'font-semibold' : ''}>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Right side - Search and Profile */}
          <div className="flex items-center space-x-2 md:space-x-3">
            {/* Mobile menu button */}
            <button
              className="p-2 rounded-md text-teal-600 hover:bg-gray-100 md:hidden focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              type="button"
            >
              <svg 
                className={`w-5 h-5 transition-transform duration-200 ${mobileMenuOpen ? 'transform rotate-90' : ''}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
            
            {/* Search Bar */}
            <div className="flex items-center">
              <SearchBar />
              
              {/* Profile Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="relative h-8 w-8 rounded-full cursor-pointer p-0"
                    aria-label="User menu"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="" alt="Profile" />
                      <AvatarFallback 
                        className="bg-teal-500 text-white cursor-pointer select-none"
                        suppressHydrationWarning
                      >
                        {userInitials}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64 bg-white border shadow-lg z-50" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium text-sm">{userName}</p>
                      <p className="text-xs text-muted-foreground">Teacher</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  
                  <DropdownMenuItem asChild>
                    <Link to="/teacher/support" className="flex items-center space-x-2 w-full cursor-pointer">
                      <HelpCircle className="w-4 h-4" />
                      <span>Support</span>
                    </Link>
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem asChild>
                    <Link to="/teacher/activities" className="flex items-center space-x-2 w-full cursor-pointer">
                      <Calendar className="w-4 h-4" />
                      <span>Plan Activity</span>
                    </Link>
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem asChild>
                    <Link to="/teacher/sessions" className="flex items-center space-x-2 w-full cursor-pointer">
                      <MessageSquare className="w-4 h-4" />
                      <span>Schedule Session</span>
                    </Link>
                  </DropdownMenuItem>
                  
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer">
                    <LogOut className="w-4 h-4 mr-2" />
                    <span>Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-2">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center px-3 py-2 text-base font-medium rounded-md ${
                      active
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Icon className={`h-5 w-5 mr-3 ${active ? 'text-blue-600' : ''}`} />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default TeacherNavigation;