
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const path = require("path");
const { ObjectID } = require("mongodb");
require('mongoose').Types.ObjectId;
const bodyParser = require('body-parser');

const { runServer, closeServer } = require('../app');

//load mongoose schema for books
const { books } = require("../models/Book");
const Book = mongoose.model("books");

//middleware for the bodyparser
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json( { type: "*/*" } ));
let urlencodedParser = bodyParser.json();

// route to add book form
router.get("/add", (req, res) => {
  res.sendFile("add.html", { root: "./views/books/" });
});

// route to update book form
router.get("/update", (req, res) => {
  // Book.findOne({
  //   _id: req.params.id
  //   // id: req.params.id
  // }).then(book => {
    res.sendFile("update.html", { root: "./views/books/" });
  // });
});

//route to landing page
router.get('/about', (req, res) => {
  res.sendFile('about.html', { root: './views/books/' });
});

//Post request for add form
router.post("/", (req, res) => {
  
 const book = new Book({
   title: req.body.title,
   author: req.body.author,
   genre: req.body.genre,
   goalPages: req.body.goalPages,
   goalChapters: req.body.goalChapters
 });
  book.save()
  res.redirect('/');
});

//add ensure authenticated once finshed to all routes for books
// route for get request--all books page
router.get("/", (req, res) => {
  Book.find()
    .then(books => {
      res.json({ books })
    }, (e) => {
      res.status(400).send(e)
    })
});

router.get("/:id", (req, res) => {
  Book  
    .findById(req.params.id)
    .then(book => res.json(book.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'something went wrong' });
    });
});

//process update form
router.put("/:id", (req, res) => {
  if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
    res.status(400).json({
      error: 'Request path id and request body id values must match'
    });
  }
  const toUpdate = {};
  const updateableFields = ["title", "author", "genre", "goalPages", "goalChapters"];
  
  updateableFields.forEach(field => {
    if (field in req.body) {
      toUpdate[field] = req.body[field];
    }
  });

  Book
    .findByIdAndUpdate(req.params.id, {$set: toUpdate}, {new: true})
    .then(toUpdate => res.status(204).end())
    .catch(err => res.status(500).json({ message: "Internal server error" }));
});

router.delete("/:id", (req, res) => {
  Book  
    .findByIdAndDelete(req.params.id)
      .then(() => {
        res.status(204).json({ message: 'success' });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'not successful' });
    });
});

module.exports = router;
