/* eslint-disable @next/next/no-img-element */
'use client'
import  React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

function CardCarousel({ data }) {
  const [propsData, setProsData] = useState(data);
  const [slideCount,setSlideCount] = useState(2);


  let updateReadMoreStatus = (index, status) => {
    setProsData(
      propsData.map((item, i) => {
        if (i === index) {
          return { ...item, isReadMore: !status };
        } else {
          return item;
        }
      })
    );
  };

  useEffect(()=>{
setSlideCount(window.innerWidth < 550 ? 1 : window.innerWidth < 786 ? 2 : 3);
  },[])

  return (
    <>
      <Swiper
        slidesPerView={slideCount}
        spaceBetween={30}
        slidesPerGroup={3}
        // loop={true}
        // loopFillGroupWithBlank={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper mt-8"
      >
        <div className="flex gap-8 items-center">
          <div className="mt-12 gap-8 max-w-sm mx-auto gap-y-10 gap-x-8">
            {propsData?.map((item, index) => (
              <SwiperSlide key={index}>
                <div
                  key={index}
                  className="max-w-sm rounded-md overflow-hidden"
                >
                  <img
                    className="w-full"
                    src={item.image}
                    alt="Sunset in the mountains"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="py-4">
                    <div className="font-normal md:whitespace-normal text-left whitespace-nowrap text-sm md:text-2xl mb-2">
                      {item.name}
                    </div>
                    <p
                      className={`text-gray-300 text-xs md:text-sm text-left ${
                        item.isReadMore ? "line-clamp-none md:line-clamp-4" : ""
                      }`}
                    >
                      {item.content}
                    </p>
                    <button
                      onClick={() =>
                        updateReadMoreStatus(index, item.isReadMore)
                      }
                      className="hover:text-blue-700 text-gray-300 underline text-xs py-2"
                    >
                      {`${item.isReadMore ? "Read more" : "Read less"}`}
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </div>
        </div>
      </Swiper>
    </>
  );
}

export default CardCarousel;

