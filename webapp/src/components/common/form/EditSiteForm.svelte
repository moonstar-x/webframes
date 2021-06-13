<script>
  import { createEventDispatcher } from 'svelte';
  import ErrorAlert from '../alert/ErrorAlert.svelte';
  import InfoAlert from '../alert/InfoAlert.svelte';
  import { patchSite } from '../../../networking/sites';
  import { getImageWithInitials } from '../../../networking/imageGenerator';
  import { imageToDataURI } from '../../../utils';
  import { sites, currentSite } from '../../../stores/sites';
  import { changePageTitle } from '../../../utils';

  const dispatch = createEventDispatcher();

  export let site;

  let error = '';

  let name = '';
  let url = '';
  let image = site.image;
  let shouldEditImage = false;

  let urlInvalid = false;

  const clearError = () => {
    urlInvalid = false;
    error = '';
  };

  const handleImageDelete = (e) => {
    e.preventDefault();

    image = null;
    shouldEditImage = true;
  };

  const handleImagePick = (e) => {
    shouldEditImage = true;
    const file = e.target.files[0];
    return imageToDataURI(file)
      .then((uri) => {
        image = uri;
      });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    const newSite = {};
    if (name) newSite.name = name;
    if (url) newSite.url = url;

    try {
      if (shouldEditImage) {
        newSite.image = image || await getImageWithInitials(newSite.name || site.name);
      }
      
      const updatedSite = await patchSite(site.id, newSite);
      sites.replace((old) => old.id === site.id, updatedSite);

      if ($currentSite?.id === site.id) {
        currentSite.update(updatedSite);
        changePageTitle(updatedSite.name);
      }

      dispatch('success');
    } catch (err) {
      if (err.endsWith('uri')) {
        error = 'URL needs to be a valid URI!';
        urlInvalid = true;
        return;
      }

      error = `Request Error: ${err}`;
    }
  };
</script>

<style>
  .button {
    margin: 1rem 0;
  }
</style>

<form class="form" on:submit={handleSubmit}>
  {#if error}
    <ErrorAlert {error} />
  {/if}
  <InfoAlert>
    You can add <strong>http(s)://*</strong> into the URL field to frame a service hosted on the same domain as this website.
  </InfoAlert>
  <div class="form-section text-form">
    <div class="form-group">
      <label class="form-label" for="fname">Name:</label>
      <!-- svelte-ignore a11y-autofocus -->
      <input class="form-input" type="text" id="fname" bind:value={name} placeholder={site.name} autocomplete="off" on:input={clearError} autofocus />
    </div>
    <div class="form-group">
      <label class="form-label" for="furl">URL:</label>
      <input class="form-input" class:invalid={urlInvalid} type="text" id="furl" bind:value={url} placeholder={site.url} autocomplete="off" on:input={clearError} />
    </div>
  </div>
  <div class="form-section image-form">
    <div class="form-group">
      <label class="form-label mt-0 button" for="fimage">Upload Image</label>
      <input class="form-input" type="file" id="fimage" accept="image/*" on:change={handleImagePick} />
      {#if image}
        <img alt="preview" src={image} />
      {/if}
      <button class="mb-0 button w-100" on:click={handleImageDelete}>Delete Image</button>
    </div>
  </div>
  <hr class="form-divider" />
  <input class="form-input button m-0" type="submit" value="Update Site" />
</form>
