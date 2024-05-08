import dbConnect from "./mongodb.js";
import express from "express";
const app = express();
app.use(express.json());

app.get("/", async (req, res) => {
  const collection = await dbConnect();
  const result = await collection.find().toArray();
  res.send(result);
});

app.post("/", async (req, res) => {
  const collection = await dbConnect();
  const result = await collection.insertOne(req.body);
  res.send("Data Inserted");
});

app.put("/:name", async (req, res) => {
  const collection = await dbConnect();
  const result = await collection.updateOne(
    { name: req.params.name },
    { $set: req.body }
  );
  res.send("Data updated");
});

app.delete("/:name", async (req, res) => {
  const collection = await dbConnect();
  const result = await collection.deleteOne({ name: req.params.name });
  res.send("Record Deleted");
});
app.listen(3000);
