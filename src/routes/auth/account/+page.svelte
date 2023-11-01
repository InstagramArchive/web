<!-- src/routes/account/+page.svelte -->
<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms'
  
	export let data
	export let form
  
	let { session, supabase, profile } = data
	$: ({ session, supabase, profile } = data)
  
	let profileForm: HTMLFormElement
	let loading = false
  
	// Ensure there are always two usernames in the profile
	if (profile === null) {
	  profile = [{ name: "" }, { name: "" }];
	} else if (profile.length < 2) {
	  profile.push({ name: "" });
	}
  
	const handleSubmit: SubmitFunction = () => {
	  loading = true
	  return async () => {
		loading = false
	  }
	}
  
	const handleSignOut: SubmitFunction = () => {
	  loading = true
	  return async ({ update }) => {
		loading = false
		update()
	  }
	}
  
  </script>
  
  <div class="p-4">
	<form
	  class="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg"
	  method="post"
	  action="?/update"
	  use:enhance={handleSubmit}
	  bind:this={profileForm}
	>
	  {#if profile !== null}
		{#each profile as p}
		  <label class="block mb-2">Username:
			<input type="text" name="username" bind:value={p.name} class="w-full border rounded-md px-3 py-2" />
		  </label>
		  <input class="hidden" type="number" name="id" bind:value={p.id}/>
		{/each}
	  {:else}
		<p class="mb-4">Profile is null</p>
	  {/if}
  
	  <div class="text-center">
		<input
		  type="submit"
		  class="btn-primary"
		  value={loading ? 'Loading...' : 'Update'}
		  disabled={loading}
		/>
	  </div>
	</form>
  
	<form action="/auth/logout" method="POST" class="mt-4">
	  <button class="btn-secondary" type="submit">Logout</button>
	</form>
  </div>