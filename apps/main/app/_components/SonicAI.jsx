import React from "react";
import Section from "./Section";
import { IMAGE_URL } from "@nyx-frontend/main/components/constants";

const SonicAI = () => {
  return (
    <div className="md:relative overflow-hidden">
      <div className="hidden lg:flex lg:absolute lg:top-0 ">
        <svg
          width="1195"
          height="902"
          viewBox="0 0 1195 902"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_f_1306_8552)">
            <path
              d="M858.702 491.393C685.967 724.609 240.447 643.191 34.1938 490.426C-172.059 337.661 -199.231 24.7615 -26.4956 -208.454C146.24 -441.67 453.471 -506.888 659.724 -354.123C865.977 -201.357 1031.44 258.178 858.702 491.393Z"
              fill="url(#paint0_linear_1306_8552)"
              fillOpacity="0.8"
            />
          </g>
          <defs>
            <filter
              id="filter0_f_1306_8552"
              x="-404.077"
              y="-700.609"
              width="1598.89"
              height="1601.77"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="131.95"
                result="effect1_foregroundBlur_1306_8552"
              />
            </filter>
            <linearGradient
              id="paint0_linear_1306_8552"
              x1="713.352"
              y1="-248.222"
              x2="-9.57947"
              y2="309.045"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0.240197" stopColor="#81186A" stopOpacity="0.15" />
              <stop offset="0.868938" stopColor="#5227BB" stopOpacity="0.41" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="hidden lg:flex lg:absolute lg:top-0 lg:right-0">
        <svg
          width="895"
          height="734"
          viewBox="0 0 895 734"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_f_1306_8553)">
            <path
              d="M881.522 379.003C774.765 523.139 499.418 472.82 371.947 378.405C244.475 283.991 227.682 90.6082 334.438 -53.5274C441.195 -197.663 631.075 -237.97 758.546 -143.556C886.018 -49.1413 988.279 234.868 881.522 379.003Z"
              fill="url(#paint0_linear_1306_8553)"
              fillOpacity="0.8"
            />
          </g>
          <defs>
            <filter
              id="filter0_f_1306_8553"
              x="0.279205"
              y="-458.498"
              width="1189.77"
              height="1191.56"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="131.95"
                result="effect1_foregroundBlur_1306_8553"
              />
            </filter>
            <linearGradient
              id="paint0_linear_1306_8553"
              x1="791.69"
              y1="-78.1053"
              x2="344.893"
              y2="266.306"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0.240197" stopColor="#81186A" stopOpacity="0.15" />
              <stop offset="0.868938" stopColor="#5227BB" stopOpacity="0.41" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <Section
        imageUrl={`${IMAGE_URL}/assets/images/home/CampulseAI.png`}
        title="CamPulseAI"
        descriptionMain="Meet Your New Music companion"
        description="Maximize campaign reach & optimize ROI with our AI-powered, multi-platform campaign companion & one-view universal analytics"
        imageUrl1={`${IMAGE_URL}/assets/images/home/campulseHome1.png`}
        card1Title="Auto Ad"
        card1SubTitle="Manager"
        card1Description="Execute campaigns with auto budget allocation across platforms in a few clicks."
        card2Title="UniView "
        card2SubTitle="Analytics"
        card2Description="Monitor & optimize campaigns with AI-powered insights to stay ahead of the curve."
        imageUrl2={`${IMAGE_URL}/assets/images/home/campulseHome2.png`}
        // imageUrl3={`${IMAGE_URL}/assets/images/home/SonicAI_3.png`}
        // card3Title="Sonic"
        // card3SubTitle="Consultation"
        // card3Description="Receive expert feedback on your song to increase its chances of success."
        link="/campulse-ai"
      />
    </div>
  );
};

export default SonicAI;
