var devices = require('./devices/devices');
var cpuinfo = require('./devices/cpuinfo')();
var serialNumber = cpuinfo['Serial'] == undefined ? -1 : cpuinfo['Serial'][0];
var db = require('../models/uploadData');
var datetime = require('node-datetime');
var mongoose = require('mongoose');

mongoose.connection.on('error', (error) => {
  console.log('Could not connect to mongo server!')
  console.log(error);
})

// connect to database on mongolab
mongoose.connect('mongodb://heroku_hww55rc1:2ic4cjhncvmlse83a21lnejpru@ds139187.mlab.com:39187/heroku_hww55rc1',function(err) {
if (err) console.log("erros:"+err);
}); //('mongodb://votiv:votiv@ds031257.mlab.com:31257/kemia-db')

//Prints temperature to console
function temperatureToConsole(){
	devices.temperatureDevice(function(err,value){
			console.log('Raspberry -',serialNumber);
			console.log('Current temperature on sensor is', value);
            db.createTemperatureMessage(serialNumber,'1',value,new Date().getTime(),function(err){
            if (err) console.log(err);            
            });
		});
}

function IsAlive(){
var d = new Date().getTime();
db.createAliveMessage(serialNumber,d,function(err){
            if (err) console.log(err);            
            });
console.log('Alive -',d);
}
setInterval(IsAlive,3000);

tempIntervalID = setInterval(temperatureToConsole,4000);
