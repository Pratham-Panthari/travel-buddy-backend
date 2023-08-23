const express = require('express')
const { createTestimony, getAllTestimony } = require('../controllers/testimonalController')

const router = express.Router()

//Create Testimony
router.post('/create-testimony', createTestimony)

//Get all Testimonials
router.get('/get-testimonials', getAllTestimony)

module.exports = router