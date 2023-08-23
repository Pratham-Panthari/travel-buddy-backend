const User = require('../models/User')
const { hashedPassword, comparePassword } = require('../helpers/authHelpers')
const dotenv = require('dotenv')
const JWT = require('jsonwebtoken')

dotenv.config()

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body
        if(!username){
            return res.status(400).send({ Message: 'Username is required !' })
        }
        if(!email){
            return res.status(400).send({ Message: 'Email is required !' })
        }
        if(!email.includes('@') || !email.includes('.')){
            return res.status(500).send({status: 'failed', message: 'Email invalid'})
        } 
        if(!password){
            return res.status(400).send({ Message: 'Password is required !' })
        }
        if(password.length <5 || password.length >25){
            return res.status(500).send({status: 'failed', message: 'Password must be 5-25 characters long'})
        } 

        const existingUsername = await User.findOne({ username }).maxTimeMS(1000)
        if(existingUsername){
            return res.status(300).send({ messsage: 'Username already Taken' })
        }

        const existingEmail = await User.findOne({ email }).maxTimeMS(1000)
        if(existingEmail){
            return res.status(400).send({ messsage: 'Email already exists. Please login' })
        }

        const hashPass = await hashedPassword(password)

        const user = await User.create({ username, email, password: hashPass })

        res.status(200).send({
            message: 'User Created successfully',
            id: user._id,
            username: user.username,
            email: user.email,
        })

    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
} 

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        if(!email){
            return res.status(400).send({ Message: 'Email or Password invalid !' })
        }
        if(!password){
            return res.status(400).send({ Message: 'Email or Password invalid !' })
        }

        const user = await User.findOne({ email })
        if(!user){
            return res.status(404).send({status: 'failed', message: "User does not exists, please sign up"})
        }
        
        const match = await comparePassword(password, user.password)
        if(!match){
            return res.status(404).send({status: 'failed', message: "Email or Password invalid !"})
        }

        const JWT_KEY = process.env.JWTSECRETKEY
        const token = await JWT.sign({ _id: user._id }, JWT_KEY, { expiresIn: '1d' })

        res.status(200).send({
            message: 'Login successfull',
            id: user._id,
            username: user.username,
            email: user.email,
            token,
        })


    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

module.exports = { registerUser, loginUser }