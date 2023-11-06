<script lang="ts">
	import type { InstagramProfileDetailDTO } from '$lib/dto/instagramProfileDetail.dto';
	import ImageWithPlaceHolder from '$lib/shared/ImageWithPlaceHolder.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const instagramProfile: InstagramProfileDetailDTO = data.instagramProfileDetail;
</script>

<main class="flex relative flex-col items-center w-full h-full">
	<div class="flex flex-col items-center p-2 m-5 w-1/2 bg-pink-100 rounded-lg min-h-[50vh]">
		<a class="overflow-hidden w-auto h-40 rounded-lg" href="{instagramProfile.path}" >
			<ImageWithPlaceHolder  src="{instagramProfile.path}"/></a>
		<h1 class="text-2xl font-semibold">{instagramProfile.name}</h1>
    <p>Views: {instagramProfile.views}</p>
	</div>
	<a href="/explore" class="absolute top-0 right-0 px-2">
		back
	</a>
    
</main>