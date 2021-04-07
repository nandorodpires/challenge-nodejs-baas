const { Schema } = require("mongoose");
const database = require("../../database");

const TransactionSchema = database.Schema({
  person: {
    type: Schema.Types.ObjectId,
    ref: "Person",
    required: true,
  },
  account: {
    type: Schema.Types.ObjectId,
    ref: "Account",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Transaction = database.model("Transaction", TransactionSchema);

module.exports = Transaction;
