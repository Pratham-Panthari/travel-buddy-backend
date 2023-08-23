import React from "react";
import experience from "../assets/images/experience.png";
const OurCredentials = () => {
  return (
    <>
      <div className="rounded-xl mt-12 shadow-lg shadow-black-500/50  w-[90%] mx-auto">
        <section className="py-5  w-[80%] mx-auto h-auto">
          <div className="lg:flex md:flex">
            <div className="lg:w-[60%] md:w-[60%]">
              <div className="lg:w-[140px] w-[130px] rounded-full flex items-center md:px-5 md:py-3 px-3 py-2 bg-amber-400">
                <span className="subtitle md:text-black md:text-xl text-lg">
                  Excellence
                </span>
              </div>
              <div>
                <h1 className="mt-6 text-4xl text-slate-700 font-medium">
                  Join Our Growing Family of Satisfied Travelers
                </h1>
              </div>
              <div className="mt-4 flex gap-4">
                <div className="flex flex-col justify-center">
                  <div className="rounded-xl w-[80px] h-[80px] bg-amber-600 px-3 py-4 self-center">
                    <h1 className="text-white text-2xl font-semibold">15K+</h1>
                  </div>
                  <h1 className="mt-2 text-blue-950 text-md font-semibold">
                    Successfull Bookings
                  </h1>
                </div>
                <div className="flex flex-col justify-center">
                  <div className="rounded-xl w-[80px] h-[80px] bg-amber-600 px-3 py-4 self-center">
                    <h1 className="text-white text-2xl font-semibold">3K+</h1>
                  </div>
                  <h1 className="mt-2 text-blue text-blue-950 text-md font-semibold">
                    Regular Clients
                  </h1>
                </div>
                <div className="flex flex-col justify-center">
                  <div className="rounded-xl w-[80px] h-[80px] bg-amber-600 px-3 py-4 self-center">
                    <h1 className="text-white text-2xl font-semibold">10+</h1>
                  </div>
                  <h1 className="mt-2 text-blue text-blue-950 text-md font-semibold">
                    Years of service
                  </h1>
                </div>
              </div>
            </div>
            <div className="flex lg:block md:block hidden w-[70%] justify-center">
              <img src={experience} alt="Happy Customers" />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default OurCredentials;
