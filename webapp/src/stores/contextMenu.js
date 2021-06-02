import { writable } from 'svelte/store';

const createStore = () => {
  const { subscribe, update } = writable({ visible: false, options: [], posX: -1, posY: -1 });

  return {
    subscribe,
    setVisibility: (visible) => update((old) => ({ ...old, visible })),
    setOptions: (options) => update((old) => ({ ...old, options })),
    setCoords: (posX, posY) => update((old) => ({ ...old, posX, posY }))
  };
};

export const contextMenuData = createStore();
