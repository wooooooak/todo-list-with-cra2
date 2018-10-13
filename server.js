const express = require("express");
const cors = require("cors");
const DataStore = require("nedb"),
  db = new DataStore({ filename: "./dataFile", autoload: true });
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/items", (req, res) => {
  const { dateString } = req.query;
  const start = new Date(dateString);
  const end = new Date(dateString);
  start.setHours(0, 0, 0, 0);
  end.setHours(23, 59, 59, 999);
  db.find({ createAt: { $gte: start, $lt: end } }).sort({ createAt: 1 }).exec((err, docs) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(docs);
    }
  });
});

app.post("/item", async (req, res) => {
  const { title, check, date, deadLine } = req.body;
  await db.insert({ title, check, deadLine, createAt: new Date(date) }, (err, newDocs) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(newDocs);
    }
  });
});

app.delete("/item", async (req, res) => {
  const { _id } = req.body;
  await db.remove({ _id }, (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(result);
    }
  });
});

app.put("/item/check", async (req, res) => {
  const { _id, check } = req.body;
  await db.update({ _id }, { $set: { check } }, (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(result);
    }
  });
});

app.put("/item/deadLine", async (req, res) => {
  const { _id, deadLine } = req.body;
  await db.update({ _id }, { $set: { deadLine } }, (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(result);
    }
  });
});

app.listen(8080, () => {
  console.log("server is running!!");
});
