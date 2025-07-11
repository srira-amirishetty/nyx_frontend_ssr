"use client";
import React, { useEffect, useRef, useState, Suspense } from "react";
import RadarChart from "@nyx-frontend/main/charts/RadarChart";
import BarChart from "@nyx-frontend/main/charts/BarChart";
import { radarOptions } from "@nyx-frontend/main/utils/utils";
import { useQuery, useMutation } from "@tanstack/react-query";
import { masteringService } from "@nyx-frontend/main/services/uploadService";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import LoadingFile from "../analysis-and-compare/loader-file";
import CustomLink from "@nyx-frontend/main/components/Link";
import Button from "@nyx-frontend/main/components/Button";
import { useRouter } from "next/navigation";
import { barOptions, ChartBoxBar, ChartBoxRadar } from "./ChartBox";
import { htmlLegendPlugin } from "./CustomLegend";
import { colourStyles3 } from "../optionsStyle";
import Select from "react-select";
import { saveReports } from "../optionsStyle";
import CirclePlay from "./CirclePlay";
import { saveReport } from "@nyx-frontend/main/services/uploadService";

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

const MasterReport = () => {
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
    queryKey: ["song_details", searchParams.get("uploadId")],
    queryFn: async () => {
      const id = searchParams.get("uploadId");
      if (id) {
        return masteringService({
          uploadId: searchParams.get("uploadId"),
          workspace_id: localStorage.getItem("workspace_id"),
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
      <PageHeader />

      {failed ? (
        <div className="flex flex-col justify-center items-center w-full h-full">
          <div className="w-full md:w-[92%] h-auto rounded-3xl bg-[#00000080] my-5 p-2 md:p-4">
            <div className="w-auto h-auto rounded-3xl bg-[#3B236F] p-3">
              <p className="text-white font-medium text-lg text-center">
                Mastering request failed : The TARGET and REFERENCE files are
                the same. Please try again .
              </p>
              <div className="w-full flex justify-center items-center my-5">
                <Button
                  className="text-sm font-semibold text-[#FFCB54] rounded-full px-10 hover:shadow-none"
                  onClick={() =>
                    router.push(`/apphome/${workspace}/sonic-ai/mastering`)
                  }
                >
                  Upload Again
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center w-full h-full">
          <div className="w-full md:w-[92%]  h-auto rounded-3xl bg-[#00000080] my-5 p-2 md:p-4">
            <div className="w-auto h-auto rounded-3xl bg-[#3B236F] p-3">
              <div className="flex flex-col md:justify-between md:flex-row p-7 gap-2 md:gap-0">
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
                      {/* <div id="legend-container"></div> */}
                    </div>
                    <div className="w-full flex lg:block lg:w-[360px] h-auto relative overflow-x-auto md:overflow-x-hidden">
                      <ChartBoxRadar
                        title="Mood"
                        data={barGraphaData.secGraph}
                      />
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
                <div className="animate-pulse flex min-h-[500px] w-full bg-[rgba(4,20,20,0.4)] overflow-hidden">
                  <div className="w-full min-h-[500px] lg:w-[calc(100%-320px)]">
                    <LoadingFile height={690} />
                  </div>
                  <div className="w-full flex lg:block lg:w-[320px] h-auto relative overflow-x-auto md:overflow-x-hidden">
                    <LoadingFile height={230} width={331} />
                    <LoadingFile height={230} width={331} />
                    <LoadingFile height={230} width={331} />
                  </div>
                </div>
              )}
            </div>
            <div className=""></div>
          </div>
          <div className="flex gap-5 w-auto justify-center items-center">
            <CirclePlay
              onClick={onClickOriginal}
              title="Original"
              name={manipulateSongName(apiData.data?.nyx_mastered?.songName)}
              isPlaying={isPlayingOriginal}
            />
            <CirclePlay
              onClick={onClickMastered}
              title="Mastered"
              name={manipulateSongName(apiData.data?.nyx_mastered?.songName)}
              isPlaying={isPlayingMastered}
              className="bg-[#75DE64]"
            />
          </div>
          <div className="w-[90%] flex justify-center gap-6 my-10">
            <Select
              options={downloadOption}
              instanceId={"download"}
              placeholder="Download Master Track"
              styles={colourStyles3}
              components={{
                IndicatorSeparator: () => null,
              }}
              onChange={handleDownloadMasterTrack}
            />
          </div>
          <div className="w-full bg-[#00000080] flex p-10 justify-center">
            <div className="flex flex-col md:flex-row w-[90%] gap-2">
              <div className="flex flex-col w-[90%] md:w-[50%] gap-3">
                <div className="w-full md:w-[50%]">
                  <p className="text-[#FFF] font-[300] text-xl md:text-3xl">
                    Enhanced Sound, Enhanced Success
                  </p>
                </div>
                <div>
                  <p className="text-[#FFF] text-base md:text-lg font-[200]">
                    Instantly Improve Your Song&apos;s Quality with the support
                    of NYX expert consultation service
                  </p>
                </div>
              </div>
              <div className="flex items-center md:flex-row-reverse w-full md:w-[50%]">
                <CustomLink
                  href={`/apphome/${workspace}/consultation?categories=music-composer`}
                  className="shadow-sm shadow-nyx-yellow p-3 h-[46px]"
                >
                  Book expert advice
                </CustomLink>
              </div>
            </div>
          </div>
        </div>
      )}

      {isPlayingOriginal ? (
        <CustomModal onClose={() => setIsPlayingOriginal(false)}>
          <div>
            <WaveCustom
              title={apiData.data?.nyx_mastered?.songName}
              url={apiData.data?.nyx_mastered?.mastered?.original_song.url}
              id="waveOriginal"
            />
          </div>
        </CustomModal>
      ) : null}
      {isPlayingMastered ? (
        <CustomModal onClose={() => setIsPlayingMastered(false)}>
          <div>
            <WaveCustom
              title={apiData.data?.nyx_mastered?.songName}
              url={
                apiData.data?.nyx_mastered?.mastered?.ai_mastered_song_hd_wav
                  .url
              }
              id="waveMastered"
            />
          </div>
        </CustomModal>
      ) : null}
    </>
  );
};

const MasterReportSuspense = () => (
  <Suspense>
    <MasterReport />
  </Suspense>
);

export default MasterReportSuspense;
