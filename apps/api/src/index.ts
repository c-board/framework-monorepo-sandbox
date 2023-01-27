import type { Application } from "express";
import express from "express";
import cors from "cors";

const app: Application = express();
const hostname = "127.0.0.1";
const port = 8080;

const corsOptions = {
  credentials: false,
  optionsSuccessStatus: 200,
  origin: "http://127.0.0.1:3008",
};

const dogs = [
  {
    id: 1,
    name: "Opie",
  },
  {
    id: 2,
    name: "Juno",
  },
];

app.use(cors(corsOptions));
app.use(express.json());

app.get("/test", (req, res) => {
  res.json(dogs);
});

app.put("/test", (req, res) => {
  const { name, id } = req.body;
  dogs.push({ name, id });
  res.json(dogs);
});

app.delete("/test/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = dogs.findIndex((dog) => dog.id === id);
  dogs.splice(index, 1);
  res.json(dogs);
  res.send("Data deleted successfully");
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
