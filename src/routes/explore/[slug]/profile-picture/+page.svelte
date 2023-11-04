<script lang="ts">
  import { formatCreatedAt } from '$lib/service/date.service';

  import type { PageData } from './$types';
    
  export let data: PageData;


 
</script>

<p>Profile Pictures:</p>

<ul>
  {#each data.profilePicture as picture (picture.id)}
    <li>
      <img class="lazy" src={picture.path} alt="Profile Picture">
      <p>Created At: {formatCreatedAt(picture.created_at)}</p>
    </li>
  {/each}
</ul>
