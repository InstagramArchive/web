import { supabase } from "../supabaseClient.ts";

export const getProfilePictureUrl = (path: string) => {
    const { data, error } = supabase.storage.from('profile_picture').getPublicUrl(path);
    console.log("source:",data)
    return data?.publicUrl;
  };