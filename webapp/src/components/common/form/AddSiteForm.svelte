<script>
  import { createEventDispatcher } from 'svelte';
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
  label {
    display: block;
  }

  input {
    display: block;
  }

  .required label::after {
    content: '* Required';
    color: red;
    margin-left: 10px;
  }
</style>

<form on:submit={handleSubmit}>
  {#if error}
    <div class="form-error">
      {error}
    </div>
  {/if}
  <div class="form-group required">
    <label for="fname">Name:</label>
    <input type="text" id="fname" bind:value={name} />
  </div>
  <div class="form-group required">
    <label for="furl">URL:</label>
    <input type="text" id="furl" bind:value={url} />
  </div>
  <div class="form-group">
    <label for="fimage">Upload image:</label>
    <input type="file" id="fimage" accept="image/*" on:change={handleImagePick} />
    {#if image}
      <img alt="preview" src={image} />
    {/if}
  </div>
  <input type="submit" value="Add" />
</form>
