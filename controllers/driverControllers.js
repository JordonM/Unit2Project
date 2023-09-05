//////////////////////////////
//// Import Dependencies  ////
//////////////////////////////
const express = require('express')
require('dotenv').config()

const Driver = require('../models/driver')
const checkLogin = require('../utils/ensureLoggedIn')

// const axios = require('axios')

const router = express.Router()
const multer = require('multer');

//////////////////////////////
//// Routes + Controllers ////
//////////////////////////////
// Index
router.get('/', (req, res) => {
    Driver.find({})
        .then(drivers => {
            console.log('found these drivers', drivers)
            console.log('req user', req.user)

            res.render('drivers/index', { drivers, title: 'All Drivers' })
        })
        .catch(error => console.error)
})
router.get('/home', checkLogin, (req, res) => {
    res.render('drivers/home', { title: 'Test'})
})

router.get('/index', checkLogin, (req, res) => {
    res.render('drivers/index', { title: 'Add a new Driver!'})
})
// new
router.get('/new', checkLogin, (req, res) => {
    res.render('drivers/new', { title: 'Add a new Driver'})
})
router.get('/about', checkLogin, (req, res) => {
    res.render('drivers/about', { title: 'Test'})
})
// Create
router.post('/', checkLogin, (req, res) => {
    // need to assign owner
    req.body.owner = req.user._id
    // handle our checkbox
    req.body.favorite = req.body.favorite === 'on' ? true : false

    console.log(req.body)
    Driver.create(req.body)
        .then(driver => {
            res.redirect(`/drivers/${driver._id}`)
        })
        .catch(err => {
            console.log(err)
            res.redirect('/drivers/new')
        })
})
// edit
router.get('/edit/:id', checkLogin, (req, res) => {
    Driver.findById(req.params.id)
        .then(driver => {
            console.log('found this driver', driver)

            res.render('drivers/edit', { driver, title: `Edit ${driver.name}`})
        })
        .catch(error => console.error)
})
// Update
router.patch('/:id', checkLogin, (req, res) => {
    // handle our checkbox
    req.body.favorite = req.body.favorite === 'on' ? true : false

    Driver.findById(req.params.id)
        .then(driver => {
            if (req.user && driver.owner == req.user.id) {
                return driver.updateOne(req.body)
            } else {
                res.send('something went wrong')
            }
        })
        .then(data => {
            console.log('what is returned from updateOne', data)

            res.redirect('/drivers')
        })
        .catch(error => console.error)
})

// Delete
router.delete('/:id', checkLogin, (req, res) => {
    // we want to find the driver
    Driver.findById(req.params.id)
        // then we want to delete the driver
        .then(driver => {
            if (req.user && driver.owner == req.user.id) {
                return driver.deleteOne()
            } else {
                res.send('something went wrong')
            }
        })
        // then redirect the user
        .then(data => {
            console.log('returned from deleteOne', data)
            res.redirect('/drivers')
        })
        // catch any errors
        .catch(error => console.error)
})
// Show
router.get('/:id', (req, res) => {
    Driver.findById(req.params.id)
        .populate('owner')
        .populate('comments.author')
        .then(driver => {
            console.log('found this driver', driver)
            res.render("drivers/show", { driver, title:`${driver.name}`})
        })
        .catch(error => console.error)
})

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb (null, "public/images");
    }, 
    filename: function (req, file, cb) {
        cb (null, file.filename + "_" + Date.now() + "_" + file.originalname);
    },
});


////////////////////////////
//// Export the Router  ////
////////////////////////////
module.exports = router