<script lang="ts">
    import {  onMount } from 'svelte';
    let isLoaded = false;
    let thisImage: HTMLImageElement;
    export let src: string ="";
  
    onMount(() => {
      isLoaded = thisImage.complete;
        thisImage.onload = () => {
          isLoaded = true;
        };
    })

  </script>
    
  <div  class={"overflow-hidden h-full bg-pink-200 rounded-lg w-fit "+(isLoaded ? '  ' : ' animate-pulse ')}>

    <img 
        bind:this={thisImage}
        {src}
        class={" transition-all h-full w-auto " + (isLoaded ? '' : ' opacity-0 ')}
        alt="image"
      />

</div>
