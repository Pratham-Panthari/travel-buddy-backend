import React from 'react'
import ServiceCard from './ServiceCard'
import weatherImg from '../assets/images/weather.png'
import customizationImg from '../assets/images/customization.png'
import guideImg from '../assets/images/guide.png'
const ServiceList = () => {
    const serviceData = [
        {
            imgUrl: weatherImg,
            title: 'Calculate Weather',
            desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. " 
        },
        {
            imgUrl: guideImg,
            title: 'Best Tour Guide',
            desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit." 
        },
        {
            imgUrl: customizationImg,
            title: 'Customize your itinerary',
            desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit." 
        }
    ]
  return (
    <>
    {
        serviceData.map((item, index) =>  {
            return(
                
                <div key={index} className='col w-[33.3%] mr-[5px] border-r-2 border-b-2'>
                    <ServiceCard key={index} items={item} />
                </div>
                    
               
            )
        })
    }
    </>
  )
}

export default ServiceList
