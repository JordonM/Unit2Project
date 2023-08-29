const express = require('express')
require('dotenv').config()
const path = require('path')
const middleware = require('./utils/middleware')

// we'll build a middleware function to user in this file

// our routers/controllers will be imported here
const AuthRouter = require('./controllers/authControllers')
const DriverRouter = require('./controllers/driverControllers')
const CommentRouter = require('./controllers/commentControllers')

const app = express()

// set up our view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/////////////////////
//// Middleware  ////
/////////////////////
middleware(app)

////////////////
//// Routes ////
////////////////
app.get('/', (req, res) => {
    res.redirect('/drivers')

})
app.get('/drivers', function (req, res) {
    res.send('<h1>Hello Drivers!</h1>');
});
app.get('/comments', function (req, res) {
    res.send('<h1>Hello Comments!</h1>');
});
  
  

app.use('/', AuthRouter)
app.use('/drivers', DriverRouter)
app.use('/comments', CommentRouter)

//////////////////////////
//// Server Listener  ////
//////////////////////////
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log('DriveHive is ready to go')
})