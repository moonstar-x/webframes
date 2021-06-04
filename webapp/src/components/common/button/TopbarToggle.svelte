<script>
  import Fa from 'svelte-fa/src/fa.svelte';
  import { faChevronCircleLeft, faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';

  export let showSidebar;
</script>

<style>
  button {
    position: absolute;
    top: 50%;
    left: 5px;
    width: calc(var(--topbar-height) - 5px);
    height: calc(var(--topbar-height) - 5px);
    transform: translateY(-50%);
  }

  .button {
    padding: 10px;
    background: #a2a2a2;
    color: #fff;
    border-radius: 5px;
    text-align: center;
    margin-bottom: 1rem;
    cursor: pointer;
    border: 2px solid #d3d3d3;
    margin: 0;
    font-size: 1em;
  }
</style>

<button class="button" on:click>
  <Fa icon={showSidebar ? faChevronCircleLeft : faChevronCircleRight} />
</button>
