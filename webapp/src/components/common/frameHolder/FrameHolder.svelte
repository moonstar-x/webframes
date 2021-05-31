<script>
  import EmptyFrameHolder from './EmptyFrameHolder.svelte';

  export let title = null;
  export let url = null;
</script>

<style>
  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
</style>

{#if url}
  <iframe id="frame" {title} src={url} />
{:else}
  <EmptyFrameHolder />
{/if}
