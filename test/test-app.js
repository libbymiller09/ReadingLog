const chai = require('chai');
const chaiHttp = require('chai-http');
// const faker = require('faker');
const mongoose = require('mongoose');

const expect = chai.expect;
const should = chai.should();

const { closeServer, runServer, app } = require('../app');
const { books } = require("../models/Book");
const Book = mongoose.model("books");
const { TEST_DATABASE_URL } = require('../config/config');


chai.use(chaiHttp);

function tearDownDb() {
  return new Promise((resolve, rejects) => {
    console.warn('deleting database');
    mongoose.connection.dropDatabase()
      .then(result => resolve(result))
      .catch(err => rejects(err));
  });
}

//function to generate random data for testing
function seedBookData() {
  console.info('seeding book data');
  const seedData = [];
  for (let i = 1; i<=10; i++) {
    seedData.push({
      title: 'Harry Potter and the Chamber of Secrets',
      author: 'J.K. Rowling',
      genre: 'fantasy',
      goalPages: '33',
      goalChapters: '3'
    });
  }
  return Book.insertMany(seedData);
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

  describe('app', function() {
     it('verify that user has hit the root url, index.html', () => {
      chai.request(app)
        .get('/')
        .then(res => {
          expect(res).to.be.html;
          expect(res).to.have.status(200);
        });
    }); 
  });
})