<script lang="ts">
	import type { PageData } from './$types';
	import type { InstagramProfileDTO } from '$lib/dto/instagramProfile/instagramProfile.dto';
	import ShortProfile from '$lib/shared/ShortProfile.svelte';

	export let data: PageData;

	let instagramProfiles: InstagramProfileDTO[] = data.instagram_profile;
</script>

<main>
	<div class="flex flex-col p-2 m-5 bg-pink-100 rounded-lg w-1/4">
		<h2 class="text-xl">Profile:</h2>
		{#each instagramProfiles as instagramProfile (instagramProfile.id)}
			<a class="flex gap-2 cursor-pointer" href="/explore/{instagramProfile.id}">
				<ShortProfile profile={instagramProfile} displayPic={true} />
			</a>
		{/each}
	</div>

</main>