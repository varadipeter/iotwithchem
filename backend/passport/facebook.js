var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../models/users');


module.exports = function(passport) {

	passport.use('facebook', new FacebookStrategy({
		clientID: '323023344746285',
		clientSecret: 'ebdb4703aed8f6812d51be129cef8ce2',
		callbackURL: 'http://localhost:8081/login/facebook/return',
		profileFields: ['id', 'name', 'link', 'about','email']
	},

    // facebook will send back the tokens and profile
    function(access_token, refresh_token, profile, done) {

    	console.log('profile', profile);

    	process.nextTick(function() {

			// find the user in the database based on their facebook id
			User.findOne({ 'fb.id' : profile.id }, function(err, user) {

				if (err)
					return done(err);

				if (user) {
					return done(null, user);
				} else {

					var newUser = new User();

					newUser.fb.id    = profile.id;      
					newUser.fb.access_token = access_token; 
					newUser.fb.name  = profile.name.givenName + profile.name.familyName; 
					newUser.fb.email = profile.emails[0].value;

					newUser.save(function(err) {
						if (err)
							throw err;

						return done(null, newUser);
					});
				}
			});
		});
    }));
};
