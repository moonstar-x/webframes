<script>
  import Fa from 'svelte-fa/src/fa.svelte';
  import { faPlus } from '@fortawesome/free-solid-svg-icons';
  import AddSiteModal from '../modal/AddSiteModal.svelte';

  let showModal = false;

  const handleClick = () => {
    showModal = true;
  };

  const handleModalClose = () => {
    showModal = false;
  }
</script>

<li class="sidebar-item add-site-item" on:click={handleClick}>
  <Fa icon={faPlus} />
  <div class="popper">
    <h4 class="popper-text">
      Add New Site
    </h4>
  </div>
</li>
<AddSiteModal show={showModal} on:close={handleModalClose} />
