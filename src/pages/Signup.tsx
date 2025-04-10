
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Signup = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    toast.info("Auto login enabled for personal use");
    navigate("/dashboard");
  }, [navigate]);
  
  return (
    <div className="flex items-center justify-center h-screen">
      <p>Redirecting to app...</p>
    </div>
  );
};

export default Signup;
