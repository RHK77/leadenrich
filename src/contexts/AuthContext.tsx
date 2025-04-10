
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { supabase } from "@/integrations/supabase/client";

type User = {
  email: string;
  name: string;
  company?: string;
  leadsRemaining: number;
  isPremium: boolean;
  fullName?: string;
  companyName?: string;
  contactInfo?: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, company?: string) => Promise<void>;
  logout: () => void;
  checkLeadLimit: () => boolean;
  decrementLeadCount: () => void;
  updateProfile: (data: { fullName?: string; companyName?: string; contactInfo?: string }) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for existing login on component mount
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { user: supabaseUser } = session;
        
        // Get user profile from Supabase
        let profile = null;
        try {
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', supabaseUser.id)
            .single();
          
          if (error) throw error;
          profile = data;
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }

        // Combine auth user and profile data
        const userData = {
          email: supabaseUser.email || '',
          name: supabaseUser.email?.split('@')[0] || '',
          leadsRemaining: 10,
          isPremium: false,
          fullName: profile?.full_name || '',
          companyName: profile?.company_name || '',
          contactInfo: profile?.contact_info || '',
        };
        
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userData", JSON.stringify(userData));
      } else {
        // Check for legacy login (non-Supabase)
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
      }
    };
    
    checkAuth();

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          const { user: supabaseUser } = session;
          
          // Get user profile
          let profile = null;
          try {
            const { data, error } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', supabaseUser.id)
              .single();
            
            if (error && error.code !== 'PGRST116') throw error;
            profile = data;
          } catch (error) {
            console.error('Error fetching user profile:', error);
          }

          // Combine auth user and profile data
          const userData = {
            email: supabaseUser.email || '',
            name: supabaseUser.email?.split('@')[0] || '',
            leadsRemaining: 10,
            isPremium: false,
            fullName: profile?.full_name || '',
            companyName: profile?.company_name || '',
            contactInfo: profile?.contact_info || '',
          };
          
          setUser(userData);
          setIsAuthenticated(true);
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("userData", JSON.stringify(userData));
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setIsAuthenticated(false);
          localStorage.removeItem("isLoggedIn");
          localStorage.removeItem("userData");
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    // Simulated login - no actual authentication, just for demo purposes
    return new Promise<void>(async (resolve, reject) => {
      try {
        // Simple validation
        if (!email.includes('@')) {
          throw new Error('Invalid email format');
        }
        
        if (password.length < 6) {
          throw new Error('Password must be at least 6 characters');
        }
        
        // Sign in with Supabase
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });

        if (error) throw error;
        
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  };

  const signup = async (name: string, email: string, password: string, company?: string) => {
    // Simulated signup - no actual data is sent to any server
    return new Promise<void>(async (resolve, reject) => {
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
        
        // Sign up with Supabase
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name,
              company
            }
          }
        });

        if (error) throw error;
        
        // Update profile
        try {
          const { error: profileError } = await supabase
            .from('profiles')
            .update({
              full_name: name,
              company_name: company
            })
            .eq('id', data.user?.id);
          
          if (profileError) throw profileError;
        } catch (profileError) {
          console.error('Error updating profile:', profileError);
        }
        
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
    
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userData");
  };

  const updateProfile = async (data: { fullName?: string; companyName?: string; contactInfo?: string }) => {
    if (!user) {
      toast.error("You must be logged in to update your profile");
      return;
    }
    
    try {
      const { data: session, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) throw sessionError;
      
      if (!session.session) {
        toast.error("Session expired. Please log in again");
        return;
      }
      
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: data.fullName,
          company_name: data.companyName,
          contact_info: data.contactInfo,
          updated_at: new Date().toISOString()
        })
        .eq('id', session.session.user.id);
      
      if (error) throw error;
      
      // Update local user state
      setUser(prevUser => {
        if (!prevUser) return null;
        
        const updated = {
          ...prevUser,
          fullName: data.fullName || prevUser.fullName,
          companyName: data.companyName || prevUser.companyName,
          contactInfo: data.contactInfo || prevUser.contactInfo
        };
        
        localStorage.setItem("userData", JSON.stringify(updated));
        return updated;
      });
      
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error("Failed to update profile");
    }
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
        decrementLeadCount,
        updateProfile
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
