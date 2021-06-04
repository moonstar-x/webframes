<script>
  import Fa from 'svelte-fa/src/fa.svelte';
  import { faPlus } from '@fortawesome/free-solid-svg-icons';
  import SidebarItem from './SidebarItem.svelte';
  import AddSiteModal from '../modal/AddSiteModal.svelte';

  let showModal = false;

  const handleClick = () => {
    showModal = true;
  };

  const handleModalClose = () => {
    showModal = false;
  }
</script>

<SidebarItem site={{ name: 'Add site' }} extra={true} on:click={handleClick}>
  <Fa icon={faPlus} />
</SidebarItem>
<AddSiteModal show={showModal} on:close={handleModalClose} />
