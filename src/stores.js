// src/stores.js

import { writable, derived } from 'svelte/store';
import { create } from './deck';

export const suits = writable(5);
export const ranks = writable(15);

export const layout = derived(
  [suits,ranks],
  ([$suits, $ranks]) => {
		let deck = create($suits, $ranks);
		let boardArray = [];
		let columns = $ranks + 1; //Not the external rank count; include spaces.
		for (let s=0; s < $suits; s++) {
			let row = [];
			for (let r=0; r < columns; r++) {
				row = [...row, deck[s*columns + r]];
			}
			boardArray = [...boardArray, row];
		}
		return boardArray;
	}
);

export const lookup = derived(
  [layout, suits, ranks],
  ([$layout, $suits, $ranks]) => {
		//create the table.
		let lookup = {};
		for (let s=1; s <= $suits; s++) {//suits one-indexed.
			lookup[s] = {};
			for (let r=1; r <= $ranks; r++) {//ranks one-indexed.
				lookup[s][r] = {
					lower: null,
					card: null,
					higher: null
				}
			}
		}
		lookup[0] = [];  //one array for blanks

		//Populate the table.
		for (let ro=0; ro < $layout.length; ro++) {
			let row = $layout[ro];
			for (let co=0; co < row.length; co++) {
				let card = row[co];
				if (card.rank === 0)
					lookup[0].push([ro,co]);
				else {
					lookup[card.suit][card.rank]["card"] = [ro,co];
					if (card.rank > 1)
						lookup[card.suit][card.rank - 1]["higher"] = [ro,co];
					if (card.rank < $ranks)
						lookup[card.suit][card.rank + 1]["lower"] = [ro,co];
				}
			}
		}
		return lookup;
	}
);
