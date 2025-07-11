"use client";
import React, { useState, useRef } from "react";
import Modal from "react-modal";
import { uploadMetaProductCatalogStyle } from "@nyx-frontend/main/utils/modalstyles";
import "@nyx-frontend/main/app/_components/toastifyTest/toastify.css";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import Select from "react-select";
import { admanagerConversion } from "@nyx-frontend/main/utils/productStyle";
interface MetaUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitLink: (link: string) => void;
  onSubmitFile: (link: File) => void;
  buinessOption: any;
  buisnessId: any;
  setBuisnessId: any;
  metaLinkLoading: any;
  metaFileLoading: any;
}

const tabs = [
  {
    name: "Upload from sheet",
  },
  {
    name: "Upload via link",
  },
];

const MetaUploadModal: React.FC<MetaUploadModalProps> = ({
  isOpen,
  onClose,
  onSubmitLink,
  onSubmitFile,
  buinessOption,
  buisnessId,
  setBuisnessId,
  metaLinkLoading,
  metaFileLoading,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [link, setLink] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [selectedTab, setSelectedTab] = useState("Upload from sheet");

  const handleSubmitClickLink = () => {
    if (link) {
      onSubmitLink(link);
    } else {
      (function () {
        const error = () => {
          toast.warn(
            <>
              <span className="text-white text-[16px] leading-[20px]">
                {" "}
                Bad Request!
              </span>
              <br />
              <span className="text-white text-[12px] leading-[18px] truncate2lines mt-2">
                {" "}
                Please Enter Link
              </span>
            </>,
            { autoClose: 5000 },
          );
        };

        error(); // Invoke the Warning function immediately
      })();
    }
  };

  const handleSubmitClickFile = () => {
    if (file) {
      onSubmitFile(file);
    } else {
      (function () {
        const error = () => {
          toast.warn(
            <>
              <span className="text-white text-[16px] leading-[20px]">
                {" "}
                Bad Request!
              </span>
              <br />
              <span className="text-white text-[12px] leading-[18px] truncate2lines mt-2">
                {" "}
                Please Upload File
              </span>
            </>,
            { autoClose: 5000 },
          );
        };

        error();
      })();
    }
  };

  const handleTabClick = (tabName: React.SetStateAction<string>) => {
    setSelectedTab(tabName);
  };

  const handleFileButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const fileType = file.type;
      if (fileType === "text/csv" || file.name.endsWith(".csv")) {
        setFile(file);
      } else {
        setFile(null); // Clear the state for invalid file
        event.target.value = "";
      }
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      style={uploadMetaProductCatalogStyle}
      onRequestClose={onClose}
      ariaHideApp={false}
    >
      <div className="flex justify-between">
        <div className="text-base font-bold text-[#FFFFFF]">
          Upload Catalogue Meta
        </div>
        <div className="cursor-pointer" onClick={onClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path
              fill="#FFFFFF"
              d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0s-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.39-.39.39-1.02 0-1.4z"
            />
          </svg>
        </div>
      </div>

      <div className="flex gap-4 w-fit border-b-[2px] border-[#FFFFFF] border-opacity-20 pr-2">
        {tabs.map((tab) => (
          <div
            key={tab.name}
            className={`relative pb-2 cursor-pointer text-center transition-all ${
              selectedTab === tab.name ? "text-[#3B226F]" : "text-gray-500"
            }`}
            onClick={() => handleTabClick(tab.name)}
          >
            <span
              className={`${
                selectedTab === tab.name
                  ? "text-[#FFC01D] text-sm font-medium"
                  : "text-white text-sm font-medium"
              }`}
            >
              {tab.name}
            </span>
            {selectedTab === tab.name && (
              <div className="absolute bottom-[-3px] left-[-10px] w-[calc(100%+20px)] rounded-sm h-[5px] bg-[#FFD700]"></div>
            )}
          </div>
        ))}
      </div>

      {selectedTab === "Upload from sheet" && (
        <div>
          <div className="w-full bg-[#482D80] rounded-lg p-6 my-5 flex flex-col items-center gap-4">
            <div className="w-full ">
              <Select
                className="w-full text-sm md:text-base"
                placeholder="Select Catalogue"
                styles={admanagerConversion}
                options={buinessOption}
                value={buinessOption.find(
                  (option: any) => option.value === String(buisnessId),
                )}
                onChange={(selectedOption: any) => {
                  if (selectedOption) {
                    setBuisnessId(selectedOption.value);
                  }
                }}
                components={{
                  IndicatorSeparator: () => null,
                }}
              />
            </div>
            <div className="w-full flex flex-col items-center gap-2 border border-[#8297BD] p-3 rounded-md">
              <svg
                width="25"
                height="23"
                viewBox="0 0 25 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.75065 22.3341C2.94857 22.3341 2.26218 22.0569 1.69148 21.5026C1.12079 20.9482 0.834957 20.2809 0.833984 19.5008V16.6675C0.833984 16.2661 0.973985 15.9299 1.25398 15.6588C1.53398 15.3877 1.8801 15.2517 2.29232 15.2508C2.70454 15.2499 3.05114 15.3859 3.33211 15.6588C3.61308 15.9317 3.7526 16.268 3.75065 16.6675V19.5008H21.2507V16.6675C21.2507 16.2661 21.3907 15.9299 21.6707 15.6588C21.9507 15.3877 22.2968 15.2517 22.709 15.2508C23.1212 15.2499 23.4678 15.3859 23.7488 15.6588C24.0297 15.9317 24.1693 16.268 24.1673 16.6675V19.5008C24.1673 20.28 23.882 20.9472 23.3113 21.5026C22.7406 22.0579 22.0537 22.3351 21.2507 22.3341H3.75065ZM11.0423 5.12164L8.30794 7.77789C8.01628 8.06122 7.67017 8.19722 7.26961 8.18588C6.86905 8.17455 6.52246 8.02675 6.22982 7.74247C5.96246 7.45914 5.82246 7.12858 5.80982 6.7508C5.79718 6.37302 5.93718 6.04247 6.22982 5.75914L11.4798 0.659136C11.6257 0.517469 11.7836 0.417358 11.9538 0.358803C12.1239 0.300247 12.3062 0.270497 12.5007 0.269553C12.6951 0.268609 12.8774 0.298358 13.0475 0.358803C13.2177 0.419247 13.3757 0.519358 13.5215 0.659136L18.7715 5.75914C19.0632 6.04247 19.2031 6.37302 19.1915 6.7508C19.1798 7.12858 19.0398 7.45914 18.7715 7.74247C18.4798 8.0258 18.1337 8.17361 17.7332 8.18588C17.3326 8.19816 16.986 8.06216 16.6934 7.77789L13.959 5.12164V15.2508C13.959 15.6522 13.819 15.9889 13.539 16.2609C13.259 16.5329 12.9129 16.6684 12.5007 16.6675C12.0884 16.6665 11.7423 16.5305 11.4623 16.2595C11.1823 15.9884 11.0423 15.6522 11.0423 15.2508V5.12164Z"
                  fill="#B1A7C5"
                />
              </svg>

              <button
                onClick={handleFileButtonClick}
                className={`w-[145px] h-[37px] bg-transparent border border-[#FFCB54] font-normal rounded-[72px] text-[#FFCB54] text-[14px] leading-[17px] flex gap-1 justify-center items-center`}
              >
                Upload Items
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              {file && (
                <p className="text-sm text-[#FFCB54] mt-2">
                  Uploaded file: <strong>{file.name}</strong>
                </p>
              )}
            </div>

            <div className="text-[10px] font-[500] text-[#FFFFFF] leading-[24px]">
              *Upload files only in CSV format
            </div>
          </div>
          <div className="w-full flex justify-center">
            <button
              className={`w-[101px] h-[37px] bg-[#FFCB54] font-normal rounded-[72px] text-[14px] leading-[17px] flex gap-1 justify-center items-center`}
              onClick={handleSubmitClickFile}
            >
              {metaFileLoading ? "Loading..." : "Submit"}
            </button>
          </div>
        </div>
      )}

      {selectedTab === "Upload via link" && (
        <div>
          <div className="w-full bg-[#482D80] rounded-lg p-6 my-5 flex flex-col gap-4">
            <div className="w-full ">
              <Select
                className="w-full text-sm md:text-base"
                placeholder="Select Catalogue"
                styles={admanagerConversion}
                options={buinessOption}
                value={buinessOption.find(
                  (option: any) => option.value === String(buisnessId),
                )}
                onChange={(selectedOption: any) => {
                  if (selectedOption) {
                    setBuisnessId(selectedOption.value);
                  }
                }}
                components={{
                  IndicatorSeparator: () => null,
                }}
              />
            </div>
            <input
              type="text"
              value={link}
              placeholder="Link"
              className="w-full text-[14px] font-normal text-white rounded border-[1px] px-[18px] py-[10px] border-[#8297BD] bg-inherit outline-none appearance-none"
              onFocus={(e) => (e.target.placeholder = "")}
              onBlur={(e) => (e.target.placeholder = "Link")}
              onChange={(e) => setLink(e.target.value)} // Assuming setLink is your state updater
            />
            <div className="text-[10px] font-[500] text-[#FFFFFF] leading-[24px]">
              The link that you provide to the file should start with http://,
              https://, or sftp://.
            </div>
          </div>
          <div className="w-full flex justify-center">
            <button
              className={`w-[101px] h-[37px] bg-[#FFCB54] font-normal rounded-[72px] text-[14px] leading-[17px] flex gap-1 justify-center items-center`}
              onClick={handleSubmitClickLink}
            >
              {metaLinkLoading ? "Loading..." : "Submit"}
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default MetaUploadModal;
