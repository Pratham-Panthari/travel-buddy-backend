const Testimonials = require('../models/Testimonials')


const createTestimony = async (req, res) => {
    try {
        
        const { username, testimonay } = req.body
        if(!username){
            return res.status(400).send({ message: 'Username is Required' })
        } 
        if(!testimonay){
            return res.status(400).send({ message: 'Testimony Text is Required' })
        }
        const testimonial = await Testimonials.create({ username, testimonay })
        res.status(200).send({
            message: 'Testimonay Created Successfully',
            testimonial
        })
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

const getAllTestimony = async (req, res) => {
    try {
        const testimonials = await Testimonials.find({})
        res.status(200).send({
            message: 'Testimonails Fetched Successfully',
            testimonials
        })
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

module.exports = { createTestimony, getAllTestimony }