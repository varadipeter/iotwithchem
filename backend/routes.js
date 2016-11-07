  'use strict'

  let path = require('path'),
      mongoose = require('mongoose'),
      User = require(path.resolve('backend/models/users.js')),
    Temperature = require(path.resolve('backend/models/temperature.js')),
    Alive = require(path.resolve('backend/models/alive.js'))
    
  var tempvalue;
  var temp	

  module.exports = (app) => {
    app.get('/users', (request, response) => {
    
      User.find((error, users) => {
        if (error) { response.send(error) }

        response.json(users)
      })
    })
    

    app.get('/getsensorids', (request, response) => {
      
      var _sensorids = new Set();
      Temperature.find([] ,(error, sensors) => {
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

      Temperature.find((error, temperatures) => {
        if (error) { response.send(error) }
        response.json(temperatures[temperatures.length-1]);       
      }).where('sensorid').equals(sensorid);    

    })  
    

    app.get('/isalive', (request, response) => {
    
      Alive.find((error, alivedata) => {
        if (error) { response.send(error) }

        response.json(alivedata[alivedata.length-1])
      })
    })
    

    app.get('*', (request, response) => {
      response.sendFile(path.resolve('frontend/index.html'));
    });
  }

