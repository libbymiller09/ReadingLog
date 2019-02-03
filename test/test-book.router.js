const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');

const should = chai.should();
const expect = chai.expect;

const { app, runServer, closeServer } = require('../app');
const { Book } = require('../models/Book');
const { TEST_DATABASE_URL } = require('../config/config');


chai.use(chaiHttp);

describe('GET endpoint', function() {
  it('Should return all books', function() {
    let res;
    return chai.request(app).get('/')
      .then(_res => {
        res = _res;
        expect(res).to.have.status(200);
        expect(res.body).to.have.lengthOf.at.least(1);
        return Books.count();
      })
      .then(count => {
        expect(res.body).to.have.lengthOf(count);
      });
  });
});

describe('POST endpoint', function() {
  it('should add a new book', function() {
    const newBookEntry = {
      book_id: book._id, 
      title : faker.lorem.words(),
      author : faker.lorem.words(),
      genre : faker.lorem.word(),
      goalPages : faker.lorem.word(),
      goalChapters : faker.lorem.word()
    };
    return chai.request(app)
        .post('/')
        .send(newBookEntry)
        .then(function(res) {
          console.log(res.body);
          expect(res).to.have.status(200);
          return Books.findById(res.body.id);
          // expect(res.body).to.be.a('object');
          // expect(res.body).to.deep.equal(Object.assign(newBookEntry, {id: res.body.id}));
          // done();
        })
        .then(book => {
          expect(book.title).to.equal(newBookEntry.title);
        })
    })
});

describe('PUT endpoint', function() {
  it('Should update book', function() {
    const updateBook = {
      title: 'The Giver',
      author: 'Lois Lowry',
      goalChapters: '4'
    };
    return Books.findOne()
      .then(book => {
        updateBook.id = book.id;
      
        return chai.request(app)
        .put(`/${updateBook.id}`)
        .send(updateBook)
      })
      .then(res => {
        expect(res).to.have.status(204);
        return Books.findById(updateBook.id)
      })
      .then(book => {
        expect(book.title).to.equal(updateBook.title);
      });
  });
});

describe('DELETE endpoint', function() {
  it('should delete a book by its id', function() {
    let book;
    return Books.findOne()
      .then(_book => {
        book = _book;
        return chai.request(app).delete(`/${book.id}`)
      })
      .then(res => {
        expect(res).to.have.status(204);
        return Books.findById(book.id);
      })
      .then(_book => {
        expect(_book).to.be.null;
      });
  });
});
