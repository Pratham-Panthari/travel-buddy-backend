const express = require('express')
const { createHotel, updateHotel, deleteHotel, getSingleHotel, getAllHotels, getFeturedHotels, getHotelRooms } = require('../controllers/hotelController')
const router = express.Router()

//Create Hotel
router.post('/create-hotel', createHotel)

//Update Hotel 
router.put('/update-hotel/:id', updateHotel)

//Delete Hotel
router.delete('/delete-hotel/:id', deleteHotel)

//Get Single Hotel
router.get('/get-single-hotel/:id', getSingleHotel)

//Get All Hotels
router.get('/get-all-hotels', getAllHotels)

router.get('/get-featured-hotels', getFeturedHotels)

router.get('/rooms/:id', getHotelRooms)

module.exports = router