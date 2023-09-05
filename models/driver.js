const mongoose = require('../utils/connection')
// import our commentSchema, to use as a subdocument
const commentSchema = require('./comment')


const { Schema, model } = mongoose

// driver schema
const driverSchema = new Schema({
    name: {
        type: String
    },
    color: {
        type: String
    },
    favorite: {
        type: Boolean
    },
    image: {
        type: String
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [commentSchema]
}, { timestamps: true })


const Driver = model('Driver', driverSchema)

//////////////////////////
//// Export our Model ////
//////////////////////////
module.exports = Driver