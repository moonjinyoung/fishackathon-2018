var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var data = require("./data-base.js");
var dataBaseComments = require("./data-base-comment.js");
var clientSessions = require("client-sessions");


var app = express();
var HTTP_PORT = process.env.PORT || 8080;
var uri = 'mongodb+srv://wlto:myClusterIsFunny009@cluster0-o3gou.mongodb.net/test';

// Connects to the database
MongoClient.connect(uri, (err, client) => {
  // Getting the collection
  const collection = client.db('Students').collection('students');
  let stuffs = collection.find({}).toArray((err, docs) => {
    console.log(docs); // Got the records!!!!!!!!!
  });
  // Close the connection (I think)
  client.close();
});

// Route to home
app.get('/', (req, res) => {
  res.status(200).json({
    'cool': 'beans'
  });
  res.end();
});

app.listen(port, () => {
  console.log('Server listening on port ' + port);
});
