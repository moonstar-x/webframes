<script>
  export let error = null;
</script>

{#if error}
  <div class="alert danger">
    {error}
  </div>
{/if}
