const Reservation = require('../models/Reservation')

const createReservation = async (req, res) => {
    try {
       
        const reservation = await Reservation.create(req.body)
        if(reservation){
            res.status(200).send({
                Message: 'Reservation successfull',
                reservation
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

const getReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find({})
        res.status(200).send({
            Message: 'Reservations fetched successfully',
            reservations
        })       
    } catch (error) {
        console.log(error)
    }
}

module.exports = { createReservation, getReservations }