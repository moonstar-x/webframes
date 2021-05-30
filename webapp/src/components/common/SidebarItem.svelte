<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let name;
  export let url;
  export let image;

  const handleClick = () => {
    dispatch('frameHolderUpdate', { name, url });
  }
</script>

<style>
  .sidebar-item {
    padding: 10px;
    color: var(--text-over-dark);
    max-width: 100%;
  }

  img {
    width: 100%;
  }
</style>

<div class="sidebar-item" on:click={handleClick}>
  {#if image}
    <img alt={name} src={image} />
  {/if}
  <span>{name}</span>
</div>