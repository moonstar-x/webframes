<script>
  import Modal from './Modal.svelte';
  import MultiFramingForm from '../form/MultiFramingForm.svelte';

  export let show;
</script>

<Modal {show} withClose on:close>
  <svelte:fragment slot="modal-header">
    <h3 class="m-0">Frame multiple sites</h3>
  </svelte:fragment>
  <svelte:fragment slot="modal-content">
    <MultiFramingForm />
  </svelte:fragment>
</Modal>
