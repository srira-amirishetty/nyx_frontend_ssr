/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from "react";
import "./rsuiteSlider.css";
import "rsuite/Slider/styles/index.css";
import "rsuite/RangeSlider/styles/index.css";
import { BgRemoveModelServices } from "@nyx-frontend/main/services/model";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import DownloadIcon from "@nyx-frontend/main/components/Icons/DownloadSVGIcon";
import { IMAGE_URL } from "@nyx-frontend/main/components/constants";
import "../../index.css";
import PlayGroundApi from "./PlayGroundApi";
import { usePathname } from "next/navigation";
import Modal from "react-modal";
import LoginPopupModel from "../logincomponents/LoginPopupModel";
import SignupPopupModel from "../logincomponents/SignupPopupModel";
import { welcomePopUpStyleLoginPopup } from "@nyx-frontend/main/utils/modalstyles";

const Bgremove = () => {
  const pathName = usePathname();
  const modelName = pathName.split("/").pop();
  const [inference, setInference] = useState(620);
  const [latency, setlatency] = useState(3.4);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loginpopup, setloginpopup] = useState(false);
  const [signuppopup, setsignuppopup] = useState(false);
  const [logedin, setlogedin] = useState(false);
  const [responseurl, setresponseurl] = useState(
    "https://storage.googleapis.com/nyxassets-new/assets/images/model/sample/bg-removefinal.png",
  );
  const [image, setImage] = useState(
    "https://storage.googleapis.com/nyxassets-new/assets/images/model/sample/bg-inside-1.png",
  );
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };
  const handleMouseLeave = () => {
    setHovered(false);
  };

  const handleDownload = async () => {
    const image = responseurl;
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

  const handleFileChange = (event) => {
    if (!event.target.files[0]) return;

    // Handle file change event
    setSelectedFile(event.target.files[0]); // You can access the selected file here
    setImage(URL.createObjectURL(event.target.files[0]));
  };

  const mutatebgremoveServices = useMutation({
    mutationKey: ["image-backgroung-remove"],
    mutationFn: BgRemoveModelServices,
  });

  const generateButtonClicked = () => {
    if (logedin) {
      const generatedId = 1;
      const formData = new FormData();
      formData.append("image_url", selectedFile); // Append the uploaded file to the FormData object
      formData.append("generate_id", generatedId);

      mutatebgremoveServices.mutate(formData, {
        onSuccess: (response) => {
          console.log(response.output_url, "url url");
          const url = response.output_url;
          setresponseurl(url);
        },
        onError: (errorResponse) => {
          console.log(errorResponse);
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
        data-id="bg-remove"
      >
        <div className="w-full h-auto md:h-auto flex flex-col md:flex-row">
          {/* Prompt section starts*/}
          <div className="md:w-5/12 md:p-5">
            <div className="flex flex-col items-center w-full h-fit bg-[#2A1B3B] rounded-md max-md:py-4 lg:p-4  border-[0.96px] border-[#8297BD] ">
              <div
                className="w-full h-auto rounded-md px-[18px] py-2  flex flex-col gap-5"
                style={{
                  background:
                    "linear-gradient(180deg, #2A1B3B 100%, #FFFFFF 100%)",
                }}
              >
                <div className="w-full">
                  <div className="flex flex-col rounded-md">
                    <div className="w-full h-[234px] mt-2 rounded-lg ">
                    <Image
                        src={image}
                        alt="Selected"
                        width={200}
                        height={200}
                        className="rounded-lg w-auto h-full mx-auto"
                      />
                    </div>
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

                    <button
                      className="w-full h-[36px] font-medium rounded-full text-[14px] text-white 
                                bg-gradient-to-r from-[#B631B1] to-[#7048D7] shadow shadow-blue-500/40 
                                hover:shadow-buttonShadow buttonShadowTransition mt-4  text-center"
                      onClick={generateButtonClicked}
                    >
                      {mutatebgremoveServices.isPending
                        ? "Generating"
                        : "Generate"}
                    </button>
                    {/* <button
                      className="w-full h-[36px] font-medium rounded-full text-[14px] text-white 
                bg-gradient-to-r from-[#B631B1] to-[#7048D7] shadow shadow-blue-500/40 
                hover:shadow-buttonShadow buttonShadowTransition mt-4 mb-4 text-center"
                      onClick={generateButtonClicked}
                    >
                      {loading ? "Generating...." : "Generate"}
                    </button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Prompt section ends*/}

          {/* Image generated section starts*/}
          <div
            className="md:w-7/12 md:p-5 object-contain "
            data-testid="image-gen"
          >
            {mutatebgremoveServices.isPending ? (
              <div className="w-full h-full flex mt-32 justify-center rouded-2xl">
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
              <div className="w-full h-full rounded-2xl relative" onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}>
                {hovered && <div
                  className="absolute right-4 top-2 p-2 rounded-full bg-black"
                  onClick={handleDownload}
                >
                  <DownloadIcon className=" w-4 h-4" />
                </div>}
                <img
                  src={responseurl}
                  style={{
                    backgroundImage: `url("https://storage.googleapis.com/nyxassets-new/assets/images/model/transparent_bg.jpg")`,
                  }}
                  alt="default"
                  className=" rounded-2xl lg:mx-auto lg:px-4 w-full h-[375px] md:h-[520.33px] 
                  lg:h-[540.33px] xl:h-[720.33px] lg:max-w-screen-lg 
                  xl:max-w-screen-xl object-contain mt-4 md:mt-0"
                />
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

export default Bgremove;
