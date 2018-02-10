var express = require('express');
var MongoClient = require('mongodb').MongoClient;

var app = express();
var port = 8080 || process.env.PORT;
var uri = 'mongodb+srv://wlto:myClusterIsFunny009@cluster0-o3gou.mongodb.net/test';

// Connects to the database
MongoClient.connect(uri, function(err, client) {
  // Getting the collection
  const collection = client.db('test').collection('devices');
  // Close the connection (I think)
  client.close();
});

// Route to everything
app.get('/', (req, res) => {
  res.status(200).json({
    'cool': 'beans'
  });
  res.end();
});

app.listen(port, () => {
  console.log('Server listening on port ' + port);
});
