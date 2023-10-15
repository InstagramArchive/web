<script lang="ts">
	import type { PageData } from './$types';
	import type { InstagramProfileDTO } from '$lib/dto/instagramProfile.dto';

	export let data: PageData;

	let instagramProfiles: InstagramProfileDTO[] = data.instagram_profile;
</script>

<main>
	<h1>Instagram Profiles</h1>
	<ul>
		{#each instagramProfiles as instagramProfile (instagramProfile.id)}
			<a class="flex gap-2 cursor-pointer hover:underline" href="/test/{instagramProfile.id}">
				<p>Name: {instagramProfile.name}</p>
				<p>Views: {instagramProfile.views}</p>
				<p>Since: {instagramProfile.created_at}</p>
			</a>
		{/each}
	</ul>
</main>