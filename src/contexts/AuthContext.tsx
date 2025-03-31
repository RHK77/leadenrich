
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

type User = {
  email: string;
  name: string;
  company?: string;
  leadsRemaining: number;
  isPremium: boolean;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, company?: string) => Promise<void>;
  logout: () => void;
  checkLeadLimit: () => boolean;
  decrementLeadCount: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for existing login
    const checkAuth = () => {
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
      if (isLoggedIn) {
        // Try to get user data from localStorage
        const userData = localStorage.getItem("userData");
        if (userData) {
          setUser(JSON.parse(userData));
        } else {
          // Default user data if logged in but no user data
          setUser({
            email: "user@example.com",
            name: "User",
            leadsRemaining: 10,
            isPremium: false
          });
        }
        setIsAuthenticated(true);
      }
    };
    
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    // Simulating authentication
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const userData = {
          email,
          name: email.split('@')[0],
          leadsRemaining: 10,
          isPremium: false
        };
        
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userData", JSON.stringify(userData));
        
        toast.success("Login successful!");
        resolve();
      }, 1000);
    });
  };

  const signup = async (name: string, email: string, password: string, company?: string) => {
    // Simulating signup
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const userData = {
          email,
          name,
          company,
          leadsRemaining: 10,
          isPremium: false
        };
        
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userData", JSON.stringify(userData));
        
        toast.success("Account created successfully!");
        resolve();
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userData");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const checkLeadLimit = () => {
    if (!user) return false;
    
    if (user.isPremium) return true;
    
    if (user.leadsRemaining <= 0) {
      toast.error("Free trial limit reached. Please upgrade to continue.");
      return false;
    }
    
    return true;
  };

  const decrementLeadCount = () => {
    if (!user || user.isPremium) return;
    
    const newLeadsRemaining = Math.max(0, user.leadsRemaining - 1);
    const updatedUser = { ...user, leadsRemaining: newLeadsRemaining };
    
    setUser(updatedUser);
    localStorage.setItem("userData", JSON.stringify(updatedUser));
    
    if (newLeadsRemaining === 0) {
      toast.warning("You've used all your free trial leads. Upgrade to continue.");
    } else if (newLeadsRemaining <= 3) {
      toast.info(`Only ${newLeadsRemaining} free leads remaining.`);
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated, 
        login, 
        signup, 
        logout, 
        checkLeadLimit,
        decrementLeadCount 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
