<!-- src/Board.svelte -->

<script>
  export let rows, ranks;
  $: columns = ranks + 1;
  $: board = Array.from(new Array(rows * ranks)); // @hmr:keep
  $: boardArray = Array.from(Array(rows).keys()).map(row => Array.from(Array(columns).keys()));
</script>

<style>
  row {display:block;}
  square {
    padding:0.3em;
    display:inline-block;
    height:2em;
    width:2em;
    border: 1px solid yellow;
    text-align:center;
  }
</style>


  <p>The board should be {rows} by {columns}.</p>

{#each boardArray as row}
  <row>
  {#each row as column}
    <square value={column}>{column}</square>
  {/each}
  </row>
{/each}

