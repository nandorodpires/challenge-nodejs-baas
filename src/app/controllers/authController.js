const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Account = require("../models/account");

const authConfig = require("../configs/auth");

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { agency, number, password } = req.body;

    const account = await await Account.findOne({ agency, number }).select(
      "+password"
    );

    // if person not exists
    if (!account) {
      return res.status(400).json({ message: "Conta não encontrada!" });
    }
    //
    if (!(await bcrypt.compare(password, account.password))) {
      return res.status(400).json({ message: "Senha inválida!" });
    }

    account.password = undefined;

    const token = jwt.sign({ id: account.id }, authConfig.secret, {
      expiresIn: 86400,
    });

    return res.json({ token });
  } catch (error) {
    const { code, message } = error;
    return res.status(400).json({ code, message });
  }
});

module.exports = (app) => app.use("/auth", router);
