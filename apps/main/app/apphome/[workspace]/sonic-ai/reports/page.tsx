/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState, useRef, Suspense } from "react";
import RadarChart from "@nyx-frontend/main/charts/RadarChart";
import BarChart from "@nyx-frontend/main/charts/BarChart";
import HowItWorks2 from "@nyx-frontend/main/components/HowItWorks2";
import { HIW } from "@nyx-frontend/main/utils/globals";
import Select from "react-select";
import { saveReports } from "../optionsStyle";
import { decodeToken, radarOptions } from "@nyx-frontend/main/utils/utils";
import { apiAxios } from "@nyx-frontend/main/services/apiHandler";
import { useSearchParams, useRouter } from "next/navigation";
import CustomLink from "@nyx-frontend/main/components/Link";
import { toast } from "react-toastify";
import { htmlLegendPlugin } from "../mastered-reports/CustomLegend";
import { IMAGE_URL } from "@nyx-frontend/main/components/constants";
import { hasToken } from "@nyx-frontend/main/utils/auth";
import clsx from "clsx";
import Switch from "@nyx-frontend/main/components/Switch";
import { titleCaseKeys, titleCaseBreakedKeys } from "@nyx-frontend/main/utils/textUtils";
import { valueFull } from "@nyx-frontend/main/utils/numberUtils";
import Loader from "./Loader";
import { BarChartBox, RadarChartBox } from "./Charts";
import { useMutation, useQuery } from "@tanstack/react-query";
import { saveReport, songStructure } from "@nyx-frontend/main/services/uploadService";
import Title from "./Title";
import Link from "next/link";

const originalChartStyle = {
  fill: true,
  backgroundColor: "rgba(94, 50, 255, 0.6)",
  borderColor: "rgba(94, 50, 255, 1)",
  borderWidth: 1,
  color: "white",
};

const referenceChartStyle = {
  fill: true,
  backgroundColor: "rgba(136, 254, 255, 0.6)",
  borderColor: "rgba(0, 216, 216, 1)",
  borderWidth: 1,
  color: "white",
};

const barOptions = {
  scales: {
    y: {
      ticks: { color: "white" },
    },
    x: {
      ticks: { color: "white" },
    },
  },
  plugins: {
    legend: {
      display: true,
      labels: {
        color: "white",
      },
    },
  },
};

type showOptionType = {
  original?: boolean;
  "hit benchmark"?: boolean;
  reference?: boolean;
};

const showOption: Record<number, showOptionType> = {
  1: {
    original: true,
    "hit benchmark": true,
  },
  2: {
    original: true,
    reference: true,
  },
} as const;

function Reports() {
  const [toggle, setToggle] = useState(false);
  const [toggle2, setToggle2] = useState(false);
  const [apiData, setApiData] = useState({});
  const [fileName, setFileName] = useState(null);
  const [time, setTime] = useState(1000);
  const timerID = useRef<ReturnType<typeof setTimeout>>(null);
  // const [imgSrc,setImageSrc] = useState("");
  const [workspace, setWorkspace] = useState<any>("");
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const work = localStorage.getItem("workspace_name");
    setWorkspace(work);
  }, []);

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

  const reportDataQuery = useQuery({
    queryKey: ["reports", searchParams.get("ref")],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        return { nyx_upload_token: null };
      }

      const id = searchParams.get("ref");
      const response = await apiAxios.get(
        `artists/get-upload-token-status?id=${id}&workspace_id=${Number(localStorage.getItem("workspace_id"))}`,
        {
          headers: {
            Authorization: token,
          },
        },
      );

      return response.data;
    },
    select: (res: { nyx_upload_token: any | null }) => res?.nyx_upload_token,
  });

  // const mutateSongStructure = useMutation({
  //   mutationKey: ["song_structure"],
  //   mutationFn: songStructure,
  // });

  // useEffect(()=>{
  //   let payload = {
  //     userId: decodeToken(localStorage.getItem("token")).data.userId,
  //     id: Number(searchParams.get("ref")),
  //     url: "https://nyx-user-upload.s3.ap-south-1.amazonaws.com/songs/6/uploads/pyar%20deewana%20%28online-audio-converter.com%29.mp3?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAREVFHKLRH7QR66HO%2F20231228%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20231228T134856Z&X-Amz-Expires=604800&X-Amz-Signature=89a14bd41321a948173bd0f19d1e3ec2299da9f2cec2ce9fbb596afe057e7bbf&X-Amz-SignedHeaders=host",
  //   };

  //   mutateSongStructure.mutate(payload, {
  //     onSuccess: async (response: any) => {
  //     setImageSrc(response?.struct_url)
  //       console.log(response);
  //     },
  //     onError: (errorResponse) => {
  //       console.log(errorResponse);
  //     },
  //   });
  // },[])

  useEffect(() => {
    timerID.current = setInterval(() => {
      if (reportDataQuery.data?.struct_url) {
        if (timerID.current) clearInterval(timerID.current);
      } else {
        setTime((old) => old + 500);
        reportDataQuery.refetch();
      }
    }, time);

    return () => {
      if (timerID.current) clearInterval(timerID.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reportDataQuery]);

  const [barGraphaData, setGraphaData] = useState<{
    mainGraph?: any;
    secGraph?: any;
    thirdGraph?: any;
    fourthGraph?: any;
    mainGraph1?: any;
    secGraph1?: any;
    thirdGraph1?: any;
    fourthGraph1?: any;
  }>({});

  const outRef = useRef<Record<number, showOptionType>>(showOption);

  useEffect(() => {
    async function fetchData() {
      try {
        const id = searchParams.get("ref");
        const res = await apiAxios.get(
          `artists/get-upload-token-status?id=${id}&workspace_id=${Number(localStorage.getItem("workspace_id"))}`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          },
        );
        const resData = res.data;
        setFileName(resData.nyx_upload_token?.reportName);
        setApiData(resData);
        populateData(resData, showOption);
      } catch (error) {
        console.log("error", error);
      }
    }

    if (hasToken() && searchParams.get("ref")) {
      fetchData();
    } else {
      router.push("/apphome/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  useEffect(() => {
    const storage = localStorage.getItem("token");
    if (storage) {
    } else {
      router.push("/apphome/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const populateData = (
    response: any,
    options: Record<number, showOptionType> = showOption,
  ) => {
    if (!Object.keys(response?.nyx_upload_token ?? {}).length) {
      toast.error("Oops there is not data.");
      return;
    }

    const hit_benchmark = response.nyx_upload_token.parameters["hit benchmark"];
    const original = response.nyx_upload_token.parameters.original;
    const referencegraph = response.nyx_upload_token.parameters.reference;

    if (referencegraph !== undefined) {
      options[2].reference = true;
    } else {
      options[2].reference = false;
    }

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
          ...originalChartStyle,
        },
        {
          label: "Hit Benchmark",
          data: [
            ...valueFull(hit_benchmark.group.mood),
            ...valueFull(hit_benchmark.group.properties),
            ...valueFull(hit_benchmark.group.context),
          ],
          ...referenceChartStyle,
        },
      ],
    };

    const secondData = {
      labels: titleCaseBreakedKeys(original.group.mood),
      datasets: [
        {
          label: "Original",
          data: [
            ...(options[1].original ? valueFull(original.group.mood) : []),
          ],
          ...originalChartStyle,
        },
        {
          label: "Hit Benchmark",
          data: [
            ...(options[1]["hit benchmark"]
              ? valueFull(hit_benchmark.group.mood)
              : []),
          ],
          ...referenceChartStyle,
        },
      ],
    };

    const thirdData = {
      labels: titleCaseBreakedKeys(original.group.properties),
      datasets: [
        {
          label: "Original",
          data: [
            ...(options[1].original
              ? valueFull(original.group.properties)
              : []),
          ],
          ...originalChartStyle,
        },
        {
          label: "Hit Benchmark",
          data: [
            ...(options[1]["hit benchmark"]
              ? valueFull(hit_benchmark.group.properties)
              : []),
          ],
          ...referenceChartStyle,
        },
      ],
    };

    const newLive = {
      ...original.group.context,
      "Vibe Intensity": original.group.context?.live_performance_energy,
    };
    delete newLive.live_performance_energy;

    const forthData = {
      labels: titleCaseBreakedKeys(newLive),
      datasets: [
        {
          label: "Original",
          data: [
            ...(options[1].original ? valueFull(original.group.context) : []),
          ],
          ...originalChartStyle,
        },
        {
          label: "Hit Benchmark",
          data: [
            ...(options[1]["hit benchmark"]
              ? valueFull(hit_benchmark.group.context)
              : []),
          ],
          ...referenceChartStyle,
        },
      ],
    };

    const firstData1 = {
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
          ...originalChartStyle,
        },
        {
          label: "Reference",
          data: [
            ...(options[2].reference
              ? valueFull(referencegraph.group.mood)
              : []),
            ...(options[2].reference
              ? valueFull(referencegraph.group.properties)
              : []),
            ...(options[2].reference
              ? valueFull(referencegraph.group.context)
              : []),
          ],
          ...referenceChartStyle,
        },
      ],
    };

    const secondData1 = {
      labels: titleCaseBreakedKeys(original.group.mood),
      datasets: [
        {
          label: "Original",
          data: [
            ...(options[2].original ? valueFull(original.group.mood) : []),
          ],
          ...originalChartStyle,
        },
        {
          label: "Reference",
          data: [
            ...(options[2].reference
              ? valueFull(referencegraph.group.mood)
              : []),
          ],
          ...referenceChartStyle,
        },
      ],
    };

    const thirdData1 = {
      labels: titleCaseBreakedKeys(original.group.properties),
      datasets: [
        {
          label: "Original",
          data: [
            ...(options[2].original
              ? valueFull(original.group.properties)
              : []),
          ],
          ...originalChartStyle,
        },
        {
          label: "Reference",
          data: [
            ...(options[2].reference
              ? valueFull(referencegraph.group.properties)
              : []),
          ],
          ...referenceChartStyle,
        },
      ],
    };

    const newLive1 = {
      ...original.group.context,
      "Vibe Intensity": original.group.context?.live_performance_energy,
    };
    delete newLive1.live_performance_energy;

    const forthData1 = {
      labels: titleCaseBreakedKeys(newLive1),
      datasets: [
        {
          label: "Original",
          data: [
            ...(options[2].original ? valueFull(original.group.context) : []),
          ],
          ...originalChartStyle,
        },
        {
          label: "Reference",
          data: [
            ...(options[2].reference
              ? valueFull(referencegraph.group.context)
              : []),
          ],
          ...referenceChartStyle,
        },
      ],
    };

    setGraphaData({
      mainGraph: firstData,
      secGraph: secondData,
      thirdGraph: thirdData,
      fourthGraph: forthData,

      mainGraph1: firstData1,
      secGraph1: secondData1,
      thirdGraph1: thirdData1,
      fourthGraph1: forthData1,
    });
  };

  const saveOption = [
    { value: "Save_in_Profile", label: "Save in Profile" },
    { value: "Export_PDF", label: "Export PDF" },
  ];

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
    <section className="px-4">
      <div className="w-full max-w-[800px] text-center mx-auto my-10">
        <p className="text-[#8297BD] font-[700] text-2xl md:text-3xl mt-10">
          NYX AI generated detailed report to improve Track
        </p>
        {/* <button onClick={click}>clickkkkkkkkkkkkkk</button> */}
      </div>
      <div className="flex justify-center">
        <div className="flex w-full lg:w-auto lg:mx-auto">
          <div className="w-[320px] h-full hidden xl:block">
            <div className="w-full h-[600px] bg-[#00000080] p-7 sticky top-24">
              <p className="text-[#FFF] font-[700] text-lg">Report Title:</p>
              {fileName ? <Title name={fileName} /> : null}
              <div className="mt-10">
                <div className="pb-7">
                  <Link
                    href="#original"
                    className="text-[#FFF] font-[400] text-lg active:text-[#FFCB54] active:font-[700]"
                  >
                    Original Song performance
                  </Link>
                </div>
                {reportDataQuery.data?.parameters?.reference ? (
                  <div>
                    <Link
                      href="#reference"
                      className="text-[#FFF] font-[400] text-lg active:text-[#FFCB54] active::font-[700]"
                    >
                      Original vs Reference
                    </Link>
                  </div>
                ) : null}
              </div>
              <div className="flex flex-col absolute mt-16 inset-x-0 gap-8">
                <CustomLink
                  href={`/apphome/${workspace}/sonic-ai/mastering`}
                  className="w-[260px]  shadow-sm mx-auto shadow-nyx-yellow p-3"
                >
                  Master your Song
                </CustomLink>
                <CustomLink
                  href={`/apphome/${workspace}/sonic-ai/analysis-and-compare`}
                  className="w-[260px] shadow-sm mx-auto shadow-nyx-yellow p-3"
                >
                  Compare multiple Track
                </CustomLink>
                <CustomLink
                  href={`/apphome/${workspace}/consultation?categories=music-composer`}
                  className="w-[260px] shadow-sm mx-auto shadow-nyx-yellow p-3"
                >
                  Enhance track with experts
                </CustomLink>
              </div>
            </div>
          </div>
          <div className="w-full max-w-[1050px] bg-[#3B236F]">
            <div className="w-full" id="original">
              {Object.keys(barGraphaData).length > 0 ? (
                <div className="w-full bg-[#3B236F]">
                  <div className="lg:flex items-center justify-between p-7">
                    <p className="text-[#FFF] font-[700] text-lg">
                      NYX AI findings Original Song performance
                    </p>
                    <div className="flex flex-row-reverse mt-4 lg:mt-0">
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
                    </div>
                  </div>

                  <div className="px-4">
                    <Switch
                      offText="Bar Graph"
                      onText="Spider Chart"
                      onChange={setToggle}
                      className="flex flex-row-reverse gap-2"
                    />
                  </div>

                  {Object.keys(barGraphaData).length > 0 ? (
                    toggle === false ? (
                      <div className="mt-10">
                        <div
                          id="legend-container"
                          className="[&>ul]:flex [&>ul]:flex-row [&>ul]:justify-center m-5"
                        ></div>
                        <div className="flex items-start justify-center w-full h-[400px] mb-12">
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
                                      1: {
                                        ...outRef.current[1],
                                        [`${legendItem.text.toLowerCase()}`]:
                                          legendItem.visibility,
                                      },
                                    };
                                    populateData(apiData, outRef.current);
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
                        <div className="overflow-hidden w-full h-[287px] relative">
                          <div className="overflow-y-hidden overflow-x-auto whitespace-nowrap absolute w-full">
                            <RadarChartBox
                              title="Mood"
                              data={barGraphaData.secGraph}
                            />
                            <RadarChartBox
                              title="Properties"
                              data={barGraphaData.thirdGraph}
                            />
                            <RadarChartBox
                              title="Context"
                              data={barGraphaData.fourthGraph}
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="mt-10 flex flex-col gap-24">
                        <div className="ml-20 mr-20 w-[full] h-[330px] [&>ul]:hidden">
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
                                        1: {
                                          ...outRef.current[1],
                                          [`${legendItem.text.toLowerCase()}`]:
                                            false,
                                        },
                                      };
                                      populateData(apiData, outRef.current);
                                    } else {
                                      ci.show(index);
                                      legendItem.hidden = false;
                                      outRef.current = {
                                        ...outRef.current,
                                        1: {
                                          ...outRef.current[1],
                                          [`${legendItem.text.toLowerCase()}`]:
                                            true,
                                        },
                                      };
                                      populateData(apiData, outRef.current);
                                    }
                                  },
                                },
                              },
                            }}
                          />
                        </div>
                        <div className="overflow-hidden w-full h-[330px] relative">
                          <div className="overflow-y-hidden overflow-x-auto whitespace-nowrap absolute w-full">
                            <BarChartBox
                              title="Mood"
                              data={barGraphaData.secGraph}
                            />
                            <BarChartBox
                              title="Properties"
                              data={barGraphaData.thirdGraph}
                            />
                            <BarChartBox
                              title="Context"
                              data={barGraphaData.fourthGraph}
                            />
                          </div>
                        </div>
                      </div>
                    )
                  ) : (
                    <></>
                  )}
                  <div className="mb-0">
                    {/* <div>
                      <img
                        // src={`${IMAGE_URL}/original.png`}
                        src={reportDataQuery.data?.struct_url}
                        alt=""
                        className="w-full max-w-5xl block"
                      />
                    </div> */}
                  </div>
                </div>
              ) : (
                <Loader />
              )}
            </div>
            <div className="md:hidden whitespace-nowrap flex w-full max-w-[992px] bg-[#3B236F] mx-auto py-4 px-4 gap-5">
              <CustomLink
                href={`/apphome/${workspace}/sonic-ai/mastering`}
                className="w-1/2 inline-block text-sm shadow-sm shadow-nyx-yellow"
              >
                Master your Song
              </CustomLink>
              <CustomLink
                href={`/apphome/${workspace}/sonic-ai/analysis-and-compare`}
                className="w-1/2 inline-block text-sm shadow-sm shadow-nyx-yellow"
              >
                Compare Track
              </CustomLink>
            </div>
            <div className="flex justify-center items-center md:hidden">
              <CustomLink
                href={`/apphome/${workspace}/consultation?categories=music-composer`}
                className="w-1/2 inline-block text-sm shadow-sm shadow-nyx-yellow"
              >
                Consult Experts
              </CustomLink>
            </div>
            <div
              className={clsx(
                "w-full",
                reportDataQuery.data?.parameters?.reference ? "" : "hidden",
              )}
              id="reference"
            >
              {Object.keys(barGraphaData).length > 0 ? (
                <div className="w-full bg-[#3B236F] relative">
                  <div className="md:flex items-center justify-between p-7">
                    <p className="text-[#FFF] font-[700] text-lg">
                      NYX AI findings Original Vs Reference
                    </p>
                    <Switch
                      offText="Spider Chart"
                      onText="Bar Graph"
                      onChange={setToggle2}
                    />
                  </div>

                  {Object.keys(barGraphaData).length > 0 ? (
                    <>
                      {!toggle2 ? (
                        <div className="mt-10">
                          <div
                            id="legend-container2"
                            className="flex justify-end px-4 pb-4"
                          ></div>
                          <div className="flex items-start justify-center w-full h-[400px] mb-12">
                            <RadarChart
                              data={barGraphaData.mainGraph1}
                              options={{
                                ...radarOptions,
                                plugins: {
                                  ...radarOptions,
                                  htmlLegend: {
                                    // ID of the container to put the legend in
                                    containerID: "legend-container2",
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
                                        2: {
                                          ...outRef.current[2],
                                          [`${legendItem.text.toLowerCase()}`]:
                                            legendItem.visibility,
                                        },
                                      };
                                      populateData(apiData, outRef.current);
                                    },
                                  },
                                  legend: {
                                    display: false,
                                  },
                                },
                              }}
                              plugins={[htmlLegendPlugin]}
                              className="!w-full"
                            />
                          </div>
                          <div className="overflow-hidden w-full h-[287px]">
                            <div className="overflow-y-hidden overflow-x-auto whitespace-nowrap absolute w-full">
                              <RadarChartBox
                                title="Mood"
                                data={barGraphaData.secGraph1}
                              />
                              <RadarChartBox
                                title="Properties"
                                data={barGraphaData.thirdGraph1}
                              />
                              <RadarChartBox
                                title="Context"
                                data={barGraphaData.fourthGraph1}
                              />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="mt-10 flex flex-col gap-24 ">
                          <div className="ml-20 mr-20 w-[full] h-[330px] [&>ul]:hidden">
                            <BarChart
                              data={barGraphaData.mainGraph1}
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
                                          2: {
                                            ...outRef.current[2],
                                            [`${legendItem.text.toLowerCase()}`]:
                                              false,
                                          },
                                        };
                                        populateData(apiData, outRef.current);
                                      } else {
                                        ci.show(index);
                                        legendItem.hidden = false;
                                        outRef.current = {
                                          ...outRef.current,
                                          2: {
                                            ...outRef.current[2],
                                            [`${legendItem.text.toLowerCase()}`]:
                                              true,
                                          },
                                        };
                                        populateData(apiData, outRef.current);
                                      }
                                    },
                                  },
                                },
                              }}
                            />
                          </div>
                          <div className="overflow-hidden w-full h-[330px]">
                            <div className="overflow-y-hidden overflow-x-auto whitespace-nowrap absolute w-full">
                              <BarChartBox
                                title="Mood"
                                data={barGraphaData.secGraph1}
                              />
                              <BarChartBox
                                title="Properties"
                                data={barGraphaData.thirdGraph1}
                              />
                              <BarChartBox
                                title="Context"
                                data={barGraphaData.fourthGraph1}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <></>
                  )}

                  <div className="mb-10">
                    {/* <div>
                      <img
                        src={reportDataQuery.data?.struct_url}
                        alt=""
                        className="w-full max-w-5xl block"
                      />
                    </div> */}
                    {/* <div>
                      <img
                        src={`${IMAGE_URL}/ref.png`}
                        alt=""
                        className="w-full max-w-5xl block"
                      />
                    </div> */}
                  </div>
                </div>
              ) : (
                <Loader />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-[40%] bg-[#00000080] flex px-4 md:mt-20">
        <div className="w-full max-w-7xl mx-auto md:flex justify-between items-center py-10">
          <p className="text-[#FFF] font-[700] text-base md:text-2xl text-center md:text-left max-w-[508px]">
            Unlock Your Song&apos;s Full Potential with NYX AI-Powered Mastering
          </p>
          <div className="mt-6 md:mt-0 text-center md:text-left">
            <CustomLink
              href={`/apphome/${workspace}/sonic-ai/mastering`}
              className="w-56"
            >
              Click Here
            </CustomLink>
          </div>
        </div>
      </div>
      <div className="text-center my-20">
        <p className="text-[#8297BD] font-[700] text-[45px]">
          Know your track better
        </p>
        <p className="text-[#FFF] font-[600] text-3xl">
          10 parameter to measure that defines the success of your songs
        </p>
      </div>

      <div className="w-full max-w-7xl mx-auto">
        <HowItWorks2 data={HIW} />
      </div>

      <div className="w-full bg-[#00000080] mt-16 xl:mt-24 flex p-10 justify-center">
        <div className="flex flex-col md:flex-row w-[90%] gap-2">
          <div className="flex flex-col w-[90%] md:w-[50%] gap-3">
            <div className="w-full md:w-[50%]">
              <p className="text-[#FFF] font-[300] text-xl md:text-3xl">
                Enhanced Sound, Enhanced Success
              </p>
            </div>
            <div>
              <p className="text-[#FFF] text-base md:text-lg font-[200]">
                Instantly Improve Your Song&apos;s Quality with the support of
                NYX expert consultation service
              </p>
            </div>
          </div>
          <div className="flex items-center md:flex-row-reverse w-full md:w-[50%]">
            <CustomLink
              href={`/apphome/${workspace}/consultation?categories=music-composer`}
              className="w-56"
            >
              Book expert advice
            </CustomLink>
          </div>
        </div>
      </div>
    </section>
  );
}

const ReportsSuspense = () => (
  <Suspense>
    <Reports />
  </Suspense>
);

export default ReportsSuspense;
