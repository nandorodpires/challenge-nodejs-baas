const { Schema } = require("mongoose");
const database = require("../../database");

const DocumentSchema = database.Schema({
  person: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  document: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Document = database.model("Document", DocumentSchema);

module.exports = Document;
