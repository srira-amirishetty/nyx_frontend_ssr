/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from "react";
import { Slider, Tooltip } from "rsuite";
import "./rsuiteSlider.css";
import "rsuite/Slider/styles/index.css";
import "rsuite/RangeSlider/styles/index.css";
import { diffusionServices,InPaintingModelServices,InPaintingTaskId } from "@nyx-frontend/main/services/model";
import { useMutation } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import Image from "next/image";
import PlayGroundApi from "./PlayGroundApi";
import { IMAGE_URL } from "@nyx-frontend/main/components/constants";
import Modal from "react-modal";
import LoginPopupModel from "../logincomponents/LoginPopupModel";
import SignupPopupModel from "../logincomponents/SignupPopupModel";
import { welcomePopUpStyleLoginPopup } from "@nyx-frontend/main/utils/modalstyles";

const InPaintingPlayGround = () => {
  const [RangeSliderValue, setRangeSliderValue] = useState(0);
  const pathName = usePathname();
  const modelName = pathName.split("/").pop();
  const [inputPromt, setInputPrompt] = useState("");
  const [outputURL, setOutputURL] = useState("");
  const [loading, setloading] = useState(false);
  const [inference, setInference] = useState(500);
  const [latency, setlatency] = useState(10.2);
  const [time, setTime] = useState(1.1);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFilemain, setSelectedFilemain] = useState(null);
  const [loginpopup, setloginpopup] = useState(false);
  const [logedin, setlogedin] = useState(false);
  const [signuppopup, setsignuppopup] = useState(false);


  const blobToFile = (blob, fileName) => {
    return new File([blob], fileName, { type: blob.type });
  };

  const handleFileChange = (e) => {
    setSelectedFile(URL.createObjectURL(e.target.files[0]));
    const blob =URL.createObjectURL(e.target.files[0])
   // console.log(selectedFile)
    const file = blobToFile(blob, 'example.txt');
    if(file){
      setSelectedFilemain(file)
    }
    console.log(file,"file")
    // Handle file selection here if needed
  };

  const mutategenerateServices = useMutation({
    mutationKey: ["image-generate"],
    mutationFn: InPaintingModelServices,
  });
  const mutateTaskidServices = useMutation({
    mutationKey: ["image-generate"],
    mutationFn: InPaintingTaskId,
  });

  const generateButtonClicked = () => {
    if (logedin) {
      setloading(true);
      const formData = new FormData();
      formData.append('image_file', selectedFilemain);
      formData.append('edit_prompt', inputPromt);
      formData.append('generate_id', 1);
      mutategenerateServices.mutate(formData, {
        onSuccess: (response) => {
          const task =response.task_id
          mutateTaskidServices.mutate(task, {
            onSuccess: (response) => {
              console.log(response);
              setloading(false);
            },
            onError: (errorResponse) => {
              console.log(errorResponse);
              setloading(false);
            },
          });
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

  useEffect(() => {
    if (!logedin) {
      const storage = localStorage.getItem("token");
      if (storage) {
        setlogedin(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [generateButtonClicked]);

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
      <div className="flex flex-col mt-8 text-white w-full h-full">
        <div className="w-full h-auto md:h-auto flex flex-col md:flex-row">
          {/* Prompt section starts*/}
          <div className="md:w-5/12 md:p-5">
            <div className="flex flex-col items-center w-full h-fit bg-[#2A1B3B] rounded-md max-md:py-4 lg:p-4  border-[0.96px] border-[#8297BD]">
              <div
                className="w-full h-auto rounded-md px-[18px] py-2  flex flex-col gap-5"
                style={{
                  background:
                    "linear-gradient(180deg, #2A1B3B 100%, #FFFFFF 100%)",
                }}
              >
                <div className="w-full">
                  <div className="flex flex-col rounded-md">
                    {selectedFile ? (
                      <div className="w-full h-[230px] mt-2 rounded-lg">
                        <Image
                          src={selectedFile}
                          alt="Selected"
                          width={200}
                          height={200}
                          className="rounded-lg w-auto h-full mx-auto"
                        />
                      </div>
                    ) : (
                      <div
                        className="w-full h-[230px] mt-2 "
                        style={{
                          background:
                            "linear-gradient(180deg, rgba(255, 255, 255, 0.09) 0%, rgba(255, 255, 255, 0.09) 100%)",
                        }}
                      />
                    )}
                    {/* <input
                      id="fileInput"
                      type="file"
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                    />
                    <button
                      className="w-full border border-[#B631B1] rounded-full h-[36px] mt-4"
                      onClick={() => {
                        document.getElementById("fileInput").click();
                      }}
                    >
                      + Upload
                    </button> */}
                    <label className="block  mt-4 p-[1.5px] cursor-pointer  bg-gradient-to-r from-[#B631B1] to-[#7048D7] bg-clip-border rounded-full">
                      <input
                        id="fileInput"
                        type="file"
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                      />
                      <span className="w-full flex justify-center items-center bg-[#2A1B3B]  rounded-full h-[36px]">
                        + Upload Image
                      </span>
                    </label>
                  </div>
                </div>
                <div className="w-full">
                  <label
                    htmlFor="prompt"
                    className="flex mb-[12px] text-[14px] lg:text-[14px] font-semibold w-full text-white"
                  >
                    Object to Select
                  </label>
                  <textarea
                    type="text"
                    id="prompt"
                    placeholder="cyborg in a battlefield, explosions, highly detailed"
                    className=" text-[12px] lg:text-[14px] w-full h-[123px] md:h-[150px] rounded-[4px] px-4 py-2 bg-transparent border border-[#8297BD] focus:outline-none autofill active:text-[#FFFFFF]"
                    value={inputPromt}
                    onChange={(e) => setInputPrompt(e.target.value)}
                  />
                </div>
              </div>
              <button
                className="w-full h-[36px] font-medium rounded-full text-[14px] text-white 
                                bg-gradient-to-r from-[#B631B1] to-[#7048D7] shadow shadow-blue-500/40 
                                hover:shadow-buttonShadow buttonShadowTransition mt-4  text-center"
                onClick={generateButtonClicked}
              >
                {loading ? "Generating..." : "Generate"}
              </button>
            </div>
          </div>
          {/* Prompt section ends*/}

          {/* Image generated section starts*/}
          <div className="md:w-7/12 md:p-5 object-contain">
            {outputURL.length > 0 ? (
              <div
                className=" rounded-2xl lg:mx-auto lg:px-4 w-full h-[375px] md:h-[520.33px] 
                  lg:h-[540.33px] xl:h-[720.33px] lg:max-w-screen-lg 
                  xl:max-w-screen-xl object-contain mt-4 md:mt-0"
              >
                <Image
                  src={outputURL}
                  alt="output"
                  className="h-full w-full rounded-md"
                />
              </div>
            ) : (
              <div className="w-full h-full">
                <img
                  //src="https://storage.googleapis.com/nyxassets-new/assets/images/model/diffusion_default.png"
                  // src={`https://storage.googleapis.com/nyxassets-new/assets/images/model/bg-remove.png `}
                  src={`${IMAGE_URL}/assets/images/model/sample/inpainting-model.png`}
                  alt="default"
                  className="lg:mx-auto lg:px-4 w-full h-[375px] md:h-[390.33px] 
                  lg:h-[540.33px] xl:h-[640.33px] lg:max-w-screen-lg 
                  xl:max-w-screen-xl object-fill mt-4 md:mt-0"
                />
              </div>
            )}
            {outputURL.length > 0 ? (
              <div className="my-3 text-[12px]">
                Generated in <span>{time}</span> s
              </div>
            ) : null}
          </div>
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

export default InPaintingPlayGround;
