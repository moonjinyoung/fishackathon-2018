var path = require("path");
var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var app = express();
var HTTP_PORT = process.env.PORT || 8080;

var uri = 'mongodb://wlto:somethingFunny333@ds231758.mlab.com:31758/fishkatsu';

app.use(express.static('public'));

var documents;

// Connects to the database
MongoClient.connect(uri, (err, client) => {
  // Getting the collection
  const collection = client.db('fishkatsu').collection('Reports');
  collection.find({}).toArray((err, docs) => {
    documents = docs;
  });
  // Close the connection
  client.close();
});

// //////////
// GET routes
//

// Route to home
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "/views/index.html"));
});

// Route to everything else; Returns 404 Not Found
app.get('*', (req, res) => {
  res.status(404).send('Not Found');
});

// ///////////
// POST routes
//
app.post('/submit', (req, res) => {

});

app.listen(HTTP_PORT, () => {
  console.log('Server listening on port ' + HTTP_PORT);
});
