// src/stores.js

import { writable, derived } from 'svelte/store';
import { deal } from './deck';

export const suits = writable(5);
export const ranks = writable(15);

export const layout = derived(
  [suits,ranks],
  ([$suits, $ranks]) => {
    return deal($suits, $ranks);
  }
);
