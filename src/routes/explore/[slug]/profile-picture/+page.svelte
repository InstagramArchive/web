<script lang="ts">
  import { formatCreatedAt } from '$lib/service/date.service';

  import type { PageData } from './$types';
    
  export let data: PageData;


 
</script>

<div class="flex flex-col m-2">
<h1 class="text-2xl ">Profile Pictures:</h1>

<ul class="flex  flex-wrap m-5 gap-5">
  {#each data.profilePicture as picture (picture.id)}
    <li class="w-fit h-fit">
      <img class="lazy max-h-[85dvh] max-w-[85vw]" src={picture.path} alt="Profile Picture">
      <p>Created At: {formatCreatedAt(picture.created_at)}</p>
    </li>
  {/each}
</ul>
</div>