// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const faker = require('faker');
// const mongoose = require('mongoose');

// const should = chai.should();
// const expect = chai.expect;

// const { app, runServer, closeServer } = require('../app');
// const { users } = require("../models/User");
// const User = mongoose.model("users");
// const { TEST_DATABASE_URL } = require('../config/config');

// chai.use(chaiHttp);

// describe('POST request for new user', function() {
//   it('should create a new user', function() {
//     let user = {
//       name: 'Joe Smith',
//       email: 'jsmith@gmail.com',
//       password: 'password'
//     }
//     return chai.request(app)
//         .post('/users')
//         .send(user)
//         .then(function(res) {
//           expect(res).to.have.status(200);
//           expect(res.body).to.be.a('object');
//         })
//     })
// });

// //need POST /auth/login to request JWT

// //need GET /protected to make request for a protected endpoint 
 
// //POST /auth/refresh to request a new JWT with later expiry date