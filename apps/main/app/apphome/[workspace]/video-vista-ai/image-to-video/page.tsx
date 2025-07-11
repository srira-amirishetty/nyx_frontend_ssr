/* eslint-disable @next/next/no-img-element */
"use client";
import { IMAGE_TO_VIDEO_TABS } from "@nyx-frontend/main/utils/productConstants";
import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import FocusPoint from "./FocusPoint";
import Painting from "./Painting";
import AmountOfMotion from "./AmountOfMotion";
import AnimationStyle from "./AnimationStyle";
import AnimationLength from "./AnimationLength";
import Imageslider from "./Imageslider";
import ImageUpload from "./ImageUpload";
import Sidebar from "@nyx-frontend/main/components/Sidebar";
import { toast } from "react-toastify";
import Button from "@nyx-frontend/main/components/Button";
import Imageloader from "./Imageloader";
import UploadImageToVideo from "@nyx-frontend/main/components/uploadImageToVideo";
import { admanagerSystemUpload } from "@nyx-frontend/main/services/admanagerServices";
import { useRouter } from "next/navigation";
import AnimateText from "./AnimateText";
import {
  getbrandServiceonbording,
  addCampaignService,
  getpromtandimageService,
} from "@nyx-frontend/main/services/brandService";
import {
  uploadImageToVideoServices,
  generateVideoServices,
  generateImagetoVideoStatus,
} from "@nyx-frontend/main/services/imageToVideo";
import { useQuery, useMutation } from "@tanstack/react-query";
import { TDriveImageList } from "@nyx-frontend/main/components/uploadComponentsImage/DriveImageLists.types";
import ButtonLoading from "@nyx-frontend/main/components/ButtonLoading";
import "../../../../../css/toolResponsive.css";
import LandscapePopup from "../../../LandscapePopUp";
import { paymentWarningStyle } from "@nyx-frontend/main/utils/modalstyles";
import Modal from "react-modal";
import {
  getAvailableCredit,
  getWorkspaceDetailsById,
} from "@nyx-frontend/main/services/workSpace";
import "@nyx-frontend/main/app/_components/toastifyTest/toastify.css";
import "react-toastify/dist/ReactToastify.css";
import Steper from "./Steper";

type CollectedData = {
  AnimationStyle: any;
  AmountOfMotion: any;
  AnimationLength: any;
  // FocusPoint: any;
};

const Page = () => {
  const videoRef = useRef<any>(null);
  const [tab, setBrandTab] = useState<string>(IMAGE_TO_VIDEO_TABS.IMAGE);
  const [brandId, setBrandId] = useState<any>();
  const [campignapidata, setcampignapidata] = useState<any>();
  const [mediaResponse, setMediaResponse] = useState<any>();
  const [imageurl, setimageurl] = useState<any>([]);
  const [dataFromCreative, setDataFromCreative] = useState<any>();
  const [userCredits, setuserCredits] = useState<number>(1);

  const [progress, setProgress] = useState<number>(0);
  const [loading, setloading] = useState(false);
  const [seconduploadedimage, setseconduploadedimage] = useState(false);
  const [tabControl, settabControl] = useState("0");
  const [generatebuttonloading, setgeneratebuttonloading] = useState(false);
  const [imageUploaded, setimageUploaded] = useState<number>(0);
  const [collectedData, setCollectedData] = useState<CollectedData>({
    AnimationStyle: "",
    AmountOfMotion: "",
    AnimationLength: "",
    // FocusPoint: "",
  });
  const router = useRouter();
  const [uploadImageProcess, setUploadImageProcess] = useState<boolean>(false);
  const fileInputRef = useRef<any>(null);
  const [notSupported, setNotSupported] = useState(false);
  const [creditFailed, setCreditFailed] = useState(false);
  const [reset, setReset] = useState<any>(0);
  const [imageError, setImageError] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string>("");
  const [uploadImageId, setUploadImageId] = useState<any>(null);
  const [generatedVideo, setGeneratedVideo] = useState<string>("");
  const [imagetovideoTask, setImagetoVideoTask] = useState<any>(null);
  const [generateVideoID, setGenerateVideoID] = useState<any>(null);
  const [creditError, setCreditError] = useState(false);
  const [Stepercomplete, setStepercomplete] = useState(false);
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [selectedDriveImage, setSelectedDriveImage] = useState<any>(null);
  const [generatedPutPresignedImage, setGeneratedPutPresignedImage] =
    useState<string>("");
  const CollectedDataVideoGenerate = (
    fieldName: keyof CollectedData,
    value: any,
  ): void => {
    setCollectedData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const { data: brandDetails } = useQuery({
    queryKey: ["getProduct", brandId],
    queryFn: () => {
      if (brandId) {
        return getbrandServiceonbording(brandId);
      }

      return null;
    },
  });

  const SECOND = 1000;
  const MINUTE = SECOND * 60;

  const texts = [
    { name: "Analyzing your Image", time: SECOND * 5 },
    { name: "Implementing Animation Style", time: SECOND * 10 },
    { name: "Adding Motion to your image", time: SECOND * 10 },
    { name: "Animating for you", time: Infinity },
  ];

  const {
    data: availableCredit,
    refetch: creditRefetching,
    isFetching,
    isRefetchError,
  } = useQuery({
    queryKey: ["image-to-video-credit-change"],
    queryFn: () => {
      return getAvailableCredit(Number(localStorage.getItem("workspace_id")));
    },
  });

  const mutategetpromptandimage = useMutation({
    mutationKey: ["get-image"],
    mutationFn: getpromtandimageService,
  });

  const mutateUploadfromSyetem = useMutation({
    mutationKey: ["upload-system"],
    mutationFn: admanagerSystemUpload,
  });

  // const mutateReaction = useMutation ({
  //   mutationKey:["reaction"],
  //   mutationFn:reactionServices,
  // })

  useEffect(() => {
    const storage = localStorage.getItem("token");
    if (storage) {
    } else {
      router.push("/apphome/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let interval: any;
    if (mutategetpromptandimage.isPending) {
      interval = setInterval(() => {
        setProgress((prevProgress) => {
          const newProgress = prevProgress + 10;
          return newProgress <= 100 ? newProgress : 0;
        });
      }, 1000);
    } else {
      clearInterval(interval);
      setProgress(0);
    }
    return () => clearInterval(interval);
  }, [mutategetpromptandimage.isPending]);

  const mutateUploadImage = useMutation({
    mutationKey: ["upload-image-img2vid"],
    mutationFn: uploadImageToVideoServices,
  });

  const mutateGenerateVideo = useMutation({
    mutationKey: ["generate-video"],
    mutationFn: generateVideoServices,
  });

  const handleUploadImageProcess = () => {
    setUploadImageProcess(false);
    setUploadImageProcess(true);
    setGeneratedVideo("");
    setGeneratedImage("");
    setImageError(false);
    console.log(imageUploaded);
    // setimageUploaded(1)
  };

  const handleUploadImageProcess2 = () => {
    // setCollectedData({
    //   AnimationStyle: "",
    //   AmountOfMotion: "",
    //   AnimationLength: "",
    //   // FocusPoint: "",
    // });
    // setimageUploaded(0)
    // setBrandTab("")
    setUploadImageProcess(false);
    setUploadImageProcess(true);
    // setGeneratedVideo("");
    // setGeneratedImage("");
    setImageError(false);
    console.log(imageUploaded);
    // setimageUploaded(1)
  };
  const handleSystemButtonClick = () => {
    // Trigger click event on file input
    if (fileInputRef.current) {
      // @ts-ignore
      fileInputRef.current?.click();
    }
  };

  const systemUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (reset == 0) {
      setReset(1);
    } else {
      setReset(0);
    }
    setGeneratedVideo("");

    setCollectedData({
      AnimationStyle: "",
      AmountOfMotion: "",
      AnimationLength: "",
      // FocusPoint: "",
    });
    const selectedImageFile = event.target.files && event.target.files[0];
    const allowedExtensions = ["png", "jpg", "jpeg", "svg", "webp"];
    let extension: string = "";

    if (selectedImageFile !== null && selectedImageFile !== undefined) {
      extension = (selectedImageFile.name.split(".").pop() || "").toLowerCase();

      if (!allowedExtensions.includes(extension)) {
        // Invalid file extension
        setNotSupported(true);
        setUploadImageProcess(false);
        return;
      }
    }

    if (selectedImageFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const width = img.width;
          const height = img.height;
          setImageDimensions({ width, height });

          const uploadSystemData = new FormData();
          uploadSystemData.append("file", selectedImageFile);
          uploadSystemData.append("type", "admanager");
          const workspaceId = localStorage.getItem("workspace_id");
          if (workspaceId !== null) {
            uploadSystemData.append("workspace_id", workspaceId);
          }

          mutateUploadfromSyetem.mutate(uploadSystemData, {
            onSuccess: (response: any) => {
              setNotSupported(false);
              setGeneratedImage(response?.data?.signed_image_url);
              setGeneratedPutPresignedImage(
                response?.data?.signed_image_url,
              );
              settabControl("0");
              setimageUploaded(1);
              setUploadImageId(response?.data?.file_id);
              // toast.success("Now go to Animation Style");
            },
            onError: (error: any) => {
              toast.error(
                <>
                  <span className="text-white text-[20px]">Bad Request</span>
                  <br />
                  <span className="text-white text-[16px]">
                    Image not uploaded Successfully
                  </span>
                  <br />
                </>,
                { autoClose: 5000 },
              );
              console.error(error);
            },
          });
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(selectedImageFile);
    }

    setUploadImageProcess(false);
  };

  const driveFileSelected = (newSelectedFile: TDriveImageList) => {
    setSelectedDriveImage(newSelectedFile);
  };

  const handleDriveButtonClick = () => {
    if (reset == 0) {
      setReset(1);
    } else {
      setReset(0);
    }
    setCollectedData({
      AnimationStyle: "",
      AmountOfMotion: "",
      AnimationLength: "",
      // FocusPoint: "",
    });

    setNotSupported(false);

    if (selectedDriveImage !== null) {
      const img = new Image();
      img.onload = () => {
        const width = img.width;
        const height = img.height;
        setImageDimensions({ width, height });

        settabControl("0");
        setGeneratedVideo("");
        setGeneratedImage(selectedDriveImage?.file_details?.signed_image_url);
        setGeneratedPutPresignedImage(
          selectedDriveImage?.file_details?.signed_image_url,
        );
        setUploadImageId(selectedDriveImage?.file_id);
        setUploadImageProcess(false);
        setimageUploaded(1);
      };
      img.src = selectedDriveImage?.file_details?.signed_image_url;
    }
  };

  const generateVideoButtonClick = async () => {
    setStepercomplete(true)
    let structuredData;
    const storedData = localStorage.getItem("structuredCreditData");
    if (storedData) {
      // Parse the JSON string back into an object
      structuredData = JSON.parse(storedData);
    }
    await creditRefetching();
    if (
      availableCredit?.availableCredits >
        structuredData["IMAGE_VIDEO_GENERATION"].credits_generation *
          collectedData.AnimationLength &&
      !isRefetchError
    ) {
      setloading(true);
      setImageError(false);
      let data = {
        // putPresignedUrl: generatedPutPresignedImage,
        // getPresignedUrl: generatedImage,
        file_id: uploadImageId,
        animationStyle: collectedData.AnimationStyle, // Horizontal, Vertical, Circle, Perspective
        amountOfMotion: String(collectedData.AmountOfMotion), // 1 to 100
        animationLength: collectedData.AnimationLength, // 1 to 6
        //focusPoint: collectedData.FocusPoint, //1 to 5
        workspace_id: Number(localStorage.getItem("workspace_id")),
      };

      mutateGenerateVideo.mutate(data, {
        onSuccess: (response: any) => {
          // setGeneratedVideo(response?.data?.resultPresignedUrl);
          // setGenerateVideoID(response?.data?.image_video_generate_id);
          // setloading(false);
          // console.log("video data",generatedVideo)
          // settabControl("1")
          // setseconduploadedimage(true)
          console.log(response);
          setImagetoVideoTask(response?.task_id);
          mutateImageVideo.mutate(response?.task_id);
          setloading(true);
        },
        onError: (error: any) => {
          console.error(error);
          toast.error(
            <>
              <span className="text-white text-[20px]">Bad Request</span>
              <br />
              <span className="text-white text-[16px]">
                {error.response.data.message}
              </span>
              <br />
            </>,
            { autoClose: 5000 },
          );
          setloading(false);
          setImageError(true);
        },
      });
    } else if (
      availableCredit?.availableCredits <=
        structuredData["IMAGE_VIDEO_GENERATION"].credits_generation *
          collectedData.AnimationLength &&
      !isRefetchError
    ) {
      setCreditFailed(true);
    } else {
      setCreditError(true);
    }
  };

  const handleCloseModal = () => {
    setSelectedDriveImage(null);
    setUploadImageProcess(false);
  };

  const mutateImageVideo = useMutation({
    mutationKey: ["ImageVideoData"],
    mutationFn: generateImagetoVideoStatus,
    onSuccess: (res) => {
      if (res.status === "in_progress") {
        setTimeout(() => {
          mutateImageVideo.mutate(imagetovideoTask);
        }, 10000);
      } else if (res?.status === "completed") {
        setGeneratedVideo(res?.resultPresignedUrl);
        setGenerateVideoID(res?.file_id);
        settabControl("1");
        setloading(false);
        setBrandTab(IMAGE_TO_VIDEO_TABS.IMAGE);
        setseconduploadedimage(true);
        setImageError(false);
      } else {
        console.log("failed", res);
        setloading(false);
        setImageError(true);
      }
    },
    onError: (res: any) => {
      console.log(res);
      setloading(false);
      setImageError(true);
      toast.error(
        <>
          <span className="text-white text-[20px]">Bad Request</span>
          <br />
          <span className="text-white text-[16px]">
            {res.response.data.message}
          </span>
          <br />
        </>,
        { autoClose: 5000 },
      );
    },
  });

  const toggleFullScreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if (videoRef.current.mozRequestFullScreen) {
        /* Firefox */
        videoRef.current.mozRequestFullScreen();
      } else if (videoRef.current.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        videoRef.current.webkitRequestFullscreen();
      } else if (videoRef.current.msRequestFullscreen) {
        /* IE/Edge */
        videoRef.current.msRequestFullscreen();
      }
    }
  };

  // const generatebuttonstate =()=>{
  //   setgeneratebuttonloading(true)
  // }

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
              VideoVista Image-to-Video
            </p>
            <div className="flex w-full gap-2 justify-center right_side_tool">
              <div className="tool-left-panel bg-[#00000080] flex flex-col justify-between  noverflow-hidden overflow-y-auto rounded-lg w-full ">
                <div className=" flex gap-4 p-4 flex-col">
                  <ImageUpload
                    tab={tab}
                    setBrandTab={setBrandTab}
                    updatedata={CollectedDataVideoGenerate}
                    imageUploaded={imageUploaded}
                    tabControl={tabControl}
                    reset={reset}
                    handleUploadImageProcess={handleUploadImageProcess}
                    mutateUploadImage={mutateUploadImage}
                    notSupported={notSupported}
                    loading={loading}
                    imageError={imageError}
                    generatedImage={generatedImage}
                    setGeneratedImage={setGeneratedImage}
                  />
                  <AnimationStyle
                    tab={tab}
                    setBrandTab={setBrandTab}
                    updatedata={CollectedDataVideoGenerate}
                    imageUploaded={imageUploaded}
                    tabControl={tabControl}
                    reset={reset}
                  />
                  <AmountOfMotion
                    tab={tab}
                    setBrandTab={setBrandTab}
                    updatedata={CollectedDataVideoGenerate}
                    imageUploaded={imageUploaded}
                    tabControl={tabControl}
                    reset={reset}
                  />
                  <AnimationLength
                    tab={tab}
                    setBrandTab={setBrandTab}
                    updatedata={CollectedDataVideoGenerate}
                    imageUploaded={imageUploaded}
                    setgeneratebuttonloading={setgeneratebuttonloading}
                    tabControl={tabControl}
                    reset={reset}
                  />
                  {/* <FocusPoint
                  tab={tab}
                  setBrandTab={setBrandTab}
                  updatedata={CollectedDataVideoGenerate}
                  imageUploaded={imageUploaded}
                  setgeneratebuttonloading={setgeneratebuttonloading}
                /> */}
                  {/* <Painting
                  tab={tab}
                  setBrandTab={setBrandTab}
                  imageUploaded={imageUploaded}
                /> */}
                </div>
                    
                <div className="mx-auto mb-4 w-full px-4 ">
                  <div>
                    {
                    (collectedData.AmountOfMotion != "" &&
                      collectedData.AnimationStyle != "" &&
                      collectedData.AnimationLength != "" &&
                      generatedImage !=""
                    ) ? (
                      <>
                        <Button
                          className={`w-full px-4 text-md 2xl:text-lg shadow-sm  focus:shadow-glow rounded-full hover:text-black font-semibold  text-nyx-yellow hover:shadow-none cursor-pointer disabled:shadow-none disabled:cursor-not-allowed disabled:bg-nyx-gray-1 disabled:border-nyx-gray-1 `}
                          onClick={generateVideoButtonClick}
                          disabled={
                            loading ||
                            collectedData.AnimationStyle == "" ||
                            collectedData.AmountOfMotion == "" ||
                            collectedData.AnimationLength == "" ||
                            generatedImage =="" ||
                            isFetching
                          }
                        >
                          {loading || isFetching ? (
                            <ButtonLoading />
                          ) : (
                            "Generate"
                          )}
                        </Button>
                      </>
                    ) : (
                      <Button className=" shadow-nyx-gray-1 bg-nyx-gray-1 border-none font-semibold   text-black hover:bg-nyx-gray-1 rounded-full w-full  px-4 hover:shadow-none py-[8px]  text-md 2xl:text-lg cursor-not-allowed">
                        Generate
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              <div className="w-[60%] bg-[#28134B] rounded-lg ">
                {(generatedVideo.length || generatedPutPresignedImage) &&
                  notSupported == false && (
                    <>
                      <div className="flex flex-col items-center justify-center">
                        {/* <div className="bg-black py-3 px-3 h-[50px] w-full flex items-center justify-between ">
                          <div className="w-full flex justify-end">
                            {generatedVideo.length > 0 ? (
                              <button
                                onClick={toggleFullScreen}
                                className="text-white ml-auto mr-5"
                              >
                                <svg
                                  width="18"
                                  height="19"
                                  viewBox="0 0 18 19"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M0 18.5V10.5H2V15.1L14.6 2.5H10V0.5H18V8.5H16V3.9L3.4 16.5H8V18.5H0Z"
                                    fill="white"
                                  />
                                </svg>
                              </button>
                            ) : null}
                            {generatedPutPresignedImage && (
                              <button
                                className="text-white border border-white rounded-full px-3 py-1 hover:bg-yellow-400 hover:border-transparent hover:text-black transition duration-300 disabled:cursor-not-allowed"
                                onClick={handleUploadImageProcess2}
                                disabled={mutateUploadImage.isPending}
                              >
                                {mutateUploadImage.isPending
                                  ? "Uploading..."
                                  : "+ Upload"}
                              </button>
                            )}
                          </div>
                        </div> */}
                      </div>
                    </>
                  )}

               {/* {(Stepercomplete === false || (loading==false && generatedVideo.length==0)) && <div className="h-full w-full flex flex-col pt-4 pl-4">
                  <p className="text-white p-2 text-[24px] ">
                    Steps for Brand Video Generation
                  </p>
                  <Steper tab={tab} />
                </div>} */}

                <div
                  className={`w-full h-full flex flex-col   object-contain gap-4`}
                >
                  {generatedVideo.length > 0 &&
                  imageError == false &&
                  loading == false &&
                  notSupported == false ? (
                    // {generatedVideo?.length === 0 ? :<Steper/>}
                    <Imageslider
                      videourl={generatedVideo}
                      videoRef={videoRef}
                      generateVideoID={generateVideoID}
                      imageDimensions={imageDimensions}
                    />
                  ) : imageError &&
                    loading == false &&
                    notSupported == false ? (
                    <>
                      <div className="h-[40vh] w-full flex justify-center items-center	 flex-col">
                        <div className="h-[200px] w-[320px] bg-violet-900 flex justify-center items-center rounded-md p-2">
                          <div className="">
                            <p className=" text-white mb-4 text-center ">
                              There is some error occured please generate again
                            </p>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    (loading || mutateGenerateVideo.isPending) &&
                    imageError == false &&
                    notSupported == false ? (
                      <div className="flex flex-col justify-between items-center h-full">
                        <div className="p-10">
                          <Imageloader />
                        </div>

                        <div className="flex w-full justify-start gap-2 p-4 items-center mt-2">
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
                    ) : (
                      <div className="h-full w-full flex flex-col pt-4 pl-4">
                  <p className="text-white p-2 text-[24px] ">
                    Steps for Brand Video Generation
                  </p>
                  <Steper tab={tab} />
                </div>
                    )
                  ) }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {uploadImageProcess ? (
        <UploadImageToVideo
          onClose={handleCloseModal}
          onSelected={driveFileSelected}
          handleSystemButtonClick={handleSystemButtonClick}
          systemUpload={systemUpload}
          handleDriveButtonClick={handleDriveButtonClick}
          fileInputRef={fileInputRef}
        />
      ) : null}
      <LandscapePopup />

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
      {creditError ? (
        <Modal isOpen={creditError} style={paymentWarningStyle}>
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
    </>
  );
};

export default Page;
