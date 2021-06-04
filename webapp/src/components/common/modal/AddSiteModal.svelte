<script>
  import { createEventDispatcher } from 'svelte';
  import Modal from './Modal.svelte';
  import AddSiteForm from '../form/AddSiteForm.svelte';

  const dispatch = createEventDispatcher();

  const handleCloseModal = () => {
    dispatch('close');
  };

  export let show;
</script>

<Modal {show} withClose on:close>
  <svelte:fragment slot="modal-header">
    <h3 class="m-0">Add a new site</h3>
  </svelte:fragment>
  <svelte:fragment slot="modal-content">
    <AddSiteForm on:success={handleCloseModal} />
  </svelte:fragment>
</Modal>
