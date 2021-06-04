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
