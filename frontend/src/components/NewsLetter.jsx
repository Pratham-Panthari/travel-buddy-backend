import React from "react";
import maleTourist from "../assets/images/male-tourist.png";

const NewsLetter = () => {
  return (
    <>
      <section className="mt-12 w-full mx-auto ">
        <div className="w-full bg-amber-300">
          <div className="w-[80%] mx-auto flex gap-4">
            <div className="lg:w-[50%] w-full px-4 py-6">
              <h1 className="mt-16 text-stone-900 lg:text-3xl text-xl font-semibold">
                Subscribe to our newsletter to get regular travelling updates
              </h1>
              <form className="flex mt-6 bg-white rounded-xl gap-3 px-2 py-2">
                <input
                  className="w-[90%] px-2 py-2 border-0 ring-0 ring-inset-0 focus:ring-0 focus:ring-inset-0 outline-none"
                  type="email"
                  placeholder="Example@gmail.com"
                />
                <button className="bg-amber-400 hover:bg-amber-500 px-3 py-1 rounded-xl font-semibold">
                  Subscribe
                </button>
              </form>
            </div>
            <div className="hidden lg:block w-[50%] ">
              <img
                className="object-cover"
                src={maleTourist}
                alt="male-tourist"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NewsLetter;
