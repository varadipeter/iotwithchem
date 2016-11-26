var devices = require('./devices/devices')
var cpuinfo = require('./devices/cpuinfo')()
var serialNumber = cpuinfo['Serial'] == undefined ? -1 : cpuinfo['Serial'][0]
var db = require('../models/uploadData')
var mongoose = require('mongoose')

var cloudAmqpUrl = 'amqp://fiynopcz:fYBzRHfKTa-dcH8bgMo4WtTg5iPkpUa-@hare.rmq.cloudamqp.com/fiynopcz'
var cloudAmqp = require('amqplib').connect(cloudAmqpUrl)
var queueRead = 'qToRaspberry'

// No write used... yet
// var queueWrite = 'qToWebserver'

var hearthBeatInterval = 3000
var temperatureUploadInterval = 30000
var heatingCheckInterval = 2000

mongoose.connection.on('error', (error) => {
	console.error('Could not connect to mongo server!')
	console.error(error)
})

// connect to database on mongolab
mongoose.connect('mongodb://heroku_hww55rc1:2ic4cjhncvmlse83a21lnejpru@ds139187.mlab.com:39187/heroku_hww55rc1',function(err) {
	if (err) console.error('erros:'+err)
}) //('mongodb://votiv:votiv@ds031257.mlab.com:31257/kemia-db')

cloudAmqp.then(
	function(connection){
		var connectionMade = connection.createChannel()
		connectionMade = connectionMade.then(function(channel){
			channel.assertQueue(queueRead)
			channel.consume(queueRead,function(message){
				if(message!== null){
					MessageRouting(message.content.toString())
					channel.ack(message)
				}
			})
		})
		return connectionMade
	}).then(null,console.warn)

//Uploads data to database
function uploadDataToDatabase(){
	devices.temperatureDevice(function(err,value){
		console.info('Raspberry -',serialNumber)
		console.info('Current temperature on sensor is', value)
		db.createTemperatureMessage(serialNumber,'1',value,new Date().getTime(),function(err){
			if (err) console.error(err)            
		})
	})
}

function IsAlive(){
	var d = new Date().getTime()
	db.createAliveMessage(serialNumber,d,function(err){
		if (err) console.error(err)            
	})
	console.info('Alive -',d)
}

function heatingCheck(){
	devices.temperatureDevice(function(err,value){
		console.log('Current temperature',value)
		if(value<devices.lowerHeatTolerance){
			devices.turnOnHeatRelay()
		}
		else if(value>devices.upperHeatTolerance){
			devices.turnOffHeatRelay()
		}
	})
}

function MessageRouting(message){
	var splitMessage = message.split(':')
	switch(splitMessage[0]){
	case 'Heater':
		devices.checkHeatRelayStatus(function(value){
			console.info('HeatSource working',value)
		})
		switch(splitMessage[1]){
		case 'ON':
			console.info('Command from WEB- TURN ON!')
			devices.turnOnHeatRelay()
			break
		case 'OFF':
			console.info('Command from WEB- TURN OFF!')
			devices.turnOffHeatRelay()
			break
		}
			//Essentially, write in to Database, that heat is turned on?
		console.info(splitMessage[1])
		break
	}
}

/*global setInterval */

setInterval(IsAlive,hearthBeatInterval)

setInterval(uploadDataToDatabase,temperatureUploadInterval)

setInterval(heatingCheck,heatingCheckInterval)
