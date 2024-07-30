const express = require("express");
const cors = require("cors");
let { db, nextId } = require("./db");

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

app.get(`/api/place/:id`, (req: any, res: any) => {
  const id = req.params.id;
  res.json(db);
});

// get all places
app.get("/api/places", (req: any, res: any) => {
  res.json(db);
});

app.post("/api/place", (req: Request, res: Response) => {
  const newRequest = req.body;
  // @ts-ignore
  newRequest!.id = nextId; // Assign the next available ID
  db.push(newRequest);
  nextId++;
  // @ts-ignore
    res.status(201).json(newRequest);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
