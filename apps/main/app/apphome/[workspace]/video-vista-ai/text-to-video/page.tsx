/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from "react";
import CreativeType from "./CreativeType";
import VideoSettings from "./VideoSettings";
import BrandPainting from "./BrandPainting";
import Campaign from "./Campaign";
import Branding from "./Branding";
import VideoContent from "./VideoContent";
import Sidebar from "@nyx-frontend/main/components/Sidebar";
import TopBar from "@nyx-frontend/main/components/TopBar";
import { toast } from "react-toastify";
import Steper from "./Steper";
import { useRouter, useParams } from "next/navigation";
import {
  getbrandServiceonbording,
  addCampaignService,
} from "@nyx-frontend/main/services/brandService";
import { BRAND_TABS_Three } from "@nyx-frontend/main/utils/productConstants";
import {
  getCampaignWithId,
  videoGeneration,
  generateStatus,
} from "@nyx-frontend/main/services/videoGenerationServices";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import VideoChangeButtons from "./VideoChangeButtons";
import ImageLoader from "./Imageloader";
import ReactPlayer from "react-player";
import Button from "@nyx-frontend/main/components/Button";
import AnimateText from "./_components/AnimateText";
import { useSearchParams } from "next/navigation";
import ButtonLoading from "./ButtonLoading";
import "../../../../../css/toolResponsive.css";
import LandscapePopup from "../../../LandscapePopUp";
import { paymentWarningStyle, editVideoPopup } from "@nyx-frontend/main/utils/modalstyles";
import Modal from "react-modal";
import {
  getAvailableCredit,
  getWorkspaceDetailsById,
} from "@nyx-frontend/main/services/workSpace";
import "react-toastify/dist/ReactToastify.css";
import "@nyx-frontend/main/app/_components/toastifyTest/toastify.css";
import Profileicon from "@nyx-frontend/main/components/Profileicon";
import ChatEditor from '@nyx-frontend/main/components/edit-video/ChatEditor';

// Type definition for ChatEditor props
interface ChatEditorProps {
  fileId: any;
  videoId: any;
  videoDetails: any;
  onClose: (data: any) => void;
}

const Page = () => {
  const search = useSearchParams();
  const edit = search.get("edit");
  const [tab, setBrandTab] = useState<string>(BRAND_TABS_Three.BRANDING);
  const [brandId, setBrandId] = useState<any>();
  const [creditFailed, setCreditFailed] = useState(false);
  const [campignapidata, setcampignapidata] = useState<any>();
  const [campaignId, setCampaingnId] = useState<number>();
  const [promptdesc, setPromptDesc] = useState<string>("");
  const [videoScreen, SetVideoScreen] = useState<number>(0);
  const [brandDone, setBrandDone] = useState<any>(false);
  const [campaignDone, setCampaignDone] = useState<any>(false);
  const [videoConDone, setVideoConDone] = useState<any>(false);
  const [creativeDone, setCreativeDone] = useState<any>(false);
  const [videoSetDone, setVideoSetDone] = useState<any>(false);
  const [brandPaintDone, setBrandPaintDone] = useState<any>(false);
  const router = useRouter();
  const [targetGrp, setTargetGrp] = useState<any>([]);
  const [productName, setProductName] = useState<any>(null);
  const [productDis, setProductDis] = useState<any>(null);
  const [video, setVideo] = useState<any>(false);
  const [captions, setCaptions] = useState<any>();
  const [videoId, setVideoId] = useState<Number>();
  const [prevBrand, setPrevBrand] = useState<any>();
  const [taskId, setTaskId] = useState<any>(null);
  const [longScript, setLongScript] = useState<any>();
  const queryClient = useQueryClient();
  const [videoDetails, setVideoDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<any>(false);
  const [error, setError] = useState<any>(false);
  const [videoDuration, setVideoDuration] = useState<any>(null);
  const [creditError, setCreditError] = useState(false);
  const [editVideo, setEditVideo] = useState(false);
  const params = useParams();

  const mutateAddCampaign = useMutation({
    mutationKey: ["add-campign"],
    mutationFn: addCampaignService,
  });

  const [generate, setGenerate] = useState<number>(0);
  function callapifromallcomp(data: any) {
    mutateAddCampaign.mutate(data, {
      onSuccess: (response: any) => {
        setcampignapidata(response);
      },
    });
  }
  const settingProductName = (val: any) => {
    setProductName(val);
  };

  const settingProductDis = (val: any) => {
    setProductDis(val);
  };
  const settingDuration = (val: any) => {
    setVideoDuration(val);
  };

  const settingLongScript = (val: any) => {
    setLongScript(val);
  };

  useEffect(() => {
    if (prevBrand != brandId) {
      setCampaignDone(false);
      setVideoConDone(false);
      setCreativeDone(false);
      setBrandPaintDone(false);
      setVideoSetDone(false);
      setGenerate(0);
    }
  }, [prevBrand, brandId]);

  const settingTarget = (val: any) => {
    setTargetGrp(val);
  };

  useEffect(() => {
    const storage = localStorage.getItem("token");
    if (storage) {
    } else {
      router.push("/apphome/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  const selectedBrandFromBranding = (id: any) => {
    setBrandId(id);
  };

  const settingGen = (id: any) => {
    setGenerate(id);
  };

  const setPrompt = (val: string) => {
    setPromptDesc(val);
  };

  const selectCampaignId = (id: any) => {
    setCampaingnId(id);
  };
  const { data: brandDetails } = useQuery({
    queryKey: ["getProduct2", brandId],
    queryFn: () => {
      if (brandId) {
        return getbrandServiceonbording(brandId);
      }

      return null;
    },
  });

  const settingBrandDone = (val: any) => {
    setBrandDone(val);
  };

  const settingCampaignDone = (val: any) => {
    setCampaignDone(val);
  };

  const settingVideoConDone = (val: any) => {
    setVideoConDone(val);
  };

  const settingCreativeDone = (val: any) => {
    setCreativeDone(val);
  };

  const settingVideoset = (val: any) => {
    setVideoSetDone(val);
  };

  const settingBrandPaint = (val: any) => {
    setBrandPaintDone(val);
  };

  const { data: campaignDetails, refetch: refetchCampaignDetails } = useQuery({
    queryKey: ["getProducttt"],
    queryFn: () => {
      if (campaignId) {
        return getCampaignWithId(campaignId);
      }
      return null;
    },
    enabled: false,
  });

  const {
    data: availableCredit,
    refetch: creditRefetching,
    isRefetching,
    isRefetchError,
  } = useQuery({
    queryKey: ["text-to-video-credit-change"],
    queryFn: () => {
      return getAvailableCredit(Number(localStorage.getItem("workspace_id")));
    },
  });

  const generateBtn = async (isGenerating: boolean = false) => {
    let structuredData;
    const storedData = localStorage.getItem("structuredCreditData");
    if (storedData) {
      // Parse the JSON string back into an object
      structuredData = JSON.parse(storedData);
    }

    // Get the fresh credit data from the refetch
    const { data: refetchedCredit } = await creditRefetching();

    if (
      refetchedCredit?.availableCredits >
      structuredData["TEXT_VIDEO_GENERATION"].credits_generation *
      videoDuration &&
      !isRefetchError
    ) {
      if (generate == 1 || isGenerating) {
        setVideo(false);
        setError(false);
        SetVideoScreen(1);
        try {
          const { data: campDetail } = await refetchCampaignDetails();

          const data = {
            workspace_id: campDetail?.workspace_id,
            campaignId: campaignId,

            script: {
              Image_Script: longScript ? longScript : "",
              Audio_Script: campDetail?.script,
            },
            brand_plate: campDetail?.brand_painting?.brand_plate,
            video_setting: campDetail?.video_settings,
            video_content: {
              video_size: {
                resolution: campDetail?.video_content?.video_size?.resolution,
                orientation: campDetail?.video_content?.video_size?.orientation,
              },
              video_image_type: campDetail?.video_content?.video_structure,
            },
            BrandInfo: {
              BrandName: brandDetails?.brand_name,
              BrandDescription: brandDetails?.description,
              BrandCategory: brandDetails?.cat_name,
              TargetGroup: targetGrp.map((targetGroup: any) => ({
                age: targetGroup.age_group,
                region: targetGroup.region,
                gender: targetGroup.gender,
              })),
            },
            Event: "Any",
            VideoDuration: videoDuration,
            VideoDescription: campDetail?.script,

            // campaignId: campaignId,
            // VideoDescription: campDetail?.objective !== "" ? campDetail?.objective : undefined,
            // script:{
            //   "Image_Script": longScript,
            //   "Audio_Script": campDetail?.script

            // },

            // BrandInfo: {
            //   user_id: campDetail?.user_id,

            //   BrandLogo: null,

            // },
            // FirstSlate: campDetail?.brand_painting?.brand_plate?.start_img?campDetail?.brand_painting?.brand_plate?.start_img:null,
            // EndSlate: campDetail?.brand_painting?.brand_plate?.end_img ?campDetail?.brand_painting?.brand_plate?.end_img:null,
            // Captions:  campDetail?.video_settings?.captions ,

            // Orientation: campDetail?.video_content?.video_size?.orientation,
            // Resolution: campDetail?.video_content?.video_size?.resolution,
            // FPS: 30,
            // transition_duration: 0.2,
            // workspace_id:""
          };

          mutateVideoGeneration.mutate(data, {
            onSuccess: (response: any) => {
              setTaskId(response?.task_id);
              mutateVideo.mutate(response?.task_id);
              setIsLoading(true);
            },
            onError: (res: any) => {
              console.log(res);
              toast.error(
                <>
                  <span className="text-white text-[20px]">Bad Request</span>
                  <br />
                  <span className="text-white text-[16px]">
                    {res?.response?.data?.message}
                  </span>
                  <br />
                </>,
                { autoClose: 5000 }
              );
              setGenerate(1);
            },
          });
        } catch (error) {
          console.error("Error:", error);
          setGenerate(1);
        }
      }
    } else if (
      refetchedCredit?.availableCredits <=
      structuredData["TEXT_VIDEO_GENERATION"].credits_generation *
      videoDuration &&
      !isRefetchError
    ) {
      setCreditFailed(true);
    } else {
      setCreditError(true);
    }
  };

  const mutateVideoGeneration = useMutation({
    mutationKey: ["videogenerate"],
    mutationFn: videoGeneration,
  });

  const mutateVideo = useMutation({
    mutationKey: ["videoDeta"],
    mutationFn: generateStatus,
    onSuccess: (res) => {
      if (res.status === "in_progress") {
        setTimeout(() => {
          mutateVideo.mutate(taskId);
        }, 30000);
      } else if (res?.status === "completed") {
        setIsLoading(false);
        setError(false);
        setVideoId(res?.file_id);
        setVideo(true);
        setVideoDetails(res);
        localStorage.setItem("videoDetails", JSON.stringify(res));
        setGenerate(1);
      } else {
        setIsLoading(false);
        setError(true);
        setVideo(false);
        setGenerate(1);
      }
    },
    onError: (res: any) => {
      toast.error(
        <>
          <span className="text-white text-[20px]">Bad Request</span>
          <br />
          <span className="text-white text-[16px]">
            {res?.response?.data?.message}
          </span>
          <br />
        </>,
        { autoClose: 5000 }
      );
      setIsLoading(false);
      setError(true);
      setVideo(false);
      setGenerate(1);
    },
  });
  const SECOND = 1000;
  const MINUTE = SECOND * 60;

  const texts = [
    { name: "Generating image based on your script", time: MINUTE * 1 },
    { name: "Creating animations on the image", time: MINUTE * 1.5 },
    { name: "Merging audio and animations in the video", time: MINUTE * 1 },
    { name: "Generating final video", time: Infinity },
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

  const onCloseEditVideo = (data: any) => {
    setVideoDetails({ ...videoDetails, file_details: data })
    setEditVideo(false)
  }

  useEffect(() => {
    if (edit) {
      let videoDetails = localStorage.getItem("videoDetails");
      if (videoDetails) {
        setVideo(true);
        SetVideoScreen(1);
        setVideoDetails(JSON.parse(videoDetails));
      }
    }
  }, [edit])

  return (
    <>
      <div className="justify-start flex w-full bg-[#130828]">
        <Sidebar />
        <div className="w-full overflow-hidden overflow-y-auto h-[100vh]">
          <TopBar title="VideoVista Script-to-Video" />
          <div className="w-full py-2 px-2">
            <div className="flex w-full gap-2 justify-center right_side_tool">
              {/* left */}
              <div className="tool-left-panel w-full flex flex-col justify-between p-2 gap-4 overflow-hidden overflow-y-auto -mt-2">
                <div className="flex flex-col gap-2">
                  <Branding
                    tab={tab}
                    setBrandTab={setBrandTab}
                    selectedBrandFromBranding={selectedBrandFromBranding}
                    settingBrandDone={settingBrandDone}
                  />
                  <Campaign
                    brandDone={brandDone}
                    tab={tab}
                    setBrandTab={setBrandTab}
                    callcampignapi={callapifromallcomp}
                    brandDetails={brandDetails}
                    selectCampaignId={selectCampaignId}
                    settingTarget={settingTarget}
                    settingCampaignDone={settingCampaignDone}
                    targetGrp={targetGrp}
                    longScript={longScript}
                    settingProductName={settingProductName}
                    settingLongScript={settingLongScript}
                    settingProductDis={settingProductDis}
                  />
                  <CreativeType
                    tab={tab}
                    setBrandTab={setBrandTab}
                    campaignId={campaignId}
                    setPrompt={setPrompt}
                    campaignDone={campaignDone}
                    targetGrp={targetGrp}
                    settingCreativeDone={settingCreativeDone}
                    brandDetails={brandDetails}
                    settingLongScript={settingLongScript}
                    settingDuration={settingDuration}
                    productName={productName}
                    productDis={productDis}
                  />
                  <VideoContent
                    tab={tab}
                    setBrandTab={setBrandTab}
                    campaignId={campaignId}
                    creativeDone={creativeDone}
                    brandDetails={brandDetails}
                    settingVideoConDone={settingVideoConDone}
                  />
                  <VideoSettings
                    tab={tab}
                    setBrandTab={setBrandTab}
                    campaignId={campaignId}
                    videoConDone={videoConDone}
                    brandDetails={brandDetails}
                    settingVideoset={settingVideoset}
                  />
                  <BrandPainting
                    tab={tab}
                    setBrandTab={setBrandTab}
                    campaignId={campaignId}
                    brandDetails={brandDetails}
                    videoSetDone={videoSetDone}
                    settingBrandPaint={settingBrandPaint}
                    settingGen={settingGen}
                    generateBtn={generateBtn}
                    generate={generate}
                    isLoading={isLoading}
                    mutateVideoGeneration={mutateVideoGeneration}
                    mutateVideo={mutateVideo}
                    isRefetching={isRefetching}
                  />


                  {/* <div className=" mx-auto mb-4 w-full px-4 flex justify-center mt-2">
                  <Button
                    className={`${generate == 0
                      ? " bg-nyx-gray-1 rounded-full  font-semibold border-nyx-gray-1 text-black hover:bg-nyx-gray-1 cursor-not-allowed"
                      : "hover:shadow-none  text-nyx-yellow  font-semibold shadow-sm rounded-full my-2"
                      } ${(isLoading ||
                        mutateVideoGeneration.isPending ||
                        mutateVideo.isPending ||
                        isRefetching) &&
                      " bg-nyx-gray-1 border-none"
                      } px-20 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:shadow-none disabled:hover:bg-nyx-gray-1 `}
                    onClick={generateBtn}
                    disabled={
                      generate == 0 ||
                      isLoading ||
                      mutateVideoGeneration.isPending ||
                      mutateVideo.isPending ||
                      isRefetching
                    }
                  >
                    {isLoading ||
                      mutateVideoGeneration.isPending ||
                      mutateVideo.isPending ||
                      isRefetching ? (
                      <ButtonLoading />
                    ) : (
                      "Generate"
                    )}
                  </Button>
                </div> */}
                </div>
              </div>

              {/* Right */}
              <div className="relative w-[65%] bg-[#332270] rounded-lg overflow-hidden overflow-y-auto mr-2">
                <div className=" h-full ">
                  {videoScreen === 0 && (
                    <>
                      <div className="pl-4 pt-4">
                        <p className="text-white pl-4 pt-4 text-[24px] leading-[39px] font-bold">
                          Steps for Brand Video Generation
                        </p>
                        <Steper tab={tab} generate={generate} />
                      </div>
                    </>
                  )}
                  {videoScreen === 1 && (
                    <>
                      {(isLoading || mutateVideoGeneration.isPending) && (
                        <>
                          <div className="h-full flex flex-col justify-between">
                            <div>
                              <ImageLoader />
                            </div>
                            <div className="bg-[#28134B] h-[80px]">
                              <div className="flex justify-start gap-2 p-4 items-center mt-2">
                                <div>
                                  <svg
                                    width="24"
                                    height="25"
                                    className="inline  text-gray-200 text-center animate-spin dark:text-transparent fill-white "
                                    viewBox="0 0 24 25"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M12 22.5C10.6333 22.5 9.34167 22.2375 8.125 21.7125C6.90833 21.1875 5.84583 20.4708 4.9375 19.5625C4.02917 18.6542 3.3125 17.5917 2.7875 16.375C2.2625 15.1583 2 13.8667 2 12.5C2 11.1167 2.2625 9.82083 2.7875 8.6125C3.3125 7.40417 4.02917 6.34583 4.9375 5.4375C5.84583 4.52917 6.90833 3.8125 8.125 3.2875C9.34167 2.7625 10.6333 2.5 12 2.5C12.2833 2.5 12.5208 2.59583 12.7125 2.7875C12.9042 2.97917 13 3.21667 13 3.5C13 3.78333 12.9042 4.02083 12.7125 4.2125C12.5208 4.40417 12.2833 4.5 12 4.5C9.78333 4.5 7.89583 5.27917 6.3375 6.8375C4.77917 8.39583 4 10.2833 4 12.5C4 14.7167 4.77917 16.6042 6.3375 18.1625C7.89583 19.7208 9.78333 20.5 12 20.5C14.2167 20.5 16.1042 19.7208 17.6625 18.1625C19.2208 16.6042 20 14.7167 20 12.5C20 12.2167 20.0958 11.9792 20.2875 11.7875C20.4792 11.5958 20.7167 11.5 21 11.5C21.2833 11.5 21.5208 11.5958 21.7125 11.7875C21.9042 11.9792 22 12.2167 22 12.5C22 13.8667 21.7375 15.1583 21.2125 16.375C20.6875 17.5917 19.9708 18.6542 19.0625 19.5625C18.1542 20.4708 17.0958 21.1875 15.8875 21.7125C14.6792 22.2375 13.3833 22.5 12 22.5Z"
                                      fill="white"
                                    />
                                  </svg>
                                </div>

                                <AnimateText list={texts} />
                              </div>
                            </div>
                          </div>
                        </>
                      )}

                      {video && (
                        <>
                          <div className="flex flex-col justify-between h-full">
                            <div className="text-white text-[24px] font-bold ml-4 mt-2">
                              Generated Video
                            </div>
                            <div className="flex justify-center items-center p-6 h-full">
                              <div className=" flex w-full justify-center bg-black  rounded-lg">
                                <ReactPlayer
                                  url={
                                    videoDetails?.file_details?.signed_video_url
                                  }
                                  controls
                                  width="100%"
                                  height="408px"
                                  playing={false}
                                  config={{
                                    file: {
                                      attributes: {
                                        crossOrigin: "true",
                                      },
                                      ...(videoDetails?.file_details
                                        ?.signed_srt_url && {
                                        tracks: [
                                          {
                                            kind: "subtitles",
                                            src: videoDetails.file_details
                                              .signed_srt_url,
                                            srcLang: "en",
                                            default: false,
                                            label: "English",
                                          },
                                        ],
                                      }),
                                    },
                                  }}
                                />
                              </div>
                            </div>
                            <div className="">
                              <VideoChangeButtons
                                videoId={videoId}
                                videoUrl={
                                  videoDetails?.file_details?.signed_video_url
                                }
                                captionUrl={
                                  videoDetails?.file_details?.srt_file_signed_url
                                }
                                setEditVideo={() => setEditVideo(true)}
                              />
                            </div>
                          </div>
                        </>
                      )}

                      {(error || mutateVideoGeneration.error) && (
                        <>
                          <div className="h-[400px] w-full flex justify-center items-center	mb-8 flex-col">
                            <div className="h-[200px] w-[320px] bg-violet-900 flex justify-center items-center rounded-md p-2">
                              <div className="">
                                <p className=" text-white mb-4 text-center ">
                                  There is some error occured please generate
                                  again
                                </p>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <LandscapePopup />

      {creditFailed ? (
        <Modal isOpen={creditFailed} style={paymentWarningStyle} ariaHideApp={false}>
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
      {creditError ? (
        <Modal isOpen={creditError} style={paymentWarningStyle} ariaHideApp={false}>
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
              onClick={() => setCreditError(false)}
            >
              Ok
            </button>
          </div>
        </Modal>
      ) : null}
      {editVideo ? (
        <Modal isOpen={editVideo} style={editVideoPopup} ariaHideApp={false}>
          {React.createElement(ChatEditor as React.ComponentType<ChatEditorProps>, {
            fileId: videoDetails?.file_id,
            videoId: videoDetails?.id,
            videoDetails: videoDetails?.file_details,
            onClose: onCloseEditVideo
          })}
        </Modal>
      ) : null}
    </>
  );
};

export default Page;
