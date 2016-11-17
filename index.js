'use strict'

let express = require('express'),
	app = express(),
	mongoose = require('mongoose'),
	// Configuring Passport
	passport = require('passport'),
	expressSession = require('express-session')

// set port
app.set('port', process.env.PORT || 8081)

app.use(express.static(__dirname + ''))

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE')
	res.header('Access-Control-Allow-Headers', 'Content-Type')
	next()
})

// database connection settings
mongoose.connection.on('open', () => {
	console.info('Connected to mongo server.')
})

mongoose.connection.on('error', (error) => {
	console.error('Could not connect to mongo server!', error)
})

// connect to database on mongolab
mongoose.connect('mongodb://heroku_hww55rc1:2ic4cjhncvmlse83a21lnejpru@ds139187.mlab.com:39187/heroku_hww55rc1',function(err) {
	if (err) console.error('erros:' + err)
}) //('mongodb://votiv:votiv@ds031257.mlab.com:31257/kemia-db')

// run
app.listen(app.get('port'), () => {
	console.info('App is running on port ', app.get('port'))
})

exports = module.exports = app

app.use(expressSession({secret: 'mySecretKey',resave: true, saveUninitialized: true }))
app.use(passport.initialize())
app.use(passport.session())

let initPassport = require('./backend/passport/init')
initPassport(passport)

// routing
require('./backend/routes')(app, passport)
