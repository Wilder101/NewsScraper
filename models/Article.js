const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define model's schema
const ArticleSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  author: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true,
    unique: true
  },
  link: {
    type: String,
    required: true,
    unique: true
  },
  image: {
    type: String,
    required: true,
    unique: true
  },
  note: [{
    type: Schema.Types.ObjectId,
    ref: "Note"
  }]
});

// Create model from schema
const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;