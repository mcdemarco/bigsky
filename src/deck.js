// src/deck.js

//Create the deck from the suits and ranks.
const create = (suits, ranks) => {
  return space(shuffle(init(suits,ranks)),ranks);
}

//Populate 'em.
const init = (suits,ranks) => {
  var deck = [];
  for (var s=1; s <= suits; s++) {
    for (var r=1; r <= ranks; r++) {
			deck.push({suit: s, rank: r})
    }
  }
	return deck;
}

//Shuffle 'em.
const shuffle = deck => {
  // shuffle a deck of cards
  for (var i = 0; i < deck.length; i++) {
    // move card from i to n
    var n = 0;
    while (n == 0 || n == i) {
			n = Math.floor(Math.random() * (deck.length - 1)) + 1;
    }
    var temp = deck[i];
    deck[i] = deck[n];
    deck[n] = temp;
  }
  return deck;
}

//Space 'em.
const space = (deck, ranks) => {
  // insert blanks into the deck of cards
	var newDeck = [];
	//var blank = {suit: 0, rank: 0}];
  for (var i = 0; i < deck.length; i++) {
		if (i % ranks === 0)
			newDeck.push({suit: 0, rank: 0});
		newDeck.push(deck[i]);
  }
  return newDeck;
}

//Create the board layout.
const deal = (suits, deck) => {
  var boardArray = [];
	var ranks =  deck.length/suits;  //Not the external rank count; include spaces.
  for (var s=0; s < suits; s++) {
		var row = [];
    for (var r=0; r < ranks; r++) {
      row.push(s*ranks + r);
    }
    boardArray.push(row);
  }
  return boardArray;
}

export {create, deal}
