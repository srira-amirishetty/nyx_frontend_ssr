/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useRef } from "react";
import Select from "react-select";
import { brandPaintingStyles } from "@nyx-frontend/main/utils/productStyle";
import { nanoid } from "nanoid";
// import Imageloader from "./Imageloader";
// import AnimateText from "./_components/AnimateText";
// import ImageError from "./ImageError";
import classNames from "@nyx-frontend/main/utils/classNames";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";

const variants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

const brandPaintingOptions = [
  { value: "Open with Brand Canvas", label: "Open with Brand Canvas" },
  { value: "Open with Image to Video", label: "Open with Image to Video" },
];

const Imageslider = ({
  imageurl,
  hitDisLikeButton,
  hitLikeButton,
  downLoadButtonClick,
  saveButtonClicked,
  revealPromtButtonClick,
  activeIndex,
}) => {
  const [workspace, setWorkspace] = useState("");
  const [imageIndex, setImageIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const sliderRef = useRef(null);

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(currentImageIndex);
    }
  }, [currentImageIndex]);

  useEffect(() => {
    setCurrentImageIndex(imageurl.length);
  }, [imageurl.length]);

  const handleDownload = async (image) => {
    try {
      const response = await fetch(image);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = "image.png";
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  // const handleRegenerateButton = () => {
  //   regenerateButton({
  //     activeId: tabId,
  //     activeIndex: activeIndex,
  //     index: imageurl.length,
  //   });
  // };

  useEffect(() => {
    const work = localStorage.getItem("workspace_name");
    setWorkspace(work);
  }, []);

  const onChange = (option) => {
    if (option.value === "Open with Brand Canvas") {
      const imageID = nanoid();
      localStorage.setItem(imageID, imageurl[imageIndex]?.image);
      window.open(`/apphome/${workspace}/brand-canvas?imageID=${imageID}`);
    }
  };

  const handleZoomIn = (data) => {
    const imageUrl = data;
    const zoomedImage = document.createElement("img");
    zoomedImage.src = imageUrl;
    zoomedImage.style.position = "fixed";
    zoomedImage.style.top = "0";
    zoomedImage.style.left = "0";
    zoomedImage.style.width = "100%";
    zoomedImage.style.height = "100%";
    zoomedImage.style.objectFit = "contain";
    zoomedImage.style.zIndex = "9999";
    zoomedImage.style.cursor = "pointer";

    // Create remove button
    const removeButton = document.createElement("button");
    removeButton.textContent = "Close";
    removeButton.style.position = "fixed";
    removeButton.style.top = "10px";
    removeButton.style.right = "10px";
    removeButton.style.backgroundColor = "#000";
    removeButton.style.color = "#fff";
    removeButton.style.border = "none";
    removeButton.style.padding = "8px 16px";
    removeButton.style.borderRadius = "4px";
    removeButton.style.cursor = "pointer";
    removeButton.style.zIndex = "10000";

    // Function to remove zoomed image and button
    const removeZoomedImage = () => {
      document.body.removeChild(zoomedImage);
      document.body.removeChild(removeButton);
    };

    zoomedImage.addEventListener("click", removeZoomedImage);
    removeButton.addEventListener("click", removeZoomedImage);

    document.body.appendChild(zoomedImage);
    document.body.appendChild(removeButton);
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (index) => {
      setImageIndex(index);
    },
  };

  return (
    <div
      className={classNames(
        `group p-4 relative`,
        imageurl?.[imageIndex]?.isLoading ? "has-no-image" : "",
      )}
    >
      <div className=" absolute w-max bg-[#00000080] p-2 z-50 text-white rounded-md">
        <span className="font-[700] px-2">Campaign :</span>
        <span className="font-[400] px-2">{campaignName}</span>
      </div>
      <div className="w-[95%] group-[.has-no-image]:hidden bg-[#00000099] rounded-full absolute bottom-5 z-30 flex p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 justify-between h-[46px]">
        <button
          className="hover:text-[#FFC01D] text-[#FFFFFF] border border-[#FFFFFF] hover:border-[#FFC01D] rounded-full p-1 text-[14px] w-[215px] h-[37px]"
          onClick={() => revealPromtButtonClick(imageurl[imageIndex])}
        >
          Reveal Prompt
        </button>

        <div className="flex justify-center items-center p-0 h-[37px]">
          <Select
            className="rounded-full cursor-pointer hover:text-black"
            options={brandPaintingOptions}
            defaultValue={brandPaintingOptions[0]}
            styles={brandPaintingStyles}
            menuPlacement={"top"}
            components={{
              IndicatorSeparator: () => null,
            }}
            onChange={onChange}
          />
        </div>

        <div className="flex gap-1">
          <div className="relative group/button">
            <button
              className={`text-[#FFFFFF] border rounded-full p-2 focus:outline-none hover:bg-nyx-sky hover:border-nyx-sky active:bg-nyx-sky active:border-nyx-sky`}
              onClick={() => {
                downLoadButtonClick({
                  activeId: tabId,
                  activeIndex: activeIndex,
                  index: imageIndex,
                  details: imageurl[imageIndex],
                });
                handleDownload(imageurl[imageIndex].image);
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 16L7 11L8.4 9.55L11 12.15V4H13V12.15L15.6 9.55L17 11L12 16ZM6 20C5.45 20 4.97917 19.8042 4.5875 19.4125C4.19583 19.0208 4 18.55 4 18V15H6V18H18V15H20V18C20 18.55 19.8042 19.0208 19.4125 19.4125C19.0208 19.8042 18.55 20 18 20H6Z"
                  fill={
                    imageurl[currentImageIndex]?.downloadClicked
                      ? "white"
                      : "white"
                  }
                />
              </svg>
            </button>
            <div className="absolute top-[-30px] text-center text-[#FFFFFF] hidden group-hover/button:block duration-300 pointer-events-none bg-black text-xs w-max p-1 rounded-md">
              Download
            </div>
          </div>
          <div className="relative group/button">
            <button
              data-testid="regenrate"
              className="text-white border border-white rounded-full p-2 disabled:opacity-50 hover:bg-nyx-sky hover:border-nyx-sky active:bg-nyx-sky active:border-nyx-sky"
              onClick={handleRegenerateButton}
              // disabled={imageurl.length === 4}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 20C9.76667 20 7.875 19.225 6.325 17.675C4.775 16.125 4 14.2333 4 12C4 9.76667 4.775 7.875 6.325 6.325C7.875 4.775 9.76667 4 12 4C13.15 4 14.25 4.2375 15.3 4.7125C16.35 5.1875 17.25 5.86667 18 6.75V4H20V11H13V9H17.2C16.6667 8.06667 15.9375 7.33333 15.0125 6.8C14.0875 6.26667 13.0833 6 12 6C10.3333 6 8.91667 6.58333 7.75 7.75C6.58333 8.91667 6 10.3333 6 12C6 13.6667 6.58333 15.0833 7.75 16.25C8.91667 17.4167 10.3333 18 12 18C13.2833 18 14.4417 17.6333 15.475 16.9C16.5083 16.1667 17.2333 15.2 17.65 14H19.75C19.2833 15.7667 18.3333 17.2083 16.9 18.325C15.4667 19.4417 13.8333 20 12 20Z"
                  fill="white"
                />
              </svg>
            </button>
            <div className="absolute top-[-30px] text-center text-[#FFFFFF] hidden group-hover/button:block duration-300 pointer-events-none bg-black text-xs w-max p-1 rounded-md">
              Regenerate
            </div>
          </div>

          <div className="relative group/button">
            <button
              data-testid="save"
              className={` text-[#FFFFFF] border rounded-full p-2 focus:outline-none hover:bg-nyx-sky hover:border-nyx-sky active:bg-nyx-sky active:border-nyx-sky`}
              onClick={() =>
                saveButtonClicked({
                  activeId: tabId,
                  activeIndex: activeIndex,
                  index: imageIndex,
                  details: imageurl[imageIndex],
                })
              }
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 20C3.45 20 2.97917 19.8042 2.5875 19.4125C2.19583 19.0208 2 18.55 2 18V6C2 5.45 2.19583 4.97917 2.5875 4.5875C2.97917 4.19583 3.45 4 4 4H10L12 6H20C20.55 6 21.0208 6.19583 21.4125 6.5875C21.8042 6.97917 22 7.45 22 8V18C22 18.55 21.8042 19.0208 21.4125 19.4125C21.0208 19.8042 20.55 20 20 20H4ZM4 18H20V8H11.175L9.175 6H4V18Z"
                  fill={
                    imageurl[currentImageIndex]?.saveClicked ? "white" : "white"
                  }
                />
              </svg>
              <span className="sr-only">Save</span>
            </button>
            <div className="absolute top-[-30px] text-center text-[#FFFFFF] hidden group-hover/button:block duration-300 pointer-events-none bg-black text-xs w-max p-1 rounded-md">
              Save
            </div>
          </div>
          <div className="relative group/button">
            <button
              data-testid="dislike"
              className={`focus:text-black text-[#FFFFFF] border rounded-full p-2 focus:outline-none ${
                imageurl[imageIndex]?.like == 2
                  ? "bg-nyx-sky border-nyx-sky"
                  : "border-[#FFFFFF]"
              }`}
              onClick={() =>
                hitDisLikeButton({
                  activeId: tabId,
                  activeIndex: activeIndex,
                  index: imageIndex,
                  details: imageurl[imageIndex],
                })
              }
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 21 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 0H16V13L9 20L7.75 18.75C7.63333 18.6333 7.5375 18.475 7.4625 18.275C7.3875 18.075 7.35 17.8833 7.35 17.7V17.35L8.45 13H2C1.46667 13 1 12.8 0.6 12.4C0.2 12 0 11.5333 0 11V9C0 8.88333 0.0166667 8.75833 0.05 8.625C0.0833333 8.49167 0.116667 8.36667 0.15 8.25L3.15 1.2C3.3 0.866667 3.55 0.583333 3.9 0.35C4.25 0.116667 4.61667 0 5 0ZM14 2H5L2 9V11H11L9.65 16.5L14 12.15V2ZM16 13V11H19V2H16V0H21V13H16Z"
                  fill={imageurl[imageIndex]?.like == 2 ? "white" : "white"}
                />
              </svg>
              <span className="sr-only">Dislike</span>
            </button>
            <div className="absolute top-[-30px] text-center text-[#FFFFFF] hidden group-hover/button:block duration-300 pointer-events-none bg-black text-xs w-max p-1 rounded-md">
              Dislike
            </div>
          </div>
          <div className="relative group/button">
            <button
              data-testid="like"
              className={`focus:text-black text-[#FFFFFF] border rounded-full p-2 focus:outline-none ${
                imageurl[imageIndex]?.like == 1
                  ? "bg-nyx-sky border-nyx-sky"
                  : "border-[#FFFFFF]"
              }`}
              onClick={() =>
                hitLikeButton({
                  activeId: tabId,
                  activeIndex: activeIndex,
                  index: imageIndex,
                  details: imageurl[imageIndex],
                })
              }
            >
              <svg
                width="21"
                height="21"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 21.5H7V8.5L14 1.5L15.25 2.75C15.3667 2.86667 15.4625 3.025 15.5375 3.225C15.6125 3.425 15.65 3.61667 15.65 3.8V4.15L14.55 8.5H21C21.5333 8.5 22 8.7 22.4 9.1C22.8 9.5 23 9.96667 23 10.5V12.5C23 12.6167 22.9833 12.7417 22.95 12.875C22.9167 13.0083 22.8833 13.1333 22.85 13.25L19.85 20.3C19.7 20.6333 19.45 20.9167 19.1 21.15C18.75 21.3833 18.3833 21.5 18 21.5ZM9 19.5H18L21 12.5V10.5H12L13.35 5L9 9.35V19.5ZM7 8.5V10.5H4V19.5H7V21.5H2V8.5H7Z"
                  fill={imageurl[imageIndex]?.like == 1 ? "white" : "white"}
                />
                <span className="sr-only">Like</span>
              </svg>
            </button>
            <div className="absolute top-[-30px] text-center text-[#FFFFFF] hidden group-hover/button:block duration-300 pointer-events-none bg-black text-xs w-max p-1 rounded-md">
              Like
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#28134B] rounded-lg w-full relative min-h-[418px] z-0">
        <Slider {...settings} className="imageslider_css" ref={sliderRef}>
          {imageurl.map((img) => (
            <div key={img.id} className="slick-slide">
              <div>
                {/* {img.isLoading && (
                  <div>
                    <Imageloader />
                    <div className="flex justify-center items-center mt-3">
                      <AnimateText list={texts} />
                    </div>
                  </div>
                )} */}
                {/* {!img.isLoading && img.isError && (
                  <ImageError campaignName={campaignName} />
                )} */}
                {!img.isLoading && !img.isError && (
                  <img
                    loading="lazy"
                    decoding="async"
                    className="max-h-[380px] max-w-full size-auto m-auto rounded-lg cursor-pointer"
                    alt="image"
                    src={img.image}
                    onClick={() => handleZoomIn(img.image)}
                  />
                )}
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* <motion.button
        data-testid="previous"
        onClick={handlePrev}
        whileTap={{ scale: 0.95 }}
        disabled={imageurl.length === 1}
        className="absolute z-10 top-1/2 left-5 disabled:hidden bg-black bg-opacity-50 p-2 rounded-full text-white focus:outline-none border border-[#8297BD]"
      >
        <svg
          className="h-6 w-6"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"
            fill="currentColor"
          />
        </svg>
        <span className="sr-only">Previous</span>
      </motion.button> */}

      {/* <motion.button
        data-testid="next-button"
        whileTap={{ scale: 0.95 }}
        onClick={handleNext}
        disabled={imageurl.length === 1}
        className="absolute z-10 top-1/2 right-5 disabled:hidden bg-black bg-opacity-50 p-2 rounded-full text-white focus:outline-none border border-[#8297BD]"
      >
        <svg
          className="h-6 w-6"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"
            fill="currentColor"
          />
        </svg>
        <span className="sr-only">Next</span>
      </motion.button> */}
    </div>
  );
};

export default Imageslider;
