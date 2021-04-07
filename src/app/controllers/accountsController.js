const express = require("express");
const mongoose = require("mongoose");
const Account = require("../models/account");
const Transaction = require("../models/transaction");

const router = express.Router();

// list
router.get("/", async (req, res) => {
  try {
    const accounts = await Account.find().populate("person");
    return res.json(accounts);
  } catch (error) {
    const { code, message } = error;
    return res.status(400).json({ code, message });
  }
});

// create
router.post("/", async (req, res) => {
  try {
    const { person } = req.body;
    if (await Account.findOne({ person })) {
      return res
        .status(400)
        .json({ message: "Já existe uma conta cadastrada para esta pessoa!" });
    }
    const account = await Account.create(req.body);
    return res.status(201).json(account);
  } catch (error) {
    const { code, message } = error;
    return res.status(400).json({ code, message });
  }
});

// show
router.get("/:accountId", async (req, res) => {
  try {
    const { accountId } = req.params;
    const account = await Account.findById(accountId).populate("person");
    return res.json(account);
  } catch (error) {
    const { code, message } = error;
    return res.status(400).json({ code, message });
  }
});

// balance
router.get("/:accountId/balance", async (req, res) => {
  try {
    const { accountId } = req.params;
    // return the account balance (only the value)
    const balance = await Transaction.aggregate([
      { $match: { account: mongoose.Types.ObjectId(accountId) } },
      { $group: { _id: accountId, balance: { $sum: "$value" } } },
    ]).then((row) => row[0].balance);
    return res.json({ balance });
  } catch (error) {
    const { code, message } = error;
    return res.status(400).json({ code, message });
  }
});

module.exports = (app) => app.use("/accounts", router);
