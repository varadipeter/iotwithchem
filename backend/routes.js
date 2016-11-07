  'use strict'

  let path = require('path'),
      mongoose = require('mongoose'),      
    Temperature = require(path.resolve('backend/models/temperature.js')),
    Alive = require(path.resolve('backend/models/alive.js'))
    
  var tempvalue;
  var temp;
  var lastAliveDate = 0;
  var raspiAlive = false;

  module.exports = (app) => {
    
    app.get('/getsensorids', (request, response) => {
      
      var _sensorids = new Set();
      Temperature.find({},'-_id -__v' ,(error, sensors) => {
        if (error) { response.send(error) }
        sensors.forEach(function(item) {
           _sensorids.add(item.sensorid) 
          })
        response.json(Array.from(_sensorids));         
      });

    })  


    app.get('/gettemperature', (request, response) => {
      
      var sensorid = request.param('sensorid');  
      if (typeof sensorid === 'undefined') sensorid = '1';

      Temperature.find({},'-_id -__v',(error, temperatures) => {
        if (error) { response.send(error) }
        response.json(temperatures[temperatures.length-1]);       
      }).where('sensorid').equals(sensorid);    

    })  
    

    app.get('/isalive', (request, response) => {
    
      Alive.find((error, alivedata) => {
        if (error) { response.send(error) }
        var respJson = JSON.parse('{"alive":'+raspiAlive+'}');
        response.json({alive : raspiAlive})
      })
    })
    

    app.get('*', (request, response) => {
      response.sendFile(path.resolve('frontend/index.html'));
    });
  }

function pulseMeter(){
  Alive.find((error, alivedata) => {
    var currentLastDate = alivedata[alivedata.length-1].alivedate;
      console.log('raspiAlive-',raspiAlive);
      console.log(currentLastDate,lastAliveDate);
    if(lastAliveDate != 0 && lastAliveDate != currentLastDate){
      raspiAlive = true;
    }else{
      raspiAlive = false;
    }
    lastAliveDate = currentLastDate;
  });
}

setInterval(function () { pulseMeter();},5000);