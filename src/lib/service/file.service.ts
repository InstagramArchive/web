import { supabase } from "../supabaseClient";

export const getProfilePictureUrl = (path: string) => {
  const { data } = supabase.storage.from('profile_picture').getPublicUrl(path);
  return data?.publicUrl;
};