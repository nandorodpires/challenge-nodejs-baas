const express = require("express");
const Account = require("../models/account");

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

module.exports = (app) => app.use("/accounts", router);
