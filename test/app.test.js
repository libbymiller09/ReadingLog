const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');
const expect = chai.expect;

const { app, runServer, closeServer } = require('../app');
const { Book } = require('../models/Book');
const {TEST_DATABASE_URL} = require('../config');

chai.use(chaiHttp);

//function to generate random data for testing
function seedBookData() {
  console.info('seeding book data');
  const seedData = [];

  for (let i = 1; i<=10; i++) {
    seedData.push(generateBookData());
  }
  return Book.insertMany(seedData);
}

function generateTitle() {
  const titles = [
    'Harry Potter', 'Lord of the Rings', 'The Giver', 'A wrinkle in Time'];
    return title[Math.floor(Math.random() * title.length)];
}

function generateGoals() {
  const goals = ['1', '2', '5', '23'];
  const goal = goals[Math.floor(Math.random() * goals.lenght)];
  return {
    goal: goal
  };
}

function generateBookData() {
  return {
    title: faker.title.title(),
    author: faker.author.name(),
    genre: faker.genre.genre(),
    goals: [generateGoals()]
};

function tearDownDb() {
  console.warn('Deleting database');
  return mongoose.connection.dropDatabase();
}

// test for connection to server
describe('Books API resource', () => {

  before(function () {
    return runServer(TEST_DATABASE_URL);
  });

  beforeEach(function() {
    return seedBookData();
  });

  afterEach(function() {
    return tearDownDb();
  });

  after(function () {
    return closeServer();
  });

  describe('server', function() {
     it('verify that user has hit the root url, index.html', () => {
      chai.request(app)
        .get('/')
        .then(res => {
          expect(res).to.be.html;
          expect(res).to.have.status(200);
        });
    }); 
  });

  describe('GET endpoint', function() {
    it('should return all existing books', function() {
      let res; 
      return chai.request(app)
        .get('/books')
        .then(function(res) {
          res = _res;
          expect(res).to.have.status(200);
          expect(res.body.books).to.have.lengthOf.at.least(1);
          return Book.count();
        })
        .then(function(count) {
          expect(res.body.books).to.have.lengthOf(count);
        });
    });

  //POST requests
  describe('POST /books', () => {
    it('should create a new book entry', function(done) {
      const newBook = generateBookData();
      return (
        chai.request(app)
          .post('/books')
          .send(newBook)
          .then(function(res) {
            console.log(res.body);
            expect(res).to.have.status(200);
            expect(res.body).to.be.a('object');
            return Book.findById(res.body.id);
          })
          .then(function(book) {
            expect(book.title).to.equal(newBook.name);
          })
        );
      });
  })
      
  //PUT requests
  describe('PUT /books/:id', () => {
    it('should update book on PUT', function(done) {
      const updateBook = {
        title: 'updatedName'
      };

      return Book
        .findOne()
        .then(function(book) {
          updateBook.id = book.id;

      return
        chai.request(app)
          .put(`/books/${book.id}`)
          .send(updateBook);
      })
      .then(function(res) {
        expect(res).to.have.status(204);

        return Book.findById(updateBook.id);
        })
       .then(function(book) {
         expect(book.title).to.equal(updateBook.title);
       });
    });
  });
      
    //DELETE requests
  describe('DELETE /books/:id', () => {
    it('should delete book on DELETE', function() {
      let book;
      return Book 
        .findOne()
        .then(function(_book) {
          book = _book;
          return chai.request(app).delete(`/books/${book.id}`);
        })
        .then(function(res) {
          expect(res).to.have.status(204);
          return Book.findById(book.id);
        })
        .then(function(_book) {
          expect(_book).to.be.null;
        });
      });
    });
  })
})
}
