const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser());
// cors
app.use(cors());

// constrollers
require("./app/controllers/personsController")(app);
require("./app/controllers/accountsController")(app);
require("./app/controllers/transactionsController")(app);

app.listen(3333);
