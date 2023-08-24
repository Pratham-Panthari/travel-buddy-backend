import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';
import NewsLetter from '../components/NewsLetter';
import { useDate } from '../context/dateContext';
import { useAuth } from '../context/authContext';

const HotelDetails = () => {

  const navigate = useNavigate()

  //Booking Dates Context
  const [contextDate, setContextDate] = useDate()
  const [auth, setAuth] = useAuth()

  //Using Location to check if the path changes if yes then change the rendered hotel based on id
  const url = window.location.pathname.split('/').pop();

  //All useState() used
  const [selectedRooms, setSelectedRooms] = useState([])
  const [selectedRoomsName, setSelectedRoomsName] = useState([])
  const [selectedRoomsPrice, setSelectedRoomsPrice] = useState([])
  const [selectedRoomsNumber, setSelectedRoomsNumber] = useState([])
  const [roomList, setRoomList] = useState([])
  const [openModal, setOpenModal] = useState(false) 
  const [hotel, setHotel] = useState({})
  const [loading, setLoading] = useState(false)

  //To get the hotel id from the URL
  const params = useParams()

  //Fetch the hotel based on id
  const getHotel = async () => {
    setLoading(true)
    try {
      const id = params.id
      const res = await axios.get(`https://travelbuddyserver.onrender.com/api/v1/hotel/get-single-hotel/${id}`)
      if(res.data){
        setHotel(res.data.hotel);
        setLoading(false)
      }
      
    } catch (error) {
      
    }
  }

  //Fetch the hotel rooms based on the hotel id
  const getHotelRooms = async() => {
    try {
      const res = await axios.get(`https://travelbuddyserver.onrender.com/api/v1/hotel/rooms/${hotel._id}`)
      if(res?.data){
        setRoomList(res.data.list);
      }
      
    } catch (error) {
      
    }
  }

  //To handle all the selected rooms for booking
  const handleChecked = (e) => {
    const checked = e.target.checked
    const value = e.target.value
    setSelectedRooms(
      checked ? [...selectedRooms, value] : selectedRooms.filter((item) => item !== value)
    )
  }

  //Getting all the timeStamps of the booking dates from the contextDate api
  const getDatesList = (startDate, endDate) => {
    const start = new Date(startDate)
    const end = new Date(endDate)

    const date = new Date(start.getTime())

    const dates = []

    while(date <= end){
      dates.push(new Date(date).getTime())
      date.setDate(date.getDate() + 1)
    }
    return dates
  }
  
  //Calling the get-all-dates function
  const bookedDates = getDatesList(contextDate[0].startDate, contextDate[0].endDate)

  
  //Checking if a paticular room is available on the booking dates provided by the  user
  const isAvailable = (roomNumber) => {

    if (roomNumber.unavailableDates) {

      const isFound = roomNumber.unavailableDates.some((date) => 
        bookedDates.includes(new Date(date).getTime()),
        
      );
      
      return !isFound;
    }

    return true
  }

  const handleClick = async () => {
    try {
      await Promise.all(
        selectedRooms.map((id) => {
          const res =  axios.put(`https://travelbuddyserver.onrender.com/api/v1/rooms/update-room-availability/${id}`, {dates: bookedDates})
          return res
        })
      )
      
    } catch (error) {
      
    }
  }

  const handleReservation = async() => {
    try {
        const res = await axios.post('https://travelbuddyserver.onrender.com/api/v1/reservation/create-reservation', { hotelName: hotel.name, roomName: selectedRoomsName, roomPrice: selectedRoomsPrice, username: auth?.username , userId: auth?.id, roomNumber: selectedRoomsNumber, reservationDate: bookedDates, })
        navigate('/confirmation')
      } catch (error) {
      
    }
  }

  useEffect(() => {
    getHotel()
    window.scrollTo(0, 0)
  }, [url])
  
  
  
  return (
    <>
     { 
     
     loading ? 
     (<>
        <div className='w-[80%] mx-auto flex h-screen flex flex-col justify-center items-center'>
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
     </>) : 
     (<>
     <Layout>

      {
        openModal && (
        <div className='flex items-center justify-center absolute top-[200px] left-0 w-[100%]  mx-auto z-20' >
          <div className='bg-white px-6 py-6 lg:w-[75%] rounded-md shadow-lg shadow-gray-500/50 '>
            {
              roomList.map(room => 
                  <div key={room._id} className='border-4 px-2 py-2 mb-2'>
                    <div className='lg:flex'>
                      <div className='px-2 py-2 lg:w-[70%]'>
                        <h1 className='text-lg text-black font-bold'>{room.title}</h1>
                        <span className='text-md text-stone-700 font-normal block'>{room.desc}</span>
                        <span className='text-md text-black font-normal block'><b>Sleeps Max: </b>{room.maxPeople}</span>
                        <span className='text-xl text-blue-900 font-bold block'>Rs. {room.price}</span>
                        <span className='text-sm text-stone-600 font-normal'><i>per Night</i></span>
                      </div>
                      <div className='px-2 py-2 lg:w-[35%]'>
                        <h1 className='lg:text-lg text-xs text-black lg:font-semibold font-bold'>Select Room Number: </h1>
                        <div className='flex'>
                        {
                          room.roomNumbers.map(r => 
                              <div key={r._id} className='ml-2 '>
                                <label className='lg:text-lg text-xs text-black font-semibold mr-2 diabled:opacity-50'>{r.number}</label>
                                <input type='checkbox' className='focus:ring-0 border-2 disabled:opacity-50 disabled:bg-gray-600 checked:bg-green-600 checked:before:bg-green-600'  
                                  value={r._id} 
                                  
                                  onChange={(e) => {
                                    handleChecked(e);  
                                    setSelectedRoomsName(
                                      e.target.checked ? [...selectedRoomsName, room.title] : selectedRoomsName.filter((item) => item !== room.title)
                                    );
                                    setSelectedRoomsPrice(
                                      e.target.checked ? [...selectedRoomsPrice, room.price] : selectedRoomsPrice.filter((item) => item !== room.price)
                                    );
                                    setSelectedRoomsNumber(
                                      e.target.checked ? [...selectedRoomsNumber, r.number] : selectedRoomsNumber.filter((item) => item !== r.number)
                                    );
                                    
                                  }}  
                                  disabled={!isAvailable(r)} />
                              </div>
                              )
                        }
                        </div>
                        <div className='mt-4'>
                          <button className='px-2 py-2 bg-blue-800 text-white text-sm font-bold hover:bg-blue-900 rounded-xl' onClick={() =>{handleReservation(); handleClick(); }}>Reserve Room</button>
                        </div>
                      </div>
                      
                    </div>
                  </div>
                  )
            }
          </div>
        </div>
      )
      }
      <section className='mt-12 w-[80%] mx-auto'>
        <div className='px-2 py-1 w-full'>
          <div className='w-full lg:flex shrink-0 gap-3'>
            <div className='lg:w-[75%] w-full px-2 py-1'>
              <h1 className='text-2xl text-stone-800 font-bold'>{hotel.name}</h1>
              <div>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-geo-alt-fill" viewBox="0 0 16 16" style={{display: 'inline'}}>
                <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
              </svg><span className='ml-2 text-black text-lg font-normal inline'>{hotel.address}</span>
              </div>
              <span className='py-3 text-stone-400 text-md font-normal'>Excellent Location - {hotel.distance} Km to city center</span>
              <span className='text-emerald-600 text-md font-normal block'>Book a stay-over at this hotel and get a free airport taxi</span>
            </div>
            <div className='lg:w-[25%] w-full place-items-end'>
              <button className='mt-6 mb-2 px-3 py-2 bg-amber-400 hover:bg-amber-500 rounded-xl text-md font-bold text-black text-center' onClick={() => { setOpenModal((prevState) => !prevState); getHotelRooms() }}>Reserve or Book Now</button>
            </div>
          </div>
          <div className='mt-2 w-full grid lg:grid-cols-3 md:grd-cols-2 grid-cols-1 gap-2'>
            {
            hotel._id ? (
              <>
              {
                hotel.photos.map((p, index) => 
                      <img key={index} className='bg-black lg:w-[400px] w-full h-[300px] object-fill' src={p} alt={`hotel photo ${index}`}/>
                    )
              }
              </>
            ) : (
              <>
                <div className='flex justify-center w-full'><h1 className='text-xl text-stone-500 font-semibold'>No Images Found</h1></div>
              </>
            ) 
            }
            
            
          </div>
          <div className='mt-10 w-full lg:flex shrink-0 gap-3'>
            <div className='lg:w-[75%] w-full px-2 py-1'>
              <h1 className='text-2xl text-stone-800 font-bold'>Stay in the heart of {hotel.city}</h1>
              <p className='mt-6 text-md text-black font-normal'>{hotel.desc}</p>
            </div>
            <div className='lg:w-[25%] w-full place-items-end'>
              <div className='w-full px-3 py-2 bg-amber-100 rounded-lg'>
                <h1 className='px-2 py-2 text-lg text-stone-800 font-bold text-center'>Perfect for a night's stay</h1>
                <p className='px-3 py-2 text-md text-black font-normal '>Located in the Heart of {hotel.city}, this Excellent property is one not to miss.</p>
                <h1 className='px-4 text-lg text-black font-bold text-end'>Rs. {hotel.cheapestPrice}</h1>
                <p className='px-4  text-md text-black font-normal text-end'><i>per night</i></p>
                <div className='px-3 py-2'>
                  <button className='mt-6 mb-2 px-3 py-2 w-full bg-amber-400 hover:bg-amber-500 rounded-xl text-md font-bold text-black text-center' onClick={() => { setOpenModal((prevState) => !prevState); window.scrollTo(0, 0) ;getHotelRooms() }}>Reserve or Book Now</button>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </section>
      <NewsLetter />
      </Layout>
     </>)
     }
    </>
  )
}

export default HotelDetails
