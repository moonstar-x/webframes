<script>
  import ErrorAlert from '../alert/ErrorAlert.svelte';
  import InfoAlert from '../alert/InfoAlert.svelte';
  import Dropdown from '../dropdown/Dropdown.svelte';
  import { sites, currentSite, multiFrameEnabled, openSites } from '../../../stores/sites';
  import { order } from '../../../stores/order';

  let siteNames = $sites.reduce((acc, cur) => {
    acc[cur.id] = cur.name;
    return acc;
  }, {});

  let orderedSiteValues = $order.map((id) => {
    const name = siteNames[id];

    return {
      value: id,
      text: name
    };
  });

  const handleSelectFrame = (key, { detail }) => {
    openSites.replace((openSite) => openSite.key === key, {
      id: detail,
      name: siteNames[detail],
      key
    });
    console.dir($openSites);
  };

  const handleDeleteFrame = (key) => {
    openSites.delete((openSite) => openSite.key !== key);
    console.dir($openSites);
  };

  const handleAddFrame = () => {
    currentSite.update(null);
    multiFrameEnabled.update(true);
    openSites.add({
      id: null,
      name: null,
      key: Math.random().toString()
    });
  };

  const handleDisableMultiFraming = () => {
    multiFrameEnabled.update(false);
    openSites.update([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleEnter = (e) => {
    if (e.keyCode === 13) {
      handleSubmit(e);
    };
  };
</script>

{#if $sites.length < 1}
  <form class="form" on:submit|preventDefault>
    <ErrorAlert>
      You need to add at least 1 site before you can multi frame.
    </ErrorAlert>
  </form>
{:else}
  <form class="form" on:submit={handleSubmit} on:keydown={handleEnter}>
    <InfoAlert>
      You can frame up to 9 sites at the same time. Multi framing is currently <strong>{$multiFrameEnabled ? 'enabled' : 'disabled'}</strong>.
    </InfoAlert>
    <div class="form-section column-section">
      {#each $openSites as openSite, idx (openSite.key)}
        <div class="inline-form-group">
          <span>Frame #{idx + 1}</span>
          <Dropdown
            defaultValue={openSite.id}
            placeholder="Pick a site to frame"
            values={orderedSiteValues}
            name={`dropdown-multi-framing-${idx}`}
            on:select={(e) => handleSelectFrame(openSite.key, e)}
          />
          <button class="button" on:click={() => handleDeleteFrame(openSite.key)}>X</button>
        </div>
      {/each}
    </div>
    <button disabled={$openSites.length >= 9} class="mb-0 button w-100" on:click={handleAddFrame}>Add frame</button>
    <button disabled={!$multiFrameEnabled} class="mb-0 button w-100" on:click={handleDisableMultiFraming}>Clear and disable multi framing</button>
  </form>
{/if}
