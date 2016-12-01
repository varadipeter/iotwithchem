'use strict'

let path = require('path'),
	db = require(path.resolve('backend/models/downloadData.js')),
	mq = require(path.resolve('backend/models/messagequeue.js'))

var raspiAlive = false

module.exports = (app, passport) => {

	app.get('/getsensorids', (req, res) => {
		db.getTemperatureSensors(function(returndata){
			res.json(returndata)
		})
	})


	app.get('/gettemperature', (req, res) => {
		var sensorid = req.param('sensorid')
		if (typeof sensorid === 'undefined') sensorid = '1'

		db.getTemperature(sensorid,function(returndata){
			res.json(returndata)
		})
	})


	app.get('/gettemperatureinterval', (req, res) => {
		var sensorid = req.param('sensorid')
		var datefrom = req.param('datefrom')
		var dateto = req.param('dateto')
		if (typeof sensorid === 'undefined') sensorid = '1'

		db.getTemperatureInterval(sensorid,datefrom,dateto,function(returndata){
			res.json(returndata)
		})

	})


	app.get('/isalive', (req, res) => {
		res.json({alive : raspiAlive})
	})

	app.get('/login/facebook',
	passport.authenticate('facebook', { scope: [ 'email' ]}))

	app.get('/login/facebook/return',
	passport.authenticate('facebook', { failureRedirect: '/research', scope : ['email'] }),
	(req, res) => {
		res.redirect('/home')
	})


	app.get('/logout', (req, res) => {
		req.session.destroy()
		res.json({'status' : 'logged out'})
	})

	app.get('/checkAuth', (req, res) => {
		if (req.isAuthenticated()) {
			res.json({'status' : 'authenticated'})
		} else {
			res.json({'status' : 'unauthenticated'})
		}
	})

	app.get('/setheateron', function (req, res) {
		mq.sendmsgtoRaspberry('Heater:ON')
    	res.json({ heater: true });
	})

	app.get('/setheateroff', function (req, res) {
		mq.sendmsgtoRaspberry('Heater:OFF')
    	res.json({ heater: false })
	})

	app.get('/setheatertemperature', function (req, res) {
		var heatertemp = req.param('heatertemp')
    	mq.sendmsgtoRaspberry('Heater:Temperature:'+heatertemp)
    	res.json({ heater: true })
	})

	app.get('*', (req, res) => {
		res.sendFile(path.resolve('./frontend/index.html'))
	})


}

setInterval(() => {
	db.getPulse((returndata) => {
		raspiAlive = returndata
	}
)},3000)
