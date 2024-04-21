<!-- src/routes/account/+page.svelte -->
<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';

	export let data;

	let { session, supabase, profile } = data;
	$: ({ session, supabase, profile } = data);

	let profileForm: HTMLFormElement;
	let loading = false;

	let error: Object | null = null;

	fillMissingProfile();

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

	function fillMissingProfile(): void {
		// Ensure there are always two usernames in the profile
		if (profile === null) {
			profile = [{ name: '' }, { name: '' }];
		} else if (profile.length < 2) {
			profile.push({ name: '' });
		}
	}
</script>

<div class="flex flex-col items-center p-5 w-full">
	<h2 class="text-2xl">
		Login as: <p class="font-semibold text-pink-400">{data.session.user.email}</p>
	</h2>
	<div class="p-4">
		<form
			class="flex flex-col gap-2 p-4 mx-auto max-w-md bg-white rounded-lg shadow-md"
			method="post"
			action="?/update"
			use:enhance={handleSubmit}
			bind:this={profileForm}
		>
			<h2 class="text-xl font-semibold">Sponsorised profile:</h2>
			{#if profile !== null}
				{#each profile as p}
					<div class="mb-4">
						<label class="block mb-2 text-gray-700"
							>Username:
							<input
								type="text"
								name="username"
								bind:value={p.name}
								class="px-3 py-2 w-full rounded-md border focus:outline-none focus:ring focus:border-blue-300"
							/>
						</label>
						<input class="hidden" type="number" name="id" bind:value={p.id} />
					</div>
				{/each}
			{:else}
				<p class="mb-4 text-red-500">Profile is null</p>
			{/if}

			<div class="text-center">
				<button type="submit" class="p-1 px-4 text-white bg-pink-400 rounded-md" disabled={loading}
					>{loading ? 'Loading...' : 'Update'}</button
				>
			</div>
		</form>

		<div class="mt-4">
			{#if error}
				<div class="mb-4">
					{#each Object.keys(error) as er}
						<p class="text-red-500">{er} -> {error[er].message}</p>
					{/each}
				</div>
			{/if}

			<form action="/auth/logout" method="POST">
				<button class="rounded-md border-[1px] border-pink-400 px-2 p-1" type="submit"
					>Logout</button
				>
			</form>
		</div>
	</div>
</div>
