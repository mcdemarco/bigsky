<!-- src/Board.svelte -->

<script>
  import { layout } from './stores'

  {$layout}

  export let shift;

  import Card from './Card.svelte';
</script>

<style>
  row {display:flex;}
</style>

  <!--p>The board should be {$suits} by {columns}.  The deck should be {$suits * $ranks} cards.</p-->

{#each $layout as row, r}
  <row>
  {#each row as card, c (card)}
    <Card row={r} col={c} />
  {/each}
  </row>
{/each}

