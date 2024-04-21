<script lang="ts">
    import {  onMount } from 'svelte';
    let isLoaded = false;
    let thisImage: HTMLImageElement;
    export let src: string ="";

    export let _class: string = "";
  
    onMount(() => {
      isLoaded = thisImage.complete;
        thisImage.onload = () => {
          isLoaded = true;
        };
    })

  </script>
    
  <div  class={"overflow-hidden h-fit bg-pink-200 rounded-lg w-fit "+(isLoaded ? '  ' : ' animate-pulse ')}>

    <!-- svelte-ignore a11y-img-redundant-alt -->
    <img 
        bind:this={thisImage}
        {src}
        class={" transition-all  " + (isLoaded ? '' : ' opacity-0 ') + " "+_class}
        alt="image"
      />

</div>
