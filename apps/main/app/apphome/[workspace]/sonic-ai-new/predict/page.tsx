/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useRef, ChangeEvent,useEffect } from "react";
import Sidebar from "@nyx-frontend/main/components/Sidebar";
import MusicGenre from "./_components/MusicGenre";
import MusicUpload from "./_components/MusicUpload";
import AnalysisLoading from "./_components/AnalysisLoading";
import Steper from "./_components/Steper";
import Probability from "./_components/Probability";
import "../../../../../css/toolResponsive.css";
import UploadDrivePopup from "@nyx-frontend/main/components/UploadDriveModal";
import { defaultUploadState2 } from "../Upload.constants";
import { TUpload2, TActive2 } from "../Upload.types";
import { manipulateFileName } from "@nyx-frontend/main/utils/textUtils";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  postUploadFileService,
  postUploadDriveFileService,
} from "@nyx-frontend/main/services/uploadService";
import { TDriveList } from "@nyx-frontend/main/components/uploadComponents/DriveLists.types";
import { getAvailableCredit } from "@nyx-frontend/main/services/workSpace";
import { paymentWarningStyle } from "@nyx-frontend/main/utils/modalstyles";
import Modal from "react-modal";

const Page = () => {
  const [singleWindowUpload, setSingleWindowUpload] =
    useState<TUpload2>(defaultUploadState2);
  const [tab, setTab] = useState<string>("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [uploadProcess, setUploadProcess] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [refId, setRefId] = useState<string>("");
  const [refRefId, setRefRefId] = useState<string>("");
  const [uploadId, setUploadId] = useState<number>(0);
  const [selectedFile, setSelectedFile] = useState<TDriveList>();
  const [originalLoading, setOriginalLoading] = useState(false);
  const [originalSuccess, setOriginalSuccess] = useState(false);
  const [originalsongname, setoriginalsongname] = useState("");
  const [showPredictLoading, setShowPredictLoading] = useState(false);
  const [showProbability, setShowProbability] = useState(false);
  const [selectedDriveVideo, setSelectedDriveVideo] = useState<boolean>(false);

  const [creditFailed, setCreditFailed] = useState<boolean>(false);
  const [showerror, setshowError] = useState<boolean>(false);

  const fileInputRef = useRef(null);

  const mutateMainFile = useMutation({
    mutationKey: ["upload-file-main"],
    mutationFn: postUploadFileService,
  });
  const mutateMainDriveFile = useMutation({
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
      data.append("processType", "Probability");
      data.append("referenceId", refRefId ?? "");
      data.append("workspace_id", String(workspace));
      setoriginalsongname(file.name);
      mutateMainFile.mutate(data, {
        onSuccess: (response) => {
          setRefId(response.id);
          setUploadId(response.id);
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

  const handleUploadProcess = (type: TActive2) => () => {
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
  };

  const driveFileSelected = (newSelectedFile: TDriveList) => {
    setSelectedFile(newSelectedFile);
    setErrorMsg(null);
    setSelectedDriveVideo(true)
  };

  const handleDriveButtonClick = () => {
    setSelectedDriveVideo(false)
    if (singleWindowUpload.active === "ORIGINAL") {
      setOriginalLoading(true);
      const payload = {
        trackType: "Indian Hindi Songs",
        genre: selectedGenre,
        uploadType: "ORIGINAL",
        referenceId: refRefId ?? "",
        songName: selectedFile?.name,
        processType: "Probability",
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
          setRefId(response.id);
          setUploadId(response.id);
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
    setUploadProcess(false);
  };

  const { data: availableCredit, refetch: creditRefetch,isRefetchError } = useQuery({
    queryKey: ["available-credit-predict"],
    queryFn: () => {
      return getAvailableCredit(Number(localStorage.getItem("workspace_id")));
    },
  });

  console.log(availableCredit?.availableCredits);

  const predictClick = async () => {
    await creditRefetch();
    if (availableCredit?.availableCredits > 0 && !isRefetchError) {
      setShowPredictLoading(true);
    } else if (availableCredit?.availableCredits <= 0 && !isRefetchError) {
      setCreditFailed(true);
    } else {
      setshowError(true);
    }
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
                  originalsongname={originalsongname}
                  uploadButtonClick={handleUploadProcess}
                  originalLoading={originalLoading}
                  originalSuccess={originalSuccess}
                  predictClick={predictClick}
                />
              </div>

              <div className="w-[60%] flex bg-[#3B236F] p-5">
                {showPredictLoading ? (
                  <AnalysisLoading
                    onProgressComplete={() => {
                      setShowPredictLoading(false);
                      setShowProbability(true);
                    }}
                    fileName={originalsongname}
                    refId={refId}
                  />
                ) : showProbability ? (
                  <Probability refId={refId} />
                ) : (
                  <Steper
                    selectedGenre={selectedGenre}
                    originalSuccess={originalSuccess}
                    showPredictLoading={showPredictLoading}
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
