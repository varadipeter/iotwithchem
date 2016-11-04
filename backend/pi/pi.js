var devices = require('./devices/devices');
var db = require('./models/uploadData');
var datetime = require('node-datetime');
var mongoose = require('mongoose');
//ID for the reading interval
var tempIntervalID;

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
			console.log('Current temperature on sensor is', value);
            db.createTemperatureMessage('1234','987',value,'2016',function(err){
            if (err) console.log(err);            
            });
		});
}

function IsAlive(){
var d = new Date();;
db.createAliveMessage('1234',d,function(err){
            if (err) console.log(err);            
            });
console.log('alive');
}
setInterval(IsAlive,3000);

tempIntervalID = setInterval(temperatureToConsole,4000);
