<script>
  import { onDestroy } from 'svelte';
  import SidebarItem from './SidebarItem.svelte';
  import AddSiteSidebarItem from './AddSiteSidebarItem.svelte';
  import ConfirmationModal from '../modal/ConfirmationModal.svelte';
  import { currentSite, sites } from '../../../stores/sites';
  import { order } from '../../../stores/order';
  import { contextMenuData } from '../../../stores/contextMenu';

  export let show = true;

  let showDeleteModal = false;
  let orderedSites = [];

  const contextMenuItems = [
    { text: 'Edit site', danger: false, onClick: () => console.log('EDIT') },
    { text: 'Delete site', danger: true, onClick: () => showDeleteModal = true }
  ];

  const unsubscribeOrder = order.subscribe((value) => {
    orderedSites = value.map((id) => $sites.find((site) => site.id === id));
  });

  const handleContextMenuOpen = (e) => {
    e.preventDefault();

    contextMenuData.setOptions(contextMenuItems);
    contextMenuData.setCoords(e.clientX, e.clientY);
    contextMenuData.setVisibility(true);
  };

  const handleDeleteConfirm = () => {
    console.log('de')
    showDeleteModal = false;
  };

  const handleDeleteCancel = () => {
    showDeleteModal = false;
  };

  onDestroy(() => {
    unsubscribeOrder();
  });
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
    overflow-y: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  nav::-webkit-scrollbar {
  display: none;
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
      <SidebarItem active={$currentSite ? site.id === $currentSite.id : false} {site} on:contextmenu={handleContextMenuOpen} />
    {/each}
    <AddSiteSidebarItem />
  </ul>
</nav>
<ConfirmationModal show={showDeleteModal} on:confirm={handleDeleteConfirm} on:cancel={handleDeleteCancel} />
