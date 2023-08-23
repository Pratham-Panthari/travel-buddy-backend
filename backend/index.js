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


run()

const app = express()



app.use(cors({
    origin: ["https://travelbuddyserver.onrender.com/api/v1/rooms", "http://localhost:8080"]
})

app.use(express.json())



app.use('/api/v1/auth', authRoute)
app.use('/api/v1/user', userRoute)
app.use('/api/v1/hotel', hotelRoute)
app.use('/api/v1/rooms', roomRoute)
app.use('/api/v1/featured-cities', cityRoute)
app.use('/api/v1/testimonials', TestimonialRoute)
app.use('/api/v1/reservation', reservationRoute)




const PORT = process.env.PORT 

app.listen(PORT, () => {
    
    console.log(`Server running on http://localhost:${PORT}`)
})
