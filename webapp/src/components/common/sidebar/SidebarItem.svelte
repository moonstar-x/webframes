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
  li {
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    width: var(--sidebar-icon-size);
    height: var(--sidebar-icon-size);
    border-radius: 50%;
    background: var(--bg-dark-accent);
    cursor: pointer;
    text-decoration: none;
    transition: border-radius 128ms;
  }

  li:hover {
    border-radius: 36%;
  }

  li::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 50%;
    border-radius: 4px;
    background: var(--text-over-dark);
    transform: translate(-150%, -50%) scale(0);
    transition: transform 128ms;
  }

  li:hover::before {
    transform: translate(-150%, -50%) scale(0.5);
  }

  li:hover .popper {
    opacity: 1;
    transform: translateY(-50%) scale(1);
  }

  .popper {
    position: absolute;
    width: max-content;
    top: 50%;
    left: 155%;
    border-radius: 4px;
    padding: 0.68rem 1rem;
    opacity: 0;
    background: var(--bg-black);
    pointer-events: none;
    transform: translateY(-50%) scale(0.98);
    transform-origin: left;
    transform: opacity 64ms, transform-origin 128ms;
  }

  .popper::before {
    content: '';
    position: absolute;
    height: 24px;
    width: 24px;
    top: 50%;
    left: -2px;
    z-index: -1;
    background: var(--bg-black);
    transform: translateY(-50%) rotate(45deg);
  }

  .popper-text {
    color: var(--text-over-dark);
    margin: 0;
  }

  .site-icon {
    width: inherit;
    border-radius: inherit;
  }
</style>

<li on:click={handleClick}>
  {#if image}
    <img class="site-icon" alt={name} src={image} />
  {/if}
  <div class="popper">
    <h4 class="popper-text">{name}</h4>
    <h6 class="popper-text">{url}</h6>
  </div>
</li>
