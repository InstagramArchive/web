<script lang="ts">
		import type { InstagramProfileDTO } from "$lib/dto/instagramProfile/instagramProfile.dto";
	import { formatDateDifference } from "$lib/service/date.service";

    export let profile: InstagramProfileDTO;
</script>
  

  <div class="p-5 m-2 w-full bg-purple-50 rounded-md transition-all shadow-pink-900 hover:shadow-xl">
    <p class="text-xl font-semibold"> {profile.name}</p>

    <div class="flex gap-2 w-full">
      <p><strong>Since </strong> {formatDateDifference(new Date(profile.created_at))}</p>
      
      <p><strong>Views:</strong> {profile.views}</p>
      <p><strong>Sponsor:</strong> {profile.sponsor ? 'Yes' : 'No'}</p>
    </div>
  </div>
  