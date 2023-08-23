const express = require('express')
const { registerUser, loginUser } = require('../controllers/authController')

const router = express.Router()

//Create a user || Register a user
router.post('/register', registerUser)

//Login a user
router.post('/login', loginUser)

module.exports = router