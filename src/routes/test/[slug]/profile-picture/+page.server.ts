import { getAllProfilePicture } from "$lib/webservice/profilePicture.webservice";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
  const data = await getAllProfilePicture(params.slug);

  return { profilePicture: data };
};

