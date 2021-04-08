const express = require("express");
const Transaction = require("../models/transaction");
const Account = require("../models/account");

const authMiddleware = require("../middlewares/auth");

const router = express.Router();

// list
router.get("/list", async (req, res) => {
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
router.use(authMiddleware).post("/p2p", async (req, res) => {
  try {
    const { person, account, date, value, description } = req.body;
    const { accountId } = req;

    // account user logged
    const accountLogged = await Account.findById(accountId);

    // cash out
    await Transaction.create({
      person: accountLogged.person,
      account: accountLogged.id,
      date,
      type: "D",
      value: value * -1,
      description,
    });

    // cash in
    await Transaction.create({
      person,
      account,
      date,
      type: "C",
      value,
      description,
    });

    return res
      .status(201)
      .json({ message: "Transferência realizada com sucesso!" });
  } catch (error) {
    const { code, message } = error;
    return res.status(400).json({ code, message });
  }
});

module.exports = (app) => app.use("/transactions", router);
