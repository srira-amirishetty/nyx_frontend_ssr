"use client";

import React, { useState, useEffect, useRef } from "react";
import Button from "@nyx-frontend/main/components/Button";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getAnalysisService,
  getAnalysisCompareService,
} from "@nyx-frontend/main/services/uploadService";
import Select from "react-select";
import RadarChart from "@nyx-frontend/main/charts/RadarChart";
import BarChart from "@nyx-frontend/main/charts/BarChart";
import { radarOptions } from "@nyx-frontend/main/utils/utils";
import "@nyx-frontend/main/css/uploadsong.css";
import { useRouter, useSearchParams } from "next/navigation";

import { toast } from "react-toastify";
import LoadingFile from "./loader-file";

import { barOptions, ChartBoxBar, ChartBoxRadar } from "./ChartBox";
import { htmlLegendPlugin } from "./CustomLegend";
import Table from "./Table";
import Switch from "@nyx-frontend/main/components/Switch";
import { titleCaseBreakedKeys, titleCaseKeys } from "@nyx-frontend/main/utils/textUtils";
import { valueFull } from "@nyx-frontend/main/utils/numberUtils";
import { saveReports } from "./optionsStyle";
import { saveReport } from "@nyx-frontend/main/services/uploadService";

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
        return getAnalysisCompareService(
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
    <div className="w-full flex flex-col gap-3 h-full">
      <div className="w-full h-full rounded-3xl bg-[#00000080] p-2 md:p-4 relative">
        <div>
          <div className="flex flex-col md:flex-row items-center justify-between p-7">
            <div>
              <p className="text-[#FFF] font-[500] text-[18px]">
                NYX AI findings Original Song performance
              </p>
              <p className="text-[#FFF] font-[300] text-sm">
                {apiData.data?.nyx_upload_token?.songName}
              </p>
            </div>
            <div className="flex flex-row md:flex-col gap-3 mt-4 lg:mt-0">
              {/* <Select
                options={saveOption}
                instanceId={"download"}
                placeholder="Save Report"
                styles={saveReports}
                components={{
                  IndicatorSeparator: () => null,
                }}
                onChange={selectSaveOption}
              /> */}
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
                  <div className="w-full lg:w-[calc(100%-260px)] relative  ">
                    <div className="w-full h-[360px] ] left-0">
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
                  <div
                    id="legend-container"
                    className=" absolute bottom-6"
                  ></div>
                  {/* <div id="legend-container"></div> */}
                  <div className="w-full flex lg:block lg:w-[260px] h-auto absolute right-0 overflow-x-auto md:overflow-x-hidden max-h-[465px] overflow-hidden overflow-y-auto">
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
                <div className="w-full flex lg:block lg:w-[260px] h-auto absolute right-0 overflow-x-auto md:overflow-x-hidden max-h-[465px] overflow-hidden overflow-y-auto chartbox-bar-ul">
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
              className="animate-pulse flex w-full"
              style={{ background: "rgba(4, 20, 20, 0.4)" }}
            >
              <div className="flex-grow ">
                <LoadingFile height={500} />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="w-full h-auto rounded-full bg-black p-2 flex gap-2 justify-center items-center">
        <Button className="text-sm font-semibold text-[#FFCB54] rounded-full hover:shadow-none">
          Predict music success
        </Button>
        <Button className="text-sm font-semibold text-[#FFCB54] rounded-full hover:shadow-none">
          Analyze your music
        </Button>
        <Button className="text-sm font-semibold text-[#FFCB54] rounded-full hover:shadow-none">
          Consult Experts
        </Button>

        <div className="relative group/button">
          <button
            className={`text-[#FFFFFF] border rounded-full p-2 focus:outline-none hover:bg-nyx-sky hover:border-nyx-sky active:bg-nyx-sky active:border-nyx-sky`}
            // onClick={() => {
            //   downLoadButtonClick({
            //     activeId: tabId,
            //     activeIndex: activeIndex,
            //     index: imageIndex,
            //     details: imageurl[imageIndex],
            //   });
            //   handleDownload(imageurl[imageIndex].image);
            // }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 16L7 11L8.4 9.55L11 12.15V4H13V12.15L15.6 9.55L17 11L12 16ZM6 20C5.45 20 4.97917 19.8042 4.5875 19.4125C4.19583 19.0208 4 18.55 4 18V15H6V18H18V15H20V18C20 18.55 19.8042 19.0208 19.4125 19.4125C19.0208 19.8042 18.55 20 18 20H6Z"
                fill={true ? "white" : "white"}
              />
            </svg>
          </button>
          <div className="absolute top-[-30px] text-center text-[#FFFFFF] hidden group-hover/button:block duration-300 pointer-events-none bg-black text-xs w-max p-1 rounded-md">
            Download
          </div>
        </div>

        <div className="relative group/button">
          <button
            data-testid="save"
            className={` text-[#FFFFFF] border rounded-full p-2 focus:outline-none hover:bg-nyx-sky hover:border-nyx-sky active:bg-nyx-sky active:border-nyx-sky`}
            // onClick={() =>
            //   saveButtonClicked({
            //     activeId: tabId,
            //     activeIndex: activeIndex,
            //     index: imageIndex,
            //     details: imageurl[imageIndex],
            //   })
            // }
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 20C3.45 20 2.97917 19.8042 2.5875 19.4125C2.19583 19.0208 2 18.55 2 18V6C2 5.45 2.19583 4.97917 2.5875 4.5875C2.97917 4.19583 3.45 4 4 4H10L12 6H20C20.55 6 21.0208 6.19583 21.4125 6.5875C21.8042 6.97917 22 7.45 22 8V18C22 18.55 21.8042 19.0208 21.4125 19.4125C21.0208 19.8042 20.55 20 20 20H4ZM4 18H20V8H11.175L9.175 6H4V18Z"
                fill={true ? "white" : "white"}
              />
            </svg>
            <span className="sr-only">Save</span>
          </button>
          <div className="absolute top-[-30px] text-center text-[#FFFFFF] hidden group-hover/button:block duration-300 pointer-events-none bg-black text-xs w-max p-1 rounded-md">
            Save
          </div>
        </div>

        <div className="relative group/button">
          <button
            data-testid="dislike"
            className={`focus:text-black text-[#FFFFFF] border rounded-full p-2 focus:outline-none ${
              true ? "bg-nyx-sky border-nyx-sky" : "border-[#FFFFFF]"
            }`}
            // onClick={() =>
            //   hitDisLikeButton({
            //     activeId: tabId,
            //     activeIndex: activeIndex,
            //     index: imageIndex,
            //     details: imageurl[imageIndex],
            //   })
            // }
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 21 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 0H16V13L9 20L7.75 18.75C7.63333 18.6333 7.5375 18.475 7.4625 18.275C7.3875 18.075 7.35 17.8833 7.35 17.7V17.35L8.45 13H2C1.46667 13 1 12.8 0.6 12.4C0.2 12 0 11.5333 0 11V9C0 8.88333 0.0166667 8.75833 0.05 8.625C0.0833333 8.49167 0.116667 8.36667 0.15 8.25L3.15 1.2C3.3 0.866667 3.55 0.583333 3.9 0.35C4.25 0.116667 4.61667 0 5 0ZM14 2H5L2 9V11H11L9.65 16.5L14 12.15V2ZM16 13V11H19V2H16V0H21V13H16Z"
                fill={true ? "white" : "white"}
              />
            </svg>
            <span className="sr-only">Dislike</span>
          </button>
          <div className="absolute top-[-30px] text-center text-[#FFFFFF] hidden group-hover/button:block duration-300 pointer-events-none bg-black text-xs w-max p-1 rounded-md">
            Dislike
          </div>
        </div>

        <div className="relative group/button">
          <button
            data-testid="like"
            className={`focus:text-black text-[#FFFFFF] border rounded-full p-2 focus:outline-none ${
              true ? "bg-nyx-sky border-nyx-sky" : "border-[#FFFFFF]"
            }`}
            // onClick={() =>
            //   hitLikeButton({
            //     activeId: tabId,
            //     activeIndex: activeIndex,
            //     index: imageIndex,
            //     details: imageurl[imageIndex],
            //   })
            // }
          >
            <svg
              width="21"
              height="21"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 21.5H7V8.5L14 1.5L15.25 2.75C15.3667 2.86667 15.4625 3.025 15.5375 3.225C15.6125 3.425 15.65 3.61667 15.65 3.8V4.15L14.55 8.5H21C21.5333 8.5 22 8.7 22.4 9.1C22.8 9.5 23 9.96667 23 10.5V12.5C23 12.6167 22.9833 12.7417 22.95 12.875C22.9167 13.0083 22.8833 13.1333 22.85 13.25L19.85 20.3C19.7 20.6333 19.45 20.9167 19.1 21.15C18.75 21.3833 18.3833 21.5 18 21.5ZM9 19.5H18L21 12.5V10.5H12L13.35 5L9 9.35V19.5ZM7 8.5V10.5H4V19.5H7V21.5H2V8.5H7Z"
                fill={true ? "white" : "white"}
              />
              <span className="sr-only">Like</span>
            </svg>
          </button>
          <div className="absolute top-[-30px] text-center text-[#FFFFFF] hidden group-hover/button:block duration-300 pointer-events-none bg-black text-xs w-max p-1 rounded-md">
            Like
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisGraph;
