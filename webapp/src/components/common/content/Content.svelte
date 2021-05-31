<script>
  import Topbar from '../topbar/Topbar.svelte';
  import Sidebar from '../sidebar/Sidebar.svelte';
	import FrameHolder from '../frameHolder/FrameHolder.svelte';

  let current = null;

  const handleFrameHolderUpdate = (e) => {
		current = e.detail;
	};
</script>

<style>
  .content {
    display: flex;
		position: relative;
		width: 100%;
		height: calc(100% - var(--topbar-height));
	}
</style>

<Topbar text={current?.url} />
<div class="content">
  <Sidebar on:frameHolderUpdate={handleFrameHolderUpdate} />
  <FrameHolder title={current?.name} url={current?.url} />
</div>
