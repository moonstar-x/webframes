<script>
  import Topbar from '../topbar/Topbar.svelte';
  import Sidebar from '../sidebar/Sidebar.svelte';
	import FrameHolder from '../frameHolder/FrameHolder.svelte';

  let current = null;
  let showSidebar = true;

  const handleFrameHolderUpdate = (e) => {
		current = e.detail;
	};

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

<Topbar text={current?.url} on:toggleSidebar={handleToggleSidebar} />
<div class="content">
  <Sidebar on:frameHolderUpdate={handleFrameHolderUpdate} show={showSidebar} />
  <FrameHolder title={current?.name} url={current?.url} sidebarVisible={showSidebar} />
</div>
