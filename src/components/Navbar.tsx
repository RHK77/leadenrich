
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Menu, User, Bell, Settings, LogOut, ChevronDown } from "lucide-react";
import { toast } from "sonner";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <nav className="border-b bg-white">
      <div className="container mx-auto flex items-center justify-between py-4">
        <div className="flex items-center">
          <Link to="/" className="text-xl font-bold text-primary">
            LeadEnrich
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-sm font-medium hover:text-primary">
            Home
          </Link>
          <Link to="/features" className="text-sm font-medium hover:text-primary">
            Features
          </Link>
          <Link to="/pricing" className="text-sm font-medium hover:text-primary">
            Pricing
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={() => toast.info("No new notifications")}
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-destructive rounded-full"></span>
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    <span className="hidden sm:inline">Account</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem className="cursor-pointer" onClick={() => navigate("/dashboard")}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer" onClick={() => navigate("/settings")}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button
                variant="ghost"
                className="hidden md:flex"
                onClick={() => navigate("/login")}
              >
                Log in
              </Button>
              <Button onClick={() => navigate("/signup")}>Sign up</Button>
            </>
          )}
          
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
