// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ocgdnzpzhwdtthrjmcgx.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9jZ2RuenB6aHdkdHRocmptY2d4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM0ODQxNzAsImV4cCI6MjA1OTA2MDE3MH0.x_S6MhmoHZDP1w6278DmXSFjhIlLNdUSwTVjrreyIx0";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);