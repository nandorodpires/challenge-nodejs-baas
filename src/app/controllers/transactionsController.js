const express = require("express");
const Transaction = require("../models/transaction");
const Account = require("../models/account");

const authMiddleware = require("../middlewares/auth");

const router = express.Router();

/**
 * @api {get} /transactions List
 * @apiName List
 * @apiGroup Transactions
 *
 * @apiHeader {String="Bearer :token"} Authorization Replace <code>:token</code> with supplied Auth Token
 *
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 * [
 * {
 *   "_id": "606e10c550ff6c2128718ca8",
 *   "person": "606e10267367a53ebc3b54dd",
 *   "account": "606e103c7367a53ebc3b54de",
 *   "date": "2021-04-07T00:00:00.000Z",
 *   "type": "C",
 *   "value": 6000,
 *   "description": "Depósito",
 *   "createdAt": "2021-04-07T20:06:29.257Z",
 *   "__v": 0
 * },
 * {
 *   "_id": "606f1a3cdf65a8484c68647a",
 *   "person": "606e10267367a53ebc3b54dd",
 *   "account": "606e103c7367a53ebc3b54de",
 *   "date": "2021-04-08T00:00:00.000Z",
 *   "type": "D",
 *   "value": -1000,
 *   "description": "Transferência",
 *   "createdAt": "2021-04-08T14:59:08.940Z",
 *   "__v": 0
 * }
 *]
 *
 * @apiErrorExample {json} Error
 * HTTP/1.1 401 Unauthorized
 * {
 *  "message": "Token inálido!"
 * }
 */
router.use(authMiddleware).get("/list", async (req, res) => {
  try {
    const { accountId } = req;
    const transactions = await Transaction.find({
      account: accountId,
    });
    return res.json(transactions);
  } catch (error) {
    const { message } = error;
    return res.status(400).json({ message });
  }
});

/**
 * @api {post} /transactions Create
 * @apiName Create
 * @apiGroup Transactions
 *
 * @apiParam {Strin} person ID of the person
 * @apiParam {String} account ID of the account
 * @apiParam {Strinf} date Date of transaction
 * @apiParam {String} type Type of transaction (Allow "C" or "D")
 * @apiParam {Double} value Value of the transaction
 * @apiParam {String} description Description of transaction
 *
 * @apiParamExample {json} Body Request
 * {
 *	  "person": "606e10267367a53ebc3b54dd",
 *	  "account": "606e103c7367a53ebc3b54de",
 *    "date": "2021-04-07",
 *    "type": "C",
 *    "value": "6000",
 *    "description": "Depósito"
 * }
 *
 * @apiSuccessExample {json} Success
 * HTTP/11.1 200 OK
 * {
 * }
 *
 * @apiErrorExample {json} Error
 * HTTP /1.1 400 Bad Request
 * {
 * }
 */
router.post("/", async (req, res) => {
  try {
    const transaction = await Transaction.create(req.body);
    return res.status(201).json(transaction);
  } catch (error) {
    const { message } = error;
    return res.status(400).json({ message });
  }
});

/**
 * @api {post} /transactions/p2p P2P transaction
 * @apiName P2P transaction
 * @apiGroup Transactions
 *
 * @apiHeader {String="Bearer :token"} Authorization Replace <code>:token</code> with supplied Auth Token
 *
 * @apiParam {String} person ID of the person that receive the transaction
 * @apiParam {String} account ID of the account that receive the transaction
 * @apiParam {Date} date Date of the transaction
 * @apiParam {Double} value Value of transaction
 * @apiParam {String} description Description of transaction
 *
 * @apiParamExample {json} Body Request
 * {
 *	  "person": "606f189894b4754450ef58b0",
 *    "account": "606f191994b4754450ef58b1",
 *    "date": "2021-04-08",
 *    "value": "1000",
 *    "description": "Transferência"
 * }
 *
 * @apiSuccessExemple {json} Success
 * HTTP/1.1 200 OK
 * {
 *    "message": "Transferência realizada com sucesso!"
 * }
 *
 * @apiErrorExample {json} Error
 * HTTP/1.1 400 Bad Request
 * {
 *    "message": "Falha ao realizar a transferência"
 * }
 */
router.use(authMiddleware).post("/p2p", async (req, res) => {
  try {
    const { person, account, date, value, description } = req.body;
    const { accountId } = req;

    // account user logged
    const accountLogged = await Account.findById(accountId);

    // cash out
    await Transaction.create({
      person: accountLogged.person,
      account: accountLogged.id,
      date,
      type: "D",
      value: value * -1,
      description,
    });

    // cash in
    await Transaction.create({
      person,
      account,
      date,
      type: "C",
      value,
      description,
    });

    return res
      .status(201)
      .json({ message: "Transferência realizada com sucesso!" });
  } catch (error) {
    const { code, message } = error;
    return res.status(400).json({ code, message });
  }
});

module.exports = (app) => app.use("/transactions", router);
