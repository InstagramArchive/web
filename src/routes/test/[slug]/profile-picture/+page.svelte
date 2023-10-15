<script lang="ts">
  import { formatCreatedAt } from '$lib/service/date.service';
	import { getProfilePictureUrl } from '$lib/service/file.service';

  import type { PageData } from './$types';
    
  export let data: PageData;


 
</script>

<p>Profile Pictures:</p>

<ul>
  {#each data.profilePicture as picture (picture.id)}
    <li>
      <img class="lazy" src={getProfilePictureUrl(picture.path)} alt="Profile Picture">
      <p>Created At: {formatCreatedAt(picture.created_at)}</p>
    </li>
  {/each}
</ul>
