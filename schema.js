  var mongoose = require('mongoose');
  var Schema = mongoose.Schema;

  var taskSchema = new Schema({
    name: { type: String, required: true, unique: true},
    img: { type: String, required: true},
    summary: { type: String, required: true}
  });

taskSchema.methods.tosave = function(res) {
	var user = this;
	user.save().then(doc => {
		return res.status(200).send("Inserted Successfully");
	}).catch(err => {
		return res.status(404).send("Bad parameters");
	});
};

  var task = mongoose.model('task', taskSchema);
  module.exports = {task};