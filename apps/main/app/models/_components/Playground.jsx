/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from "react";
import { Slider, Tooltip } from "rsuite";
import "./rsuiteSlider.css";
import "rsuite/Slider/styles/index.css";
import "rsuite/RangeSlider/styles/index.css";
import { diffusionServices } from "@nyx-frontend/main/services/model";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { IMAGE_URL } from "@nyx-frontend/main/components/constants";
import DownloadIcon from "@nyx-frontend/main/components/Icons/DownloadSVGIcon";
import PlayGroundApi from "./PlayGroundApi";
import { usePathname } from "next/navigation";
import Modal from "react-modal";
import LoginPopupModel from "../logincomponents/LoginPopupModel";
import SignupPopupModel from "../logincomponents/SignupPopupModel";
import { welcomePopUpStyleLoginPopup } from "@nyx-frontend/main/utils/modalstyles";

const Playground = () => {
  const pathName = usePathname();
  const modelName = pathName.split("/").pop();
  const [RangeSliderValue, setRangeSliderValue] = useState(30);
  const [inputPromt, setInputPrompt] = useState("");
  const [outputURL, setOutputURL] = useState(
    "https://storage.googleapis.com/nyxassets-new/assets/images/model/sample/Nyx-diffusion-Maharashtra.png",
  );
  const [loading, setloading] = useState(false);
  const [inference, setInference] = useState(500);
  const [latency, setlatency] = useState(10.2);
  const [time, setTime] = useState(1.1);
  const [loginpopup, setloginpopup] = useState(false);
  const [logedin, setlogedin] = useState(false);
  const [signuppopup, setsignuppopup] = useState(false);
  const [hovered, setHovered] = useState(false);

  const mutategenerateServices = useMutation({
    mutationKey: ["image-generate"],
    mutationFn: diffusionServices,
  });

  const generateButtonClicked = () => {
    if (logedin) {
      setloading(true);
      let data = {
        generate_id: 1,
        num_inference_steps: RangeSliderValue,
        // lora_scale: 0.1,
        // image_path: "ml_models/1/",
        // image_name: "datetime.png",
        // seed: 1,
        prompt: inputPromt,
      };
      mutategenerateServices.mutate(data, {
        onSuccess: (response) => {
          console.log(response);
          setOutputURL(response?.output_url);
          setInference(response?.total_inference);
          setlatency(response?.avg_latency);
          setTime(response?.time_response.toFixed(3));
          setloading(false);
        },
        onError: (errorResponse) => {
          console.log(errorResponse);
          setloading(false);
        },
      });
    } else {
      setloginpopup(true);
    }
  };
  const handleMouseEnter = () => {
    setHovered(true);
  };
  const handleMouseLeave = () => {
    setHovered(false);
  };
  const handleDownload = async () => {
    const image = outputURL;
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
  };
  useEffect(() => {
    if (!logedin) {
      const storage = localStorage.getItem("token");
      if (storage) {
        setlogedin(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [generateButtonClicked]);

  const download_svg = (
    <svg
      width="19"
      height="19"
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_5839_11409)">
        <path
          d="M14.75 7.08984H11.75V2.58984H7.25V7.08984H4.25L9.5 12.3398L14.75 7.08984ZM4.25 13.8398V15.3398H14.75V13.8398H4.25Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_5839_11409">
          <rect
            width="18"
            height="18"
            fill="white"
            transform="translate(0.5 0.339844)"
          />
        </clipPath>
      </defs>
    </svg>
  );

  const LoginSignupSwitch = (value) => {
    if (value === "Signup") {
      setloginpopup(false);
      setsignuppopup(true);
    } else {
      setsignuppopup(false);
      setloginpopup(true);
    }
  };

  const CloseAllPopup = () => {
    setsignuppopup(false);
    setloginpopup(false);
  };

  return (
    <>
      <div
        className={
          loginpopup || signuppopup
            ? `flex flex-col mt-8 text-white w-full h-full opacity-30`
            : `flex flex-col mt-8 text-white w-full h-full`
        }
      >
        <div className="w-full h-[700px] lg:h-[700px] flex flex-col md:flex-row md:gap-2 lg:gap-0">
          {/* Prompt section starts*/}
          <div className="md:w-5/12 lg:p-5">
            <div className="flex flex-col items-center w-full h-fit bg-[#2A1B3B] rounded-md max-md:py-4 lg:p-5 border-[0.96px] border-[#8297BD]  ">
              <div
                className="w-full h-auto rounded-md p-2 lg:p-5 flex flex-col gap-5"
                style={{
                  background:
                    "linear-gradient(180deg, #2A1B3B 100%, #FFFFFF 100%)",
                }}
              >
                <div className="w-full">
                  <label
                    htmlFor="prompt"
                    className="flex mb-[12px] text-[14px] lg:text-[14px] font-semibold w-full text-white"
                  >
                    Prompt
                  </label>
                  <textarea
                    type="text"
                    id="prompt"
                    placeholder="Marathi Woman praying, wearing a saree with leaves pattern, portrait, red lips, earring."
                    className=" text-[12px] lg:text-[14px] w-full h-[123px] md:h-[150px] rounded-[4px] px-4 py-2 bg-transparent border border-[#8297BD] focus:outline-none autofill active:text-[#FFFFFF]"
                    value={inputPromt}
                    onChange={(e) => setInputPrompt(e.target.value)}
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="prompt"
                    className="flex text-[14px] lg:text-[14px] font-[600] w-full text-white"
                  >
                    Steps
                  </label>
                  <div className="w-full flex gap-5">
                    <Slider
                      progress
                      defaultValue={30}
                      value={RangeSliderValue}
                      onChange={(value) => {
                        setRangeSliderValue(value);
                      }}
                      tooltip={false}
                      className="my-4 amountOfMotion w-[90%] ml-1 model_slider "
                    />
                    <div className="flex border border-[#8297BD] w-[45px] h-[37px] justify-center items-center rounded-md">
                      {RangeSliderValue}
                    </div>
                  </div>
                </div>
              </div>
              {inputPromt === "" ? (
                <button
                  className="shadow-gray-600 bg-gray-600 border-gray-600 text-black hover:bg-gray-600 rounded-full w-11/12 h-[36px] font-medium rounded-full text-[14px] hover:shadow-none   mt-4 cursor-not-allowed"
                >Generate</button>
              ) : (
                <button
                  className={`w-11/12 h-[36px] font-medium rounded-full text-[14px] text-white 
              bg-gradient-to-r from-[#B631B1] to-[#7048D7] shadow shadow-blue-500/40 
               buttonShadowTransition mt-4  text-center hover:shadow-buttonShadow"} `}
                  onClick={generateButtonClicked}
                >
                  {loading ? "Generating..." : "Generate"}
                </button>
              )}
            </div>
          </div>
          {/* Prompt section ends*/}

          {/* Image generated section starts*/}
          <div className="md:w-7/12 md:pl-2 lg:p-5 object-contain mt-5 md:mt-0  rounded-2xl">
            {loading ? (
              <div className="w-full h-full flex mt-32 justify-center rounded-2xl">
                <div>
                  <Image
                    src={"https://assets.nyx.today/assets/images/Nyx_gif.gif"}
                    height={100}
                    width={100}
                    className="h-20 w-20"
                    alt="Nyx_gif"
                  />
                </div>
              </div>
            ) : (
              <div
                className="w-full h-full relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {hovered && (
                  <div
                    className="absolute right-4 top-2 p-2 rounded-full bg-black"
                    onClick={handleDownload}
                  >
                    <DownloadIcon className=" w-4 h-4" />
                  </div>
                )}

                <img
                  src={outputURL}
                  alt="output"
                  className="h-full w-full rounded-2xl"
                />
              </div>
            )}
          </div>
          {/* Image generated section ends*/}
        </div>
        <PlayGroundApi
          modelName={modelName}
          latency={latency}
          inference={inference}
        />
      </div>
      {loginpopup ? (
        <Modal isOpen={loginpopup} style={welcomePopUpStyleLoginPopup}>
          <LoginPopupModel
            LoginSignupSwitch={LoginSignupSwitch}
            CloseAllPopup={CloseAllPopup}
          />
        </Modal>
      ) : null}
      {signuppopup ? (
        <Modal isOpen={signuppopup} style={welcomePopUpStyleLoginPopup}>
          <SignupPopupModel
            LoginSignupSwitch={LoginSignupSwitch}
            CloseAllPopup={CloseAllPopup}
          />
        </Modal>
      ) : null}
    </>
  );
};

export default Playground;
