<script>
  import { createEventDispatcher } from 'svelte';
  import Modal from './Modal.svelte';

  const dispatch = createEventDispatcher();

  const handleCloseModal = () => {
    dispatch('close');
  };

  export let show;
</script>

<Modal {show} withClose on:close>
  <svelte:fragment slot="modal-header">
    <h3 class="m-0">Frame multiple sites</h3>
  </svelte:fragment>
  <svelte:fragment slot="modal-content">
    hi
  </svelte:fragment>
</Modal>
