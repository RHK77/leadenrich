
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ApiClient } from '@/utils/apiClient';

interface ApiKeyContextType {
  hasApiKey: boolean;
  setApiKey: (key: string) => void;
  clearApiKey: () => void;
}

const ApiKeyContext = createContext<ApiKeyContextType | undefined>(undefined);

export const ApiKeyProvider = ({ children }: { children: ReactNode }) => {
  const [hasApiKey, setHasApiKey] = useState<boolean>(false);
  
  // Check if API key exists on component mount
  useEffect(() => {
    setHasApiKey(ApiClient.hasApiKey());
  }, []);
  
  const setApiKey = (key: string) => {
    ApiClient.setApiKey(key);
    setHasApiKey(true);
  };
  
  const clearApiKey = () => {
    ApiClient.clearApiKey();
    setHasApiKey(false);
  };
  
  return (
    <ApiKeyContext.Provider value={{ hasApiKey, setApiKey, clearApiKey }}>
      {children}
    </ApiKeyContext.Provider>
  );
};

export const useApiKey = () => {
  const context = useContext(ApiKeyContext);
  
  if (context === undefined) {
    throw new Error('useApiKey must be used within an ApiKeyProvider');
  }
  
  return context;
};
