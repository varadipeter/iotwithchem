'use strict'

let path = require('path'),
	db = require(path.resolve('backend/models/downloadData.js'))
    
var raspiAlive = false

module.exports = (app) => {
    
	app.get('/getsensorids', (request, response) => {

		db.getTemperatureSensors(function(returndata){
			response.json(returndata)
		})
	})  


	app.get('/gettemperature', (request, response) => {  

		var sensorid = request.param('sensorid')  
		if (typeof sensorid === 'undefined') sensorid = '1'

		db.getTemperature(sensorid,function(returndata){
			response.json(returndata)
		})
	})


	app.get('/gettemperatureinterval', (request, response) => {
      
		var sensorid = request.param('sensorid')
		var datefrom = request.param('datefrom')
		var dateto = request.param('dateto')  
		if (typeof sensorid === 'undefined') sensorid = '1'

		db.getTemperatureInterval(sensorid,datefrom,dateto,function(returndata){
			response.json(returndata)
		})

	})      


	app.get('/isalive', (request, response) => {

		response.json({alive : raspiAlive})
	})
    

	app.get('*', (request, response) => {
     
		response.sendFile(path.resolve('frontend/index.html'))
	})

}


/*global setInterval */
setInterval(function () { db.getPulse(function(returndata){
	raspiAlive = returndata
})},5000)