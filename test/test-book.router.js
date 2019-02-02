// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const faker = require('faker');
// const mongoose = require('mongoose');

// const should = chai.should();
// const expect = chai.expect;

// const { app, runServer, closeServer } = require('../app');
// const { Book } = require('../models/Book');
// const { TEST_DATABASE_URL } = require('../config/config');


// chai.use(chaiHttp);

// // const { ObjectID } = require('mongodb');

// //function to generate random data for testing
// function seedBookData() {
//   console.info('seeding book data');
//   const seedData = [];

//   for (let i = 1; i<=10; i++) {
//     seedData.push(generateBookData());
//   }
//   return Book.insertMany(seedData);
// }

// function generateTitle() {
//   const titles = [
//     'Harry Potter', 'Lord of the Rings', 'The Giver', 'A wrinkle in Time'];
//     return title[Math.floor(Math.random() * title.length)];
// }

// function generateGoals() {
//   const goals = ['1', '2', '5', '23'];
//   const goal = goals[Math.floor(Math.random() * goals.lenght)];
//   return {
//     goal: goal
//   };
// }

// function generateBookData() {
//   return {
//     title: faker.title.title(),
//     author: faker.author.name(),
//     genre: faker.genre.genre(),
//     goals: [generateGoals()]
//   };
// };

// function tearDownDb() {
//   console.warn('Deleting database');
//   return mongoose.connection.dropDatabase();
// };

// // test for connection to server
// describe('Books API resource', () => {

//   before(function () {
//     return runServer(TEST_DATABASE_URL);
//   });

//   beforeEach(function() {
//     return seedBookData();
//   });

//   afterEach(function() {
//     return tearDownDb();
//   });

//   after(function () {
//     return closeServer();
//   });

//   describe('server', function() {
//      it('verify that user has hit the root url, index.html', () => {
//       chai.request(app)
//         .get('/')
//         .then(res => {
//           expect(res).to.be.html;
//           expect(res).to.have.status(200);
//         });
//     }); 
//   });

//   describe('GET endpoint', function() {
//     it('Should return all books', function() {
//       let res;
//       return chai.request(app).get('/')
//         .then(_res => {
//           res = _res;
//           expect(res).to.have.status(200);
//           expect(res.body).to.have.lengthOf.at.least(1);
//           return Books.count();
//         })
//         .then(count => {
//           expect(res.body).to.have.lengthOf(count);
//         });
//     });
//   });

//   describe('POST endpoint', function() {
//     it('should add a new book', function() {
//       const newBookEntry = {
//         book_id: book._id, 
//         title : faker.lorem.words(),
//         author : faker.lorem.words(),
//         genre : faker.lorem.word(),
//         goalPages : faker.lorem.word(),
//         goalChapters : faker.lorem.word()
//       };
//       return chai.request(app)
//           .post('/')
//           .send(newBookEntry)
//           .then(function(res) {
//             console.log(res.body);
//             expect(res).to.have.status(200);
//             return Books.findById(res.body.id);
//             // expect(res.body).to.be.a('object');
//             // expect(res.body).to.deep.equal(Object.assign(newBookEntry, {id: res.body.id}));
//             // done();
//           })
//           .then(book => {
//             expect(book.title).to.equal(newBookEntry.title);
//           })
//       })
//   });

//   describe('PUT endpoint', function() {
//     it('Should update book', function() {
//       const updateBook = {
//         title: 'The Giver',
//         author: 'Lois Lowry',
//         goalChapters: '4'
//       };
//       return Books.findOne()
//         .then(book => {
//           updateBook.id = book.id;
        
//           return chai.request(app)
//           .put(`/${updateBook.id}`)
//           .send(updateBook)
//         })
//         .then(res => {
//           expect(res).to.have.status(204);
//           return Books.findById(updateBook.id)
//         })
//         .then(book => {
//           expect(book.title).to.equal(updateBook.title);
//         });
//     });
//   });

//   describe('DELETE endpoint', function() {
//     it('should delete a book by its id', function() {
//       let book;
//       return Books.findOne()
//         .then(_book => {
//           book = _book;
//           return chai.request(app).delete(`/${book.id}`)
//         })
//         .then(res => {
//           expect(res).to.have.status(204);
//           return Books.findById(book.id);
//         })
//         .then(_book => {
//           expect(_book).to.be.null;
//         });
//     });
//   });
// });








// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const mongoose = require('mongoose');
// const { ObjectID } = require('mongodb');
// const expect = chai.expect;

// const { app, runServer, closeServer } = require('../app');
// const { Book } = require('../models/Book');

// // tests dealing with book requests

// describe('books', () => {
//   //GET requests
//     describe('GET /books', () => {
//       it('should get all books', function(done) {
//         chai.request(app)
//           .get('/books')
//           .then(function(res) {
//             expect(res).to.have.status(200);
//             done();
//           });
//       });
//     })
  
//     //POST requests
//     describe('POST /books', () => {
//       it('should create a new book entry', function(done) {
//         const newBookEntry = {
//           title : 'test Harry Potter',
//           author : 'test',
//           genre : 'test',
//           goalPages : 'test',
//           goalChapters : 'test',
//       };
//         return (
//           chai.request(app)
//             .post('/books')
//             .send(newBookEntry)
//             .then(function(res) {
//               console.log(res.body);
//               expect(res).to.have.status(200);
//               expect(res.body).to.be.a('object');
//               // expect(res.body).to.deep.equal(Object.assign(newBookEntry, {id: res.body.id}));
//               // done();
//             })
//             .catch(function (error) {
//               console.log(error);
//             })
//           );
//         });
//     })
  
//     //PUT requests
//     describe('PUT /books/:id', () => {
//       it('should update book on PUT', function(done) {
//         const updateBook = {
//           name: 'updatedName'
//           // author: 'testAuthor',
//           // image: 'testimage',
//           // genre: 'testGenre',
//           // goalPages: 'testPages',
//           // goalChapters: 'testChs'
//         };
//         return (
//           chai.request(app)
//             .get('/books')
//             .then(function(res) {
//               // console.log(res.body);
//               updateBook._id = res.body._id;
//               return chai.request(app)
//                 .put(`/books/${updateBook._id}`)
//                 .send(updateBook)
//             })
//             .then(function(res) {
//               expect(res).to.have.status(204);
//               expect(res).to.be.json;
//           })
//           .catch(function (error) {
//             console.log(error);
//           })
//         );
//       });
//     })
  
//       //DELETE requests
//     describe('DELETE /books/:id', () => {
//       it('should delete book on DELETE', function(done) {
//         return (
//           chai.request(app)
//             .get('/books/:id')
//             .then(function(res) {
//               return chai.request(app)
//                 .delete(`/books/${res.body.id}`);
//             })
//             .then(function(res) {
//               expect(res).to.have.status(204);
//             })
//             .catch(function (error) {
//               console.log(error);
//             })
//           );
//       });
//     })
//   })
  