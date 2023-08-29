const mongoose = require('../utils/connection')
// import our commentSchema, to use as a subdocument
const commentSchema = require('./comment')


const { Schema, model } = mongoose

// driver schema
const driverSchema = new Schema({
    name: {
        type: String
    },
    number: {
        type: String
    },
    favorite: {
        type: Boolean
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [commentSchema]
}, { timestamps: true })

// make the fruit model
// the model method takes two arguments
// the first is what we call our model
// the second is the schema used to build the model
const Driver = model('Driver', driverSchema)

//////////////////////////
//// Export our Model ////
//////////////////////////
module.exports = Driver