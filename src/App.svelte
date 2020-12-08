<!-- src/App.svelte -->

<script>
  let rows = 5;
  let ranks = 15;

  import Board from './Board.svelte';
</script>

<style>
  .App {
    display:block;
    margin: 0 2em 2em 2em;
    padding: 2em;
    color: #003;
    background-color: #9FD3F1;
  }
  footer {
    min-height: 3em;
    display: inline-block;
    text-align:right;
    margin-bottom: 3rem;
    width:95%;
  }
  footer a {
    color: white;
  }
  .App-logo {
    height: 1em;
    pointer-events: none;
    animation: App-logo-pulse infinite 1.6s ease-in-out alternate;
  }
  @keyframes App-logo-pulse {
    from {
      transform: scale(1);
    }
    to {
      transform: scale(1.5);
    }
  }
</style>

<div class="App">

  <label>Suits: </label>
  <input type=number bind:value={rows} min=1 max=10>

  <label>Ranks: </label>
  <input type=number bind:value={ranks} min=2 max=30>

  <Board rows={rows} ranks={ranks}/>

</div>

<footer>
  <img src="/logo.svg" class="App-logo" alt="logo" />
  <a
    href="https://svelte.dev"
    target="_blank"
    rel="noopener noreferrer"
    >
    Learn Svelte
  </a>
</footer>

