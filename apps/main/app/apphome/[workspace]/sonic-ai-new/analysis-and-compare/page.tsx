/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect,useState, useRef, ChangeEvent } from "react";
import Sidebar from "@nyx-frontend/main/components/Sidebar";
import MusicGenre from "./_components/MusicGenre";
import MusicUpload from "./_components/MusicUpload";
import AnalysisLoading from "./_components/AnalysisLoading";
import Steper from "./_components/Steper";
import Reports from "./_components/Reports";
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
  const [referenceLoading, setReferenceLoading] = useState(false);
  const [reference2Loading, setReference2Loading] = useState(false);
  const [reference3Loading, setReference3Loading] = useState(false);
  const [reference4Loading, setReference4Loading] = useState(false);

  const [originalSuccess, setOriginalSuccess] = useState(false);
  const [referenceSuccess, setReferenceSuccess] = useState(false);
  const [reference2Success, setReference2Success] = useState(false);
  const [reference3Success, setReference3Success] = useState(false);
  const [reference4Success, setReference4Success] = useState(false);
  const [originalsongname, setoriginalsongname] = useState("");
  const [reference1songname, setreference1songname] = useState("");
  const [reference2songname, setreference2songname] = useState("");
  const [reference3songname, setreference3songname] = useState("");
  const [reference4songname, setreference4songname] = useState("");
  const [generaselected, setgeneraselected] = useState(false);
  const [selectedDriveVideo, setSelectedDriveVideo] = useState<boolean>(false);

  const [file, setFile] = useState<File | null>(null);
  const [fileThree, setFileThree] = useState<File | null>(null);

  const [showAnalysisLoading, setShowAnalysisLoading] = useState(false);

  const [showReports, setShowReports] = useState(false);

  const [creditFailed, setCreditFailed] = useState<boolean>(false);
  const [showerror, setshowError] = useState<boolean>(false);

  const fileInputRef = useRef(null);

  const mutateMainFile = useMutation({
    mutationKey: ["upload-file-main"],
    mutationFn: postUploadFileService,
  });
  const mutateReferenceFile = useMutation({
    mutationKey: ["upload-file-main"],
    mutationFn: postUploadFileService,
  });

  const mutateReferenceFile1 = useMutation({
    mutationKey: ["upload-file-reference-1"],
    mutationFn: postUploadFileService,
  });
  const mutateReferenceFile2 = useMutation({
    mutationKey: ["upload-file-reference-1"],
    mutationFn: postUploadFileService,
  });
  const mutateReferenceFile3 = useMutation({
    mutationKey: ["upload-file-reference-1"],
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
  const mutateReferenceDriveFile1 = useMutation({
    mutationKey: ["upload-drive-file-main"],
    mutationFn: postUploadDriveFileService,
  });
  const mutateReferenceDriveFile2 = useMutation({
    mutationKey: ["upload-drive-file-main"],
    mutationFn: postUploadDriveFileService,
  });
  const mutateReferenceDriveFile3 = useMutation({
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
      data.append("processType", "Compare");
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

  const referenceUpload = (file: File) => {
    setReferenceLoading(true);

    const workspace = localStorage.getItem("workspace_id");
    const data = new FormData();
    data.append("token", file);
    data.append("songName", file.name);
    data.append("trackType", "Indian Hindi Songs");
    data.append("genre", selectedGenre);
    data.append("uploadType", "REFERENCE");
    data.append("processType", "Compare");
    data.append("referenceId", refId ?? "");
    data.append("workspace_id", String(workspace));
    setreference1songname(file.name);
    mutateReferenceFile.mutate(data, {
      onSuccess: (response) => {
        setRefRefId(response.id);
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
  };

  const referenceUploadSecond = (file: File) => {
    setReference2Loading(true);

    const data = new FormData();
    data.append("token", file);
    data.append("songName", file.name);
    data.append("trackType", "Indian Hindi Songs");
    data.append("genre", selectedGenre);
    data.append("uploadType", "REFERENCE 1");
    data.append("processType", "Compare");
    data.append("referenceId", refId ?? "");
    data.append("workspace_id", String(localStorage.getItem("workspace_id")));
    setreference2songname(file.name);
    mutateReferenceFile1.mutate(data, {
      onSuccess: (response: any) => {
        setRefRefId(response.id);
        setReference2Loading(false);
        setReference2Success(true);
      },
      onError: (errorResponse: any) => {
        setReference2Loading(false);
        // @ts-ignore
        setErrorMsg(errorResponse?.response?.data.errors.message);
        setSingleWindowUpload({
          ...singleWindowUpload,
          REFERENCE: {
            ...singleWindowUpload.REFERENCE_TWO,
            filename: null,
            data: null,
          },
        });
      },
    });
  };
  const referenceUploadThird = (file: File) => {
    setReference3Loading(true);
    if (!selectedGenre) {
      return;
    }
    const data = new FormData();
    data.append("token", file);
    data.append("songName", file.name);
    data.append("trackType", "Indian Hindi Songs");
    data.append("genre", selectedGenre);
    data.append("uploadType", "REFERENCE 1");
    data.append("processType", "Compare");
    data.append("referenceId", refId ?? "");
    data.append("workspace_id", String(localStorage.getItem("workspace_id")));
    setreference3songname(file.name);
    mutateReferenceFile2.mutate(data, {
      onSuccess: (response: any) => {
        setRefRefId(response.id);
        setReference3Loading(false);
        setReference3Success(true);
      },
      onError: (errorResponse: any) => {
        setReference3Loading(false);
        // @ts-ignore
        setErrorMsg(errorResponse?.response?.data.errors.message);
        setSingleWindowUpload({
          ...singleWindowUpload,
          REFERENCE: {
            ...singleWindowUpload.REFERENCE_THREE,
            filename: null,
            data: null,
          },
        });
      },
    });
  };
  const referenceUploadFour = (file: File) => {
    setReference4Loading(true);
    if (!selectedGenre) {
      return;
    }

    const data = new FormData();
    data.append("token", file);
    data.append("songName", file.name);
    data.append("trackType", "Indian Hindi Songs");
    data.append("genre", selectedGenre);
    data.append("uploadType", "REFERENCE 1");
    data.append("processType", "Compare");
    data.append("referenceId", refId ?? "");
    data.append("workspace_id", String(localStorage.getItem("workspace_id")));
    setreference4songname(file.name);
    mutateReferenceFile3.mutate(data, {
      onSuccess: (response: any) => {
        setRefRefId(response.id);
        setReference4Loading(false);
        setReference4Success(true);
      },
      onError: (errorResponse: any) => {
        setReference4Loading(false);

        // @ts-ignore
        setErrorMsg(errorResponse?.response?.data.errors.message);
        setSingleWindowUpload({
          ...singleWindowUpload,
          REFERENCE: {
            ...singleWindowUpload.REFERENCE_FOUR,
            filename: null,
            data: null,
          },
        });
      },
    });
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

    if (key === "REFERENCE") {
      referenceUpload(file);
      return;
    }
    if (key === "REFERENCE_TWO") {
      referenceUploadSecond(file);
      return;
    }
    if (key === "REFERENCE_THREE") {
      referenceUploadThird(file);
      return;
    }
    if (key === "REFERENCE_FOUR") {
      referenceUploadFour(file);
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
        processType: "Compare",
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

    if (singleWindowUpload.active === "REFERENCE") {
      setReferenceLoading(true);
      const payload = {
        trackType: "Indian Hindi Songs",
        genre: selectedGenre,
        uploadType: "REFERENCE",
        referenceId: refId ?? "",
        songName: selectedFile?.name,
        processType: "Compare",
        tokenUrl: selectedFile?.url,
        workspace_id: Number(localStorage.getItem("workspace_id")),
      };
      //@ts-ignore
      setreference1songname(selectedFile?.name);

      setSingleWindowUpload({
        ...singleWindowUpload,
        REFERENCE: {
          ...singleWindowUpload.REFERENCE,
          filename: manipulateFileName(selectedFile?.name),
        },
      });

      mutateReferenceDriveFile.mutate(payload, {
        onSuccess: (response) => {
          setRefRefId(response.id);
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

    if (singleWindowUpload.active === "REFERENCE_TWO") {
      setReference2Loading(true);
      const payload = {
        trackType: "Indian Hindi Songs",
        genre: selectedGenre,
        uploadType: "REFERENCE 2",
        referenceId: refId ?? "",
        songName: selectedFile?.name,
        processType: "Compare",
        tokenUrl: selectedFile?.url,
        workspace_id: Number(localStorage.getItem("workspace_id")),
      };
      //@ts-ignore
      setreference2songname(selectedFile?.name);

      setSingleWindowUpload({
        ...singleWindowUpload,
        REFERENCE_TWO: {
          ...singleWindowUpload.REFERENCE_TWO,
          filename: manipulateFileName(selectedFile?.name),
        },
      });

      mutateReferenceDriveFile1.mutate(payload, {
        onSuccess: (response) => {
          setRefRefId(response.id);
          setReference2Loading(false);
          setReference2Success(true);
        },
        onError: (errorResponse) => {
          setReference2Loading(false);
          console.log("second ref 2 fail");
          // @ts-ignore
          setErrorMsg(errorResponse?.response?.data.errors.message);
          setSingleWindowUpload({
            ...singleWindowUpload,
            REFERENCE_TWO: {
              ...singleWindowUpload.REFERENCE_TWO,
              filename: null,
              data: null,
            },
          });
        },
      });
    }

    if (singleWindowUpload.active === "REFERENCE_THREE") {
      setReference3Loading(true);
      const payload = {
        trackType: "Indian Hindi Songs",
        genre: selectedGenre,
        uploadType: "REFERENCE 3",
        referenceId: refId ?? "",
        songName: selectedFile?.name,
        processType: "Compare",
        tokenUrl: selectedFile?.url,
        workspace_id: Number(localStorage.getItem("workspace_id")),
      };
      //@ts-ignore
      setreference3songname(selectedFile?.name);

      setSingleWindowUpload({
        ...singleWindowUpload,
        REFERENCE_THREE: {
          ...singleWindowUpload.REFERENCE_THREE,
          filename: manipulateFileName(selectedFile?.name),
        },
      });

      mutateReferenceDriveFile2.mutate(payload, {
        onSuccess: (response) => {
          setRefRefId(response.id);
          setReference3Loading(false);
          setReference3Success(true);
        },
        onError: (errorResponse) => {
          setReference3Loading(false);
          // @ts-ignore
          setErrorMsg(errorResponse?.response?.data.errors.message);
          setSingleWindowUpload({
            ...singleWindowUpload,
            REFERENCE_THREE: {
              ...singleWindowUpload.REFERENCE_THREE,
              filename: null,
              data: null,
            },
          });
        },
      });
    }

    if (singleWindowUpload.active === "REFERENCE_FOUR") {
      setReference4Loading(true);
      const payload = {
        trackType: "Indian Hindi Songs",
        genre: selectedGenre,
        uploadType: "REFERENCE 4",
        referenceId: refId ?? "",
        songName: selectedFile?.name,
        processType: "Compare",
        tokenUrl: selectedFile?.url,
        workspace_id: Number(localStorage.getItem("workspace_id")),
      };
      //@ts-ignore
      setreference4songname(selectedFile?.name);

      setSingleWindowUpload({
        ...singleWindowUpload,
        REFERENCE_FOUR: {
          ...singleWindowUpload.REFERENCE_FOUR,
          filename: manipulateFileName(selectedFile?.name),
        },
      });

      mutateReferenceDriveFile3.mutate(payload, {
        onSuccess: (response) => {
          setRefRefId(response.id);
          setReference4Loading(false);
          setReference4Success(true);
        },
        onError: (errorResponse) => {
          setReference4Loading(false);
          // @ts-ignore
          setErrorMsg(errorResponse?.response?.data.errors.message);
          setSingleWindowUpload({
            ...singleWindowUpload,
            REFERENCE_FOUR: {
              ...singleWindowUpload.REFERENCE_FOUR,
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
    queryKey: ["available-credit-analysis"],
    queryFn: () => {
      return getAvailableCredit(Number(localStorage.getItem("workspace_id")));
    },
  });

  console.log(availableCredit?.availableCredits);

  const anlysisClick = async () => {
    await creditRefetch();
    if (availableCredit?.availableCredits > 0 && !isRefetchError) {
      setShowAnalysisLoading(true);
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
                  setgeneraselected={setgeneraselected}
                />
                <MusicUpload
                  tab={tab}
                  setTab={setTab}
                  originalsongname={originalsongname}
                  reference4songname={reference4songname}
                  reference3songname={reference3songname}
                  reference2songname={reference2songname}
                  reference1songname={reference1songname}
                  uploadButtonClick={handleUploadProcess}
                  originalLoading={originalLoading}
                  referenceLoading={referenceLoading}
                  reference2Loading={reference2Loading}
                  reference3Loading={reference3Loading}
                  reference4Loading={reference4Loading}
                  originalSuccess={originalSuccess}
                  referenceSuccess={referenceSuccess}
                  reference2Success={reference2Success}
                  reference3Success={reference3Success}
                  reference4Success={reference4Success}
                  anlysisClick={anlysisClick}
                  generaselected={generaselected}
                />
              </div>

              <div className="w-[60%] flex flex-col bg-[#3B236F] p-5 overflow-hidden overflow-y-auto overflow-x-hidden">
                {showAnalysisLoading ? (
                  <div className="w-full">
                    <AnalysisLoading
                      onProgressComplete={() => {
                        setShowAnalysisLoading(false);
                        setShowReports(true);
                      }}
                      fileName={originalsongname}
                      refId={refId}
                    />
                    <div className="text-white mt-6">
                      <p className="font-bold text-[16px] mb-3">
                        Analysis Tips & Tracks
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
                  <Reports uploadId={refId} />
                ) : (
                  <Steper
                    selectedGenre={selectedGenre}
                    originalSuccess={originalSuccess}
                    referenceSuccess={referenceSuccess}
                    showAnalysisLoading={showAnalysisLoading}
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
