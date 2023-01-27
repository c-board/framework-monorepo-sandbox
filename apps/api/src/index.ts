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

app.use(cors(corsOptions));
app.use(express.json());

app.get("/test", (req, res) => {
  res.json({ data: "Hello World" });
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
