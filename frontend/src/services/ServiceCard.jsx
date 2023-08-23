import React from 'react'

const ServiceCard = ({ items }) => {
    const { imgUrl, title, desc } = items
  return (
    <>
        <div className='px-2 py-3'>
            <div className='flex rounded-full w-[80px] h-[80px] bg-amber-600 justify-center items-center'>
                <img className='object-fit w-[50px] h-[50px] ' src={imgUrl} alt='image-url' />
            </div>
            <h5 className='mt-2 text-blue-900 text-md md:text-lg block'>{title}</h5>
            <p className='mt-2 text-stone-600'>{desc}</p>
        </div>
    </>
  )
}

export default ServiceCard
