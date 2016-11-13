var facebook = require('./facebook');
var User = require('../models/users');

module.exports = function(passport){

	// Passport needs to be able to serialize and deserialize users to support persistent login sessions
    passport.serializeUser(function(user, done) {
        console.log('serializing user: ');
        console.log(user);
        done(null, user.fb.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findOne({'fb.id' : id}, function(err, user) {
            console.log('deserializing user:',user);
            done(err, user);
        });
    });

    // Setting up Passport Strategies for Facebook
    facebook(passport);


}
