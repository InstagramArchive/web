<script lang="ts">
    import type { PageData } from './$types';
    
    export let data: PageData;
</script>

{#if data.session}

<p>session vliasd</p>
<p>{data.session.user.email}</p>

<form action="/auth/logout" method="POST">
<button type="submit">logout</button></form>
{:else}

    <p>no sseiosn</p>

{/if}