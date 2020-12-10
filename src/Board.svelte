<!-- src/Board.svelte -->

<script>
  export let rows, ranks;
  $: columns = ranks + 1;
  $: board = Array.from(new Array(rows * ranks)); // @hmr:keep
  $: boardArray = Array.from(Array(rows).keys()).map(row => Array.from(Array(columns).keys()));

  import Deck from './Deck.svelte';
  import Card from './Card.svelte';
</script>

<style>
  row {display:flex;}
</style>


  <p>The board should be {rows} by {columns}.</p>

{#each boardArray as row, i}
  <row>
  {#each row as column}
    <Card suits={i} rank={column}/>
  {/each}
  </row>
{/each}

