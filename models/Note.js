const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define model's schema
const NoteSchema = new Schema({
  author: {
    type: String,
    default: "Anonymous"
  },
  note: {
    type: String,
    required: true
  },
  dateCreated: {
    type: Date,
    default: Date.now
  }
});

// Create model from schema
const Note = mongoose.model("Note", NoteSchema);

module.exports = Note;