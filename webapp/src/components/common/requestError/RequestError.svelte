<script>
  export let error = null;
</script> 

{#if error}
  <span>Oops {error}</span>
{/if}
