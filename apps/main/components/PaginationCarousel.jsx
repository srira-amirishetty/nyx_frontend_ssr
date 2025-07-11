/* eslint-disable @next/next/no-img-element */
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

export default function PaginationCarousel({ data }) {
  return (
    <>
      <Swiper
        pagination={{ clickable: true }}
        modules={[Pagination]}
        style={{
          background: `rgba(0, 49, 99, 1)`,
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
                  <p className="font-normal text-amber-400 text-md">
                    <span className="text-xl">{index + 1}.</span> {val.title}
                  </p>
                  <img
                    src={val.icon}
                    alt="valIcon"
                    className="w-24 py-8 mx-auto"
                    loading="lazy"
                    decoding="async"
                  />
                  <p className="text-gray-300 text-base text-center mb-6">
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
