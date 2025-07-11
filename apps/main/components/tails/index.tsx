/* eslint-disable react/jsx-key */
import classNames from "@nyx-frontend/main/utils/classNames";
import { useState } from "react";

export const TAIL_CONTAINER = (props: any) => {
  return <div className="m-auto w-[95%]">{props.children}</div>;
};

export const TAIL_BUTTON = (props: any) => {
  return (
    <div
      className={`${
        props.style
      } text-[14px] inline-flex  justify-center items-center gap-3 border p-2 rounded-[10px] border-solid cursor-pointer  ${
        props.disable
          ? "border-[rgba(255,255,255,0.50)] text-gray-400 hover:cursor-not-allowed"
          : "text-[14px] px-[32px] py-[10px] font-medium rounded-full text-white bg-gradient-to-r from-[#B631B1] to-[#7048D7]"
      }`}
    >
      {props.children}
    </div>
  );
};

export const TAIL_TITLE = (props: any) => {
  return (
    <div className={`${props.style} mt-3`}>
      <h2>{props.title}</h2>
    </div>
  );
};

export const PRODUCTS = [
  {
    name: "Brand Vision AI",
    Description:
      "Design captivating ad images and social posts that ignite audience interest and boost engagement",
  },
  {
    name: "Sonic AI",
    Description:
      "Use our AI to predict your music’s success, analyse, or master your song for a perfect tune.",
  },
  {
    name: "Lyrics Genius AI",
    Description:
      "Predict your lyrics’ success and craft them with AI assistance. Our tools fine-tune your words for effective audience reach.",
  },
  {
    name: "Video Vista AI",
    Description:
      "The easiest way to convert text to video using AI. Coming soon!",
  },
];

export const NYX_DATA = {
  ADS: {
    title: "Brand Vision AI",
    hover: "hover:bg-[#003856]",
    subtitle: "Meet Your New Creative Companion",
    content:
      "Boost conversions with BrandVision, your AI design partner. Transform your ideas into stunning visuals for standout campaigns with maximum ROI.",
    data: [
      {
        url: "https://nyxassets.s3.ap-south-1.amazonaws.com/assets/images/artists/sonu nigam.png",
        title: "Brand Vision Predictor",
        content:
          "Predict your ad image's success probability with NYX and make informed decisions for maximum ROI.",
        route: "",
        image_width: "w-[16rem]",
      },

      {
        url: "https://nyxassets.s3.ap-south-1.amazonaws.com/assets/images/artists/sonu nigam.png",
        title: "Brand Vision Generator",
        content:
          "Experience genAI that turns your text into compelling ad visuals, tailored to your brand and audience, and optimize for high click-through rates and conversions.",
        route: "",
        image_width: "w-[16rem]",
      },
      {
        url: "https://nyxassets.s3.ap-south-1.amazonaws.com/assets/images/artists/sonu nigam.png",
        title: "Brand Vision Editor - Coming Soon",
        content:
          "Modify and enhance your images and get suggestions based on successful industry campaigns and ensure your images are professional.",
        route: "",
        image_width: "w-[16rem]",
      },
    ],
  },
  LYRICS: {
    title: "Lyrics Genius AI",
    subtitle: "Meet Your New Lyrics companion",
    hover: "hover:bg-[#003856]",
    content:
      "Maximize your lyrics’ success with LyricGenius, your AI lyrical guide. Refine your lyrics for your audience, craft lyrics that connect with listeners, and increase song popularity and sales.",
    data: [
      {
        url: "https://nyxassets.s3.ap-south-1.amazonaws.com/assets/images/artists/sonu nigam.png",
        title: "Lyrics Genius Predictor",
        content:
          "Predict your lyrics’ success with NYX and refine your lyrics with data-driven insights.",
        route: "",
        image_width: "w-[16rem]",
      },

      {
        url: "https://nyxassets.s3.ap-south-1.amazonaws.com/assets/images/artists/sonu nigam.png",
        title: "Lyrics Genius Generator",
        content:
          "Generate new lyrics with NYX based on your inputs like genre, mood, and theme. Experiment with different lyrical styles and themes to enhance your success odds.",
        route: "",
        image_width: "w-[16rem]",
      },
      {
        url: "https://nyxassets.s3.ap-south-1.amazonaws.com/assets/images/artists/sonu nigam.png",
        title: "Lyrics Genius Consultation",
        content:
          "Get expert consultation on your lyrics with NYX. Receive feedback and suggestions to improve your lyrics and increase their success chances.",
        route: "",
        image_width: "w-[16rem]",
      },
    ],
  },

  MUSIC: {
    title: "Sonic AI",
    subtitle: "Meet Your New Music companion",
    hover: "hover:bg-[#3B226F]",
    content:
      "Boost your music revenue with Sonic, your AI music partner. NYX analyzes and masters your songs, helping you create chart-topping tracks that resonate with listeners.",
    data: [
      {
        url: "https://nyxassets.s3.ap-south-1.amazonaws.com/assets/images/artists/sonu nigam.png",
        title: "Sonic Predictor",
        content:
          "Predict your songs’ success with NYX and optimize your music for success.",
        route: "",
        image_width: "w-[16rem]",
      },

      {
        url: "https://nyxassets.s3.ap-south-1.amazonaws.com/assets/images/artists/sonu nigam.png",
        title: "Sonic Tune Master",
        content:
          "Gain deep insights into your music with NYX. Understand your music better and enhance its quality",
        route: "",
        image_width: "w-[16rem]",
      },
      {
        url: "https://nyxassets.s3.ap-south-1.amazonaws.com/assets/images/artists/sonu nigam.png",
        title: "Sonic Consultation",
        content:
          "Get easy expert consultation on your songs. Music experts provide feedback and suggestions to improve your song and increase its success chances",
        route: "",
        image_width: "w-[16rem]",
      },
    ],
  },
};
const NextArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={classNames(className, "before:hidden")}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    >
      <svg
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 65 65"
        className="fill-current text-white w-6 h-6 lg:w-16 lg:h-16"
      >
        <path d="M21.503 6.646a4.063 4.063 0 0 0 0 5.745L41.612 32.5 21.502 52.61a4.063 4.063 0 0 0 5.745 5.744l22.981-22.982a4.062 4.062 0 0 0 0-5.744L27.247 6.646a4.063 4.063 0 0 0-5.744 0Z" />
      </svg>
    </div>
  );
};

const PrevArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={classNames(className, "before:hidden")}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    >
      <svg
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 65 65"
        className="fill-current text-white w-6 h-6 lg:w-16 lg:h-16"
      >
        <path d="M43.497 58.353a4.062 4.062 0 0 0 0-5.744L23.388 32.5l20.11-20.109a4.063 4.063 0 0 0-5.745-5.744L14.771 29.628a4.062 4.062 0 0 0 0 5.744l22.982 22.981a4.063 4.063 0 0 0 5.744 0Z" />
      </svg>
    </div>
  );
};
export const GALARYSLICKSETTINGS = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  centerMode: true,
  centerPadding: "60px",
  arrows: true,
  lazyLoad: "progressive",
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ],
};

export const TECHLICKSETTINGS = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  centerMode: true,
  centerPadding: "60px",
  arrows: true,
  lazyLoad: "progressive",
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ],
};

export const IMAGES = [
  "https://nyxassets.s3.ap-south-1.amazonaws.com/assets/images/artists/sonu nigam.png",
  "https://nyxassets.s3.ap-south-1.amazonaws.com/assets/images/artists/sonu nigam.png",
  "https://nyxassets.s3.ap-south-1.amazonaws.com/assets/AI.jpg",
  "https://nyxassets.s3.ap-south-1.amazonaws.com/assets/images/artists/sonu nigam.png",
  "https://nyxassets.s3.ap-south-1.amazonaws.com/assets/images/artists/sonu nigam.png",
  "https://nyxassets.s3.ap-south-1.amazonaws.com/assets/images/artists/sonu nigam.png",
];

export const PDP1HW = {
  TABS: ["BrandVision Generate", "BrandVision Auto", "BrandVision Analyze"],
  "BrandVision Generate": [
    {
      svg: "",
      title: "Onboard Your Brand on Our Platform",
      content:
        "Provide the basic information regarding your brand and its products. Company name, Industry and Target Demographic Information.",
    },
    {
      svg: "",
      title: "Provide Information for Image Generation",
      content:
        "Text prompt that describes an image along with other optional settings like size, resolution, camera settings, vibe, lighting etc",
    },
    {
      svg: "",
      title: "Generate Your Image",
      content:
        "Get multiple high-CTR images within seconds. Choose the design that is most apt for your campaign.",
    },
    {
      svg: "",
      title: "Brand Your Image",
      content:
        "Brand your Image to make it ready to use . Add brand logos, CTAs, text – make it yours. ",
    },
  ],
  "BrandVision Auto": [
    {
      svg: "",
      title: "Onboard",
      content:
        "Provide the basic information regarding your brand and its products. Company name, Industry and Target Demographic Information.",
    },
    {
      svg: "",
      title: "Provide Information for Image Generation",
      content: "Text prompt",
    },
    {
      svg: "",
      title: "Generate Your Image",
      content: "Get multiple",
    },
    {
      svg: "",
      title: "Brand Your Image",
      content: "Brand your  ",
    },
  ],
  "BrandVision Analyze": [
    {
      svg: "",
      title: "Onboard Your Brand on Our Platform",
      content:
        "Provide the basic information regarding your brand and its products. Company name, Industry and Target Demographic Information.",
    },
    {
      svg: "",
      title: "Provide Information for Image Generation",
      content:
        "Text prompt that describes an image along with other optional settings like size, resolution, camera settings, vibe, lighting etc",
    },
    {
      svg: "",
      title: "Generate Your Image",
      content:
        "Get multiple high-CTR images within seconds. Choose the design that is most apt for your campaign.",
    },
    {
      svg: "",
      title: "Brand Your Image",
      content:
        "Brand your Image to make it ready to use . Add brand logos, CTAs, text – make it yours. ",
    },
  ],
};
export const PDP2HW = {
  TABS: ["Sonic predictor", "Sonic tune master", "Sonic consultation"],
  "Sonic predictor": [
    {
      svg: "",
      title: "Upload Your Song",
      content:
        "You can upload any song from your library or any public URL. Multiple audio formats are supported. What could be simpler?",
    },
    {
      svg: "",
      title: "Receive Success Prediction",
      content:
        "Our advanced algorithms will analyze your song's melody, rhythm, and lyrics and you'll receive a success prediction based on comparisons with patterns found in successful songs.",
    },
    {
      svg: "",
      title: "Explore Detailed Insights",
      content:
        "Gain deep insights into various aspects of your song, including mood, tempo, lyrics clarity, acoustic presence, and song duration. Understand how each element contributes to the overall appeal and success potential of your music.",
    },
  ],
  "Sonic tune master": [
    {
      svg: "",
      title: "Onboard",
      content:
        "Provide the basic information regarding your brand and its products. Company name, Industry and Target Demographic Information.",
    },
    {
      svg: "",
      title: "Provide Information for Image Generation",
      content: "Text prompt",
    },
    {
      svg: "",
      title: "Generate Your Image",
      content: "Get multiple",
    },
    {
      svg: "",
      title: "Brand Your Image",
      content: "Brand your  ",
    },
  ],
  "Sonic consultation": [
    {
      svg: "",
      title: "Onboard Your Brand on Our Platform",
      content:
        "Provide the basic information regarding your brand and its products. Company name, Industry and Target Demographic Information.",
    },
    {
      svg: "",
      title: "Provide Information for Image Generation",
      content:
        "Text prompt that describes an image along with other optional settings like size, resolution, camera settings, vibe, lighting etc",
    },
    {
      svg: "",
      title: "Generate Your Image",
      content:
        "Get multiple high-CTR images within seconds. Choose the design that is most apt for your campaign.",
    },
    {
      svg: "",
      title: "Brand Your Image",
      content:
        "Brand your Image to make it ready to use . Add brand logos, CTAs, text – make it yours. ",
    },
  ],
};
export const HOW_IT_WORKS = (props: any) => {
  const [indexTab, setIndex] = useState(0);
  return (
    <div>
      <TAIL_TITLE
        title="How is it works?"
        style="text-white flex justify-center text-[13px] text-[24px] md:text-3xl font-[600] pb-10"
      ></TAIL_TITLE>
      <div className={`flex justify-center`}>
        <div className="flex gap-10">
          {props.data.TABS.map((tab: any, index: number) => (
            <div
              onClick={() => setIndex(index)}
              className={`text-[13px] md:text-xl text-center ${
                index === indexTab
                  ? "bg-[#FFC01D] text-black font-semibold"
                  : " text-white"
              } p-2 rounded-[20px] cursor-pointer`}
            >
              {tab}
            </div>
          ))}
        </div>
      </div>

      {props.data[props.data.TABS[indexTab]].map((info: any, index: any) => (
        <div key={index} className="flex pb-10 pt-14 m-auto w-[90%] gap-10">
          <div className="bg-[#293277] p-5 rounded-[14px]">
            <svg
              width="96"
              height="114"
              viewBox="0 0 96 114"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.04 6.65L26.88 0L68.04 40.7313C69.88 42.5521 70.8 44.8083 70.8 47.5C70.8 50.1917 69.88 52.4479 68.04 54.2687L45.24 76.8312C43.4 78.6521 41.12 79.5625 38.4 79.5625C35.68 79.5625 33.4 78.6521 31.56 76.8312L8.76 54.2687C6.92 52.4479 6 50.1917 6 47.5C6 44.8083 6.92 42.5521 8.76 40.7313L31.56 18.05L20.04 6.65ZM38.4 24.8188L15.48 47.5H61.32L38.4 24.8188ZM81.6 80.75C78.96 80.75 76.7 79.8198 74.82 77.9594C72.94 76.099 72 73.8625 72 71.25C72 69.5875 72.5 67.8063 73.5 65.9062C74.5 64.0062 75.6 62.225 76.8 60.5625C77.52 59.6125 78.28 58.6229 79.08 57.5938C79.88 56.5646 80.72 55.575 81.6 54.625C82.48 55.575 83.32 56.5646 84.12 57.5938C84.92 58.6229 85.68 59.6125 86.4 60.5625C87.6 62.225 88.7 64.0062 89.7 65.9062C90.7 67.8063 91.2 69.5875 91.2 71.25C91.2 73.8625 90.26 76.099 88.38 77.9594C86.5 79.8198 84.24 80.75 81.6 80.75ZM0 114V95H96V114H0Z"
                fill="white"
              />
            </svg>
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-amber-300 font-[550] text-[16px] md:text-2xl">
              {info.title}
            </p>
            <p className="text-white pt-2 font-[300] md:text-xl text-[13px] ">
              {info.content}
            </p>
          </div>
        </div>
      ))}

      <div className="flex justify-center pb-5">
        <div className="inline-flex  justify-center items-center gap-3 font-semibold    rounded-[30px] hover:border-none h-12 bg-[#FFC01D] hover:text-black p-5 border-solid cursor-pointer text-black">
          Try {props.data.TABS[indexTab]}
        </div>
      </div>
    </div>
  );
};

export const Discover = [
  {
    url: "",
    seemore: false,
    title: "Sonic Predictor",
    content:
      "Predict your song&apos;s hit potential & optimize its success based on proven patterns in chart-topping tracks.",
  },
  {
    url: "",
    seemore: false,
    title: "Sonic Tune Master",
    content:
      "Unlock the true potential of your music with Master Tune, a cutting-edge tool AI tool designed to elevate the quality and production of your songs.",
  },
  {
    url: "",
    seemore: false,
    title: " Sonic Consultation",
    content:
      "Harness the power of expert guidance to amplify your music production prowess.",
  },
];

export const Brand_Discover = [
  {
    url: "",
    seemore: false,
    title: "BrandVision Generate",
    content:
      "Generate multiple creatives simultaneously for your ad campaigns. ",
  },
  {
    url: "",
    seemore: false,
    title: "BrandVision Auto",
    content:
      "Automatically import top trends from various social media websites",
  },
  {
    url: "",
    seemore: false,
    title: "BrandVision Analyze",
    content:
      "Whether your goal is high CTR or aim to boost brand/product recall",
  },
];

export const SONIC_AI = [
  {
    title: "Producers",
    content:
      "End creative blocks forever. Instantly create distinct tracks with a simple click.",
  },
  {
    title: "Creators",
    content:
      "Put copyright concerns to rest and uncover exclusive, royalty-free tracks that seamlessly complement your content.",
  },
  {
    title: "Brands",
    content:
      "Leave behind those hefty music bills. Sonic AI brings forth an affordable answer to get customized music for your brand.",
  },
];

export const SONIC_AI2 = [
  {
    title: "Predict Success with Precision",
    content:
      "Unlock strategic insights into your song's potential success. Tailor your release strategy and optimize your music for maximum impact.",
  },
  {
    title: "Dive Deep into Your Music",
    content:
      "Leverage insights, predictions, and expert guidance to unlock the full potential of your music. Stand out in the dynamic and competitive music industry",
  },
  {
    title: "Unlock Your Music's Full Potential",
    content:
      "Artists can earn royalties after listing their tracks, Sonic AI transforms your passion into a lucrative venture.",
  },
];

export const BrandVisionAIROUD1 = [
  {
    title: "High CTR/Engagement Instantly",
    content:
      "Generate creatives that will generate high CTR and drive your brand’s growth with a single click and save on your time, cost and effort.",
  },
  {
    title: "Stay Relevant to the Trends",
    content:
      "Automatically generate creatives based on what’s trending on social media landscape that are tailored for your specific brand.",
  },
  {
    title: "Predict Success with Precision",
    content:
      " Unlock strategic insights into your creative's potential success. Tailor your release strategy and optimize your campaign for maximum impact.",
  },
];

export const BrandVisionAIROUD = [
  {
    title: "Influencers",
    content:
      "Expand your reach with Facebook, Instagram and twitter post visuals.",
  },
  {
    title: "Agencies",
    content:
      "Imagine crafting ad creatives and banners that magnetize clicks faster than ever before. We make it happen, with stunning visuals that skyrocket your client's success.",
  },
  {
    title: "Startups",
    content:
      "Invest in creatives that drive growth. leverage the most time and cost effective AI tool in ad creation available.",
  },
];
