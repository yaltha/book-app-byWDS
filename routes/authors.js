const express = require("express");
const router = express.Router();
const Author = require("../models/author");

// All Authors Route
router.get("/", async (req, res) => {
  //To show the result of the search w/ Regex
  let searchOptions = {};
  if (req.query.name != null && req.query.name !== "") {
    searchOptions.name = new RegExp(req.query.name, "i");
  }
  try {
    const authors = await Author.find(searchOptions);
    res.render("authors/index", {
      authors: authors,
      searchOptions: req.query
    });
  } catch {
    res.redirect("/");
  }
});

// New Authors Route
router.get("/new", (req, res) => {
  res.render("authors/new", { author: new Author() }); //only load the form of new author
});

// Create New Authors Route
router.post("/", async (req, res) => {
  const author = new Author({
    name: req.body.name
  });
  try {
    const newAuthor = await author.save();
    //res.redirect(`author/${newAuthor.id}`);
    res.redirect(`authors`);
  } catch {
    res.render("authors/new", {
      author: author,
      errorMessage: "Error creating author..!"
    });
  }
  /* ---Using Promise---
  author.save((err, newAuthor) => {
    if (err) {
      res.render("authors/new", {
        author: author,
        errorMessage: "Error creating author..!"
      });
    } else {
      //res.send(`author/${newAuthor.id}`);
      res.redirect(`authors`);
    }
  });
  */
});

module.exports = router;
