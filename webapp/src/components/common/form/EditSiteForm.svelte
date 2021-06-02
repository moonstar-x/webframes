<script>
  import { createEventDispatcher } from 'svelte';
  import ErrorAlert from '../alert/ErrorAlert.svelte';
  import { patchSite } from '../../../networking/sites';
  import { getImageWithInitials } from '../../../networking/imageGenerator';
  import { imageToDataURI } from '../../../utils';
  import { sites, currentSite } from '../../../stores/sites';

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
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 70vw;
  }

  label, button.button {
    display: block;
    width: 100%;
    margin-bottom: 0.3rem;
  }

  input {
    display: block;
    width: inherit;
  }

  input[type="text"] {
    border: none;
    border-bottom: 1px solid #444;
    width: 100%;
    font-size: 1em;
  }

  input[type="text"]:focus {
    border-bottom: 2px solid #000;
    outline: none;
  }

  input[type="file"] {
    display: none;
  }

  .form-section {
    display: flex;
  }

  .form-group {
    flex: 1;
  }

  .text-form {
    flex-direction: row;
    gap: 2rem;
  }

  @media only screen and (max-width: 576px) {
    .text-form {
      flex-direction: column;
      gap: 1rem;
    }
  }

  .button {
    padding: 10px;
    background: var(--bg-dark);
    color: var(--text-over-dark);
    border-radius: 5px;
    text-align: center;
    width: inherit;
    margin-bottom: 1rem;
    cursor: pointer;
    border: 2px solid var(--bg-dark);
    margin: 1rem 0;
    font-size: 1em;
  }

  .button:hover, .button:focus, .button:active {
    background: var(--bg-dark-accent);
    border: 2px solid var(--bg-dark);
  }

  .first-button {
    margin-top: 0 !important;
  }

  .last-button {
    margin-bottom: 0 !important;
  }

  input[type="submit"].button {
    margin: 0;
  }

  hr {
    margin: 0;
    color: #000;
  }

  img {
    display: block;
    margin: 0 auto;
    width: 100%;
    max-width: 256px;
  }

  .invalid {
    border-color: red !important;
  }
</style>

<form on:submit={handleSubmit}>
  {#if error}
    <ErrorAlert {error} />
  {/if}
  <div class="form-section text-form">
    <div class="form-group">
      <label for="fname">Name:</label>
      <input type="text" id="fname" bind:value={name} placeholder={site.name} autocomplete="off" on:input={clearError} />
    </div>
    <div class="form-group">
      <label for="furl">URL:</label>
      <input class:invalid={urlInvalid} type="text" id="furl" bind:value={url} placeholder={site.url} autocomplete="off" on:input={clearError} />
    </div>
  </div>
  <div class="form-section image-form">
    <div class="form-group">
      <label class="first-button button" for="fimage">Upload Image</label>
      <input type="file" id="fimage" accept="image/*" on:change={handleImagePick} />
      {#if image}
        <img alt="preview" src={image} />
      {/if}
      <button class="last-button button" on:click={handleImageDelete}>Delete Image</button>
    </div>
  </div>
  <hr />
  <input class="button" type="submit" value="Update" />
</form>
