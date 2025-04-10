
import React, { useState } from 'react';
import { AuthContext } from './AuthContext';
import { User } from '@/types/user';
import { useAuthHandlers } from '@/hooks/useAuthHandlers';
import { useLeads } from '@/hooks/useLeads';
import { useProfile } from '@/hooks/useProfile';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const { updateUserProfile } = useProfile();
  const { checkLeadLimit, decrementLeadCount } = useLeads(user, setUser);
  const { login, signup, logout, handleAuthStateChange } = useAuthHandlers({
    setUser,
    setIsAuthenticated
  });

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
