const express = require('express')
const { createReservation, getReservations } = require('../controllers/reservationController')

const router = express.Router()

router.post('/create-reservation', createReservation)

router.get('/get-all-reservations', getReservations)

module.exports = router