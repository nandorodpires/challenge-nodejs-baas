const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(bodyParser());
// cors
app.use(cors());

// apidoc
app.use(
  "/apidoc",
  express.static(path.resolve(__dirname, "..", "public", "apidoc"))
);

// constrollers
require("./app/controllers/authController")(app);
require("./app/controllers/peopleController")(app);
require("./app/controllers/accountsController")(app);
require("./app/controllers/transactionsController")(app);
require("./app/controllers/documentsController")(app);

app.listen(3333);
