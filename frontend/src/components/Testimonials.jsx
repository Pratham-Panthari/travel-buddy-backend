import React, { useEffect, useState } from "react";
import axios from "axios";
const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(false) 
  const getAllTestimonials = async () => {
    setLoading(true)
    try {
      const res = await axios.get(
        "https://travelbuddyserver.onrender.com/api/v1/testimonials/get-testimonials"
      );
      if (res.data) {
        setTestimonials(res.data.testimonials);
        setLoading(false)
      }
    } catch (error) {
      
    }
  };

  useEffect(() => {
    getAllTestimonials();
  }, []);
  return (
    <>
      {
        loading ? 
        (<>
        <div className='w-[80%] mx-auto flex h-full flex flex-col justify-center items-center'>
          
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
        </>) : 
        (<>
        <section className="  mt-12 w-[80%] mx-auto ">
          <div>
            <h1 className="mt-6 lg:text-4xl text-xl text-slate-700 font-semibold">
              Voices of Trust: What People Say
            </h1>
          </div>
          <div className="mt-4 flex flex-shrink-0 overflow-x-auto rounded-xl px-8 py-6  gap-4 scroll">
            {
              testimonials.map(t => 
                  <div key={t._id} className="flex flex-col justify-content items-center min-w-[400px] min-h-[300px] bg-white rounded-xl shadow-lg shadow-grey-500/50 px-4 py-2">
                    <p className="mt-4 text-lg font-normal text-stone-600 text-center">
                      <i>"{t.testimonay}"</i>
                    </p>
                    <h1 className="mt-4 text-2xl font-semibold text-black">
                      {t.username}
                    </h1>
                  </div>
            )}
          </div>
        </section>
        </>)
      
      }
    </>
  );
};

export default Testimonials;
