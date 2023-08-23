import React from "react";
import gallery01 from "../assets/images/gallery-01.jpg";
import gallery02 from "../assets/images/gallery-02.jpg";
import gallery03 from "../assets/images/gallery-03.jpg";
import gallery04 from "../assets/images/gallery-04.jpg";
import gallery05 from "../assets/images/gallery-05.jpg";
import gallery06 from "../assets/images/gallery-06.jpg";
import gallery07 from "../assets/images/gallery-07.jpg";

const ImageGallerySection = () => {
  const imageGallery = [
    gallery01,
    gallery02,
    gallery03,
    gallery04,
    gallery05,
    gallery06,
    gallery07,
  ];

  return (
    <>
      <section className="hidden lg:block mt-12 w-[80%] mx-auto h-auto">
        <div>
          <h1 className="mt-6 text-4xl text-slate-700 font-semibold">
            Visit Our Customers Gallery
          </h1>
        </div>
        <div className="mt-4 grid grid-cols-4 gap-3">
          {imageGallery.map((img) => {
            return (
             
                <img key={img}
                  className="rounded-sm w-[300px] h-[300px] object-cover img cursor-pointer"
                  src={img}
                  alt="image"
                />
              
            );
          })}
        </div>
      </section>
    </>
  );
};

export default ImageGallerySection;
