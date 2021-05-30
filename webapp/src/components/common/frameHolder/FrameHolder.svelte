<script>
  import EmptyFrameHolder from './EmptyFrameHolder.svelte';

  export let title = null;
  export let url = null;
</script>

<style>
  iframe {
    width: calc(100% - var(--sidebar-width));
    margin-left: var(--sidebar-width);
    height: 100%;
    border: none;
  }
</style>

{#if url}
  <iframe id="frame" {title} src={url} />
{:else}
  <EmptyFrameHolder />
{/if}
