const mongoose = require('mongoose')

const testimonailSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    testimonay: {
        type: String,
        required: true,
    },
})

const Testimonials = mongoose.model('Testimonials', testimonailSchema)

module.exports = Testimonials