<script>
  import EmptyFrameHolder from './EmptyFrameHolder.svelte';
  import { processFrameURL } from '../../../utils';

  export let title = null;
  export let url = null;
  export let sidebarVisible = true;
  export let allowFullscreen = true;

  $: {
    if (url) {
      url = processFrameURL(url);
    }
  }
</script>

<div class="frame-holder" class:expand={!sidebarVisible}>
  {#if url}
    <iframe id="frame" {title} src={url} allowfullscreen={allowFullscreen} />
  {:else}
    <EmptyFrameHolder />
  {/if}
</div>
