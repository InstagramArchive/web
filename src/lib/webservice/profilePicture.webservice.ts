import { handleDataAndCast } from "$lib/core/webservice";
import type { ProfilePictureDTO } from "$lib/dto/profilePicture.dto";
import { supabase } from "$lib/supabaseClient";

export async function getAllProfilePicture(id: string): Promise<ProfilePictureDTO[]> {
    const { data, error } = await supabase.from('data_profile_picture').select('*').eq('id', id).order('created_at', { ascending: false });
    return handleDataAndCast<ProfilePictureDTO>(data, error);

  }
  