var express = require('express');
var router = express.Router();
var lodash = require('lodash')
var random = require('node-random-number');

var array = require('lodash/array');
var object = require('lodash/fp/object');


var userTemp = 0;
var userNum = 0;
var Locked = 0 ; 

var respLocked = "This data is locked.";


function CreateEntity(ssn, Fname,Lname,Healthy,BYear,Lock) {
    this.ssn = ssn;
    this.Fname = Fname;
    this.Lname = Lname;
    this.Healthy = Healthy;
    this.BYear = BYear;
    this.Lock = Lock;
}



var EMRData = [
  new CreateEntity('1', 'Larry','Enticer', 'N', '1954',userNum),
 	new CreateEntity('2', 'Sahrah','Anderson', 'Y', '1964',userNum),    
 	new CreateEntity('3', 'Bob','Smit', 'Y', '1999',userNum),
 	new CreateEntity('4', 'Goldie','Carlson', 'Y', '2009',userNum)
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
    
/* GET home page. 
router.get('/index', function(req, res,) {
  res.render('index', { title: 'Information:', EMRData: EMRData 
	res.json(EMRData);
  });
});
*/


router.get('/rest/emr', function(req, res,) {
  if (Locked == 0){

     res.status(200).json(EMRData);

  }
  else if(Locked == 1){
    var i = 0;

   while(EMRData.length != i){

    if(EMRData[i].Lock == userNum){
      
     
        res.status(200).json(EMRData);
      
    }
    
    else {
      res.status(200).json(respLocked);
      break;
    
    }

    
    i++;
   }
  }
  else {
    Locked = 0; 
    res.status(200).json(EMRData);

  }


 
});
router.get('/rest/emr/:ssn', function(req, res) {

var	data = req.params.ssn;
var resp = 'No such SSN:'+ data +' ┻━┻ ︵ヽ(`Д´)ﾉ︵﻿ ┻━┻ ';
var i = 0; 
while (EMRData.length != i){

	if (EMRData[i].ssn == data) {
    	  EMRData[i].Lock = userNum; 
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
  
   
   var data = new CreateEntity(ssn, Fname, Lname, Healthy, BYear, Lock);


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

router.lock('/rest/emr', function(req, res,) {
   
   
  if(Locked == 0){
   

    userTemp = random({start: 3000, end: 5090});
     userNum = userTemp.pop(userTemp);
     Locked = 1 ; 
     var i = 0;

     while(EMRData.length != i){

       EMRData[i].Lock = userNum ;
      i++;
     }
   
   res.status(200).json(EMRData);
  }
  else if (Locked === 1) {
    res.status(200).json(respLocked);

  }

  else { 

    userTemp = 0;
    userNum = 0;
    Locked = 0 
    var resp = "Error Locked reset to Zero "

    res.status(200).json(resp);
  }


});

router.lock('/rest/emr/:ssn', function(req, res) {

var data = req.params.ssn;
var resp = 'No such SSN:'+ data +' ┻━┻ ︵ヽ(`Д´)ﾉ︵﻿ ┻━┻ ';
var i = 0; 
while (EMRData.length != i){

  if (EMRData[i].ssn == data) {
        EMRData[i].Lock = userNum; 
        res.status(200).json(EMRData[i]);
        break; 
      }
      else if (EMRData[i].ssn != data ){
        
          i++;
        
        
     
      }
  }
  res.status(404).json(resp);
});
router.unlock('/rest/emr', function(req, res,) {
  userTemp = 0;
  userNum = 0;
  Locked = 0 ; 

  var i = 0;
  
 while(EMRData.length != i){

     EMRData[i].Lock = userNum ;
    i++;
   }


  res.status(200).json(EMRData);

});

module.exports = router;
