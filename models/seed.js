const mongoose = require('../utils/connection')
const Driver = require('./driver')

///////////////////////////
//// Seed Script code  ////
///////////////////////////

// db variable
const db = mongoose.connection


db.on('open', () => {

    const startDriver = [
        { name: 'Lance Stroll', color: 'orange', favorite: true },
        { name: 'Lewis Hamilton', color: 'purple', favorite: true },
        { name: 'Lando Norris', color: 'green', favorite: false },
        { name: 'George Russell', color: 'red', favorite: false }
    ]

    // when we seed the database, we remove everything from this collection
    Driver.deleteMany({ owner: null })
        .then(() => {

            Driver.create(startDriver)
                .then(data => {
                    console.log('these are the drivers: \n', data)
                    db.close()
                })
                .catch(err => {
                    console.log('something went wrong \n', err)
                    db.close()
                })
        })
        // as always, handle errors
        .catch(err => {
            console.log('something went wrong \n', err)
            db.close()
        })
})
