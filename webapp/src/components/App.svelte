<script>
	import { onMount } from 'svelte';
	import LoadingSpinner from './common/loadingSpinner/LoadingSpinner.svelte';
	import RequestError from './common/requestError/RequestError.svelte';
	import Content from './common/content/Content.svelte';
	import { getSites, getOrder } from '../networking/sites';
	import { sites, sitesError } from '../stores/sites';
	import { order, orderError } from '../stores/order';

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
		
		return Promise.all([sitesPromise, orderPromise])
			.then(() => {
				loading = false;
			});
	});
</script>

<style>
	main {
		height: 100%;
		width: 100%;
	}
</style>

<main>
	{#if loading}
		<LoadingSpinner />
	{:else if $sitesError || $orderError}
		<RequestError error={$sitesError || $orderError} />
	{:else}
		<Content />
	{/if}
</main>
