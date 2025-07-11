/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";

import { CTR_PREDICTION } from "@nyx-frontend/main/utils/productConstants";
import { analysisCampaignService } from "@nyx-frontend/main/services/ctrServices";
import classNames from "@nyx-frontend/main/utils/classNames";

import ArrowIcon from "./_components/ArrowIcon";
import Button from "@nyx-frontend/main/components/Button";
import ButtonLoading from "@nyx-frontend/main/components/ButtonLoading"; // 1. IMPORT ADDED
import SelectImage from "./SelectImage";

import "@nyx-frontend/main/app/_components/toastifyTest/toastify.css";
import "react-toastify/dist/ReactToastify.css";


const UploadMedia = ({ tab, setTab, campignapidata, setImageUploaded, setCampaignID, analysImageClick, mutateAnalysisResult }) => {
  const [uploadImageProcess, setUploadImageProcess] = useState(false);
  const [driveClickedArray, setDriveClickedArray] = useState([]);
  const [notSupported, setNotSupported] = useState(false);
  const isActive = tab === CTR_PREDICTION.UPLOAD;

  const mutateUpdateAnalysisCampaign = useMutation({
    mutationKey: ["update-campaign"],
    mutationFn: analysisCampaignService,
  });

  const handleUploadImageProcess = () => {
    setUploadImageProcess(true);
  };

  const handleCloseImageModal = () => {
    setUploadImageProcess(false);
  };

  const onExpandHandler = () => {
    if (campignapidata) {
      if (tab !== CTR_PREDICTION.UPLOAD) {
        setTab(CTR_PREDICTION.UPLOAD);
      } else {
        setTab("");
      }
    } else {
      (() => {
        const error = () => {
          toast.error(
            <>
              <span className="text-white text-[16px] leading-[20px]">
                {" "}
                Bad Request!
              </span>
              <br />
              <span className="text-white text-[12px] leading-[18px] truncate2lines mt-2">
                {" "}
                Please create a campaign and click next.
              </span>
            </>,
            { autoClose: 5000 },
          );
        };

        error();
      })();
    }
  };

  const removeImage = () => {
    setDriveClickedArray([]);
  };

  const nextFromImageUpload = () => {
    setImageUploaded(true);
    const data = {
      id: campignapidata?.data?.id,
      workspace_id: campignapidata?.data?.workspace_id,
      campaign_name: campignapidata?.data?.campaign_name,
      campaign_objective: campignapidata?.data?.campaign_objective,
      tg_id: campignapidata?.data?.tg_id,
      brand_id: campignapidata?.data?.brand_id,
      ...(campignapidata?.data?.product_id && {
        product_id: campignapidata?.data?.product_id,
      }),
      file_id: driveClickedArray[0]?.file_id,
    };

    mutateUpdateAnalysisCampaign.mutate(data, {
      onSuccess: (response) => {
        setCampaignID(response.data.id)
        analysImageClick(response.data.id);
      },
      onError: (response) => {
        console.log(response);
      },
    });
  };

  return (
    <>
      <div className={classNames(`rounded-lg`, isActive ? "bg-[#332270]" : "bg-[#23145A]")}>
        <h2 className="mb-0">
          <div
            className="group relative flex w-full items-center border-0 px-5 py-4 text-left text-base cursor-pointer text-white rounded-lg"
            onClick={() => onExpandHandler()}
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            <div className="flex w-full justify-between items-center">
              <div
                className={classNames(
                  "w-[50%] md:w-full font-bold flex",
                  isActive ? "text-nyx-yellow text-xl" : "text-white text-sm",
                )}
              >
                Upload Media{" "}
              </div>
            </div>

            <span
              className={classNames(
                "ml-auto h-5 w-5 shrink-0 transition-transform duration-200 ease-in-out motion-reduce:transition-none",
                isActive ? `rotate-[-180deg] -mr-1` : `dark:fill-white`,
              )}
            >
              <ArrowIcon className="h-6 w-6" />
            </span>
          </div>
        </h2>
        <motion.div
          initial={{
            height: 0,
            opacity: 0,
          }}
          animate={{
            height: isActive ? "auto" : 0,
            opacity: 1,
          }}
          exit={{
            height: 0,
            opacity: 0,
          }}
          className="w-full overflow-hidden rounded-lg"
        >
          <div className="flex flex-col  justify-center items-center ">
            {driveClickedArray?.length > 0 ? (
              <div className=" rounded-lg relative flex justify-center items-center p-4">
                <img
                  src={driveClickedArray[0]?.file_details?.signed_image_url}
                  alt="Default Image"
                  className="w-auto h-auto max-h-[50vh]  object-contain "
                />
                <button
                  className="absolute top-5 right-5 bg-black text-white rounded-full p-1 m-2 focus:outline-none"
                  onClick={removeImage}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ) : (
              <>
                <div className="h-full w-full flex flex-col items-center justify-center px-5">
                  <div className="w-full h-[375px] rounded-lg flex justify-center  items-center bg-gradient-to-r from-gray-300/30 to-gray-500/25 mb-6">
                    <div className="flex flex-col justify-center items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="101"
                        height="101"
                        viewBox="0 0 101 101"
                        fill="none"
                      >
                        <path
                          d="M46.2943 67.332V33.0341L35.3526 43.9758L29.4609 37.8737L50.5026 16.832L71.5443 37.8737L65.6526 43.9758L54.7109 33.0341V67.332H46.2943ZM25.2526 84.1654C22.938 84.1654 20.9566 83.3412 19.3083 81.693C17.6601 80.0447 16.8359 78.0633 16.8359 75.7487V63.1237H25.2526V75.7487H75.7526V63.1237H84.1693V75.7487C84.1693 78.0633 83.3451 80.0447 81.6969 81.693C80.0486 83.3412 78.0672 84.1654 75.7526 84.1654H25.2526Z"
                          fill="white"
                        />
                      </svg>
                      <div className="text-sm text-[#FFFFFF]">
                        Drag & drop your Image here
                      </div>
                      <div className="text-sm text-[#FFFFFF] mt-4 mb-2 font-light">
                        or
                      </div>
                      <div>
                        <Button
                          className="w-[150px] shadow-sm rounded-full text-black bg-[#F1BB2E] cursor-pointer my-3 mt-2 font-semibold  disabled:cursor-not-allowed"
                          onClick={handleUploadImageProcess}
                        >
                          Upload
                        </Button>
                      </div>
                      <div className=" text-[11px] text-[#FFFFFF] mt-2 flex flex-col justify-center items-center leading-3.5 font-light">
                        <p> Supports: JPG, PNG, or WEBP</p>
                        <p> File Size Limit: 30MB</p>
                      </div>
                      {notSupported && (
                        <span className="text-[#E26971] mt-2">
                          File not Supported!
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}

            {driveClickedArray?.length > 0 ? (
              // 2. THIS ENTIRE BUTTON BLOCK IS UPDATED
              <Button
                className="rounded-full w-[109px] hover:shadow-none font-semibold mt-6 text-nyx-yellow hover:text-black py-1.5 mb-4 hover:bg-nyx-yellow disabled:bg-gray-500 disabled:cursor-not-allowed"
                onClick={nextFromImageUpload}
                disabled={mutateUpdateAnalysisCampaign.isPending}
              >
                {mutateUpdateAnalysisCampaign.isPending || mutateAnalysisResult.isPending ? (
                  <ButtonLoading />
                ) : (
                  "Analyze"
                )}
              </Button>
            ) : (
              <button className="shadow-[#8297BD] bg-[#8297BD] border-[#8297BD] text-black hover:bg-[#8297BD] rounded-full w-[109px] hover:shadow-none font-semibold py-1.5 mb-4 cursor-not-allowed">
                Analyze
              </button>
            )}
          </div>
        </motion.div>
      </div>

      {uploadImageProcess ? (
        <SelectImage
          onClose={handleCloseImageModal}
          driveClickedArray={driveClickedArray}
          setDriveClickedArray={setDriveClickedArray}
        />
      ) : null}
    </>
  );
};

export default UploadMedia;