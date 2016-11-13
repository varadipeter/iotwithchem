var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../models/users');
var fb = require('fb');
module.exports = function(passport) {
    passport.use('facebook', new FacebookStrategy({
            clientID: '190103424780365',
            clientSecret: '6f2b8d730b04ae86285aac21bbfe1e41',
            callbackURL: 'https://mongodbtempmeasure.herokuapp.com/login/facebook/return',
            profileFields: ['id', 'name', 'link', 'about', 'email']
        },
        // facebook will send back the tokens and profile
        function(access_token, refresh_token, profile, done) {
            console.log('profile', profile);
            process.nextTick(function() {
                fb.api("/687797544718797/members?access_token=" + access_token, function(response) {
                    if (response.error) return done(response.error);
                    if (response) {
                        var exists = false;
                        response.data.forEach(function(user, i) {
                            if (user.id == profile.id) {
                                exists = true;
                                User.findOne({
                                    'fb.id': profile.id
                                }, function(err, user) {
                                    if (err) {
                                        console.log(err);
                                        return done(err);
                                    } else if (user) {
                                        console.log('exists in the db');
                                        return done(null, user);
                                    } else {
                                        var newUser = new User();
                                        newUser.fb.id = profile.id;
                                        newUser.fb.access_token = access_token;
                                        newUser.fb.name = profile.name.givenName + profile.name.familyName;
                                        newUser.fb.email = profile.emails[0].value;
                                        newUser.save(function(err) {
                                            if (err) {
                                                throw err;
                                            } else {
                                                return done(null, newUser);
                                            }
                                        });
                                    }
                                });
                            }
                        })
                        if (!exists) {
                            return done(null, false);
                        }
                    }
                })
            })
        }))
};