//var db = require('../models/uploadData')

// load the Db module 

var Db = require('../models/db')

// load the pi ap module 
var PiApp = require('./pi-app')

// load the gateway module
var Gateway = require('./devices/gateway')

// load the devices module
var Devices = require('./devices/pi_devices.js')


// create new devices instance
//var devices = new Devices()

// create new gateway instance
var gateway = new Gateway()

// create a new Db instance 
var db = new Db(); 


// Create new Temperature Device 
var TemperatureDevice = require('./devices/temperature.device') 
var temperaturedevice = new TemperatureDevice 

//  Create new HeatSource Device 

var HeatSourceDevice =  require ('./devices/heatsource.device')
var heatsourcedevice = new HeatSourceDevice()   

// Create new Temperature Device 

// create a new instance 
// with the exernal dependencies 
// db, devices, gateway 
var piapp = new PiApp(db, temperaturedevice, heatsourcedevice, gateway) 

// Initialize the pi app 
piapp.init()
// start the event loop of the pi app 
piapp.setEventLoop()


