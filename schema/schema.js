const mongoose = require('mongoose')

const infoSchema = new mongoose.Schema({
    key: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    },
    timestamp: {
        type: Number,
        required: true,
    }
})


module.exports = mongoose.model('Info', infoSchema)