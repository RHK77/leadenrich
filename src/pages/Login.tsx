
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const Login = () => {
  const navigate = useNavigate();
  
  const handleAutoLogin = () => {
    localStorage.setItem("isLoggedIn", "true");
    toast.info("Auto login enabled for personal use");
    navigate("/dashboard");
  };
  
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-muted/30 p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-background rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center">Login</h1>
        <p className="text-center text-muted-foreground">
          This app is configured for personal use with automatic login.
        </p>
        
        <div className="space-y-4">
          <Button 
            className="w-full" 
            size="lg" 
            onClick={handleAutoLogin}
          >
            Enter Application
          </Button>
          
          <p className="text-sm text-center text-muted-foreground">
            No account needed. Click the button to access the dashboard.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
