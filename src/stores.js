// src/stores.js

import { writable, derived } from 'svelte/store';
import { create, deal } from './deck';

export const suits = writable(5);
export const ranks = writable(15);

export const deck = derived(
  [suits,ranks],
  ([$suits, $ranks]) => {
    return create($suits, $ranks);
  }
);

export const layout = derived(
  [suits,ranks],
  ([$suits, $ranks]) => {
    return deal($suits, $ranks);
  }
);
