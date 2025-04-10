
-- Function to get a user's profile by ID
CREATE OR REPLACE FUNCTION public.get_profile_by_id(user_id UUID)
RETURNS SETOF profiles
LANGUAGE sql
SECURITY INVOKER
AS $$
  SELECT * FROM public.profiles WHERE id = user_id;
$$;

-- Function to update a user's profile
CREATE OR REPLACE FUNCTION public.update_user_profile(
  user_id UUID,
  full_name_param TEXT,
  company_name_param TEXT,
  contact_info_param TEXT
)
RETURNS void
LANGUAGE plpgsql
SECURITY INVOKER
AS $$
BEGIN
  UPDATE public.profiles
  SET 
    full_name = COALESCE(full_name_param, full_name),
    company_name = COALESCE(company_name_param, company_name),
    contact_info = COALESCE(contact_info_param, contact_info),
    updated_at = now()
  WHERE id = user_id;
END;
$$;
