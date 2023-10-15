import { getAllInstagramProfile } from '$lib/webservice/instagramProfile.webservice';
import type { PageLoad } from './$types';



export const load = (async () => {
    return {instagram_profile :getAllInstagramProfile()};
}) satisfies PageLoad;

