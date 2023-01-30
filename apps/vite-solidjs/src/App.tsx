import { createSignal, For, onMount } from "solid-js";
import solidLogo from "./assets/solid.svg";

// api
import { getData, putData, deleteData } from "./api";

// styles
import "./App.css";

type Dog = {
  id: number;
  name: string;
};

function App() {
  const [dogs, setDogs] = createSignal<any>([]);
  const [newDog, setNewDog] = createSignal<any>({});
  const [inputValue, setInputValue] = createSignal<string>("");

  async function updateDogs() {
    const value = await getData();
    setDogs(value);
  }

  async function handleKeyDown(e: any) {
    const currentValue = { name: e.target.value };

    setNewDog(currentValue);
    setInputValue(e.target.value);
    if (e.keyCode === 13) {
      await putData(currentValue);
      updateDogs();
      setInputValue("");
    }
  }

  async function handleAdd() {
    await putData(newDog());
    updateDogs();
    setInputValue("");
  }

  async function handleDelete(id: number) {
    await deleteData(id);
    updateDogs();
  }

  onMount(() => {
    updateDogs();
  });

  return (
    <div class="App">
      <div>
        <a href="https://vitejs.dev">
          <img src="/vite.svg" class="logo" alt="Vite logo" />
        </a>
        <a href="https://www.solidjs.com">
          <img src={solidLogo} class="logo solid" alt="Solid logo" />
        </a>
      </div>
      <h1>Vite + Solid</h1>
      {dogs()?.length ? (
        <For each={dogs()}>
          {({ name, id }: Dog) => (
            <div class="App__dogs">
              <h5>{name}</h5>
              <button onClick={() => handleDelete(id)}>delete</button>
            </div>
          )}
        </For>
      ) : (
        <p>No dogs</p>
      )}
      <div class="App__dogs--input">
        <input
          type="text"
          value={inputValue()}
          onChange={(e) => setInputValue(e.currentTarget.value)}
          onKeyDown={(e) => handleKeyDown(e)}
        />
        <button onClick={handleAdd}>add</button>
      </div>
    </div>
  );
}

export default App;
