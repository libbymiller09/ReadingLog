const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');

const mongoose = require('mongoose');

const expect = chai.expect;
const should = chai.should();

const { app, runServer, closeServer } = require('../app');
const { Book } = require('../models/Book');
const { TEST_DATABASE_URL, PORT } = require('../config/config');


chai.use(chaiHttp);

function tearDownDb() {
  return new Promise((resolve, rejects) => {
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

const databaseUrl = TEST_DATABASE_URL;
const port = PORT;

// test for connection to server
describe('Books API resource', () => {

  before(function () {
    return runServer(databaseUrl);
  });

  // beforeEach(function() {
  //   return seedBookData();
  // });

  // afterEach(function() {
  //   return tearDownDb();
  // });

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