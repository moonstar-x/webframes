<script>
  import SidebarItem from './SidebarItem.svelte';
  import { sites } from '../../../stores/sites';
  import { order } from '../../../stores/order';

  const orderedSites = $order.map((id) => $sites.find((site) => site.id === id));
</script>

<style>
  nav {
    height: 100%;
    width: fit-content;
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    list-style: none;
    margin: 0;
    min-height: calc(100% - 2rem); /* - 2x padding */
    padding: 1rem;
    background-color: var(--bg-dark);
  }
</style>

<nav>
  <ul>
    {#each orderedSites as site (site.id)}
      <SidebarItem name={site.name} url={site.url} image={site.image} on:frameHolderUpdate />
    {/each}
  </ul>
</nav>
