/* eslint-disable @next/next/no-img-element */
"use client";
import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { nanoid } from "nanoid";
import Imageloader from "./Imageloader";
import ImageError from "./ImageError";
import Button from "@nyx-frontend/main/components/Button";
import classNames from "@nyx-frontend/main/utils/classNames";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";

// eslint-disable-next-line react/display-name
const Imageslider = forwardRef(
  (
    {
      imageurl,
      regenerateButton,
      hitDisLikeButton,
      hitLikeButton,
      details,
      downLoadButtonClick,
      saveButtonClicked,
      revealPromtButtonClick,
      campaignName,
      tabId,
      activeIndex,
      analysisButtonClicked,
      generatEhancedImage,
      handleCheckboxChange,
      handleStopGeneration,
    },
    ref
  ) => {
    const [workspace, setWorkspace] = useState("");
    const [imageIndex, setImageIndex] = useState(0);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [showMenu, setShowMenu] = useState(false);
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

    const handleRegenerateButton = () => {
      regenerateButton({
        activeId: tabId,
        activeIndex: activeIndex,
        index: imageurl.length,
      });
    };

    useEffect(() => {
      const work = localStorage.getItem("workspace_name");
      setWorkspace(work);
    }, []);

    // This function will handle the button click
    const handleEditWithBrandCanvas = () => {
      const imageID = nanoid();
      localStorage.setItem(imageID, imageurl[imageIndex]?.image);
      window.open(
        `/apphome/${workspace}/brand-canvas?imageID=${imageID}&platform=text-to-image`
      );
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

    const afterChange = (index) => {
      setImageIndex(index);
      setShowMenu(false);
    };

    // Expose the `afterChange` function to the parent using `useImperativeHandle`
    useImperativeHandle(ref, () => ({
      triggerAfterChange: (index) => afterChange(index),
    }));

    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      afterChange,
    };

    function calculateAverage(result) {
      // Extract feature similarity data
      const featureSimilarityData = Object.values(result || {}).map(
        (values) => values.feature_similarity
      );

      // Calculate the average
      const featureSimilarityAverage =
        featureSimilarityData.length > 0
          ? featureSimilarityData.reduce((sum, val) => sum + val, 0) /
            featureSimilarityData.length
          : 0;

      // Determine the conversion potential based on average
      if (featureSimilarityAverage < 0.4) {
        return "Low";
      } else if (
        featureSimilarityAverage >= 0.4 &&
        featureSimilarityAverage < 0.7
      ) {
        return "Medium";
      } else {
        return "High";
      }
    }
    function formatString(str) {
      return str
        .replace(/_/g, " ") // Replace underscores with spaces
        .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize the first letter of each word
    }

    return (
      <div
        className={classNames(
          `group relative`,
          imageurl?.[imageIndex]?.isLoading ? "has-no-image" : ""
        )}
      >
        <div className="w-full group-[.has-no-image]:hidden bg-[#23145A] rounded-lg absolute bottom-0 z-30 flex px-2 py-3 justify-between">
          {imageurl?.[imageIndex]?.isError == false ? (
            <button
              className="text-[#FFC01D] border border-[#FFC01D] rounded-full p-1 text-[14px] w-[215px] h-[37px]"
              onClick={() => revealPromtButtonClick(imageurl[imageIndex])}
            >
              Reveal Prompt
            </button>
          ) : (
            <button className="text-[#000000] border border-[#8297BD] bg-[#8297BD] rounded-full p-1 text-[14px] w-[215px] h-[37px] cursor-not-allowed">
              Reveal Prompt
            </button>
          )}

          {/* This block is now a simple button with the corrected styling */}
          {imageurl?.[imageIndex]?.isError == false ? (
            <button
              className="bg-[#23145A] text-white border border-[#FFC01D] rounded-full p-1 text-[14px] w-[215px] h-[37px]"
              onClick={handleEditWithBrandCanvas}
            >
              Edit with Brand Canvas
            </button>
          ) : (
            <button className="text-[#000000] border border-[#8297BD] bg-[#8297BD] rounded-full p-1 text-[14px] w-[215px] h-[37px] cursor-not-allowed">
              Edit with Brand Canvas
            </button>
          )}

          <div className="flex gap-1">
            {imageurl?.[imageIndex]?.isError == false ? (
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
            ) : (
              <button
                className={`rounded-full p-2 bg-[#8297BD] cursor-not-allowed`}
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
                    fill="black"
                  />
                </svg>
              </button>
            )}

            <div className="relative group/button">
              <button
                data-testid="regenrate"
                className="text-white border border-white rounded-full p-2 disabled:opacity-50 hover:bg-nyx-sky hover:border-nyx-sky active:bg-nyx-sky active:border-nyx-sky"
                onClick={handleRegenerateButton}
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

            {imageurl?.[imageIndex]?.isError == false ? (
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
                        imageurl[currentImageIndex]?.saveClicked
                          ? "white"
                          : "white"
                      }
                    />
                  </svg>
                  <span className="sr-only">Save</span>
                </button>
                <div className="absolute top-[-30px] text-center text-[#FFFFFF] hidden group-hover/button:block duration-300 pointer-events-none bg-black text-xs w-max p-1 rounded-md">
                  Save
                </div>
              </div>
            ) : (
              <button
                className={`rounded-full p-2 bg-[#8297BD] cursor-not-allowed`}
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
                    fill="black"
                  />
                </svg>
              </button>
            )}

            {imageurl?.[imageIndex]?.isError == false ? (
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
            ) : (
              <button
                className={`rounded-full p-2 bg-[#8297BD] cursor-not-allowed`}
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
                    fill="black"
                  />
                </svg>
              </button>
            )}

            {imageurl?.[imageIndex]?.isError == false ? (
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
            ) : (
              <button
                className={`rounded-full p-2 bg-[#8297BD] cursor-not-allowed`}
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
                    fill="black"
                  />
                  <span className="sr-only">Like</span>
                </svg>
              </button>
            )}
          </div>
        </div>

        {imageurl?.[imageIndex]?.isError == false &&
          imageurl?.[imageIndex]?.isLoading == false && (
            <div className="bg-[#23145A] w-full rounded-md absolute top-0 z-[30] p-3 group-[.has-no-image]:hidden">
              {imageurl[imageIndex]?.result == undefined &&
                imageurl[imageIndex]?.enhanced == false && (
                  <button
                    className="text-[#FFC01D] border border-[#FFC01D] rounded-full p-1 text-[14px] w-[200px] h-[37px]"
                    onClick={() =>
                      analysisButtonClicked({
                        activeId: tabId,
                        activeIndex: activeIndex,
                        index: imageIndex,
                        details: imageurl[imageIndex],
                      })
                    }
                  >
                    {imageurl[imageIndex]?.analysisLoading ? (
                      <svg
                        width="24"
                        height="25"
                        className="inline text-gray-200 text-center animate-spin dark:text-transparent"
                        viewBox="0 0 24 25"
                        fill="#FFC01D"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M12 22.5C10.6333 22.5 9.34167 22.2375 8.125 21.7125C6.90833 21.1875 5.84583 20.4708 4.9375 19.5625C4.02917 18.6542 3.3125 17.5917 2.7875 16.375C2.2625 15.1583 2 13.8667 2 12.5C2 11.1167 2.2625 9.82083 2.7875 8.6125C3.3125 7.40417 4.02917 6.34583 4.9375 5.4375C5.84583 4.52917 6.90833 3.8125 8.125 3.2875C9.34167 2.7625 10.6333 2.5 12 2.5C12.2833 2.5 12.5208 2.59583 12.7125 2.7875C12.9042 2.97917 13 3.21667 13 3.5C13 3.78333 12.9042 4.02083 12.7125 4.2125C12.5208 4.40417 12.2833 4.5 12 4.5C9.78333 4.5 7.89583 5.27917 6.3375 6.8375C4.77917 8.39583 4 10.2833 4 12.5C4 14.7167 4.77917 16.6042 6.3375 18.1625C7.89583 19.7208 9.78333 20.5 12 20.5C14.2167 20.5 16.1042 19.7208 17.6625 18.1625C19.2208 16.6042 20 14.7167 20 12.5C20 12.2167 20.0958 11.9792 20.2875 11.7875C20.4792 11.5958 20.7167 11.5 21 11.5C21.2833 11.5 21.5208 11.5958 21.7125 11.7875C21.9042 11.9792 22 12.2167 22 12.5C22 13.8667 21.7375 15.1583 21.2125 16.375C20.6875 17.5917 19.9708 18.6542 19.0625 19.5625C18.1542 20.4708 17.0958 21.1875 15.8875 21.7125C14.6792 22.2375 13.3833 22.5 12 22.5Z" />
                      </svg>
                    ) : (
                      "Predict Conversions"
                    )}{" "}
                  </button>
                )}
              {imageurl[imageIndex]?.result &&
                imageurl[imageIndex]?.enhanced == false && (
                  <div className="w-full flex">
                    <div className="w-full">
                      <div className="w-max flex gap-3 items-center bg-[#23145A] border-2 border-[#3B226F] rounded-md py-1 px-2">
                        <p className="text-base font-bold text-[#FFFFFF]">
                          Conversion Potential :
                          <span
                            style={{
                              color:
                                calculateAverage(
                                  imageurl[imageIndex]?.result
                                ) === "Low"
                                  ? "#FF0707"
                                  : calculateAverage(
                                      imageurl[imageIndex]?.result
                                    ) === "Medium"
                                  ? "#FFCB54"
                                  : "#34C011",
                            }}
                          >
                            {" "}
                            {calculateAverage(imageurl[imageIndex]?.result)}
                          </span>
                        </p>
                        {["Low", "Medium"].includes(
                          calculateAverage(imageurl[imageIndex]?.result)
                        ) && (
                          <button
                            className="text-[#FFFFFF] hover:text-nyx-yellow underline text-sm font-[400]"
                            onClick={() => setShowMenu(!showMenu)}
                          >
                            {showMenu ? "See Less" : "See More"}
                          </button>
                        )}

                        {showMenu && (
                          <div className="absolute top-16 left-3 bg-[#23145A] text-white p-3 w-[390px] rounded-2xl shadow-2xl shadow-[#1d1529]">
                            <div
                              className="w-full flex justify-end"
                              onClick={() => setShowMenu(false)}
                            >
                              <button className="w-5 h-5 text-lg text-[#FFFFFF80]">
                                x
                              </button>
                            </div>
                            <p className="text-[#FFFFFF] text-sm font-bold text-center">
                              Choose suggestions for your new image
                            </p>

                            <div className="w-full max-h-[250px] flex flex-col gap-2 overflow-hidden overflow-y-auto my-4 px-2">
                              {(() => {
                                // Get all entries
                                const allRecommendations = Object.entries(
                                  imageurl[imageIndex]?.filterResult || {}
                                );

                                // If there are no entries, display "No data found"
                                if (allRecommendations.length === 0) {
                                  return (
                                    <p className="text-white text-center">
                                      No data found
                                    </p>
                                  );
                                }

                                return (
                                  <>
                                    {allRecommendations.map(
                                      ([key, values]) => {
                                        return (
                                          <button
                                            key={key}
                                            className="bg-[#3B226F] px-3 py-4 rounded-md text-[14px] flex items-center border hover:border-[#A488C5] border-transparent cursor-pointer relative group/div"
                                            onClick={() =>
                                              handleCheckboxChange(
                                                {
                                                  target: {
                                                    checked: !imageurl[
                                                      imageIndex
                                                    ]?.checked?.includes(key),
                                                  },
                                                },
                                                key,
                                                {
                                                  activeId: tabId,
                                                  activeIndex: activeIndex,
                                                  index: imageIndex,
                                                  details:
                                                    imageurl[imageIndex],
                                                }
                                              )
                                            }
                                          >
                                            <input
                                              type="checkbox"
                                              id={`checkbox-${key}`}
                                              className="mr-2 w-[15px] h-[15px] custom-checkbox"
                                              checked={imageurl[
                                                imageIndex
                                              ]?.checked?.includes(key)}
                                              onChange={(e) =>
                                                e.stopPropagation()
                                              } // Prevent event bubbling
                                            />
                                            <div className="flex items-center w-full overflow-hidden">
                                              <div className="text-sm font-[700] whitespace-nowrap mr-1">
                                                {formatString(
                                                  values.feature_name
                                                )}{" "}
                                                -
                                              </div>
                                              <div className="text-sm font-[500] truncate">
                                                {
                                                  values.keyword_recommendation
                                                }
                                                <div className="absolute top-0 right-0 text-left text-[#FFFFFF] hidden group-hover/div:block duration-300 pointer-events-none bg-black text-sm w-max p-1 rounded-md">
                                                  {
                                                    values.keyword_recommendation
                                                  }
                                                </div>
                                              </div>
                                            </div>
                                          </button>
                                        );
                                      }
                                    )}
                                  </>
                                );
                              })()}
                            </div>
                            <div className="w-full flex justify-center">
                              <Button
                                className={classNames(
                                  "rounded-full w-[90%] font-semibold hover:shadow-none text-[14px]",
                                  imageurl[imageIndex]?.checked ==
                                    undefined ||
                                    imageurl[imageIndex]?.checked.length ==
                                      0
                                    ? "bg-gray-400 text-black cursor-not-allowed border border-gray-400 hover:bg-gray-400"
                                    : "text-nyx-yellow"
                                )}
                                onClick={() =>
                                  generatEhancedImage({
                                    activeId: tabId,
                                    activeIndex: activeIndex,
                                    index: imageurl.length,
                                    details: imageurl[imageIndex],
                                  })
                                }
                                disabled={
                                  imageurl[imageIndex]?.checked ==
                                    undefined ||
                                  imageurl[imageIndex]?.checked.length == 0
                                }
                              >
                                Generate Improved Creative
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {["Low", "Medium"].includes(
                      calculateAverage(imageurl[imageIndex]?.result)
                    ) && (
                      <Button
                        className={classNames(
                          "rounded-full w-[400px] font-semibold hover:shadow-none text-[14px]",
                          imageurl[imageIndex]?.checked == undefined ||
                            imageurl[imageIndex]?.checked.length == 0
                            ? "bg-gray-400 text-black cursor-not-allowed border border-gray-400 hover:bg-gray-400"
                            : "text-nyx-yellow"
                        )}
                        onClick={() =>
                          generatEhancedImage({
                            activeId: tabId,
                            activeIndex: activeIndex,
                            index: imageurl.length,
                            details: imageurl[imageIndex],
                          })
                        }
                        disabled={
                          imageurl[imageIndex]?.checked == undefined ||
                          imageurl[imageIndex]?.checked.length == 0
                        }
                      >
                        Generate Improved Creative
                      </Button>
                    )}
                  </div>
                )}

              {imageurl[imageIndex]?.enhanced == true && (
                <div className="w-full flex">
                  <div className="w-full">
                    <div className="w-max flex gap-3 items-center bg-[#23145A] border-2 border-[#3B226F] rounded-md py-1 px-2">
                      <p className="text-base font-bold text-[#FFFFFF]">
                        Conversion Potential :{" "}
                        <span className="text-[#34C011]">High</span>
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

        <div className="rounded-lg w-full relative h-[73vh] z-0 flex items-center scrollbar-hide">
          <Slider
            {...settings}
            className="imageslider_css  scrollbar-hide"
            ref={sliderRef}
          >
            {imageurl.map((img) => (
              <div
                key={img.id}
                className="relative !flex !flex-col !justify-center scrollbar-hide"
              >
                <div>
                  {img.isLoading && (
                    <>
                      <div className="flex flex-col justify-center items-center">
                        <Imageloader />
                      </div>

                      <div className="w-full flex items-center justify-between absolute bottom-0 py-3 bg-[#23145A]">
                        <p className="text-[#fff] text-[20px] leading-[39px] flex gap-3 items-center">
                          <svg
                            width="24"
                            height="25"
                            className="inline text-gray-200 text-center animate-spin dark:text-transparent"
                            viewBox="0 0 24 25"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12 22.5C10.6333 22.5 9.34167 22.2375 8.125 21.7125C6.90833 21.1875 5.84583 20.4708 4.9375 19.5625C4.02917 18.6542 3.3125 17.5917 2.7875 16.375C2.2625 15.1583 2 13.8667 2 12.5C2 11.1167 2.2625 9.82083 2.7875 8.6125C3.3125 7.40417 4.02917 6.34583 4.9375 5.4375C5.84583 4.52917 6.90833 3.8125 8.125 3.2875C9.34167 2.7625 10.6333 2.5 12 2.5C12.2833 2.5 12.5208 2.59583 12.7125 2.7875C12.9042 2.97917 13 3.21667 13 3.5C13 3.78333 12.9042 4.02083 12.7125 4.2125C12.5208 4.40417 12.2833 4.5 12 4.5C9.78333 4.5 7.89583 5.27917 6.3375 6.8375C4.77917 8.39583 4 10.2833 4 12.5C4 14.7167 4.77917 16.6042 6.3375 18.1625C7.89583 19.7208 9.78333 20.5 12 20.5C14.2167 20.5 16.1042 19.7208 17.6625 18.1625C19.2208 16.6042 20 14.7167 20 12.5C20 12.2167 20.0958 11.9792 20.2875 11.7875C20.4792 11.5958 20.7167 11.5 21 11.5C21.2833 11.5 21.5208 11.5958 21.7125 11.7875C21.9042 11.9792 22 12.2167 22 12.5C22 13.8667 21.7375 15.1583 21.2125 16.375C20.6875 17.5917 19.9708 18.6542 19.0625 19.5625C18.1542 20.4708 17.0958 21.1875 15.8875 21.7125C14.6792 22.2375 13.3833 22.5 12 22.5Z"
                              fill="white"
                            />
                          </svg>
                          Generating Image based on your Script
                        </p>
                        {/* <button onClick={() => handleStopGeneration()} className="text-[#FFCB54] font-semibold underline">
                          Stop Generation
                        </button> */}
                      </div>
                    </>
                  )}
                  {!img.isLoading && img.isError && (
                    <ImageError campaignName={campaignName} />
                  )}
                  {!img.isLoading && !img.isError && (
                    <img
                      loading="lazy"
                      decoding="async"
                      className="max-h-[400px] max-w-full size-auto m-auto rounded-lg cursor-pointer"
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
      </div>
    );
  }
);

export default Imageslider;