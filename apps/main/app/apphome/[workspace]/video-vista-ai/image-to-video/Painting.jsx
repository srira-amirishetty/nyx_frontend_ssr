/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState,useContext,useRef,useEffect } from "react";
import { motion } from "framer-motion";
import classNames from "@nyx-frontend/main/utils/classNames";
import { IMAGE_TO_VIDEO_TABS } from "@nyx-frontend/main/utils/productConstants";
import Button from "@nyx-frontend/main/components/Button";
import { UseContextData } from "@nyx-frontend/main/hooks/usecontext";
import TextEditing from "@nyx-frontend/main/components/textEdit";
import { toast } from "react-toastify";


const Painting = ({ tab, setBrandTab,imageUploaded }) => {
  const [tabData, setTabData] = useState([
    {
      name: "Image",
      active: true,
      component: <ImageAsset />,
    },
    {
      name: "Text",
      active: false,
      component: <TextEditing />,
    },
    {
      name: "Music",
      active: false,
      //component: <TextEditing />,
    },
  ]);

  const onSelectTab = (index) => {
    const updatedTabs = tabData.map((tab, i) => ({
      ...tab,
      active: i === index,
    }));
    setTabData(updatedTabs);
  };

  const OpenAnimation =()=>{
    if(imageUploaded===0){
      toast.error("Please Upload Image First");
    }else{
      setBrandTab(IMAGE_TO_VIDEO_TABS.PAINTING)
    }
  }
  return (
    <>
      <div className="bg-nyx-blue-4 rounded-lg">
        <h2 className="mb-0">
          <div
            className={`${
              tab === IMAGE_TO_VIDEO_TABS.PAINTING
            } group relative flex w-full items-center border-0 px-5 py-4 text-left text-base cursor-pointer bg-nyx-blue-4 text-white rounded-lg`}
            // onClick={() => setBrandTab(IMAGE_TO_VIDEO_TABS.PAINTING)}
               onClick={() => OpenAnimation()}
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            <div className="flex w-full justify-between items-center">
              <div
                className={`w-[50%] md:w-full font-semibold flex ${
                  tab === IMAGE_TO_VIDEO_TABS.PAINTING
                    ? "text-nyx-yellow text-base"
                    : "text-white text-sm"
                }`}
              >
                Brand Painting
              </div>
            </div>

            <span
              className={`${
                tab === IMAGE_TO_VIDEO_TABS.PAINTING
                  ? `rotate-[-180deg] -mr-1`
                  : `dark:fill-white`
              } ml-auto h-5 w-5 shrink-0 transition-transform duration-200 ease-in-out motion-reduce:transition-none`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </span>
          </div>
        </h2>
        <motion.div
          initial={{
            height: 0,
            opacity: 0,
          }}
          animate={{
            height: tab === IMAGE_TO_VIDEO_TABS.PAINTING ? "auto" : 0,
            opacity: 1,
          }}
          exit={{
            height: 0,
            opacity: 0,
          }}
          className={classNames(
            `bg-nyx-blue-4 w-full overflow-hidden rounded-lg`
          )}
        >
          <div className="flex flex-col py-2 md:px-7 sm:px-4">
            <div className="rounded-bl-md">
              <div className="flex gap-7 justify-center  border-b-2 border-[#999999] m-auto w-[90%]">
                {tabData.map((tab, index) => (
                  <div key={index}>
                    <div
                      onClick={() => {
                        onSelectTab(index);
                      }}
                      className={`text-white cursor-pointer text-[16px]  ${
                        tab.active == true
                          ? "border-[#FFC01D] border-b-4 font-bold"
                          : "font-[300]"
                      } relative top-1`}
                    >
                      {tab.name}
                    </div>
                  </div>
                ))}
              </div>
              <div className="m-auto w-[90%]">
                {tabData.find((tabs) => tabs.active == true)?.component}
              </div>
            </div>
            <div className="text-center mt-4 mb-2">
              <Button className="rounded-full bg-[#F1BB2E] text-[#000000] px-[40px]">
                Save
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Painting;

const ImageAsset = () => {
  const [accordionData, setAccordionData] = useState([
    {
      name: "Choose Logo",
      active: false,
      component: <BrandPainting name="logos" type="logo"></BrandPainting>,
    },
    {
      name: "Icons",
      active: false,
      component: <BrandPainting name="icons" type="icon"></BrandPainting>,
    },
    {
      name: "Graphics",
      active: false,
      component: <BrandPainting name="graphics" type="graphic"></BrandPainting>,
    },
    {
      name: "Photos",
      active: false,
      component: <BrandPainting name="photos" type="photo"></BrandPainting>,
    },
  ]);
  const onClick = (index) => {
    const updatedAccordionData = accordionData.map((acc, i) => ({
      ...acc,
      active: i === index ? !acc.active : false,
    }));

    setAccordionData(updatedAccordionData);
  };
  return (
    <>
      {accordionData.map((acc, index) => (
        <BrandAccordion
          key={index}
          idx={index}
          onClick={onClick}
          data={acc}
        ></BrandAccordion>
      ))}
    </>
  );
};

const BrandPainting = (props) => {
  const [images, setImages] =
    useState 
   ( [
      {
        id: 1,
        url: "https://storage.googleapis.com/nyxassets-new/logo/rapido-logo.jpeg",
        name: `${props.type} 1`,
        type: "logo",
      },
      {
        id: 2,
        url: "https://storage.googleapis.com/nyxassets-new/logo/apple-logo.jpeg",
        name: `${props.type} 2`,
        type: "logo",
      },
      {
        id: 3,
        url: "https://source.unsplash.com/800x600/?bus",
        name: `${props.type} 3`,
        type: "logo",
      },
      {
        id: 4,
        url: "https://source.unsplash.com/800x600/?train",
        name: `${props.type} 4`,
        type: "logo",
      },
      {
        id: 5,
        url: "https://source.unsplash.com/800x600/?world",
        name: `${props.type} 5`,
        type: "static",
      },
    ]);
  const [active, setActive] = useState(0);
  const { setTrigger, toggleIcon, setToggleIcon, imageUploaded } =
    useContext(UseContextData);
  const [count, setCount] = useState(0);
  const logoInputRef = useRef (null);
  useEffect(() => {
    toggleIcon.file = images[0].url;
    setToggleIcon({ ...toggleIcon, toggleIcon });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onUpload = () => {
    logoInputRef.current.click();
  };
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newImage = {
          id: images.length + 1,
          url: e.target?.result,
          name: `${props.name} ${images.length + 1}`,
          type: "logo",
        };
        setImages((prevImages) => {
          const staticImages = prevImages.filter(
            (image) => image.type === "static"
          );
          const logoImages = prevImages.filter(
            (image) => image.type === "logo"
          );
          return [...logoImages, newImage, ...staticImages];
        });
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <>
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
        id="logoInput"
        ref={logoInputRef}
      />
      <div className="">
        <div className="flex gap-3 flex-wrap mt-3 justify-between">
          {images.map((image, index) => (
            <>
              {image.type == "logo" ? (
                <div
                  key={image.id}
                  className={`group rounded-md relative overflow-hidden w-[22%] ${
                    active == index
                      ? "  border border-t-1 border-nyx-sky"
                      : " border border-t-1 border-transparent"
                  }`}
                >
                  {/* Header with edit icon */}
                  <div
                    className={`group w-full group-hover:bg-nyx-new-blue flex justify-center top-0 left-0 bg-[#6F559A] text-white p-1
                    ${active == index ? "bg-nyx-new-blue" : ""}`}
                  >
                    <span className="mr-1 text-xs ">{image.name}</span>
                  </div>
                  {/* @team please wrap with button and also use classNames(utils) */}
                  <img
                    onClick={() => {
                      setActive(index);
                    }}
                    className={`w-full h-[75px]`}
                    src={image.url}
                    alt={image.type}
                  />
                </div>
              ) : (
                <>
                  <div onClick={onUpload}>
                    <svg
                      width="96"
                      height="97"
                      viewBox="0 0 96 97"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_146_2430)">
                        <rect
                          x="0.808594"
                          y="0.786133"
                          width="94.6324"
                          height="95.5693"
                          rx="9.36954"
                          fill="#1E1239"
                        />
                        <path
                          d="M26.0506 19.7529L25.2186 17.8415H21.0698L20.249 19.7529H19.1134L22.6102 11.8825H23.7345L27.22 19.7529H26.0506ZM21.4971 16.8634H24.8026L23.1386 13.0406L21.4971 16.8634ZM33.4965 11.4103V19.7529H32.4509V18.5724C32.226 18.9696 31.9225 19.277 31.5402 19.4943C31.1654 19.7042 30.7269 19.8091 30.2247 19.8091C29.6625 19.8091 29.1641 19.6817 28.7293 19.4269C28.3021 19.1645 27.9685 18.8047 27.7286 18.3475C27.4888 17.8828 27.3689 17.3543 27.3689 16.7622C27.3689 16.1775 27.4888 15.6603 27.7286 15.2106C27.9685 14.7533 28.3021 14.3973 28.7293 14.1424C29.1641 13.8876 29.6588 13.7602 30.2134 13.7602C30.7232 13.7602 31.1691 13.8651 31.5514 14.075C31.9337 14.2849 32.2335 14.5884 32.4509 14.9857V11.4103H33.4965ZM30.4383 18.9097C30.8281 18.9097 31.1729 18.8197 31.4727 18.6398C31.78 18.4599 32.0199 18.2088 32.1923 17.8865C32.3647 17.5642 32.4509 17.2007 32.4509 16.7959C32.4509 16.3836 32.3647 16.0164 32.1923 15.694C32.0199 15.3717 31.78 15.1206 31.4727 14.9407C31.1729 14.7608 30.8281 14.6709 30.4383 14.6709C30.0485 14.6709 29.7 14.7646 29.3927 14.952C29.0929 15.1319 28.8567 15.383 28.6843 15.7053C28.5119 16.0276 28.4257 16.3911 28.4257 16.7959C28.4257 17.2007 28.5119 17.5642 28.6843 17.8865C28.8567 18.2088 29.0929 18.4599 29.3927 18.6398C29.7 18.8197 30.0485 18.9097 30.4383 18.9097ZM41.1386 11.4103V19.7529H40.0929V18.5724C39.8681 18.9696 39.5645 19.277 39.1822 19.4943C38.8074 19.7042 38.3689 19.8091 37.8667 19.8091C37.3045 19.8091 36.8061 19.6817 36.3713 19.4269C35.9441 19.1645 35.6105 18.8047 35.3707 18.3475C35.1308 17.8828 35.0109 17.3543 35.0109 16.7622C35.0109 16.1775 35.1308 15.6603 35.3707 15.2106C35.6105 14.7533 35.9441 14.3973 36.3713 14.1424C36.8061 13.8876 37.3008 13.7602 37.8555 13.7602C38.3652 13.7602 38.8112 13.8651 39.1934 14.075C39.5757 14.2849 39.8756 14.5884 40.0929 14.9857V11.4103H41.1386ZM38.0803 18.9097C38.4701 18.9097 38.8149 18.8197 39.1147 18.6398C39.4221 18.4599 39.6619 18.2088 39.8343 17.8865C40.0067 17.5642 40.0929 17.2007 40.0929 16.7959C40.0929 16.3836 40.0067 16.0164 39.8343 15.694C39.6619 15.3717 39.4221 15.1206 39.1147 14.9407C38.8149 14.7608 38.4701 14.6709 38.0803 14.6709C37.6906 14.6709 37.342 14.7646 37.0347 14.952C36.7349 15.1319 36.4988 15.383 36.3264 15.7053C36.154 16.0276 36.0678 16.3911 36.0678 16.7959C36.0678 17.2007 36.154 17.5642 36.3264 17.8865C36.4988 18.2088 36.7349 18.4599 37.0347 18.6398C37.342 18.8197 37.6906 18.9097 38.0803 18.9097ZM46.2814 11.8825H47.3608V18.7747H50.8013V19.7529H46.2814V11.8825ZM54.55 13.7714C55.1421 13.7714 55.6668 13.8988 56.1241 14.1537C56.5888 14.4085 56.9486 14.7646 57.2034 15.2218C57.4658 15.6716 57.597 16.1888 57.597 16.7734C57.597 17.3581 57.4658 17.879 57.2034 18.3363C56.9486 18.7935 56.5888 19.1495 56.1241 19.4044C55.6668 19.6592 55.1421 19.7867 54.55 19.7867C53.9503 19.7867 53.4181 19.6592 52.9534 19.4044C52.4962 19.1495 52.1364 18.7972 51.874 18.3475C51.6192 17.8903 51.4918 17.3656 51.4918 16.7734C51.4918 16.1888 51.6192 15.6716 51.874 15.2218C52.1364 14.7646 52.4962 14.4085 52.9534 14.1537C53.4181 13.8988 53.9503 13.7714 54.55 13.7714ZM54.55 14.6821C54.1602 14.6821 53.8117 14.7721 53.5043 14.952C53.2045 15.1319 52.9684 15.383 52.796 15.7053C52.6311 16.0201 52.5486 16.3799 52.5486 16.7847C52.5486 17.1969 52.6311 17.5642 52.796 17.8865C52.9684 18.2088 53.2045 18.4599 53.5043 18.6398C53.8117 18.8122 54.1602 18.8984 54.55 18.8984C54.9323 18.8984 55.2733 18.8122 55.5731 18.6398C55.8805 18.4599 56.1166 18.2088 56.2815 17.8865C56.4539 17.5642 56.5401 17.1969 56.5401 16.7847C56.5401 16.3799 56.4539 16.0201 56.2815 15.7053C56.1166 15.383 55.8805 15.1319 55.5731 14.952C55.2733 14.7721 54.9323 14.6821 54.55 14.6821ZM64.3216 13.8051V19.1458C64.3216 19.7155 64.1942 20.2139 63.9393 20.6412C63.692 21.0684 63.3397 21.3945 62.8824 21.6193C62.4252 21.8517 61.893 21.9679 61.2859 21.9679C60.4089 21.9679 59.5918 21.6906 58.8348 21.1359L59.2958 20.3713C59.5881 20.6112 59.8917 20.7873 60.2065 20.8998C60.5213 21.0197 60.8661 21.0797 61.2409 21.0797C61.8555 21.0797 62.3465 20.9073 62.7138 20.5625C63.0811 20.2177 63.2647 19.7567 63.2647 19.1795V18.3475C63.0548 18.7073 62.77 18.9884 62.4102 19.1908C62.0504 19.3856 61.6382 19.4831 61.1734 19.4831C60.6412 19.4831 60.169 19.3632 59.7567 19.1233C59.352 18.8759 59.0372 18.5349 58.8123 18.1001C58.5874 17.6654 58.475 17.1669 58.475 16.6048C58.475 16.0501 58.5874 15.5591 58.8123 15.1319C59.0372 14.7046 59.352 14.3711 59.7567 14.1312C60.169 13.8913 60.6412 13.7714 61.1734 13.7714C61.6456 13.7714 62.0579 13.8689 62.4102 14.0637C62.77 14.2586 63.0548 14.536 63.2647 14.8958V13.8051H64.3216ZM61.3758 18.6398C61.7431 18.6398 62.0691 18.5536 62.354 18.3812C62.6388 18.2088 62.8599 17.9727 63.0173 17.6729C63.1823 17.3656 63.2647 17.0208 63.2647 16.6385C63.2647 16.2487 63.1823 15.9039 63.0173 15.6041C62.8599 15.2968 62.6388 15.0569 62.354 14.8845C62.0691 14.7121 61.7431 14.6259 61.3758 14.6259C61.0085 14.6259 60.6787 14.7121 60.3864 14.8845C60.1015 15.0569 59.8767 15.2968 59.7118 15.6041C59.5469 15.9039 59.4644 16.2487 59.4644 16.6385C59.4719 17.2232 59.6518 17.7029 60.0041 18.0777C60.3564 18.4524 60.8136 18.6398 61.3758 18.6398ZM68.7031 13.7714C69.2953 13.7714 69.82 13.8988 70.2772 14.1537C70.7419 14.4085 71.1017 14.7646 71.3566 15.2218C71.6189 15.6716 71.7501 16.1888 71.7501 16.7734C71.7501 17.3581 71.6189 17.879 71.3566 18.3363C71.1017 18.7935 70.7419 19.1495 70.2772 19.4044C69.82 19.6592 69.2953 19.7867 68.7031 19.7867C68.1035 19.7867 67.5713 19.6592 67.1065 19.4044C66.6493 19.1495 66.2895 18.7972 66.0272 18.3475C65.7723 17.8903 65.6449 17.3656 65.6449 16.7734C65.6449 16.1888 65.7723 15.6716 66.0272 15.2218C66.2895 14.7646 66.6493 14.4085 67.1065 14.1537C67.5713 13.8988 68.1035 13.7714 68.7031 13.7714ZM68.7031 14.6821C68.3133 14.6821 67.9648 14.7721 67.6575 14.952C67.3576 15.1319 67.1215 15.383 66.9491 15.7053C66.7842 16.0201 66.7018 16.3799 66.7018 16.7847C66.7018 17.1969 66.7842 17.5642 66.9491 17.8865C67.1215 18.2088 67.3576 18.4599 67.6575 18.6398C67.9648 18.8122 68.3133 18.8984 68.7031 18.8984C69.0854 18.8984 69.4264 18.8122 69.7263 18.6398C70.0336 18.4599 70.2697 18.2088 70.4346 17.8865C70.607 17.5642 70.6932 17.1969 70.6932 16.7847C70.6932 16.3799 70.607 16.0201 70.4346 15.7053C70.2697 15.383 70.0336 15.1319 69.7263 14.952C69.4264 14.7721 69.0854 14.6821 68.7031 14.6821ZM76.4621 15.1206C76.2148 14.9707 75.9412 14.8508 75.6414 14.7608C75.349 14.6709 75.068 14.6259 74.7981 14.6259C74.4833 14.6259 74.2284 14.6859 74.0336 14.8058C73.8462 14.9182 73.7525 15.0944 73.7525 15.3343C73.7525 15.5741 73.8574 15.7578 74.0673 15.8852C74.2847 16.0051 74.6107 16.1288 75.0455 16.2562C75.4577 16.3761 75.795 16.4961 76.0574 16.616C76.3197 16.7359 76.5408 16.9121 76.7207 17.1444C76.9081 17.3768 77.0018 17.6841 77.0018 18.0664C77.0018 18.6286 76.7882 19.0558 76.3609 19.3482C75.9412 19.6405 75.4165 19.7867 74.7869 19.7867C74.3446 19.7867 73.9136 19.7155 73.4939 19.573C73.0816 19.4306 72.7331 19.2282 72.4482 18.9659L72.8417 18.2013C73.0891 18.4262 73.3927 18.6061 73.7525 18.741C74.1198 18.8759 74.4758 18.9434 74.8206 18.9434C75.1654 18.9434 75.4427 18.8797 75.6526 18.7523C75.8625 18.6248 75.9674 18.43 75.9674 18.1676C75.9674 17.8978 75.855 17.6954 75.6301 17.5605C75.4128 17.4255 75.0792 17.2906 74.6295 17.1557C74.2322 17.0433 73.9061 16.9308 73.6513 16.8184C73.4039 16.6985 73.1903 16.5261 73.0104 16.3012C72.838 16.0763 72.7518 15.784 72.7518 15.4242C72.7518 14.8695 72.9542 14.4535 73.3589 14.1762C73.7637 13.8988 74.2697 13.7602 74.8768 13.7602C75.2366 13.7602 75.5889 13.8126 75.9337 13.9176C76.286 14.015 76.5896 14.1499 76.8444 14.3223L76.4621 15.1206Z"
                          fill="white"
                        />
                        <path
                          d="M0.338379 30.7783H95.9077V86.9956C95.9077 92.1702 91.7128 96.3651 86.5382 96.3651H9.70791C4.53326 96.3651 0.338379 92.1702 0.338379 86.9956V30.7783Z"
                          fill="#6F559A"
                        />
                        <path
                          d="M58.2234 60.4239C58.2234 66.1885 53.5503 70.8616 47.7857 70.8616C42.0212 70.8616 37.3481 66.1885 37.3481 60.4239C37.3481 54.6594 42.0212 49.9863 47.7857 49.9863C53.5503 49.9863 58.2234 54.6594 58.2234 60.4239Z"
                          stroke="#FFCB54"
                          strokeWidth="0.936954"
                        />
                        <path
                          d="M52.1131 60.7403C52.1131 60.8684 52.0622 60.9912 51.9717 61.0817C51.8811 61.1723 51.7583 61.2232 51.6303 61.2232H48.5724V64.281C48.5724 64.4091 48.5215 64.5319 48.431 64.6224C48.3404 64.713 48.2176 64.7639 48.0896 64.7639C47.9615 64.7639 47.8387 64.713 47.7482 64.6224C47.6576 64.5319 47.6067 64.4091 47.6067 64.281V61.2232H44.5489C44.4208 61.2232 44.298 61.1723 44.2075 61.0817C44.1169 60.9912 44.066 60.8684 44.066 60.7403C44.066 60.6123 44.1169 60.4895 44.2075 60.3989C44.298 60.3084 44.4208 60.2575 44.5489 60.2575H47.6067V57.1996C47.6067 57.0716 47.6576 56.9488 47.7482 56.8582C47.8387 56.7677 47.9615 56.7168 48.0896 56.7168C48.2176 56.7168 48.3404 56.7677 48.431 56.8582C48.5215 56.9488 48.5724 57.0716 48.5724 57.1996V60.2575H51.6303C51.7583 60.2575 51.8811 60.3084 51.9717 60.3989C52.0622 60.4895 52.1131 60.6123 52.1131 60.7403Z"
                          fill="#FFCB54"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_146_2430">
                          <rect
                            x="0.808594"
                            y="0.786133"
                            width="94.6324"
                            height="95.5693"
                            rx="9.36954"
                            fill="white"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                </>
              )}
            </>
          ))}
        </div>
      </div>

      <button
        onClick={() => {
          if (imageUploaded) {
            toggleIcon.file = images[active].url;
            setCount(count + 1);
            setToggleIcon({ ...toggleIcon, toggleIcon });
            setTrigger(`FromUrl${count}`);
          } else {
            toast.error("Upload Image and retry!");
          }
        }}
        className="flex text-[16px] justify-center cursor-pointer  border-nyx-yellow border m-auto text-nyx-yellow rounded-full py-2 px-4 mt-16 mb-7"
      >
        Select {props.type}
      </button>
    </>
  );
};

const BrandAccordion = (props) => {
  return (
    <div className="pt-5 pb-1 border-b-2 cursor-pointer border-[#999999]">
      <div
        className="flex justify-between"
        onClick={() => props.onClick(props.idx)}
      >
        <p className={`text-white text-sm font-bold leading-10 `}>
          {props.data.name}
        </p>
        <div className="mt-3">
          <svg
            width="21"
            height="18"
            viewBox="0 0 21 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.1069 5.95793C17.8751 5.74702 17.5608 5.62854 17.2331 5.62854C16.9054 5.62854 16.5911 5.74702 16.3593 5.95793L10.2415 11.5267L4.12374 5.95793C3.89065 5.753 3.57845 5.63961 3.2544 5.64217C2.93035 5.64473 2.62036 5.76305 2.39121 5.97163C2.16206 6.18022 2.03209 6.46238 2.02927 6.75735C2.02645 7.05232 2.15103 7.3365 2.37616 7.54868L9.36773 13.9128C9.5995 14.1237 9.9138 14.2422 10.2415 14.2422C10.5692 14.2422 10.8835 14.1237 11.1153 13.9128L18.1069 7.54868C18.3386 7.33771 18.4688 7.05161 18.4688 6.7533C18.4688 6.45499 18.3386 6.1689 18.1069 5.95793Z"
              fill="white"
            />
          </svg>
        </div>
      </div>
      {props.data.active && (
        <motion.div
          initial={{
            height: 0,
            opacity: 0,
          }}
          animate={{
            height: props.data.active ? "auto" : 0,
            opacity: 1,
          }}
          exit={{
            height: 0,
            opacity: 0,
          }}
          className={classNames(`bg-[#3B226F]`, "mt-8")}
        >
          <>{props.data.component}</>
        </motion.div>
      )}
    </div>
  );
};
