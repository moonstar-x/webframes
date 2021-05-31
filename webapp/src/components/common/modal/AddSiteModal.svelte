<script>
  import { createEventDispatcher } from 'svelte';
  import Modal from './Modal.svelte';

  const dispatch = createEventDispatcher();

  const handleCloseButtonClick = () => {
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
    
  </svelte:fragment>
  <svelte:fragment slot="modal-footer">
    <button on:click={handleCloseButtonClick}>CLOSE</button>
  </svelte:fragment>
</Modal>
