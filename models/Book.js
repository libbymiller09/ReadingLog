const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const {User} = require('./User');

const Schema = mongoose.Schema;

//create schema
const BookSchema = new Schema({
  // _id: { 
  //   type: Schema.Types.ObjectId 
  // },
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
    type: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    required: false
  }
});

BookSchema.methods.serialize = function() {
  return {
    id: this._id,
    title: this.title,
    author: this.author,
    genre: this.genre,
    goalPages: this.goalPages,
    goalChapters: this.goalChapters
  };
};

const Books = mongoose.model('books', BookSchema);

module.exports = {Books};