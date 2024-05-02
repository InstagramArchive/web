import { getAllInstagramProfile } from '$lib/webservice/instagramProfile.webservice';
import type { PageServerLoad } from './$types';



export const load = (async ({ locals: { supabase, getSession } }) => {

    const session = await getSession();

    let profile =null;

    if (session !== null) {


      const { data: profile } = await supabase
        .from('instagram_profile')
        .select(`id, name`)
        .eq('sponsor', session.user.id);
    }
    

    return {instagram_profile :getAllInstagramProfile(), session, profile};
}) satisfies PageServerLoad;
