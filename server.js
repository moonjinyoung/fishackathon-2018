var path = require("path");
var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var app = express();
var HTTP_PORT = process.env.PORT || 8080;

var uri = 'mongodb://wlto:somethingFunny333@ds231758.mlab.com:31758/fishkatsu';

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded());

let db;

// Connects to the database
MongoClient.connect(uri, (err, client) => {
  // Getting the collection
  db = client.db('fishkatsu');
  const collection = db.collection('Reports');
  collection.find({}).toArray((err, docs) => {
    documents = docs;
  });
  // Close the connection
  // client.close();
  app.listen(HTTP_PORT, () => {
    console.log('Server listening on port ' + HTTP_PORT);
  });
});

// //////////
// GET routes
//

app.get('/getReports', (req, res) => {
  const collection = db.collection('Reports');
  collection.find({}).toArray((err, docs) => {
    documents = docs;
    res.json(documents);
  });
});

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
app.post('/submitReport', (req, res) => {
  let newReport = {
    'location': {
      'lat': parseFloat(req.body.locationLat),
      'lng': parseFloat(req.body.locationLng),
      'name': req.body.locationName
    },
    'type': req.body.reportType,
    'description': req.body.reportDesc,
    'datePosted': Date.now(),
    'resolved': false,
    'upvotes': 1,
    'downvotes': 0
  };
  db.collection('Reports').insertOne(newReport);
  res.redirect('back');
});
