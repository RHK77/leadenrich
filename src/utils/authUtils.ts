
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
  return supabase.getUrl();
};

// Helper to get Supabase key safely
export const getSupabaseKey = (): string => {
  return supabase.supabaseKey ?? '';
};
