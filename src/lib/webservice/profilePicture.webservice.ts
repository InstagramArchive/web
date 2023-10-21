import { handleDataAndCast } from "$lib/core/webservice";
import type { ProfilePictureDTO } from "$lib/dto/profilePicture.dto";
import { getProfilePictureUrl } from "$lib/service/file.service";
import { supabase } from "$lib/supabaseClient";

export async function getAllProfilePicture(id: string): Promise<ProfilePictureDTO[]> {
    const { data, error } = await supabase
        .from('data_profile_picture')
        .select('*')
        .eq('profile_id', id)
        .order('created_at', { ascending: false });

    // Update the path and hd_path fields to their public URLs
    if (data) {
        data.forEach((item) => {
            item.path = getProfilePictureUrl(item.path);
            item.hd_path = getProfilePictureUrl(item.hd_path);
        });
    }

    return handleDataAndCast<ProfilePictureDTO>(data, error);
}
