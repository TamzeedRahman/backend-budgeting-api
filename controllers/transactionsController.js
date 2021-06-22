const express = require("express");
const transactions = express.Router();
const ourData = require("../models/transaction");
const { v4: uuidv4 } = require("uuid");
const { DateTime } = require("luxon");

//home route
transactions.get("/", (req, res) => {
  res.status(200).json(ourData);
});

// singular route
transactions.get("/:id", (req, res) => {
  const { id } = req.params;
  const otherId = (transaction) => transaction.id === id;
  const i = ourData.findIndex(otherId);

  if (i >= 0) {
    res.status(200).json(ourData[i]);
  } else {
    res.redirect("404");
  }
});

const objMain = (req, res, next) => {
  const { date, amount } = req.body;

  let dt = DateTime.now();
  let dateForm = dt.isValid;

  if (!date || !amount < 0) {
    res.status(400).send("oops");
  } else if (dateForm) {
    next();
  } else {
    res.status(400).send("uhhhhohhh");
  }
};

transactions.post("/", objMain, (req, res) => {
  if (!req.body.length) {
    objMain.push({ ...req.body, id: uuidv4() });
    return res.json([objMain[objMain.length - 1]]);
  }

  const index = objMain.length;
  req.body.forEach((sub) => {
    objMain.push({ ...sub, id: uuidv4() });
  });
  res.json(objMain.slice(index));
});

transactions.put("/:id", (req, res) => {
  const { id } = req.params;
  const otherId = (transaction) => transaction.id === id;
  const i = ourData.findIndex(otherId);

  if (i > 0) {
    const transactionID = ourData[i].id;
    ourData[i] = {
      ...req.body,
      id: transactionID,
    };
    res.status(200).json(ourData);
  } else {
    res.redirect("404");
  }
});

transactions.delete("/:id", (req, res) => {
  const { id } = req.params;
  const otherId = (transaction) => transaction.id === id;
  const i = ourData.findIndex(otherId);
  if (i > 0) {
    ourData.splice(i, 1);
    res.status(200).json(ourData);
  } else {
    res.redirect("404");
  }
});

module.exports = transactions;

//NOTES

//The findIndex() method returns the index of the first element
//in an array that pass a test (provided as a function).
