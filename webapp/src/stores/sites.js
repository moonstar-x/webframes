import { createStore, createArrayStore } from '.';

export const sites = createArrayStore([]);
export const sitesError = createStore(null);

export const multiFrameEnabled = createStore(false);
export const currentSite = createStore(null);
export const openSites = createArrayStore([]);
