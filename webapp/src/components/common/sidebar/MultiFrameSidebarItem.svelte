<script>
  import Fa from 'svelte-fa/src/fa.svelte';
  import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
  import MultiFrameModal from '../modal/MultiFrameModal.svelte';

  let showModal = false;

  const handleClick = () => {
    showModal = true;
  };

  const handleModalClose = () => {
    showModal = false;
  }
</script>

<li class="sidebar-item multi-framing-item" on:click={handleClick}>
  <Fa icon={faEllipsisH} />
  <div class="popper">
    <h4 class="popper-text">
      Frame multiple sites
    </h4>
  </div>
</li>
<MultiFrameModal show={showModal} on:close={handleModalClose} />
