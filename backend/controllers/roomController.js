const Room = require('../models/Room')
const Hotel = require('../models/Hotel')

const createRoom = async (req, res) => {
    try {
        const hotelId = req.params.hotelid
        const room = await Room.create(req.body)
        try {
            await Hotel.findByIdAndUpdate(hotelId, { $push: { rooms: room._id } })
        } catch (error) {
            console.log(error)
            res.status(400).send(error)
        }
        

        res.status(200).send({
            message: 'Room Created Successfully',
            room
        })
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

const updateRoom = async (req, res) => {
    try {
        const { id } = req.params
        const updatedRoom = await Room.findByIdAndUpdate(id, { $set: req.body }, { new: true })
        res.status(200).send({
            message: 'Updated Successfully',
            updatedRoom,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

const updateRoomAvailability = async(req, res) => {
    try {
        const update = await Room.updateOne(
            { "roomNumbers._id": req.params.id },
            {
               $push: {
                    "roomNumbers.$.unavailableDates": req.body.dates,
               }, 
            }
        )
        
        res.status(200).send({ message: "Room updated successfully" })
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

const deleteRoomAvailability = async(req, res) => {
    try {
        const update = await Room.updateOne(
            { "roomNumbers._id": req.params.id },
            {
               $pull: {
                    "roomNumbers.$.unavailableDates": req.body.dates,
               }, 
            }
        )
        
        res.status(200).send({ message: "Room updated successfully" })
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

const deleteRoom = async (req, res) => {
    try {
        const hotelId = req.params.hotelid
        const roomId = req.params.roomid
        await Room.findByIdAndDelete(roomId)
        try {
            await Hotel.findByIdAndUpdate(hotelId, { $pull: { rooms: roomId } } )
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
        res.status(200).send('Deleted Successfully')
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

const getSingleRoom = async (req, res) => {
    try {
        const id = req.params.id
        const room = await Room.findById(id)
        if(!room){
            return res.status(404).send('No such room exists')
        }
        res.status(200).send({
            message: 'Fetch successfull',
            room
        })
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

const getAllRooms = async (req, res) => {
    try {
        
        const rooms = await Room.find({})
        res.status(200).send({
            message: 'Fetch successfull',
            rooms
        })
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

module.exports = { createRoom, updateRoom, deleteRoom, getSingleRoom, getAllRooms, updateRoomAvailability, deleteRoomAvailability  }