<script>
  import ErrorAlert from '../alert/ErrorAlert.svelte';

  export let error = null;
</script> 

{#if error}
  <div class="error-container">
    <span class="error-emoji" role="img" aria-label="eyes">
      👀
    </span>
    <div class="error-header">
      Something happened when trying to communicate with the sites API.
    </div>
    <div class="error-subheader">
      Make sure that the sites API is indeed running and that you're consuming the correct URL. The request error can be found right below.
    </div>
    <ErrorAlert error={error} />
  </div>
{/if}
