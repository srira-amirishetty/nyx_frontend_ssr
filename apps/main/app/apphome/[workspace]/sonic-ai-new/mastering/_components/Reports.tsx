"use client";
import React, { useEffect, useRef, useState, Suspense } from "react";
import RadarChart from "@nyx-frontend/main/charts/RadarChart";
import BarChart from "@nyx-frontend/main/charts/BarChart";
import { radarOptions } from "@nyx-frontend/main/utils/utils";
import { useQuery, useMutation } from "@tanstack/react-query";
import { masteringService } from "@nyx-frontend/main/services/uploadService";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import LoadingFile from "./loader-file";
import CustomLink from "@nyx-frontend/main/components/Link";
import Button from "@nyx-frontend/main/components/Button";
import { useRouter } from "next/navigation";
import { barOptions, ChartBoxBar, ChartBoxRadar } from "./ChartBox";
import { htmlLegendPlugin } from "./CustomLegend";
import { colourStyles3 } from "./optionsStyle";
import Select from "react-select";
import { saveReports } from "./optionsStyle";
import CirclePlay from "./CirclePlay";
import { saveReport } from "@nyx-frontend/main/services/uploadService";
import "./index.css";
import { decodeToken } from "@nyx-frontend/main/utils/utils";
import {
  showOption,
  aiMasteredStyle,
  referenceStyle,
  originalStyle,
} from "./constant";
import {
  manipulateSongName,
  titleCaseKeys,
  titleCaseBreakedKeys,
} from "@nyx-frontend/main/utils/textUtils";
import Switch from "@nyx-frontend/main/components/Switch";
import {
  ChartDataType,
  Wavesurfer,
  showOptionType,
  smallChartType,
} from "./types";
import { valueFull } from "@nyx-frontend/main/utils/numberUtils";
import PageHeader from "./PageHeader";
import CustomModal from "@nyx-frontend/main/components/CustomModal";
import WaveCustom from "./WaveCustom";
import CustomPlayer from "./CustomeAudioPlayer";

const smallChartData = ({
  key,
  options,
  original,
  ai_mastered_parameters,
  reference,
  titles = null,
}: smallChartType) => {
  return {
    labels: titleCaseBreakedKeys(titles ? titles : original.group[key]),
    datasets: [
      {
        label: "AI-Mastered",
        data: [
          ...(options["ai-mastered"]
            ? valueFull(ai_mastered_parameters.group[key])
            : []),
        ],
        ...aiMasteredStyle,
      },
      {
        label: "Original",
        data: [...(options.original ? valueFull(original.group[key]) : [])],
        ...originalStyle,
      },
      {
        label: "Reference",
        data: [...(options.reference ? valueFull(reference.group[key]) : [])],
        ...referenceStyle,
      },
    ],
  };
};

const MasterReport = ({ uploadId }: any) => {
  const [toggle, setToggle] = useState(true);
  const searchParams = useSearchParams();
  const router = useRouter();
  const outRef = useRef<showOptionType>(showOption);
  const [isPlayingOriginal, setIsPlayingOriginal] = useState(false);
  const [isPlayingMastered, setIsPlayingMastered] = useState(false);
  const [failed, setFailed] = useState(false);
  const [workspace, setWorkspace] = useState<any>("");
  const [barGraphaData, setGraphaData] = useState<ChartDataType>({});

  const apiData = useQuery({
    queryKey: ["song_details", uploadId],
    queryFn: async () => {
      if (uploadId) {
        return masteringService({
          uploadId: uploadId,
          workspace_id: localStorage.getItem("workspace_id"),

          // user_id: decodeToken(localStorage.getItem("token")).data.userId,
          // uploadId: uploadId,
          // id: uploadId,
          // generate_id: uploadId,
          // workspace_id: localStorage.getItem("workspace_id"),
        });
      } else {
        console.log("Found key as blank");
      }
    },
    refetchInterval: (data) => {
      return !Object.keys(data.state?.data?.nyx_mastered ?? {}).length
        ? 3000
        : false;
    },
  });

  useEffect(() => {
    if (
      apiData.isSuccess &&
      Object.keys(apiData.data?.nyx_mastered ?? {}).length
    ) {
      populateData(apiData.data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiData.isSuccess, apiData.data?.nyx_mastered]);

  useEffect(() => {
    if (apiData.isError) {
      //@ts-ignore
      const errorMessage = apiData.error?.response?.data?.errors?.message;
      if (
        errorMessage ===
        "Mastering request failed, 4005: The TARGET and REFERENCE files are the same. They must be different so that Matchering makes sense"
      ) {
        setFailed(true);
      }
    }
  }, [apiData.isError, apiData.error]);

  useEffect(() => {
    const work = localStorage.getItem("workspace_name");
    setWorkspace(work);
  }, []);

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
    options: showOptionType = showOption,
  ) => {
    if (!Object.keys(response?.nyx_mastered ?? {}).length) {
      toast.error("Oops there is not data.");
      return;
    }

    const ai_mastered_parameters =
      apiData.data?.nyx_mastered?.parameters?.ai_mastered_parameters;
    const original = apiData.data?.nyx_mastered?.parameters?.original;
    const reference = apiData.data?.nyx_mastered?.parameters?.reference;

    const keys = ["mood", "properties", "context"];

    const firstData = {
      labels: keys.map((key) => titleCaseKeys(original?.group[key])).flat(),
      datasets: [
        {
          label: "AI-Mastered",
          data: keys
            .map((key) => valueFull(ai_mastered_parameters?.group[key]))
            .flat(),
          ...aiMasteredStyle,
        },
        {
          label: "Original",
          data: keys.map((key) => valueFull(original?.group[key])).flat(),
          ...originalStyle,
        },
        {
          label: "Reference",
          data: keys.map((key) => valueFull(reference?.group[key])).flat(),
          ...referenceStyle,
        },
      ],
    };

    const secondData = smallChartData({
      key: "mood",
      options,
      original,
      ai_mastered_parameters,
      reference,
    });

    const thirdData = smallChartData({
      key: "properties",
      options,
      original,
      ai_mastered_parameters,
      reference,
    });

    const newLive = {
      ...original?.group?.context,
      "Vibe Intensity": original?.group?.context?.live_performance_energy,
    };
    // delete newLive.live_performance_energy;

    const forthData = smallChartData({
      key: "context",
      options,
      original,
      ai_mastered_parameters,
      reference,
      titles: newLive,
    });

    setGraphaData({
      mainGraph: firstData,
      secGraph: secondData,
      thirdGraph: thirdData,
      fourthGraph: forthData,
    });
  };

  const handleDownloadMasterTrack = (e: any) => {
    let song_name = apiData.data?.nyx_mastered?.songName;
    song_name = song_name.substring(0, song_name.lastIndexOf(".")) || song_name;
    const mp3SongUrl =
      apiData.data?.nyx_mastered?.mastered?.ai_mastered_song_mp3?.url;
    const wavSongUrl =
      apiData.data?.nyx_mastered?.mastered?.ai_mastered_song_wav?.url;
    const wavHDSongUrl =
      apiData.data?.nyx_mastered?.mastered?.ai_mastered_song_hd_wav?.url;

    let downloadLink = document.createElement("a");

    if (e.value === ".mp3") {
      downloadLink.href = mp3SongUrl;
    } else if (e.value === ".wav") {
      downloadLink.href = wavSongUrl;
    } else if (e.value === "_hd.wav") {
      downloadLink.href = wavHDSongUrl;
    }
    downloadLink.download = "mastered_" + song_name + e.value;
    downloadLink.target = "_blank";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const onClickOriginal = () => {
    setIsPlayingOriginal(true);
  };

  const onClickMastered = () => {
    setIsPlayingMastered(true);
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
      uploadId: Number(searchParams.get("uploadId")),
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
  const downloadOption = [
    {
      value: ".mp3",
      label: `MP3 (${(
        apiData.data?.nyx_mastered?.mastered?.ai_mastered_song_mp3?.size /
        1048576
      ).toFixed(2)} MB)`,
    },
    {
      value: ".wav",
      label: `WAV (${(
        apiData.data?.nyx_mastered?.mastered?.ai_mastered_song_wav?.size /
        1048576
      ).toFixed(2)} MB)`,
    },
    {
      value: "_hd.wav",
      label: `WAV HD (${(
        apiData.data?.nyx_mastered?.mastered?.ai_mastered_song_hd_wav?.size /
        1048576
      ).toFixed(2)} MB)`,
    },
  ];
  return (
    <>
      <div className="w-full">
        {/* <div className="flex flex-col w-full h-full gap-3">
          <div className="w-full h-[90%] rounded-3xl bg-[#00000080] p-2 relative">
            <div className="flex flex-col md:justify-between md:flex-row pt-5 pb-12 gap-2 md:gap-0">
              <div>
                <p className="text-[#FFF] font-[500] md:text-lg sm:text-base text-center md:text-justify">
                  Detailed track analysis - powered by NYX AI
                </p>
                <p className="text-[#FFF] font-[300] text-sm">
                  {apiData.data?.nyx_mastered?.songName}
                </p>
              </div>
              <div className="flex flex-col gap-3 mt-4 lg:mt-0">
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
                  onChange={() => setToggle(!toggle)}
                />
              </div>
            </div>
            {Object.keys(barGraphaData).length > 0 ? (
              toggle ? (
                <div className="lg:flex">
                  <div className="w-full lg:w-[calc(100%-260px)] relative">
                    <div className="w-full h-[360px] mt-[-50px] left-0">
                      <RadarChart
                        data={barGraphaData.mainGraph}
                        options={{
                          ...radarOptions,
                          plugins: {
                            ...radarOptions,
                            htmlLegend: {
                              
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
                                  [`${legendItem.text.toLowerCase()}`]:
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
                  </div>
                  <div
                    id="legend-container"
                    className=" absolute bottom-0"
                  ></div>
                  
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
                                  [`${legendItem.text.toLowerCase()}`]: false,
                                };
                                populateData(apiData.data, outRef.current);
                              } else {
                                ci.show(index);
                                legendItem.hidden = false;
                                outRef.current = {
                                  ...outRef.current,
                                  [`${legendItem.text.toLowerCase()}`]: true,
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
              <div className="w-full">
                <LoadingFile height={450} />
              </div>
            )}
          </div>
        </div> */}
        <div className="w-full my-2 flex flex-col gap-2">
          <CustomPlayer
            name={"Original Song"}
            url={
              apiData.data?.nyx_mastered?.mastered?.original_song.url
            }
          />

          <CustomPlayer
            name={"Reference Song"}
            url={
              apiData.data?.nyx_mastered?.mastered?.ref_song.url
            }
          />

          <CustomPlayer
            name={"Enhanced Song"}
            url={
              apiData.data?.nyx_mastered?.mastered?.ai_mastered_song_hd_wav.url
            }
          />
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
              </svg>
              <span className="sr-only">Like</span>
            </button>
            <div className="absolute top-[-30px] text-center text-[#FFFFFF] hidden group-hover/button:block duration-300 pointer-events-none bg-black text-xs w-max p-1 rounded-md">
              Like
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MasterReport;
