<script lang="ts">
	import { supabase } from '$lib/supabaseClient';



export async function load() {
    const { data } = await supabase.from("instagram_profile").select('*');
    return {
      countries: data ?? [],
    };
load()
.then(res => {
    console.log(res)
})




    

</script>


