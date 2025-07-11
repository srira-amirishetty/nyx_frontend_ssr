/* eslint-disable @next/next/no-img-element */
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

export default function PaginationCarousel2({ data }) {
  return (
    <>
      <Swiper
        pagination={{ clickable: true }}
        modules={[Pagination]}
        style={{
          background: `rgba(34, 24, 76, 1)`,
        }}
        className="mySwiper mt-8"
      >
        <div>
          <div className="col-span-1">
            {data?.map((val, index) => (
              <SwiperSlide key={index}>
                <div
                  className={`flex-col text-center items-center gap-4 px-6 py-8 `}
                >
                  <p className="font-normal text-amber-400 text-md text-left">
                    <span className="text-xl">{index + 1}.</span> {val.title}
                  </p>
                  <p className="text-gray-300 text-base mb-6 text-justify">
                    {val.content}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </div>
        </div>
      </Swiper>
    </>
  );
}
