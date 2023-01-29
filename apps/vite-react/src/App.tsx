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
    if (e.keyCode === 13) {
      await putData(currentValue);
      updateDogs();
    }
  }

  async function handleAdd() {
    await putData(newDog);
    updateDogs();
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
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
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
      <input type="text" onKeyDown={(e) => handleKeyDown(e)} />
      <button onClick={handleAdd}>add</button>
    </div>
  );
}

export default App;
