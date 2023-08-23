import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import Confetti from 'react-confetti'
import { useAuth } from '../context/authContext'

const Confirmation = () => {

    const [auth] = useAuth()

    const navigate = useNavigate()

    useEffect(() => {
        setTimeout(() => {
            navigate('/profile')
        }, 5000)
    }, [])
    
  return (
    <>
    {
        auth?.token ? 
        (
            <>
            <section className='absolute'>
                <Confetti
                    width={1500}
                    height={700}
                    numberOfPieces={400}
                    gravity={0.1}
                />
            </section>
            <section className='w-[100%] bg-white relative'>
                <div className='w-[80%] mx-auto '>
                    <div className='px-48 py-56'>
                        <h1 className='text-center text-3xl text-black font-semibold'>Room Reservation successfull</h1>
                        <div className='flex justify-center'>
                            <h1 className='mt-4 text-xl text-indigo-600 font-bold text-center hover:scale-125 '>Redirecting......</h1> 
                            <div class="spinner-border" role="status">
                                <span class="visually-hidden"></span>
                            </div>
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

export default Confirmation
