

var mongoose = require('mongoose') // hm.... realy needs it?  



/* 
**  Create an initial   app class
** with the injected external dependencies  
** 
*/ 
var PiApp = module.exports =  function (db, device, cpuinfo, serialnumber) {
	this.db             = db 
    this.device         = device; 
    this.cpuinfo        = cpuinfo; // Hm... realy needs it? 
    this.serialnumber   = serialnumber;  
} 

/**
 *   Init functions 
 * 
 */
PiApp.prototype.init = function () { 
	this.hearthBeatInterval = 3000 
	this.temperatureUploadInterval = 30000 
	this.heatingCheckInterval = 2000
} 


/** 
 * Uploads data to database 
 */
PiApp.prototype.uploadDataToDatabase = function () {
	this.device.temperatureDevice(function(err,value){
		console.info('Raspberry -',this.serialNumber)
		console.info('Current temperature on sensor is', value)
		this.db.createTemperatureMessage(this.serialNumber,'1',value,new Date().getTime(),function(err){
			if (err) console.error(err)            
		})
	})
}
 
/** 
 * 
 */
PiApp.prototype.heatingCheck = function(){
	this.device.temperatureDevice(function(err,value){
		console.log('Current temperature',value)
		if(value<devices.lowerHeatTolerance){
			this.device.turnOnHeatRelay()
		}
		else if(value>devices.upperHeatTolerance){
			this.device.turnOffHeatRelay()
		}
	})
}

/**
 *  Set the main event loop  
 * 
 *  */ 
PiApp.prototype.setEventLoop = function () {

	setInterval(this.IsAlive,this.hearthBeatInterval)
	setInterval(this.uploadDataToDatabase,this.temperatureUploadInterval)
	setInterval(this.heatingCheck,this.heatingCheckInterval

}