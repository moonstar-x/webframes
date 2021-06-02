<script>
  import { createEventDispatcher } from 'svelte';
  import Modal from './Modal.svelte';
  import EditSiteForm from '../form/EditSiteForm.svelte';

  const dispatch = createEventDispatcher();

  const handleCloseModal = () => {
    dispatch('close');
  };

  export let show;
  export let site;
</script>

<style>
  h3 {
    margin: 0;
  }
</style>

<Modal {show} withClose on:close>
  <svelte:fragment slot="modal-header">
    <h3>Editing {site.name}</h3>
  </svelte:fragment>
  <svelte:fragment slot="modal-content">
    <EditSiteForm {site} on:success={handleCloseModal} />
  </svelte:fragment>
</Modal>
