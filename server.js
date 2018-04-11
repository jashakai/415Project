var express = require ('express');
var app = express();
var BodyParser = require ('body-parser');
var mongoose = require ('mongoose');
var mongodb = require('mongodb');

//Connection 
mongoose.connect('mongodb://localhost/415Project');
var db = mongodb.connection;

app.use(BodyParser.urlencoded({extended:true}));
app.use(BodyParser.json());
//Api Route
app.use('/rest',require('./rest/EMR'));


//app.get('/',function(req,res){
	//res.send('Hello');
//});
//Start Server
app.listen(3000);
console.log('Running on port 3000...')

/*var express = require('express'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    morgan = require('morgan'),
    restful = require('node-restful'),
    mongoose = restful.mongoose;
var app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type:'application/vnd.api+json'}));
app.use(methodOverride());

mongoose.connect("mongodb://localhost/resources");

var Resource = app.resource = restful.model('resource', mongoose.Schema({
    title: String,
    year: Number,
  }))
  .methods(['get', 'post', 'put', 'delete']);

Resource.register(app, '/resources');

app.listen(3000);
*/