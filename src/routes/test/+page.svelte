<script lang="ts">
  import { onMount } from "svelte";
  import type { InstagramProfileDTO } from '$lib/dto/instagramProfile.dto';
  import { supabase } from '$lib/supabaseClient';

  let instagramProfiles: InstagramProfileDTO[] = [];

  async function loadData() {
    const { data } = await supabase.from("instagram_profile").select('id,created_at,name,views');
    instagramProfiles = data ?? [];
  }

  onMount(loadData);
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

