<script lang="ts">
    import { page } from '$app/stores';
</script>

<h1>{$page.status}: {$page.error?.message}</h1>
<p>Instagram Profile not found</p>
<a href="/test">go back</a>