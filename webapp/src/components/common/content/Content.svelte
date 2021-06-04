<script>
  import Sidebar from '../sidebar/Sidebar.svelte';
	import FrameHolder from '../frameHolder/FrameHolder.svelte';
  import { currentSite } from '../../../stores/sites'; 

  let showSidebar = true;
</script>

<div class="content">
  <Sidebar show={showSidebar} />
  <FrameHolder title={$currentSite?.name} url={$currentSite?.url} sidebarVisible={showSidebar} />
</div>
