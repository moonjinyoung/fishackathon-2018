var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var path = require("path");
var app = express();
var HTTP_PORT = process.env.PORT || 8080;

var uri = 'mongodb://wlto:somethingFunny333@ds231758.mlab.com:31758/fishkatsu';

app.use(express.static('style'));

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

// Route to home
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "/views/index.html"));
  // res.send(documents);
  // res.end();
});

app.listen(HTTP_PORT, () => {
  console.log('Server listening on port ' + HTTP_PORT);
});
