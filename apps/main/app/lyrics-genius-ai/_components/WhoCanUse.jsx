/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Image from "next/image";
import { IMAGE_URL } from "@nyx-frontend/main/components/constants";

const WhoUse = () => {
  const items = [
    {
      imgUrl: `${IMAGE_URL}/assets/images/home/Musicians.png`,
      title: "Songwriters and Musicians",
      description:
        "Overcome writer’s block and gain fresh perspectives with our unique tool, inspiring your next hit.",
    },
    {
      imgUrl: `${IMAGE_URL}/assets/images/home/Brands.png`,
      title: "Brands & Broadcasters",
      description:
        "Generate fresh, innovative lyrics for brand jingles, radio ads, or promotional content, ensuring unique and catchy messaging.",
    },
    {
      imgUrl: `${IMAGE_URL}/assets/images/home/MusicEnthusiasts.png`,
      title: "Music Enthusiasts",
      description:
        "Ever wanted to try your hand at songwriting? Our tool makes it easy to create your own lyrics, no experience necessary.",
    },
  ];

  return (
    <div className="bg-[#130625] h-full px-[5px] sm:px-0">
      <div
        className="w-full h-full flex flex-col"
        style={{
          background:
            "background: linear-gradient(252.89deg, #280D4E -6.43%, #0B0218 109.4%)",
        }}
      >
        <div className="flex justify-center text-center mt-[134px] mb-[48px] md:mt-[82px] md:mb-[82px]">
          <h3 className="text-white text-[24px] md:text-[40px] xl:text-[54px] px-[80px] font-semibold  ">
            Who Can Use LyricGenius AI?
          </h3>
        </div>
        <div className="flex flex-col md:flex-col xl:flex-row flex-wrap items-center justify-center gap-[42px] md:gap-0 xl:gap-[102px]">
          {items.map((item, index) => (
            <div key={index} className="">
              <div className="flex flex-col">
                <div className="flex justify-center mb-[24px] md:mb-[39px]">
                  <Image
                    src={item.imgUrl}
                    width={150}
                    height={150}
                    alt={item.title}
                    className="w-[150px] h-[150px] md:w-[272px] md:h-[272px] rounded-full"
                  />
                </div>
                <div className="flex flex-col items-center justify-center text-center text-wrap">
                  <h2 className="text-[20px] md:text-[31px] text-white font-semibold mb-[16px] md:mb-[18px]">
                    {item.title}
                  </h2>
                  <p className="md:w-[309px] h-auto md:min-h-[100px] text-[12px] md:text-lg text-white font-light mb-[42px]">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhoUse;
