<script>
  import { createEventDispatcher } from 'svelte';
  import TopbarToggle from '../button/TopbarToggle.svelte';

  const dispatch = createEventDispatcher();

  const handleButtonClick = () => {
    dispatch('toggleSidebar');
  };

  export let text = 'Webframes';
  export let showSidebar;
</script>

<style>
  .topbar {
    position: relative;
    width: 100%;
    height: var(--topbar-height);
    background-color: var(--bg-dark);
    color: var(--text-over-dark);
  }

  span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 1.2rem;
  }
</style>

<div class="topbar">
  <TopbarToggle {showSidebar} on:click={handleButtonClick} />
  <span>{text}</span>
</div>
