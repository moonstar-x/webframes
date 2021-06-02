<script>
  import { createEventDispatcher } from 'svelte';
  import { fade } from 'svelte/transition';

  const dispatch = createEventDispatcher();

  const handleOutClick = () => {
    dispatch('close');
  };

  const handleItemClick = (fn) => {
    fn();
    dispatch('close');
  };

  export let options = [];
  export let show = false;
  export let posX = -1;
  export let posY = -1;

  let style;
  $: {
    style = posY < window.innerHeight * 0.8 ? `top: ${posY}px; left: ${posX}px` : `bottom: ${window.innerHeight - posY}px; left: ${posX}px`;
  };
</script>

<style>
  ul {
    display: block;
    background-color: black;
    padding: 10px 0;
    border-radius: 5px;
    box-shadow: 2px 2px 30px lightgrey;
    position: absolute;
    z-index: 100;
    margin: 0;
  }

  li {
    display: block;
    padding: 10px 30px;
    transition: 100ms;
    color: #666;
  }

  li:hover {
    background-color: #eee;
    cursor: pointer;
  }

  .out-click {
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    display: block;
  }

  .danger {
    color: red;
  }
</style>

{#if show && options.length > 1}
  <ul {style} out:fade={{ duration: 150 }}>
    {#each options as item}
      <li class:danger={item.danger} on:click={handleItemClick.bind(null, item.onClick)}>{item.text}</li>
    {/each}
  </ul>
  <div class="out-click" on:click={handleOutClick} />
{/if}

