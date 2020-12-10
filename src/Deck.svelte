<!-- src/Deck.svelte -->

<script>
  export let rows, ranks;
  let suits = 1;
  let rank = 4;

  import Card from './Card.svelte';
</script>

<style>

</style>


<p>The deck should be {rows * ranks} cards.</p>

<Card suits={suits} rank={rank} />
