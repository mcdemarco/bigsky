<!-- src/Board.svelte -->

<script>
  import { deck, layout } from './stores'

  export let shift;

  import Card from './Card.svelte';

console.log($layout);
</script>

<style>
  row {display:flex;}
</style>

  <!--p>The board should be {$suits} by {columns}.  The deck should be {$suits * $ranks} cards.  The deck is {$deck.length} cards.</p-->

{#each $layout as row}
  <row>
  {#each row as deckIndex}
    <Card {deckIndex} />
  {/each}
  </row>
{/each}

