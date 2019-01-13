const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const { ObjectID } = require('mongodb');
const expect = chai.expect;

const { app, runServer, closeServer } = require('../app');
const { Book } = require('../models/Book');

// tests dealing with book requests

describe('books', () => {
  //GET requests
    describe('GET /books', () => {
      it('should get all books', function(done) {
        chai.request(app)
          .get('/books')
          .then(function(res) {
            expect(res).to.have.status(200);
            done();
          });
      });
    })
  
    //POST requests
    describe('POST /books', () => {
      it('should create a new book entry', function(done) {
        const newBookEntry = {
          title : 'test Harry Potter',
          author : 'test',
          genre : 'test',
          goalPages : 'test',
          goalChapters : 'test',
      };
        return (
          chai.request(app)
            .post('/books')
            .send(newBookEntry)
            .then(function(res) {
              console.log(res.body);
              expect(res).to.have.status(200);
              expect(res.body).to.be.a('object');
              // expect(res.body).to.deep.equal(Object.assign(newBookEntry, {id: res.body.id}));
              // done();
            })
            .catch(function (error) {
              console.log(error);
            })
          );
        });
    })
  
    //PUT requests
    describe('PUT /books/:id', () => {
      it('should update book on PUT', function(done) {
        const updateBook = {
          name: 'updatedName'
          // author: 'testAuthor',
          // image: 'testimage',
          // genre: 'testGenre',
          // goalPages: 'testPages',
          // goalChapters: 'testChs'
        };
        return (
          chai.request(app)
            .get('/books')
            .then(function(res) {
              // console.log(res.body);
              updateBook._id = res.body._id;
              return chai.request(app)
                .put(`/books/${updateBook._id}`)
                .send(updateBook)
            })
            .then(function(res) {
              expect(res).to.have.status(204);
              expect(res).to.be.json;
          })
          .catch(function (error) {
            console.log(error);
          })
        );
      });
    })
  
      //DELETE requests
    describe('DELETE /books/:id', () => {
      it('should delete book on DELETE', function(done) {
        return (
          chai.request(app)
            .get('/books/:id')
            .then(function(res) {
              return chai.request(app)
                .delete(`/books/${res.body.id}`);
            })
            .then(function(res) {
              expect(res).to.have.status(204);
            })
            .catch(function (error) {
              console.log(error);
            })
          );
      });
    })
  })
  