import { getSingleInstagramProfile } from "$lib/webservice/instagramProfile.webservice";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params,  locals: { supabase, getSession } }) => {
  const session  = await getSession();
  
  const data = await getSingleInstagramProfile(params.slug, session?.user?.id);

  return { instagramProfileDetail: data };
};



