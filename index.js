'use strict'

let express = require('express'),
app = express(),
mongoose = require('mongoose'),
    // Configuring Passport
    passport = require('passport'),
    expressSession = require('express-session');

// set port
app.set('port', process.env.PORT || 8081)

app.use(express.static(__dirname + ''))

app.use(function(req, res, next) {

  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
})


// database connection settings
mongoose.connection.on('open', (ref) => {
	console.log('Connected to mongo server.')
})

mongoose.connection.on('error', (error) => {
	console.log('Could not connect to mongo server!')
	console.log(error);
})

// connect to database on mongolab
mongoose.connect('mongodb://localhost:27017/iotwithchem',function(err) {
	if (err) console.log("erros:"+err);
}); //('mongodb://votiv:votiv@ds031257.mlab.com:31257/kemia-db')

// run
app.listen(app.get('port'), () => {
	console.log('App is running on port ', app.get('port'))
});

exports = module.exports = app


app.use(expressSession({secret: 'mySecretKey',resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


var initPassport = require('./backend/passport/init');
initPassport(passport);

// routing
require('./backend/routes')(app,passport)
