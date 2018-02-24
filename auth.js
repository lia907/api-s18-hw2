// Load required packages
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;

passport.use(new BasicStrategy(
    function(username, password, done) {
        //hard coded
        var user = { name: "sookim" };
        if (username == user.name && password == "apihw2pw")
        {
            return done(null, user);
        }
        else
        {
            return done(null, false);
        }
    }
));

exports.isAuthenticated = passport.authenticate('basic', { session : false });