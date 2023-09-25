import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import { DateRangePicker  } from 'react-date-range';
import { format, addDays } from 'date-fns'
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { useDate } from '../context/dateContext';
const Hotels = () => {

  const [contextDate, setContextDate] = useDate()

  const [auth, setAuth] = useAuth()

  const navigate = useNavigate()

  const [openDate, setOpenDate] = useState(false)
  const [loading, setLoading] = useState(false)
  const [destination, setDestination] = useState('')
  const [hotels, setHotels] = useState([])
  const [min, setMin] = useState('')
  const [max, setMax] = useState('')
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
     }
  ]);

  const getAllHotels = async () => {
    setLoading(true)
    try {
      const res = await axios.get('http://54.172.59.173:8080/api/v1/hotel/get-all-hotels?featured=false')
      if(res.data){
        setHotels(res.data.hotels)
        setLoading(false)
      }
    } catch (error) {
      
    }
  }
  
  const handleSearch = async() => {
    setLoading(true)
    try {
      if(destination === ''){
        getAllHotels()
      }
      else{
        const res = await axios.get(`http://54.172.59.173:8080/api/v1/hotel/get-all-hotels?featured=false&city=${destination}&min=${min}&max=${max}`)
        if(res.data){
          setHotels(res.data.hotels)
          setLoading(false)
        }
      }
    } catch (error) {
      
    }
  }
  
    useEffect(() => {
      getAllHotels()
      window.scrollTo(0, 0)
    }, [])
    
  return (
    <>
      <Layout>
        <section className='mt-12 w-[80%] mx-auto'>
          <div className='w-full lg:flex gap-4 '>
            <div className='lg:w-[25%] w-full bg-amber-500 rounded-xl lg:max-h-[600px] xl:max-h-[500px] py-3 '>
              <div className='px-4 py-3'>
                <h1 className='px-2 mt-6 text-blue-900 text-xl font-bold ring-0 ring-inset-0 focus:ring-0 '>Search</h1>
                <span className='px-2 text-black text-md font-normal'>Destination</span>
                <input className='outline-none px-4 py-2 rounded w-full' type='text' placeholder='Where to go?' value={destination} onChange={(e) => { setDestination(e.target.value) }}/>
              </div>
              <div className='px-4 py-2'>
                <span className='px-2 text-black text-md font-normal'>Check-in Date</span>
                <div className='w-full px-2 py-2 bg-white cursor-pointer' >
                 <span onClick={() => {setOpenDate((prevState) => !prevState)}}>{ `${format(date[0].startDate, "dd/MM/yyyy")} to ${format(date[0].endDate, "dd/MM/yyyy")}` }</span> 
                  { openDate && <DateRangePicker
                    onChange={item => {setDate([item.selection]); setContextDate([item.selection])}}
                    showSelectionPreview={true}
                    moveRangeOnFirstSelection={false}
                    months={2}
                    ranges={date}
                    direction="horizontal"
                    className='absolute'
                  />}
                </div>
              </div>
              <div className='px-4 py-2'>
                <span className='px-2 text-black text-md font-normal'>Options</span>
                <div className='mt-2 flex gap-4'>
                  <span className='px-2 text-stone-600 text-md font-normal'>Min Price<span className='text-stone-600 text-sm'>(per night)</span></span>
                  <input className='outline-none w-[80px] h-[25px]' type='text' placeholder='Min' value={min} onChange={(e) => { setMin(e.target.value) }} />
                </div>
                <div className='mt-2 flex gap-4'>
                  <span className='px-2 text-stone-600 text-md font-normal'>Max Price<span className='text-stone-600 text-sm'>(per night)</span></span>
                  <input className='outline-none w-[80px] h-[25px]' type='text' placeholder='Max' value={max} onChange={(e) => { setMax(e.target.value) }} />
                </div>
              </div>
              <div className='mt-6 sm:mb-6 w-[80%] mx-auto'>
                  <button className='px-4 py-2 text-white text-xl font-bold bg-blue-800 hover:bg-blue-900 rounded-xl' onClick={handleSearch}>Search</button>
              </div>
            </div>
            {
              loading ? 
              (<>
                <div className='w-[80%] mx-auto flex h-screen flex-col justify-center items-center'>
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              </>) : 
              (<>
                <div className='lg:w-[70%] w-full '>
                {
                  hotels.map(h => 
                        <div key={h._id} className='px-3 py-2 border-3 rounded-sm mb-4' >
                          <div className='lg:flex px-3 py-2 gap-3'>
                              <div className='lg:w-[30%] flex py-1 w-full h-[250px] overflow-x-auto scroll gap-3 rounded-md'>
                                {
                                  h.photos.map((p, index) =>
                                  
                                    <img key={index} className='w-full h-full shrink-0 object-fill rounded-md' src={p} alt={`hotel photo ${index}`}/>
                                    )
                                }
                              </div>
                              <div className='lg:w-[50%] py-1 w-full '>
                                {
                                  auth?.token ?
                                  (<>
                                  <Link to={`/hotel/${h._id}`}><h1 className='text-stone-800 text-2xl font-extrabold hover:underline'>{h.name}</h1></Link>
                                  </>) :
                                  (<>
                                  <h1 className='text-stone-800 text-2xl font-extrabold hover:underline'>{h.name}</h1>
                                  </>)
                                }
                                <span className='py-3 text-stone-400 text-md font-normal'>{h.distance}Km to city center</span>
                                <div className='mt-2 mb-2 px-2 py-2 bg-green-600 w-[150px] h-[40px] rounded-xl'><span className='text-md font-bold text-white'>Free Airport Taxi</span></div>
                                <span className='text-stone-500 text-lg font-normal block'>{h.address}</span>
                                <span className='text-emerald-700 text-md font-bold block'>Free Cancellation</span>
                                <span className='text-emerald-600 text-md font-normal block'>Lock it at this great price, You may Cancel Later</span>
                                
                              </div>
                              <div className='mt-24 lg:w-[25%] w-full '>
                                <span className='text-md text-stone-400 font-normal block text-end'><i>Avg Price</i></span>
                                <h1 className='text-2xl text-red-600 font-semibold text-end'>Rs. {h.cheapestPrice}</h1>
                                <h1 className='text-md text-stone-400 font-normal text-end'><i>per night</i></h1>
                                <button className='mt-6 px-3 py-2 bg-sky-800 hover:bg-sky-900 rounded-xl text-md font-bold text-white self-end block' onClick={() => { auth?.token ?  (navigate(`/hotel/${h._id}`)) :  (navigate('/login'))}}>Check Availability</button>
                              </div>
                          </div>
                        </div>
                      )
                }
                
              </div>
              </>)
            }
          </div>
        </section>
      </Layout>
    </>
  )
}

export default Hotels
