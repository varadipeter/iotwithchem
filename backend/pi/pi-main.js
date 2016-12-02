var db = require('../models/uploadData')
var messagequeue = require('../models/messagequeue-pi')

// load the pi ap module 
var PiApp = require('./pi-app')

// load the gateway module
var Gateway = require('./devices/gateway')

// load the devices module
var Devices = require('./devices/pi_devices.js')

// create new devices instance
var devices = new Devices()

// create new gateway instance
var gateway = new Gateway()

// create a new instance 
// with the exernal dependencies 
// db, devices, gateway, messagequeue
var piapp = new PiApp(db, devices, gateway, messagequeue) 

// Initialize the pi app 
piapp.init()
// start the event loop of the pi app 
piapp.setEventLoop()


