<script>
  import ErrorAlert from '../alert/ErrorAlert.svelte';

  export let error = null;
</script> 

<style>
  .error-container {
    text-align: center;
    max-width: 50%;
    margin: 0 auto;
    padding: 5rem 0;
  }

  @media only screen and (max-width: 768px) {
    .error-container {
      max-width: 90%;
    }

    .error-subheader {
      text-align: justify;
    }
  }
  
  .error-emoji {
    font-size: 10em;
    display: block;
  }
  
  .error-header {
    font-size: 1.5em;
    margin-bottom: 0.5rem;
  }
  
  .error-subheader {
    margin: 0 auto;
    max-width: 70%;
    font-size: 1em;
    margin-bottom: 2rem;
  }
</style>

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
