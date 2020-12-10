<!-- src/App.svelte -->

<script>
  import Game from './Game.svelte';
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
  input {width: 3em;}
</style>

<div class="App">

  <Game/>

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

