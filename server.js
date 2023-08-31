const express = require('express')
require('dotenv').config()
const path = require('path')
const middleware = require('./utils/middleware')



// routers/controllers 
const AuthRouter = require('./controllers/authControllers')
const DriverRouter = require('./controllers/driverControllers')
const CommentRouter = require('./controllers/commentControllers')

const app = express()

// view engine
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


  
app.use('/', AuthRouter)
app.use('/drivers', DriverRouter)
app.use('/home', DriverRouter)
app.use('/comments', CommentRouter)


//////////////////////////
//// Server Listener  ////
//////////////////////////
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log('DriveHive is ready to go')
})
