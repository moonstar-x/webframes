<script>
  import EmptyFrameHolder from './EmptyFrameHolder.svelte';
  import { processFrameURL } from '../../../utils';

  export let sites = [];

  export let sidebarVisible = true;
  export let allowFullscreen = true;

  let processedSites;
  $: {
    processedSites = sites.map((site) => {
      return {
        ...site,
        url: processFrameURL(site.url || '')
      };
    });
  };
</script>

<div class="frame-holder" class:expand={!sidebarVisible}>
  <div class="multi-frame-parent" data-size={sites.length}>
    {#each processedSites as { name, url, key }, idx (key)}
      <div class="multi-frame-child" data-index={idx}>
        {#if url}
          <iframe id="frame" title={name} src={url} allowfullscreen={allowFullscreen} />
        {:else}
          <EmptyFrameHolder />
        {/if}
      </div>
    {/each}
  </div>
</div>