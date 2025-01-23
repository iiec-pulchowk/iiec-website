"use client";
// ======================== Imports ========================
import "flowbite";
import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import FetchCarouselImages from "@/Helper/FetchCarouselImages";
import "./Carousel.css";

export function CarouselCompo() {
  const [CarouselImages, setCarouselImages] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await FetchCarouselImages();
      if (res.success) {
        setCarouselImages(res.data);
      }
    };
    fetchData();
  }, []);

  return (
    <div className=" md:h-[calc(100vh*0.825)]">
      {CarouselImages && (
        <Carousel
          infiniteLoop
          showThumbs={false}
          showIndicators={false}
          showArrows={false}
          showStatus={false}
          autoPlay={true}
          interval={5000}
          transitionTime={800}
          dynamicHeight={false}
          axis="vertical"
        >
          {CarouselImages.map((image, index) => (
            <div
              key={index}
              className="relative h-[calc(100vh*0.825)] w-full before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-r before:from-white before:to-transparent before:opacity-75 before:z-10"
            >
              <img
                src={image.ImageLink}
                alt="image"
                className="object-cover h-full w-full"
              />
              {/* Text and Button */}
              <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent z-20"></div>
            </div>
          ))}
        </Carousel>
      )}
      <div className="absolute inset-0 flex flex-col items-start justify-center px-10 w-[calc(100%*0.5)]">
        <h1 className="text-3xl md:text-5xl font-bold text-indigo-900">
          Ignite - Innovate - Impact
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-700">
          Transform bold ideas into revolutionary ventures. We empower visionary
          entrepreneurs with cutting-edge resources, strategic mentorship, and a
          dynamic ecosystem to turn breakthrough concepts into global solutions.
        </p>
        <button className="mt-6 px-6 py-3 bg-indigo-900 text-white font-semibold rounded-md hover:bg-indigo-900">
          Join Us
        </button>
      </div>
    </div>
  );
}
