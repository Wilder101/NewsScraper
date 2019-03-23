const express = require("express");

const db = require("../models");

const router = express.Router();

router.get("/articles", (req, res) => {
  db.Article
    .find({})
    .sort({ _id: -1 })
    .then(dbArticles => res.json(dbArticles))
    .catch(error => res.send(error));
});

// GET route to get an article and its notes
router.get("/articles/:id", (req, res) => {
  db.Article
    .findOne({
      _id: req.params.id
    })
    .populate("note")
    .then(dbArticle => res.json(dbArticle))
    .catch(error => res.send(error));
});

// POST route to add notes to article
router.post("/articles/:id", (req, res) => {
  db.Note
    .create(req.body)
    .then(dbNote => {
      db.Article.findOneAndUpdate({
        _id: req.params.id
      }, {
          "$push": { note: dbNote._id }
      }, {
        new: true
      })
      .populate("note")
      .then(() => res.json(dbNote))
      .catch(error => res.send(error));
    })
    .catch(error => res.send(error));
});

// DELETE route to delete a note
router.delete("/articles/:id/:noteId", (req, res) => {
  db.Note
    .deleteOne({
      _id: req.params.noteId
    })
    .then(() => {
      db.Article.findOneAndUpdate({
        _id: req.params.id
      }, {
        "$pull": { note: req.params.noteId }
      }, {
        new: true
      })
      .populate("note")
      .then(() => res.json(req.params.noteId))
      .catch(error => res.send(error));
    })
    .catch(error => res.send(error));;
});

module.exports = router;
