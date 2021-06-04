<script>
  import { onDestroy } from 'svelte';
  import { dndzone } from 'svelte-dnd-action';
  import SidebarItem from './SidebarItem.svelte';
  import AddSiteSidebarItem from './AddSiteSidebarItem.svelte';
  import ConfirmationModal from '../modal/ConfirmationModal.svelte';
  import EditSiteModal from '../modal/EditSiteModal.svelte';
  import { deleteSite, putOrder } from '../../../networking/sites';
  import { currentSite, sites } from '../../../stores/sites';
  import { order } from '../../../stores/order';
  import { changePageTitle } from '../../../utils';

  export let show = true;

  let orderedSites = $order.map((id) => $sites.find((site) => site.id === id));;
  let showDeleteModal = false;
  let showEditModal = false;
  let contextSite = null;

  let dragDisabled = true;

  const unsubscribeSites = sites.subscribe((value) => {
    orderedSites = $order.map((id) => value.find((site) => site.id === id)); 
  });

  const handleSiteDelete = (e) => {
    showDeleteModal = true;
    contextSite = e.detail;
  };

  const handleSiteEdit = (e) => {
    showEditModal = true;
    contextSite = e.detail;
  };

  const handleDeleteConfirm = () => {
    return deleteSite(contextSite.id)
      .then((deleted) => {
        order.delete((id) => id !== deleted.id);
        sites.delete((site) => site.id !== deleted.id);

        if ($currentSite?.id === deleted.id) {
          currentSite.update(null);
          changePageTitle();
        }

        showDeleteModal = false;
      });
  };

  const handleDeleteCancel = () => {
    showDeleteModal = false;
  };

  const handleEditClose = () => {
    showEditModal = false;
  };

  const handleDragConsider = (e) => {
    orderedSites = e.detail.items;
  };

  const handleDragFinalize = (e) => {
    orderedSites = e.detail.items;
    return putOrder(orderedSites.map((s) => s.id))
      .then((newOrder) => {
        dragDisabled = true;
        order.update(newOrder);
      });
  };

  const startDrag = () => dragDisabled = false;
  const stopDrag = () => dragDisabled = true;

  onDestroy(() => {
    unsubscribeSites();
  });
</script>

<nav class="sidebar" class:sidebar-hide={!show}>
  <div class="sidebar-wrapper">
    <ul class="sidebar-list" use:dndzone={{ items: orderedSites, dragDisabled, flipDurationMs: 200 }} on:consider={handleDragConsider} on:finalize={handleDragFinalize}>
      {#each orderedSites as site (site.id)}
        <SidebarItem
          active={$currentSite ? site.id === $currentSite.id : false}
          {site}
          on:siteDelete={handleSiteDelete}
          on:siteEdit={handleSiteEdit}
          on:mousedown={startDrag}
          on:touchstart={startDrag}
          on:mouseup={stopDrag}
          on:touchend={stopDrag}
        />
      {/each}
      <AddSiteSidebarItem />
    </ul>
  </div>
</nav>
<ConfirmationModal show={showDeleteModal} on:confirm={handleDeleteConfirm} on:cancel={handleDeleteCancel} />
<EditSiteModal show={showEditModal} site={contextSite} on:close={handleEditClose} />
