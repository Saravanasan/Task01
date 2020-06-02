var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');

var app = express();
app.use( bodyParser.json() );

var db;
var url = "mongodb://saravanan:assignment1@ds121099.mlab.com:21099/assignment";

MongoClient.connect(url,{ useUnifiedTopology: true }, function(err, database) {
  if(err) throw err;
  db = database.db('assignment');
  app.listen(process.env.PORT || 3000);
  console.log("Listening on port 3000");
});

app.post("/insert", function(req, res) {
  try {
    var data = req.body.data;
    if(data == null || data == ""){
      res.status(400).send('No details found');
    }
    else{
      db.collection("task").updateOne({'_id':"5ed4b9d776ae506cfa3bbe73"},{$addToSet: {'data': data}}, function(err, result) {
        if (err) res.status(400).send('Insertion Failed');
        res.status(200).send('Inserted successfully');
    });
    }
  } catch (e) {
    res.status(500).send('Internal Server Error');
  }
    
});

app.get("/get", function(req, res) {
  try {
    db.collection("task").findOne({}, function(err, result) {
      if (err) res.status(400).send('Data retrieval Failure');
      res.status(200).send(result.data, null, 4);
  });
  } catch (e) {
    res.status(500).send('Internal Server Error');
  }
});