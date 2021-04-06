const express = require("express");

const router = express.Router();

// home
router.get("/", (req, res) => {
  res.json({ message: "API is running..." });
});

module.exports = router;
