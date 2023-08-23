const express = require('express')
const { addCity, deleteCity, getCity } = require('../controllers/cityController')

const router = express.Router()

router.post('/add-fetured-cities', addCity)

router.get('/get-featured-cities', getCity)

router.delete('/delete-fetured-cities/:id', deleteCity)

module.exports = router