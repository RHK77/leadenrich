
import { useEffect } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { User } from '@/types/user';
import { getSupabaseUrl, getSupabaseKey } from '@/utils/authUtils';

type AuthHandlerProps = {
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
};

export const useAuthHandlers = ({ setUser, setIsAuthenticated }: AuthHandlerProps) => {
  // Set up auth state listener on mount
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
        // Use a direct fetch approach to bypass TypeScript issues with RPC
        const response = await fetch(`${getSupabaseUrl()}/rest/v1/rpc/get_profile_by_id`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': getSupabaseKey(),
            'Authorization': `Bearer ${getSupabaseKey()}`
          },
          body: JSON.stringify({
            user_id: supabaseUser.id
          })
        });
        
        if (!response.ok) {
          const errorText = await response.text();
          if (response.status !== 404) { // Ignore 404 errors as it means no profile found
            throw new Error(errorText);
          }
        } else {
          profile = await response.json();
        }
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

  return { login, signup, logout, handleAuthStateChange };
};
