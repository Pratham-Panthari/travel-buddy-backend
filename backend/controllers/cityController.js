const City = require('../models/Cities')
const slugify = require('slugify')
const addCity = async (req, res) => {
    try {
        const { name, slug, photo } = req.body
        const city = await City.create({ name, slug: slugify(name), photo })
        res.status(200).send({
            message: 'Feature City Added successfully',
            city
        })
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

const deleteCity = async (req, res) => {
    try {
        const { id } = req.params
        const city = await City.findByIdAndDelete(id)
        if(!city){
            return res.status(404).send('City Does not exists')
        }
        res.status(200).send({
            message: 'Fetured City Removed Successfully',
        })
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

const getCity = async (req, res) => {
    try {
        const cities = await City.find({})
        res.status(200).send({
            message: 'Featured Cities Fetched Successfully',
            cities,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

module.exports = { addCity, deleteCity, getCity }