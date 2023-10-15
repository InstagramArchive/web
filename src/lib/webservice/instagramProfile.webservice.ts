import { handleDataAndCast, handleSingleDataAndCast } from '$lib/core/webservice';
import type { InstagramProfileDTO } from '$lib/dto/instagramProfile/instagramProfile.dto';
import type { InstagramProfileDetailDTO } from '$lib/dto/instagramProfile/instagramProfileDetail.dto';
import { supabase } from '$lib/supabaseClient';

export async function getAllInstagramProfile(): Promise<InstagramProfileDTO[]> {
    const { data, error } = await supabase
      .from('instagram_profile')
      .select('id, created_at, name, views')
      .order('views', { ascending: false });
  
    return handleDataAndCast<InstagramProfileDTO>(data, error);
  }
  

  export async function getSingleInstagramProfile(id: number | string): Promise<InstagramProfileDetailDTO> {
    const { data, error } = await supabase
      .from('instagram_profile')
      .select(`
        id, 
        created_at, 
        name, 
        views,
        data_profile_picture (id) 
      `)
      .eq('id', id)
      .limit(1);
  
    return handleSingleDataAndCast<InstagramProfileDetailDTO>(data, error);
  }