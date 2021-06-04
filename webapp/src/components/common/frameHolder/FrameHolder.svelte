<script>
  import EmptyFrameHolder from './EmptyFrameHolder.svelte';

  export let title = null;
  export let url = null;
  export let sidebarVisible = true;
</script>

<div class="frame-holder" class:expand={!sidebarVisible}>
  {#if url}
    <iframe id="frame" {title} src={url} />
  {:else}
    <EmptyFrameHolder />
  {/if}
</div>
