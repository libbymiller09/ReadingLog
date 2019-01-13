const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const expect = chai.expect;

const { app, runServer, closeServer } = require('../app');
// const { Book } = require('..models/Book');

chai.use(chaiHttp);

// test for connection to server
describe('server', () => {

  before(function () {
    return runServer(true);
  });

  after(function () {
    return closeServer();
  });

    it('verify that user has hit the root url, index.html', () => {
      chai.request(app)
        .get('/')
        .then(res => {
          expect(res).to.be.html;
          expect(res).to.have.status(200);
    });
  });
});