//////////////////////////////
//// Import Dependencies  ////
//////////////////////////////
const express = require('express')
require('dotenv').config()

const Driver = require('../models/driver')
const checkLogin = require('../utils/ensureLoggedIn')

const router = express.Router()

//////////////////////////////
//// Routes + Controllers ////
//////////////////////////////

// Create
router.post('/:driverId', checkLogin, (req, res) => {
    // need to assign owner
    req.body.author = req.user._id


    Driver.findById(req.params.driverId)

        .then(driver => {
            driver.comments.push(req.body)

            return driver.save()
        })
        // redirect
        .then(driver => {
            res.redirect(`/home`)
        })
        // handle errors
        .catch(error => console.error)
})

// edit
// hint for subdoc update -> render a form similar to how we updated the fruit
router.get('/edit/:id', checkLogin, (req, res) => {
    res.send('commend edit form')
})

// Update
// update route should follow the same steps as delete, but with update instead of delete
// look up update methods in the mongoose docs
router.patch('/:id', checkLogin, (req, res) => {
    res.send('edit comment route')
})

// Delete
router.delete('/:driverId/:commentId', checkLogin, (req, res) => {
    const fId = req.params.driverId
    const cId = req.params.commentId

    Driver.findById(fId)
        .then(driver => {
            // isolate the comment
            const theComment = driver.comments.id(cId)
            // check for ownership
            if (req.user && theComment.author == req.user.id) {
                // run a document method to remove the comment(could also use .remove())
                theComment.deleteOne()
                // save the parent model
                return driver.save()
            } else {
                res.send('something went wrong')
            }
        })
        .then(driver => {
            // redirect to the show page
            res.redirect(`/home`)
        })
        .catch(error => console.error)
})


////////////////////////////
//// Export the Router  ////
////////////////////////////
module.exports = router
