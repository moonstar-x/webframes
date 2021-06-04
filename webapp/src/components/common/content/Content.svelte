<script>
  import Topbar from '../topbar/Topbar.svelte';
  import Sidebar from '../sidebar/Sidebar.svelte';
	import FrameHolder from '../frameHolder/FrameHolder.svelte';
  import { currentSite } from '../../../stores/sites'; 

  let showSidebar = true;

  const handleToggleSidebar = () => {
    showSidebar = !showSidebar;
  }
</script>

<style>
  .content {
		position: relative;
		width: 100%;
		height: calc(100vh - var(--topbar-height));
	}
</style>

<Topbar text={$currentSite?.url || 'Webframes'} on:toggleSidebar={handleToggleSidebar} {showSidebar} />
<div class="content">
  <Sidebar show={showSidebar} />
  <FrameHolder title={$currentSite?.name} url={$currentSite?.url} sidebarVisible={showSidebar} />
</div>
