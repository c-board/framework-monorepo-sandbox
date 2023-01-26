import type { Application } from "express";
import express from "express";
import cors from "cors";
import * as http from "http";

const app: Application = express();
const hostname = "127.0.0.1";
const port = 8080;

const corsOptions = {
  credentials: true,
  optionsSuccessStatus: 200,
  origin: "http://localhost:3001",
};

app.use(cors(corsOptions));
app.use(express.json());

const server = http.createServer((req: any, res: any) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World");
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
