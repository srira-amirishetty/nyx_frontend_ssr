/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState, ChangeEvent, useRef, useEffect } from "react";
import "@nyx-frontend/main/css/uploadsong.css";
import { ContentNonLogin } from "@nyx-frontend/main/components/content";
import clsx from "clsx";
import UploadLoading from "@nyx-frontend/main/components/UploadLoading";
import AnalysisLoading from "@nyx-frontend/main/components/AnalysisLoading";
import UploadDrivePopup from "@nyx-frontend/main/components/UploadDriveModal";
import { useRouter } from "next/navigation";
import Select from "react-select";
import { genereOptions, trackOptions } from "./constant";
import { colourStyles2 } from "./optionsStyle";
import { useMutation } from "@tanstack/react-query";
import {
  postUploadFileService,
  postUploadDriveFileService,
} from "@nyx-frontend/main/services/uploadService";
import Details from "./Details";
import CheckedIcon from "@nyx-frontend/main/components/Icons/CheckedIcon";
import UploadIcon from "@nyx-frontend/main/components/Icons/UploadIcon";
import ColorFullCircle from "@nyx-frontend/main/components/ColorFullCircle";
import { manipulateFileName } from "@nyx-frontend/main/utils/textUtils";
import { TDriveList } from "@nyx-frontend/main/components/uploadComponents/DriveLists.types";
import { TUpload, TActive } from "./Upload.types";
import { defaultUploadState } from "./Upload.constants";

function UploadSong() {
  const [singleWindowUpload, setSingleWindowUpload] =
    useState<TUpload>(defaultUploadState);

  const [isActiveReference, setIsActiveReference] = useState(false);
  const [showMainModal, setShowMainModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showAnalysisModal, setShowAnalysisModal] = useState(false);
  const [refId, setRefId] = useState<string>("");
  const [refRefId, setRefRefId] = useState<string>("");
  const [selectedTrack, setSelectedTrack] = useState(trackOptions[0].value);
  const [selectedGenre, setSelectedGenre] = useState(genereOptions[0].value);
  const [errorMsg, setErrorMsg] = useState(null);
  const [uploadProcess, setUploadProcess] = useState(false);
  const [selectedFile, setSelectedFile] = useState<TDriveList>();
  const [isDrive, setIsDrive] = useState(false);
  const [workspace, setWorkspace] = useState<any>("");
  const fileInputRef = useRef(null);

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

  const router = useRouter();

  const onOriginalHandler = () => {
    setIsActiveReference(false);
  };

  const onReferenceHandler = () => {
    setIsActiveReference(true);
  };

  const resetAllForm = () => {
    setShowAnalysisModal(false);
    mutateMainFile.reset();
    mutateMainDriveFile.reset();
    mutateReferenceFile.reset();
    mutateReferenceDriveFile.reset();
    setRefRefId("");
  };

  const onUploadRefClose = () => {
    setShowModal(false);
    setSingleWindowUpload(defaultUploadState);
    resetAllForm();
    mutateReferenceFile.reset();
    mutateReferenceDriveFile.reset();
    setRefRefId("");
  };

  const onUploadMainClose = () => {
    setShowMainModal(false);
    setSingleWindowUpload(defaultUploadState);
    resetAllForm();
    mutateMainFile.reset();
    mutateMainDriveFile.reset();
  };

  const onUploadAnalysisClose = () => {
    setShowAnalysisModal(false);
    setSingleWindowUpload(defaultUploadState);
    resetAllForm();
  };

  const trackHandleChange = (selected: any) => {
    setSelectedTrack(selected.value);
  };

  const genereHandleChange = (selected: any) => {
    setSelectedGenre(selected.value);
  };

  const handleUploadProcess = (type: TActive) => () => {
    setSingleWindowUpload({ ...singleWindowUpload, active: type });
    setUploadProcess(true);
  };

  const originalUpload = (file: File) => {
    if (isActiveReference && !refRefId) {
      const data = new FormData();
      data.append("token", file);
      data.append("songName", file.name);
      data.append("trackType", selectedTrack);
      data.append("genre", selectedGenre);
      data.append("uploadType", "ORIGINAL");
      data.append("processType", "Probability");
      data.append("referenceId", refRefId ?? "");
      data.append("workspace_id", String(localStorage.getItem("workspace_id")));
      mutateMainFile.mutate(data, {
        onSuccess: (response) => {
          setRefId(response.id);
        },
        onError: (errorResponse) => {
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
    } else {
      setShowMainModal(true);
    }
  };

  const referenceUpload = (file: File) => {
    if (!refId) {
      const data = new FormData();
      data.append("token", file);
      data.append("songName", file.name);
      data.append("trackType", selectedTrack);
      data.append("genre", selectedGenre);
      data.append("uploadType", "REFERENCE");
      data.append("processType", "Probability");
      data.append("referenceId", refId ?? "");
      data.append("workspace_id", String(localStorage.getItem("workspace_id")));
      mutateReferenceFile.mutate(data, {
        onSuccess: (response) => {
          setRefRefId(response.id);
        },
        onError: (errorResponse) => {
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
    } else {
      setShowModal(true);
    }
  };

  const systemUpload = (e: ChangeEvent<HTMLInputElement>) => {
    setIsDrive(false);
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
  };

  const handleSystemButtonClick = () => {
    // Trigger click event on file input
    if (fileInputRef.current) {
      // @ts-ignore
      fileInputRef.current?.click();
    }
  };

  // useEffect(() => {
  //   if (showMainModal && isDrive) {
  //     if (singleWindowUpload.active === "ORIGINAL") {
  //       const payload = {
  //         trackType: selectedTrack,
  //         genre: selectedGenre,
  //         uploadType: "ORIGINAL",
  //         referenceId: "",
  //         songName: selectedFile?.name,
  //         processType: "Probability",
  //         tokenUrl: selectedFile?.url,
  //       };

  //       setSingleWindowUpload({
  //         ...singleWindowUpload,
  //         ORIGINAL: {
  //           ...singleWindowUpload.ORIGINAL,
  //           filename: manipulateFileName(selectedFile?.name),
  //         },
  //       });

  //       mutateMainDriveFile.mutate(payload, {
  //         onSuccess: (response) => {
  //           setRefId(response.id);
  //         },
  //         onError: (errorResponse) => {
  //           // @ts-ignore
  //           setErrorMsg(errorResponse?.response?.data.errors.message);
  //           setSingleWindowUpload({
  //             ...singleWindowUpload,
  //             ORIGINAL: {
  //               ...singleWindowUpload.ORIGINAL,
  //               filename: null,
  //               data: null,
  //             },
  //           });
  //         },
  //       });
  //     }

  //     if (singleWindowUpload.active === "REFERENCE") {
  //       const payload = {
  //         trackType: selectedTrack,
  //         genre: selectedGenre,
  //         uploadType: "REFERENCE",
  //         referenceId: refId ?? "",
  //         songName: selectedFile?.name,
  //         processType: "Probability",
  //         tokenUrl: selectedFile?.url,
  //       };

  //       setSingleWindowUpload({
  //         ...singleWindowUpload,
  //         REFERENCE: {
  //           ...singleWindowUpload.REFERENCE,
  //           filename: manipulateFileName(selectedFile?.name),
  //         },
  //       });

  //       mutateReferenceDriveFile.mutate(payload, {
  //         onSuccess: (response) => {
  //           setRefRefId(response.id);
  //         },
  //         onError: (errorResponse) => {
  //           // @ts-ignore
  //           setErrorMsg(errorResponse?.response?.data.errors.message);
  //           setSingleWindowUpload({
  //             ...singleWindowUpload,
  //             REFERENCE: {
  //               ...singleWindowUpload.REFERENCE,
  //               filename: null,
  //               data: null,
  //             },
  //           });
  //         },
  //       });
  //     }
  //   }

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [showMainModal]);

  useEffect(
    () => {
      if (refId) {
        if (!isActiveReference && singleWindowUpload.active === "ORIGINAL") {
          setShowAnalysisModal(true);
        }
      }

      if (refRefId) {
        if (isActiveReference && singleWindowUpload.active === "REFERENCE") {
          setShowAnalysisModal(true);
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [refId, refRefId],
  );

  useEffect(() => {
    const work = localStorage.getItem("workspace_name");
    setWorkspace(work);
  }, []);

  const handleDriveButtonClick = () => {
    // setIsDrive(true);
    setUploadProcess(false);
    // setShowMainModal(true);

    if (singleWindowUpload.active === "ORIGINAL") {
      const payload = {
        trackType: selectedTrack,
        genre: selectedGenre,
        uploadType: "ORIGINAL",
        referenceId: "",
        songName: selectedFile?.name,
        processType: "Probability",
        tokenUrl: selectedFile?.url,
        workspace_id:Number(localStorage.getItem("workspace_id")),
      };

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
        },
        onError: (errorResponse) => {
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
      const payload = {
        trackType: selectedTrack,
        genre: selectedGenre,
        uploadType: "REFERENCE",
        referenceId: refId ?? "",
        songName: selectedFile?.name,
        processType: "Probability",
        tokenUrl: selectedFile?.url,
        workspace_id:Number(localStorage.getItem("workspace_id")),
      };

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
        },
        onError: (errorResponse) => {
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
      <div className="px-2 md:px-0">
        <div>
          <ContentNonLogin top="top-0 md:mt-10">
            <div className="rounded-3xl pt-10 pb-0 md:py-10 px-4 md:px-10">
              <h3 className="text-white text-xl font-bold text-center mb-5">
                Turn Your Tunes into Predictive Hits with NYX AI
              </h3>
              <div className="w-44 bg-nyx-yellow h-1 mx-auto mb-5"></div>
              <p className="text-white opacity-90 font-light text-base text-center mb-1">
                Unlock the Future of Your Music with AI Success Projections
              </p>
              <p className="text-nyx-light-blue m-0 font-bold text-base text-center mb-20">
                Analyse success probabilities | Enhance song quality | Monetise
                future royalties
              </p>
              <div className="flex w-full justify-center items-center gap-3 mt-5">
                <div className="w-full md:w-[20%]">
                  <label className="text-white text-base sm:text-xl font-light mb-2 block">
                    Track Type
                  </label>
                  <Select
                    className="text-sm md:text-base"
                    options={trackOptions}
                    defaultValue={trackOptions[0]}
                    styles={colourStyles2}
                    instanceId={"track"}
                    onChange={trackHandleChange}
                    components={{
                      IndicatorSeparator: () => null,
                    }}
                  />
                </div>
                <div className="w-full md:w-[20%]">
                  <label className="text-white text-base sm:text-xl font-light mb-2 block">
                    Select Genre
                  </label>
                  <Select
                    className="text-base md:text-base"
                    options={genereOptions}
                    defaultValue={genereOptions[0]}
                    instanceId={"category"}
                    styles={colourStyles2}
                    onChange={genereHandleChange}
                    components={{
                      IndicatorSeparator: () => null,
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-col w-full justify-center items-center my-7">
                <div className="w-full md:w-1/2 flex-col justify-center items-center flex gap-4 mb-6">
                  <div className="flex gap-2 md:gap-5 w-auto justify-center items-center mb-3">
                    <ColorFullCircle
                      isActive={Boolean(
                        singleWindowUpload.ORIGINAL.filename ||
                          singleWindowUpload.ORIGINAL.data?.name,
                      )}
                      isLoading={
                        mutateMainFile.isPending ||
                        mutateMainDriveFile.isPending
                      }
                      isDisabled={
                        mutateReferenceFile.isPending ||
                        mutateReferenceDriveFile.isPending
                      }
                      isError={
                        Boolean(errorMsg) ||
                        Boolean(mutateMainFile.error) ||
                        Boolean(mutateMainDriveFile.error)
                      }
                      onClick={handleUploadProcess("ORIGINAL")}
                    >
                      <>
                        {isActiveReference ? (
                          <span className="absolute text-nyx-blue-4 top-4 text-base md:text-lg font-bold">
                            Original
                          </span>
                        ) : null}
                        <span className="absolute text-nyx-blue-4 hidden group-hover:block top-4 text-base md:text-lg font-bold">
                          Original
                        </span>
                        {mutateMainFile.isSuccess ||
                        mutateMainDriveFile.isSuccess ? (
                          <CheckedIcon
                            className={clsx(
                              "w-16 h-16 group-hover:w-10 group-hover:h-10 text-[#3B226F]",
                              isActiveReference ? "mt-6" : "mt-4",
                            )}
                          />
                        ) : (
                          <UploadIcon
                            className={clsx(
                              "w-16 h-16 group-hover:w-10 group-hover:h-10 text-[#3B226F]",
                              isActiveReference ? "mt-6" : "mt-4",
                            )}
                          />
                        )}
                        <span className="hidden text-nyx-blue-4 group-hover:block text-[8px] md:text-xs text-center font-medium">
                          Drop your track here or click to browse
                        </span>
                        <div className="flex flex-col justify-center items-center mt-2 w-max gap-2">
                          <p className="text-xs w-20 h-max text-nyx-blue-4 break-words text-center">
                            {singleWindowUpload.ORIGINAL.filename
                              ? singleWindowUpload.ORIGINAL.filename
                              : singleWindowUpload.ORIGINAL.data?.name}
                          </p>
                        </div>
                      </>
                    </ColorFullCircle>
                    {isActiveReference ? (
                      <ColorFullCircle
                        isActive={Boolean(
                          singleWindowUpload.REFERENCE.filename ||
                            singleWindowUpload.REFERENCE.data?.name,
                        )}
                        isLoading={
                          mutateReferenceFile.isPending ||
                          mutateReferenceDriveFile.isPending
                        }
                        hasBorder={false}
                        isDisabled={
                          mutateMainFile.isPending ||
                          mutateMainDriveFile.isPending
                        }
                        isError={
                          (Boolean(errorMsg) &&
                            Boolean(mutateReferenceFile.error)) ||
                          Boolean(mutateReferenceDriveFile.error)
                        }
                        onClick={handleUploadProcess("REFERENCE")}
                      >
                        <>
                          <span className="absolute text-base text-nyx-blue-4 md:text-lg top-4 font-bold">
                            Reference
                          </span>
                          {mutateReferenceFile.isSuccess ||
                          mutateReferenceDriveFile.isSuccess ? (
                            <CheckedIcon className="w-16 h-16 group-hover:w-10 group-hover:h-10 text-[#3B226F] mt-6" />
                          ) : (
                            <UploadIcon className="w-16 h-16 group-hover:w-10 group-hover:h-10 text-[#3B226F] mt-6" />
                          )}
                          <span className="hidden group-hover:block text-nyx-blue-4 text-[8px] md:text-xs text-center font-medium">
                            Drop your track here or click to browse
                          </span>
                          <div className="flex flex-col justify-center items-center mt-2 w-max gap-2">
                            <p className="text-xs w-20 h-max text-nyx-blue-4 break-words text-center">
                              {singleWindowUpload.REFERENCE.filename
                                ? singleWindowUpload.REFERENCE.filename
                                : singleWindowUpload.REFERENCE.data?.name}
                            </p>
                          </div>
                        </>
                      </ColorFullCircle>
                    ) : null}
                  </div>

                  {errorMsg ? (
                    <p className="text-center text-red-600 text-sm">
                      {errorMsg}
                    </p>
                  ) : null}

                  <div className="w-full flex justify-center items-center mt-6">
                    <div
                      className={clsx(
                        "py-2 px-6 sm:px-10 rounded-l-lg cursor-pointer border border-r-0 text-sm sm:text-lg font-[400] border-[#DFD7A8] shadow-[#BA8B1D] ",
                        !isActiveReference
                          ? "bg-nyx-yellow text-black"
                          : " text-white",
                      )}
                      onClick={onOriginalHandler}
                    >
                      Original
                    </div>
                    <div
                      className={clsx(
                        "py-2 px-6 sm:px-10 rounded-r-lg cursor-pointer border text-sm sm:text-lg font-[400]  border-[#DFD7A8] shadow-[#BA8B1D] ",
                        isActiveReference
                          ? "bg-nyx-yellow text-black"
                          : " text-white",
                      )}
                      onClick={onReferenceHandler}
                    >
                      Reference
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-1/2 flex flex-col justify-center items-center gap-5 mt-5">
                  <Details />
                </div>
              </div>
            </div>
          </ContentNonLogin>
        </div>
      </div>
      {showMainModal ? (
        <UploadLoading
          onClose={onUploadMainClose}
          onProgressComplete={(data: any) => {
            console.log(data, "data is here");
            if (data.file) {
              setRefId(data?.id);
            }

            setShowMainModal(true);
          }}
          onError={(err) => {
            setShowMainModal(false);
            mutateMainFile.reset();
            mutateMainDriveFile.reset();
            setSingleWindowUpload({
              ...singleWindowUpload,
              ORIGINAL: {
                ...singleWindowUpload.ORIGINAL,
                data: null,
              },
            });
            // @ts-ignore
            setErrorMsg(err?.response?.data.errors.message);
          }}
          track={selectedTrack}
          genre={selectedGenre}
          file={singleWindowUpload.ORIGINAL.data}
          refID={refRefId}
          type="ORIGINAL"
        />
      ) : null}
      {showModal ? (
        <UploadLoading
          onClose={onUploadRefClose}
          onProgressComplete={(data: any) => {
            setRefRefId(data?.id);
            setShowModal(true);
          }}
          onError={(err) => {
            setShowModal(false);
            mutateReferenceFile.reset();
            mutateReferenceDriveFile.reset();
            setSingleWindowUpload({
              ...singleWindowUpload,
              REFERENCE: {
                ...singleWindowUpload.REFERENCE,
                data: null,
              },
            });
            // @ts-ignore
            setErrorMsg(err?.response?.data.errors.message);
          }}
          track={selectedTrack}
          genre={selectedGenre}
          file={singleWindowUpload.REFERENCE.data}
          refID={refId}
          type="REFERENCE"
        />
      ) : null}
      {showAnalysisModal ? (
        <AnalysisLoading
          onClose={onUploadAnalysisClose}
          onProgressComplete={() => {
            router.push(
              `/apphome/${workspace}/sonic-ai/probability?ref=` + refId,
            );
          }}
          fileName={
            singleWindowUpload.ORIGINAL.filename ||
            singleWindowUpload.REFERENCE.filename ||
            singleWindowUpload.ORIGINAL.data?.name ||
            singleWindowUpload.REFERENCE.data?.name
          }
          refId={refId}
        />
      ) : null}
      {uploadProcess ? (
        <UploadDrivePopup
          onClose={() => setUploadProcess(false)}
          onSelected={driveFileSelected}
          handleSystemButtonClick={handleSystemButtonClick}
          systemUpload={systemUpload}
          handleDriveButtonClick={handleDriveButtonClick}
          fileInputRef={fileInputRef}
        />
      ) : null}
    </>
  );
}

export default UploadSong;
