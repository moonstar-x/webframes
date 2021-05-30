<script>
	import { onMount } from 'svelte';
	import Topbar from './common/Topbar.svelte';
	import Sidebar from './common/Sidebar.svelte';
	import FrameHolder from './common/FrameHolder.svelte';
	import { getSites, getOrder } from '../networking/sites';
	import { sites, sitesError } from '../stores/sites';
	import { order, orderError } from '../stores/order';

	let current = null;

	const handleFrameHolderUpdate = (e) => {
		current = e.detail;
	}

	let loading = true;
	onMount(() => {
		const sitesPromise = getSites()
			.then((fetchedSites) => {
				sites.update(fetchedSites);
			})
			.catch((error) => {
				sitesError.update(error);
			});

		const orderPromise = getOrder()
			.then((fetchedSites) => {
				order.update(fetchedSites);
			})
			.catch((error) => {
				orderError.update(error);
			})
		
		Promise.all([sitesPromise, orderPromise])
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
{:else if $sitesError || $orderError}
	<main>
		<span>Oops {$sitesError || $orderError}</span>
	</main>
{:else}
	<main>
		<Topbar text={current?.url} />
		<div class="content">
			<Sidebar on:frameHolderUpdate={handleFrameHolderUpdate} />
			<FrameHolder title={current?.name} url={current?.url} />
		</div>
	</main>
{/if}
