const express = require("express");
const fileUpload = require("express-fileupload");
const Document = require("../models/document");
const Account = require("../models/account");
const authMiddleware = require("../middlewares/auth");

const router = express.Router();
router.use(authMiddleware);
router.use(fileUpload());

router.post("/", async (req, res) => {
  try {
    const { files } = req;
    if (!files || Object.keys(files).length === 0) {
      return res.status(400).json({ message: "Nenhum arquivo enviado!" });
    }
    const path = `${__dirname}/../../docs/${files.document.name}`;
    // return res.send(path);
    files.document.mv(path, async (err) => {
      if (err) {
        return res.status(500).send(err);
      }

      const account = await Account.findById(req.accountId);
      await Document.create({
        person: account.person,
        document: path,
      });

      return res.json({ message: "Documento enviado com sucesso!" });
    });
  } catch (error) {
    const { code, message } = error;
    return res.status(400).json({ code, message });
  }
});

module.exports = (app) => app.use("/documents", router);
