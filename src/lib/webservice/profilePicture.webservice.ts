import { supabase } from "$lib/supabaseClient";

export async function getAllProfilePicture(id: string): Promise<any[]> {
    const { data } = await supabase.from('data_profile_picture').select('*').eq('id', id).order('created_at', { ascending: false });
    return data ?? [];
  }
  