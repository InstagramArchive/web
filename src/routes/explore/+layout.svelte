<script lang="ts">
    import type { LayoutData } from './$types';
    
    export let data: LayoutData ;
</script>
<div class="flex h-12 bg-pink-100">
    <a href="/" class="flex gap-2 items-center p-2 h-full w-fit">
        <img class="h-[90%] w-auto" src="/logo.svg" alt="logo"/>
        <h1 class="text-2xl">Instagram Archive</h1>
    </a>
    <a href="/auth" class="ml-auto">
        <img class="p-2 h-[90%] w-auto " alt="account" src="/profile.svg"/>
    </a>
</div>
<slot />