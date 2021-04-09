const express = require("express");

const router = express.Router();
const Person = require("../models/person");

/**
 * @api {get} /people List
 * @apiName People
 * @apigroup People
 * @apiVersion 1.0.0
 *
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 * [
 * {
 *   "_id": "606e10267367a53ebc3b54dd",
 *   "name": "Paulo de Nobrega",
 *   "gender": "M",
 *   "birthDate": "1982-09-28T00:00:00.000Z",
 *   "email": "paulonobraga@gmail.com",
 *   "createdA": "2021-04-07T20:03:50.758Z",
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
    const people = await Person.find();
    return res.json(people);
  } catch (error) {
    const { code, message } = error;
    return res.status(400).json({ code, message });
  }
});

/**
 * @api {get} /people/:id Detail
 * @apiName Detail
 * @apigroup People
 * @apiVersion 1.0.0
 *
 * @apiParam {String} id ID of account
 *
 * @apiSuccessExample {json} Success
 * {
 *    "_id": "606caeaa9a0a022060c143c5",
 *    "name": "Maria da Silva",
 *    "gender": "F",
 *    "birthDate": "1991-04-27T00:00:00.000Z",
 *    "email": "mariadasilva@gmail.com",
 *    "createdA": "2021-04-06T18:55:38.930Z",
 *    "__v": 0
 * }
 *
 * @apiErrorExample {json} Error
 * HTTP/1.1 400 Bad Request
 * {
 *    "message": "Pessoa não encontrada!"
 * }
 *
 */
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

/**
 * @api {post} /people Create
 * @apiName New People
 * @apigroup People
 * @apiVersion 1.0.0
 *
 * @apiParam {String} name Name of the people
 * @apiParam {String} gender Gender of the people
 * @apiParam {String} birthday Birthday of the people
 * @apiParam {String} email Email of the people
 *
 * @apiParamExample {json} Body Request Example
 * {
 *	"name": "Maria da Silva",
 *	"gender": "F",
 *	"birthDate": "1991-04-27",
 *	"email": "rafaelarh@yahoo.com.br"
 * }
 *
 * @apiSuccessExample {json} Success
 * HTTP/1.1 201 Created:
 *
 * @apiErrorExample {json} Error
 * HTTP/1.1 400 Bad Request
 * {
 *    "message": "O campo name é obrigatório!"
 * }
 *
 */
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

/**
 * @api {put} /people Alter
 * @apiName Alter Person
 * @apiGroup People
 *
 * @apiParamExample {json} Body Request
 * {
 *    "name": "Fulano de Tal"
 * }
 *
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 * {}
 *
 * @apiErrorExample {json} Error
 * HTTP/1.1 400 Bad Request
 * {}
 *
 */
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

/**
 * @api {delete} /people/:id Delete
 * @apiName Delete
 * @apiGroup People
 *
 * @apiParam {String} id ID of the person
 *
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 * {
 *    "message": "Registro excluído com sucesso!"
 * }
 *
 * @apiErrorExample {json} Error
 * HTTP/1.1 400 Bad Request
 * {
 *    "message": "Falha ao excluir o registro!"
 * }
 */
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
