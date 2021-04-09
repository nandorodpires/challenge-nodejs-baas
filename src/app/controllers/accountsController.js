const express = require("express");
const mongoose = require("mongoose");
const Account = require("../models/account");
const Transaction = require("../models/transaction");
const authMiddleware = require("../middlewares/auth");

const router = express.Router();

/**
 * @api {get} /accounts List
 * @apiName GetAccounts
 * @apigroup Accounts
 * @apiVersion 1.0.0
 *
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 * [
 * {
 *   "_id": "606e103c7367a53ebc3b54de",
 *   "agency": 4321,
 *   "number": 5689965,
 *   "person": {
 *     "_id": "606e10267367a53ebc3b54dd",
 *     "name": "Fernando Rodrigues",
 *     "gender": "M",
 *     "birthDate": "1982-09-28T00:00:00.000Z",
 *     "email": "nandorodpires@gmail.com",
 *     "createdA": "2021-04-07T20:03:50.758Z",
 *      "__v": 0
 *    },
 *   "createdA": "2021-04-07T20:04:12.014Z",
 *   "__v": 0
 * }
 * ]
 *
 * @apiErrorExample {json} Error
 * HTTP/1.1 404 Not Found
 * {
 *    "message": "No register found"
 * }
 */
router.get("/", async (req, res) => {
  try {
    const accounts = await Account.find().populate("person");
    return res.json(accounts);
  } catch (error) {
    const { code, message } = error;
    return res.status(400).json({ code, message });
  }
});

/**
 * @api {post} /accounts Create
 * @apiName New Account
 * @apigroup Accounts
 * @apiVersion 1.0.0
 *
 * @apiParam {Number} agency Number of agency
 * @apiParam {Number} account Number of account
 * @apiParam {String} password Password
 * @apiParam {String} person ID of person
 *
 * @apiParamExample {json} Body Request Example
 * {
 *    "agency": 1234,
 *    "number": 123456,
 *    "password": "123456",
 *    "person": "606f189894b4754450ef58b0"
 * }
 *
 * @apiSuccessExample {json} Success
 * HTTP/1.1 201 Created:
 * {
 *  "_id": "606f191994b4754450ef58b1",
 *  "agency": 1234,
 *  "number": 123456,
 *  "person": "606f189894b4754450ef58b0",
 *  "createdA": "2021-04-08T14:54:17.997Z",
 *  "__v": 0
 * }
 *
 * @apiErrorExample {json} Error
 * HTTP/1.1 400 Bad Request
 * {
 *    "message": "O campo agency é obrigatório!"
 * }
 *
 */
router.post("/", async (req, res) => {
  try {
    const { person } = req.body;
    if (await Account.findOne({ person })) {
      return res
        .status(400)
        .json({ message: "Já existe uma conta cadastrada para esta pessoa!" });
    }
    const account = await Account.create(req.body);
    account.password = undefined;
    return res.status(201).json(account);
  } catch (error) {
    const { code, message } = error;
    return res.status(400).json({ code, message });
  }
});

/**
 * @api {get} /accounts/detail/:id Detail
 * @apiName Account
 * @apigroup Accounts
 * @apiVersion 1.0.0
 *
 * @apiParam {String} accountId ID of account
 *
 * @apiSuccessExample {json} Success
 * {
 * "_id": "606e103c7367a53ebc3b54de",
 * "agency": 4321,
 * "number": 5689965,
 * "person": {
 *   "_id": "606e10267367a53ebc3b54dd",
 *   "name": "Fernando Rodrigues",
 *   "gender": "M",
 *   "birthDate": "1982-09-28T00:00:00.000Z",
 *   "email": "nandorodpires@gmail.com",
 *   "createdA": "2021-04-07T20:03:50.758Z",
 *   "__v": 0
 * },
 * "createdA": "2021-04-07T20:04:12.014Z",
 * "__v": 0
 *}
 *
 * @apiErrorExample {json} Error
 * HTTP/1.1 400 Bad Request
 * {
 *    "message": "Conta não encontrada!"
 * }
 *
 */
router.get("/detail/:accountId", async (req, res) => {
  try {
    const { accountId } = req.params;
    const account = await Account.findById(accountId).populate("person");
    if (!account) {
      return res.status(400).json({ message: "Conta não encontrada!" });
    }
    return res.json(account);
  } catch (error) {
    const { code, message } = error;
    return res.status(400).json({ code, message });
  }
});

/**
 * @api {get} /balance Balance
 * @apiName Balance
 * @apigroup Accounts
 * @apiVersion 1.0.0
 *
 * @apiHeader {String="Bearer :token"} Authorization Replace <code>:token</code> with supplied Auth Token
 *
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 * {
 *    "balance": 1000
 * }
 *
 * @apiErrorExample {json} Unauthorized
 * HTTP/1.1 401 Unauthorized
 * {
 *    "message": "Token inálido!"
 * }
 *
 */
router.use(authMiddleware).get("/balance", async (req, res) => {
  try {
    const { accountId } = req;
    // return the account balance (only the value)
    const balance = await Transaction.aggregate([
      { $match: { account: mongoose.Types.ObjectId(accountId) } },
      { $group: { _id: accountId, balance: { $sum: "$value" } } },
    ]).then((row) => row[0].balance);
    return res.json({ balance });
  } catch (error) {
    const { code, message } = error;
    return res.status(400).json({ code, message });
  }
});

module.exports = (app) => app.use("/accounts", router);
