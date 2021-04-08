const { Schema } = require("mongoose");
const bcrypt = require("bcryptjs");
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
  password: {
    type: String,
    required: true,
    select: false,
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

AccountSchema.pre("save", async function (next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

const Account = database.model("Account", AccountSchema);

module.exports = Account;
