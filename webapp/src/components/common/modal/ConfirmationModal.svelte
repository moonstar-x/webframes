<script>
  import { createEventDispatcher } from 'svelte';
  import Modal from './Modal.svelte';

  const dispatch = createEventDispatcher();

  const handleButtonClick = (name) => {
    dispatch(name);
  };

  export let show;
</script>

<style>
  .buttons-container {
    display: flex;
    gap: 1rem;
  }

  .buttons-container .button {
    flex: 1;
  }
</style>

<Modal {show} withClose={false}>
  <svelte:fragment slot="modal-header">
    <h3 class="m-0">Are you sure?</h3>
  </svelte:fragment>
  <div class="buttons-container" slot="modal-content">
    <button class="button" on:click={handleButtonClick.bind(null, 'confirm')}>
      Confirm
    </button>
    <button class="button" on:click={handleButtonClick.bind(null, 'cancel')}>
      Cancel
    </button>
  </div>
</Modal>
