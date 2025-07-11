/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import Image from "next/image";
import { IMAGE_URL } from "@nyx-frontend/main/components/constants";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../../app/_components/poweredSlider.css";

const PoweredBy = () => {
  var settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    cssEase: "linear",
    // arrows: false,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };

  return (
    <div className="pt-[2.5rem] pb-[2.5rem] md:py-[112px] w-full bg-black">
      {/* <div className="flex flex-col sm:flex-row items-center justify-center gap-[78px] sm:gap-[150px] lg:gap-[212px] flex-wrap"> */}
      <Slider {...settings} className="poweredby_section_slider">
        <div>
          <h4 className="text-[24px] sm:text-[36px] leading-[41px] sm:leading-[50px] font-semibold text-white text-center mb-[20px] sm:mb-[64px]">
            Powered by
          </h4>
          <div className="flex items-center justify-center">
            <Image
              src={`${IMAGE_URL}/assets/images/home/Poweredby1.png`}
              alt="powerbyImg1"
              width={254}
              height={141}
              className="w-[97px] h-[70px] sm:w-[174px] sm:h-[81px] md:w-[224px] md:h-[111px] lg:w-[254px] lg:h-[141px] object-contain"
            />
            <Image
              src={`${IMAGE_URL}/assets/images/home/Poweredby2.png`}
              alt="powerbyImg2"
              width={280}
              height={141}
              className="w-[97px] h-[70px] sm:w-[210px] sm:h-[81px] md:w-[250px] md:h-[111px] lg:w-[280px] lg:h-[141px] object-contain"
            />
            <Image
              src={`${IMAGE_URL}/assets/images/home/Poweredby3.png`}
              alt="powerbyImg3"
              width={313}
              height={141}
              className="w-[97px] h-[70px] sm:w-[243px] sm:h-[81px] md:w-[283px] md:h-[111px] lg:w-[313px] lg:h-[141px] object-contain"
            />
          </div>
        </div>

        <div>
          <h4 className="text-[24px] sm:text-[36px] leading-[41px] sm:leading-[50px] font-semibold text-white text-center mb-[20px] sm:mb-[64px]">
            Recognised by
          </h4>
          <div className="flex items-center justify-center">
            <Image
              src={`${IMAGE_URL}/assets/images/home/Poweredby4.png`}
              alt="powerbyImg1"
              width={365}
              height={125}
              className="w-[110px] h-[54px] sm:w-[285px] sm:h-[65px] md:w-[335px] md:h-[95px] lg:w-[365px] lg:h-[125px] object-contain"
            />
            <Image
              src={`${IMAGE_URL}/assets/images/home/Poweredby5.png`}
              alt="powerbyImg2"
              width={258}
              height={116}
              className="w-[112px] h-[64px] sm:w-[178px] sm:h-[66px] md:w-[228px] md:h-[86px] lg:w-[258px] lg:h-[116px] mr-[28px] object-contain"
            />
            <Image
              src={`${IMAGE_URL}/assets/images/home/Poweredby6.png`}
              alt="powerbyImg2"
              width={258}
              height={116}
              className="w-[112px] h-[64px] sm:w-[178px] sm:h-[66px] md:w-[228px] md:h-[86px] lg:w-[258px] lg:h-[116px] object-contain"
            />
          </div>
        </div>
      </Slider>
      {/* </div> */}
    </div>
  );
};

export default PoweredBy;
