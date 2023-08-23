const mongoose = require('mongoose')

const citySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
       
    },
    photo: {
        type: [String],
        required: true,
    },
}, { timestamps: true })

const City = mongoose.model('Cities', citySchema)

module.exports = City