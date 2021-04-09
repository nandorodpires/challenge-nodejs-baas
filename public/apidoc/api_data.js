define({ "api": [
  {
    "type": "get",
    "url": "/accounts/detail/:id",
    "title": "Detail",
    "name": "Account",
    "group": "Accounts",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "accountId",
            "description": "<p>ID of account</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "{\n\"_id\": \"606e103c7367a53ebc3b54de\",\n\"agency\": 4321,\n\"number\": 5689965,\n\"person\": {\n  \"_id\": \"606e10267367a53ebc3b54dd\",\n  \"name\": \"Fernando Rodrigues\",\n  \"gender\": \"M\",\n  \"birthDate\": \"1982-09-28T00:00:00.000Z\",\n  \"email\": \"nandorodpires@gmail.com\",\n  \"createdA\": \"2021-04-07T20:03:50.758Z\",\n  \"__v\": 0\n},\n\"createdA\": \"2021-04-07T20:04:12.014Z\",\n\"__v\": 0\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error",
          "content": "HTTP/1.1 400 Bad Request\n{\n   \"message\": \"Conta não encontrada!\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/app/controllers/accountsController.js",
    "groupTitle": "Accounts"
  },
  {
    "type": "get",
    "url": "/balance",
    "title": "Balance",
    "name": "Balance",
    "group": "Accounts",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "allowedValues": [
              "\"Bearer :token\""
            ],
            "optional": false,
            "field": "Authorization",
            "description": "<p>Replace <code>:token</code> with supplied Auth Token</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n   \"balance\": 1000\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Unauthorized",
          "content": "HTTP/1.1 401 Unauthorized\n{\n   \"message\": \"Token inálido!\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/app/controllers/accountsController.js",
    "groupTitle": "Accounts"
  },
  {
    "type": "get",
    "url": "/accounts",
    "title": "List",
    "name": "GetAccounts",
    "group": "Accounts",
    "version": "1.0.0",
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n[\n{\n  \"_id\": \"606e103c7367a53ebc3b54de\",\n  \"agency\": 4321,\n  \"number\": 5689965,\n  \"person\": {\n    \"_id\": \"606e10267367a53ebc3b54dd\",\n    \"name\": \"Fernando Rodrigues\",\n    \"gender\": \"M\",\n    \"birthDate\": \"1982-09-28T00:00:00.000Z\",\n    \"email\": \"nandorodpires@gmail.com\",\n    \"createdA\": \"2021-04-07T20:03:50.758Z\",\n     \"__v\": 0\n   },\n  \"createdA\": \"2021-04-07T20:04:12.014Z\",\n  \"__v\": 0\n}\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error",
          "content": "HTTP/1.1 404 Not Found\n{\n   \"message\": \"No register found\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/app/controllers/accountsController.js",
    "groupTitle": "Accounts"
  },
  {
    "type": "post",
    "url": "/accounts",
    "title": "Create",
    "name": "New_Account",
    "group": "Accounts",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "agency",
            "description": "<p>Number of agency</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "account",
            "description": "<p>Number of account</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "person",
            "description": "<p>ID of person</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Body Request Example",
          "content": "{\n   \"agency\": 1234,\n   \"number\": 123456,\n   \"password\": \"123456\",\n   \"person\": \"606f189894b4754450ef58b0\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 201 Created:\n{\n \"_id\": \"606f191994b4754450ef58b1\",\n \"agency\": 1234,\n \"number\": 123456,\n \"person\": \"606f189894b4754450ef58b0\",\n \"createdA\": \"2021-04-08T14:54:17.997Z\",\n \"__v\": 0\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error",
          "content": "HTTP/1.1 400 Bad Request\n{\n   \"message\": \"O campo agency é obrigatório!\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/app/controllers/accountsController.js",
    "groupTitle": "Accounts"
  },
  {
    "type": "post",
    "url": "/auth/login",
    "title": "Login",
    "name": "Account_login",
    "group": "Auth",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "agency",
            "description": "<p>Number of agency</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "account",
            "description": "<p>Number of account</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Body Request Example",
          "content": "{\n   \"agency\": 1234,\n   \"number\": 123456,\n   \"password\": \"123456\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 201 Created:\n{\n   \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNmYxOTE5OTRiNDc1NDQ1MGVmNThiMSIsImlhdCI6MTYxNzg5Mzk3OCwiZXhwIjoxNjE3OTgwMzc4fQ.dwTdeP-nXgOGsn1WJpgoHJcuH2CJ3lXJ26UaOE_DBCM\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error",
          "content": "HTTP/1.1 400 Bad Request\n{\n   \"message\": \"O campo agency é obrigatório!\"\n}\n\nHTTP/1.1 400 Bad Request\n{\n   \"message\": \"Conta não encontrada!\"\n}\n\nHTTP/1.1 400 Bad Request\n{\n   \"message\": \"Senha inválida!\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/app/controllers/authController.js",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "/documents",
    "title": "Send",
    "name": "New_Account",
    "group": "Documents",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "File",
            "optional": false,
            "field": "Document",
            "description": "<p>File document</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Body Request Example",
          "content": "{\n   \"document\": \"[file document]\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 201 Created:\n{\n   \"message\": \"Documento enviado com sucesso!\",\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error",
          "content": "HTTP/1.1 400 Bad Request\n{\n   \"message\": \"Falha ao enviar documento!\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/app/controllers/documentsController.js",
    "groupTitle": "Documents"
  },
  {
    "type": "put",
    "url": "/people",
    "title": "Alter",
    "name": "Alter_Person",
    "group": "People",
    "parameter": {
      "examples": [
        {
          "title": "Body Request",
          "content": "{\n   \"name\": \"Fulano de Tal\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error",
          "content": "HTTP/1.1 400 Bad Request\n{}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/app/controllers/peopleController.js",
    "groupTitle": "People"
  },
  {
    "type": "delete",
    "url": "/people/:id",
    "title": "Delete",
    "name": "Delete",
    "group": "People",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>ID of the person</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n   \"message\": \"Registro excluído com sucesso!\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error",
          "content": "HTTP/1.1 400 Bad Request\n{\n   \"message\": \"Falha ao excluir o registro!\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/app/controllers/peopleController.js",
    "groupTitle": "People"
  },
  {
    "type": "get",
    "url": "/people/:id",
    "title": "Detail",
    "name": "Detail",
    "group": "People",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>ID of account</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "{\n   \"_id\": \"606caeaa9a0a022060c143c5\",\n   \"name\": \"Maria da Silva\",\n   \"gender\": \"F\",\n   \"birthDate\": \"1991-04-27T00:00:00.000Z\",\n   \"email\": \"mariadasilva@gmail.com\",\n   \"createdA\": \"2021-04-06T18:55:38.930Z\",\n   \"__v\": 0\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error",
          "content": "HTTP/1.1 400 Bad Request\n{\n   \"message\": \"Pessoa não encontrada!\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/app/controllers/peopleController.js",
    "groupTitle": "People"
  },
  {
    "type": "post",
    "url": "/people",
    "title": "Create",
    "name": "New_People",
    "group": "People",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the people</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "gender",
            "description": "<p>Gender of the people</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "birthday",
            "description": "<p>Birthday of the people</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the people</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Body Request Example",
          "content": "{\n\t\"name\": \"Maria da Silva\",\n\t\"gender\": \"F\",\n\t\"birthDate\": \"1991-04-27\",\n\t\"email\": \"rafaelarh@yahoo.com.br\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 201 Created:",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error",
          "content": "HTTP/1.1 400 Bad Request\n{\n   \"message\": \"O campo name é obrigatório!\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/app/controllers/peopleController.js",
    "groupTitle": "People"
  },
  {
    "type": "get",
    "url": "/people",
    "title": "List",
    "name": "People",
    "group": "People",
    "version": "1.0.0",
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n[\n{\n  \"_id\": \"606e10267367a53ebc3b54dd\",\n  \"name\": \"Paulo de Nobrega\",\n  \"gender\": \"M\",\n  \"birthDate\": \"1982-09-28T00:00:00.000Z\",\n  \"email\": \"paulonobraga@gmail.com\",\n  \"createdA\": \"2021-04-07T20:03:50.758Z\",\n  \"__v\": 0\n}\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error",
          "content": "HTTP/1.1 404 Not Found\n{\n   \"message\": \"No register found\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/app/controllers/peopleController.js",
    "groupTitle": "People"
  },
  {
    "type": "post",
    "url": "/transactions",
    "title": "Create",
    "name": "Create",
    "group": "Transactions",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Strin",
            "optional": false,
            "field": "person",
            "description": "<p>ID of the person</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "account",
            "description": "<p>ID of the account</p>"
          },
          {
            "group": "Parameter",
            "type": "Strinf",
            "optional": false,
            "field": "date",
            "description": "<p>Date of transaction</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>Type of transaction (Allow &quot;C&quot; or &quot;D&quot;)</p>"
          },
          {
            "group": "Parameter",
            "type": "Double",
            "optional": false,
            "field": "value",
            "description": "<p>Value of the transaction</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Description of transaction</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Body Request",
          "content": "{\n\t  \"person\": \"606e10267367a53ebc3b54dd\",\n\t  \"account\": \"606e103c7367a53ebc3b54de\",\n   \"date\": \"2021-04-07\",\n   \"type\": \"C\",\n   \"value\": \"6000\",\n   \"description\": \"Depósito\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/11.1 200 OK\n{\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error",
          "content": "HTTP /1.1 400 Bad Request\n{\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/app/controllers/transactionsController.js",
    "groupTitle": "Transactions"
  },
  {
    "type": "get",
    "url": "/transactions",
    "title": "List",
    "name": "List",
    "group": "Transactions",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "allowedValues": [
              "\"Bearer :token\""
            ],
            "optional": false,
            "field": "Authorization",
            "description": "<p>Replace <code>:token</code> with supplied Auth Token</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n[\n{\n  \"_id\": \"606e10c550ff6c2128718ca8\",\n  \"person\": \"606e10267367a53ebc3b54dd\",\n  \"account\": \"606e103c7367a53ebc3b54de\",\n  \"date\": \"2021-04-07T00:00:00.000Z\",\n  \"type\": \"C\",\n  \"value\": 6000,\n  \"description\": \"Depósito\",\n  \"createdAt\": \"2021-04-07T20:06:29.257Z\",\n  \"__v\": 0\n},\n{\n  \"_id\": \"606f1a3cdf65a8484c68647a\",\n  \"person\": \"606e10267367a53ebc3b54dd\",\n  \"account\": \"606e103c7367a53ebc3b54de\",\n  \"date\": \"2021-04-08T00:00:00.000Z\",\n  \"type\": \"D\",\n  \"value\": -1000,\n  \"description\": \"Transferência\",\n  \"createdAt\": \"2021-04-08T14:59:08.940Z\",\n  \"__v\": 0\n}\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error",
          "content": "HTTP/1.1 401 Unauthorized\n{\n \"message\": \"Token inálido!\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/app/controllers/transactionsController.js",
    "groupTitle": "Transactions"
  },
  {
    "type": "post",
    "url": "/transactions/p2p",
    "title": "P2P transaction",
    "name": "P2P_transaction",
    "group": "Transactions",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "allowedValues": [
              "\"Bearer :token\""
            ],
            "optional": false,
            "field": "Authorization",
            "description": "<p>Replace <code>:token</code> with supplied Auth Token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "person",
            "description": "<p>ID of the person that receive the transaction</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "account",
            "description": "<p>ID of the account that receive the transaction</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "date",
            "description": "<p>Date of the transaction</p>"
          },
          {
            "group": "Parameter",
            "type": "Double",
            "optional": false,
            "field": "value",
            "description": "<p>Value of transaction</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Description of transaction</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Body Request",
          "content": "{\n\t  \"person\": \"606f189894b4754450ef58b0\",\n   \"account\": \"606f191994b4754450ef58b1\",\n   \"date\": \"2021-04-08\",\n   \"value\": \"1000\",\n   \"description\": \"Transferência\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error",
          "content": "HTTP/1.1 400 Bad Request\n{\n   \"message\": \"Falha ao realizar a transferência\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/app/controllers/transactionsController.js",
    "groupTitle": "Transactions"
  }
] });
