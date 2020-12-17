<!-- src/Card.svelte -->

<script>
  export let row, col;
  import { layout } from './stores'

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

  const highlightCandidates = event => {
    //Highlight the candidate cards or spaces
    console.log("Moused over " + row + "," + col);
  }

</script>

<style>
  card {
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
</style>

<card style="color: {fgcolor}; background-color: {bgcolor};" on:mouseover={highlightCandidates(row,col)}>{card.rank}</card>
