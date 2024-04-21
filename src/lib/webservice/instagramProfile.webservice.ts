import { handleDataAndCast, handleSingleDataAndCast } from '$lib/core/webservice';
import type { InstagramProfileDTO } from '$lib/dto/instagramProfile/instagramProfile.dto';
import type { InstagramProfileDetailDTO } from '$lib/dto/instagramProfile/instagramProfileDetail.dto';
import { getProfilePictureUrl } from '$lib/service/file.service';
import { supabase } from '$lib/supabaseClient';

export async function getAllInstagramProfile(): Promise<InstagramProfileDTO[]> {
    const { data, error } = await supabase
      .from('instagram_profile_summary')
      .select('id, created_at, name, views, path, sponsor')
      .order('views', { ascending: false });

      const tmp: InstagramProfileDTO[] = handleDataAndCast<InstagramProfileDTO>(data, error);

      tmp.map((profile: InstagramProfileDTO) =>{
        profile.path = getProfilePictureUrl(profile.path)
      })
  
    return tmp;
  }
  

  export async function getSingleInstagramProfile(profile_id: number | string, user_id: string | null = null, _supabase = supabase): Promise<InstagramProfileDetailDTO> {
    const { data, error } = await _supabase.rpc('get_instagram_profile', { profile_id, user_id });

    console.log("data, full profile", data)

    const tmp = handleSingleDataAndCast<InstagramProfileDetailDTO>(data, error)

    if (tmp) {
      
      tmp.path = getProfilePictureUrl(tmp.path);
      tmp.path_hd = getProfilePictureUrl(tmp.path_hd);
    }
  

    return tmp;
  }