import { getSingleInstagramProfile } from "$lib/webservice/instagramProfile.webservice";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
  const data = await getSingleInstagramProfile(params.slug);

  return { instagramProfileDetail: data };
};




