<script>
  import { currentSite } from '../../../stores/sites';

  export let site;
  export let active = false;
  export let extra = false;

  const handleClick = () => {
    currentSite.update(site);
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
    transition: border-radius 128ms, background 128ms;
  }

  li:hover {
    border-radius: 36%;
    background: var(--sidebar-item-bg);
  }

  li::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 50%;
    border-radius: 4px;
    background: var(--text-over-dark);
    transform: translate(-100%, -50%) scale(0);
    transition: transform 128ms;
  }

  li:not(.active):hover::before {
    transform: translate(-100%, -50%) scale(0.5);
  }

  .active::before {
    transform: translate(-110%, -50%) scale(0.75);
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

  h4, h6 {
    color: var(--text-over-dark);
    margin: 0;
  }

  img {
    width: inherit;
    border-radius: inherit;
  }

  .extra {
    color: var(--sidebar-item-bg);
  }

  .extra:hover {
    color: var(--text-over-dark);
  }
</style>

{#if !extra}
  <li class:active on:click={handleClick}>
    {#if site.image}
      <img alt={site.name} src={site.image} />
    {/if}
    <div class="popper">
      <h4 class="popper-text">{site.name}</h4>
      <h6 class="popper-text">{site.url}</h6>
    </div>
  </li>
{:else}
  <li class:extra on:click>
    <slot />
    <div class="popper">
      <h4 class="popper-text">{site.name}</h4>
    </div>
  </li>
{/if}