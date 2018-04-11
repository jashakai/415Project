var restful = require('node-restful');
var mongoose = restful.mongoose; 

var EMRSchema = new mongoose.Schema({
	id: Number,
	name: String,
	DOB: String
});

module.exports = restful.model ('EMRs', EMRSchema);