/* eslint-disable @next/next/no-img-element */
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IMAGES } from "@nyx-frontend/main/components/tails/index";

export default function SimpleSlider(props) {
  return (
    <Slider {...props.settings} className="slider-tech">
      {IMAGES.map((image, index) => (
        <div className="w-full h-[350px] px-5 overflow-hidden" key={`tech-slider-${index}`}>
          <img
            src={image}
            alt="Image Description"
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </Slider>
  );
}
