<!-- src/Card.svelte -->

<script>
  export let row, col, shift;
  import { ranks, layout, lookup } from './stores'

  {$lookup}

  let lower, higher;

  const palette = ["#FF5050", "#FF9122", "#FBE426", "#1CBE4F", "#2ED9FF", "#DEA0FD",
		   "#FA0087", "#C4451C", "#F7E1A0", "#1C8356", "#3283FE", "#AA0DFE",
		   "#F6222E", "#85660D", "#FEAF16", "#16FF32", "#325A9B", "#C075A6",
		   "#FC1CBF", "#B00068", "#565656", "#90AD1C", "#1CFFCE", "#782AB6",
		   "#FF5151", "#B10DA1", "#F8A19F", "#FE00FA", "#A0A0A0"];
  const blankColor = "aliceblue";

  const card = $layout[row][col];

  $: paletteIndex = (card.suit - 1) % palette.length;
  $: bgcolor = card.suit == 0 ? blankColor : palette[paletteIndex];
  $: fgcolor = card.rank == 0 ? blankColor : contrastColor(palette[paletteIndex]);

  const contrastColor = color => {
    //color is an RGB color in the formats #abcdef
    //To support other formats like named colors grab a library.
    if (color.charAt(0) != "#" || (color.length - 1) % 3 != 0)
      return "#000000";
    var colorArray = [color.substring(1,3),color.substring(3,5),color.substring(5,7)];
    colorArray = colorArray.map(function(elt){return parseInt(elt,16)/255;});
    var lumi = 0.299 * colorArray[0] + 0.587 * colorArray[1] + 0.114 * colorArray[2];
    return (lumi > 0.5 ? "#000000" : "#FFFFFF");
  }

  const position2ID = card => {
    return "#card_" + card[0] + "_" + card[1];
  }

  const highlightCandidates = event => {
    //Show buttons.
    document.querySelector(position2ID([row,col]) + " vbutton.minus").classList.add("show");
    document.querySelector(position2ID([row,col]) + " vbutton.plus").classList.add("show");
    //Highlight the candidate cards or spaces
    let card = $layout[row][col];
    let neighbors = $lookup[card.suit][card.rank];
    let lower, higher, lowerer, higherer;
    //console.log("Moused over " + JSON.stringify(card) + " " + JSON.stringify(neighbors));
    hoverCard([row,col]);
    if (neighbors.card) {
      //Not present for blanks.
      if (neighbors.lower) {
	highlightCard(neighbors.lower,"lower");
      }
      if (neighbors.higher) {
	highlightCard(neighbors.higher, "higher");
      }
    } else {
      //Highlight candidates for blanks.
      if (col > 0) {
	lower = $layout[row][col - 1];
	if (lower.rank == $ranks) {
	  //No higher, but check the shift.
	  highlightShift([row][col]);
	} else if (lower.rank > 0) {
	  //Not a blank, so highlight its higher.
	  //$ranks is a special case; highlight shift or more cards.
	  lowerer = $lookup[lower.suit][lower.rank];
	  if (lowerer.higher)
	    highlightCard(lowerer.higher, "lower");
	}
      }
      if (col < $ranks - 1) {
	higher = $layout[row][col + 1];
	if (higher.rank > 0) {
	  //Not a blank, so highlight its lower.
	  higherer = $lookup[higher.suit][higher.rank];
	  if (higherer.lower)
	    highlightCard(higherer.lower, "higher");
	}
      }
    }
  }

  const highlightCard = (card, type) => {
    document.querySelector(position2ID(card)).classList.remove("fade");
    document.querySelector(position2ID(card)).classList.add(type);
  }

  const hoverCard = card => {
    document.querySelectorAll("card").forEach(item => item.classList.add("fade"));
    document.querySelector(position2ID(card)).classList.add("hover");
  }

  const highlightShift = () => {
    //Check for space for a shift run.

    if (col < shift + 1) {
      //Not enough cards.  
      //+1 for the hard-placed 1 at the beginning of the row.
      return;
    }

    let card = $layout[row][col - 1];
    if (card.rank === 0) {
      //Another blank.
      return;
    }

    //Shouldn't call without knowing the first card is of max rank, but check it with the rest.
    let rank = $ranks;
    let suit = card.suit;

    for (let s=1; s <= shift; s++) {
      card = $layout[row][col - s];
      if (card.rank === 0 || card.rank != rank || card.suit != suit)
	return;

      highlightCard([row, col - s], "shift");
      rank--
    }
  }

  const unhighlightCandidates = event => {
    //Unhighlight the candidate cards or spaces
    document.querySelectorAll("card").forEach(item => {
      unhighlightCard(item);
    });
    document.querySelectorAll("vbutton").forEach(item => {
      item.classList.remove("show");
    });
  }

  const unhighlightCard = domCard => {
    //Unhighlight a card or space
    domCard.classList.remove("fade", "lower", "higher", "shift", "hover");
  }

</script>

<style>
  card {
    position:relative;
    display: flex;
    justify-content:center;
    align-items: center;
    width: 1.5em;
    height: 1.5em;
    margin: 0.1em;
    border: 0.1em solid #3D88BF;
    border-radius: 0.25em;
    text-align:center;
    font-weight: bold;
    font-family: 'Fortune Letters', Futura, Geneva, sans-serif;
    font-size: 2em;
  }
  vbutton {
    position: absolute;
    border-radius: 50%;
    background-color: white;
    opacity: 0.5;
    display: none;
    font-size: 0.5em;
    height: 1em;
    width: 1em;
    color: red;
  }
  vbutton.minus {
    left:0;
  }
  vbutton.plus {
    right:0;
  }


</style>

<card id="card_{row}_{col}"
      style="color: {fgcolor}; background-color: {bgcolor};"
      on:mouseover={highlightCandidates(row,col)}
      on:mouseout={unhighlightCandidates(row,col)}>
  <vbutton class="button minus">{card.rank > 1 ? card.rank - 1 : "+"}</vbutton>
  {card.rank}
  <vbutton class="button plus">{card.rank < $ranks && card.rank > 0 ? card.rank + 1 : (card.rank < $ranks ? "-" : "s")}</vbutton>
</card>
