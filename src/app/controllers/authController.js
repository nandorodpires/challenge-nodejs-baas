const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Account = require("../models/account");

const authConfig = require("../configs/auth");

const router = express.Router();

/**
 * @api {post} /auth/login Login
 * @apiName Account login
 * @apigroup Auth
 * @apiVersion 1.0.0
 *
 * @apiParam {String} agency Number of agency
 * @apiParam {String} account Number of account
 * @apiParam {String} password Password
 *
 * @apiParamExample {json} Body Request Example
 * {
 *    "agency": 1234,
 *    "number": 123456,
 *    "password": "123456"
 * }
 *
 * @apiSuccessExample {json} Success
 * HTTP/1.1 201 Created:
 * {
 *    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNmYxOTE5OTRiNDc1NDQ1MGVmNThiMSIsImlhdCI6MTYxNzg5Mzk3OCwiZXhwIjoxNjE3OTgwMzc4fQ.dwTdeP-nXgOGsn1WJpgoHJcuH2CJ3lXJ26UaOE_DBCM"
 * }
 *
 * @apiErrorExample {json} Error
 * HTTP/1.1 400 Bad Request
 * {
 *    "message": "O campo agency é obrigatório!"
 * }
 *
 * HTTP/1.1 400 Bad Request
 * {
 *    "message": "Conta não encontrada!"
 * }
 *
 * HTTP/1.1 400 Bad Request
 * {
 *    "message": "Senha inválida!"
 * }
 */
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
