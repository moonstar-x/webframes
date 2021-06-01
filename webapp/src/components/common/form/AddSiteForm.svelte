<script>
  import { createEventDispatcher } from 'svelte';
  import ErrorAlert from '../alert/ErrorAlert.svelte';
  import { postSite } from '../../../networking/sites';
  import { getImageWithInitials } from '../../../networking/imageGenerator';
  import { imageToDataURI } from '../../../utils';
  import { sites } from '../../../stores/sites';
  import { order } from '../../../stores/order';

  const dispatch = createEventDispatcher();

  let error = '';

  let name = '';
  let url = '';
  let image = null;

  const handleImagePick = (e) => {
    const file = e.target.files[0];
    return imageToDataURI(file)
      .then((uri) => {
        image = uri;
      });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (!name) {
      error = 'Name is required!';
      return;
    }

    if (!url) {
      error = 'URL is required!';
      return;
    }

    try {
      const siteImage = image || await getImageWithInitials(name);
      const newSite = await postSite({ name, url, image: siteImage });

      sites.add(newSite);
      order.add(newSite.id);
      dispatch('success');
    } catch (err) {
      error = err;
    }
  };
</script>

<style>
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  label {
    display: block;
    width: 100%;
    margin-bottom: 0.3rem;
  }

  .required label::after {
    content: '*';
    color: red;
    margin-left: 0.25rem;
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
    margin: 0;
    font-size: 1em;
  }

  .button:hover, .button:focus, .button:active {
    background: var(--bg-dark-accent);
    border: 2px solid var(--bg-dark);
  }

  hr {
    margin: 0;
    color: #000;
  }

  img {
    display: block;
    margin: 1rem auto 0 auto;
    width: 100%;
    max-width: 256px;
  }
</style>

<form on:submit={handleSubmit}>
  {#if error}
    <ErrorAlert {error} />
  {/if}
  <div class="form-section text-form">
    <div class="form-group required">
      <label for="fname">Name:</label>
      <input type="text" id="fname" bind:value={name} placeholder="Required" autocomplete="off" />
    </div>
    <div class="form-group required">
      <label for="furl">URL:</label>
      <input type="text" id="furl" bind:value={url} placeholder="Required" autocomplete="off" />
    </div>
  </div>
  <div class="form-section image-form">
    <div class="form-group">
      <label class="button" for="fimage">Upload Image</label>
      <input type="file" id="fimage" accept="image/*" on:change={handleImagePick} />
      {#if image}
        <img alt="preview" src={image} />
      {/if}
    </div>
  </div>
  <hr />
  <input class="button" type="submit" value="Add" />
</form>
