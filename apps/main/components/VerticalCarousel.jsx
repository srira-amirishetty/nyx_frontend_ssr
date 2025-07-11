/* eslint-disable @next/next/no-img-element */
"use client";
import { IMAGE_URL } from "@nyx-frontend/main/components/constants";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Mousewheel } from "swiper/modules";
import { ROAD_MAP, imageAnimate, titleAnimate } from "@nyx-frontend/main/app/roadmap/constant";
import { BsCheckSquare } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";

const img_arr = [
  "RM7.png",
  "RM6.png",
  "RM5.png",
  "RM4.png",
  "RM3.png",
  "RM2.png",
  "RM1.png",
];

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function VerticalCarousel() {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);

  const onAutoplayTimeLeft = (s, time, progress) => {
    if (progressCircle.current) {
      progressCircle.current.style.setProperty("--progress", 1 - progress);
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
  };

  return (
    <div className="">
      <Swiper
        direction={"vertical"}
        autoHeight={true}
        spaceBetween={30}
        centeredSlides={true}
        mousewheel={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Mousewheel, Pagination]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper"
      >
        {ROAD_MAP.map((item, index) => (
          <SwiperSlide key={index} className="w-full">
            <div className="text-white grid md:grid-cols-2 grid-cols-1 gap-8 h-full md:gap-32 text-center md:items-center">
              <div className="justify-self-center md:justify-self-end -mt-20 md:mt-0">
                <motion.div
                  className="w-[15rem] md:w-auto"
                  initial={"offScreen"}
                  whileInView={"onScreen"}
                  viewport={{ once: false, amount: 0.5 }}
                  variants={imageAnimate}
                >
                  <img
                    src={`${IMAGE_URL}/assets/images/roadmap/${img_arr[index]}`}
                    alt="slider"
                    loading="lazy"
                    decoding="async"
                    className=""
                  />
                </motion.div>
              </div>
              <section className="grid gap-4">
                <div className="space-y-8 ">
                  <div className="flex flex-col items-center md:items-start">
                    <>
                      <motion.h3
                        className="mb-3 text-left font-bold text-2xl text-nyx-yellow"
                        initial={"offScreen"}
                        whileInView={"onScreen"}
                        viewport={{ once: false, amount: 0.5 }}
                        variants={titleAnimate}
                      >
                        {item.title}
                      </motion.h3>
                      {item.quarter && (
                        <>
                          <motion.h3
                            className="mb-3 text-left text-3xl md:text-6xl"
                            initial={"offScreen"}
                            whileInView={"onScreen"}
                            viewport={{ once: false, amount: 0.5 }}
                            variants={titleAnimate}
                          >
                            {item.quarter}
                          </motion.h3>
                        </>
                      )}
                      <ul className="space-y-4 text-left md:mr-5">
                        <AnimatePresence>
                        {item.content.map((finaldata) => (
                          <motion.li
                            className="space-y-1"
                            initial={"offScreen"}
                            whileInView={"onScreen"}
                            viewport={{ once: false, amount: 0.5 }}
                            variants={titleAnimate}
                            key={finaldata}
                          >
                            <div className="flex items-center space-x-2">
                              <BsCheckSquare className="text-green-400" />
                              <h4 className="link link-underline link-underline-black cursor-default text-sm">
                                {finaldata}
                              </h4>
                            </div>
                          </motion.li>
                        ))}
                        </AnimatePresence>
                      </ul>
                    </>
                  </div>
                </div>
              </section>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="autoplay-progress" slot="container-end">
        <svg viewBox="0 0 48 48" ref={progressCircle}>
          <circle cx="24" cy="24" r="20"></circle>
        </svg>
        <span ref={progressContent}></span>
      </div>
    </div>
  );
}
