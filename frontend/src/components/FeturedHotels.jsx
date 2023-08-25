import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const FeturedHotels = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false)
  const getFeaturedHotels = async () => {
    setLoading(true)
    try {
      const res = await axios.get(
        "https://travelbuddyserver.onrender.com/api/v1/hotel/get-featured-hotels?featured=true"
      );
      
      if (res.data) {
        setHotels(res.data.hotels);
        setLoading(false)
      }
      
    } catch (error) {
      
    }
  };

  useEffect(() => {
    getFeaturedHotels();
  }, []);

  return (
    <>
      {
        
      loading ? 
      (<>
      <div className='w-[80%] mx-auto flex h-full flex flex-col justify-center items-center'>
          
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </>) : 
      (<>
        <section className="mt-12 w-[80%] mx-auto h-auto">
          <div className="flex lg:w-[12%] md:w-[23%] w-[45%] rounded-full flex items-center md:px-5 md:py-3 px-3 py-2 bg-amber-400">
            <span className="subtitle md:text-black md:text-xl text-lg">
              Experience
            </span>
          </div>
          <div>
            <h1 className="mt-6 text-4xl text-slate-700 font-medium">
              Featured Hotels
            </h1>
          </div>
          <div className="flex items-center overflow-x-auto scroll">
            <div className="mt-4 py-2 flex flex-shrink-0 gap-3 ">
              {hotels.map(hotel => 
                  
                    <div
                      key={hotel._id}
                      className="px-2 w-[400px] h-[500px] rounded-2xl relative cursor-pointer"
                    >
                      <div className="w-full py-2 h-[300px] flex flex-shrink-0 overflow-x-auto gap-2 rounded-2xl scroll ">
                        {hotel.photos.map((photo, index) => 
                              <img
                                key={index}
                                className="w-full h-full object-fill cursor-pointer"
                                src={photo}
                                alt="Photo"
                              />
                        )}
                      </div>
                      <div className="flex w-full h-[200px] ">
                        <div className="w-[70%] bg-white">
                          <Link to={`hotel/${hotel._id}`}>
                            <h1 className="text-xl font-semibold text-black px-2 py-1 hover:underline">
                              {hotel.name}
                            </h1>
                          </Link>
                          <p className="text-md text-gray px-2 ">
                            {hotel.address}
                          </p>
                          <span className="text-sm text-gray-500 px-2">
                            {hotel.distance}Km to City Center
                          </span>
                        </div>
                        <div className="w-[30%]">
                          <h1 className="text-lg text-black font-bold px-2 py-1">
                            &#8377; {hotel.cheapestPrice}
                          </h1>
                          <span className="text-xs text-gray-400 px-2 py-1 mb-1">
                            <i>*Cheapest Price</i>
                          </span>
                          <button className="bg-amber-400 px-3 py-2 rounded-full hover:bg-amber-500 ">
                            <Link to={`/hotel/${hotel._id}`}>
                              <h1 className="text-md font-semibold">Book Now</h1>
                            </Link>
                          </button>
                        </div>
                      </div>
                    </div>
              )}
            </div>
          </div>
        </section>
      </>)  
    }
    </>
  );
};

export default FeturedHotels;
