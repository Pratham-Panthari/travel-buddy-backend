const express = require('express')
const cors = require('cors')
const run = require('./db')
const authRoute = require('./routes/authRoute')
const hotelRoute = require('./routes/hotelRoute')
const userRoute = require('./routes/userRoute')
const roomRoute = require('./routes/roomRoute')
const cityRoute = require('./routes/cityRoute')
const reservationRoute = require('./routes/reservationRoute')
const TestimonialRoute = require('./routes/testimonialRoute')
const path = require('path')

run()

const app = express()



app.use(cors())

app.use(express.json())

app.use(express.static(path.join(__dirname, '../client/dist')))

app.use('/api/v1/auth', authRoute)
app.use('/api/v1/user', userRoute)
app.use('/api/v1/hotel', hotelRoute)
app.use('/api/v1/rooms', roomRoute)
app.use('/api/v1/featured-cities', cityRoute)
app.use('/api/v1/testimonials', TestimonialRoute)
app.use('/api/v1/reservation', reservationRoute)


app.use('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'))
})

const PORT = process.env.PORT 

app.listen(PORT, () => {
    
    console.log(`Server running on http://localhost:${PORT}`)
})