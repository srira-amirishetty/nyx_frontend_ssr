/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState,useEffect } from "react";
import "./rsuiteSlider.css";
import "rsuite/Slider/styles/index.css";
import "rsuite/RangeSlider/styles/index.css";
import { videoLikelihoodService } from "@nyx-frontend/main/services/model";
import { useMutation } from "@tanstack/react-query";
import { IMAGE_URL } from "@nyx-frontend/main/components/constants";
import "../../index.css";
import Loading from "./Loading";
import Link from "next/link";
import PlayGroundApi from "./PlayGroundApi";
import { usePathname } from "next/navigation";
import RadarChart from "@nyx-frontend/main/charts/RadarChart";
import Modal from "react-modal";
import LoginPopupModel from "../logincomponents/LoginPopupModel";
import SignupPopupModel from "../logincomponents/SignupPopupModel";
import { welcomePopUpStyleLoginPopup } from "@nyx-frontend/main/utils/modalstyles";

const VideoLikelihood = () => {
  const pathName = usePathname();
  const modelName = pathName.split("/").pop();
  const [RangeSliderValue, setRangeSliderValue] = useState(0);
  const [inputPromt, setInputPrompt] = useState("");
  const [outputURL, setOutputURL] = useState("");
  const [loading, setloading] = useState(false);
  const [inference, setInference] = useState(824);
  const [latency, setlatency] = useState(3.6);
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState(false);
  const [resultData, setResultData] = useState();
  const [loginpopup, setloginpopup] = useState(false);
  const [signuppopup, setsignuppopup] = useState(false);
  const [logedin, setlogedin] = useState(false);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    // Handle file selection here if needed
  };

  const mutategenerateLikelihoodServices = useMutation({
    mutationKey: ["video-generate-likelihood"],
    mutationFn: videoLikelihoodService,
  });

  const generateButtonClicked = () => {
    if (logedin) {
      setResult(false);
      setloading(true);

      const generatedId = 1;
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("Video_prediction_id", generatedId);
      mutategenerateLikelihoodServices.mutate(formData, {
        onSuccess: (response) => {
          setResultData(response);
          // setlatency(response?.average_latency)
          // setInference(response?.num_of_inferences)
          setResult(true);
          setloading(false);
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
        <div className="w-full h-auto md:h-[700px] flex flex-col md:flex-row gap-5 md:gap-0">
          {/* Prompt section starts*/}
          <div className="md:w-5/12 md:p-5">
            <div
              className="flex flex-col items-center w-full h-fit bg-[#2A1B3B] 
            rounded-md md:p-5 border-[0.96px] border-[#8297BD] "
            >
              <div
                className="w-full h-auto rounded-md p-2 md:p-5 flex flex-col gap-5"
                style={{
                  background:
                    "linear-gradient(180deg, #2A1B3B 100%, #FFFFFF 100%)",
                }}
              >
                <div className="w-full">
                  <div className="flex flex-col">
                    {selectedFile ? (
                      <div className="w-full h-[230px] mt-2">
                        <video
                          src={URL.createObjectURL(selectedFile)}
                          autoPlay
                          muted
                          preload="auto"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                          }}
                        />
                      </div>
                    ) : (
                      <div
                        className="w-full h-[230px] mt-2 rounded-md"
                        style={{
                          backgroundImage:
                            "linear-gradient(108.46deg, rgba(255, 255, 255, 0.264) 0%, rgba(255, 255, 255, 0.066) 100%)",
                        }}
                      />
                    )}
                    <input
                      id="fileInput"
                      type="file"
                      accept=".mp4"
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                    />
                    <button
                      className="w-full border border-[#B631B1] rounded-full h-[36px] mt-4"
                      onClick={() => {
                        document.getElementById("fileInput").click();
                      }}
                    >
                      + Upload video
                    </button>
                    <button
                      className="w-full h-[36px] font-medium rounded-full text-[14px] text-white 
                bg-gradient-to-r from-[#B631B1] to-[#7048D7] shadow shadow-blue-500/40 
                hover:shadow-buttonShadow buttonShadowTransition mt-4 mb-4 text-center"
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
          <div className="md:w-7/12 h-full md:p-5 object-contain">
            {result && loading == false ? (
              <div
                className=" w-full h-full flex flex-col justify-center items-center rounded-lg"
                style={{
                  backgroundImage:
                    "linear-gradient(180deg, rgba(255, 234, 234, 0.0875) 0%, rgba(236, 236, 236, 0.085) 100%)",
                }}
              >
                <div className=" border-[1px] w-32 h-32 shrink-0 grow-0 rounded-full flex justify-center items-center   border-white  text-[37px] mb-8">
                  <div>{resultData.video_likeliness.toFixed(1)}%</div>
                </div>

                {/* {resultData.hit_potential === "HIGH" && (
                  <div className=" font-bold mb-3 text-[24px]">Congrats!</div>
                )} */}
                <div className="text-[18px] lg:text-[24px] text-center">
                  Your Creative hit potential is{" "}
                  {resultData.hit_potential > 80 ? (
                    <span className="font-bold">HIGH</span>
                  ) : resultData.hit_potential > 50 &&
                    resultData.hit_potential <= 80 ? (
                    <span className="font-bold">MEDIUM</span>
                  ) : (
                    <span className="font-bold">LOW</span>
                  )}
                </div>

                <div className="border-[1px] border-t w-[70%] border-[#A19A9A96] mt-6 mb-6"></div>
                {/* {resultData.hit_potential === "HIGH" && (
                  <div className=" text-[14px] text-[#CFCFCF]">
                    Only{" "}
                    <span className="font-bold">
                      {resultData.Category_percentage}%
                    </span>{" "}
                    of creatives fall in this category
                  </div>
                )} */}
              </div>
            ) : loading && result == false ? (
              <div
                className="w-full h-full flex items-center justify-center rounded-lg"
                style={{
                  backgroundImage:
                    "linear-gradient(180deg, rgba(255, 234, 234, 0.0875) 0%, rgba(236, 236, 236, 0.085) 100%)",
                }}
              >
                <div>
                  <Loading />
                </div>
              </div>
            ) : (
              <div
                className="  w-full h-full flex flex-col justify-center items-center rounded-lg"
                style={{
                  backgroundImage:
                    "linear-gradient(180deg, rgba(255, 234, 234, 0.0875) 0%, rgba(236, 236, 236, 0.085) 100%)",
                }}
              >
                <div className=" border-[1px] w-32 h-32 shrink-0 grow-0 rounded-full flex justify-center items-center   border-white  text-[37px] mb-8">
                  <div>-- </div>
                </div>
                <div className="text-[18px] lg:text-[24px] text-center">
                  Result will appear <span className="font-bold">HERE</span>{" "}
                </div>
                <div className="border-[1px] border-t w-[70%] border-[#A19A9A96] mt-6 mb-6"></div>
              </div>
            )}
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

export default VideoLikelihood;
