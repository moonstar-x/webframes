<script>
  import { createEventDispatcher } from 'svelte';
  import { currentSite } from '../../../stores/sites';
  import { contextMenuData } from '../../../stores/contextMenu';

  const dispatch = createEventDispatcher();

  export let site;
  export let active = false;
  export let extra = false;

  let popperX = -1;
  let popperY = -1;

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
  };

  const handleItemHover = (e) => {
    const pos = e.toElement.getBoundingClientRect();
    popperX = pos.x + pos.width / 2 + 50;
    popperY = pos.y + pos.height / 2;
  };
</script>

<style>
  li {
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    width: var(--sidebar-icon-size);
    height: var(--sidebar-icon-size);
    border-radius: 50%;
    background: var(--bg-dark-accent);
    cursor: pointer;
    text-decoration: none;
    transition: border-radius 128ms, background 128ms;
    outline: none;
  }

  li:hover {
    border-radius: 36%;
    background: var(--sidebar-item-bg);
  }

  li::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 50%;
    border-radius: 4px;
    background: var(--text-over-dark);
    transform: translate(-100%, -50%) scale(0);
    transition: transform 128ms;
  }

  li:not(.active):hover::before {
    transform: translate(-100%, -50%) scale(0.5);
  }

  .active::before {
    transform: translate(-110%, -50%) scale(0.75);
  }

  li:hover .popper {
    opacity: 1;
    transform: translateY(-50%) scale(1);
  }

  .popper {
    position: fixed;
    width: max-content;
    top: 20px;
    left: 100px;
    border-radius: 4px;
    padding: 0.68rem 1rem;
    opacity: 0;
    background: var(--bg-black);
    pointer-events: none;
    transform: translateY(-50%) scale(0.98);
    transform-origin: left;
    transform: opacity 64ms, transform-origin 128ms;
    z-index: 1;
  }

  .popper::before {
    content: '';
    position: absolute;
    height: 24px;
    width: 24px;
    top: 50%;
    left: -2px;
    z-index: -1;
    background: var(--bg-black);
    transform: translateY(-50%) rotate(45deg);
  }

  h4, h6 {
    color: var(--text-over-dark);
    margin: 0;
  }

  img {
    width: inherit;
    border-radius: inherit;
  }

  .extra {
    color: var(--sidebar-item-bg);
  }

  .extra:hover {
    color: var(--text-over-dark);
  }

  :global(#dnd-action-dragged-el .popper, li#dnd-action-dragged-el::before) {
    display: none !important;
  }
</style>

{#if !extra}
  <li class:active on:click={handleClick} on:contextmenu={handleContextMenuOpen} on:mouseover={handleItemHover} on:mousedown on:touchstart on:mouseup on:touchend>
    {#if site.image}
      <img alt={site.name} src={site.image} />
    {/if}
    <div class="popper" style="top: {popperY}px; left: {popperX}px">
      <h4 class="popper-text">{site.name}</h4>
      <h6 class="popper-text">{site.url}</h6>
    </div>
  </li>
{:else}
  <li class:extra on:click on:mouseover={handleItemHover}>
    <slot />
    <div class="popper" style="top: {popperY}px; left: {popperX}px">
      <h4 class="popper-text">{site.name}</h4>
    </div>
  </li>
{/if}