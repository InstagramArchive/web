<script lang="ts">
	import { onMount } from "svelte";


    export let src: string = "";
    export let alt: string = "";
    export let _class: string = "";

    let isLoaded = false;

    onMount(()=> {
        if (document.querySelector("img")?.complete){
            isLoaded = true;
        } 


    })


function loaded(){
    isLoaded = true;
}

</script>
<div id="test" class="overflow-hidden bg-pink-50 rounded-lg">
    <img on:load={loaded} src={src} alt={alt} class={_class+" "+(isLoaded?"":"opacity-0 ")}/>

</div>

