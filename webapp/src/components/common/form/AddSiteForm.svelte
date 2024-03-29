<script>
  import { createEventDispatcher } from 'svelte';
  import ErrorAlert from '../alert/ErrorAlert.svelte';
  import InfoAlert from '../alert/InfoAlert.svelte';
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

  let nameInvalid = false;
  let urlInvalid = false;

  const clearError = () => {
    nameInvalid = false;
    urlInvalid = false;
    error = '';
  };

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
      nameInvalid = true;
      return;
    }

    if (!url) {
      error = 'URL is required!';
      urlInvalid = true;
      return;
    }

    try {
      const siteImage = image || await getImageWithInitials(name);
      const newSite = await postSite({ name, url, image: siteImage });

      order.add(newSite.id);
      sites.add(newSite);
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

  const handleEnter = (e) => {
    if (e.keyCode === 13) {
      handleSubmit(e);
    };
  };
</script>

<form class="form" on:submit={handleSubmit} on:keydown={handleEnter}>
  {#if error}
    <ErrorAlert {error} />
  {/if}
  <InfoAlert>
    You can add <strong>http(s)://*</strong> into the URL field to frame a service hosted on the same domain as this website.
  </InfoAlert>
  <div class="form-section text-form">
    <div class="form-group required">
      <label class="form-label" for="fname">Name:</label>
      <!-- svelte-ignore a11y-autofocus -->
      <input class="form-input" class:invalid={nameInvalid} type="text" id="fname" bind:value={name} placeholder="Required" autocomplete="off" on:input={clearError} autofocus />
    </div>
    <div class="form-group required">
      <label class="form-label" for="furl">URL:</label>
      <input class="form-input" class:invalid={urlInvalid} type="text" id="furl" bind:value={url} placeholder="Required" autocomplete="off" on:input={clearError} />
    </div>
  </div>
  <div class="form-section image-form">
    <div class="form-group">
      <label class="form-label button" for="fimage" tabindex="0">Upload Image</label>
      <input class="form-input" type="file" id="fimage" accept="image/*" on:change={handleImagePick} />
      {#if image}
        <img alt="preview" src={image} />
      {/if}
    </div>
  </div>
  <hr class="form-divider" />
  <input class="form-input button" type="submit" value="Add Site" />
</form>
