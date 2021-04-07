const { Schema } = require("mongoose");
const database = require("../../database");

const AccountSchema = database.Schema({
  agency: {
    type: Number,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  person: {
    type: Schema.Types.ObjectId,
    ref: "Person",
  },
  createdA: {
    type: Date,
    default: Date.now,
  },
});

const Account = database.model("Account", AccountSchema);

module.exports = Account;
