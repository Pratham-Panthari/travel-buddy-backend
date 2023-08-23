const mongoose = require('mongoose')

const reservationSchema = new mongoose.Schema({
    hotelName : {
        type: String,
        required: true,
    },
    roomName: {
        type: [String],
        required: true,
    },
    roomPrice: {
        type: [Number],
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    roomNumber : {
        type: [Number],
        required: true,
    },
    reservationDate: {
        type: [Date],
        
    }
})

const Reservation = mongoose.model('Reservation', reservationSchema)

module.exports = Reservation