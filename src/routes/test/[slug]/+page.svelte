<script lang="ts">
	import type { InstagramProfileDetailDTO } from '$lib/dto/instagramProfileDetail.dto';
	import type { PageData } from './$types';

	export let data: PageData;

	const instagramProfile: InstagramProfileDetailDTO = data.instagramProfileDetail;
</script>

<main>
	<h1>{instagramProfile.name}</h1>
	<p>Views: {instagramProfile.views}</p>
	<p>Profile Picture: {instagramProfile.data_profile_picture.length}</p>
	<a href="{instagramProfile.id}/profile-picture">Profile pic</a>
</main>
