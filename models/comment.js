const mongoose = require('../utils/connection')


const { Schema } = mongoose

// comment schema
const commentSchema = new Schema({
    note: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
})

// export

module.exports = commentSchema