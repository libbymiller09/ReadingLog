const express = require('express');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');

const {DATABASE_URL, PORT} = require('./config/config');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(DATABASE_URL);

const passport = require('passport');

//load routes
const books = require('./routes/books');
const users = require('./routes/users');
const app = express();


//passport configuration
require('./config/passport')(passport);

// mongoose.Promise = global.Promise;
let uri = 'mongodb://libbymiller:pirate22@ds155097.mlab.com:55097/readerslog-db';
//connect to database 
mongoose.connect(uri)
  .then(() => console.log('mongodb connected'))
  .catch(err => console.log(err));

  //middleware for the bodyparser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.json());

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

//index.html route--main page load
app.get('/', (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
  console.log('rendered page successfully');
});

// use the routes set up in 'routes' folder
app.use('/books', books);
// app.use('/users', users);

app.use('*', function (req, res) {
  res.status(404).json({ message: 'Not Found' });
});

// let server;

// function runServer() {
//   const port = process.env.PORT || 5050;
//   return new Promise((resolve, reject) => {
//     server = app.listen(port, () => {
//       console.log(`Your app is listening on port ${port}`);
//       resolve(server);
//     })
//     .on('error', err => {
//       reject(err);
//     });
//   });
// }


// function closeServer() {
//   return new Promise((resolve, reject) => {
//     console.log("Closing server");
//     server.close(err => {
//       if (err) {
//         reject(err);
//         return;
//       }
//       resolve();
//     });
//   });
// }

let server;

// starts the server
function runServer(databaseUrl = DATABASE_URL, port = PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if(err) {
        return reject(err);
      }
      server = app.listen(port, () => {
          console.log(`server running on port ${port}`);
          resolve();
        })
        .on("error", err => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
}

// closes the server
function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log("closing server");
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

if (require.main === module) {
  runServer(DATABASE_URL).catch(err => console.error(err));
};

module.exports = { runServer, app, closeServer };