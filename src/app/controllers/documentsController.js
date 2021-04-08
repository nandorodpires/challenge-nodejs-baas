const express = require("express");
const authMiddleware = require("../middlewares/auth");

const router = express.Router();
router.use(authMiddleware);

router.post("/", async (req, res) => {
  try {
    return res.json({});
  } catch (error) {
    const { code, message } = error;
    return res.status(400).json({ code, message });
  }
});

module.exports = (app) => app.use("/documents", router);
