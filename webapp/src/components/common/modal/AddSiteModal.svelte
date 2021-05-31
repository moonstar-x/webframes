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

<style>
  h3 {
    margin: 0;
  }
</style>

<Modal {show} withClose on:close>
  <svelte:fragment slot="modal-header">
    <h3>Add a new site</h3>
  </svelte:fragment>
  <svelte:fragment slot="modal-content">
    <AddSiteForm on:success={handleCloseModal} />
  </svelte:fragment>
  <svelte:fragment slot="modal-footer">
    <button on:click={handleCloseModal}>CLOSE</button>
  </svelte:fragment>
</Modal>
