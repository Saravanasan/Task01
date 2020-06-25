var mongoose = require('mongoose');
var url = "mongodb://saravanan:assignment1@ds121099.mlab.com:21099/assignment" ;
mongoose.Promise = global.Promise;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true , 'useCreateIndex': true} ,(err)=>{
	if(err) throw err;
	console.log('successfully connected');
});

module.exports = {mongoose};

