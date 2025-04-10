
import { supabase } from "@/integrations/supabase/client";

// Email validation helper
export const validateEmail = (email: string): boolean => {
  return email.includes('@');
};

// Password validation helper
export const validatePassword = (password: string): boolean => {
  return password.length >= 6;
};

// Name validation helper
export const validateName = (name: string): boolean => {
  return name.length >= 2;
};

// Helper to get Supabase URL safely 
export const getSupabaseUrl = (): string => {
  // Use string concatenation instead of accessing the property directly
  return "https://ocgdnzpzhwdtthrjmcgx.supabase.co";
};

// Helper to get Supabase key safely
export const getSupabaseKey = (): string => {
  // Use the publicly available key from the client file
  return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9jZ2RuenB6aHdkdHRocmptY2d4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM0ODQxNzAsImV4cCI6MjA1OTA2MDE3MH0.x_S6MhmoHZDP1w6278DmXSFjhIlLNdUSwTVjrreyIx0";
};
