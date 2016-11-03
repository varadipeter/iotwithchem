var devices = require('./devices/devices');

//ID for the reading interval
var tempIntervalID;

//Prints temperature to console
function temperatureToConsole(){
	devices.temperatureDevice(function(err,value){
			console.log('Current temperature on sensor is', value);
		});
}

tempIntervalID = setInterval(temperatureToConsole,1000);
