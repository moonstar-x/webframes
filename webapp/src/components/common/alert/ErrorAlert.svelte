<script>
  export let error = null;
</script>

{#if error}
  <div class="alert">
    {error}
  </div>
{/if}
