
var devices = require('./devices/devices')
var db = require('../models/uploadData')



// load the pi ap module 
var PiApp = require('./pi-app')

// load the gateway module
var Gateway = require('./devices/gateway')

// create new gateway instance
var gateway = new Gateway()

// create a new instance 
// with the exernal dependencies 
// db, devices, cpuinfo, serialnumber 
var piapp = new PiApp(db, devices, gateway) 

// Initialize the pi app 
piapp.init()
// start the event loop of the pi app 
piapp.setEventLoop()


