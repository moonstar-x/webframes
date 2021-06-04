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

{#if show && options.length > 1}
  <ul class="context-menu" {style} out:fade={{ duration: 150 }}>
    {#each options as item}
      <li class="context-menu-item" class:danger={item.danger} on:click={handleItemClick.bind(null, item.onClick)}>{item.text}</li>
    {/each}
  </ul>
  <div class="out-click" on:click={handleOutClick} />
{/if}
