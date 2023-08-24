import React, { useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import world from '../assets/images/world.png'
import heroimg from '../assets/images/hero-img01.jpg'
import video from '../assets/images/hero-video.mp4'
import heroimg02 from '../assets/images/hero-img02.jpg'
import Searchbar from '../components/Searchbar'
import ServiceList from '../services/ServiceList'
import FeaturedCities from '../components/FeaturedCities'
import FeturedHotels from '../components/FeturedHotels'
import OurCredentials from '../components/OurCredentials'
import ImageGallerySection from '../components/ImageGallerySection'
import Testimonials from '../components/Testimonials'
import NewsLetter from '../components/NewsLetter'


const Home = () => {

  
  useEffect(() => {
    window.scrollTo(0, 0)
  },[]) 

  return (
    <>
        <Layout>
          <div className='w-[80%] mx-auto h-auto'>
            <div className='row w-full '> 
              <div className='col md:w-[50%] sm:w-full'>
                <div className='mt-16 flex '>
                  <div className='rounded-full flex items-center md:px-5 md:py-3 px-3 py-2 bg-amber-400'>
                    <span className='subtitle md:text-black md:text-xl text-lg'>Know Before You Go</span>
                  </div>
                  <div>
                    <img className='w-[50px] h-[50px]' src={world} alt='world img'/>
                  </div>
                </div>
                <div className='flex'>
                  <h1 className='mt-6 text-4xl text-slate-950'>
                    Travelling opens the door to creating <span className='text-4xl text-amber-400'> Memories</span>
                  </h1>
                  
                </div>
                <div>
                  <p className='mt-6 text-slate-500'>
                  Travelling opens the door to creating memories that last a lifetime. Imagine waking up to breathtaking vistas, indulging in the finest comforts, and embracing new cultures that enrich your soul. Our mission is to turn your wanderlust into a collection of cherished moments. Whether it's the sun-kissed beaches, the hidden gems of local cuisine, or the laughter shared with newfound friends – every journey with us is an opportunity to craft stories you'll relish forever. Discover your next adventure with us and unlock the world of extraordinary experiences.
                  </p>
                </div>
                
              </div>
              <div className='col hidden md:block md:w-[50%]  bg-grey'>
                <div className='mt-16 flex h-full gap-3'>
                  <div className='col w-[33.3%] h-full'>
                    <img className='rounded-2xl w-full h-full object-cover' src={heroimg} alt='heroimg01' />
                  </div>
                  <div className='mt-2 col w-[33.3%] h-full'>
                    <video className='rounded-2xl w-full h-full object-cover' src={video} alt='video' controls>
                      
                    </video>
                  </div>
                  <div className='mt-4 col w-[33.3%] h-full'>
                  <img className='rounded-2xl w-full h-full object-cover' src={heroimg02} alt='heroimg01' />
                  </div>
                </div>
              </div>

            </div>
            
            
          </div>
          <section className='mt-12 py-5 lg:w-[80%] md:lg:w-[80%] w-full mx-auto '>
            <Searchbar />
          </section>
         
            <div className='mt-12 py-5 w-[80%] mx-auto h-auto'>
              <div className='md:flex gap-4'>
                <div className=' md:w-[25%] '>
                  <span className='subtitle block text-lg text-red-400'>Our Services</span>
                  <h4 className='mt-6 md:text-3xl text-xl text-stone-600'>We offer best services in the market</h4>
                </div>
                <div className='mt-10 md:w-[75%]'>
                  <div className='flex '>
                    <ServiceList />
                  </div>
                </div>
              </div>
            </div>
          <FeaturedCities />
          <FeturedHotels />
          <OurCredentials />
          <ImageGallerySection /> 
          <Testimonials />
          <NewsLetter />
        </Layout>
    </>
  )
}

export default Home
