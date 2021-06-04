<script>
  export let absolute = false;
</script>

<div class={`${absolute ? 'absolute' : 'fixed'} spinner-wrapper`}>
  <div class="spinner" />
</div>
