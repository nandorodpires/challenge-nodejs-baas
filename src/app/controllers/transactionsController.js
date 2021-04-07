const express = require("express");
const Transaction = require("../models/transaction");

const router = express.Router();

// list
router.get("/:accountId", async (req, res) => {
  try {
    const { accountId } = req.params;
    const transactions = await Transaction.find({
      account: accountId,
    }).populate(["person", "account"]);
    return res.json(transactions);
  } catch (error) {
    const { message } = error;
    return res.status(400).json({ message });
  }
});

// create
router.post("/", async (req, res) => {
  try {
    const transaction = await Transaction.create(req.body);
    return res.status(201).json(transaction);
  } catch (error) {
    const { message } = error;
    return res.status(400).json({ message });
  }
});

// P2P
router.post("/:accountId/p2p", async (req, res) => {
  try {
    const {
      accountIn,
      accountOut,
      personIn,
      personOut,
      date,
      value,
    } = req.body;

    // insert the transaction (cash-out)
    const insertOut = {
      person: accountOut,
      account: personOut,
      date,
      type: "D",
      value: value * -1,
      description: "Transferência",
    };
    await Transaction.create(insertOut);

    // insert the transaction (cash-in)
    const insertIn = {
      person: accountIn,
      account: personIn,
      date,
      type: "C",
      value,
      description: "Transferência",
    };
    await Transaction.create(insertIn);

    return res
      .status(201)
      .json({ message: "Transferência realizada com sucesso!" });
  } catch (error) {
    const { code, message } = error;
    return res.status(400).json({ code, message });
  }
});

module.exports = (app) => app.use("/transactions", router);
