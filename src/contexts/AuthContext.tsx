
import { createContext, useContext } from 'react';
import { User } from '@/types/user';

// Define the shape of our auth context
export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, company?: string) => Promise<void>;
  logout: () => void;
  checkLeadLimit: () => boolean;
  decrementLeadCount: () => void;
  updateProfile: (data: { fullName?: string; companyName?: string; contactInfo?: string }) => Promise<void>;
}

// Create the context with a default value
export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
  checkLeadLimit: () => true,
  decrementLeadCount: () => {},
  updateProfile: async () => {}
});

// Export a custom hook for using the auth context
export const useAuth = () => useContext(AuthContext);
