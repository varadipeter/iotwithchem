'use strict'

let path = require('path'),
	Temperature = require(path.resolve('./backend/models/temperature.js')),
	Alive = require(path.resolve('./backend/models/alive.js'))

function createTemperatureMessage(rid,sid,tv,td,_callback){
	var t = new Temperature({  
		raspberryid : rid,
		sensorid : sid,
		tempvalue : tv,
		tempdate :  td
	})

	t.save(function(err) {
		if (err) 
			return _callback(err)
	})
	return _callback(null)
}

function createAliveMessage(rid,td,_callback){
	var a= new Alive({  
		raspberryid : rid,
		alivedate : td
	})

	a.save(function(err) {
		if (err) 
			return _callback(err)
	})
	return _callback(null)
}


module.exports.createTemperatureMessage = createTemperatureMessage
module.exports.createAliveMessage = createAliveMessage

