"use client";
import React, {
  useState,
  useEffect,
  Suspense,
  useRef,
  ChangeEvent,
} from "react";
import clsx from "clsx";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  postUploadFileService,
  getAnalysisService,
  postUploadDriveFileService,
} from "@nyx-frontend/main/services/uploadService";
import CheckedIcon from "@nyx-frontend/main/components/Icons/CheckedIcon";
import UploadIcon from "@nyx-frontend/main/components/Icons/UploadIcon";
import Select from "react-select";
import RadarChart from "@nyx-frontend/main/charts/RadarChart";
import BarChart from "@nyx-frontend/main/charts/BarChart";
import { radarOptions } from "@nyx-frontend/main/utils/utils";

import "@nyx-frontend/main/css/uploadsong.css";

import AnalysisLoading from "@nyx-frontend/main/components/AnalysisLoading";
import { useRouter, useSearchParams } from "next/navigation";
import PreLoginModal from "@nyx-frontend/main/modals/PreLogin";
import { preLoginStyle } from "@nyx-frontend/main/utils/modalstyles";
import Modal from "react-modal";

import { genereOptions, trackOptions } from "../constant";
import { colourStyles2 } from "../optionsStyle";
import { verifyJWTToken } from "@nyx-frontend/main/utils/utils";
import { toast } from "react-toastify";
import LoadingFile from "./loader-file";
import Button from "@nyx-frontend/main/components/Button";
import CustomLink from "@nyx-frontend/main/components/Link";
import ColorFullCircle from "@nyx-frontend/main/components/ColorFullCircle";
import { hasToken } from "@nyx-frontend/main/utils/auth";
import {
  barOptions,
  ChartBoxBar,
  ChartBoxRadar,
} from "../mastered-reports/ChartBox";
import { htmlLegendPlugin } from "../mastered-reports/CustomLegend";
import Table from "./Table";
import useSearchQuery from "@nyx-frontend/main/hooks/useSearchQuery";
import Switch from "@nyx-frontend/main/components/Switch";
import { titleCaseBreakedKeys, titleCaseKeys } from "@nyx-frontend/main/utils/textUtils";
import { valueFull } from "@nyx-frontend/main/utils/numberUtils";
import { saveReports } from "../optionsStyle";
import { saveReport } from "@nyx-frontend/main/services/uploadService";
import UploadDrivePopup from "@nyx-frontend/main/components/UploadDriveModal";
import { TUpload2, TActive2 } from "../Upload.types";
import { defaultUploadState2 } from "../Upload.constants";
import { manipulateFileName } from "@nyx-frontend/main/utils/textUtils";
import { TDriveList } from "@nyx-frontend/main/components/uploadComponents/DriveLists.types";

type showOptionType = {
  originalOption?: boolean;
  referenceOption?: boolean;
  reference1Option?: boolean;
  reference2Option?: boolean;
};

const originalStyle = {
  fill: true,
  backgroundColor: "rgba(94, 50, 255, 0.6)",
  borderColor: "rgba(94, 50, 255, 1)",
  borderWidth: 1,
  color: "white",
};

const referenceStyle = {
  fill: true,
  backgroundColor: "rgba(136, 254, 255, 0.6)",
  borderColor: "rgba(0, 216, 216, 1)",
  borderWidth: 1,
  color: "white",
};
const referenceStyle_1 = {
  fill: true,
  backgroundColor: "rgba(255, 203, 84, 0.6)",
  borderColor: "rgba(255, 203, 84, 1)",
  borderWidth: 1,
  color: "white",
};
const referenceStyle_2 = {
  fill: true,
  backgroundColor: "rgba(226, 105, 113, 0.6)",
  borderColor: "rgba(226, 105, 113, 1)",
  borderWidth: 1,
  color: "white",
};

const AnalysisGraph = (props: { uploadId: number | string }) => {
  const searchParams = useSearchParams();
  const [toggle, setToggle] = useState(true);
  const router = useRouter();

  const [barGraphaData, setGraphaData] = useState<{
    mainGraph?: any;
    secGraph?: any;
    thirdGraph?: any;
    fourthGraph?: any;
  }>({});
  const outRef = useRef<showOptionType>({
    originalOption: true,
    referenceOption: true,
    reference1Option: true,
    reference2Option: true,
  });

  const apiData = useQuery({
    queryKey: ["song_details", props.uploadId, searchParams.get("ref")],
    queryFn: async () => {
      const uploadId = props.uploadId || searchParams.get("ref");
      if (uploadId) {
        return getAnalysisService(
          `${uploadId}`,
          Number(localStorage.getItem("workspace_id")),
        );
      } else {
        console.log("Found key as blank");
        return null;
      }
    },
  });
  useEffect(() => {
    const storage = localStorage.getItem("token");
    if (storage) {
    } else {
      router.push("/apphome/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (apiData.isSuccess) {
      populateData(apiData.data);
    }

    if (apiData.isError) {
      toast.error("Oops there is not data.");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiData.isSuccess, apiData.isError]);

  const populateData = (
    response: any,
    {
      originalOption,
      referenceOption,
      reference1Option,
      reference2Option,
    }: showOptionType = {
      originalOption: true,
      referenceOption: true,
      reference1Option: true,
      reference2Option: true,
    },
  ) => {
    if (!Object.keys(response?.nyx_upload_token ?? {}).length) {
      // toast.error("Oops there is not data.");
      return;
    }

    const original = response.nyx_upload_token.parameters.original;
    const reference = response.nyx_upload_token.parameters.reference;
    const reference_1 = response.nyx_upload_token.parameters["reference 1"];
    const reference_2 = response.nyx_upload_token.parameters["reference 2"];
    const firstData = {
      labels: [
        ...titleCaseKeys(original.group.mood),
        ...titleCaseKeys(original.group.properties),
        ...titleCaseKeys(original.group.context),
      ],
      datasets: [
        {
          label: "Original",
          data: [
            ...valueFull(original.group.mood),
            ...valueFull(original.group.properties),
            ...valueFull(original.group.context),
          ],
          ...originalStyle,
        },
        {
          label: "Reference",
          data: [
            ...valueFull(reference.group.mood),
            ...valueFull(reference.group.properties),
            ...valueFull(reference.group.context),
          ],
          ...referenceStyle,
        },
        reference_1
          ? {
              label: "Reference 1",
              data: [
                ...valueFull(reference_1.group.mood),
                ...valueFull(reference_1.group.properties),
                ...valueFull(reference_1.group.context),
              ],
              ...referenceStyle_1,
            }
          : null,
        reference_2
          ? {
              label: "Reference 2",
              data: [
                ...valueFull(reference_2.group.mood),
                ...valueFull(reference_2.group.properties),
                ...valueFull(reference_2.group.context),
              ],
              ...referenceStyle_2,
            }
          : null,
      ].filter(Boolean),
    };

    const secondData: { datasets: Array<any>; labels: Array<any> } = {
      labels: titleCaseBreakedKeys(original.group.mood),
      datasets: [
        {
          label: "Original",
          data: [...(originalOption ? valueFull(original.group.mood) : [])],
          ...originalStyle,
        },
        {
          label: "Reference",
          data: [...(referenceOption ? valueFull(reference.group.mood) : [])],
          ...referenceStyle,
        },
        reference_1
          ? {
              label: "Reference 1",
              data: [
                ...(reference1Option ? valueFull(reference_1.group.mood) : []),
              ],
              ...referenceStyle_1,
            }
          : null,
        reference_2
          ? {
              label: "Reference 2",
              data: [
                ...(reference2Option ? valueFull(reference_2.group.mood) : []),
              ],
              ...referenceStyle_2,
            }
          : null,
      ].filter(Boolean),
    };

    const thirdData = {
      labels: titleCaseBreakedKeys(original.group.properties),
      datasets: [
        {
          label: "Original",
          data: [
            ...(originalOption ? valueFull(original.group.properties) : []),
          ],
          ...originalStyle,
        },
        {
          label: "Reference",
          data: [
            ...(referenceOption ? valueFull(reference.group.properties) : []),
          ],
          ...referenceStyle,
        },
        reference_1
          ? {
              label: "Reference 1",
              data: [
                ...(reference1Option
                  ? valueFull(reference_1.group.properties)
                  : []),
              ],
              ...referenceStyle_1,
            }
          : null,
        reference_2
          ? {
              label: "Reference 2",
              data: [
                ...(reference2Option
                  ? valueFull(reference_2.group.properties)
                  : []),
              ],
              ...referenceStyle_2,
            }
          : null,
      ].filter(Boolean),
    };

    const forthData = {
      labels: titleCaseBreakedKeys(original.group.context),
      datasets: [
        {
          label: "Original",
          data: [...(originalOption ? valueFull(original.group.context) : [])],
          ...originalStyle,
        },
        {
          label: "Reference",
          data: [
            ...(referenceOption ? valueFull(reference.group.context) : []),
          ],
          ...referenceStyle,
        },
        reference_1
          ? {
              label: "Reference 1",
              data: [
                ...(reference1Option
                  ? valueFull(reference_1.group.context)
                  : []),
              ],
              ...referenceStyle_1,
            }
          : null,
        reference_2
          ? {
              label: "Reference 2",
              data: [
                ...(reference2Option
                  ? valueFull(reference_2.group.context)
                  : []),
              ],
              ...referenceStyle_2,
            }
          : null,
      ].filter(Boolean),
    };

    setGraphaData({
      mainGraph: firstData,
      secGraph: secondData,
      thirdGraph: thirdData,
      fourthGraph: forthData,
    });
  };

  const onSwitch = () => {
    setToggle(!toggle);
    populateData(apiData.data, {
      originalOption: true,
      referenceOption: true,
      reference1Option: true,
      reference2Option: true,
    });
  };
  const saveOption = [
    { value: "Save_in_Profile", label: "Save in Profile" },
    { value: "Export_PDF", label: "Export PDF" },
  ];

  const mutateSaveReports = useMutation({
    mutationKey: ["save_reports"],
    mutationFn: saveReport,
  });

  const selectSaveOption = () => {
    let payload = {
      type: "SAVE_REPORT",
      uploadId: Number(searchParams.get("ref")),
      reportName: "test1",
    };
    mutateSaveReports.mutate(payload, {
      onSuccess: async (response: Object) => {
        toast.success("Save Sucessfully");
      },
      onError: (errorResponse) => {
        console.log(errorResponse);
      },
    });
  };
  return (
    <>
      <div className="w-[97%] md:w-[92%] h-[80%] rounded-3xl bg-[#00000080] my-[5%] p-2 md:p-4">
        <div className="w-[100%] h-[65%] rounded-3xl bg-[#3B236F] p-3">
          <div className="flex flex-col md:flex-row items-center justify-between p-7">
            <div>
              <p className="text-[#FFF] font-[500] text-lg">
                Detailed track analysis - powered by NYX AI
              </p>
              <p className="text-[#FFF] font-[300] text-sm">
                {apiData.data?.nyx_upload_token?.songName}
              </p>
            </div>
            <div className="flex flex-row md:flex-col gap-3 mt-4 lg:mt-0">
              <Select
                options={saveOption}
                instanceId={"download"}
                placeholder="Save Report"
                styles={saveReports}
                components={{
                  IndicatorSeparator: () => null,
                }}
                onChange={selectSaveOption}
              />
              <Switch
                onText="Bar Graph"
                offText="Spider Chart"
                onChange={onSwitch}
                className="pb-2"
              />
            </div>
          </div>
          {Object.keys(barGraphaData).length > 0 ? (
            toggle ? (
              <>
                <div className="lg:flex">
                  <div className="w-full min-h-[500px] lg:w-[calc(100%-320px)] p-4">
                    <div
                      id="legend-container"
                      className="[&>ul]:flex [&>ul]:flex-col md:[&>ul]:flex-row [&>ul]:justify-center"
                    ></div>
                    <div className="w-full min-h-[500px] lg:h-[1000px]">
                      <RadarChart
                        data={barGraphaData.mainGraph}
                        options={{
                          ...radarOptions,
                          plugins: {
                            ...radarOptions,
                            htmlLegend: {
                              // ID of the container to put the legend in
                              containerID: "legend-container",
                              classNamesText: "text-white",
                              onClick: (
                                e: Event,
                                legendItem: {
                                  visibility: boolean;
                                  text: string;
                                },
                              ) => {
                                outRef.current = {
                                  ...outRef.current,
                                  [`${legendItem.text
                                    .toLowerCase()
                                    .replace(/ /g, "")}Option`]:
                                    legendItem.visibility,
                                };
                                populateData(apiData.data, outRef.current);
                              },
                            },
                            legend: {
                              display: false,
                            },
                          },
                        }}
                        plugins={[htmlLegendPlugin]}
                      />
                    </div>
                    {/* <div id="legend-container"></div> */}
                  </div>
                  <div className="w-full flex lg:block lg:w-[320px] h-auto relative overflow-x-auto md:overflow-x-hidden">
                    <ChartBoxRadar title="Mood" data={barGraphaData.secGraph} />
                    <ChartBoxRadar
                      title="Properties"
                      data={barGraphaData.thirdGraph}
                    />
                    <ChartBoxRadar
                      title="Context"
                      data={barGraphaData.fourthGraph}
                    />
                  </div>
                </div>
              </>
            ) : (
              <div className="lg:flex">
                <div className="w-full min-h-[500px] lg:w-[calc(100%-320px)] p-4">
                  <BarChart
                    data={barGraphaData.mainGraph}
                    options={{
                      ...barOptions,
                      plugins: {
                        ...barOptions.plugins,
                        legend: {
                          ...barOptions.plugins.legend,
                          onClick: (
                            e: any,
                            legendItem: {
                              datasetIndex: number;
                              hidden: boolean;
                              text: string;
                            },
                            legend: any,
                          ) => {
                            const index = legendItem.datasetIndex;
                            const ci = legend.chart;
                            if (ci.isDatasetVisible(index)) {
                              ci.hide(index);
                              legendItem.hidden = true;
                              outRef.current = {
                                ...outRef.current,
                                [`${legendItem.text
                                  .toLowerCase()
                                  .replace(/ /g, "")}Option`]: false,
                              };
                              populateData(apiData.data, outRef.current);
                            } else {
                              ci.show(index);
                              legendItem.hidden = false;
                              outRef.current = {
                                ...outRef.current,
                                [`${legendItem.text
                                  .toLowerCase()
                                  .replace(/ /g, "")}Option`]: true,
                              };
                              populateData(apiData.data, outRef.current);
                            }
                          },
                        },
                      },
                    }}
                  />
                </div>
                <div className="w-full flex lg:block lg:w-[320px] h-auto relative overflow-x-auto md:overflow-x-hidden">
                  <ChartBoxBar title="Mood" data={barGraphaData.secGraph} />
                  <ChartBoxBar
                    title="Properties"
                    data={barGraphaData.thirdGraph}
                  />
                  <ChartBoxBar
                    title="Context"
                    data={barGraphaData.thirdGraph}
                  />
                </div>
              </div>
            )
          ) : (
            <div
              className="animate-pulse flex  w-full"
              style={{ background: "rgba(4, 20, 20, 0.4)" }}
            >
              <div className="flex-grow ">
                <LoadingFile height={690} />
              </div>
              <div className="flex  flex-col">
                <LoadingFile height={230} width={331} />
                <LoadingFile height={230} width={331} />
                <LoadingFile height={230} width={331} />
              </div>
            </div>
          )}
        </div>
        <div className="max-w-full  overflow-x-auto pl-[3rem] pt-[4rem] pr-[3rem] pb-[3rem]">
          <div className="w-[100%] flex my-5 ">
            <div className="">
              {/* <p className="text-[#FFF] font-[500] text-base text-center"> */}
              <p className="font-montserrat text-xl font-bold leading-29 tracking-normal text-left text-white">
                Detailed track analysis - powered by NYX AI
              </p>
            </div>
          </div>
          <Table data={apiData.data?.nyx_upload_token?.parameters} />
        </div>
      </div>
    </>
  );
};

const initNames = {
  mainName: "",
  referenceName: "",
  referenceName1: "",
  referenceName2: "",
};

const Page = () => {
  const [singleWindowUpload, setSingleWindowUpload] =
    useState<TUpload2>(defaultUploadState2);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [clicked, setClicked] = useState(0);

  const mainRef = useRef<HTMLInputElement>(null);
  const referenceRef = useRef<HTMLInputElement>(null);
  const referenceRef1 = useRef<HTMLInputElement>(null);
  const referenceRef2 = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [fileReference, setFileReference] = useState<File | null>(null);
  const [fileReferenceSecond, setFileReferenceSecond] = useState<File | null>(
    null,
  );
  const [fileReferenceThird, setFileReferenceThird] = useState<File | null>(
    null,
  );

  const [fileNames, setFileNames] = useState(initNames);

  const [showAnalysisModal, setShowAnalysisModal] = useState(false);
  const [showPreLoginModal, setShowPreLoginModal] = useState(false);
  const [refId, setRefId] = useState<string>("");
  const [refRefId, setRefRefId] = useState<string>("");
  const [selectedTrack, setSelectedTrack] = useState(trackOptions[0].value);
  const [selectedGenre, setSelectedGenre] = useState(genereOptions[0].value);
  const [errorMsg, setErrorMsg] = useState(null);
  const [moreUpload, setMoreUpload] = useState(0);
  const [mSelected, setMSelected] = useState(false);
  const [uploadProcess, setUploadProcess] = useState(false);
  const [selectedFile, setSelectedFile] = useState<TDriveList>();
  const [genreError, setGenreError] = useState<string | null>(null);
  const [workspace, setWorkspace] = useState<any>("");
  const { updateSearch } = useSearchQuery();
  const fileInputRef = useRef(null);
  const mutateMainFile = useMutation({
    mutationKey: ["upload-file-main"],
    mutationFn: postUploadFileService,
  });
  const mutateReferenceFile = useMutation({
    mutationKey: ["upload-file-reference"],
    mutationFn: postUploadFileService,
  });
  const mutateReferenceFile1 = useMutation({
    mutationKey: ["upload-file-reference-1"],
    mutationFn: postUploadFileService,
  });
  const mutateReferenceFile2 = useMutation({
    mutationKey: ["upload-file-reference-2"],
    mutationFn: postUploadFileService,
  });

  const mutateMainDriveFile = useMutation({
    mutationKey: ["upload-file-main"],
    mutationFn: postUploadDriveFileService,
  });
  const mutateReferenceDriveFile = useMutation({
    mutationKey: ["upload-file-reference"],
    mutationFn: postUploadDriveFileService,
  });
  const mutateReferenceDriveFile1 = useMutation({
    mutationKey: ["upload-file-reference-1"],
    mutationFn: postUploadDriveFileService,
  });
  const mutateReferenceDriveFile2 = useMutation({
    mutationKey: ["upload-file-reference-2"],
    mutationFn: postUploadDriveFileService,
  });

  const setEmpty = (el: HTMLInputElement | null) => {
    if (el) {
      el.value = "";
    }
  };

  const originalUpload = (file: File) => {
    if (!selectedGenre) {
      setGenreError("Please Select Genre");
      return;
    }

    // setGenreError(null);
    // setErrorMsg(null);
    // setFile(e.target.files[0]);

    // const selectedFile = e.target.files[0];
    // const mainName = filenameTrim(selectedFile.name);
    // setFileNames({ ...fileNames, mainName });
    if (!refRefId) {
      const data = new FormData();

      data.append("token", file);
      data.append("songName", file.name);
      data.append("trackType", selectedTrack);
      data.append("genre", selectedGenre);
      data.append("uploadType", "ORIGINAL");
      data.append("processType", "Compare");
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
    }
  };

  const referenceUpload = (file: File) => {
    if (!selectedGenre) {
      setGenreError("Please Select Genre");
      return;
    }

    // setGenreError(null);
    // setErrorMsg(null);
    // const UPLOAD_FILE = e.target.files[0];
    // const referenceName = filenameTrim(UPLOAD_FILE.name);
    // setFileNames({ ...fileNames, referenceName });
    // setFileReference(UPLOAD_FILE);
    const data = new FormData();
    data.append("token", file);
    data.append("songName", file.name);
    data.append("trackType", selectedTrack);
    data.append("genre", selectedGenre);
    data.append("uploadType", "REFERENCE");
    data.append("processType", "Compare");
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
  };

  useEffect(() => {
    const work = localStorage.getItem("workspace_name");
    setWorkspace(work);
  }, []);

  const referenceUploadSecond = (file: File) => {
    if (!selectedGenre) {
      setGenreError("Please Select Genre");
      return;
    }

    // setGenreError(null);
    // setErrorMsg(null);
    // const UPLOAD_FILE = e.target.files[0];
    // const referenceName1 = filenameTrim(UPLOAD_FILE.name);
    // setFileNames({ ...fileNames, referenceName1 });
    // setFileReferenceSecond(UPLOAD_FILE);

    const data = new FormData();
    data.append("token", file);
    data.append("songName", file.name);
    data.append("trackType", selectedTrack);
    data.append("genre", selectedGenre);
    data.append("uploadType", "REFERENCE 1");
    data.append("processType", "Compare");
    data.append("referenceId", refId ?? "");
    data.append("workspace_id", String(localStorage.getItem("workspace_id")));
    mutateReferenceFile1.mutate(data, {
      onSuccess: (response) => {
        setRefRefId(response.id);
      },
      onError: (errorResponse) => {
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
    if (!selectedGenre) {
      setGenreError("Please Select Genre");
      return;
    }

    // setGenreError(null);
    // setErrorMsg(null);
    // const UPLOAD_FILE = e.target.files[0];
    // const referenceName2 = filenameTrim(UPLOAD_FILE.name);
    // setFileNames({ ...fileNames, referenceName2 });
    // setFileReferenceThird(UPLOAD_FILE);

    const data = new FormData();
    data.append("token", file);
    data.append("songName", file.name);
    data.append("trackType", selectedTrack);
    data.append("genre", selectedGenre);
    data.append("uploadType", "REFERENCE 2");
    data.append("processType", "Compare");
    data.append("referenceId", refId ?? "");
    data.append("workspace_id", String(localStorage.getItem("workspace_id")));
    mutateReferenceFile2.mutate(data, {
      onSuccess: (response) => {
        setRefRefId(response.id);
      },
      onError: (errorResponse) => {
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

  const resetAllForm = () => {
    setShowPreLoginModal(false);
    setShowAnalysisModal(false);

    mutateMainFile.reset();
    mutateReferenceFile.reset();
    mutateReferenceFile1.reset();
    mutateReferenceFile2.reset();

    mutateMainDriveFile.reset();
    mutateReferenceDriveFile.reset();
    mutateReferenceDriveFile1.reset();
    mutateReferenceDriveFile2.reset();

    setEmpty(mainRef.current);
    setEmpty(referenceRef.current);
    setEmpty(referenceRef1.current);
    setEmpty(referenceRef2.current);

    setFile(null);
    setFileReference(null);
    setFileReferenceSecond(null);
    setFileReferenceThird(null);

    setRefId("");
    setRefRefId("");
    setErrorMsg(null);
  };

  const onUploadAnalysisClose = () => {
    singleWindowUpload.ORIGINAL.filename = null;
    singleWindowUpload.ORIGINAL.data = null;
    singleWindowUpload.REFERENCE.filename = null;
    singleWindowUpload.REFERENCE.data = null;
    singleWindowUpload.REFERENCE_TWO.filename = null;
    singleWindowUpload.REFERENCE_TWO.data = null;
    singleWindowUpload.REFERENCE_THREE.filename = null;
    singleWindowUpload.REFERENCE_THREE.data = null;
    resetAllForm();
  };

  const handleClosePreLogin = () => {
    const token = verifyJWTToken(localStorage.getItem("token"));
    if (Object.keys(token?.data || {})?.length) {
      setShowPreLoginModal(false);
      setShowAnalysisModal(true);
    } else {
      resetAllForm();
    }
  };
  const trackHandleChange = (selected: any) => {
    setSelectedTrack(selected.value);
  };

  const genereHandleChange = (selected: any) => {
    setGenreError(null);
    setSelectedGenre(selected.value);
  };

  const anlysisClicked = () => {
    setMSelected(true);

    if (
      !singleWindowUpload.ORIGINAL.filename &&
      !(
        singleWindowUpload.REFERENCE.filename ||
        singleWindowUpload.REFERENCE_TWO.filename ||
        singleWindowUpload.REFERENCE_THREE.filename
      )
    ) {
      setShowAnalysisModal(false);
    } else {
      setShowAnalysisModal(true);
    }
  };

  const handleAddMore = () => {
    if (moreUpload < 2) {
      setMoreUpload(moreUpload + 1);
    }
  };

  const isInputDisabled =
    mutateMainFile.isPending ||
    mutateReferenceFile.isPending ||
    mutateReferenceFile1.isPending ||
    mutateReferenceFile2.isPending;

  useEffect(() => {
    if (!hasToken()) {
      router.push("/apphome/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        referenceId: refRefId ?? "",
        songName: selectedFile?.name,
        processType: "Compare",
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
          // setUploadId(response.id);
          // if (refRefId) {
          //   setShowAnalysisModal(true);
          // }
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
        // onSettled: () => {
        //   setUploadProcess(false);
        // },
      });
    }

    if (singleWindowUpload.active === "REFERENCE") {
      const payload = {
        trackType: selectedTrack,
        genre: selectedGenre,
        uploadType: "REFERENCE",
        referenceId: refId ?? "",
        songName: selectedFile?.name,
        processType: "Compare",
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
          // if (refId) {
          //   setShowAnalysisModal(true);
          // }
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
        // onSettled: () => {
        //   setUploadProcess(false);
        // },
      });
    }

    if (singleWindowUpload.active === "REFERENCE_TWO") {
      const payload = {
        trackType: selectedTrack,
        genre: selectedGenre,
        uploadType: "REFERENCE 1",
        referenceId: refId ?? "",
        songName: selectedFile?.name,
        processType: "Compare",
        tokenUrl: selectedFile?.url,
        workspace_id:Number(localStorage.getItem("workspace_id")),
      };

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
          // if (refId) {
          //   setShowAnalysisModal(true);
          // }
        },
        onError: (errorResponse) => {
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
        // onSettled: () => {
        //   setUploadProcess(false);
        // },
      });
    }

    if (singleWindowUpload.active === "REFERENCE_THREE") {
      const payload = {
        trackType: selectedTrack,
        genre: selectedGenre,
        uploadType: "REFERENCE 2",
        referenceId: refId ?? "",
        songName: selectedFile?.name,
        processType: "Compare",
        tokenUrl: selectedFile?.url,
        workspace_id:Number(localStorage.getItem("workspace_id")),
      };

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
          // if (refId) {
          //   setShowAnalysisModal(true);
          // }
        },
        onError: (errorResponse) => {
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
        // onSettled: () => {
        //   setUploadProcess(false);
        // },
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
      <div className="mt-32 px-4">
        <div className="w-full max-w-[694px] text-center mx-auto">
          <p className="text-[#8297BD] font-[700] text-xl md:text-3xl">
            Unlock the Power of NYX AI
          </p>
        </div>
        <div className="w-full max-w-[791px] text-center mx-auto">
          <p className="text-[#FFFFFF] font-[600] text-base mt-4 mb-8">
            Your Track&apos;s Success, Analysed and Compared side by side
          </p>
        </div>
      </div>

      <div className="flex w-full max-w-lg mx-auto justify-center items-center gap-4 mt-5 px-4">
        <div className="w-1/2">
          <label className="text-white text-xl font-normal mb-2 block">
            Track Type
          </label>
          <Select
            instanceId="trackType"
            options={trackOptions}
            defaultValue={trackOptions[0]}
            styles={colourStyles2}
            onChange={trackHandleChange}
            components={{
              IndicatorSeparator: () => null,
            }}
          />
        </div>
        <div className="w-1/2 relative">
          <label className="text-white text-xl font-normal mb-2 block">
            Select Genre
          </label>
          <Select
            instanceId="selectGenre"
            options={genereOptions}
            defaultValue={genereOptions[0]}
            styles={colourStyles2}
            onChange={genereHandleChange}
            components={{
              IndicatorSeparator: () => null,
            }}
          />
          {genreError ? (
            <p className="text-red-600 text-xs absolute -bottom-5 left-0">
              {genreError}
            </p>
          ) : null}
        </div>
      </div>
      {errorMsg ? (
        <p className="text-center text-red-600 text-sm">{errorMsg}</p>
      ) : null}
      <div className="flex flex-col w-full justify-center items-center my-7 overflow-x-auto overflow-y-hidden">
        {/* <div className="w-auto md:w-1/2 flex-col items-center flex gap-4 mb-6"> */}
        <div className="flex gap-5 w-full md:justify-center items-center my-4">
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
              mutateReferenceFile1.isPending ||
              mutateReferenceFile2.isPending ||
              mutateReferenceDriveFile.isPending ||
              mutateReferenceDriveFile1.isPending ||
              mutateReferenceDriveFile2.isPending
            }
            isError={
              Boolean(errorMsg) ||
              Boolean(mutateMainFile.error) ||
              Boolean(mutateMainDriveFile.error)
            }
            onClick={handleUploadProcess("ORIGINAL")}
          >
            <>
              <span className="absolute top-4 text-sm md:text-lg font-bold text-[#3B226F]">
                Original
              </span>
              {/* <input
                  type="file"
                  className="w-full h-full absolute opacity-0 rounded-full"
                  onChange={handleFile}
                  ref={mainRef}
                  disabled={isInputDisabled}
                  accept="audio/*,.mp3,.wav,.m4a,.aif,.wma,.flac,.aiff,.aax,.ogg"
                /> */}
              {mutateMainFile.isSuccess || mutateMainDriveFile.isSuccess ? (
                <CheckedIcon
                  className={clsx(
                    "w-16 h-16 group-hover:w-10 group-hover:h-10 text-[#3B226F] mt-6",
                  )}
                />
              ) : (
                <UploadIcon
                  className={
                    "w-16 h-16 group-hover:w-10 group-hover:h-10 text-[#3B226F] mt-6"
                  }
                />
              )}
              {!mutateMainFile.isSuccess || !mutateMainDriveFile.isSuccess ? (
                <span className="hidden group-hover:block text-[8px] md:text-xs text-center font-medium text-[#3B226F]">
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
              mutateMainFile.isPending ||
              mutateMainDriveFile.isPending ||
              mutateReferenceFile1.isPending ||
              mutateReferenceFile2.isPending ||
              mutateReferenceDriveFile1.isPending ||
              mutateReferenceDriveFile2.isPending
            }
            isError={
              (Boolean(errorMsg) || Boolean(genreError)) &&
              (Boolean(mutateReferenceFile.error) ||
                Boolean(mutateReferenceDriveFile.error))
            }
            onClick={handleUploadProcess("REFERENCE")}
          >
            <>
              <span className="absolute text-sm md:text-lg top-4 text-[#3B226F] font-bold">
                Reference
              </span>
              {/* <input
                  type="file"
                  className="w-full h-full absolute opacity-0 rounded-full"
                  onChange={handleReference}
                  ref={referenceRef}
                  accept="audio/*,.mp3,.wav,.m4a,.aif,.wma,.flac,.aiff,.aax,.ogg"
                  disabled={isInputDisabled}
                /> */}
              {mutateReferenceFile.isSuccess ||
              mutateReferenceDriveFile.isSuccess ? (
                <CheckedIcon className="w-16 h-16 group-hover:w-10 group-hover:h-10 text-[#3B226F] mt-6" />
              ) : (
                <UploadIcon className="w-16 h-16 group-hover:w-10 group-hover:h-10 text-[#3B226F] mt-6" />
              )}
              {!mutateReferenceFile.isSuccess ||
              !mutateReferenceDriveFile.isSuccess ? (
                <span className="hidden group-hover:block text-[8px] md:text-xs text-center font-medium text-[#3B226F]">
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

          {moreUpload >= 1 ? (
            <ColorFullCircle
              isActive={Boolean(
                singleWindowUpload.REFERENCE_TWO.filename ||
                  singleWindowUpload.REFERENCE_TWO.data?.name,
              )}
              isLoading={
                mutateReferenceFile1.isPending ||
                mutateReferenceDriveFile1.isPending
              }
              hasBorder={false}
              isDisabled={
                mutateMainFile.isPending ||
                mutateMainDriveFile.isPending ||
                mutateReferenceFile.isPending ||
                mutateReferenceDriveFile.isPending ||
                mutateReferenceFile2.isPending ||
                mutateReferenceDriveFile2.isPending
              }
              isError={
                (Boolean(errorMsg) || Boolean(genreError)) &&
                (Boolean(mutateReferenceFile1.error) ||
                  Boolean(mutateReferenceDriveFile1.error))
              }
              onClick={handleUploadProcess("REFERENCE_TWO")}
            >
              <>
                <span className="absolute text-sm md:text-lg top-4 font-bold text-[#3B226F]">
                  Reference-1
                </span>
                {/* <input
                    type="file"
                    className="w-full h-full absolute opacity-0 rounded-full"
                    onChange={handleReferenceSecond}
                    ref={referenceRef1}
                    accept="audio/*,.mp3,.wav,.m4a,.aif,.wma,.flac,.aiff,.aax,.ogg"
                    disabled={isInputDisabled}
                  /> */}
                {mutateReferenceFile1.isSuccess ||
                mutateReferenceDriveFile1.isSuccess ? (
                  <CheckedIcon className="w-16 h-16 group-hover:w-10 group-hover:h-10 text-[#3B226F] mt-6" />
                ) : (
                  <UploadIcon className="w-16 h-16 group-hover:w-10 group-hover:h-10 text-[#3B226F] mt-6" />
                )}
                {!mutateReferenceFile1.isSuccess ||
                !mutateReferenceDriveFile1.isSuccess ? (
                  <span className="hidden group-hover:block text-[8px] md:text-xs text-center font-medium text-[#3B226F]">
                    Drop your track here or click to browse
                  </span>
                ) : null}
                <div className="flex flex-col justify-center items-center mt-2 w-max gap-2">
                  <p className="text-xs w-20 h-max text-[#3B226F] break-words text-center">
                    {singleWindowUpload.REFERENCE_TWO.filename
                      ? singleWindowUpload.REFERENCE_TWO.filename
                      : singleWindowUpload.REFERENCE_TWO.data?.name}
                  </p>
                </div>
              </>
            </ColorFullCircle>
          ) : null}

          {moreUpload >= 2 ? (
            <ColorFullCircle
              isActive={Boolean(
                singleWindowUpload.REFERENCE_THREE.filename ||
                  singleWindowUpload.REFERENCE_THREE.data?.name,
              )}
              isLoading={
                mutateReferenceFile2.isPending ||
                mutateReferenceDriveFile2.isPending
              }
              hasBorder={false}
              isDisabled={
                mutateMainFile.isPending ||
                mutateMainDriveFile.isPending ||
                mutateReferenceFile.isPending ||
                mutateReferenceDriveFile.isPending ||
                mutateReferenceFile1.isPending ||
                mutateReferenceDriveFile1.isPending
              }
              isError={
                (Boolean(errorMsg) || Boolean(genreError)) &&
                (Boolean(mutateReferenceFile2.error) ||
                  Boolean(mutateReferenceDriveFile2.error))
              }
              onClick={handleUploadProcess("REFERENCE_THREE")}
            >
              <>
                <span className="absolute text-sm md:text-lg top-4 font-bold text-[#3B226F]">
                  Reference-2
                </span>
                {/* <input
                    type="file"
                    className="w-full h-full absolute opacity-0 rounded-full"
                    onChange={handleReferenceThird}
                    ref={referenceRef2}
                    accept="audio/*,.mp3,.wav,.m4a,.aif,.wma,.flac,.aiff,.aax,.ogg"
                    disabled={isInputDisabled}
                  /> */}
                {mutateReferenceFile2.isSuccess ||
                mutateReferenceDriveFile2.isSuccess ? (
                  <CheckedIcon className="w-16 h-16 group-hover:w-10 group-hover:h-10 text-[#3B226F] mt-6" />
                ) : (
                  <UploadIcon className="w-16 h-16 group-hover:w-10 group-hover:h-10 text-[#3B226F] mt-6" />
                )}
                {!mutateReferenceFile2.isSuccess ||
                !mutateReferenceDriveFile2.isSuccess ? (
                  <span className="hidden group-hover:block text-[8px] md:text-xs text-center font-medium text-[#3B226F]">
                    Drop your track here or click to browse
                  </span>
                ) : null}
                <div className="flex flex-col justify-center items-center mt-2 w-max gap-2">
                  <p className="text-xs w-20 h-max text-[#3B226F] break-words text-center">
                    {singleWindowUpload.REFERENCE_THREE.filename
                      ? singleWindowUpload.REFERENCE_THREE.filename
                      : singleWindowUpload.REFERENCE_THREE.data?.name}
                  </p>
                </div>
              </>
            </ColorFullCircle>
          ) : null}

          <button
            onClick={handleAddMore}
            className={`text-white whitespace-nowrap ${
              moreUpload > 1 ? "hidden" : "block"
            }`}
          >
            + Add More
          </button>
        </div>

        {mSelected &&
        !singleWindowUpload.ORIGINAL.filename &&
        !(
          singleWindowUpload.REFERENCE.filename ||
          singleWindowUpload.REFERENCE_TWO.filename ||
          singleWindowUpload.REFERENCE_THREE.filename
        ) ? (
          <p className="text-center text-red-600 text-sm">Please Upload File</p>
        ) : null}
        {/* </div> */}
      </div>
      <div className="flex justify-center">
        <Button
          className="w-80% md:w-[25%]  shadow-sm shadow-nyx-yellow m-5"
          onClick={anlysisClicked}
        >
          Analyse & Compare
        </Button>
      </div>

      <div className="flex flex-col justify-center items-center w-full h-full">
        {clicked == 1 || searchParams.get("ref") ? (
          <AnalysisGraph uploadId={refId} />
        ) : null}
      </div>

      <div className="w-full bg-[#00000080] flex p-10 justify-center mt-5">
        <div className="md:flex w-[90%]">
          <div className="md:w-[50%]">
            <p className="text-[#FFF] font-[300] text-3xl mb-5">
              Enhanced Sound, Enhanced Success
            </p>
            <p className="text-[#FFF] text-lg font-[200] mb-5 md:mb-0">
              Instantly Improve Your Song&apos;s Quality with the support of NYX
              expert consultation service
            </p>
          </div>
          <div className="flex-1 md:text-right">
            <CustomLink
              href={`/apphome/${workspace}/experts`}
              className="shadow-sm shadow-nyx-yellow p-3 h-[46px]"
            >
              Book expert advice
            </CustomLink>
          </div>
        </div>
      </div>

      <Modal
        isOpen={showPreLoginModal}
        ariaHideApp={false}
        style={preLoginStyle}
        onRequestClose={handleClosePreLogin}
        shouldCloseOnOverlayClick={false}
        shouldCloseOnEsc={false}
      >
        <PreLoginModal
          onClose={handleClosePreLogin}
          userType="artists"
          updateCartDetails={() => {}}
        />
      </Modal>

      {showAnalysisModal ? (
        <AnalysisLoading
          onClose={onUploadAnalysisClose}
          onProgressComplete={() => {
            setShowAnalysisModal(false);
            setClicked(1);
            updateSearch("ref", refId);
          }}
          fileName={
            file?.name ||
            fileReference?.name ||
            fileReferenceSecond?.name ||
            fileReferenceThird?.name
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
};

const PageSuspense = () => (
  <Suspense>
    <Page />
  </Suspense>
);

export default PageSuspense;
