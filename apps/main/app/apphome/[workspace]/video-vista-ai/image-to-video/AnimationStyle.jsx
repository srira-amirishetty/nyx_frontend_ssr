"use client";
import React, { useEffect, useState,useContext } from "react";
import { motion } from "framer-motion";
import classNames from "@nyx-frontend/main/utils/classNames";
import { IMAGE_TO_VIDEO_TABS } from "@nyx-frontend/main/utils/productConstants";
import Button from "@nyx-frontend/main/components/Button";
import { MessagePopupContext } from "@nyx-frontend/main/hooks/MessagePopupContext";
import "@nyx-frontend/main/app/_components/toastifyTest/toastify.css";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
const AnimationStyle = ({
  tab,
  setBrandTab,
  updatedata,
  imageUploaded,
  tabControl,
  reset
}) => {
  const [selectedId, setSelectedId] = useState(null);
  const [selectedIdstatus, setSelectedIdstatus] = useState(false);



  useEffect(()=>{
    setSelectedId(null)
  },[reset])
  
  const AnimationStyles = [
    {
      id: 1,
      icon: `<svg width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.24609 7.30753L9.27159 8.33302L11.8723 5.73229V20.4867L9.27159 17.886L8.24609 18.9114L12.5976 23.2629L16.949 18.9114L15.9235 17.886L13.3228 20.4867V5.73229L15.9235 8.33302L16.949 7.30753L12.5976 2.95605L8.24609 7.30753Z" fill="white"/></svg>`,
      style: "Vertical",
    },
    {
      id: 2,
      icon: `
      <svg width="21" height="10" viewBox="0 0 21 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.02335 9.35937L6.04884 8.33388L3.44811 5.73315L18.2025 5.73315L15.6018 8.33388L16.6273 9.35937L20.9787 5.0079L16.6273 0.656434L15.6018 1.68193L18.2025 4.28266L3.44811 4.28266L6.04884 1.68193L5.02335 0.656435L0.671875 5.00791L5.02335 9.35937Z" fill="white"/>
      </svg>
      `,
      style: "Horizontal",
    },
    {
      id: 3,
      icon: `
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
  <path d="M15.5106 14.2102C16.7661 12.7193 17.454 10.8324 17.4527 8.88331C17.4527 7.22771 16.9617 5.60929 16.0419 4.23271C15.1221 2.85613 13.8148 1.78322 12.2852 1.14965C10.7556 0.516078 9.07251 0.350307 7.44872 0.673299C5.82494 0.99629 4.33339 1.79354 3.16271 2.96422C1.99202 4.13491 1.19478 5.62645 0.871785 7.25024C0.548794 8.87402 0.714564 10.5571 1.34813 12.0867C1.9817 13.6163 3.05462 14.9236 4.4312 15.8434C5.80778 16.7632 7.4262 17.2542 9.0818 17.2542C11.0309 17.2555 12.9178 16.5676 14.4087 15.3121L20.1815 21.0591L21.2576 19.9831L15.5106 14.2102ZM9.0818 15.7322C7.72721 15.7322 6.40305 15.3305 5.27676 14.5779C4.15047 13.8254 3.27263 12.7557 2.75425 11.5043C2.23588 10.2528 2.10025 8.87571 2.36451 7.54716C2.62878 6.21861 3.28107 4.99825 4.23891 4.04042C5.19674 3.08259 6.41709 2.43029 7.74565 2.16603C9.0742 1.90176 10.4513 2.03739 11.7027 2.55577C12.9542 3.07414 14.0239 3.95198 14.7764 5.07827C15.529 6.20457 15.9307 7.52873 15.9307 8.88331C15.9287 10.6991 15.2064 12.44 13.9225 13.724C12.6385 15.008 10.8976 15.7302 9.0818 15.7322Z" fill="white"/>
  <path d="M7.89112 3.12769H4.84717V0.0837402H3.3252V3.12769H0.28125V4.64966H3.3252V7.69361H4.84717V4.64966H7.89112V3.12769Z" fill="white" transform="translate(5,5)"/>
</svg>
      `,
      style: "Zoom In",
    },
    {
      id: 4,
      icon: `
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.5106 14.2102C16.7661 12.7193 17.454 10.8324 17.4527 8.88331C17.4527 7.22771 16.9617 5.60929 16.0419 4.23271C15.1221 2.85613 13.8148 1.78322 12.2852 1.14965C10.7556 0.516078 9.07251 0.350307 7.44872 0.673299C5.82494 0.99629 4.33339 1.79354 3.16271 2.96422C1.99202 4.13491 1.19478 5.62645 0.871785 7.25024C0.548794 8.87402 0.714564 10.5571 1.34813 12.0867C1.9817 13.6163 3.05462 14.9236 4.4312 15.8434C5.80778 16.7632 7.4262 17.2542 9.0818 17.2542C11.0309 17.2555 12.9178 16.5676 14.4087 15.3121L20.1815 21.0591L21.2576 19.9831L15.5106 14.2102ZM9.0818 15.7322C7.72721 15.7322 6.40305 15.3305 5.27676 14.5779C4.15047 13.8254 3.27263 12.7557 2.75425 11.5043C2.23588 10.2528 2.10025 8.87571 2.36451 7.54716C2.62878 6.21861 3.28107 4.99825 4.23891 4.04042C5.19674 3.08259 6.41709 2.43029 7.74565 2.16603C9.0742 1.90176 10.4513 2.03739 11.7027 2.55577C12.9542 3.07414 14.0239 3.95198 14.7764 5.07827C15.529 6.20457 15.9307 7.52873 15.9307 8.88331C15.9287 10.6991 15.2064 12.44 13.9225 13.724C12.6385 15.008 10.8976 15.7302 9.0818 15.7322Z" fill="white"/>
      <path d="M5.99219 8.25464H12.1209V9.48037H5.99219V8.25464Z" fill="white"/>
      </svg>
      `,
      style: "Zoom Out",
    },
    {
      id: 5,
      icon: `
      
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path d="M4.9863 13.7427H3.27344V18.8813H8.41202V17.1685H4.9863V13.7427ZM4.9863 5.17844H8.41202V3.46558H3.27344V8.60416H4.9863V5.17844ZM18.6892 3.46558H13.5506V5.17844H16.9763V8.60416H18.6892V3.46558ZM16.9763 17.1685H13.5506V18.8813H18.6892V13.7427H16.9763V17.1685Z" fill="white"/>
      <path d="M9.63459 15.2177L5.58984 11.1729L9.63459 7.12817L10.5784 8.10565L8.18522 10.4988H16.3758V11.847H8.18522L10.5784 14.2402L9.63459 15.2177Z" fill="white"/>
      </svg>

      `,
      style: "Zoom Left",
    },
    {
      id: 6,
      icon: `
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
  <path d="M16.7715 8.25775L18.4844 8.25775L18.4844 3.11917L13.3458 3.11917L13.3458 4.83203L16.7715 4.83203L16.7715 8.25775ZM16.7715 16.8221L13.3458 16.8221L13.3458 18.5349L18.4844 18.5349L18.4844 13.3963L16.7715 13.3963L16.7715 16.8221ZM3.06863 18.5349L8.20721 18.5349L8.20721 16.8221L4.78149 16.8221L4.78149 13.3963L3.06863 13.3963L3.06863 18.5349ZM4.78149 4.83203L8.20721 4.83203L8.20721 3.11917L3.06863 3.11917L3.06863 8.25775L4.78149 8.25775L4.78149 4.83203Z" fill="white"/>
  <path d="M12.1232 6.78283L16.168 10.8276L12.1232 14.8723L11.1795 13.8948L13.5726 11.5017L5.38199 11.5017L5.38199 10.1534L13.5726 10.1534L11.1795 7.76031L12.1232 6.78283Z" fill="white"/>
  
</svg>
      `,
      style: "Zoom Right",
      
    },
    {
      id: 7,
      icon: `
      <svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.7085 8.47543H19.1291V1.98237C19.129 1.80251 19.0894 1.62486 19.0132 1.46197C18.9369 1.29908 18.8258 1.15492 18.6877 1.03968C18.5496 0.924436 18.3879 0.840923 18.214 0.79504C18.0401 0.749156 17.8583 0.742021 17.6813 0.774139L3.64225 3.32661C3.3592 3.37798 3.10316 3.52706 2.91876 3.74786C2.73436 3.96866 2.6333 4.24717 2.6332 4.53484V8.47543H1.05381C0.914181 8.47543 0.780272 8.53089 0.681541 8.62962C0.58281 8.72835 0.527344 8.86226 0.527344 9.00189C0.527344 9.14152 0.58281 9.27542 0.681541 9.37416C0.780272 9.47289 0.914181 9.52835 1.05381 9.52835H2.6332V13.4689C2.6333 13.7566 2.73436 14.0351 2.91876 14.2559C3.10316 14.4767 3.3592 14.6258 3.64225 14.6772L17.6813 17.2296C17.7537 17.2428 17.8271 17.2496 17.9006 17.2498C18.2264 17.2498 18.5389 17.1204 18.7693 16.89C18.9996 16.6597 19.1291 16.3472 19.1291 16.0214V9.52835H20.7085C20.8481 9.52835 20.982 9.47289 21.0807 9.37416C21.1794 9.27542 21.2349 9.14152 21.2349 9.00189C21.2349 8.86226 21.1794 8.72835 21.0807 8.62962C20.982 8.53089 20.8481 8.47543 20.7085 8.47543ZM3.68613 4.53484C3.68545 4.49329 3.69954 4.45285 3.72589 4.42071C3.75224 4.38857 3.78914 4.36683 3.83003 4.35936L17.8691 1.80601H17.9015C17.9481 1.80601 17.9927 1.8245 18.0256 1.85741C18.0585 1.89032 18.077 1.93495 18.077 1.9815V8.47455H3.68613V4.53484ZM18.0761 16.0214C18.076 16.047 18.0703 16.0723 18.0594 16.0955C18.0485 16.1187 18.0327 16.1392 18.013 16.1557C17.9933 16.1723 17.9702 16.1843 17.9453 16.191C17.9204 16.1977 17.8944 16.1988 17.8691 16.1943L3.83003 13.6409C3.78914 13.6334 3.75224 13.6117 3.72589 13.5796C3.69954 13.5474 3.68545 13.507 3.68613 13.4654V9.52835H18.0761V16.0214Z" fill="white"/>
      </svg>
      `,
      style: "Perspective",
     
    },
    {
      id: 8,
      icon: `
      <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.87683 15.9028C6.67025 15.9028 4.80124 15.1371 3.26981 13.6057C1.73837 12.0742 0.972656 10.2052 0.972656 7.99866C0.972656 5.79208 1.73837 3.92307 3.26981 2.39163C4.80124 0.860199 6.67025 0.0944824 8.87683 0.0944824C10.0131 0.0944824 11.0999 0.329138 12.1373 0.798448C13.1747 1.26776 14.0639 1.93879 14.805 2.81154V0.0944824H16.781V7.01064H9.86485V5.03459H14.0145C13.4876 4.11244 12.7672 3.38789 11.8532 2.86094C10.9393 2.334 9.94719 2.07053 8.87683 2.07053C7.23013 2.07053 5.83043 2.64687 4.67774 3.79956C3.52505 4.95226 2.9487 6.35195 2.9487 7.99866C2.9487 9.64536 3.52505 11.0451 4.67774 12.1978C5.83043 13.3504 7.23013 13.9268 8.87683 13.9268C10.1448 13.9268 11.2893 13.5645 12.3102 12.84C13.3312 12.1154 14.0475 11.1603 14.4592 9.9747H16.534C16.0729 11.7202 15.1343 13.1446 13.7181 14.2479C12.302 15.3512 10.6882 15.9028 8.87683 15.9028Z" fill="white"/>
      </svg>
      `,
      style: "Circle",
    },
    {
      id: 9,
      icon: `<svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M10.8651 17.6275L8.82335 19.4249L8.36711 19.0233L10.9447 16.7541L11.1728 16.5538L11.4009 16.7541L13.9785 19.0233L13.5223 19.4249L11.5298 17.6709L11.5298 22.2666L10.8651 22.2666L10.8651 17.6275Z" fill="white"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M10.8651 5.37254L8.82335 3.57508L8.36711 3.97673L10.9447 6.24591L11.1728 6.44616L11.4009 6.24591L13.9785 3.97673L13.5223 3.57508L11.5298 5.32914L11.5298 0.733399L10.8651 0.733399L10.8651 5.37254Z" fill="white"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M21.3325 11.8419L19.535 13.8837L19.9367 14.3399L22.2059 11.7623L22.4061 11.5342L22.2059 11.3061L19.9367 8.72852L19.535 9.18475L21.2891 11.1772L16.6934 11.1772L16.6934 11.8419L21.3325 11.8419Z" fill="white"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M1.07375 11.2284L2.8712 9.18663L2.46956 8.73039L0.200384 11.308L0.0001291 11.5361L0.200384 11.7642L2.46956 14.3418L2.8712 13.8856L1.11715 11.8931L5.71289 11.8931L5.71289 11.2284L1.07375 11.2284Z" fill="white"/>
      <circle cx="11.2022" cy="11.503" r="2.27003" stroke="white" strokeWidth="0.997092"/>
      <circle cx="11.1873" cy="11.4803" r="5.54232" stroke="white" strokeWidth="0.997092"/>
      </svg>
      `,
      style: "Dolly",
    },
  ];

  const findStyleById = (id) => {
    const animationStyle = AnimationStyles.find((style) => style.id === id);
    return animationStyle ? animationStyle.style : null;
  };

  const clickonnextinbranding = () => {
    if (imageUploaded === 0) {
      toast.warn(
        <>
          <span className="text-white text-[20px]"> Image Missing!</span>
          <br />
          <span className="text-white text-[16px]">
            {" "}
            Please Upload Image First.
          </span>
        </>,
        { autoClose: 5000 },
      );
    }else{
    const style = findStyleById(selectedId);
    updatedata("AnimationStyle", style);
    if (tabControl === "1") {
      setBrandTab("");
    } else {
      console.log("inside style :", tabControl);
      setBrandTab(IMAGE_TO_VIDEO_TABS.MOTION);
    }
  }
  };
  const OpenAnimation = () => {
    if (imageUploaded === 0) {
      toast.warn(
        <>
          <span className="text-white text-[20px]"> Image Missing!</span>
          <br />
          <span className="text-white text-[16px]">
            {" "}
            Please Upload Image First.
          </span>
        </>,
        { autoClose: 5000 },
      );
    }else{
      if (tab === IMAGE_TO_VIDEO_TABS.STYLE) {
        setBrandTab("");
      } else {
        setBrandTab(IMAGE_TO_VIDEO_TABS.STYLE);
      }
    
  }
};

  const setvalueOfAnimaion = (value) => {
    setSelectedId(value);
    setSelectedIdstatus(true);
  };


  const { displayMessagePopup } = useContext(MessagePopupContext);
  return (
    <>
      <div className="bg-nyx-blue-4 rounded-lg">
        <h2 className="mb-0">
          <div
            className={`${
              tab === IMAGE_TO_VIDEO_TABS.STYLE
            } group relative flex w-full items-center border-0 px-5 py-4 text-left text-base cursor-pointer bg-nyx-blue-4 text-white rounded-lg`}
            // onClick={() => setBrandTab(IMAGE_TO_VIDEO_TABS.STYLE)}
            onClick={() => OpenAnimation()}
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            <div className="flex w-full justify-between items-center">
              <div
                className={`w-[50%] md:w-full font-semibold flex ${
                  tab === IMAGE_TO_VIDEO_TABS.STYLE
                    ? "text-nyx-yellow  text-lg"
                    : "text-white text-sm"
                }`}
              >
                Animation Style
              </div>
            </div>

            <span
              className={`${
                tab === IMAGE_TO_VIDEO_TABS.STYLE
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
            height: tab === IMAGE_TO_VIDEO_TABS.STYLE ? "auto" : 0,
            opacity: 1,
          }}
          exit={{
            height: 0,
            opacity: 0,
          }}
          className={classNames(
            `bg-nyx-blue-4 w-full overflow-hidden rounded-lg`,
          )}
        >
          <div className="flex flex-col items-center justify-center py-2 md:px-7 sm:px-4">
            <div className="w-[350px] h-100 grid grid-cols-2 items-center justify-center ml-[26px]">
              {AnimationStyles?.map((item) => (
                <button
                  onClick={() => setSelectedId(item.id)}
                  key={item.id}
                  className={`flex items-center justify-center mt-3 w-[160px] h-[37px]  gap-2 rounded ${
                    selectedId === item.id
                      ? "bg-[#5E32FF] text-white"
                      : "bg-[#1D1138] text-white"
                  } disabled:opacity-50  disabled:cursor-not-allowed`}
                  disabled={item.disabled}
                >
                  <div
                    className="svg-icon mr-[6px]"
                    dangerouslySetInnerHTML={{ __html: item.icon }}
                    style={{
                      // Change the fill color based on selection
                      fill: selectedId === item.id ? "black" : "white",
                    }}
                  ></div>

                  <div className="w-2/3 text-sm text-left">{item.style}</div>
                </button>
              ))}
            </div>

            <div className="text-center mt-4 mb-2">
              {/* <Button
                className="rounded-full text-[#F1BB2E] hover:bg-[#F1BB2E] hover:text-[#000000] px-[40px]font-bold"
                onClick={clickonnextinbranding}
              >
                Save
              </Button> */}
              {selectedId ? (
                <Button
                  className="rounded-full w-[109px] hover:shadow-none font-semibold mt-6 text-nyx-yellow  hover:text-black py-1.5 mb-4 hover:bg-nyx-yellow focus:shadow-glow "
                  onClick={clickonnextinbranding}
                >
                  Next
                </Button>
              ) : (
                <button className="shadow-nyx-gray-1 bg-nyx-gray-1 border-nyx-gray-1 text-black hover:bg-nyx-gray-1 rounded-full w-[109px] hover:shadow-none  py-1.5 cursor-not-allowed mt-6 mb-4 font-semibold">
                  Next
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default AnimationStyle;
