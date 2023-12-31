const express = require('express');
const router = express.Router();
const passport = require('passport')

// Google OAuth login route
router.get('/auth/google', passport.authenticate(
    'google',
    {
    scope: ['profile', 'email']
    }
))

// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
    'google',
    {
    successRedirect: '/drivers',
    failureRedirect: '/drivers'
    }
))

// OAuth logout route
router.get('/logout', function(req, res) {
    req.logout(function() {
        res.redirect('/drivers')
    })
})

module.exports = router;