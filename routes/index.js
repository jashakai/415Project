var express = require('express');
var router = express.Router();
var lodash = require('lodash')


var array = require('lodash/array');
var object = require('lodash/fp/object');



function CreateEntity(ssn, Fname,Lname,Healthy,BYear) {
    this.ssn = ssn;
    this.Fname = Fname;
    this.Lname = Lname;
    this.Healthy = Healthy;
    this.BYear = BYear;
}



var EMRData = [
  new CreateEntity('1', 'Larry','Enticer', 'N', '1954'),
 	new CreateEntity('2', 'Sahrah','Anderson', 'Y', '1964'),    
 	new CreateEntity('3', 'Bob','Shmit', 'Y', '1999'),
 	new CreateEntity('4', 'Goldie','Carlson', 'Y', '2009')
];

Array.prototype.clean = function(deleteValue) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == deleteValue) {         
      this.splice(i, 1);
      i--;
    }
  }
  return this;
};
    
/* GET home page. */
router.get('/index', function(req, res,) {
  res.render('index', { title: 'Information:', EMRData: EMRData 
	//res.json(EMRData);
  });
});

router.get('/rest/emr', function(req, res,) {
	res.status(200).json(EMRData);

});
router.get('/rest/emr/:ssn', function(req, res) {

var	data = req.params.ssn;
var resp = 'No such SSN:'+ data +' ┻━┻ ︵ヽ(`Д´)ﾉ︵﻿ ┻━┻ ';
var i = 0; 
while (EMRData.length != i){

	if (EMRData[i].ssn == data) {
    	  res.status(200).json(EMRData[i]);
    	  break; 
      }
      else if (EMRData[i].ssn != data ){
      	
      		i++;
      	
      	
     
      }
	}
	res.status(404).json(resp);
});
router.post('/rest/emr', function(req, res,) {
	  var ssn = req.body.ssn;
    var Fname = req.body.Fname;
    var Lname = req.body.Lname;
    var Healthy = req.body.Healthy;
    var BYear = req.body.BYear;
   
   var data = new CreateEntity(ssn, Fname, Lname, Healthy, BYear);


	EMRData.push(data)
	res.status(200).json(EMRData);

});
router.put('/rest/emr', function(req, res,) {
    var data = req.body.ssn ;
    var ssn = req.body.ssn;
    
var resp = 'No such SSN:'+ data ;
var i = 0;

while (EMRData.length != i){

  if (EMRData[i].ssn == ssn) {
        EMRData[i].ssn = ssn;
        EMRData[i].Fname = req.body.Fname;
        EMRData[i].Lname = req.body.Lname;
        EMRData[i].Healthy = req.body.Healthy;
        EMRData[i].BYear = req.body.BYear;
          
        res.status(200).json(EMRData);
        break; 
      }
      else if (EMRData[i].ssn != ssn ){
        
          i++;
        
        
     
      }
  }
  
 res.json(resp);

});
router.delete('/rest/emr', function(req, res,) {
    var data = req.body.ssn;
    var resp = 'No such Record:'+ data ;
    var ssn = req.body.ssn;
    var i = 0;   
   while (EMRData.length != i){

  if (EMRData[i].ssn === ssn) {
       
       EMRData[i] = undefined; 
      
       
        EMRData.clean(undefined);
        res.status(200).json(EMRData);
        
        break; 
      }
      else if (EMRData[i].ssn != ssn ){
        
          i++;
        
        
     
      }

 
  }
  

  EMRData.clean(undefined);
  res.json(resp);

   



});
module.exports = router;
