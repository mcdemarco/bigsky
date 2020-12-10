<!-- src/Card.svelte -->

<script>
  export let rank, suits;
  const palette = ["#FEAF16", "#2ED9FF", "#DEA0FD", "#1CBE4F", "#F7E1A0",
		   "#FA0087", "#3283FE", "#FE00FA", "#16FF32", "#A0A0A0",
		   "#F8A19F", "#1C8356", "#C4451C", "#C075A6", "#90AD1C", 
		   "#B00068", "#AA0DFE", "#FC1CBF", "#1CFFCE", "#F6222E", 
		   "#85660D", "#325A9B", "#B10DA1", "#565656", "#782AB6",
		   "#FBE426"];
  $: color = palette[suits];
</script>

<style>
  card {
    display: flex;
    justify-content:center;
    align-items: center;
    width: 1.5em;
    height: 1.5em;
    margin: 0.2em;
    border: 0.1em solid #3D88BF;
    border-radius: 0.25em;
    text-align:center;
    font-weight: bold;
    font-family: 'Fortune Letters', Futura, Geneva, sans-serif;
    font-size: 2em;
  }
</style>

<card style="background-color: {color}">{rank}</card>
