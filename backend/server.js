const express = require("express"); // used to build the apis/server
const fs = require("fs"); // Using Node builtin file systems to perform crud on json files
const cors = require("cors"); // Used to allow communication between frontend and backend

const app = express();

// middleware
app.use(cors());
app.use(express.json());

const FARMERS_FILE = "./backend/db/farmers.json";
const BATCHES_FILE = "./backend/db/batches.json";
const COLLECTIONS_FILE = "./backend/db/collections.json";

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
    location: req.body.location,
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
  const batches = JSON.parse(fs.readFileSync(BATCHES_FILE));
  const collections = JSON.parse(fs.readFileSync(COLLECTIONS_FILE));

  const collectionIds = req.body.collections || [];

  // Generate batch ID
  const lastBatch = batches[batches.length - 1];
  const newBatchID =
    (lastBatch?.batchID ?? lastBatch?.id ?? 0) + 1;

  const newBatch = {
    batchID: newBatchID,
    collections: collectionIds,
    status: "SAFE"
  };

  // MARK SELECTED COLLECTIONS AS USED
  const updatedCollections = collections.map(col => {
    if (collectionIds.includes(col.collectionID)) {
      return { ...col, status: "USED" };
    }
    return col;
  });

  // Save both files
  batches.push(newBatch);

  fs.writeFileSync(BATCHES_FILE, JSON.stringify(batches, null, 2));
  fs.writeFileSync(COLLECTIONS_FILE, JSON.stringify(updatedCollections, null, 2));

  res.json(newBatch);
});

app.put("/batches/recall/:id", (req, res) => {
  const data = fs.readFileSync(BATCHES_FILE);
  let batches = JSON.parse(data);

  const id = parseInt(req.params.id);

  batches = batches.map((batch) => {
    if (batch.batchID === id) {
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

app.post("/collections", (req, res) => {
  const data = JSON.parse(fs.readFileSync(COLLECTIONS_FILE));

  const newId =
    data.length > 0
      ? data[data.length - 1].collectionID + 1
      : 1;

  const newCollection = {
    collectionID: newId,
    farmerId: req.body.farmerId,
    quantity: req.body.quantity,
    date: req.body.date,
    status: "SAFE"
  };

  data.push(newCollection);

  fs.writeFileSync(COLLECTIONS_FILE, JSON.stringify(data, null, 2));

  res.json(newCollection);
});

app.get("/collections", (req, res) => {
  const data = JSON.parse(fs.readFileSync(COLLECTIONS_FILE));

  const available = data.filter(col => col.status === "SAFE");

  res.json(available);
});