<script lang="ts">
	import type { InstagramProfileDTO } from '$lib/dto/instagramProfile/instagramProfile.dto';
	import { formatDateDifference } from '$lib/service/date.service';
	import Icon from './Icon.svelte';
	import ImageWithPlaceHolder from './ImageWithPlaceHolder.svelte';

	export let profile: InstagramProfileDTO;
	export let displayPic: boolean = false;
</script>

<div
	class="p-5 m-2 w-full flex gap-2 bg-purple-50 rounded-md transition-all shadow-pink-900 hover:shadow-xl items-center"
>
	{#if displayPic}
		<ImageWithPlaceHolder _class="h-[3rem] w-[3rem]" src={profile.path} />
	{/if}
	<div class="flex flex-col gap-1">
		<p class="text-xl font-semibold">{profile.name}</p>

		<div class="flex gap-2 w-full">
			<p><strong>Since </strong> {formatDateDifference(new Date(profile.created_at))}</p>

			<div class="flex gap-1 items-center">
				<Icon _class="w-[1rem] h-[1rem]" src="eye.svg" />
				<p>{profile.views}</p>
				<p />
			</div>
			{#if !profile.sponsor}
				<div data-tooltip-target="tooltip-default"  class="flex items-center gap-1">
					<Icon _class="w-[1rem] h-[1rem]" src="warning.svg" />

				</div>
			{/if}
		</div>
	</div>
</div>
