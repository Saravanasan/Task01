var {mongoose} = require('./database');
var {task} = require('./schema');
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();
app.use( bodyParser.json() );

app.listen(process.env.PORT || 3000);

app.post("/insert", function(req, res) {
  var data = new task(req.body);
	data.tosave(res);
});

app.get("/get", function(req, res) {
  try {
    if(req.query.name == undefined || req.query.name == null || req.query.name == "") {
      return new Promise((resolve,reject)=>{
        task.find().limit(2).then((docs) => {
            if(!docs){
              res.status(404).send("document not available");
            }
            res.send(docs);
        }).catch(err => {
            res.status(404).send("No data found");
        });
      })
    }
    else{
      return new Promise((resolve,reject)=>{
        task.findOne({name: req.query.name}).then((docs) => {
          if(!docs){
            res.status(404).send("document not available");
          }
          res.send(docs);
      }).catch(err => {
          res.status(404).send("No data found");
      });
      })
    }
  } catch (e) {
    console.log(e);
    res.status(500).send('Internal Server Error');
  }
});

app.put("/update", function(req, res) {
  if(mongoose.Types.ObjectId.isValid(req.body._id)){
    return new Promise((resolve,reject)=>{
      task.findOneAndUpdate({'_id': mongoose.Types.ObjectId(req.body._id)},{'$set': req.body.data}, {useFindAndModify: false}).then((docs) => {
          if(!docs){
            reject(res.status(404).send("document not available"));
          }
          resolve(res.send('Data updated successfully'));
      }).catch(err => {
          res.status(404).send("No data found");
      });
    })
  }
  else{
    res.status(404).send("Bad parameters");
  }
});
