<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  const handleClose = () => {
    dispatch('close');
  };

  export let show;
  export let id = null;
  export let withClose = true;
</script>

<style>
  .modal {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    z-index: 100;
    background-color: rgba(0, 0, 0, 0.4);
  }

  .modal-content {
    min-height: 10vh;
    max-height: 70vh;
    overflow-y: scroll;
    background-color: var(--bg-light-gray);
    margin: 20vh auto 10vh auto;
    padding: 0;
    border: 1px solid #888;
    border-radius: 10px;
    width: 80%;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }

  .modal-header, .modal-footer {
    padding: 1rem;
    background-color: #333;
    color: var(--text-over-dark);
  }

  .modal-header {
    border-radius: 10px 10px 0 0;
    border-bottom: 1px solid #888;
  }

  .modal-footer {
    border-radius: 0 0 10px 10px;
    border-top: 1px solid #888;
  }

  .modal-body {
    padding: 1rem;
  }

  .close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
    line-height: 0.7;
  }

  .close:hover, .close:focus {
    color: #fff;
    text-decoration: none;
    cursor: pointer;
  }
</style>

{#if show}
  <div {id} class="modal">
    <div class="modal-content">
      <div class="modal-header">
        {#if withClose}
          <span class="close" on:click={handleClose}>&times;</span>
        {/if}
        <slot name="modal-header" />
      </div>
      {#if $$slots['modal-content']}
        <div class="modal-body">
          <slot name="modal-content" />
        </div>
      {/if}
      {#if $$slots['modal-footer']}
        <div class="modal-footer">
          <slot name="modal-footer" />
        </div>
      {/if}
    </div>
  </div>
{/if}
