const express = require("express");

const router = express.Router();

router.get("/:accountId", async (req, res) =>
  res.json({ message: "List os transactions" })
);

module.exports = (app) => app.use("/transactions", router);
