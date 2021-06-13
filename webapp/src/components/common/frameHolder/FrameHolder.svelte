<script>
  import EmptyFrameHolder from './EmptyFrameHolder.svelte';

  export let title = null;
  export let url = null;
  export let sidebarVisible = true;
  
  export let allowFullscreen = true;
</script>

<div class="frame-holder" class:expand={!sidebarVisible}>
  {#if url}
    <iframe id="frame" {title} src={url} allowfullscreen={allowFullscreen} />
  {:else}
    <EmptyFrameHolder />
  {/if}
</div>
