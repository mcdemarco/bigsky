<!-- src/Game.svelte -->

<script>
  import { suits, ranks, deck } from './stores'

  let shift = 3;

  import Board from './Board.svelte';
</script>

<style>
  input {width: 3em;}
</style>

<div class="Game">

  <p>
    <label>Suits: </label>
    <input type=number bind:value={$suits} min=1 max=26>

    <label>Ranks: </label>
    <input type=number bind:value={$ranks} min=2>
    
    <label>Shift Rule: </label>
    <input type=number bind:value={shift} min=1 max={$ranks}>
  </p>

  <Board {shift}/>

</div>


