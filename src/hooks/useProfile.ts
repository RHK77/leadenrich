
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { getSupabaseUrl, getSupabaseKey } from "@/utils/authUtils";

export const useProfile = () => {
  const updateUserProfile = async (data: { fullName?: string; companyName?: string; contactInfo?: string }) => {
    try {
      const { data: session, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) throw sessionError;
      
      if (!session.session) {
        toast.error("Session expired. Please log in again");
        return;
      }
      
      // Use a direct fetch approach to bypass TypeScript issues with RPC
      const response = await fetch(`${getSupabaseUrl()}/rest/v1/rpc/update_user_profile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': getSupabaseKey(),
          'Authorization': `Bearer ${getSupabaseKey()}`
        },
        body: JSON.stringify({
          user_id: session.session.user.id,
          full_name_param: data.fullName,
          company_name_param: data.companyName,
          contact_info_param: data.contactInfo
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update profile');
      }
      
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error("Failed to update profile");
      throw error;
    }
  };

  return {
    updateUserProfile,
  };
};
