/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState,useEffect } from "react";
import "./rsuiteSlider.css";
import "rsuite/Slider/styles/index.css";
import "rsuite/RangeSlider/styles/index.css";
import { likelihoodService } from "@nyx-frontend/main/services/model";
import { useMutation } from "@tanstack/react-query";
import { IMAGE_URL } from "@nyx-frontend/main/components/constants";
import "../../index.css";
import Image from "next/image";
import PlayGroundApi from "./PlayGroundApi";
import { usePathname } from "next/navigation";
import RadarChart from "@nyx-frontend/main/charts/RadarChart";
import Modal from "react-modal";
import LoginPopupModel from "../logincomponents/LoginPopupModel";
import SignupPopupModel from "../logincomponents/SignupPopupModel";
import { welcomePopUpStyleLoginPopup } from "@nyx-frontend/main/utils/modalstyles";

const Likelihood = () => {
  const pathName = usePathname();
  const modelName = pathName.split("/").pop();
  const [loading, setloading] = useState(false);
  const [inference, setInference] = useState(824);
  const [latency, setlatency] = useState(3.6);
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState(false);
  const [resultData, setResultData] = useState();
  const [sharpness, setSharpness] = useState(100);
  const [noise, setNoise] = useState(50);
  const [focus, setFocus] = useState(50);
  const [motion, setMotion] = useState(50);
  const [flicker, setFlicker] = useState(50);
  const [loginpopup, setloginpopup] = useState(false);
  const [signuppopup, setsignuppopup] = useState(false);
  const [logedin, setlogedin] = useState(false);
  const [image, setImage] = useState(
    "https://storage.googleapis.com/nyxassets-new/assets/images/model/sample/LikeLihoodFront.jpg",
  );

  const handleFileChange = (e) => {
    if (!event.target.files[0]) return;
    setSelectedFile(e.target.files[0]);
    // Handle file selection here if needed
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const mutategenerateLikelihoodServices = useMutation({
    mutationKey: ["image-generate-likelihood"],
    mutationFn: likelihoodService,
  });

  const generateButtonClicked = () => {
    if (logedin) {
      setResult(false);
      setloading(true);

      const generatedId = 1;
      const formData = new FormData();
      formData.append("image_file", selectedFile);
      formData.append("generate_id", generatedId);
      mutategenerateLikelihoodServices.mutate(formData, {
        onSuccess: (response) => {
          setResultData(response);
          setlatency(response?.average_latency);
          setInference(response?.num_of_inferences);
          setResult(true);
          setloading(false);
          setSharpness(response?.sharpness);
          setNoise(response?.noise_level);
          setFocus(response?.focus_measure);
          setMotion(response?.motion_blur);
          setFlicker(response?.flicker);
        },
        onError: (errorResponse) => {
          console.log(errorResponse);
          setloading(false);
          setResult(false);
        },
      });
    } else {
      setloginpopup(true);
    }
  };
  const data = {
    labels: [
      "Sharpness",
      "Noise Level",
      "Focus Measure",
      "Motion Blur",
      "Flicker",
    ],
    datasets: [
      {
        data: [sharpness, noise, focus, motion, flicker],
        backgroundColor: "rgba(94,50,255,0.8)", // Optional for better visibility
        borderColor: "rgba(0, 0, 255, 0.0)", // Optional for a blue border
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      r: {
        grid: {
          circular: true,
          color: "rgba(255, 255, 255, 1)", // White grid lines with 50% opacity
        },
        beginAtZero: true,
        ticks: {
          stepSize: 20,
          display: false, // Hide ticks (optional)
        },
        pointLabels: {
          // Change the font color here
          fontColor: "#FFFFF",
        },
        angleLines: {
          color: "rgba(255,255,255,1)",
        },
        pointRadius: 0,
        max: 100,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
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
      <div
        className={
          loginpopup || signuppopup
            ? `flex flex-col mt-8 text-white w-full h-full opacity-30`
            : `flex flex-col mt-8 text-white w-full h-full`
        }
      >
        <div className="w-full h-auto  flex flex-col md:flex-row gap-5">
          {/* Prompt section starts*/}
          <div className="md:w-5/12 lg:p-5">
            <div className="flex flex-col items-center w-full h-fit bg-[#2A1B3B] md:mt-5 lg:mt-0 rounded-md max-md:py-4 p-5 lg:p-5 border-[0.96px] border-[#8297BD]  ">
              <div
                className="w-full h-auto rounded-md  flex flex-col gap-5"
                style={{
                  background:
                    "linear-gradient(180deg, #2A1B3B 100%, #FFFFFF 100%)",
                }}
              >
                <div className="w-full">
                  <div className="flex flex-col items-center">
                    <div className="w-full h-[234px] mt-2  ">
                    <Image
                        src={image}
                        alt="Selected"
                        width={200}
                        height={200}
                        className="rounded-lg w-auto h-full mx-auto"
                      />
                    </div>

                    <input
                      id="fileInput"
                      type="file"
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                    />
                    <button
                      className="w-full p-[1.5px] bg-gradient-to-r from-[#B631B1] to-[#7048D7] bg-clip-border  rounded-full  mt-2 lg:mt-4"
                      onClick={() => {
                        document.getElementById("fileInput").click();
                      }}
                    >
                      <span className="w-full flex justify-center items-center bg-[#2A1B3B]  rounded-full h-[36px]">
                        + Upload Image
                      </span>
                    </button>
                    <button
                      className="w-full h-[36px] font-medium rounded-full text-[14px] text-white 
                bg-gradient-to-r from-[#B631B1] to-[#7048D7] shadow shadow-blue-500/40 
                hover:shadow-buttonShadow buttonShadowTransition mt-4 text-center"
                      onClick={generateButtonClicked}
                    >
                      {loading ? "Predicting..." : "Predict"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Prompt section ends*/}

          {/* Image generated section starts*/}
          <div
            className=" md:w-7/12 h-fit flex flex-col lg:flex-row gap-x-5 max-lg:gap-y-4 items-center py-10 px-5 lg:p-12 object-contain mt-5 rounded-2xl"
            style={{
              backgroundImage:
                "linear-gradient(180deg, rgba(255, 234, 234, 0.0875) 0%, rgba(236, 236, 236, 0.085) 100%)",
            }}
          >
            <div className="w-full h-[610px] lg:h-[339px]">
              {result && loading == false ? (
                <div className="flex flex-col lg:flex-row gap-x-5">
                  <div className="  h-full flex flex-col justify-center items-center rounded-2xl">
                    <div className=" border-[1px] w-32 h-32 shrink-0 grow-0 rounded-full flex justify-center items-center   border-white  text-[37px] mb-8">
                      <div>{resultData.image_likelihood_percentage}%</div>
                    </div>

                    {resultData.hit_potential === "HIGH" && (
                      <div className=" font-bold mb-3 text-[24px]">
                        Congrats!
                      </div>
                    )}
                    <div className="text-[18px] lg:text-[24px] text-center">
                      Your Creative hit potential is{" "}
                      <span className="font-bold">
                        {resultData.hit_potential}
                      </span>{" "}
                    </div>

                    <div className="border-[1px] border-t w-[70%] border-[#A19A9A96] mt-6 mb-6"></div>
                    {resultData.hit_potential === "HIGH" && (
                      <div className=" text-[14px] text-[#CFCFCF] mb-4">
                        Only{" "}
                        <span className="font-bold">
                          {resultData.Category_percentage}%
                        </span>{" "}
                        of creatives fall in this category
                      </div>
                    )}
                  </div>
                  <div
                    className="  md:w-full lg:w-1/2 rounded-2xl h-[339px] flex items-center justify-center   "
                    style={{
                      backgroundImage:
                        "linear-gradient(180deg, rgba(255, 234, 234, 0.0875) 0%, rgba(236, 236, 236, 0.085) 100%)",
                    }}
                  >
                    <RadarChart data={data} options={options}></RadarChart>
                  </div>
                </div>
              ) : loading && result == false ? (
                <div className="w-full h-full flex items-center justify-center rounded-2xl">
                  <div>
                    <div>
                      <Image
                        src={
                          "https://assets.nyx.today/assets/images/Nyx_gif.gif"
                        }
                        height={100}
                        width={100}
                        className="h-20 w-20"
                        alt="Nyx_gif"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col lg:flex-row gap-x-5">
                  <div className="w-full lg:w-1/2  h-full flex flex-col justify-center items-center rounded-2xl ">
                    <div className=" border-[1px] w-32 h-32 shrink-0 grow-0 rounded-full flex justify-center items-center   border-white  text-[37px] mb-8">
                      <div>86% </div>
                    </div>
                    <div className="text-[18px] lg:text-[24px] text-center">
                      Your Creative hit potential is HIGH!
                    </div>
                    <div className="border-[1px] border-t w-[70%] border-[#A19A9A96] mt-6 mb-6"></div>
                  </div>
                  <div
                    className="md:w-full lg:w-1/2 px-0 md:px-8 lg:px-0  rounded-2xl h-[339px] flex items-center justify-center   "
                    style={{
                      backgroundImage:
                        "linear-gradient(180deg, rgba(255, 234, 234, 0.0875) 0%, rgba(236, 236, 236, 0.085) 100%)",
                    }}
                  >
                    <RadarChart data={data} options={options}></RadarChart>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* Image generated section ends*/}
        </div>

        {/* Model details section starts*/}
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

export default Likelihood;
