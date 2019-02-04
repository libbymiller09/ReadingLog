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

// route to add book form
router.get("/add", (req, res) => {
  res.sendFile("add.html", { root: "./views/books/" });
});

// route to update book form
router.get("/update", (req, res) => {
  Book.findOne({
    // _id: req.params.id
    id: req.params.id
  }).then(book => {
    res.sendFile("update.html", { root: "./views/books/" });
  });
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
 console.log(req.body);
 book.save()
  res.redirect('/');
});

//process update form
router.put("/:id", (req, res) => {
  const toUpdate = {};
  const updateableFields = ["title", "author", "genre", "goalPages", "goalChapters"];
  
  updateableFields.forEach(field => {
    if (field in req.body) {
      toUpdate[field] = req.body[field];
    }
  });
  Book.findByIdAndUpdate(req.params.id, {$set: toUpdate}, {new: true})
    .then(book => res.status(204).end())
    .catch(err => res.status(500).json({ message: "Internal server error" }));
});


router.delete("/:id", (req, res) => {
  // Book  
  //   .findByIdAndRemove(req.params.id)
  //   .then(() => {
  //     res.status(204).end();
  //   });

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
