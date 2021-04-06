const bcrypt = require("bcryptjs");
const database = require("../../database");

const PersonSchema = database.Schema({
  name: {
    type: String,
    require: true,
  },
  gender: {
    type: String,
    required: false,
  },
  birthDate: {
    type: Date,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  createdA: {
    type: Date,
    default: Date.now,
  },
});

PersonSchema.pre("save", async function (next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

const Person = database.model("Person", PersonSchema);

module.exports = Person;
