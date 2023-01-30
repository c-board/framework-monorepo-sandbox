<script lang="ts">
import { getData, putData, deleteData } from "./api";

type Dog = {
  id: number;
  name: string;
};

export default {
  data() {
    return {
      dogs: [] as Dog[],
      newDog: {},
      inputValue: "",
    };
  },
  async created() {
    this.updateDogs();
  },
  methods: {
    async updateDogs() {
      const value = await getData();
      this.dogs = value;
    },
    async handleKeyDown(event: any) {
      this.newDog = { name: this.inputValue };
      if (event.keyCode === 13) {
        await putData(this.newDog);
        this.updateDogs();
        this.inputValue = "";
      }
    },
    async handleAdd() {
      await putData(this.newDog);
      this.updateDogs();
      this.inputValue = "";
    },
    async handleDelete(id: number) {
      await deleteData(id);
      this.updateDogs();
    },
  },
};
</script>

<template>
  <div class="App">
    <div>
      <a href="https://vitejs.dev" target="_blank">
        <img src="/vite.svg" class="logo" alt="Vite logo" />
      </a>
      <a href="https://vuejs.org/" target="_blank">
        <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
      </a>
    </div>
    <h1>Vite + Vue</h1>
    <div v-if="dogs.length">
      <div class="App__dogs" v-for="(dog, index) in dogs" :key="index">
        <h5>{{ dog.name }}</h5>
        <button @click="handleDelete(dog.id)">delete</button>
      </div>
    </div>
    <p v-else>No dogs</p>
    <div class="App__dogs--input">
      <input type="text" v-model="inputValue" @keydown="handleKeyDown" />
      <button @click="handleAdd">add</button>
    </div>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

.App__dogs,
.App__dogs--input {
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
