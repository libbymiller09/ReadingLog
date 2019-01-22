const express = require('express');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');

const app = express();

//load routes
const books = require('./routes/books');
const users = require('./routes/users');

//passport configuration
require('./config/passport')(passport);

mongoose.Promise = global.Promise;
let uri = 'mongodb://libbymiller:pirate22@ds155097.mlab.com:55097/readerslog-db';
//connect to database 
mongoose.connect(uri)
  .then(() => console.log('mongodb connected'))
  .catch(err => console.log(err));

  //middleware for the bodyparser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//static folder
app.use(express.static(path.join(__dirname, 'public')));

//express session middleware
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}));

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use(function(req, res, next){
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});


//index.html route--main page load
app.get('/', (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
  console.log('rendered page successfully');
});

// use the routes set up in 'routes' folder
app.use('/books', books);
app.use('/users', users);

let server;

// starts the server
function runServer() {
  const port = process.env.PORT || 5050;
  return new Promise((resolve, reject) => {
    server = app
      .listen(port, () => {
        console.log(`server running on ${port}`);
        resolve(server);
      })
      .on("error", err => {
        reject(err);
      });
  });
}

// closes the server
function closeServer() {
  return new Promise((resolve, reject) => {
    console.log("closing server");
    server.close(err => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}

const port = 5050;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

// if (require.main === module) {
//   runServer(DATABASE_URL).catch(err => console.error(err));
// };

module.exports = { app, runServer, closeServer };