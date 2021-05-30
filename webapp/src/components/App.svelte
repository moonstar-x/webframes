<script>
	import { onMount } from 'svelte';
	import Topbar from './common/Topbar.svelte';
	import Sidebar from './common/Sidebar.svelte';
	import FrameHolder from './common/FrameHolder.svelte';
	import { getSites } from '../networking/sites';
	import { sites, sitesError } from '../stores/sites';

	let loading = true;

	onMount(() => {
		return getSites()
			.then((fetchedSites) => {
				sites.update(fetchedSites);
			})
			.catch((error) => {
				sitesError.update(error);
			})
			.then(() => {
				loading = false;
			});
	});
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
		height: calc(100% - var(--topbar-height));
	}
</style>

{#if loading}
	<main>
		<span>LOADING</span>
	</main>
{:else if $sitesError}
	<main>
		<span>Oops {$sitesError}</span>
	</main>
{:else}
	<main>
		<Topbar />
		<div class="content">
			<Sidebar />
			<FrameHolder />
		</div>
	</main>
{/if}
