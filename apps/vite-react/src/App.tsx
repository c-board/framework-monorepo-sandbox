import { useEffect, useState } from "react";
import hash from "object-hash";

// assets
import reactLogo from "./assets/react.svg";

// api
import { getData, putData, deleteData } from "./api";

//styles
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
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
      <input
        type="text"
        onChange={(e) =>
          setNewDog({ id: dogs.length + 1, name: e.target.value })
        }
      />
      <button onClick={handleAdd}>add</button>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
