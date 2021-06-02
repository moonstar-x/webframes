<script>
  import { onDestroy } from 'svelte';
  import SidebarItem from './SidebarItem.svelte';
  import AddSiteSidebarItem from './AddSiteSidebarItem.svelte';
  import ConfirmationModal from '../modal/ConfirmationModal.svelte';
  import { deleteSite } from '../../../networking/sites';
  import { currentSite, sites } from '../../../stores/sites';
  import { order } from '../../../stores/order';

  export let show = true;

  let orderedSites = [];
  let showDeleteModal = false;
  let contextSite = null;

  const unsubscribeOrder = order.subscribe((value) => {
    orderedSites = value.map((id) => $sites.find((site) => site.id === id));
  });

  const handleSiteDelete = (e) => {
    showDeleteModal = true;
    contextSite = e.detail;
  };

  const handleDeleteConfirm = () => {
    return deleteSite(contextSite.id)
      .then((deleted) => {
        sites.delete((site) => site.id !== deleted.id);
        order.delete((id) => id !== deleted.id);
        showDeleteModal = false;
      });
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
      <SidebarItem active={$currentSite ? site.id === $currentSite.id : false} {site} on:siteDelete={handleSiteDelete} />
    {/each}
    <AddSiteSidebarItem />
  </ul>
</nav>
<ConfirmationModal show={showDeleteModal} on:confirm={handleDeleteConfirm} on:cancel={handleDeleteCancel} />
