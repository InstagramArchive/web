<script lang="ts">
	import { formatCreatedAt } from '$lib/service/date.service';
    import type { PageData } from './$types';
    
    export let data: PageData;
    $:console.log(data)
</script>

<p>Profile Pictures:</p>

<ul>
  {#each data.profilePicture as picture (picture.id)}
    <li>

        <img class="lazy"  src="{picture.hd_path}"  >

          
      <p>Created At: {formatCreatedAt(picture.created_at)}</p>
    </li>
  {/each}
</ul>