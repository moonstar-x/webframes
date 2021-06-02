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
    add: (data) => storeUpdate((old) => [...old, data]),
    delete: (filter) => storeUpdate((old) => old.filter(filter)),
    replace: (findPredicate, newItem) => {
      return storeUpdate((data) => {
        const index = data.findIndex(findPredicate);
        const first = data.slice(0, index);
        const last = data.slice(index + 1);
        return [...first, newItem, ...last];
      });
    }
  };
};
