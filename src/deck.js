// src/deck.js

//Create the deck from the suits and ranks.
const create = (suits, ranks) => {
  return respace(space(shuffle(init(suits,ranks)),ranks));
}

//Populate 'em.
const init = (suits,ranks) => {
  let deck = [];
  for (let s=1; s <= suits; s++) {
    for (let r=1; r <= ranks; r++) {
			deck = [...deck, {suit: s, rank: r}];
    }
  }
	return deck;
}

//Shuffle 'em.
const shuffle = deck => {
  // shuffle a deck of cards
  for (let i = 0; i < deck.length; i++) {
    // move card from i to n
    let n = 0;
    while (n === 0 || n === i) {
			n = Math.floor(Math.random() * (deck.length - 1)) + 1;
    }
    let temp = deck[i];
    deck[i] = deck[n];
    deck[n] = temp;
  }
  return deck;
}

//Space 'em.
const space = (deck, ranks) => {
  // insert blanks into the deck of cards
	let newDeck = [];
	//let blank = {suit: 0, rank: 0}];
  for (let i = 0; i < deck.length; i++) {
		if (i % ranks === 0)
			newDeck = [...newDeck, {suit: 0, rank: 0}];
		newDeck = [...newDeck, deck[i]];
  }
  return newDeck;
}

//Respace 'em.  (5x15-specific)
const respace = (deck) => {
  // Swap 1's and blanks in the deck of cards
	//Don't need any other sizes to do this.
	let zeroes = [];
	let ones = [];
  for (let i = 0; i < deck.length; i++) {
		if (deck[i].rank === 0)
			zeroes = [...zeroes, i];
		if (deck[i].rank === 1)
			ones = [...ones, i];
  }
	for (let z = 0; z < zeroes.length; z++) {
    deck[zeroes[z]] = deck[ones[z]];
    deck[ones[z]] = {suit: 0, rank:0};
	}
  return deck;
}

//Create the board layout.
const deal = (suits, ranks) => {
	let deck = create(suits, ranks);
  let boardArray = [];
	let columns = ranks + 1; //Not the external rank count; include spaces.
  for (let s=0; s < suits; s++) {
		let row = [];
    for (let r=0; r < columns; r++) {
      row = [...row, deck[s*columns + r]];
    }
    boardArray = [...boardArray, row];
  }
  return boardArray;
}

export { create };
