<!-- src/Board.svelte -->

<script>
  import { suits, ranks, deck, layout } from './stores'

  export let shift;
  $: columns = $ranks + 1;

  import BlankCard from './BlankCard.svelte';
  import Card from './Card.svelte';
</script>

<style>
  row {display:flex;}
</style>

  <p>The board should be {$suits} by {columns}.  The deck should be {$suits * $ranks} cards.  The deck is {$deck.length} cards.</p>

{#each $layout as row}
  <row>
    <BlankCard />
  {#each row as column}
    <Card suit={$deck[column].suit} rank={$deck[column].rank}/>
  {/each}
  </row>
{/each}

