
import React, { createContext, useContext, useState, useEffect } from 'react';
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

  useEffect(() => {
    // Check for existing login on component mount
    const checkAuth = () => {
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
      if (isLoggedIn) {
        // Try to get user data from localStorage
        const userData = localStorage.getItem("userData");
        if (userData) {
          try {
            setUser(JSON.parse(userData));
            setIsAuthenticated(true);
          } catch (e) {
            // Handle JSON parse error
            localStorage.removeItem("userData");
            localStorage.removeItem("isLoggedIn");
          }
        } else {
          // No user data found but logged in flag is true, log the user out
          localStorage.removeItem("isLoggedIn");
        }
      }
    };
    
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    // Simulated login - no actual authentication, just for demo purposes
    return new Promise<void>((resolve, reject) => {
      try {
        // Simple validation
        if (!email.includes('@')) {
          throw new Error('Invalid email format');
        }
        
        if (password.length < 6) {
          throw new Error('Password must be at least 6 characters');
        }
        
        setTimeout(() => {
          const userData = {
            email,
            name: email.split('@')[0], // Simple name extraction
            leadsRemaining: 10,
            isPremium: false
          };
          
          setUser(userData);
          setIsAuthenticated(true);
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("userData", JSON.stringify(userData));
          
          resolve();
        }, 800); // Simulate network delay
      } catch (error) {
        reject(error);
      }
    });
  };

  const signup = async (name: string, email: string, password: string, company?: string) => {
    // Simulated signup - no actual data is sent to any server
    return new Promise<void>((resolve, reject) => {
      try {
        // Simple validation
        if (!email.includes('@')) {
          throw new Error('Invalid email format');
        }
        
        if (password.length < 6) {
          throw new Error('Password must be at least 6 characters');
        }
        
        if (!name || name.length < 2) {
          throw new Error('Name is required and must be at least 2 characters');
        }
        
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
          
          resolve();
        }, 800); // Simulate network delay
      } catch (error) {
        reject(error);
      }
    });
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userData");
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
