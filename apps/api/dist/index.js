"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
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
// app.use(cors(corsOptions));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/dogs", (req, res) => {
    res.json(dogs);
});
app.put("/dogs", (req, res) => {
    const { name, id } = req.body;
    dogs.push({ name, id });
    res.json(dogs);
});
app.delete("/dogs/:id", (req, res) => {
    const id = Number(req.params.id);
    const index = dogs.findIndex((dog) => dog.id === id);
    dogs.splice(index, 1);
    res.json(dogs);
    res.send("Data deleted successfully");
});
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
