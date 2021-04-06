const express = require("express");

const personsController = require("./app/controllers/personsController");

const router = express.Router();

// home
router.get("/", (req, res) => {
  res.json({ message: "API is running..." });
});

// Persons
router.get("/persons", (req, res) => res.json(personsController.index()));
router.get("/persons/:id", (req, res) => res.json(personsController.show()));
router.post("/persons", (req, res) => res.json(personsController.create()));
router.put("/persons/:id", (req, res) => res.json(personsController.update()));
router.delete("/persons/:id", (req, res) =>
  res.json(personsController.delete())
);

module.exports = router;
