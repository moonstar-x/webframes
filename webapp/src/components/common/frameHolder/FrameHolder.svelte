<script>
  import EmptyFrameHolder from './EmptyFrameHolder.svelte';

  export let title = null;
  export let url = null;
  export let sidebarVisible = true;
</script>

<style>
  div {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: calc(var(--sidebar-icon-size) + calc(2 * var(--sidebar-padding)));
    transition: left var(--hide-anim-duration) ease-in-out;
  }

  iframe {
    position: absolute;
    width: 100%;
    height: 100%;
    border: none;
  }

  .expand {
    left: 0;
  }
</style>

<div class:expand={!sidebarVisible}>
  {#if url}
    <iframe id="frame" {title} src={url} />
  {:else}
    <EmptyFrameHolder />
  {/if}
</div>
