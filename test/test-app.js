// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const faker = require('faker');
// const mongoose = require('mongoose');
// const expect = chai.expect;
// // const should = chai.should();

// const { app, runServer, closeServer } = require('../app');
// const { Book } = require('../models/Book');
// const {TEST_DATABASE_URL} = require('../config/config');

// chai.use(chaiHttp);


const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');

const should = chai.should();

const { app, runServer, closeServer } = require('../app');
const { Book } = require('../models/Book');
const { TEST_DATABASE_URL } = require('../config/config');
const expect = chai.expect;

chai.use(chaiHttp);

const { ObjectID } = require('mongodb');

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
})
}
