const express = require('express')
const { createRoom, updateRoom, deleteRoom, getSingleRoom, getAllRooms, updateRoomAvailability, deleteRoomAvailability } = require('../controllers/roomController')

const router = express.Router()

//Create Room
router.post('/create-room/:hotelid', createRoom)

//Update Room
router.put('/update-room/:id', updateRoom)

//Update Room Availability
router.put('/update-room-availability/:id', updateRoomAvailability)

//delete Room
router.delete('/delete-room/:roomid/delete-hotel-room/:hotelid', deleteRoom)

router.delete('/delete-room-availability/:id', deleteRoomAvailability)

//Get Single Room
router.get('/get-single-room/:id', getSingleRoom)

//Get all Rooms
router.get('/get-all-rooms', getAllRooms)
module.exports = router