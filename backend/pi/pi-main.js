
var devices = require('./devices/devices')
var cpuinfo = require('./devices/cpuinfo')()
var serialNumber = cpuinfo['Serial'] == undefined ? -1 : cpuinfo['Serial'][0]
var db = require('../models/uploadData')


// load the pi ap module 
var PiApp = require('./pi-app'); 

// create a new instance 
// with the exernal dependencies 
// db, devices, cpuinfo, serialnumber 
var piapp = new PiApp(db, devices, cpuinfo, serialNumber) 

// Initialize the pi app 
piapp.init()
// start the event loop of the pi app 
piapp.setEventLoop()


