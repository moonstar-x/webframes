import { createStore, createArrayStore } from '.';

export const sites = createArrayStore([]);
export const sitesError = createStore(null);
export const currentSite = createStore(null);
