const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

// load user model
require('../models/User');
const User = mongoose.model('users');

//user login route
router.get('/login', (req, res) => {
  res.sendFile('login.html', { root: './views/users' });
});

//user register route
router.get('/register', (req, res) => {
  res.sendFile('register.html', { root: './views/users' });
});

//Login form POST
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/books',
      failureRedirect: '/users/login',
      failureFlash: true
  })(req, res, next);
});

// register form POST
router.post('/register', (req, res) => {
  let errors = [];

  if(req.body.password != req.body.password2){
    errors.push({text: 'Passwords do not match'});
  }

  if(req.body.password.length < 4){
    errors.push({text: 'Password must be at least 4 characters'});
  }

  if(errors.length > 0){
    res.render('users/register', {
      errors: errors,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      password2: req.body.password2
    });
  } else {
    User.findOne({email: req.body.email})
      .then(user => {
        if(user){   
          req.flash('error_msg', 'email already in use');
          res.redirect('/users/register');
        } else {
          const newUser = new User ({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
          });

          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if(err) throw err;
              newUser.password = hash;
              newUser.save()
                .then(user => {
                  req.flash('success_msg', 'You are now registered and can log in');
                  res.redirect('/users/login');
                })
                .catch(err => {
                  console.log(err);
                  return;
                });
            });
          });
        } 
      });
    }
});

// Logout the user
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  req.redirect('/users/login');
});

module.exports = router;