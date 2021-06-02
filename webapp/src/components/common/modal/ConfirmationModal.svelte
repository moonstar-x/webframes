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
  .button {
    padding: 10px;
    background: var(--bg-dark);
    color: var(--text-over-dark);
    border-radius: 5px;
    text-align: center;
    width: inherit;
    margin-bottom: 1rem;
    cursor: pointer;
    border: 2px solid var(--bg-dark);
    margin: 0;
    font-size: 1em;
    flex: 1;
  }

  .button:hover, .button:focus, .button:active {
    background: var(--bg-dark-accent);
    border: 2px solid var(--bg-dark);
  }

  .buttons-container {
    display: flex;
    gap: 1rem;
  }

  h3 {
    margin: 0;
  }
</style>

<Modal {show} withClose={false}>
  <svelte:fragment slot="modal-header">
    <h3>Are you sure?</h3>
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
