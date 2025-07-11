"use client";
import React, { useEffect, useRef, useState } from "react";
import Button from "@nyx-frontend/main/components/Button";
import Steper from "./Steper";
import useStore from "./Store";
import Select from "react-select";
import { audienceOptions } from "@nyx-frontend/main/utils/productConstants";
import { audienceStyle } from "@nyx-frontend/main/utils/productStyle";
import { BsFileEarmarkArrowUp } from "react-icons/bs";
import Papa from "papaparse";
import Modal from "react-modal";
import {
  UploadNewAudience,
  GetAllAudience,
  CreateNewAudience,
  GetAllAudienceCustom,
  CreateLookAlikeAudience,
  GetAllAudienceLookalikegoogle,
  GetAllAudienceCustomgoogle,
} from "@nyx-frontend/main/services/admanagerServices";
import { useQuery, useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { CreatNewAudiencepopup, Audience } from "@nyx-frontend/main/utils/modalstyles";
import ButtonLoading from "@nyx-frontend/main/components/ButtonLoading";
import "@nyx-frontend/main/app/_components/toastifyTest/toastify.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AudienceLocalise = ({
  setAudiencesetpopup,
  setcreatenewone,
  setconfirmationAudience,
  setMapIteams,
  brandid,
  workspaceid,
  setSelectedOption,
  selectedOption,
  setSelectedOptionDirectUpload,
  selectedOptionDirectUpload,
  handleOptions,
  handleOptionsgooglecustom,
  brandDetailsRefetch,
}) => {
  const [uploaded, setUploaded] = useState(false);
  const [businessaccounterror, setbusinessaccounterror] = useState(false);
  const [error, seterror] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [fileName, setFileName] = useState(""); // State to hold the file name
  const fileInputRef = useRef(null);
  const data = new FormData();

  const mutateUploadfile = useMutation({
    mutationKey: ["Upload-csv"],
    mutationFn: UploadNewAudience,
  });

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileType = file.type;
      const validFileTypes = ["text/csv"];

      if (!validFileTypes.includes(fileType)) {
        alert("Please upload a valid CSV file.");
        event.target.value = null;
        setUploaded(false);
        setFileName("");
      } else {
        data.append("name", file.name);
        data.append("description", "Custom Audience");
        data.append("file", file);
        data.append("workspaceId", workspaceid);
        data.append("brandId", brandid);
        data.append("platform", selectedOptionDirectUpload);
        setisLoading(true);
        mutateUploadfile.mutate(data, {
          onSuccess: (response) => {
            setUploaded(true);
            console.log("successfull upload");
            event.target.value = null;
            setFileName(file.name);
            setisLoading(false);
            handleOptionsgooglecustom();
            handleOptions();
            brandDetailsRefetch();
          },
          onError: (res) => {
            setisLoading(false);
            event.target.value = null;
            setUploaded(false);
            if (
              res.response.data.error ===
              "FacebookRequestError: Permissions error"
            ) {
              setbusinessaccounterror(true);
              return;
            }
            (function () {
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
                      {res?.response?.data?.message}
                    </span>
                  </>,
                  { autoClose: 5000 },
                );
              };

              error(); // Invoke the error function immediately
            })();

            if (
              res.response.data.error ===
              "FacebookRequestError: Permissions error"
            ) {
              setbusinessaccounterror(true);
              return;
            }
            // seterror(true);
          },
        });
      }
    }
  };

  return (
    <>
      <div className="w-[562px] h-[510px] text-white p-[5px]">
        <div className="flex justify-between items-start cursor-pointer mb-[15px]">
          <p className="font-bold text-[20px] leading-6">Upload Audience Files</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            onClick={() => {
              setAudiencesetpopup(false);
            }}
          >
            <path
              fill="#FFFFFF"
              d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0s-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.39-.39.39-1.02 0-1.4z"
            />
          </svg>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="flex justify-center mb-[30px] w-full">
            <div className="flex gap-x-0 text-[16px] font-medium">
              <div
                onClick={() => {
                  setSelectedOptionDirectUpload("META");
                }}
                className={`${selectedOptionDirectUpload === "META" ? "text-[#FFC01D] border-b-[2px] border-[#FFC01D] hover:cursor-pointer" : "text-white border-b-[2px] border-[#8297BD80] hover:cursor-pointer"} pb-[12px] px-4`}
              >
                Audience for Meta
              </div>
              <div
                onClick={() => {
                  setSelectedOptionDirectUpload("GOOGLE");
                }}
                className={`${selectedOptionDirectUpload === "GOOGLE" ? "text-[#FFC01D] border-b-[2px] border-[#FFC01D] hover:cursor-pointer" : "text-white border-b-[2px] border-[#8297BD80] hover:cursor-pointer"} pb-[12px] px-4`}
              >
                Audience for Google
              </div>
            </div>
          </div>
          <div className="w-full h-[240px] border-2 rounded-[12px] border-dashed border-[#8297BD80] bg-[#3D1D77] flex flex-col justify-center items-center">
            {uploaded ? (
              <>
                <div className="w-[130px] h-[90px] bg-[#8297BD80] p-3 border-[2px] rounded-[10px] border-[#8297BD] flex flex-col justify-center items-center">
                  <svg
                    width="33"
                    height="40"
                    viewBox="0 0 33 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20.5 0H4.5C2.3 0 0.52 1.8 0.52 4L0.5 36C0.5 38.2 2.28 40 4.48 40H28.5C30.7 40 32.5 38.2 32.5 36V12L20.5 0ZM28.5 36H4.5V4H18.5V14H28.5V36ZM8.5 26.02L11.32 28.84L14.5 25.68V34H18.5V25.68L21.68 28.86L24.5 26.02L16.52 18L8.5 26.02Z"
                      fill="#fff"
                    />
                  </svg>
                  <p className="text-[16px] font-semibold w-[10ch] truncate mt-2 leading-5 text-[#ffffff]">
                    {fileName} {/* Display the uploaded file name */}
                  </p>
                </div>
                <div className="flex gap-2 mt-4">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.9974 0.5C4.3949 0.5 0.664062 4.23083 0.664062 8.83333C0.664062 13.4358 4.3949 17.1667 8.9974 17.1667C13.5999 17.1667 17.3307 13.4358 17.3307 8.83333C17.3307 4.23083 13.5999 0.5 8.9974 0.5ZM7.33073 13.345L3.40823 9.4225L4.58656 8.24417L7.33073 10.9883L13.4082 4.91083L14.5866 6.08917L7.33073 13.345Z"
                      fill="#47FF64"
                    />
                  </svg>

                  <p className="text-[14px] font-medium leading-5 text-[#ffffff]">
                    File uploaded Successfully!!
                  </p>
                </div>
              </>
            ) : (
              <>
                <svg width="76" height="76" viewBox="0 0 76 76" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M24.6477 20.5868C20.2636 20.2904 16.7728 22.7857 14.332 25.9197C11.8775 29.0726 10.1486 33.2494 9.19205 37.4208C8.24102 41.5896 8.00189 46.0144 8.76876 49.7196C9.51639 53.3198 11.4185 57.0223 15.4205 58.1946C19.2384 59.3129 22.6632 57.723 25.2799 55.5645C27.9021 53.4033 30.1725 50.3205 32.0031 47.3429C33.4379 45.0065 34.6638 42.6271 35.6258 40.5952C36.5878 42.6244 37.8137 45.0065 39.2457 47.3429C41.0763 50.3205 43.3467 53.4033 45.9689 55.5645C48.5857 57.723 52.0105 59.3129 55.8283 58.1946C59.8304 57.0223 61.7324 53.3198 62.4801 49.7196C63.2497 46.0144 63.0078 41.5896 62.0568 37.4208C61.1002 33.2494 59.3713 29.0699 56.9168 25.9197C54.4787 22.7857 50.988 20.2877 46.6039 20.5868C41.8377 20.9102 38.4404 24.5454 36.4696 27.2913C36.1772 27.7017 35.8958 28.1195 35.6258 28.5444C35.3551 28.1193 35.0728 27.7015 34.7792 27.2913C32.8084 24.5427 29.4138 20.9129 24.6477 20.5868ZM32.4813 34.1279C31.7035 36.0546 29.8151 40.4551 27.2919 44.5646C25.585 47.3456 23.6829 49.8409 21.7396 51.4415C19.7963 53.0449 18.2708 53.4033 16.9982 53.0314C15.9097 52.7135 14.7526 51.5224 14.1561 48.6471C13.5844 45.8796 13.7246 42.2471 14.5574 38.6011C15.393 34.9552 16.8608 31.5571 18.7024 29.1884C20.5577 26.8036 22.4653 25.8416 24.2656 25.9655C26.3711 26.1083 28.4711 27.8653 30.2797 30.3903C31.2912 31.7996 32.047 33.2251 32.4786 34.1252L32.4813 34.1279ZM38.7702 34.1279C39.5454 36.0546 41.4364 40.4551 43.9569 44.5646C45.6666 47.3456 47.5686 49.8409 49.5092 51.4415C51.4552 53.0449 52.978 53.4033 54.2534 53.0314C55.3391 52.7135 56.4963 51.5224 57.0927 48.6471C57.6672 45.8796 57.527 42.2471 56.6914 38.6011C55.8558 34.9552 54.3908 31.5571 52.5464 29.1884C50.6911 26.8036 48.7863 25.8416 46.9832 25.9655C44.8777 26.1083 42.7778 27.8653 40.9692 30.3903C40.1313 31.573 39.3958 32.8223 38.7702 34.1252V34.1279Z" fill="white"/>
                </svg>  

                <div className="flex flex-col items-center mt-4">
                  <div className="flex items-center">
                   <BsFileEarmarkArrowUp />
                    <span className="text-[14px] text-[#8297BD] ml-1 cursor-pointer">
                      Drag & Drop your file here or
                    </span>
                  </div>
                  <span className="text-[14px] text-[#FFC01D] underline cursor-pointer mt-1" onClick={handleButtonClick}>
                    Upload from device
                  </span>
                </div>

                <input
                  type="file"
                  accept=".txt, .csv"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  className="hidden"
                />
              </>
            )}
          </div>

          <div className="w-full text-left">
            <p className="text-[14px] font-medium mt-8 leading-5 text-[#8297BD]">
              Upload files only in CSV or TXT format
            </p>
            <p className="text-[14px] font-medium mt-2 leading-5 text-[#8297BD]">
              Don&apos;t have a custom audience?{" "}
              <span
                className="text-white underline cursor-pointer"
                onClick={() => {
                  setcreatenewone(true);
                  setAudiencesetpopup(false);
                }}
              >
                Create one now
              </span>
            </p>
          </div>

          <div className="flex gap-4 justify-center mt-8">
            <button
              className="rounded-full border-2 border-[#FFC01D] text-[#FFC01D] px-8 py-2 bg-transparent font-semibold hover:bg-[#FFC01D] hover:text-black transition-colors"
              onClick={() => {
                setAudiencesetpopup(false);
              }}
            >
              Cancel
            </button>
            <button
              className="rounded-full border-2 border-[#FFC01D] text-[#FFC01D] px-8 py-2 bg-transparent font-semibold hover:bg-[#FFC01D] hover:text-black transition-colors"
              onClick={() => {
                // Handle save logic here
              }}
            >
              Save
            </button>
          </div>
        </div>
      </div>
      {businessaccounterror ? (
        <Modal
          isOpen={businessaccounterror}
          style={Audience}
          // onRequestClose={()=>{setcreatenewone(false)}}
          ariaHideApp={false}
        >
          <div className="h-[150px] text-white">
            <div className="flex justify-end cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                onClick={() => {
                  setbusinessaccounterror(false);
                }}
              >
                <path
                  fill="#FFFFFF"
                  d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0s-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.39-.39.39-1.02 0-1.4z"
                />
              </svg>
            </div>
            <div className="flex flex-col justify-center items-center">
              <p className="text-[14px] font-medium mt-3 px-10 leading-5 text-[#ffffff]">
                Ask your admin to update to a Business account to create or edit
                <br></br>
                Custom Audiences from customer lists
              </p>
              <Button
                onClick={() => {
                  setbusinessaccounterror(false);
                }}
                className="text-sm font-semibold mt-4 text-[#000000] bg-[#FFCB54] rounded-full px-10 hover:shadow-none"
              >
                Close
              </Button>
            </div>
          </div>
        </Modal>
      ) : null}
      {error ? (
        <Modal
          isOpen={error}
          style={Audience}
          // onRequestClose={()=>{setcreatenewone(false)}}
          ariaHideApp={false}
        >
          <div className="h-[150px] text-white">
            <div className="flex justify-end cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                onClick={() => {
                  seterror(false);
                }}
              >
                <path
                  fill="#FFFFFF"
                  d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0s-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.39-.39.39-1.02 0-1.4z"
                />
              </svg>
            </div>
            <div className="flex flex-col justify-center items-center">
              <p className="text-[14px] font-medium mt-3 leading-5 text-[#ffffff]">
                Somthing went wrong please try again
              </p>
              <Button
                onClick={() => {
                  seterror(false);
                }}
                className="text-sm font-semibold mt-4 text-[#000000] bg-[#FFCB54] rounded-full px-10 hover:shadow-none"
              >
                Close
              </Button>
            </div>
          </div>
        </Modal>
      ) : null}
    </>
  );
};

export default AudienceLocalise;

export const Creatnew = ({
  setAudiencesetpopup,
  setcreatenewone,
  setconfirmationAudience,
  setMapIteams,
  setCsvData,
  csvData,
  setCsvfilename,
  setSelectedOption,
  selectedOption,
}) => {
  const [uploaded, setUploaded] = useState(false);
  const [fileName, setFileName] = useState(""); // State to hold the file name

  const mutateUploadfile = useMutation({
    mutationKey: ["Upload-csv"],
    mutationFn: CreateNewAudience,
  });

  const fileInputRef = useRef(null);
  const { setElement } = useStore();

  useEffect(() => {
    setElement("element2", false);
    setElement("element1", false);
    setElement("element3", false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileType = file.type;
      const validFileTypes = ["text/csv"];
      if (file) {
        Papa.parse(file, {
          complete: (result) => {
            setCsvData(result.data); // Parsed CSV data
          },
          header: true, // Optional: Treat the first row as a header row
        });
      }

      if (!validFileTypes.includes(fileType)) {
        alert("Please upload a valid CSV  file.");
        event.target.value = null;
        setUploaded(false);
        setFileName(""); // Clear the file name
      } else {
        setUploaded(true);
        setFileName(file.name); // Set the file name
        setCsvfilename(file.name);
        // console.log("File uploaded:", file);
      }
    }
  };

  const handleRemoveFile = () => {
  setUploaded(false);
  setFileName("");
  setCsvfilename("");
  setCsvData([]);
  
  // Optional: Clear the file input value if needed
  if (fileInputRef.current) {
    fileInputRef.current.value = null;
  }
};

  const nextButtonClick = () => {};

  return (
    <>
      <div className=" w-[562px] h-[490px] text-white p-[5px]">
        <div className="flex justify-between ">
          <p className="font-bold text-[16px] leading-6">Create a New List</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            onClick={() => {
              setcreatenewone(false);
            }}
            className="cursor-pointer"
          >
            <path
              fill="#FFFFFF"
              d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0s-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.39-.39.39-1.02 0-1.4z"
            />
          </svg>
        </div>
        <div className="flex flex-col justify-center items-center ">
          <Steper />
          <div className="flex flex-col h-[280px] w-[550px] items-center  rounded-[14px] border-2 border-dashed border-[#8297BD] bg-[#482D80]">
            {/* <div className="flex gap-5 mt-3">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="radioOption"
                  value="META"
                  checked={selectedOption === "META"}
                  onChange={(e) => setSelectedOption(e.target.value)}
                  className="cursor-pointer  appearance-none bg-transparent w-3 h-3 border-[2px] border-nyx-white-1 rounded-full checked:bg-nyx-yellow checked:border-nyx-white-1 focus:outline-nyx-white-1 checked:border-[2px]"
                />
                <span className="ml-2 text-[12px] font-medium leading-5 text-[#edf4ff]">
                  Audience for Meta
                </span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="radioOption"
                  value="GOOGLE"
                  checked={selectedOption === "GOOGLE"}
                  onChange={(e) => setSelectedOption(e.target.value)}
                  className="cursor-pointer  appearance-none bg-transparent w-3 h-3 border-[2px] border-nyx-white-1 rounded-full checked:bg-nyx-yellow checked:border-nyx-white-1 focus:outline-nyx-white-1 checked:border-[2px]"
                />
                <span className="ml-2 text-[12px] font-medium leading-5 text-[#edf4ff]">
                  Audience for Google
                </span>
              </label>
            </div> */}
            <div className="flex justify-between ">
              <div className="flex gap-x-0 text-[14px] text-white font-normal pt-5">
                <div
                  onClick={() => {
                    setSelectedOption("META");
                  }}
                  className={`${selectedOption === "META" ? "text-[#FFC01D]  border-b-[2px] border-nyx-yellow hover:cursor-pointer" : "hover:cursor-pointer text-white border-b-[2px] border-[#8297BD80]"} pb-[6px] px-4`}
                >
                  Audience for Meta
                </div>
                <div
                  onClick={() => {
                    setSelectedOption("GOOGLE");
                  }}
                  className={`${selectedOption === "GOOGLE" ? "text-[#FFC01D] border-b-[2px] border-nyx-yellow hover:cursor-pointer" : "hover:cursor-pointer text-white border-b-[2px] border-[#8297BD80]"} pb-[6px] px-4`}
                >
                  Audience for Google
                </div>
              </div>
            </div>
            <div className=" rounded-[12px] flex flex-col justify-center py-auto my-auto items-center">
              {uploaded ? (
                <>
                  <div className="  p-3 flex flex-col justify-center items-center">
                    <svg width="55" height="39" viewBox="0 0 55 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M16.6477 0.586831C12.2636 0.29041 8.77282 2.78573 6.33202 5.91971C3.87748 9.07255 2.14858 13.2494 1.19205 17.4208C0.241018 21.5896 0.00188524 26.0144 0.768758 29.7196C1.51639 33.3198 3.41845 37.0223 7.42048 38.1946C11.2384 39.3129 14.6632 37.723 17.2799 35.5645C19.9021 33.4033 22.1725 30.3205 24.0031 27.3429C25.4379 25.0065 26.6638 22.6271 27.6258 20.5952C28.5878 22.6244 29.8137 25.0065 31.2457 27.3429C33.0763 30.3205 35.3467 33.4033 37.9689 35.5645C40.5857 37.723 44.0105 39.3129 47.8283 38.1946C51.8304 37.0223 53.7324 33.3198 54.4801 29.7196C55.2497 26.0144 55.0078 21.5896 54.0568 17.4208C53.1002 13.2494 51.3713 9.06986 48.9168 5.91971C46.4787 2.78573 42.988 0.287715 38.6039 0.586831C33.8377 0.910199 30.4404 4.5454 28.4696 7.29133C28.1772 7.70169 27.8958 8.11952 27.6258 8.54438C27.3551 8.11933 27.0728 7.7015 26.7792 7.29133C24.8084 4.5427 21.4138 0.912894 16.6477 0.586831ZM24.4813 14.1279C23.7035 16.0546 21.8151 20.4551 19.2919 24.5646C17.585 27.3456 15.6829 29.8409 13.7396 31.4415C11.7963 33.0449 10.2708 33.4033 8.99821 33.0314C7.90974 32.7135 6.75256 31.5224 6.1561 28.6471C5.58439 25.8796 5.72457 22.2471 6.55741 18.6011C7.393 14.9552 8.86077 11.5571 10.7024 9.18843C12.5577 6.80359 14.4653 5.84156 16.2656 5.96552C18.3711 6.10834 20.4711 7.86531 22.2797 10.3903C23.2912 11.7996 24.047 13.2251 24.4786 14.1252L24.4813 14.1279ZM30.7702 14.1279C31.5454 16.0546 33.4364 20.4551 35.9569 24.5646C37.6666 27.3456 39.5686 29.8409 41.5092 31.4415C43.4552 33.0449 44.978 33.4033 46.2534 33.0314C47.3391 32.7135 48.4963 31.5224 49.0927 28.6471C49.6672 25.8796 49.527 22.2471 48.6914 18.6011C47.8558 14.9552 46.3908 11.5571 44.5464 9.18843C42.6911 6.80359 40.7863 5.84156 38.9832 5.96552C36.8777 6.10834 34.7778 7.86531 32.9692 10.3903C32.1313 11.573 31.3958 12.8223 30.7702 14.1252V14.1279Z" fill="white"/>
                    </svg>


                    <p className="text-[14px] font-semibold mt-2 leading-5 text-[#4CAF50]">
                      {fileName} {/* Display the uploaded file name */}
                    </p>
                  </div>
                  <div className="flex gap-2 mt-4" onClick={()=>{handleRemoveFile()}}>
                    <p className="text-[14px] font-medium leading-[1rem] text-[#FFCB54] border-b-2  border-[#FFCB54]">
                      Remove File
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <svg width="76" height="76" viewBox="0 0 76 76" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M24.6477 20.5868C20.2636 20.2904 16.7728 22.7857 14.332 25.9197C11.8775 29.0726 10.1486 33.2494 9.19205 37.4208C8.24102 41.5896 8.00189 46.0144 8.76876 49.7196C9.51639 53.3198 11.4185 57.0223 15.4205 58.1946C19.2384 59.3129 22.6632 57.723 25.2799 55.5645C27.9021 53.4033 30.1725 50.3205 32.0031 47.3429C33.4379 45.0065 34.6638 42.6271 35.6258 40.5952C36.5878 42.6244 37.8137 45.0065 39.2457 47.3429C41.0763 50.3205 43.3467 53.4033 45.9689 55.5645C48.5857 57.723 52.0105 59.3129 55.8283 58.1946C59.8304 57.0223 61.7324 53.3198 62.4801 49.7196C63.2497 46.0144 63.0078 41.5896 62.0568 37.4208C61.1002 33.2494 59.3713 29.0699 56.9168 25.9197C54.4787 22.7857 50.988 20.2877 46.6039 20.5868C41.8377 20.9102 38.4404 24.5454 36.4696 27.2913C36.1772 27.7017 35.8958 28.1195 35.6258 28.5444C35.3551 28.1193 35.0728 27.7015 34.7792 27.2913C32.8084 24.5427 29.4138 20.9129 24.6477 20.5868ZM32.4813 34.1279C31.7035 36.0546 29.8151 40.4551 27.2919 44.5646C25.585 47.3456 23.6829 49.8409 21.7396 51.4415C19.7963 53.0449 18.2708 53.4033 16.9982 53.0314C15.9097 52.7135 14.7526 51.5224 14.1561 48.6471C13.5844 45.8796 13.7246 42.2471 14.5574 38.6011C15.393 34.9552 16.8608 31.5571 18.7024 29.1884C20.5577 26.8036 22.4653 25.8416 24.2656 25.9655C26.3711 26.1083 28.4711 27.8653 30.2797 30.3903C31.2912 31.7996 32.047 33.2251 32.4786 34.1252L32.4813 34.1279ZM38.7702 34.1279C39.5454 36.0546 41.4364 40.4551 43.9569 44.5646C45.6666 47.3456 47.5686 49.8409 49.5092 51.4415C51.4552 53.0449 52.978 53.4033 54.2534 53.0314C55.3391 52.7135 56.4963 51.5224 57.0927 48.6471C57.6672 45.8796 57.527 42.2471 56.6914 38.6011C55.8558 34.9552 54.3908 31.5571 52.5464 29.1884C50.6911 26.8036 48.7863 25.8416 46.9832 25.9655C44.8777 26.1083 42.7778 27.8653 40.9692 30.3903C40.1313 31.573 39.3958 32.8223 38.7702 34.1252V34.1279Z" fill="#8297BD"/>
                  </svg>

                  {/* <p className="text-[14px] font-medium mt-2 leading-5 text-[#8297BD]">
                    Drag & Drop your file here
                  </p>

                  <p className="text-[14px] font-medium mt-1 leading-5 text-[#8297BD]">
                    or
                  </p> */}

                  <input
                    type="file"
                    accept=".txt, .csv"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    className="hidden"
                  />

                  <div className="flex flex-col items-center mt-4">
                  <div className="flex items-center">
                   <BsFileEarmarkArrowUp />
                    <span className="text-[14px] text-[#8297BD] ml-1 cursor-pointer">
                      Drag & Drop your file here or
                    </span>
                  </div>
                  <span className="text-[14px] text-[#FFC01D] underline cursor-pointer mt-1" onClick={handleButtonClick}>
                    Upload from device
                  </span>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="flex w-full justify-between mt-1 px-2">
            <div
              className="text-[#8297BD] flex gap-2 cursor-pointer relative group"
              // onClick={() => {
              //   setAudiencesetpopup(true);
              // }}
            >
              {uploaded ?
              <div className="flex gap-2 justify-center items-center">
                <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.33333 0C3.73083 0 0 3.73083 0 8.33333C0 12.9358 3.73083 16.6667 8.33333 16.6667C12.9358 16.6667 16.6667 12.9358 16.6667 8.33333C16.6667 3.73083 12.9358 0 8.33333 0ZM6.66667 12.845L2.74417 8.9225L3.9225 7.74417L6.66667 10.4883L12.7442 4.41083L13.9225 5.58917L6.66667 12.845Z" fill="#4CAF50"/>
                </svg>

              <p className="text-[12px]  leading-6 font-medium">
                Upload Successful
              </p></div> :
              <p className="text-[12px]  leading-6 font-medium">
                Upload files only in CSV or TXT format
              </p>}
            </div>
              
            
            <div
              className="text-[#FFCB54] flex gap-2 cursor-pointer relative group"
              // onClick={() => {
              //   setAudiencesetpopup(true);
              // }}
            >
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.5 15.5V18.5H6.5V15.5H4.5V18.5C4.5 19.6 5.4 20.5 6.5 20.5H18.5C19.6 20.5 20.5 19.6 20.5 18.5V15.5H18.5ZM17.5 11.5L16.09 10.09L13.5 12.67V4.5H11.5V12.67L8.91 10.09L7.5 11.5L12.5 16.5L17.5 11.5Z"
                  fill="#FFCB54"
                />
              </svg>

              <p className="text-[10px]  leading-6 underline font-medium">
                Download sample file
              </p>

              <div className=" absolute  bottom-[-70px] left-[-150px] hidden group-hover:block">
                <div className="flex flex-col p-1   ">
                  <a href="/sampleMeta.csv" download>
                    <div className="flex gap-2 text-white border-[1px] border-[#503193] rounded-[3px] bg-[#20133D] w-[200px] h-[46px] p-4 items-center cursor-pointer hover:bg-[#5E32FF]">
                      <svg
                        width="17"
                        height="17"
                        viewBox="0 0 17 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16.9925 8.49624C16.9925 3.80632 13.1862 0 8.49624 0C3.80632 0 0 3.80632 0 8.49624C0 12.6084 2.92271 16.0324 6.79699 16.8226V11.0451H5.09774V8.49624H6.79699V6.37218C6.79699 4.73241 8.1309 3.3985 9.77068 3.3985H11.8947V5.94737H10.1955C9.7282 5.94737 9.34586 6.3297 9.34586 6.79699V8.49624H11.8947V11.0451H9.34586V16.95C13.6365 16.5252 16.9925 12.9058 16.9925 8.49624Z"
                          fill="white"
                        />
                      </svg>

                      <p className=" font-normal leading-3 text-[12px] flex item-center ">
                        Facebook Data
                      </p>
                      <a
                        href="https://en-gb.facebook.com/business/help/2082575038703844?id=2469097953376494"
                        target="_blank"
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8.99219 5H10.9922V7H8.99219V5ZM8.99219 9H10.9922V15H8.99219V9ZM9.99219 0C4.47219 0 -0.0078125 4.48 -0.0078125 10C-0.0078125 15.52 4.47219 20 9.99219 20C15.5122 20 19.9922 15.52 19.9922 10C19.9922 4.48 15.5122 0 9.99219 0ZM9.99219 18C5.58219 18 1.99219 14.41 1.99219 10C1.99219 5.59 5.58219 2 9.99219 2C14.4022 2 17.9922 5.59 17.9922 10C17.9922 14.41 14.4022 18 9.99219 18Z"
                            fill="white"
                          />
                        </svg>
                      </a>
                    </div>
                  </a>
                  <a href="/sampleGoogle.csv" download>
                    <div className="flex gap-2 text-white border-[1px] border-[#503193] rounded-[3px] bg-[#20133D] w-[200px] h-[46px] p-4 items-center cursor-pointer hover:bg-[#5E32FF]">
                      <svg
                        width="17"
                        height="15"
                        viewBox="0 0 17 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.56755 0.38035C8.41482 0.376719 8.26119 0.383331 8.10832 0.401997C7.70006 0.451846 7.29593 0.58178 6.91927 0.799377C6.42409 1.08544 6.08177 1.51077 5.81372 1.97605L5.76733 1.94822L1.01733 9.86489L1.03898 9.87726C0.766143 10.3728 0.585938 10.9073 0.585938 11.459C0.585938 12.2287 0.838226 13.009 1.37915 13.6176C1.92007 14.2261 2.76302 14.6257 3.7526 14.6257C4.74219 14.6257 5.58513 14.2261 6.12606 13.6176C6.27921 13.4453 6.35847 13.2366 6.46623 13.0408L6.48787 13.0532L8.5026 9.69635L10.5096 13.0424C10.5106 13.044 10.5117 13.0454 10.5127 13.047C11.3835 14.5499 13.331 15.0715 14.8359 14.202C16.3427 13.3326 16.866 11.3824 15.9956 9.87571L15.991 9.86953L11.2456 1.95904C11.2447 1.95738 11.2435 1.95606 11.2425 1.95441C10.6712 0.968474 9.63663 0.405768 8.56755 0.38035ZM8.61548 1.95904C8.71663 1.96599 8.81646 1.98241 8.9139 2.00852C9.30365 2.11298 9.65331 2.36804 9.87411 2.75071L9.8772 2.7569L9.88029 2.76153L14.6241 10.6674C15.0663 11.4328 14.8096 12.3889 14.0443 12.8305C13.2788 13.2727 12.3227 13.016 11.8811 12.2507L11.878 12.2445L7.1311 4.33404C6.68883 3.56847 6.94495 2.61339 7.71094 2.17088C7.99798 2.00505 8.31204 1.9382 8.61548 1.95904ZM5.74105 5.0685C5.75109 5.08669 5.74917 5.10764 5.7596 5.12571L5.76424 5.1319L7.57951 8.15786L6.50643 9.94684C6.39172 9.7251 6.29759 9.49349 6.12606 9.30052C5.59469 8.70272 4.76749 8.31545 3.80054 8.30166L5.74105 5.0685ZM3.7526 9.87571C4.34635 9.87571 4.69091 10.0699 4.94165 10.3519C5.19239 10.634 5.33594 11.0412 5.33594 11.459C5.33594 11.8769 5.19239 12.2841 4.94165 12.5661C4.69091 12.8482 4.34635 13.0424 3.7526 13.0424C3.15885 13.0424 2.8143 12.8482 2.56356 12.5661C2.31282 12.2841 2.16927 11.8769 2.16927 11.459C2.16927 11.0524 2.31428 10.6623 2.55273 10.3813L2.57284 10.3489C2.8231 10.0703 3.16338 9.87571 3.7526 9.87571Z"
                          fill="white"
                        />
                      </svg>
                      <p className=" font-normal leading-3 text-[12px] flex item-center ">
                        Google Data
                      </p>
                      <a
                        href="https://support.google.com/google-ads/answer/7659867?sjid=7090948909390908053-AP "
                        target="_blank"
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8.99219 5H10.9922V7H8.99219V5ZM8.99219 9H10.9922V15H8.99219V9ZM9.99219 0C4.47219 0 -0.0078125 4.48 -0.0078125 10C-0.0078125 15.52 4.47219 20 9.99219 20C15.5122 20 19.9922 15.52 19.9922 10C19.9922 4.48 15.5122 0 9.99219 0ZM9.99219 18C5.58219 18 1.99219 14.41 1.99219 10C1.99219 5.59 5.58219 2 9.99219 2C14.4022 2 17.9922 5.59 17.9922 10C17.9922 14.41 14.4022 18 9.99219 18Z"
                            fill="white"
                          />
                        </svg>
                      </a>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* <p className="text-[14px] font-medium mt-3 leading-5 text-[#8297BD]">
              Upload files only in CSV format
            </p> */}
          <div className="flex gap-5  mt-6">
            <Button
              onClick={() => {
                setAudiencesetpopup(true);
                setcreatenewone(false);
              }}
              className="text-sm font-semibold mt-2  text-[#FFCB54] rounded-full px-10 hover:shadow-none"
            >
              Back
            </Button>
            <Button
              onClick={() => {
                setMapIteams(true);
                setcreatenewone(false);
              }}
              disabled={uploaded && selectedOption != "" ? false : true}
              className={
                uploaded && selectedOption != ""
                  ? `text-sm font-semibold mt-2 text-[#FFCB54]  rounded-full px-10 hover:shadow-none`
                  : `text-sm font-semibold mt-2 text-[#000000] cursor-not-allowed bg-[#8d8d8dd6] rounded-full px-10 hover:bg-[#8d8d8dd6] hover:shadow-none border-none`
              }
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export const Confirmation = ({
  setAudiencesetpopup,
  setcreatenewone,
  setconfirmationAudience,
  setMapIteams,
  csvfilename,
  csvData,
}) => {
  const { setElement } = useStore();
  useEffect(() => {
    setElement("element2", true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className="w-[562px] h-[460px] text-white p-[6px]">
        <div className="flex justify-between ">
          <p className="font-bold text-[16px] leading-6">Create a New List</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            onClick={() => {
              setconfirmationAudience(false);
            }}
            className="cursor-pointer"
          >
            <path
              fill="#FFFFFF"
              d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0s-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.39-.39.39-1.02 0-1.4z"
            />
          </svg>
        </div>
        <div className="flex flex-col justify-center items-center">
          <Steper />
          <div className="flex flex-col  items-center w-[524px] pb-[14px] rounded-[14px]">

            <div className="flex gap-2 mt-1">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.9974 0.5C4.3949 0.5 0.664062 4.23083 0.664062 8.83333C0.664062 13.4358 4.3949 17.1667 8.9974 17.1667C13.5999 17.1667 17.3307 13.4358 17.3307 8.83333C17.3307 4.23083 13.5999 0.5 8.9974 0.5ZM7.33073 13.345L3.40823 9.4225L4.58656 8.24417L7.33073 10.9883L13.4082 4.91083L14.5866 6.08917L7.33073 13.345Z"
                  fill="#47FF64"
                />
              </svg>

              <p className="text-[14px] font-medium leading-5 text-[#53D73D]">
                Your List has been successfully uploaded
              </p>
            </div>
            <div className="bg-[#482D80] border-2 border-dashed border-[#8297BD] mt-[30px] p-[16px] pb-40px] rounded-[10px] w-[550px] ">
              <div className="flex flex-col ">
                <div className="flex flex-col justify-between gap-[14px]">
                  <div>
                    <p className="text-[14px] font-semibold leading-6 mb-3">
                      Name of the List
                    </p>
                    <div className="w-full h-[40px] px-[10px]  border-[1px] text-[#8297BD] flex items-center border-[#8297BD] rounded-[5px]">
                      {csvfilename}
                    </div>
                  </div>
                  <div>
                    <p className="text-[12px] font-semibold leading-6 mb-3">
                      Number of rows
                    </p>

                    <div className="w-full h-[40px]  px-[10px] flex items-center border-[1px] text-[#8297BD] border-[#8297BD] rounded-[5px]">
                      {Object.keys(csvData).length}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Button
            onClick={() => {
              setconfirmationAudience(false);
            }}
            className="text-sm font-semibold mt-8 text-[#FFCB54]  rounded-full px-10 hover:shadow-none"
          >
            Close
          </Button>
        </div>
      </div>
    </>
  );
};

export const Mapiteams = ({
  setAudiencesetpopup,
  setcreatenewone,
  setconfirmationAudience,
  setMapIteams,
  csvDatas,
  csvfilename,
  brandid,
  workspaceid,
  setSelectedOption,
  selectedOption,
  handleOptions,
  brandDetailsRefetch,
  handleOptionsgooglecustom,
}) => {
  const [csvData, setcsvData] = useState(csvDatas[0]);
  const [dataFinal, setdataFinal] = useState(csvDatas);
  const [actionarray, setactionarray] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [businessaccounterror, setbusinessaccounterror] = useState(false);
  const [error, seterror] = useState(false);
  const [mappingState, setMappingState] = useState(true);

  const { setElement } = useStore();
  const mutateUploadfile = useMutation({
    mutationKey: ["Upload-csv"],
    mutationFn: CreateNewAudience,
  });

  useEffect(() => {
    setElement("element1", true);
    if (csvData) {
      const newActionArray = [];
      if (!csvData.madid && selectedOption === "META") {
        newActionArray.push("MadId is missing");
        setMappingState(false);
      }
      if (!csvData.phone && selectedOption === "META") {
        newActionArray.push("Phone is missing");
        setMappingState(false);
      }
      if (!csvData.email && selectedOption === "META") {
        newActionArray.push("Email is missing");
        setMappingState(false);
      }
      if (!csvData.fn && selectedOption === "META") {
        newActionArray.push("First Name is missing");
        setMappingState(false);
      }
      if (!csvData.ln && selectedOption === "META") {
        newActionArray.push("Last Name is missing");
        setMappingState(false);
      }
      if (!csvData.phone && selectedOption === "META") {
        newActionArray.push("Phone is missing");
        setMappingState(false);
      }
      if (!csvData.zip && selectedOption === "META") {
        newActionArray.push("Zip is missing");
        setMappingState(false);
      }
      if (!csvData.ct && selectedOption === "META") {
        newActionArray.push("CT is missing");
        setMappingState(false);
      }
      if (!csvData.st && selectedOption === "META") {
        newActionArray.push("St is missing");
        setMappingState(false);
      }
      if (!csvData.country && selectedOption === "META") {
        newActionArray.push("Country is missing");
        setMappingState(false);
      }
      if (!csvData.doby && selectedOption === "META") {
        newActionArray.push("Birth Year is missing");
        setMappingState(false);
      }
      if (!csvData.phone && selectedOption === "META") {
        newActionArray.push("Phone is missing");
        setMappingState(false);
      }
      if (!csvData.gen && selectedOption === "META") {
        newActionArray.push("Gender is missing");
        setMappingState(false);
      }
      if (!csvData.Email && selectedOption === "GOOGLE") {
        newActionArray.push("Email is missing");
        setMappingState(false);
      }
      if (!csvData["First Name"] && selectedOption === "GOOGLE") {
        newActionArray.push("First Name is missing");
        setMappingState(false);
      }
      if (!csvData["Last Name"] && selectedOption === "GOOGLE") {
        newActionArray.push("Last Name is missing");
        setMappingState(false);
      }
      if (!csvData.Country && selectedOption === "GOOGLE") {
        newActionArray.push("Country is missing");
        setMappingState(false);
      }
      if (!csvData.Zip && selectedOption === "GOOGLE") {
        newActionArray.push("Zip is missing");
        setMappingState(false);
      }
      if (!csvData.Phone && selectedOption === "GOOGLE") {
        newActionArray.push("Phone is missing");
        setMappingState(false);
      }
      setactionarray(newActionArray);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [csvData]);

  //console.log("csvdatasssss", data);
  const nextButtonClick = () => {
    //console.log(typeof(data), "datasets");
    csvDatas.pop();
    const data = {
      data: csvDatas,
      name: csvfilename,
      description: "Created Custome Audience",
      workspaceId: workspaceid,
      brandId: brandid.toString(),
      platform: selectedOption,
    };
    setisLoading(true);
    //console.log("datatsta",data)
    mutateUploadfile.mutate(data, {
      onSuccess: (response) => {
        setMapIteams(false);
        setconfirmationAudience(true);
        console.log("successfull upload");
        setisLoading(false);
        handleOptionsgooglecustom();
        handleOptions();
        brandDetailsRefetch();
      },
      onError: (res) => {
        setisLoading(false);
        console.log("ssssssssssss", res);
        if (
          res.response.data.error === "FacebookRequestError: Permissions error"
        ) {
          setbusinessaccounterror(true);
          return;
        }
        (function () {
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
                  {res?.response?.data?.message}
                </span>
              </>,
              { autoClose: 5000 },
            );
          };

          error(); // Invoke the error function immediately
        })();
      },
    });
  };
  return (
    <>
      <div className="w-[562px] h-[610px] text-white p-[6px]">
        <div className="flex justify-between ">
          <p className="font-bold text-[16px] leading-6">Create a New List</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            onClick={() => {
              setMapIteams(false);
            }}
            className="cursor-pointer"
          >
            <path
              fill="#FFFFFF"
              d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0s-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.39-.39.39-1.02 0-1.4z"
            />
          </svg>
        </div>
        <div className="flex flex-col justify-center items-center">
          <Steper />
          <div className="flex flex-col items-center w-[524px] bg-[#482D80] border-2 border-dashed border-[#8297BD] h-[440px] rounded-[14px]">
            <p className="font-bold text-[16px] mt-4 leading-6 curs">
              Map Items
            </p>

            <div className="flex w-full justify-center  mt-[14px] gap-x-0 px-2">
              <div
                // className={` w-[171px] flex gap-x-2 cursor-pointer items-center justify-center py-3 rounded-lg text-[16px]  border-[1px] border-nyx-yellow ${mappingState ? " bg-nyx-new-blue" : " "}`}
                className={`${mappingState ? "text-[#FFC01D] border-b-[2px] border-[#FFC01D] hover:cursor-pointer" : "text-white border-b-[2px] border-[#8297BD80] hover:cursor-pointer"} pb-[12px] px-8`}
                onClick={() => setMappingState(true)}
              >
                Mapped
              </div>
              <div
                // className={`w-fit gap-x-2 flex cursor-pointer  px-2  items-center justify-center py-3 rounded-lg text-[16px]  border-[1px] border-nyx-yellow ${!mappingState ? " bg-nyx-new-blue" : " "} `}
                className={`${!mappingState ? "text-[#FFC01D] border-b-[2px] border-[#FFC01D] hover:cursor-pointer" : "text-white border-b-[2px] border-[#8297BD80] hover:cursor-pointer"} pb-[12px] px-4`}
                onClick={() => setMappingState(false)}
              >
                Action Needed
              </div>
            </div>

            {/* <div className="flex justify-center mb-[30px] w-full">
            <div className="flex gap-x-0 text-[16px] font-medium">
              <div
                onClick={() => setMappingState(true)}
                className={`${selectedOptionDirectUpload === "META" ? "text-[#FFC01D] border-b-[2px] border-[#FFC01D] hover:cursor-pointer" : "text-white border-b-[2px] border-[#8297BD80] hover:cursor-pointer"} pb-[12px] px-4`}
              >
                Mapped
              </div>
              <div
                onClick={() => setMappingState(false)}
                className={`${selectedOptionDirectUpload === "GOOGLE" ? "text-[#FFC01D] border-b-[2px] border-[#FFC01D] hover:cursor-pointer" : "text-white border-b-[2px] border-[#8297BD80] hover:cursor-pointer"} pb-[12px] px-4`}
              >
                Action Needed
              </div>
            </div>
          </div> */}

            {selectedOption === "META" && mappingState && (
              <div className="mt-2 h-[300px] w-full text-[#8297BD] px-[24px]  overflow-y-auto">
                <div className="w-[466px] text-[#fff] h-[46px] flex items-center  justify-start  text-[14px] font-bold">
                  Columns
                </div>

                <div className="w-full h-[40px] mb-3  text-[#8297BD]  flex items-center leading-3 justify-between  text-[14px] border-[0.25px] rounded-[2px] border-[#8297BD] px-[18px]">
                  {csvData?.email ? csvData.email : "-"}{" "}
                  <span className="text-[14px] w-[150px] text-[#8297BD] h-[30px] flex justify-center items-center  rounded-[4px] ">
                    Email
                  </span>
                </div>

                <div className="w-full h-[40px] mb-3  text-[#8297BD]  flex items-center leading-3 justify-between  text-[14px] border-[0.25px] rounded-[2px] border-[#8297BD] px-[18px]">
                  {csvData?.phone ? csvData.phone : "-"}{" "}
                  <span className="text-[14px] w-[150px] text-[#8297BD] h-[30px] flex justify-center items-center  rounded-[4px] ">
                    Phone
                  </span>
                </div>

                <div className="w-full h-[40px] mb-3  text-[#8297BD]  flex items-center leading-3 justify-between  text-[14px] border-[0.25px] rounded-[2px] border-[#8297BD] px-[18px]">
                  {csvData?.madid ? csvData.madid : "-"}
                  <span className="text-[14px] w-[150px] text-[#8297BD] h-[30px] flex justify-center items-center  rounded-[4px] ">
                    Madid
                  </span>
                </div>
                <div className="w-full h-[40px] mb-3  text-[#8297BD]  flex items-center leading-3 justify-between  text-[14px] border-[0.25px] rounded-[2px] border-[#8297BD] px-[18px]">
                  {csvData?.fn ? csvData.fn : "-"}
                  <span className="text-[14px] w-[150px] text-[#8297BD] h-[30px] flex justify-center items-center  rounded-[4px] ">
                    First Name
                  </span>
                </div>
                <div className="w-full h-[40px] mb-3  text-[#8297BD]  flex items-center leading-3 justify-between  text-[14px] border-[0.25px] rounded-[2px] border-[#8297BD] px-[18px]">
                  {csvData?.ln ? csvData.ln : "-"}
                  <span className="text-[14px] w-[150px] text-[#8297BD] h-[30px] flex justify-center items-center  rounded-[4px] ">
                    Last Name
                  </span>
                </div>
                <div className="w-full h-[40px] mb-3  text-[#8297BD]  flex items-center leading-3 justify-between  text-[14px] border-[0.25px] rounded-[2px] border-[#8297BD] px-[18px]">
                  {csvData?.ct ? csvData.ct : "-"}
                  <span className="text-[14px] w-[150px] text-[#8297BD] h-[30px] flex justify-center items-center  rounded-[4px] ">
                    CT
                  </span>
                </div>
                <div className="w-full h-[40px] mb-3  text-[#8297BD]  flex items-center leading-3 justify-between  text-[14px] border-[0.25px] rounded-[2px] border-[#8297BD] px-[18px]">
                  {csvData?.zip ? csvData.zip : "-"}
                  <span className="text-[14px] w-[150px] text-[#8297BD] h-[30px] flex justify-center items-center  rounded-[4px] ">
                    Zip Code
                  </span>
                </div>
                <div className="w-full h-[40px] mb-3  text-[#8297BD]  flex items-center leading-3 justify-between  text-[14px] border-[0.25px] rounded-[2px] border-[#8297BD] px-[18px]">
                  {csvData?.country ? csvData.country : "-"}
                  <span className="text-[14px] w-[150px] text-[#8297BD] h-[30px] flex justify-center items-center  rounded-[4px] ">
                    Country
                  </span>
                </div>

                <div className="w-full h-[40px] mb-3  text-[#8297BD]  flex items-center leading-3 justify-between  text-[14px] border-[0.25px] rounded-[2px] border-[#8297BD] px-[18px]">
                  {csvData?.doby ? csvData.doby : "-"}
                  <span className="text-[14px] w-[150px] text-[#8297BD] h-[30px] flex justify-center items-center  rounded-[4px] ">
                    Birth Year
                  </span>
                </div>
                <div className="w-full h-[40px] mb-3  text-[#8297BD]  flex items-center leading-3 justify-between  text-[14px] border-[0.25px] rounded-[2px] border-[#8297BD] px-[18px]">
                  {csvData?.gen ? csvData.gen : "-"}
                  <span className="text-[14px] w-[150px] text-[#8297BD] h-[30px] flex justify-center items-center  rounded-[4px] ">
                    Gender
                  </span>
                </div>
              </div>
            )}
            {selectedOption === "GOOGLE" && mappingState && (
              <div className="mt-2 h-[300px] w-full text-[#8297BD] px-[24px]  overflow-y-auto">
                <div className="w-[466px] text-[#fff] h-[46px]   flex items-center  justify-start  text-[14px] font-bold">
                  Columns
                </div>

                <div className="w-full h-[40px] mb-3  text-[#8297BD]  flex items-center leading-3 justify-between  text-[14px] border-[0.25px] rounded-[2px] border-[#8297BD] px-[18px]">
                  {csvData?.Email ? csvData.Email : "-"}{" "}
                  <span className="text-[14px] w-[150px] text-[#8297BD] h-[30px] flex justify-center items-center  rounded-[4px] ">
                    Email
                  </span>
                </div>

                <div className="w-full h-[40px] mb-3  text-[#8297BD]  flex items-center leading-3 justify-between  text-[14px] border-[0.25px] rounded-[2px] border-[#8297BD] px-[18px]">
                  {csvData?.Phone ? csvData.Phone : "-"}{" "}
                  <span className="text-[14px] w-[150px] text-[#8297BD] h-[30px] flex justify-center items-center  rounded-[4px] ">
                    Phone
                  </span>
                </div>

                <div className="w-full h-[40px] mb-3  text-[#8297BD]  flex items-center leading-3 justify-between  text-[14px] border-[0.25px] rounded-[2px] border-[#8297BD] px-[18px]">
                  {csvData["First Name"] ? csvData["First Name"] : "-"}
                  <span className="text-[14px] w-[150px] text-[#8297BD] h-[30px] flex justify-center items-center  rounded-[4px] ">
                    First Name
                  </span>
                </div>
                <div className="w-full h-[40px] mb-3  text-[#8297BD]  flex items-center leading-3 justify-between  text-[14px] border-[0.25px] rounded-[2px] border-[#8297BD] px-[18px]">
                  {csvData["Last Name"] ? csvData["Last Name"] : "-"}
                  <span className="text-[14px] w-[150px] text-[#8297BD] h-[30px] flex justify-center items-center  rounded-[4px] ">
                    Last Name
                  </span>
                </div>

                <div className="w-full h-[40px] mb-3  text-[#8297BD]  flex items-center leading-3 justify-between  text-[14px] border-[0.25px] rounded-[2px] border-[#8297BD] px-[18px]">
                  {csvData?.Zip ? csvData.Zip : "-"}
                  <span className="text-[14px] w-[150px] text-[#8297BD] h-[30px] flex justify-center items-center  rounded-[4px] ">
                    Zip Code
                  </span>
                </div>
                <div className="w-full h-[40px] mb-3  text-[#8297BD]  flex items-center leading-3 justify-between  text-[14px] border-[0.25px] rounded-[2px] border-[#8297BD] px-[18px]">
                  {csvData?.Country ? csvData.Country : "-"}
                  <span className="text-[14px] w-[150px] text-[#8297BD] h-[30px] flex justify-center items-center  rounded-[4px] ">
                    Country
                  </span>
                </div>
              </div>
            )}
            {!mappingState && (
              <div className="mt-2 h-[320px] w-full text-[#8297BD] px-[24px]  overflow-y-auto">
                {actionarray?.length > 0 ? (
                  <div className="w-[466px] text-[#fff] h-[46px]   flex items-center  justify-start  text-[14px] font-bold">
                    Columns
                  </div>
                ) : (
                  <div className="w-[466px] text-[#fff] h-[46px]   flex items-center  justify-center  text-[14px] font-bold">
                    No Action needed
                  </div>
                )}
                <div className="mt-2 h-[320px] w-full  overflow-y-auto">
                  {actionarray.map((item, index) => {
                    return (
                      <>
                        <div
                          key={index}
                          className="w-full h-[40px] mb-3  text-[#8297BD]  flex items-center leading-3 justify-between  text-[14px] border-[0.25px] rounded-[2px] border-[#8297BD] px-[18px]"
                        >
                          {item}
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
          <div className="flex gap-5 mt-4">
            <Button
              onClick={() => {
                setMapIteams(false);
                setcreatenewone(true);
              }}
              className="text-sm font-semibold mt-2  text-[#FFCB54] rounded-full px-10 hover:shadow-none"
            >
              Back
            </Button>
            <Button
              onClick={nextButtonClick}
              className="text-sm font-semibold mt-2 text-[#FFCB54] rounded-full px-10 hover:shadow-none"
            >
              {isLoading ? <ButtonLoading /> : "Next"}
            </Button>
          </div>
        </div>
      </div>
      {businessaccounterror ? (
        <Modal
          isOpen={businessaccounterror}
          style={Audience}
          // onRequestClose={()=>{setcreatenewone(false)}}
          ariaHideApp={false}
        >
          <div className="h-[150px]  text-white">
            <div className="flex justify-end cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                onClick={() => {
                  setbusinessaccounterror(false);
                }}
              >
                <path
                  fill="#FFFFFF"
                  d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0s-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.39-.39.39-1.02 0-1.4z"
                />
              </svg>
            </div>
            <div className="flex flex-col justify-center items-center">
              <p className="text-[14px] font-medium mt-3 px-10 leading-5 text-[#ffffff]">
                Ask your admin to update to a Business account to create or edit
                <br></br>
                Custom Audiences from customer lists
              </p>
              <Button
                onClick={() => {
                  setbusinessaccounterror(false);
                }}
                className="text-sm font-semibold mt-4 text-[#000000] bg-[#FFCB54] rounded-full px-10 hover:shadow-none"
              >
                Close
              </Button>
            </div>
          </div>
        </Modal>
      ) : null}
      {error && (
        <Modal
          isOpen={error}
          style={Audience}
          // onRequestClose={()=>{setcreatenewone(false)}}
          ariaHideApp={false}
        >
          <div className="h-[150px] z-50 text-white">
            <div className="flex justify-end cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                onClick={() => {
                  seterror(false);
                }}
              >
                <path
                  fill="#FFFFFF"
                  d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0s-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.39-.39.39-1.02 0-1.4z"
                />
              </svg>
            </div>
            <div className="flex flex-col justify-center items-center">
              <p className="text-[14px] font-medium mt-3 leading-5 text-[#ffffff]">
                Somthing went wrong please try again
              </p>
              <Button
                onClick={() => {
                  seterror(false);
                }}
                className="text-sm font-semibold mt-4 text-[#000000] bg-[#FFCB54] rounded-full px-10 hover:shadow-none"
              >
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};
