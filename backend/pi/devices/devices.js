var ds18b20 = require('./ds18b20')

var gpio = require('rpi-gpio')
var heatRelayPin = 11
var heatSourceWorking = true
var lowerHeatTolerance = 23.0
var upperHeatTolerance = 26.0
module.exports.lowerHeatTolerance = lowerHeatTolerance
module.exports.upperHeatTolerance = upperHeatTolerance
 
gpio.setup(heatRelayPin, gpio.DIR_OUT,turnOffHeatRelay)

function temperatureDevice(_callback)
{
	ds18b20.sensors(function(err, ids) {

		if(err){
			return _callback(err,ids)
		}
		ds18b20.temperature(ids, {parser: 'hex'}, function(err, value) {
			return _callback(err,value)
		})
	})
}

module.exports.temperatureDevice = temperatureDevice

function turnOnHeatRelay() {
	if(!heatSourceWorking){
		heatSourceWorking = true
		gpio.write(heatRelayPin, false, function(err) {
			if (err) throw err
			console.info('Turned ON HEATING!')
		})
	}
}

module.exports.turnOnHeatRelay = turnOnHeatRelay

function turnOffHeatRelay() {
	if(heatSourceWorking){
		gpio.write(heatRelayPin, true, function(err) {
			if(err) throw err
			console.info('Turned OFF HEATING!')
		})
		heatSourceWorking = false
	}
}

module.exports.turnOffHeatRelay = turnOffHeatRelay
