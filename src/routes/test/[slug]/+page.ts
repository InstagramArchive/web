import { getSingleInstagramProfile } from "$lib/webservice/instagramProfile.webservice";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params }) => {
  const data = await getSingleInstagramProfile(params.slug);

  return { instagramProfileDetail: data };
};

