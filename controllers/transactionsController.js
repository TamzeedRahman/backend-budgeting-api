const express = require("express");
const transactions = express.Router();
const transactionsArray = require("../models/transaction");

transactions.get("/", (req, res) => {
  res.json(transactionsArray);
});

transactions.get("/:index", (req, res) => {
  const { index } = req.params;
  if (transactionsArray[index]) {
    res.status(200).json(transactionsArray[index]);
  } else {
    res.redirect("404");
  }
});

transactions.post("/", (req, res) => {
  transactionsArray.push(req.body);
  res.json(transactionsArray[transactionsArray.length - 1]);
});

transactions.put("/:index", (req, res) => {
  const { index } = req.params;
  if (transactionsArray[index]) {
    transactionsArray[index] = req.body;
    res.json(transactionsArray[index]);
  } else {
    res.redirect("404");
  }
});


transactions.delete("/:index", (req, res) => {
  const { index } = req.params;
  if (transactionsArray[index]) {
    transactionsArray.splice(index, 1);
    res.json(transactionsArray);
  } else {
    res.redirect("404"); // THE SPLICE IS CAUSTING A ERROR WHEN IT COMES TO THE LAST INDEX
  }
});

module.exports = transactions;

//NOTES

//The findIndex() method returns the index of the first element
//in an array that pass a test (provided as a function).
