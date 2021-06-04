<script>
  export let absolute = false;
</script>

<style>

  .spinner-wrapper {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .spinner {
    border: 16px solid #f3f3f3;
    border-top: 16px solid var(--bg-dark);
    border-radius: 50%;
    width: 80px;
    height: 80px;
    animation: spin 2s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }

  .absolute {
    position: absolute;
  }

  .fixed {
    position: fixed;
  }
</style>

<div class={`${absolute ? 'absolute' : 'fixed'} spinner-wrapper`}>
  <div class="spinner" />
</div>
