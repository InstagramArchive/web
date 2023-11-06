<script lang="ts">
    import {  onMount } from 'svelte';
    let isLoaded = false;
    let thisImage: HTMLImageElement;
  
    onMount(() => {
      isLoaded = thisImage.complete;
        thisImage.onload = () => {
          isLoaded = true;
        };
    })

  </script>
  
  <div>
   
      <img 
        bind:this={thisImage}
        src="https://images.pling.com/img/00/00/33/91/33/1370727/9d31bafb8d33869275b11364e9709074de4a.png"
        class={" transition-all " + (isLoaded ? '' : ' hidden ')}
        alt="image"
      />
 
  </div>
  
