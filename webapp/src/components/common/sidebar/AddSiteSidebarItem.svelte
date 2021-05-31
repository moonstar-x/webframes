<script>
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

<style>
  h2 {
    font-size: 35px;
    font-family: 'Varela Round', 'Roboto', sans-serif;
    margin: 0;
  }
</style>

<SidebarItem site={{ name: 'Add site' }} extra={true} on:click={handleClick}>
  <h2>+</h2>
</SidebarItem>
<AddSiteModal show={showModal} on:close={handleModalClose} />
