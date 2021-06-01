<script>
  export let error = null;
</script>

<style>
  div {
    
  }
</style>

{#if error}
  <div>
    {error}
  </div>
{/if}