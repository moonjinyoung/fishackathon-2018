var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var path = require("path");

var app = express();

var port = 8080 || process.env.PORT;
var uri = 'mongodb://wlto:somethingFunny333@ds231758.mlab.com:31758/fishkatsu';

app.use(express.static('style'));


// Connects to the database
MongoClient.connect(uri, (err, client) => {
  // Getting the collection
  const collection = client.db('fishkatsu').collection('Reports');
  // let stuffs = collection.find({}).toArray((err, docs) => {
  //   console.log(docs); // Got the records!!!!!!!!!
  // });
  // Close the connection (I think)
  client.close();
});

// Route to home
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "/views/index.html"));
});

app.listen(port, () => {
  console.log('Server listening on port ' + port);
});
