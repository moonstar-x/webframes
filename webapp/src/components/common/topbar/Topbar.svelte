<script>
  export let text = 'Webframes';
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
    transform: translateX(-50%) translateY(-50%);

    font-size: 1.2em;
  }
</style>

<div class="topbar">
  <span>{text}</span>
</div>
