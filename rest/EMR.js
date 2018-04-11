var express = require ('express');
var router = express.Router();

var EMR = require ('../models/EMREntry');

EMR.methods(['get','put','post','delete']);
EMR.register(router, '/emrs')
module.exports = router;