var ds18b20 = require('./ds18b20')
var gpio = require('rpi-gpio')

/**
 * Class to handle all the required devices, sensors
 */
var Device = module.exports = function () {
	this.init()
}

Device.prototype.init = function () { 
	this.heatRelayPin = 11
	this.heatSourceWorking = true
	this.lowerHeatTolerance = 23.0
	this.upperHeatTolerance = 26.0
	this.heatToleranceDelta = 2
	gpio.setup(this.heatRelayPin, gpio.DIR_OUT,this.turnOffHeatRelay.bind(this))
}
/*
 * @returns the lowerHeatTolerance
 */
Device.prototype.lowerHeatTolerance = function(){
	return this.lowerHeatTolerance
}

/*
 * @returns the upperHeatTolerance
 */
Device.prototype.upperHeatTolerance = function(){
	return this.upperHeatTolerance
}

/*
 * @returns true if heat source is working, false if not
 */
Device.prototype.chekcHeatRelayStatus = function(){
	return this.heatSourceWorking
}

/*
 * @params callback function
 * @returns err - if error happened , value - the temperature value
 */
Device.prototype.temperatureDevice = function(_callback){
	ds18b20.sensors(function(err, ids) {
		if(err){
			return _callback(err,ids)
		}
		ds18b20.temperature(ids, {parser: 'hex'}, function(err, value) {
			return _callback(err,value)
		})
	})
}

/*
 * Turns on the relay for heat source
 */
Device.prototype.turnOnHeatRelay = function() {
	if(!this.heatSourceWorking){
		this.heatSourceWorking = true
		gpio.write(this.heatRelayPin, false, function(err) {
			if (err) throw err
			console.info('Turned ON HEATING!')
		})
	}
}

/*
 * Turns off the relay for heat source
 */
Device.prototype.turnOffHeatRelay = function() {
	if(this.heatSourceWorking){
		this.heatSourceWorking = false
		gpio.write(this.heatRelayPin, true, function(err) {
			if(err) throw err
			console.info('Turned OFF HEATING!')
		})
	}
}

/*
 * @param value
 * Sets heat temperature between value - heatToleranceDelta
 */
Device.prototype.setHeatingTo = function(value) {
	this.upperHeatTolerance = value + this.heatToleranceDelta
	this.lowerHeatTolerance = value - this.heatToleranceDelta
}

/*
 * @param value
 * Sets heatToleranceDelta to value
 */
Device.prototype.setHeatingDelta = function(value) {
	this.heatToleranceDelta = value
}