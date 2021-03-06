const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');

const should = chai.should();
const expect = chai.expect;

const { app, runServer, closeServer } = require('../app');
const { books } = require("../models/Book");
const Book = mongoose.model("books");
const { TEST_DATABASE_URL } = require('../config/config');
chai.use(chaiHttp);

describe('/books/add endpoint', function() {
  it('should verifty user has reached the add page', function() {
    chai.request(app)
        .get('/books/add')
        .then(res => {
          expect(res).to.be.html;
          expect(res).to.have.status(200);
        });
  });
});

describe('/books/update endpoint', function() {
  it('should verifty user has reached the update page', function() {
    chai.request(app)
    .get('/books/update')
    .then(res => {
      expect(res).to.be.html;
      expect(res).to.have.status(200);
    });
  });
});

describe('GET endpoint', function() {
  it('Should return all books', function() {
    let res;
    return chai.request(app).get('/')
      .then(_res => {
        res = _res;
        expect(res).to.have.status(200);
      })
  });

  it('should GET book by id', function() {
    let resBook;
    return chai.request(app).get('/')
      .then(res => {
        expect(res).to.have.status(200);
      })
      resBook = res.body;
      return Book.findById(resBook.id);
  })
});

describe('POST endpoint', function() {
  it('should add a new book', function() {
    let book = {
      title : 'new title',
      author : 'new author',
      genre : 'new genre',
      goalPages : 'new goalPages',
      goalChapters : 'new goalChapters'
    }
    return chai.request(app)
        .post('/books')
        .send(book)
        .then(function(res) {
          expect(res).to.have.status(200);
          expect(res.body).to.be.a('object');
        })
    })
});

describe('PUT endpoint', function() {
  it('Should update book', function() {
    let updatedbook = {
      id: '1234',
      title: 'The Giver',
      author: 'Lois Lowry',
      genre: 'fiction',
      goalPages: '38',
      goalChapters: '4'
    };
    return (
      chai.request(app)
        .get("/books")
        .then(function(res) {
          return chai
            .request(app)
            .put(`/books/${updatedbook.id}`)
            .send(updatedbook);
        })
    )
  });
});

describe('DELETE endpoint', function() {
  it('should delete a book by its id', function() {
      let book;

      return Book
        .findOne()
        .then(_book => {
          book = _book;
          return chai.request(app).delete(`/books/${book.id}`)
        })
        .then(res => {
          expect(res).to.have.status(204);
          return Book.findById(book.id);
        })
        .then(_book => {
          expect(_book).to.be.null;
        });
  });
});
