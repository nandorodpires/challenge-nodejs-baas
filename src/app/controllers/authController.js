const express = require("express");
const bcrypt = require("bcryptjs");
const Person = require("../models/person");

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const person = await Person.findOne({ email }).select("+password");
    // if person not exists
    if (!person) {
      return res.status(400).json({ message: "Pessoa não encontrada!" });
    }
    //
    if (!(await bcrypt.compare(password, person.password))) {
      return res.status(400).json({ message: "Senha inválida!" });
    }

    return res.json(person);
  } catch (error) {
    const { code, message } = error;
    return res.status(400).json({ code, message });
  }
});

module.exports = (app) => app.use("/auth", router);
