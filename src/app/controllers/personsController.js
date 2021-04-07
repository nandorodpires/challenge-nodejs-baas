const express = require("express");

const router = express.Router();
const Person = require("../models/person");

// list
router.get("/", async (req, res) => {
  try {
    const people = await Person.find();
    return res.json(people);
  } catch (error) {
    const { code, message } = error;
    return res.status(400).json({ code, message });
  }
});

// show
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const person = await Person.findById(id);
    // case person does not exist
    if (!person) {
      return res.status(404).json({ message: "Registro não encontrado!" });
    }
    return res.json(person);
  } catch (error) {
    const { code, message } = error;
    return res.status(400).json({ code, message });
  }
});

// create
router.post("/", async (req, res) => {
  try {
    const { email } = req.body;
    // case email already exists
    if (await Person.findOne({ email })) {
      return res.status(400).json({ message: "Registro já cadastrado!" });
    }
    const person = await Person.create(req.body);
    person.password = undefined;
    return res.status(201).json(person);
  } catch (error) {
    const { code, message } = error;
    return res.status(400).json({ code, message });
  }
});

// update
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const person = await Person.findByIdAndUpdate(id, req.body, { new: true });
    // case person does not exist
    if (!person) {
      return res.status(404).json({ message: "Registro não encontrado!" });
    }
    return res.status(200).json(person);
  } catch (error) {
    const { code, message } = error;
    return res.status(400).json({ code, message });
  }
});

// delete
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Person.findByIdAndDelete(id);
    return res.json({ message: "Registro excluído com sucesso!" });
  } catch (error) {
    const { code, message } = error;
    return res.status(400).json({ code, message });
  }
});

module.exports = (app) => app.use("/people", router);
