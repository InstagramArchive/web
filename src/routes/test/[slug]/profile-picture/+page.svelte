<script lang="ts">
    import type { PageData } from './$types';
    
    export let data: PageData;
    $:console.log(data)
</script>

<p>
    {data}
</p>
<p>profile picture</p>
