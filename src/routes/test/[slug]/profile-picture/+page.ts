import { getAllProfilePicture } from "$lib/webservice/profilePicture.webservice";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params }) => {
  const data = await getAllProfilePicture(params.slug);

  return { profilePicture: data };
};

