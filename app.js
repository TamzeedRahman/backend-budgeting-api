//Dependencies
const transactionsController = require("./controllers/transactionsController");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to the budgeting API");
});

app.use("/transactions", transactionsController);

app.get("*", (req, res) => {
  res.status(404).send("Page not Found");
});

module.exports = app;
