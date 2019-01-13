const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const path = require("path");
const { ObjectID } = require("mongodb");
const bodyParser = require('body-parser');


//load mongoose schema for books
require("../models/Book");
const Book = mongoose.model("books");

//middleware for the bodyparser
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

//book index page

//need to find a way to save the response data
//from here and export it to client.js file
//or write a similar function in client.js file

router.get("/", (req, res) => {
  Book.find()
    .then(books => {
      res.sendFile("index.html", { root: "./views/" });
    });
});

// router.get("/", (req, res) => {
//   Book.find().then(books => {
//     res.json(
//       books.map(book => {
//         return {
//           id: book._id,
//           title: book.title,
//           author: book.author,
//           genre: book.genre,
//           goalPages: book.goalPages,
//           goalChapters: book.goalChapters
//         };
//       })
//     );
//   });
//   // .then()
//   // res.sendFile('index.html', { root: './views' })
//   // .catch(err => {
//   //   console.error(err);
//   // })
// });

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

//process form
router.post("/", (req, res) => {
  let newBook = new Book({
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
    goalPages: req.body.goalPages,
    goalChapters: req.body.goalChapters
  });
  newBook.save().then(book => {
    // res.send(book);
    res.redirect("/books");
  });
});

//process update form
router.put("/:id", (req, res) => {
  let id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  Book.findByIdAndUpdate({
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
    goalPages: req.body.goalPages,
    goalChapters: req.body.goalChapters
  });
  book.save().then(book => {
    res.redirect("/books");
  });
});

router.delete("/:id", (req, res) => {
  let id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  Book.findByIdAndRemove(id).then(() => {
    res.redirect("/books");
  });
});

module.exports = router;
