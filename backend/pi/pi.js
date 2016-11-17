var devices = require('./devices/devices')
var cpuinfo = require('./devices/cpuinfo')()
var serialNumber = cpuinfo['Serial'] == undefined ? -1 : cpuinfo['Serial'][0]
var db = require('../models/uploadData')
var mongoose = require('mongoose')

var hearthBeatInterval = 3000
var temperatureUploadInterval = 30000

mongoose.connection.on('error', (error) => {
	console.error('Could not connect to mongo server!')
	console.error(error)
})

// connect to database on mongolab
mongoose.connect('mongodb://heroku_hww55rc1:2ic4cjhncvmlse83a21lnejpru@ds139187.mlab.com:39187/heroku_hww55rc1',function(err) {
	if (err) console.error('erros:'+err)
}) //('mongodb://votiv:votiv@ds031257.mlab.com:31257/kemia-db')

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

/*global setInterval */

setInterval(IsAlive,hearthBeatInterval)

setInterval(uploadDataToDatabase,temperatureUploadInterval)
