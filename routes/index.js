const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const db = require("../models");

const router = express.Router();

// GET route for homepage
router.get("/", (req, res) => {
  db.Article
    .find({})
    .sort({ _id: -1 })
    .then(dbArticles => res.render("index", {
      dbArticles: dbArticles,
      homeActive: true,
      commentedActive: false
    }))
    .catch(error => res.send(error));
});

// GET route for articles with comments
router.get("/commented", (req, res) => {
  db.Article
    .find({})
    .sort({ _id: -1 })
    .populate("note")
    .where("note").ne([])
    .then(dbArticles => res.render("index", {
      dbArticles: dbArticles,
      homeActive: false,
      commentedActive: true
    }))
    .catch(error => res.send(error));
});

// GET route to scrape news
router.get("/scrape", (req, res) => {
  axios
    .get("https://techcrunch.com/")
    .then(response => {
      const $ = cheerio.load(response.data);
      
      $(".post-block").each((i, element) => {
        const article = {};

        article.title = $(element).children("header").children("h2").find("a").text().trim();
        article.author = $(element).children("header").children("div").find("a").text().trim();
        article.summary = $(element).children("div").text().trim();
        article.link = $(element).children("header").children("h2").find("a").attr("href").trim();
        article.image = $(element).children("footer").find("img").attr("src").trim();

        db.Article
          .create(article)
          .then(dbArticle => console.log(dbArticle))
          .catch(error => console.log(error));
      });

      res.redirect("/");
    })
    .catch(error => res.send(error));
});

module.exports = router;
