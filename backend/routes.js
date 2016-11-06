'use strict'

let path = require('path'),
mongoose = require('mongoose'),
User = require(path.resolve('backend/models/users.js')),
Temperature = require(path.resolve('backend/models/temperature.js')),
Alive = require(path.resolve('backend/models/alive.js'));

var tempvalue;
var temp;


var isLoggedIn = function (req, res, next) {

  if (req.isAuthenticated())
    return next();
  res.redirect('/login');
}


module.exports = (app, passport) => {
  app.get('/users', (request, response) => {

    User.find((error, users) => {
      if (error) { response.send(error) }

        response.json(users)
    })
  })
  
  app.get('/temperatures', (request, response) => {

    Temperature.find((error, temperatures) => {
      if (error) { response.send(error) }

        response.json(temperatures[temperatures.length-1])
    })
  })  
  
  app.get('/isalive', (request, response) => {

    var a = new Alive({alivedate:'makos'})

    Alive.find((error, alivedata) => {
      if (error) { response.send(error) }

        response.json(alivedata[alivedata.length-1])
    })
  })
  

  app.get('/', isLoggedIn, (request, response) => {
    response.sendFile(path.resolve('frontend/index.html'));
  });

  app.get('/login',  (request, response) => {
    if (request.isAuthenticated())
      response.redirect('/');
    else
      response.sendFile(path.resolve('frontend/login.html'));
  });

  app.get('/login/facebook',
    passport.authenticate('facebook', { scope: [ 'email' ] })); 

  app.get('/login/facebook/return', 
    passport.authenticate('facebook', { failureRedirect: '/login', scope : ['email'] }),
    function(req, res) {
      res.redirect('/');
    });
}

