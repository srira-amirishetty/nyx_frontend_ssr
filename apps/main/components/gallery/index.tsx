/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import "swiper/swiper-bundle.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "./CustomSwiper.css"; // Import your CSS file for styling
import { IMAGES } from "../tails";

const ImageSlider = () => {
  return (
    <Swiper
      spaceBetween={40}
      
      slidesPerView={3}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
    >
      {IMAGES.map((image: any, index: any) => (
        <SwiperSlide key={index}>
          <div className="w-full h-[350px] overflow-hidden">
            <img
              src={image}
              alt="Image Description"
              className="w-full h-full object-cover"
            />
          </div>
        </SwiperSlide>
      ))}

      {/* Add more slides as needed */}
    </Swiper>
  );
};

export default ImageSlider;
