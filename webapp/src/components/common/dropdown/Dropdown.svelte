<script>
  import { createEventDispatcher } from 'svelte';

  export let defaultValue;

  export let placeholder;
  export let values;
  export let name = 'dropdown';

  let current = defaultValue || null;
  console.log(current)

  const dispatch = createEventDispatcher();

  const handleChange = () => {
    dispatch('select', current);
  };
</script>

<!-- svelte-ignore a11y-no-onchange -->
<select name={name} bind:value={current} on:change={handleChange}>
  <option value={null} disabled hidden>{placeholder}</option>
  {#each values as { value, text }}
    <option value={value}>{text}</option>
  {/each}
</select>
