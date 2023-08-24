import React from 'react'
import Logo from '../../assets/images/logo.png'
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <>
      <section className='mt-4 w-[80%] mx-auto'>
        <div className='flex justify-center'>
          <div className='w-[33%]'>
            <Link to='/'><img className='h-12 w-auto' src={Logo} alt='TravelBuddy Logo' /></Link> 
          </div>
          <div className='w-[33%] flex gap-4 '>
            <ul className='items-center'> <h1 className='text-xl text-black font-bold'>Comapny</h1>
              <li><Link to='/about'><span className='text-md text-stone-600 font-normal underline hover:text-blue-900 ml-2'>About</span></Link></li>
              <li><Link to='/hotel'><span className='text-md text-stone-600 font-normal underline hover:text-blue-900 ml-2'>Hotel</span></Link></li>
              <li><span className='text-md text-stone-600 font-normal underline hover:text-blue-900 ml-2'>Policies</span></li>
            </ul>
            <ul className='items-center'> <h1 className='text-xl text-black font-bold'>Help</h1>
              <li><span className='text-md text-stone-600 font-normal underline hover:text-blue-900 ml-2'>Help Desk</span></li>
              <li><span className='text-md text-stone-600 font-normal underline hover:text-blue-900 ml-2'>FAQs</span></li>
              <li><span className='text-md text-stone-600 font-normal underline hover:text-blue-900 ml-2'>Customer Support</span></li>
            </ul>
          </div>
        </div>
        <div className='mt-6'>
          <h1 className='text-lg text-stone-800 text-center font-normal'>All material herein © 2023 Travel Buddy PVT. Ltd. All Rights Reserved.</h1>
        </div>
      </section>
    </>
  )
}

export default Footer
