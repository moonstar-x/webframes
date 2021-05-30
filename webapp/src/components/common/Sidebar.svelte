<script>
  import { sites } from '../../stores/sites';
  import SidebarItem from './SidebarItem.svelte';
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
  {#each $sites as site}
    <SidebarItem {...site} on:frameHolderUpdate />
  {/each}
</div>