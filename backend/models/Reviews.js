const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    reviewText: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0,
    },
}, { timestamps: true })

const Review = mongoose.model('Review', reviewSchema)

module.exports = Review;