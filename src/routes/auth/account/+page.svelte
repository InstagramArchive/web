<!-- src/routes/account/+page.svelte -->
<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';

	export let data;

	let { session, supabase, profile } = data;
	$: ({ session, supabase, profile } = data);

	let loading = false;
	let error: Object | null = null;
	let username: string = '';

	let isValid = false;
	let lastUsername: string = '';

	let isInputValid = loading || !isValid || lastUsername !== username

	$: isInputValid = loading || !isValid || lastUsername !== username

	const validateUsername = async (username: string) => {
		
		const response = await fetch('?/isValid', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: `username=${username}`

		})
			const result = await response.json();
			const valid = JSON.parse(result.data)[1];

			console.log("valid",valid );
			
			isValid = valid;
			lastUsername = username;
	};


	const handleSubmit: SubmitFunction = () => {
		loading = true;
		return async (response: {
			result: {
				status: number;
				data: { body: { data: { id: any; name: any }[] | null; error: Object | null } };
			};
		}) => {
			if (response.result.status === 200) {
				profile = response.result.data.body.data;
				error = null;
			} else {
				error = response.result.data.body.error;
			}
			loading = false;
		};
	};

</script>

<div class="flex items-center justify-center p-5 w-full min-h-full grow gap-5">
	<div class="flex flex-col gap-2 bg-white rounded-lg shadow-md p-4 h-full items-center">

		<img class="h-20 w-auto" src="/profile.svg" alt="profile picture" />

		<p class="font-semibold text-pink-400">{data.session.user.email}</p>

		<form action="/auth/logout" method="POST">
			<button class="rounded-md border-[1px] border-pink-400 px-2 p-1" type="submit"
				>Logout</button
			>
		</form>
	
	</div>
	<div class="p-4">
		<div
			class="flex flex-col gap-2 p-4 mx-auto max-w-md bg-white rounded-lg shadow-md"
			
		>
			<h2 class="text-xl font-semibold">Sponsorised profile:</h2>
			{#if profile !== null}
				{#each profile as p}
					<form class="mb-4 flex items-center gap-2"
					method="post"
					action="?/remove"
					enctype="multipart/form-data"
					use:enhance={handleSubmit}>
						<p class="block text-gray-700 bg-pink-100 rounded-md p-1 w-full">
							{p.name}
						</p>
						<button  type="submit"><img class="w-auto h-10" src="/ic_cross.svg" alt="delete"></button>
						<input class="hidden" type="number" name="id" bind:value={p.id} />
					</form>
				{/each}
			{:else}
				<p class="mb-4 text-red-500">Profile is null</p>
			{/if}

			<form class="text-center flex items-center gap-2"
			method="post"
			action="?/add"
			enctype="multipart/form-data"
			use:enhance={handleSubmit}>
				<input
					type="text"
					name="username"
					on:input={ (value) => validateUsername(value.currentTarget.value) }
					bind:value={username}
					class="p-1 rounded border"
					placeholder="Username"
					required
				/>
				<div class="w-10">

					<img class="w-auto h-10" hidden={!isInputValid} src="/ic_cross.svg" alt="cross">

				</div>
				<button type="submit" class="p-1 px-4 text-white bg-pink-400 rounded-md" disabled={isInputValid}>
					{loading ? 'Loading...' : 'Add'}
				</button>
			</form>
		</div>

		<div class="mt-4">
			{#if error}
				<div class="mb-4">
					{#each Object.keys(error) as er}
						<p class="text-red-500">{er} -> {error[er].message}</p>
					{/each}
				</div>
			{/if}

			
		</div>
	</div>
</div>
