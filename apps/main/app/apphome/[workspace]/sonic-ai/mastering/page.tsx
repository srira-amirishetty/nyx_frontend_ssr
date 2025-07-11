"use client";
import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  ChangeEvent,
  Suspense,
} from "react";
import "@nyx-frontend/main/css/uploadsong.css";
import { useMutation } from "@tanstack/react-query";
import {
  postUploadFileService,
  postUploadDriveFileService,
} from "@nyx-frontend/main/services/uploadService";
import { masteringService } from "@nyx-frontend/main/services/uploadService";
import { UseContextData } from "@nyx-frontend/main/hooks/usecontext";
import CheckedIcon from "@nyx-frontend/main/components/Icons/CheckedIcon";
import UploadIcon from "@nyx-frontend/main/components/Icons/UploadIcon";
import { genereOptions, trackOptions } from "../constant";
import { colourStyles2 } from "../optionsStyle";
import { useSearchParams } from "next/navigation";
import Select from "react-select";
import { useRouter } from "next/navigation";
import MasterModal from "@nyx-frontend/main/components/MasterModal";
import Button from "@nyx-frontend/main/components/Button";
import ColorFullCircle from "@nyx-frontend/main/components/ColorFullCircle";
import UploadDrivePopup from "@nyx-frontend/main/components/UploadDriveModal";
import { TUpload, TActive } from "../Upload.types";
import { defaultUploadState } from "../Upload.constants";
import { manipulateFileName } from "@nyx-frontend/main/utils/textUtils";
import { TDriveList } from "@nyx-frontend/main/components/uploadComponents/DriveLists.types";
import { string } from "zod";

function Mastering() {
  const [singleWindowUpload, setSingleWindowUpload] =
    useState<TUpload>(defaultUploadState);
  const mainRef = useRef<HTMLInputElement>(null);
  const referenceRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [fileThree, setFileThree] = useState<File | null>(null);
  //const [showMainModal, setShowMainModal] = useState(false);
  //const [showModal, setShowModal] = useState(false);
  const [uploadProcess, setUploadProcess] = useState(false);
  const [refId, setRefId] = useState<string>("");
  const [refRefId, setRefRefId] = useState<string>("");
  const [selectedTrack, setSelectedTrack] = useState(trackOptions[0].value);
  const [selectedGenre, setSelectedGenre] = useState(genereOptions[0].value);
  const [uploadId, setUploadId] = useState<number>(0);
  const [showMasterModal, setShowMasterModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [selectedFile, setSelectedFile] = useState<TDriveList>();
  const [fileNameValue, setFileNameValue] = useState({
    fileNameToShow1: "",
    fileNameToShow2: "",
  });
  const [mSelected, setMSelected] = useState(false);
  const [workspace, setWorkspace] = useState<any>("");
  const fileInputRef = useRef(null);
  const router = useRouter();
  const searchParams = useSearchParams();
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

  const mutateMasteringData = useMutation({
    mutationKey: ["upload-id"],
    mutationFn: masteringService,
  });

  const originalUpload = (file: File) => {
    if (!refRefId) {
      const workspace = localStorage.getItem("workspace_id");
      const data = new FormData();
      data.append("token", file);
      data.append("songName", file.name);
      data.append("trackType", selectedTrack);
      data.append("genre", selectedGenre);
      data.append("uploadType", "ORIGINAL");
      data.append("processType", "Mastering");
      data.append("referenceId", refId ?? "");
      data.append("workspace_id", String(workspace));
      mutateMainFile.mutate(data, {
        onSuccess: (response) => {
          setRefRefId(response.id);
          setUploadId(response.id);
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
  };

  const referenceUpload = (file: File) => {
    if (!refId) {
      const workspace = localStorage.getItem("workspace_id");
      const data = new FormData();
      data.append("token", file);
      data.append("songName", file.name);
      data.append("trackType", selectedTrack);
      data.append("genre", selectedGenre);
      data.append("uploadType", "REFERENCE");
      data.append("processType", "Mastering");
      data.append("referenceId", refRefId ?? "");
      data.append("workspace_id", String(workspace));
      mutateReferenceFile.mutate(data, {
        onSuccess: (response) => {
          setRefId(response.id);
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
  const resetAllForm = () => {
    mutateMainFile.reset();
    mutateMainDriveFile.reset();

    singleWindowUpload.ORIGINAL.filename = "";
    setFile(null);
    setRefId("");
    mutateReferenceFile.reset();
    mutateReferenceDriveFile.reset();

    singleWindowUpload.REFERENCE.filename = "";
    setFileThree(null);
    setRefRefId("");
  };

  const masteringClicked = () => {
    setShowMasterModal(true);
    setMSelected(true);
    mutateMasteringData.mutate({
      uploadId: uploadId,
      workspace_id: localStorage.getItem("workspace_id"),
    });
  };

  const trackHandleChange = (selected: any) => {
    setSelectedTrack(selected.value);
  };

  const genereHandleChange = (selected: any) => {
    setSelectedGenre(selected.value);
  };

  const onMasteringClose = () => {
    setShowMasterModal(false);

    singleWindowUpload.ORIGINAL.filename = null;
    singleWindowUpload.REFERENCE.filename = null;
    singleWindowUpload.ORIGINAL.data = null;
    singleWindowUpload.REFERENCE.data = null;
    resetAllForm();
  };

  useEffect(() => {
    const storage = localStorage.getItem("token");
    if (storage) {
    } else {
      router.push("/apphome/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const work = localStorage.getItem("workspace_name");
    setWorkspace(work);
  }, []);

  const handleSystemButtonClick = () => {
    // Trigger click event on file input
    if (fileInputRef.current) {
      // @ts-ignore
      fileInputRef.current?.click();
    }
  };

  const handleUploadProcess = (type: TActive) => () => {
    setSingleWindowUpload({ ...singleWindowUpload, active: type });
    setUploadProcess(true);
  };

  const driveFileSelected = (newSelectedFile: TDriveList) => {
    setSelectedFile(newSelectedFile);
    setErrorMsg(null);
  };
  const handleDriveButtonClick = () => {
    if (singleWindowUpload.active === "ORIGINAL") {
      const payload = {
        trackType: selectedTrack,
        genre: selectedGenre,
        uploadType: "ORIGINAL",
        referenceId: refId ?? "",
        songName: selectedFile?.name,
        processType: "Mastering",
        tokenUrl: selectedFile?.url,
        workspace_id: Number(localStorage.getItem("workspace_id")),
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
          setRefRefId(response.id);
          setUploadId(response.id);
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
        referenceId: refRefId ?? "",
        songName: selectedFile?.name,
        processType: "Mastering",
        tokenUrl: selectedFile?.url,
        workspace_id: Number(localStorage.getItem("workspace_id")),
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
          setRefId(response.id);
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
    setUploadProcess(false);
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
      <div className="mt-10 px-4">
        <div className="w-full md:w-[40%] text-center mx-auto">
          <p className="text-[#8297BD] font-[700] text-xl md:text-3xl">
            Make Your Music Shine with NYX AI reference Mastering
          </p>
        </div>
      </div>
      <div className="flex w-full max-w-lg mx-auto justify-center items-center gap-4 mt-5 p-2">
        <div className="w-1/2">
          <label className="text-white text-xl font-normal mb-2 block">
            Track Type
          </label>
          <Select
            options={trackOptions}
            defaultValue={trackOptions[0]}
            styles={colourStyles2}
            onChange={trackHandleChange}
            components={{
              IndicatorSeparator: () => null,
            }}
          />
        </div>
        <div className="w-1/2">
          <label className="text-white text-xl font-normal mb-2 block">
            Select Genre
          </label>
          <Select
            options={genereOptions}
            defaultValue={genereOptions[0]}
            styles={colourStyles2}
            onChange={genereHandleChange}
            components={{
              IndicatorSeparator: () => null,
            }}
          />
        </div>
      </div>
      {errorMsg ? (
        <p className="text-center text-red-600 text-sm">{errorMsg}</p>
      ) : null}
      <div className="flex flex-col w-full justify-center items-center my-7">
        <div className="w-full md:w-1/2 flex-col justify-center items-center flex gap-4 mb-6">
          <div className="flex gap-5 w-auto justify-center items-center mb-3">
            <ColorFullCircle
              isActive={Boolean(
                singleWindowUpload.ORIGINAL.filename ||
                  singleWindowUpload.ORIGINAL.data?.name,
              )}
              isLoading={
                mutateMainFile.isPending || mutateMainDriveFile.isPending
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
                <span className="absolute top-4 text-base md:text-lg text-[#3B226F] font-bold">
                  Original
                </span>
                {mutateMainFile.isSuccess || mutateMainDriveFile.isSuccess ? (
                  <CheckedIcon className="w-16 h-16 group-hover:w-10 group-hover:h-10 text-[#3B226F] mt-6" />
                ) : (
                  <UploadIcon className="w-16 h-16 group-hover:w-10 group-hover:h-10 text-[#3B226F] mt-6" />
                )}
                {!mutateMainFile.isSuccess || !mutateMainDriveFile.isSuccess ? (
                  <span className="hidden group-hover:block text-[#3B226F] text-[8px] md:text-xs text-center font-medium">
                    Drop your track here or click to browse
                  </span>
                ) : null}

                <div className="flex flex-col justify-center items-center mt-2 w-max gap-2">
                  <p className="text-xs w-20 h-max text-[#3B226F] break-words text-center">
                    {singleWindowUpload.ORIGINAL.filename
                      ? singleWindowUpload.ORIGINAL.filename
                      : singleWindowUpload.ORIGINAL.data?.name}
                  </p>
                </div>
              </>
            </ColorFullCircle>

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
                mutateMainFile.isPending || mutateMainDriveFile.isPending
              }
              isError={
                (Boolean(errorMsg) && Boolean(mutateReferenceFile.error)) ||
                Boolean(mutateReferenceDriveFile.error)
              }
              onClick={handleUploadProcess("REFERENCE")}
            >
              {" "}
              <>
                <span className="absolute text-base md:text-lg top-4 text-[#3B226F] font-bold">
                  Reference
                </span>

                {mutateReferenceFile.isSuccess ||
                mutateReferenceDriveFile.isSuccess ? (
                  <CheckedIcon className="w-16 h-16 group-hover:w-10 group-hover:h-10 text-[#3B226F] mt-6" />
                ) : (
                  <UploadIcon className="w-16 h-16 group-hover:w-10 group-hover:h-10 text-[#3B226F] mt-6" />
                )}
                {!mutateReferenceFile.isSuccess ||
                !mutateReferenceDriveFile.isSuccess ? (
                  <span className="hidden group-hover:block text-[#3B226F] text-[8px] md:text-xs text-center font-medium">
                    Drop your track here or click to browse
                  </span>
                ) : null}
                <div className="flex flex-col justify-center items-center mt-2 w-max gap-2">
                  <p className="text-xs w-20 h-max text-[#3B226F] break-words text-center">
                    {singleWindowUpload.REFERENCE.filename
                      ? singleWindowUpload.REFERENCE.filename
                      : singleWindowUpload.REFERENCE.data?.name}
                  </p>
                </div>
              </>
            </ColorFullCircle>
          </div>
          {mSelected &&
          (!singleWindowUpload.REFERENCE.filename ||
            !singleWindowUpload.ORIGINAL.filename) ? (
            <p className="text-center text-red-600 text-sm">
              Please Upload File
            </p>
          ) : null}
        </div>
      </div>

      <div className="flex justify-center">
        <Button
          className="w-[213px] shadow-sm shadow-nyx-yellow"
          onClick={masteringClicked}
        >
          Start Mastering
        </Button>
      </div>
      <div className="w-full h-auto bg-[#00000080] mt-20 flex flex-col md:flex-row p-[7%] gap-14">
        <div className="flex flex-col w-full md:w-1/2 gap-5">
          <div>
            <p className="text-[#FFF] font-[350] text-3xl md:w-[80%] break-words px-[3%]">
              Elevate Your Sound with AI Precision
            </p>
          </div>
          <div>
            <p className="text-[#FFF] font-[200] text-sm md:text-lg text-justify p-[3%]">
              .NYX AI Reference Mastering employs cutting-edge AI techniques to
              elevate your track, bringing it in line with your uploaded
              reference track. The NYX AI engine has been meticulously trained
              on a vast library of songs, enabling it to identify and enhance
              critical parameters that shape the character of music. Seamlessly
              aligning stereo width, peak amplitude, frequency response, RMS,
              and more, NYX AI Reference Mastering effortlessly helps you
              achieve the sonic excellence of your favorite music
            </p>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <div className="bg-[#532095] w-full md:w-[50%] h-[110%]"></div>
        </div>
      </div>

      {showMasterModal ? (
        <MasterModal
          onClose={onMasteringClose}
          onProgressComplete={() =>
            router.push(
              `/apphome/${workspace}/sonic-ai/mastered-reports?uploadId=${refRefId}`,
            )
          }
          file={file || fileThree}
          refId={refRefId}
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

const MasteringSuspense = () => (
  <Suspense>
    <Mastering />
  </Suspense>
);

export default MasteringSuspense;
