


module.exports = function(req, res, next) {
    
    if ( req.isAuthenticated() ) return next()

    // redirect to the login page if the user is not auth'd
    res.redirect('/auth/google')
}