<script lang="ts">
  import { onMount } from "svelte";
  import { getData, putData, deleteData } from "./api.js";
  import svelteLogo from "./assets/svelte.svg";

  let dogs = [];
  let newDog = {};
  let inputValue = "";

  const updateDogs = async () => {
    const value = await getData();
    dogs = value;
  };

  const handleKeyDown = async (e) => {
    newDog = { name: e.target.value };
    inputValue = e.target.value;
    if (e.keyCode === 13) {
      await putData(newDog);
      updateDogs();
      inputValue = "";
    }
  };

  const handleAdd = async () => {
    await putData(newDog);
    updateDogs();
    inputValue = "";
  };

  const handleDelete = async (id) => {
    await deleteData(id);
    updateDogs();
  };

  onMount(async () => {
    updateDogs();
  });
</script>

<div class="App">
  <div>
    <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
      <img src="/vite.svg" class="logo" alt="Vite Logo" />
    </a>
    <a href="https://svelte.dev" target="_blank" rel="noreferrer">
      <img src={svelteLogo} class="logo svelte" alt="Svelte Logo" />
    </a>
    <h1>Vite + Svelte</h1>
  </div>
  {#if dogs.length}
    {#each dogs as { name, id }}
      <div class="App__dogs">
        <h5>{name}</h5>
        <button on:click={() => handleDelete(id)}>delete</button>
      </div>
    {/each}
  {:else}
    <p>No dogs</p>
  {/if}
  <div class="App__input">
    <input type="text" bind:value={inputValue} on:keydown={handleKeyDown} />
    <button on:click={handleAdd}>add</button>
  </div>
</div>

<style>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }

  .App__dogs,
  .App__input {
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-align: left;
  }

  button {
    width: 100px;
  }

  input {
    max-width: 100px;
    padding: 7px;
  }
</style>
