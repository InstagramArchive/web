<script lang="ts">
	import { onMount } from 'svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	let { session, supabase } = data;
	$: ({ session, supabase } = data);

	let isUserLoggedIn = false;

	onMount(() => {
		session?.user ? (isUserLoggedIn = true) : (isUserLoggedIn = false);
	});

	function goBack() {
		history.back();
	}
</script>

<div class="flex h-12 bg-pink-100 w-full items-center">
	<a href="/" class="flex gap-2 items-center p-2 h-full w-fit">
		<img class="h-[90%] w-auto" src="/logo.svg" alt="logo" />
		<h1 class="text-2xl">Instagram Archive</h1>
	</a>
	<a href="/auth" class="ml-auto w-fit h-full flex gap-2 items-center">
		<button class="h-fit" on:click={goBack}>back</button>
		<img
			class="p-2 h-[90%] w-auto"
			alt="account"
			src={isUserLoggedIn ? '/profile_filled.svg' : '/profile.svg'}
		/>
	</a>
</div>
<slot />
