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
  createdA: {
    type: Date,
    default: Date.now,
  },
});

const Person = database.model("Person", PersonSchema);

module.exports = Person;
