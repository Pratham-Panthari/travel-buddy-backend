const Hotel = require('../models/Hotel')
const Room = require('../models/Room')
const createHotel = async (req, res) => {
    try {
        const { name, title, type, city, address, distance, photos, desc, cheapestPrice, featured } = req.body
        const hotel = await Hotel.create({ name, title, type, city, address, distance, photos, desc, cheapestPrice, featured })
        res.status(200).send({
            message: 'Hotel Created successfully',
            hotel
        })
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

const updateHotel = async (req, res) => {
    try {
        
        const updateHotel = await Hotel.findByIdAndUpdate(req.params.id , { $set: req.body }, { new: true })
        res.status(200).send({
            message: 'Hotel Updated Successfully',
            updateHotel
        })
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

const deleteHotel = async (req, res) => {
    try {
        const { id } = req.params
        await Hotel.findByIdAndDelete(id)
        res.status(200).send({
            message: 'hotel delete successfully'
        })
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

const getSingleHotel = async (req, res) => {
    try {
        const { id } = req.params
        const hotel = await Hotel.findById(id)
        if(!hotel){
            return res.status(404).send({
                message: 'Hotel does not exists'
            })
        }
        res.status(200).send({
            message: 'hotel found Successfully',
            hotel
        })
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

const getAllHotels = async (req, res) => {
    try {
        const { min, max, ...others } = req.query
        const hotels = await Hotel.find({...others, cheapestPrice : { $gt: min || 1 , $lt: max || 99999999 }})
        res.status(200).send({
            message: 'Hotels Fetched Succesfully',
            hotels
        })
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

const getFeturedHotels = async (req, res) => {
    try {
        const hotels = await Hotel.find(req.query)
        res.status(200).send({
            message: 'featured Hotels fetched successfully',
            hotels
        })
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

const getHotelRooms = async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.id)
        const list = await Promise.all(
            hotel.rooms.map((room) => {
                return Room.findById(room)
            })
        ) 
        res.status(200).send({
            message: 'Rooms Fetched Successfully',
            list,
        })
    } catch (error) {
        
    }
}
 
module.exports = { createHotel, updateHotel, deleteHotel, getSingleHotel, getAllHotels, getFeturedHotels, getHotelRooms }