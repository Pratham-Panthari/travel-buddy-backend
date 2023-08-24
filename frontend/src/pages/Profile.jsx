import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import { useAuth } from '../context/authContext'
import axios from 'axios'
import { format } from 'date-fns'
import Header from '../components/Layout/Header'
const Profile = () => {
    
    const [auth, setAuth] = useAuth()

    const [reservation, setReservations] = useState([])
    const [loading, setLoading] = useState(false)
    const getReservation = async () => {
        setLoading(true)
        try {
            const res = await axios.get('https://travelbuddyserver.onrender.com/api/v1/reservation/get-all-reservations')    
            if(res?.data){
                setReservations(res.data.reservations)
                setLoading(false)
            }        
        } catch (error) {
            
        }
    }

    useEffect(() => {
        getReservation()
        window.scrollTo(0, 0)
    }, [])

    
  return (
    <>
        <Header />
            {
                auth?.token ? 
                (
                    <>
                        <section className='mt-16 w-[80%] mx-auto '>
                            <div className='lg:flex gap-4'>
                                <div className='lg:w-[30%] w-full border-r-4'>
                                    <div className='px-3 py-2'>
                                        <h1 className='text-2xl text-black font-bold'>User Details:</h1>
                                        <h1 className='text-lg text-black font-normal'>Name: {auth?.username}</h1>
                                        <h1 className='text-lg text-black font-normal'>Email: {auth?.email}</h1>
                                    </div>
                                </div>
                                <div className='lg:w-[70%] w-full'>
                                    <div className='px-3 py-2 '>
                                        <div className='py-1 w-full'>
                                            <h1 className='text-2xl text-black font-bold text-center mb-2'>Your Reservations</h1>
                                            <hr />
                                        </div>
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
                                            {
                                                reservation.map((reserve) => 

                                            
                                                auth?.id == reserve.userId ? 
                                                (<>
                                                    <div key={reserve._id} className='mt-2 shadow-xl shadow-gray-500/50 rounded-md'>
                                                        <div className='px-3 py-4 lg:flex rounded-md border-3'>
                                                            <div className='lg:w-[20%] border-r-4'>
                                                                <h1 className='text-lg text-black font-normal'><b>Hotel Name</b></h1>
                                                                <h1 className='text-lg text-black font-normal'>{reserve.hotelName}</h1>
                                                            </div>
                                                            <div className='lg:w-[20%] border-r-4 ml-2'>
                                                                <h1 className='text-lg text-black font-normal'><b>Booking Name</b></h1>
                                                                <h1 className='text-lg text-black font-normal'>{reserve.username}</h1>
                                                            </div>
                                                            <div className='lg:w-[35%] lg:flex border-r-4 ml-2'>
                                                                
                                                                <div >
                                                                 <h1 className='text-lg text-black font-normal text-center'><b>Room Details</b></h1>
                                                                    {
                                                                        reserve.roomName.map((rn, index) => 
                                                                                    <div key={index}>
                                                                                        <h1 className='text-lg text-black font-normal text-center'><b>Name:</b> {rn}</h1>
                                                                                    </div>
                                                                               )
                                                                    }
                                                                    {
                                                                        reserve.roomNumber.map((rnum, index) => 
                                                                                    <div key={index}>
                                                                                        <h1 className='text-lg text-black font-normal'><b>Number:</b> {rnum}</h1>
                                                                                    </div>
                                                                                )
                                                                    }
                                                                    {
                                                                        reserve.roomPrice.map((rp,index) => 
                                                                                    <div key={index}>
                                                                                        <h1 className='text-lg text-black font-normal'><b>Price:</b> Rs. {rp}</h1>
                                                                                    </div>
                                                                                )
                                                                    }
                                                                </div>
                                                            </div>
                                                            <div className='lg:w-[20%] ml-2'>
                                                                <h1 className='text-lg text-black font-normal'><b>Reservation Dates</b> </h1>
                                                                {
                                                                    reserve.reservationDate.map((date, index) => 
                                                                            <div key={index}>
                                                                                <h1 className='text-md, text-black'>{format(new Date(date), "MM/dd/yyyy")}</h1>
                                                                            </div>
                                                                        )
                                                                }
                                                                
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>) 
                                                : 
                                                (<>
                                                    
                                                </>)
                                            
                                                   )
                                            }
                                            </>)
                                        }
                                    </div>
                                </div>
                            </div>
                        </section>
                    </>
                ) :
                (
                    <>
                        <div className='w-[80%] h-[80vh] mx-auto mt-16'>
                            <h1 className='text-center text-4xl text-black font-extrabold'>Unauthorized access login to continue....</h1>
                        </div>
                    </>
                )
            }
            
        
    </>
  )
}

export default Profile
