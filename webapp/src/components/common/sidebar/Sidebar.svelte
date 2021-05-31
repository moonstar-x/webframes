<script>
  import SidebarItem from './SidebarItem.svelte';
  import { currentSite, sites } from '../../../stores/sites';
  import { order } from '../../../stores/order';

  const orderedSites = $order.map((id) => $sites.find((site) => site.id === id));

  export let show = true;
</script>

<style>
  nav {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: var(--sidebar-icon-size);
    padding: var(--sidebar-padding);
    background-color: var(--bg-dark);
    transition: transform var(--hide-anim-duration) ease-in-out;
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    list-style: none;
    margin: 0;
    padding: 0;
    min-height: 100%;
    width: inherit;
  }

  .sidebar-hide {
    transform: translateX(-100%);
  }
</style>

<nav class:sidebar-hide={!show}>
  <ul>
    {#each orderedSites as site (site.id)}
      <SidebarItem active={$currentSite ? site.id === $currentSite.id : false} {site} />
    {/each}
  </ul>
</nav>