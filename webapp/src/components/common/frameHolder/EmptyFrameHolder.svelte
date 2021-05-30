<style>
  .empty-frame {
    height: 100%;
    width: calc(100% - var(--sidebar-width));
    margin-left: var(--sidebar-width);
    position: relative;
  }

  .empty-frame-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
  }
</style>

<div class="empty-frame">
  <div class="empty-frame-content">
    <span>Select something.</span>
  </div>
</div>
