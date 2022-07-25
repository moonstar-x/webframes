<script>
  import Sidebar from '../sidebar/Sidebar.svelte';
	import FrameHolder from '../frameHolder/FrameHolder.svelte';
	import MultiFrameHolder from '../frameHolder/MultiFrameHolder.svelte';
  import { currentSite, multiFrameEnabled, openSites } from '../../../stores/sites'; 

  let showSidebar = true;
</script>

<div class="content">
  <Sidebar show={showSidebar} />
  {#if !$multiFrameEnabled}
    <FrameHolder title={$currentSite?.name} url={$currentSite?.url} sidebarVisible={showSidebar} />
  {:else}
    <MultiFrameHolder sites={$openSites} />
  {/if}
</div>
