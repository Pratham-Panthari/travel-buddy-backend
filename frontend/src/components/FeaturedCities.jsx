import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
const FeaturedCities = () => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false)
  const containerRef = useRef(null);

  const scrollRight = (scrollOffSet) => {
    
    containerRef.current.scrollLeft += scrollOffSet;
  };

  const scrollLeft = (scrollOffSet) => {
    
    containerRef.current.scrollLeft -= scrollOffSet;
  };

  const getFeaturedCities = async () => {
    setLoading(true)
    try {
      const res = await axios.get(
        "http://54.172.59.173:8080/api/v1/featured-cities/get-featured-cities"
      );

      if (res.data) {
        setCities(res.data.cities);
        setLoading(false)
      }
    } catch (error) {
      
    }
  };

  useEffect(() => {
    getFeaturedCities();
  }, []);

  return (
    <>
      {
      
      loading ? 
      (<>
        <div className='w-[80%] mx-auto flex h-full flex-col justify-center items-center'>
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </>) :
      (<>
      <section className="mt-12 w-[80%] mx-auto h-auto">
        <div className="lg:w-[10%] md:w-[20%] w-[35%] rounded-full flex items-center md:px-5 md:py-3 px-3 py-2 bg-amber-400">
          <span className="subtitle md:text-black md:text-xl text-lg">
            Explore
          </span>
        </div>
        <div>
          <h1 className="mt-6 text-4xl text-slate-700 font-medium">
            Featured Cities
          </h1>
        </div>
        <div className=" flex relative items-center gap-3">
          <div
            className="mt-4 py-2 flex overflow-x-scroll scroll-smooth gap-3 scroll"
            ref={containerRef}
          >
            {cities.map((city, index) => 
              
                
                  <div
                    key={index}
                    className="flex flex-shrink-0 md:w-[300px] md:h-[300px] w-[300px] h-[300px] rounded-lg items-center justify-center relative cursor-pointer"
                  >
                    {city.photo.map((photo, index) => 
                      
                        
                          <img key={index}
                            className="rounded-2xl w-full h-full object-cover"
                            src={photo}
                            alt="Photo"
                          />
                       
                     
                    )}
                    <div className="w-full h-full absolute flex items-center justify-center md:bg-slate-800 md:opacity-50 hover:bg-slate-800 hover:opacity-90 rounded-lg">
                      <h1 className="text-white text-5xl self-center font-extrabold">
                        {city.name}
                      </h1>
                    </div>
                  </div>
                
              
            )}
          </div>
          <button
            className="h-full opacity-25 absolute left-0 bg-white text-black font-4xl"
            onClick={() => {
              scrollLeft(1200);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="black"
              className="bi bi-arrow-left-short"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"
              />
            </svg>
          </button>
          <button
            className="h-full opacity-25 bg-white absolute right-0 bg-lightgrey text-black font-4xl"
            onClick={() => {
              scrollRight(1200);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="black"
              className="bi bi-arrow-right-short"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"
              />
            </svg>
          </button>
        </div>
      </section>
      </>)
      }
    </>
  );
};

export default FeaturedCities;
