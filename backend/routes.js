'use strict'

let path = require('path'),
	db = require(path.resolve('backend/models/downloadData.js'))

var raspiAlive = false

module.exports = (app, passport) => {

	app.get('/getsensorids', (request, response) => {

		db.getTemperatureSensors(function(returndata){
			response.json(returndata)
		})
	})


	app.get('/gettemperature', (request, response) => {

		var sensorid = request.param('sensorid')
		if (typeof sensorid === 'undefined') sensorid = '1'

		db.getTemperature(sensorid,function(returndata){
			response.json(returndata)
		})
	})


	app.get('/gettemperatureinterval', (request, response) => {

		var sensorid = request.param('sensorid')
		var datefrom = request.param('datefrom')
		var dateto = request.param('dateto')
		if (typeof sensorid === 'undefined') sensorid = '1'

		db.getTemperatureInterval(sensorid,datefrom,dateto,function(returndata){
			response.json(returndata)
		})

	})


	app.get('/isalive', (request, response) => {

		response.json({alive : raspiAlive})
	})

	app.get('/login/facebook',
	passport.authenticate('facebook', { scope: [ 'email' ]}))

	app.get('/login/facebook/return',
	passport.authenticate('facebook', { failureRedirect: '/research', scope : ['email'] }),
	(req, res) => {
		res.redirect('/research')
	})


	app.get('/logout', (req, res) => {
		req.logout()
		res.redirect('/home')
	})

	app.get('/checkAuth', (req, res) => {

		//console.log(req.user);
		if (req.isAuthenticated()) {
			res.json({'status' : 'authenticated', 'user' : req.user.fb})
		} else {
			res.json({'status' : 'unauthenticated'})
		}
	})

	app.get('*', (request, response) => {
		response.sendFile(path.resolve('./frontend/index.html'))
	})
}

setInterval(() => {
	db.getPulse((returndata) => {
		raspiAlive = returndata
	}
)},5000)
