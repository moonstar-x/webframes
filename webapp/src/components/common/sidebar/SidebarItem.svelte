<script>
  import { createEventDispatcher } from 'svelte';
  import { currentSite } from '../../../stores/sites';
  import { contextMenuData } from '../../../stores/contextMenu';
  import { changePageTitle } from '../../../utils';

  const dispatch = createEventDispatcher();

  export let site;
  export let active = false;
  export let extra = false;

  const contextMenuItems = [
    { text: 'Edit site', danger: false, onClick: () => dispatch('siteEdit', site) },
    { text: 'Delete site', danger: true, onClick: () => dispatch('siteDelete', site) }
  ];

  const handleContextMenuOpen = (e) => {
    e.preventDefault();

    contextMenuData.setOptions(contextMenuItems);
    contextMenuData.setCoords(e.clientX, e.clientY);
    contextMenuData.setVisibility(true);
  };

  const handleClick = () => {
    currentSite.update(site);
    changePageTitle(site.name);
  };
</script>

<style>
  :global(#dnd-action-dragged-el .popper, .sidebar-item#dnd-action-dragged-el::before) {
    display: none !important;
  }
</style>

{#if !extra}
  <li class="sidebar-item" class:active on:click={handleClick} on:contextmenu={handleContextMenuOpen} on:mousedown on:touchstart on:mouseup on:touchend>
    {#if site.image}
      <img alt={site.name} src={site.image} />
    {/if}
    <div class="popper">
      <h4 class="popper-text">{site.name}</h4>
      <h6 class="popper-text">{site.url}</h6>
    </div>
  </li>
{:else}
  <li class:extra on:click>
    <slot />
    <div class="popper">
      <h4 class="popper-text">{site.name}</h4>
    </div>
  </li>
{/if}