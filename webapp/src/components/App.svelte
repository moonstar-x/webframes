<script>
	import Topbar from './common/Topbar.svelte';
	import Sidebar from './common/Sidebar.svelte';
	import FrameHolder from './common/FrameHolder.svelte';
</script>

<style>
	main {
		height: 100%;
		width: 100%;
		text-align: center;
	}

	.content {
		position: relative;
		width: 100%;
		height: 100%;
	}
</style>

<main>
	<Topbar />
	<div class="content">
		<Sidebar />
		<FrameHolder />
	</div>
</main>