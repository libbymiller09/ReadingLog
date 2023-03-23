const express = require('express');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');

const {DATABASE_URL, PORT} = require('./config/config');
const app = express();

// connection to database
const mongoose = require('mongoose');
const mongoDB = 'mongodb://username:password@ds155097.mlab.com:55097/readerslog-db';
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error'));

//load routes
const books = require('./routes/books');

  //middleware for the bodyparser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.json());

//static folder
app.use(express.static(path.join(__dirname, 'public')));

// main page load
app.get('/', (req, res) => {
  res.sendFile(__dirname + "/views/books/about.html");
  console.log('rendered page successfully');
});

// use the routes set up in 'routes' folder
app.use('/books', books);

app.use('*', function (req, res) {
  res.status(404).json({ message: 'Not Found' });
});

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
