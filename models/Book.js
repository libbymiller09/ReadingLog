const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema
const BookSchema = new Schema({
  title: {
    type: String,
    required: false
  },
  author: {
    type: String,
    required: false
  },
  genre: {
    type: String,
    required: false
  },
  goalPages: {
    type: String,
    required: false
  },
  goalChapters: {
    type: String,
    required: false
  },
  user: {
    type: String,
    required: false
  }
});

mongoose.model('books', BookSchema);