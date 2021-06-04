<script>
  import Fa from 'svelte-fa/src/fa.svelte';
  import { faPlus } from '@fortawesome/free-solid-svg-icons';
  import AddSiteModal from '../modal/AddSiteModal.svelte';

  let showModal = false;

  const handleShowModal = () => showModal = true;
  const handleCloseModal = () => showModal = false;
</script>

<style>
  .button {
    margin-top: 1rem;
  }

  .button span {
    margin-left: 0.5rem;
  }
</style>

<div class="empty-frame">
  <div class="empty-frame-content">
    <div class="empty-frame-title">
      No frame to display
    </div>
    <div class="empty-frame-description">
      Click on one of the items in the sidebar on the left to launch a frame. You can also add a new site to frame by clicking on the button below.
    </div>
    <button class="button" on:click={handleShowModal}>
      <Fa icon={faPlus} />
      <span>Add a new site</span>
    </button>
  </div>
</div>
<AddSiteModal show={showModal} on:close={handleCloseModal} />
