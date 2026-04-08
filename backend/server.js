const express = require("express"); // used to build the apis/server
const fs = require("fs"); // Using Node builtin file systems to perform crud on json files
const cors = require("cors"); // Used to allow communication between frontend and backend

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// file paths (your JSON "database")
const FARMERS_FILE = "./backend/db/farmers.json";
const BATCHES_FILE = "./backend/db/batches.json";

console.log("Server is starting...");

app.get("/farmers", (req, res) => {
  const data = fs.readFileSync(FARMERS_FILE);
  res.json(JSON.parse(data));
});

app.post("/farmers", (req, res) => {
  const data = fs.readFileSync(FARMERS_FILE);
  const farmers = JSON.parse(data);

  const newFarmer = {
    id: Date.now(),
    name: req.body.name,
    location: req.body.location
  };

  farmers.push(newFarmer);

  fs.writeFileSync(FARMERS_FILE, JSON.stringify(farmers, null, 2));

  res.json(newFarmer);
});

app.get("/batches", (req, res) => {
  const data = fs.readFileSync(BATCHES_FILE);
  res.json(JSON.parse(data));
});


app.post("/batches", (req, res) => {
  const data = fs.readFileSync(BATCHES_FILE);
  const batches = JSON.parse(data);

  const newBatch = {
    id: Date.now(),
    collections: req.body.collections || [],
    status: "SAFE"
  };

  batches.push(newBatch);

  fs.writeFileSync(BATCHES_FILE, JSON.stringify(batches, null, 2));

  res.json(newBatch);
});

app.put("/batches/recall/:id", (req, res) => {
  const data = fs.readFileSync(BATCHES_FILE);
  let batches = JSON.parse(data);

  const id = parseInt(req.params.id);

  batches = batches.map(batch => {
    if (batch.id === id) {
      return { ...batch, status: "RECALLED" };
    }
    return batch;
  });

  fs.writeFileSync(BATCHES_FILE, JSON.stringify(batches, null, 2));

  res.json({ message: "Batch recalled successfully" });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

