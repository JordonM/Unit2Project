// import the passport module
const passport = require('passport');
const User = require('../models/user');

// define our passport oauth strategy
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// implementing the google strategy
passport.use(new GoogleStrategy(
    
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK
    },
    // the verify callback function
    async function(accessToken, refreshToken, profile, cb) {
        // a user has logged in with OAuth
        try {
            // check for the user in our db
            let user = await User.findOne({ googleId: profile.id})
           
            if (user) return cb(null, user)
            
            user = await User.create({
                name: profile.displayName,
                googleId: profile.id,
                email: profile.emails[0].value,
                avatar: profile.photos[0].value
            })
            return cb(null, user)
        } catch (err) {
            return cb(err)
        }
    }
))


passport.serializeUser(function(user, cb) {
    cb(null, user._id)
})

passport.deserializeUser(async function(userId, cb) {
    cb(null, await User.findById(userId))
})