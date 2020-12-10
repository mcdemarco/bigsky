<!-- src/Game.svelte -->

<script>
  let rows = 5;
  let ranks = 15;
  let shift = 3;
  
  import Board from './Board.svelte';
  import Deck from './Deck.svelte';
</script>

<style>


  input {width: 3em;}
</style>

<div class="Game">

  <label>Suits: </label>
  <input type=number bind:value={rows} min=1 max=10>

  <label>Ranks: </label>
  <input type=number bind:value={ranks} min=2 max=30>

  <label>Shift Rule: </label>
  <input type=number bind:value={shift} min=1 max={ranks}>

  <Board rows={rows} ranks={ranks}/>
  <Deck rows={rows} ranks={ranks}/>

</div>


