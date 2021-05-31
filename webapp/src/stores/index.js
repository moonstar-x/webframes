import { writable } from 'svelte/store';

export const createStore = (initial) => {
  const { subscribe, set } = writable(initial);

  return {
    subscribe,
    update: (data) => set(data)
  };
};

export const createArrayStore = (initial) => {
  const { subscribe, set, update: storeUpdate } = writable(initial);

  return {
    subscribe,
    update: (data) => set(data),
    add: (data) => storeUpdate((old) => [...old, data])
  };
};
