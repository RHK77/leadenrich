
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from "@/integrations/supabase/client";
import { useProfile } from '@/hooks/useProfile';
import { useLeads } from '@/hooks/useLeads';

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
  const { updateUserProfile } = useProfile();
  const { checkLeadLimit: checkLimit, decrementLeadCount: decrementLead } = useLeads(user, setUser);

  useEffect(() => {
    // Check for existing login on component mount
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        await handleAuthStateChange('SIGNED_IN', session);
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
    const { data: { subscription } } = supabase.auth.onAuthStateChange(handleAuthStateChange);

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleAuthStateChange = async (event: string, session: Session | null) => {
    if (event === 'SIGNED_IN' && session) {
      const { user: supabaseUser } = session;
      
      // Get user profile
      let profile = null;
      try {
        const { data, error } = await fetchUserProfile(supabaseUser.id);
        
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
  };

  const fetchUserProfile = async (userId: string) => {
    // Use a direct fetch approach to bypass TypeScript issues with RPC
    const response = await fetch(`${supabase.getUrl()}/rest/v1/rpc/get_profile_by_id`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabase.supabaseKey ?? '',
        'Authorization': `Bearer ${supabase.supabaseKey ?? ''}`
      },
      body: JSON.stringify({
        user_id: userId
      })
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      return { data: null, error: { message: errorText, code: response.status.toString() } };
    }
    
    const data = await response.json();
    return { data, error: null };
  };

  const login = async (email: string, password: string) => {
    return await handleAuth(() => supabase.auth.signInWithPassword({ email, password }));
  };

  const signup = async (name: string, email: string, password: string, company?: string) => {
    return await handleAuth(() => {
      return supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            company
          }
        }
      });
    });
  };

  const handleAuth = async (authFunction: () => Promise<any>) => {
    return new Promise<void>(async (resolve, reject) => {
      try {
        // Simple validation - moved to hook or external file
        const { data, error } = await authFunction();
        
        if (error) throw error;
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
    await updateUserProfile(data);
    
    // Update local user state if successful
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
  };

  const checkLeadLimit = () => checkLimit();
  const decrementLeadCount = () => decrementLead();

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
