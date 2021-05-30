import { writable } from 'svelte/store';

export const createStore = (initial) => {
  const { subscribe, set } = writable(initial);

  return {
    subscribe,
    update: (data) => set(data)
  };
};
