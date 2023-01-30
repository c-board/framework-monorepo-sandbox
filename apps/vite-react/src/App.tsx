import { useEffect, useState } from "react";
import hash from "object-hash";

// assets
import reactLogo from "./assets/react.svg";

// api
import { getData, putData, deleteData } from "./api";

//styles
import "./App.css";

function App() {
  const [dogs, setDogs] = useState<any>([]);
  const [newDog, setNewDog] = useState<any>({});
  const [inputValue, setInputValue] = useState("");

  type Dog = {
    id: number;
    name: string;
  };

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
    await putData(newDog);
    updateDogs();
    setInputValue("");
  }

  async function handleDelete(id: number) {
    await deleteData(id);
    updateDogs();
  }

  useEffect(() => {
    updateDogs();
  }, []);

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      {dogs?.length ? (
        dogs.map(({ name, id }: Dog) => (
          <div className="App__dogs" key={hash(name)}>
            <h5>{name}</h5>
            <button onClick={() => handleDelete(id)}>delete</button>
          </div>
        ))
      ) : (
        <p>No dogs</p>
      )}
      <div className="App__input">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e)}
        />
        <button onClick={handleAdd}>add</button>
      </div>
    </div>
  );
}

export default App;
