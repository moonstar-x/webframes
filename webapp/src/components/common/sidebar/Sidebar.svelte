<script>
  import SidebarItem from './SidebarItem.svelte';
  import { sites } from '../../../stores/sites';
  import { order } from '../../../stores/order';

  const orderedSites = $order.map((id) => $sites.find((site) => site.id === id));
</script>

<style>
  .sidebar {
    position: absolute;
    left: 0;
    top: 0;
    width: var(--sidebar-width);
    height: 100%;

    background-color: var(--bg-dark);
  }
</style>

<div class="sidebar">
  {#each orderedSites as site (site.id)}
    <SidebarItem name={site.name} url={site.url} image={site.image} on:frameHolderUpdate />
  {/each}
</div>
