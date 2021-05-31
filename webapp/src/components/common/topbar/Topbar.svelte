<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  const handleButtonClick = () => {
    dispatch('toggleSidebar');
  }

  export let text = 'Webframes';
</script>

<style>
  div {
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

  button {
    position: absolute;
    top: 50%;
    left: 5px;
    width: calc(var(--topbar-height) - 5px);
    height: calc(var(--topbar-height) - 5px);
    transform: translateY(-50%);
  }
</style>

<div>
  <button on:click={handleButtonClick}>=</button>
  <span>{text}</span>
</div>
