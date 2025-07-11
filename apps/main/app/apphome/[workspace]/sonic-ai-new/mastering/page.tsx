/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useRef, ChangeEvent,useEffect } from "react";
import Sidebar from "@nyx-frontend/main/components/Sidebar";
import MusicGenre from "./_components/MusicGenre";
import MusicUpload from "./_components/MusicUpload";
import MasterLoading from "./_components/MasterLoading";
import CustomMasterLoading from "./_components/CustomMasterLoading";
import Reports from "./_components/Reports";
import Steper from "./_components/Steper";
import CustomMasterReport from "./_components/CustomReports";
import "../../../../../css/toolResponsive.css";
import UploadDrivePopup from "@nyx-frontend/main/components/UploadDriveModal";
import { defaultUploadState } from "../Upload.constants";
import { TUpload, TActive } from "../Upload.types";
import { manipulateFileName } from "@nyx-frontend/main/utils/textUtils";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  postUploadFileService,
  postUploadDriveFileService,
} from "@nyx-frontend/main/services/uploadService";
import { TDriveList } from "@nyx-frontend/main/components/uploadComponents/DriveLists.types";
import Modal from "react-modal";
import { customeMasteringStyle } from "@nyx-frontend/main/utils/modalstyles";
import { Slider } from "rsuite";
import "./_components/rsuiteSlider.css";
import "rsuite/Slider/styles/index.css";
import "rsuite/RangeSlider/styles/index.css";
import Button from "@nyx-frontend/main/components/Button";
import { getAvailableCredit } from "@nyx-frontend/main/services/workSpace";
import { paymentWarningStyle } from "@nyx-frontend/main/utils/modalstyles";

const Page = () => {
  const [singleWindowUpload, setSingleWindowUpload] =
    useState<TUpload>(defaultUploadState);
  const [tab, setTab] = useState<string>("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [uploadProcess, setUploadProcess] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [refId, setRefId] = useState<string>("");
  const [refRefId, setRefRefId] = useState<string>("");
  const [uploadId, setUploadId] = useState<number>(0);
  const [selectedFile, setSelectedFile] = useState<TDriveList>();
  const [originalLoading, setOriginalLoading] = useState(false);
  const [referenceLoading, setReferenceLoading] = useState(false);
  const [originalSuccess, setOriginalSuccess] = useState(false);
  const [referenceSuccess, setReferenceSuccess] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [fileThree, setFileThree] = useState<File | null>(null);
  const [showMasterLoading, setShowMasterLoading] = useState(false);
  const [showCustomMasterLoading, setShowCustomMasterLoading] = useState(false);
  const [customMasterPayload, setCustomMasterPayload] = useState<any>();
  const [showReports, setShowReports] = useState(false);
  const fileInputRef = useRef(null);
  const [costumMasterPopup, setCostumMasterPopup] = useState(false);
  const [masteringIntensity, setMasteringIntensity] = useState(0.5);
  const [compressorIntensity, setCompressorIntensity] = useState(0.5);
  const [equalizationIntensity, setEqualizationIntensity] = useState(0.5);
  const [stereoWidth, setStereoWidth] = useState(1.0);
  const [volume, setVolume] = useState(0);
  const [equalization, setEqualization] = useState(0);
  const [originalSongURL, setOriginalSongURL] = useState("");
  const [originalsongname, setoriginalsongname] = useState("");
  const [referencesongname, setreferencesongname] = useState("");
  const [showCustomeMasteringReports, setShowCustomeMasteringReports] =
    useState(false);
  const [customData, setCustomData] = useState<any>();

  const [creditFailed, setCreditFailed] = useState<boolean>(false);
  const [showerror, setshowError] = useState<boolean>(false);

  const [autoMasterActive, setAutoMasterActive] = useState<boolean>(false);
  const [costumMasterActive, setCostumMasterActive] = useState<boolean>(false);
  const [selectedDriveVideo, setSelectedDriveVideo] = useState<boolean>(false);

  const mutateMainFile = useMutation({
    mutationKey: ["upload-file-main"],
    mutationFn: postUploadFileService,
  });
  const mutateReferenceFile = useMutation({
    mutationKey: ["upload-file-main"],
    mutationFn: postUploadFileService,
  });

  const mutateMainDriveFile = useMutation({
    mutationKey: ["upload-drive-file-main"],
    mutationFn: postUploadDriveFileService,
  });

  const mutateReferenceDriveFile = useMutation({
    mutationKey: ["upload-drive-file-main"],
    mutationFn: postUploadDriveFileService,
  });

  
  const originalUpload = (file: File) => {
    setOriginalLoading(true);
    if (!refRefId) {
      const workspace = localStorage.getItem("workspace_id");
      const data = new FormData();
      data.append("token", file);
      data.append("songName", file.name);
      data.append("trackType", "Indian Hindi Songs");
      data.append("genre", selectedGenre);
      data.append("uploadType", "ORIGINAL");
      data.append("processType", "Mastering");
      data.append("referenceId", refId ?? "");
      data.append("workspace_id", String(workspace));
      setoriginalsongname(file.name);
      mutateMainFile.mutate(data, {
        onSuccess: (response) => {
          setRefRefId(response.id);
          setUploadId(response.id);
          setOriginalSongURL(response.songURL);
          setOriginalLoading(false);
          setOriginalSuccess(true);
        },
        onError: (errorResponse) => {
          setOriginalLoading(false);
          // @ts-ignore
          setErrorMsg(errorResponse?.response?.data.errors.message);
          setSingleWindowUpload({
            ...singleWindowUpload,
            ORIGINAL: {
              ...singleWindowUpload.ORIGINAL,
              filename: null,
              data: null,
            },
          });
        },
      });
    }
  };

  const referenceUpload = (file: File) => {
    setReferenceLoading(true);
    if (!refId) {
      const workspace = localStorage.getItem("workspace_id");
      const data = new FormData();
      data.append("token", file);
      data.append("songName", file.name);
      data.append("trackType", "Indian Hindi Songs");
      data.append("genre", selectedGenre);
      data.append("uploadType", "REFERENCE");
      data.append("processType", "Mastering");
      data.append("referenceId", refRefId ?? "");
      data.append("workspace_id", String(workspace));
      setreferencesongname(file.name);
      mutateReferenceFile.mutate(data, {
        onSuccess: (response) => {
          setRefId(response.id);
          setReferenceLoading(false);
          setReferenceSuccess(true);
        },
        onError: (errorResponse) => {
          setReferenceLoading(false);
          // @ts-ignore
          setErrorMsg(errorResponse?.response?.data.errors.message);
          setSingleWindowUpload({
            ...singleWindowUpload,
            REFERENCE: {
              ...singleWindowUpload.REFERENCE,
              filename: null,
              data: null,
            },
          });
        },
      });
    }
  };

  const handleUploadProcess = (type: TActive) => () => {
    setSingleWindowUpload({ ...singleWindowUpload, active: type });
    setUploadProcess(true);
  };

  const handleSystemButtonClick = () => {
    // Trigger click event on file input
    if (fileInputRef.current) {
      // @ts-ignore
      fileInputRef.current?.click();
    }
  };

  const systemUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = (e.target as HTMLInputElement).files;
    const file = files?.[0];

    if (!file) return;

    setUploadProcess(false);
    setErrorMsg(null);
    const key = singleWindowUpload.active;
    if (key) {
      setSingleWindowUpload({
        ...singleWindowUpload,
        [key]: {
          ...singleWindowUpload[key],
          filename: manipulateFileName(file?.name),
          data: file,
        },
      });
    }

    if (key === "ORIGINAL") {
      originalUpload(file);
      return;
    }

    if (key === "REFERENCE") {
      referenceUpload(file);
      return;
    }
  };

  const driveFileSelected = (newSelectedFile: TDriveList) => {
    setSelectedFile(newSelectedFile);
    setErrorMsg(null);
    setSelectedDriveVideo(true);
  };

  const handleDriveButtonClick = () => {
    setSelectedDriveVideo(false);
    if (singleWindowUpload.active === "ORIGINAL") {
      setOriginalLoading(true);
      const payload = {
        trackType: "Indian Hindi Songs",
        genre: selectedGenre,
        uploadType: "ORIGINAL",
        referenceId: refId ?? "",
        songName: selectedFile?.name,
        processType: "Mastering",
        tokenUrl: selectedFile?.url,
        workspace_id: Number(localStorage.getItem("workspace_id")),
      };

      const name = selectedFile?.name;
      //@ts-ignore
      setoriginalsongname(name);

      setSingleWindowUpload({
        ...singleWindowUpload,
        ORIGINAL: {
          ...singleWindowUpload.ORIGINAL,
          filename: manipulateFileName(selectedFile?.name),
        },
      });

      mutateMainDriveFile.mutate(payload, {
        onSuccess: (response) => {
          setRefRefId(response.id);
          setUploadId(response.id);
          setOriginalSongURL(response.songURL);
          setOriginalLoading(false);
          setOriginalSuccess(true);
        },
        onError: (errorResponse) => {
          setOriginalLoading(false);
          // @ts-ignore
          setErrorMsg(errorResponse?.response?.data.errors.message);
          setSingleWindowUpload({
            ...singleWindowUpload,
            ORIGINAL: {
              ...singleWindowUpload.ORIGINAL,
              filename: null,
              data: null,
            },
          });
        },
      });
    }

    if (singleWindowUpload.active === "REFERENCE") {
      setReferenceLoading(true);
      const payload = {
        trackType: "Indian Hindi Songs",
        genre: selectedGenre,
        uploadType: "REFERENCE",
        referenceId: refRefId ?? "",
        songName: selectedFile?.name,
        processType: "Mastering",
        tokenUrl: selectedFile?.url,
        workspace_id: Number(localStorage.getItem("workspace_id")),
      };

      const name = selectedFile?.name;
      //@ts-ignore
      setreferencesongname(name);

      setSingleWindowUpload({
        ...singleWindowUpload,
        REFERENCE: {
          ...singleWindowUpload.REFERENCE,
          filename: manipulateFileName(selectedFile?.name),
        },
      });

      mutateReferenceDriveFile.mutate(payload, {
        onSuccess: (response) => {
          setRefId(response.id);
          setReferenceLoading(false);
          setReferenceSuccess(true);
        },
        onError: (errorResponse) => {
          setReferenceLoading(false);
          // @ts-ignore
          setErrorMsg(errorResponse?.response?.data.errors.message);
          setSingleWindowUpload({
            ...singleWindowUpload,
            REFERENCE: {
              ...singleWindowUpload.REFERENCE,
              filename: null,
              data: null,
            },
          });
        },
      });
    }
    setUploadProcess(false);
  };

  const {
    data: availableCredit,
    refetch: creditRefetch,
    isRefetchError,
  } = useQuery({
    queryKey: ["available-credit-mastering"],
    queryFn: () => {
      return getAvailableCredit(Number(localStorage.getItem("workspace_id")));
    },
  });

  console.log(availableCredit?.availableCredits);
  const autoMasterClick = async () => {
    setAutoMasterActive(true);
    await creditRefetch();
    if (availableCredit?.availableCredits > 0 && !isRefetchError) {
      setShowMasterLoading(true);
    } else if (availableCredit?.availableCredits <= 0 && !isRefetchError) {
      setCreditFailed(true);
    } else {
      setshowError(true);
    }
  };

  const customMasterClick = async () => {
    setCostumMasterActive(true);
    await creditRefetch();
    if (availableCredit?.availableCredits > 0 && !isRefetchError) {
      setCostumMasterPopup(true);
    } else if (availableCredit?.availableCredits <= 0 && !isRefetchError) {
      setCreditFailed(true);
    } else {
      setshowError(true);
    }
  };

  const startCustomeMastering = () => {
    setCostumMasterPopup(false);
    setShowCustomMasterLoading(true);
    const payload = {
      uploadId: Number(refRefId),
      workspace_id: Number(localStorage.getItem("workspace_id")),

      equalization: {
        low: equalization,
        mid: equalization,
        high: equalization,
      },
      equalization_instensity: String(equalizationIntensity),
      volume_level: String(volume),
      stereo_width: String(stereoWidth),
      compressor_intensity: String(compressorIntensity),
      mastering_intensity: String(masteringIntensity),
    };

    setCustomMasterPayload(payload);
  };

  useEffect(() => {
    const handleBeforeUnload = (event: any) => {
      event.preventDefault();
      event.returnValue = "Changes you made may not be saved."; //Required for Chrome to show the dialog
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <>
      <div className="justify-start flex w-full">
        <Sidebar />
        <div className="flex justify-center w-full">
          <div className="w-[95%]">
            <p className="text-[#8297BD] text-[20px] md:text-[24px] font-bold text-center mt-[36px] mb-8">
              Sonic AI
            </p>
            <div className="flex w-full justify-center right_side_tool">
              <div className="tool-left-panel bg-[#00000080] flex flex-col gap-4 p-4  noverflow-hidden overflow-y-auto rounded-l-lg">
                <MusicGenre
                  tab={tab}
                  setTab={setTab}
                  selectedGenre={selectedGenre}
                  setSelectedGenre={setSelectedGenre}
                />
                <MusicUpload
                  tab={tab}
                  setTab={setTab}
                  uploadButtonClick={handleUploadProcess}
                  originalLoading={originalLoading}
                  referenceLoading={referenceLoading}
                  originalSuccess={originalSuccess}
                  referenceSuccess={referenceSuccess}
                  autoMasterClick={autoMasterClick}
                  customMasterClick={customMasterClick}
                  originalsongname={originalsongname}
                  referencesongname={referencesongname}
                  autoMasterActive={autoMasterActive}
                  costumMasterActive={costumMasterActive}
                />
              </div>

              <div className="w-[60%] flex bg-[#3B236F] p-3 overflow-hidden overflow-x-hidden overflow-y-auto">
                {showMasterLoading ? (
                  <div className="w-full">
                    {" "}
                    <MasterLoading
                      onProgressComplete={() => {
                        setShowMasterLoading(false);
                        setShowReports(true);
                      }}
                      file={file || fileThree}
                      refId={refRefId}
                      originalsongname={originalsongname}
                    />
                    <div className="text-white mt-6">
                      <p className="font-bold text-[16px] mb-3">
                        Mastering Tips & Tracks
                      </p>
                      <p className="italic font-thin text-[14px]">
                        Validating File format & Evaluating File Size
                      </p>
                      <p className="italic font-thin text-[14px]">
                        Anticipate an approximate 1 min for uploading and
                        analysing your song.
                      </p>
                    </div>
                  </div>
                ) : showReports ? (
                  <Reports uploadId={uploadId} />
                ) : showCustomMasterLoading ? (
                  <CustomMasterLoading
                    onProgressComplete={() => {
                      setShowCustomMasterLoading(false);
                      setShowCustomeMasteringReports(true);
                    }}
                    originalsongname={originalsongname}
                    customMasterPayload={customMasterPayload}
                  />
                ) : showCustomeMasteringReports ? (
                  <CustomMasterReport
                    customData={customData}
                    customMasterPayload={customMasterPayload}
                  />
                ) : (
                  <Steper
                    selectedGenre={selectedGenre}
                    originalSuccess={originalSuccess}
                    referenceSuccess={referenceSuccess}
                    showMasterLoading={showMasterLoading}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {uploadProcess ? (
        <UploadDrivePopup
          onClose={() => setUploadProcess(false)}
          onSelected={driveFileSelected}
          handleSystemButtonClick={handleSystemButtonClick}
          systemUpload={systemUpload}
          handleDriveButtonClick={handleDriveButtonClick}
          fileInputRef={fileInputRef}
          selectedDriveVideo={selectedDriveVideo}
        />
      ) : null}

      {costumMasterPopup ? (
        <Modal isOpen={costumMasterPopup} style={customeMasteringStyle}>
          <div className="w-[700px]">
            <p className="text-white text-lg font-semibold">Custom Mastering</p>
            <button
              className="p-2 absolute top-2 right-2"
              onClick={() => setCostumMasterPopup(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
              >
                <path
                  d="M0.35 13.65C0.583333 13.8833 0.855555 14 1.16667 14C1.47778 14 1.75 13.8833 1.98333 13.65L7 8.63333L12.0556 13.6889C12.263 13.8963 12.5287 13.9935 12.8528 13.9806C13.1769 13.9676 13.4426 13.8574 13.65 13.65C13.8833 13.4167 14 13.1444 14 12.8333C14 12.5222 13.8833 12.25 13.65 12.0167L8.63333 7L13.6889 1.94444C13.8963 1.73704 13.9935 1.4713 13.9806 1.14722C13.9676 0.823148 13.8574 0.557407 13.65 0.35C13.4167 0.116667 13.1444 0 12.8333 0C12.5222 0 12.25 0.116667 12.0167 0.35L7 5.36667L1.94444 0.311111C1.73704 0.103703 1.4713 0.00648092 1.14722 0.0194439C0.823148 0.0324068 0.557407 0.142593 0.35 0.35C0.116667 0.583333 0 0.855555 0 1.16667C0 1.47778 0.116667 1.75 0.35 1.98333L5.36667 7L0.311111 12.0556C0.103703 12.263 0.00648092 12.5287 0.0194439 12.8528C0.0324068 13.1769 0.142593 13.4426 0.35 13.65Z"
                  fill="white"
                />
              </svg>
            </button>
            <div className="w-full flex flex-col gap-2 mt-5">
              <div className="bg-[#28134B] w-full h-[75px] rounded-lg flex items-center">
                <div className="w-[30%] mx-5 text-white">
                  Mastering Intensity
                </div>
                <Slider
                  progress
                  defaultValue={0.5}
                  value={masteringIntensity}
                  onChange={(value) => {
                    setMasteringIntensity(value);
                  }}
                  min={0.1}
                  max={1.0}
                  step={0.1}
                  className="w-[70%] amountOfMotion mx-5"
                />
              </div>
              <div className="bg-[#28134B] w-full h-[75px] rounded-lg flex items-center">
                <div className="w-[30%] mx-5 text-white">
                  Compressor Intensity
                </div>
                <Slider
                  progress
                  defaultValue={0.5}
                  value={compressorIntensity}
                  onChange={(value) => {
                    setCompressorIntensity(value);
                  }}
                  min={0.1}
                  max={1.0}
                  step={0.1}
                  className="w-[70%] amountOfMotion mx-5"
                />
              </div>
              <div className="bg-[#28134B] w-full h-[75px] rounded-lg flex items-center">
                <div className="w-[30%] mx-5 text-white">
                  Equalization Intensity
                </div>
                <Slider
                  progress
                  defaultValue={0.5}
                  value={equalizationIntensity}
                  onChange={(value) => {
                    setEqualizationIntensity(value);
                  }}
                  min={0.1}
                  max={1.0}
                  step={0.1}
                  className="w-[70%] amountOfMotion mx-5"
                />
              </div>
              <div className="bg-[#28134B] w-full h-[75px] rounded-lg flex items-center">
                <div className="w-[30%] mx-5 text-white">Stereo Width</div>
                <Slider
                  progress
                  defaultValue={1.0}
                  value={stereoWidth}
                  onChange={(value) => {
                    setStereoWidth(value);
                  }}
                  min={0.5}
                  max={2.0}
                  step={0.1}
                  className="w-[70%] amountOfMotion mx-5"
                />
              </div>
              <div className="bg-[#28134B] w-full h-[75px] rounded-lg flex items-center">
                <div className="w-[30%] mx-5 text-white">Volume</div>
                <Slider
                  progress
                  defaultValue={0}
                  value={volume}
                  onChange={(value) => {
                    setVolume(value);
                  }}
                  min={-12}
                  max={12}
                  step={1}
                  className="w-[70%] amountOfMotion mx-5"
                />
              </div>
              <div className="bg-[#28134B] w-full h-[75px] rounded-lg flex items-center">
                <div className="w-[30%] mx-5 text-white">Equalization</div>
                <Slider
                  progress
                  defaultValue={0}
                  value={equalization}
                  onChange={(value) => {
                    setEqualization(value);
                  }}
                  min={-12}
                  max={12}
                  step={1}
                  className="w-[70%] amountOfMotion mx-5"
                />
              </div>
              <div className="w-full flex justify-center items-center">
                <Button
                  className="rounded-full w-1/2 text-base hover:shadow-none font-semibold"
                  onClick={startCustomeMastering}
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      ) : null}

      {creditFailed ? (
        <Modal isOpen={creditFailed} style={paymentWarningStyle}>
          <div className="w-full text-[#FFCB54] flex flex-col text-lg font-semibold my-3 gap-3 text-center">
            Insufficient Credits!
          </div>
          <div className="w-full text-[#FFFFFF] flex flex-col text-sm font-normal my-4 gap-3 text-center">
            There are no available credits for your generation, either renew
            your plan or upgrade to a different plan to continue generating.
          </div>
          <div className="flex w-full justify-center items-center">
            <button
              className={
                "w-full md:w-[20%] block text-white cursor-pointer hover:text-black hover:bg-amber-300 border border-amber-400 font-bold rounded-full md:py-2 text-center mr-2"
              }
              onClick={() => setCreditFailed(false)}
            >
              Ok
            </button>
          </div>
        </Modal>
      ) : null}

      {showerror ? (
        <Modal isOpen={showerror} style={paymentWarningStyle}>
          <div className="w-full text-[#FFCB54] flex flex-col text-lg font-semibold my-5 gap-3 text-center">
            Something went Wrong.
          </div>
          <div className="w-full text-[#FFFFFF] flex flex-col text-base font-normal my-5 gap-3 text-center">
            Please try again.
          </div>
          <div className="flex w-full justify-center items-center">
            <button
              className={
                "w-full md:w-[20%] block text-white cursor-pointer hover:text-black hover:bg-amber-300 border border-amber-400 font-bold rounded-full md:py-2 text-center mr-2"
              }
              onClick={() => setshowError(false)}
            >
              Ok
            </button>
          </div>
        </Modal>
      ) : null}
    </>
  );
};

export default Page;
