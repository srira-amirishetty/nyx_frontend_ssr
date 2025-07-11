/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, {
  useState,
  useRef,
  useEffect,
  useContext,
  ChangeEvent,
} from "react";
import { MessagePopupContext } from "@nyx-frontend/main/hooks/MessagePopupContext";
import Button from "@nyx-frontend/main/components/Button";
import AdManagerTabs from "./_components/AdManagerTabs";
import UploadAdCreative from "@nyx-frontend/main/components/UploadAdCreative";
import SelectImage from "./SelectImage";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import UploadThumnail from "@nyx-frontend/main/components/uploadThumnail";
import {
  getCampaign,
  updateCampaign,
  AiHeadlineSuggestion,
} from "@nyx-frontend/main/services/admanagerServices";
import { useMutation, useQuery } from "@tanstack/react-query";
import ButtonLoadingGenAI from "@nyx-frontend/main/components/ButtonLoadingGenAI";
import Loading from "./_components/Loading";
import { Reorder } from "framer-motion";
import { BsFillInfoCircleFill } from "react-icons/bs";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";
import { imageAndVideos } from "./_utils/helpers";
import useStore from "../component/store";
import { Draggable } from "./_components/Draggable";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import Steper from "../component/Steper";
import { getbrandServiceonbording } from "@nyx-frontend/main/services/brandService";
import { TDriveImageList } from "@nyx-frontend/main/components/uploadComponentsImage/DriveImageLists.types";
import classNames from "@nyx-frontend/main/utils/classNames";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@nyx-frontend/main/app/_components/toastifyTest/toastify.css";

import GoogleSearched from "./_components/GooglePerformanceMax/Searched";
import GoogleGmail from "./_components/GooglePerformanceMax/Gmail";
import GoogleDisplay from "./_components/GooglePerformanceMax/Display";
import GoogleYoutube from "./_components/GooglePerformanceMax/Youtube";

interface YoutubeUrlsType {
  [key: string]: string;
}

const Previews = ({ brandId, campaignId, objective }: any) => {
  const { displayMessagePopup } = useContext(MessagePopupContext);
  const router = useRouter();
  const search = useSearchParams();
  const [headlineInputs, setHeadlineInputs] = useState(["", "", ""]);
  const [descriptionInputs, setDescriptionInputs] = useState(["", ""]);
  const [captionInputs, setCaptionInputs] = useState([""]);
  const [previewUrl, setPreviewUrl] = useState({});
  const reorderGroup = useRef<HTMLUListElement>(null);
  const reorderGroupParent = useRef<HTMLDivElement>(null);
  const [scrollCount, setScrollCount] = useState(0);
  const [maxScrollCount, setMaxScrollCount] = useState(() =>
    reorderGroup.current ? reorderGroup.current?.clientWidth : 0,
  );
  const [isNextDisabled, setIsNextDisabled] = useState(false);

  const [mediaTab, setMediaTab] = useState<any>();
  const fileInputRef = useRef<any>(null);
  const fileInputThumbnailRef = useRef<any>(null);
  const [uploadImageProcess, setUploadImageProcess] = useState<boolean>(false);
  const [uploadProcess, setUploadProcess] = useState<boolean>(false);
  const [datanotloaded, setDataNotLoaded] = useState<boolean>(false);
  const [uploadType, setUploadType] = useState<string>("");
  const [driveClickedArray, setDriveClickedArray] = useState<any>([]);
  const [driveVideoClickedArray, setDriveVideoClickedArray] = useState<any>([]);
  const [mixedArray, setMixedArray] = useState<any>([]);

  const [workspacename, setWorkspacename] = useState<string>("");
  const [campaingSiteUrl, setCampaingSiteUrl] = useState<string>("");
  const [brandName, setBrandName] = useState<string>("");

  const { setElement } = useStore();

  const [uploadThumbnailProcess, setUploadThumbnailProcess] =
    useState<boolean>(false);
  const [selectedDriveThumbnail, setSelectedDriveThumbnail] =
    useState<any>(null);
  const [finalThumbnailImage, setFinalThumbnailImage] = useState<string>("");
  const [brandLogos, setBrandLogos] = useState<any>([]);

  const [youtubeUrls, setYoutubeUrls] = useState<YoutubeUrlsType>({});

  const [nextButtonClicked, setNextButtonClicked] = useState<boolean>(false);

  const [saveButtonClicked, setSaveButtonClicked] = useState<boolean>(false);

  const [imagePresent, setImagePresent] = useState<boolean>(false);
  const [videoPresent, setVideoPresent] = useState<boolean>(false);

  const { data: brandDetails } = useQuery({
    queryKey: ["brand-details", brandId],
    queryFn: () => {
      if (brandId) {
        return getbrandServiceonbording(brandId);
      }

      return null;
    },
  });

  const [campainObjective, setCampaignObjective] = useState<string>("");

  useEffect(() => {
    const newCombinedArray = [...driveClickedArray, ...driveVideoClickedArray];
    setMixedArray(newCombinedArray);
  }, [driveClickedArray, driveVideoClickedArray]);

  const mutateUpdateCampaign = useMutation({
    mutationKey: ["update-campaign"],
    mutationFn: updateCampaign,
  });

  const mutateUpdateSaveCampaign = useMutation({
    mutationKey: ["update-save-campaign"],
    mutationFn: updateCampaign,
  });

  const mutateAiHeadlineSuggestion = useMutation({
    mutationKey: ["headline-suggestion"],
    mutationFn: AiHeadlineSuggestion,
  });

  const { data: campaignDetails, isLoading: campaignFeatching } = useQuery({
    queryKey: ["adcreative-campaign-fertchin", Number(campaignId)],
    queryFn: () => {
      if (campaignId) {
        return getCampaign(campaignId);
      }

      return null;
    },
  });

  useEffect(() => {
    if (campaignDetails?.data?.[0]?.templateJson) {
      setCampaignObjective(campaignDetails?.data[0]?.objective);
      setCampaingSiteUrl(campaignDetails?.data[0]?.siteUrl);
      setBrandName(campaignDetails?.data[0]?.brand?.brand_name);
      setBrandLogos(campaignDetails?.data[0]?.brand?.brand_logos);
      setYoutubeUrls(campaignDetails?.data[0]?.templateJson?.urls);
      setHeadlineInputs(
        campaignDetails?.data[0]?.templateJson?.heading ?? [""],
      );
      setDescriptionInputs(
        campaignDetails?.data[0]?.templateJson?.description ?? [""],
      );
      setCaptionInputs(campaignDetails?.data[0]?.templateJson?.caption ?? [""]);

      campaignDetails?.data.map((item: any) => {
        if (item?.templateJson?.google_display) {
          setMixedArray([...item?.templateJson?.google_display]);
          const { images, videos, hasImages } = imageAndVideos(
            item?.templateJson?.google_display,
          );

          if (hasImages) {
            setImagePresent(true);
            setDriveClickedArray([...images]);
          } else {
            setVideoPresent(true);
            setDriveVideoClickedArray([...videos]);
          }
        }

        if (item?.templateJson?.google_gmail) {
          setMixedArray([...item?.templateJson?.google_gmail]);
          const { images, videos, hasImages } = imageAndVideos(
            item?.templateJson?.google_gmail,
          );

          if (hasImages) {
            setImagePresent(true);
            setDriveClickedArray([...images]);
          } else {
            setVideoPresent(true);
            setDriveVideoClickedArray([...videos]);
          }
        }

        if (item?.templateJson?.google_search) {
          setMixedArray([...item?.templateJson?.google_search]);
          const { images, videos, hasImages } = imageAndVideos(
            item?.templateJson?.google_search,
          );

          if (hasImages) {
            setImagePresent(true);
            setDriveClickedArray([...images]);
          } else {
            setVideoPresent(true);
            setDriveVideoClickedArray([...videos]);
          }
        }

        if (item?.templateJson?.google_youtube) {
          setMixedArray([...item?.templateJson?.google_youtube]);
          const { images, videos, hasImages } = imageAndVideos(
            item?.templateJson?.google_youtube,
          );

          if (hasImages) {
            setImagePresent(true);
            setDriveClickedArray([...images]);
          } else {
            setVideoPresent(true);
            setDriveVideoClickedArray([...videos]);
          }
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [campaignDetails]);

  useEffect(() => {
    if (campaignDetails?.data[0]?.templateJson == null) {
      setCampaignObjective(campaignDetails?.data[0]?.objective);
      setCampaingSiteUrl(campaignDetails?.data[0]?.siteUrl);
      setBrandName(campaignDetails?.data[0]?.brand?.brand_name);
      setBrandLogos(campaignDetails?.data[0]?.brand?.brand_logos);
    }
  }, [driveClickedArray, driveVideoClickedArray, mixedArray]);

  const platforms = Array.from(
    new Set(
      campaignDetails?.data?.map(
        (campaignDetail: { platform: { platformName: string } }) =>
          campaignDetail.platform.platformName,
      ),
    ),
  );

  const activeTabName = mediaTab ?? platforms[0];

  useEffect(() => {
    const name = localStorage.getItem("workspace_name");
    if (name) {
      setWorkspacename(name);
    }
  }, []);

  const handleCloseModal = () => {
    setUploadProcess(false);
  };
  const handleCloseImageModal = () => {
    setUploadImageProcess(false);
  };

  const imageUpload = () => {
    // setUploadProcess(true);
    // setUploadType("image");
    setUploadImageProcess(true);
  };

  const videoUpload = () => {
    setUploadProcess(true);
    setUploadType("video");
  };

  const handleSystemButtonClick = () => {
    // Trigger click event on file input
    if (fileInputRef.current) {
      fileInputRef.current?.click();
    }
  };

  const handleDriveButtonClick = () => {
    setUploadProcess(false);
    setDataNotLoaded(false);
  };

  const generateVideoButtonClick = () => {
    setUploadProcess(false);
  };

  const addHeadline = () => {
    if (headlineInputs.length < 3) {
      setHeadlineInputs([...headlineInputs, ""]);
    }
  };

  const addDescription = () => {
    if (descriptionInputs.length < 3) {
      setDescriptionInputs([...descriptionInputs, ""]);
    }
  };

  const addCaption = () => {
    if (captionInputs.length < 3) {
      setCaptionInputs([...captionInputs, ""]);
    }
  };

  const handleInputHeadlineChange =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const newInputs = [...headlineInputs];
      newInputs[index] = event.target.value;
      setHeadlineInputs(newInputs);
    };

  const handleInputDescriptionChange =
    (index: number) => (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newInputs = [...descriptionInputs];
      newInputs[index] = event.target.value;
      setDescriptionInputs(newInputs);
    };

  const handleInputCaptionChange =
    (index: number) => (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newInputs = [...captionInputs];
      newInputs[index] = event.target.value;
      setCaptionInputs(newInputs);
    };

  const addMediaInPreview = (url: any, type: any) => {
    setPreviewUrl({ url, type });
  };

  const deleteItem = (index: number, type: string) => {
    const newMixedArray = [...mixedArray];
    const itemToDelete = newMixedArray[index];

    newMixedArray.splice(index, 1);
    setMixedArray(newMixedArray);

    setYoutubeUrls((prevState) => {
      const updatedUrls = { ...prevState };
      if (updatedUrls[itemToDelete.id]) {
        delete updatedUrls[itemToDelete.id]; // Remove the URL for the deleted video
      }
      return updatedUrls;
    });

    if (type === "images") {
      const imageIndex = driveClickedArray.findIndex(
        (item: any) => item.id === itemToDelete.id,
      );
      if (imageIndex !== -1) {
        const newImageArray = [...driveClickedArray];
        newImageArray.splice(imageIndex, 1);
        setDriveClickedArray(newImageArray);
      }
    } else if (type === "videos") {
      const videoIndex = driveVideoClickedArray.findIndex(
        (item: any) => item.id === itemToDelete.id,
      );
      if (videoIndex !== -1) {
        const newVideoArray = [...driveVideoClickedArray];
        newVideoArray.splice(videoIndex, 1);
        setDriveVideoClickedArray(newVideoArray);
      }
    }
  };

  useEffect(() => {
    const videoItems = mixedArray.filter((item: any) => item.type === "videos");

    const updatedUrls = { ...youtubeUrls };
    videoItems.forEach((video: any) => {
      if (!updatedUrls[video.id]) {
        // Use a unique identifier like `id`
        updatedUrls[video.id] = ""; // Set a default value if not present
      }
    });

    const filteredUrls = { ...youtubeUrls };
    Object.keys(filteredUrls).forEach((key) => {
      if (!updatedUrls[key]) {
        delete filteredUrls[key];
      }
    });

    setYoutubeUrls(filteredUrls);
  }, [mixedArray]);

  const apiCall = () => {
    const platformTemplates: any = {
      GOOGLE: {
        google_display: mixedArray,
        google_gmail: mixedArray,
        google_search: mixedArray,
        google_youtube: mixedArray,
      },
    };

    const payload = {
      campaignId: campaignId,
      platforms: campaignDetails?.data?.reduce((acc: any, item: any) => {
        const platformName = item.platform.platformName.toUpperCase();

        const templateJson = {
          heading: headlineInputs,
          description: descriptionInputs,
          caption: captionInputs,
          ...(platformTemplates[platformName] || {}),
        };

        acc[platformName] = {
          user_campaign_id: item.id,
          platformId: item.platformId,
          templateJson,
        };

        return acc;
      }, {}),
    };

    //console.log("payload", payload);

    mutateUpdateCampaign.mutate(payload, {
      onSuccess: (response: any) => {
        console.log(response);
        setElement("element3", true);
        router.push(
          `/apphome/${workspacename}/admanager/budget?campaignId=${campaignId}&brandid=${brandId}&objective=${objective}`,
        );
      },
      onError: (res: any) => {
        toast.error(
          <>
            <span className="text-white text-[16px] leading-[20px]">
              {" "}
              Request Failed!
            </span>
            <br />
            <span className="text-white text-[12px] leading-[18px] truncate2lines mt-2">
              {" "}
              Please try again
            </span>
          </>,
          { autoClose: 5000 },
        );
      },
    });
  };

  const apiCall2 = () => {
    const platformTemplates: any = {
      GOOGLE: {
        google_display: mixedArray,
        google_gmail: mixedArray,
        google_search: mixedArray,
        google_youtube: mixedArray,
      },
    };
    const payload = {
      campaignId: campaignId,
      platforms: campaignDetails?.data?.reduce((acc: any, item: any) => {
        const platformName = item.platform.platformName.toUpperCase();

        const templateJson = {
          heading: headlineInputs,
          description: descriptionInputs,
          caption: captionInputs,
          ...(platformTemplates[platformName] || {}),
        };

        acc[platformName] = {
          user_campaign_id: item.id,
          platformId: item.platformId,
          templateJson,
        };

        return acc;
      }, {}),
    };

    // console.log("payload", payload);

    mutateUpdateSaveCampaign.mutate(payload, {
      onSuccess: (response: any) => {
        console.log(response);
        setElement("element3", true);
        router.push(
          `/apphome/${workspacename}/admanager/summary?campaignId=${campaignId}&brandid=${brandId}&objective=${objective}`,
        );
      },
      onError: (res: any) => {
        console.log(res);
      },
    });
  };

  const adCreativeNextClick = () => {
    setElement("element3", true);
    setNextButtonClicked(true);

    // Validate the number of inputs
    const hasValidInputs =
      headlineInputs.length == 3 &&
      descriptionInputs.length >= 2 &&
      captionInputs.length >= 1;

    // Validate character limits for each input
    const isValidHeadlines = headlineInputs.every(
      (headline) => headline.length > 0 && headline.length <= 30,
    );

    const isValidDescriptions = descriptionInputs.every(
      (description) => description.length > 0 && description.length <= 90,
    );
    const isValidCaptions = captionInputs.every(
      (caption) => caption.length > 0 && caption.length <= 90,
    );

    if (
      hasValidInputs &&
      isValidHeadlines &&
      isValidDescriptions &&
      isValidCaptions
    ) {
      apiCall();
    } else {
      let errorMessage =
        "Select at least one post from each platform for the next steps.";

      if (!hasValidInputs) {
        errorMessage =
          "You must provide at least 3 headlines, 2 descriptions, and 1 caption.";
      } else if (!isValidHeadlines) {
        errorMessage =
          "Each headline must be non empty & 30 characters or less.";
      } else if (!isValidDescriptions) {
        errorMessage =
          "Each description must be non empty & 90 characters or less.";
      } else if (!isValidCaptions) {
        errorMessage =
          "Each caption must be non empty & 90 characters or less.";
      }

      toast.error(
        <>
          <span className="text-white text-[16px] leading-[20px]">
            {" "}
            Bad Request!
          </span>
          <br />
          <span className="text-white text-[12px] leading-[18px] truncate2lines mt-2">
            {" "}
            {errorMessage}
          </span>
        </>,
        { autoClose: 5000 },
      );
    }
  };

  const adCreativeSave = () => {
    setElement("element3", true);
    setSaveButtonClicked(true);

    // Validate the number of inputs
    const hasValidInputs =
      headlineInputs.length == 3 &&
      descriptionInputs.length >= 2 &&
      captionInputs.length >= 1;

    // Validate character limits for each input
    const isValidHeadlines = headlineInputs.every(
      (headline) => headline.length > 0 && headline.length <= 30,
    );

    const isValidDescriptions = descriptionInputs.every(
      (description) => description.length > 0 && description.length <= 90,
    );
    const isValidCaptions = captionInputs.every(
      (caption) => caption.length > 0 && caption.length <= 90,
    );

    if (
      hasValidInputs &&
      isValidHeadlines &&
      isValidDescriptions &&
      isValidCaptions
    ) {
      apiCall2();
    } else {
      let errorMessage =
        "Select at least one post from each platform for the next steps.";

      if (!hasValidInputs) {
        errorMessage =
          "You must provide at least 3 headlines, 2 descriptions, and 1 caption.";
      } else if (!isValidHeadlines) {
        errorMessage =
          "Each headline must be non empty & 30 characters or less.";
      } else if (!isValidDescriptions) {
        errorMessage =
          "Each description must be non empty & 90 characters or less.";
      } else if (!isValidCaptions) {
        errorMessage =
          "Each caption must be non empty & 90 characters or less.";
      }
      toast.error(
        <>
          <span className="text-white text-[16px] leading-[20px]">
            {" "}
            Bad Request!
          </span>
          <br />
          <span className="text-white text-[12px] leading-[18px] truncate2lines mt-2">
            {" "}
            {errorMessage}
          </span>
        </>,
        { autoClose: 5000 },
      );
    }
  };

  const updateButtonState = (amountLeft: number) => {
    if (reorderGroup.current && reorderGroupParent.current) {
      const sliderWidth = reorderGroup.current.scrollWidth;
      const containerWidth = reorderGroupParent.current.clientWidth;
      setIsNextDisabled(
        sliderWidth <= containerWidth ||
          amountLeft + containerWidth >= sliderWidth,
      );
    }

    if (driveClickedArray && reorderGroup.current) {
      setMaxScrollCount(reorderGroup.current?.clientWidth);
    }
  };

  const nextSlide = () => {
    if (reorderGroup.current) {
      const left = reorderGroup.current.scrollLeft + 100;
      reorderGroup.current.scrollTo({
        top: 0,
        left,
        behavior: "smooth",
      });
      setScrollCount(left);
      updateButtonState(left);
    }
  };

  const prevSlide = () => {
    if (reorderGroup.current) {
      const left = reorderGroup.current.scrollLeft - 100;
      reorderGroup.current.scrollTo({
        top: 0,
        left,
        behavior: "smooth",
      });
      setScrollCount(left);
      updateButtonState(left);
    }
  };

  useEffect(() => {
    const updateResize = () => {
      updateButtonState(0);
    };
    // Update button state on window resize
    window.addEventListener("resize", updateResize);
    return () => window.removeEventListener("resize", updateResize);
  }, [driveClickedArray]);

  const aiButtonClick = () => {
    const payload = {
      campaign: {
        id: campaignId,
        name: campaignDetails?.data[0]?.campaignName,
        objective: campaignDetails?.data[0]?.objective,
        ad_platform: platforms,
        brand: {
          id: brandDetails?.id,
          brand_name: brandDetails?.brand_name,
          cat_name: brandDetails?.cat_name,
          website: brandDetails?.website,
          brand_logos: brandDetails?.brand_logos,
          description: brandDetails?.description,
        },
      },
      product: brandDetails?.brand_product_v2?.filter(
        (product: any) => product.id === campaignDetails?.data[0]?.productId,
      ),
      targetGroup: campaignDetails?.data[0]?.targetGroups,
    };

    mutateAiHeadlineSuggestion.mutate(payload, {
      onSuccess: (response: any) => {
        if (response?.headlines.length > 0) {
          setHeadlineInputs(
            response?.headlines?.map((headline: any) => headline.slice(0, 30)),
          );
        } else {
          setHeadlineInputs(["", "", ""]);
        }

        if (response?.descriptions.length > 0) {
          setDescriptionInputs(
            response?.descriptions?.map((description: any) =>
              description.slice(0, 90),
            ),
          );
        } else {
          setDescriptionInputs(["", ""]);
        }

        if (response?.captions.length > 0) {
          setCaptionInputs(
            response?.captions?.map((caption: any) => caption.slice(0, 90)),
          );
        } else {
          setCaptionInputs([""]);
        }
      },
      onError: (res: any) => {
        console.log(res);
      },
    });
  };

  const handleCloseThumbnailModal = () => {
    setSelectedDriveThumbnail(null);
    setUploadThumbnailProcess(false);
  };

  const driveThumbnailSelected = (newSelectedFile: TDriveImageList) => {
    setSelectedDriveThumbnail(newSelectedFile);
  };

  const handleSystemButtonClickforThumbnail = () => {
    if (fileInputThumbnailRef.current) {
      // @ts-ignore
      fileInputThumbnailRef.current?.click();
    }
  };

  const handleDriveButtonClickforThumbnail = () => {
    if (selectedDriveThumbnail != null) {
      setFinalThumbnailImage(
        selectedDriveThumbnail?.file_details?.signed_image_url,
      );
      setUploadThumbnailProcess(false);
    }
  };

  return (
    <>
      <div className="absolute top-[-35px]">
        <Steper />
      </div>
      <div className="w-full h-full">
        <div className="bg-[#28134B] h-[77vh] overflow-hidden overflow-y-auto">
          <div className="font-medium text-[16px] bg-[#000000] h-[50px] px-12 text-white flex items-center justify-between">
            <div>Performance Max</div>
            <button
              className="flex gap-1 text-white hover:text-nyx-yellow"
              onClick={() =>
                router.push(
                  `/apphome/${workspacename}/admanager/dashboard?view=graph`,
                )
              }
            >
              <svg
                className="hover:fill-nyx-yellow"
                width="20"
                height="19"
                viewBox="0 0 20 19"
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.875 1.6875V16.375H19.0625C19.3111 16.375 19.5496 16.4738 19.7254 16.6496C19.9012 16.8254 20 17.0639 20 17.3125C20 17.5611 19.9012 17.7996 19.7254 17.9754C19.5496 18.1512 19.3111 18.25 19.0625 18.25H0.9375C0.68886 18.25 0.450403 18.1512 0.274587 17.9754C0.098772 17.7996 0 17.5611 0 17.3125L0 1.6875C0 1.43886 0.098772 1.2004 0.274587 1.02459C0.450403 0.848772 0.68886 0.75 0.9375 0.75C1.18614 0.75 1.4246 0.848772 1.60041 1.02459C1.77623 1.2004 1.875 1.43886 1.875 1.6875ZM19.725 4.85L13.1625 11.4125C12.9867 11.5881 12.7484 11.6867 12.5 11.6867C12.2516 11.6867 12.0133 11.5881 11.8375 11.4125L8.75 8.325L5.35 11.725C5.17232 11.8908 4.93719 11.9811 4.6942 11.9769C4.45121 11.9727 4.21935 11.8743 4.0475 11.7025C3.87566 11.5307 3.77727 11.2988 3.77307 11.0558C3.76887 10.8128 3.8592 10.5777 4.025 10.4L8.0875 6.3375C8.26328 6.16194 8.50156 6.06332 8.75 6.06332C8.99844 6.06332 9.23672 6.16194 9.4125 6.3375L12.5 9.425L18.4 3.525C18.5777 3.3592 18.8128 3.26887 19.0558 3.27307C19.2988 3.27727 19.5307 3.37566 19.7025 3.5475C19.8743 3.71935 19.9727 3.95121 19.9769 4.1942C19.9811 4.43719 19.8908 4.67232 19.725 4.85Z"
                  fill="currentColor"
                />
              </svg>

              <p className="underline text-[14px] leading-[17px] font-medium min-w-[80px] text-left">
                Dashboard
              </p>
            </button>
          </div>
          <div className="py-5 px-12 flex gap-5">
            <div className="w-[35%] flex flex-col gap-7">
              <div className="w-full flex flex-col gap-2">
                <p className="w-full text-white text-base font-[600] flex gap-1">
                  Upload Media
                  <svg
                    width="16"
                    height="22"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.16927 10.332V3.54036L4.0026 5.70703L2.83594 4.4987L7.0026 0.332031L11.1693 4.4987L10.0026 5.70703L7.83594 3.54036V10.332H6.16927ZM2.0026 13.6654C1.54427 13.6654 1.15205 13.5023 0.825937 13.1762C0.499826 12.8501 0.336493 12.4576 0.335938 11.9987V9.4987H2.0026V11.9987H12.0026V9.4987H13.6693V11.9987C13.6693 12.457 13.5062 12.8495 13.1801 13.1762C12.854 13.5029 12.4615 13.6659 12.0026 13.6654H2.0026Z"
                      fill="white"
                    />
                  </svg>
                </p>

                <div className="w-full flex gap-5">
                  {search.get("objective") == "Video views" ||
                  campaignFeatching ||
                  (mixedArray?.length > 0 &&
                    driveVideoClickedArray?.length > 0) ||
                  videoPresent ? (
                    <button
                      className={`w-full h-[40px] text-black rounded flex justify-center items-center px-5 cursor-not-allowed bg-[#8297BD] border border-[#8297BD]`}
                    >
                      Image
                    </button>
                  ) : (
                    <button
                      className={`w-full h-[40px] text-white rounded flex justify-center items-center px-5 cursor-pointer border border-[#8297BD] hover:bg-[#5E32FF] hover:border-[#5E32FF]`}
                      onClick={imageUpload}
                    >
                      Image
                    </button>
                  )}

                  {campaignFeatching ||
                  (mixedArray?.length > 0 && driveClickedArray?.length > 0) ||
                  (mixedArray?.length > 0 &&
                    driveVideoClickedArray?.length == 1) ||
                  imagePresent ? (
                    <button
                      className={`w-full h-[40px] text-black rounded flex justify-center items-center px-5 cursor-not-allowed bg-[#8297BD] border border-[#8297BD]`}
                    >
                      Video
                    </button>
                  ) : (
                    <button
                      className={`w-full h-[40px] text-white rounded flex justify-center items-center px-5 cursor-pointer border border-[#8297BD] hover:bg-[#5E32FF] hover:border-[#5E32FF] `}
                      onClick={videoUpload}
                    >
                      Video
                    </button>
                  )}
                </div>
              </div>

              <div className="w-full">
                <button
                  className={`w-[210px] h-[42px] rounded-[8px] py-[7px] px-[16px] flex gap-2 items-center justify-center cursor-pointer ${mutateAiHeadlineSuggestion.isPending ? "bg-[#5E32FF]" : "bg-[#503193] hover:bg-[#5E32FF]"}`}
                  onClick={aiButtonClick}
                >
                  {mutateAiHeadlineSuggestion.isPending ? (
                    <svg
                      width="24"
                      height="25"
                      className="inline text-gray-200 text-center animate-spin dark:text-transparent"
                      viewBox="0 0 24 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 22.5C10.6333 22.5 9.34167 22.2375 8.125 21.7125C6.90833 21.1875 5.84583 20.4708 4.9375 19.5625C4.02917 18.6542 3.3125 17.5917 2.7875 16.375C2.2625 15.1583 2 13.8667 2 12.5C2 11.1167 2.2625 9.82083 2.7875 8.6125C3.3125 7.40417 4.02917 6.34583 4.9375 5.4375C5.84583 4.52917 6.90833 3.8125 8.125 3.2875C9.34167 2.7625 10.6333 2.5 12 2.5C12.2833 2.5 12.5208 2.59583 12.7125 2.7875C12.9042 2.97917 13 3.21667 13 3.5C13 3.78333 12.9042 4.02083 12.7125 4.2125C12.5208 4.40417 12.2833 4.5 12 4.5C9.78333 4.5 7.89583 5.27917 6.3375 6.8375C4.77917 8.39583 4 10.2833 4 12.5C4 14.7167 4.77917 16.6042 6.3375 18.1625C7.89583 19.7208 9.78333 20.5 12 20.5C14.2167 20.5 16.1042 19.7208 17.6625 18.1625C19.2208 16.6042 20 14.7167 20 12.5C20 12.2167 20.0958 11.9792 20.2875 11.7875C20.4792 11.5958 20.7167 11.5 21 11.5C21.2833 11.5 21.5208 11.5958 21.7125 11.7875C21.9042 11.9792 22 12.2167 22 12.5C22 13.8667 21.7375 15.1583 21.2125 16.375C20.6875 17.5917 19.9708 18.6542 19.0625 19.5625C18.1542 20.4708 17.0958 21.1875 15.8875 21.7125C14.6792 22.2375 13.3833 22.5 12 22.5Z"
                        fill="white"
                      />
                    </svg>
                  ) : (
                    <div className="w-full flex items-center justify-center">
                      <svg
                        width="28"
                        height="29"
                        viewBox="0 0 28 29"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          y="0.541016"
                          width="28"
                          height="28"
                          rx="14"
                          fill="#E9E4F0"
                          fillOpacity="0.08"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M13.4439 8.66969C13.1187 7.77677 11.8565 7.77677 11.5313 8.66969L10.0553 12.7272L5.99782 14.2031C5.10489 14.5284 5.10489 15.7906 5.99782 16.1158L10.0553 17.5918L11.5313 21.6493C11.8565 22.5422 13.1187 22.5422 13.4439 21.6493L14.9199 17.5918L18.9774 16.1158C19.8703 15.7906 19.8703 14.5284 18.9774 14.2031L14.9199 12.7272L13.4439 8.66969Z"
                          fill="white"
                        />
                        <g clipPath="url(#clip0_3688_5328)">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M20.0455 7.04656C19.9081 6.66937 19.3749 6.66937 19.2375 7.04656L18.6141 8.76054L16.9001 9.384C16.5229 9.5214 16.5229 10.0546 16.9001 10.192L18.6141 10.8154L19.2375 12.5294C19.3749 12.9066 19.9081 12.9066 20.0455 12.5294L20.6689 10.8154L22.3829 10.192C22.7601 10.0546 22.7601 9.5214 22.3829 9.384L20.6689 8.76054L20.0455 7.04656Z"
                            fill="white"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_3688_5328">
                            <rect
                              width="6.04883"
                              height="6.04883"
                              fill="white"
                              transform="translate(16.6172 6.76367)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                      <p className="font-semibold text-[14px] leading-[17px] text-white">
                        Ask AI Suggestions
                      </p>
                    </div>
                  )}
                </button>
                <p className="text-[10px] font-normal text-white leading-[12px] mt-[6px]">
                  for optimized results
                </p>
              </div>

              <div className="w-full flex flex-col gap-2">
                <div className="w-full flex gap-2">
                  <p className="text-white text-base font-[600]">
                    Headline<span className="ml-1 text-nyx-red">*</span>
                  </p>
                  <div className="text-white flex items-center group relative">
                    <BsFillInfoCircleFill className="cursor-pointer" />
                    <div className="absolute top-[35px] left-[-60px] bg-[#0d0718]  text-white p-4 w-[300px] rounded-2xl z-10 hidden group-hover:block transition-opacity duration-300">
                      Be compelling. Motivate actions in 5 words or less, for
                      google you need atleast 3 headlines.
                    </div>
                  </div>
                </div>

                {headlineInputs?.map((input, index) => (
                  <div key={`headline-container-${index}`} className="w-full">
                    <input
                      key={`headline-${index}`}
                      type="text"
                      value={headlineInputs[index]}
                      placeholder={`Enter your headline ${index + 1}`}
                      className={classNames(
                        "w-full bg-transparent border rounded-md p-2 text-white text-sm placeholder:italic",
                        (saveButtonClicked || nextButtonClicked) &&
                          headlineInputs[index].length == 0
                          ? "border-red-500"
                          : "border-[#8297BD]",
                      )}
                      onChange={handleInputHeadlineChange(index)}
                      maxLength={30}
                    />

                    <p
                      className={`w-full text-right text-xs mt-1 font-[400] ${
                        headlineInputs[index].length === 30
                          ? "text-red-500"
                          : "text-white"
                      }`}
                    >
                      {headlineInputs[index].length} / 30 characters
                    </p>
                  </div>
                ))}
                {headlineInputs?.length < 3 && (
                  <button
                    onClick={addHeadline}
                    className="text-white hover:text-nyx-yellow w-max text-lg font-[500] flex justify-center items-center"
                  >
                    +{" "}
                    <span className="underline text-xs font-[400] px-1">
                      Add
                    </span>
                  </button>
                )}
              </div>

              <div className="w-full flex flex-col gap-2">
                <div className="w-full flex gap-2">
                  <p className="text-white text-base font-[600]">
                    Ad description<span className="ml-1 text-nyx-red">*</span>
                  </p>
                  <div className="text-white flex items-center group relative">
                    <BsFillInfoCircleFill className="cursor-pointer" />
                    <div className="absolute top-[35px] left-[-60px] bg-[#0d0718] text-white p-4 w-[300px] rounded-2xl z-10 hidden group-hover:block transition-opacity duration-300">
                      Tell customers why should they choose you. Use
                      statistics.Add 2-4 line description.
                    </div>
                  </div>
                </div>

                {descriptionInputs?.map((input, index) => (
                  <div key={`description-${index}`} className="w-full">
                    <textarea
                      value={descriptionInputs[index]}
                      placeholder={`Enter your description ${index + 1}`}
                      className={classNames(
                        "w-full bg-transparent border rounded-md p-2 text-white resize-none text-sm placeholder:italic",
                        (saveButtonClicked || nextButtonClicked) &&
                          descriptionInputs[index].length == 0
                          ? "border-red-500"
                          : "border-[#8297BD]",
                      )}
                      rows={3}
                      onChange={handleInputDescriptionChange(index)}
                      maxLength={90}
                    />

                    <p
                      className={`w-full text-right text-xs mt-1 font-[400] ${
                        descriptionInputs[index].length === 90
                          ? "text-red-500"
                          : "text-white"
                      }`}
                    >
                      {descriptionInputs[index].length} / 90 characters
                    </p>
                  </div>
                ))}
                {descriptionInputs?.length < 3 && (
                  <button
                    onClick={addDescription}
                    className="text-white hover:text-nyx-yellow w-max text-lg font-[500] flex justify-center items-center"
                  >
                    +{" "}
                    <span className="underline text-xs font-[400] px-1">
                      Add
                    </span>
                  </button>
                )}
              </div>

              <div className="w-full flex flex-col gap-2">
                <div className="w-full flex gap-2">
                  <p className="text-white text-base font-[600]">
                    Provide your caption
                    <span className="ml-1 text-nyx-red">*</span>
                  </p>
                  <div className="text-white flex items-center group relative">
                    <BsFillInfoCircleFill className="cursor-pointer" />
                    <div className="absolute top-[35px] left-[-60px] bg-[#0d0718] text-white p-4 w-[300px] rounded-2xl z-10 hidden group-hover:block transition-opacity duration-300">
                      There will be the description or caption of your post,
                      which people will see after your ad.
                    </div>
                  </div>
                </div>

                {captionInputs?.map((input, index) => (
                  <div key={`caption-${index}`} className="w-full">
                    <textarea
                      value={captionInputs[index]}
                      placeholder={`Enter your caption ${index + 1}`}
                      className={classNames(
                        "w-full bg-transparent border rounded-md p-2 text-white resize-none text-sm placeholder:italic",
                        (saveButtonClicked || nextButtonClicked) &&
                          captionInputs[index].length == 0
                          ? "border-red-500"
                          : "border-[#8297BD]",
                      )}
                      rows={3}
                      onChange={handleInputCaptionChange(index)}
                      maxLength={90}
                    />

                    <p
                      className={`w-full text-right text-xs mt-1 font-[400] ${
                        captionInputs[index].length === 90
                          ? "text-red-500"
                          : "text-white"
                      }`}
                    >
                      {captionInputs[index].length} / 90 characters
                    </p>
                  </div>
                ))}
                {captionInputs?.length < 3 && (
                  <button
                    onClick={addCaption}
                    className="text-white hover:text-nyx-yellow w-max text-lg font-[500] flex justify-center items-center"
                  >
                    +{" "}
                    <span className="underline text-xs font-[400] px-1">
                      Add
                    </span>
                  </button>
                )}
              </div>
            </div>

            <div className="w-[65%] bg-[#1E1239] h-[600px] relative ">
              {campaignFeatching ? (
                <div className="w-full h-[400px] flex justify-center items-center">
                  <Loading />
                </div>
              ) : (
                <div className="w-full h-full flex flex-col p-2">
                  <div className="w-full">
                    <AdManagerTabs
                      data={platforms as string[]}
                      activeTabName={activeTabName}
                      onTabChange={setMediaTab}
                    />
                  </div>
                  <div className="w-full overflow-hidden overflow-y-auto max-h-[450px] pb-[60px]">
                    <GoogleSearched
                      headlines={headlineInputs}
                      descriptions={descriptionInputs}
                      captions={captionInputs}
                      campaingSiteUrl={campaingSiteUrl}
                      driveClickedArray={driveClickedArray}
                      driveVideoClickedArray={driveVideoClickedArray}
                      campainObjective={campainObjective}
                      brandName={brandName}
                      brandLogos={brandLogos}
                    />

                    <GoogleGmail
                      headlines={headlineInputs}
                      descriptions={descriptionInputs}
                      captions={captionInputs}
                      campaingSiteUrl={campaingSiteUrl}
                      driveClickedArray={driveClickedArray}
                      driveVideoClickedArray={driveVideoClickedArray}
                      campainObjective={campainObjective}
                      brandName={brandName}
                      brandLogos={brandLogos}
                    />

                    <GoogleDisplay
                      headlines={headlineInputs}
                      descriptions={descriptionInputs}
                      captions={captionInputs}
                      campaingSiteUrl={campaingSiteUrl}
                      driveClickedArray={driveClickedArray}
                      driveVideoClickedArray={driveVideoClickedArray}
                      campainObjective={campainObjective}
                      brandName={brandName}
                      brandLogos={brandLogos}
                      previewUrl={previewUrl}
                      mixedArray={mixedArray}
                    />

                    <GoogleYoutube
                      headlines={headlineInputs}
                      descriptions={descriptionInputs}
                      captions={captionInputs}
                      campaingSiteUrl={campaingSiteUrl}
                      driveClickedArray={driveClickedArray}
                      driveVideoClickedArray={driveVideoClickedArray}
                      campainObjective={campainObjective}
                      brandName={brandName}
                      brandLogos={brandLogos}
                      previewUrl={previewUrl}
                      mixedArray={mixedArray}
                    />
                  </div>

                  {mixedArray?.length > 0 ? (
                    <div
                      className="w-full bg-[#8376a0] absolute bottom-0 left-0"
                      ref={reorderGroupParent}
                    >
                      <button
                        onClick={prevSlide}
                        disabled={scrollCount <= 0}
                        className="absolute disabled:opacity-20 disabled:hover:opacity-50 left-2 inset-y-0 my-auto size-8 bg-white/70 text-blue-600 rounded-lg z-10 inline-flex justify-center items-center"
                      >
                        <span className="sr-only">Prev</span>
                        <ChevronLeftIcon className="size-5" />
                      </button>
                      <button
                        onClick={nextSlide}
                        disabled={
                          scrollCount >= maxScrollCount || isNextDisabled
                        }
                        className="absolute disabled:opacity-20 disabled:hover:opacity-50 right-2 inset-y-0 my-auto size-8 bg-white/70 text-blue-600 rounded-lg z-10 inline-flex justify-center items-center"
                      >
                        <span className="sr-only">Next</span>
                        <ChevronRightIcon className="size-5" />
                      </button>
                      <Reorder.Group
                        axis="x"
                        values={mixedArray}
                        onReorder={setMixedArray}
                        className="!flex space-x-2 transition-transform duration-300 overflow-x-auto bottomSlider"
                        layoutScroll
                        ref={reorderGroup}
                      >
                        {mixedArray.map((item: any, index: any) => (
                          <Reorder.Item
                            key={item.id}
                            value={item}
                            className="flex-grow-0 flex-shrink-0"
                          >
                            <Draggable
                              id={item.id}
                              index={index}
                              item={item}
                              deleteItem={deleteItem}
                              selectItem={addMediaInPreview}
                            ></Draggable>
                          </Reorder.Item>
                        ))}
                      </Reorder.Group>
                    </div>
                  ) : null}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center items-center my-[10.5px] gap-2">
          <Button
            className={classNames(
              "rounded-full w-[124px] font-semibold hover:shadow-none",
              mutateUpdateCampaign.isPending ||
                mutateUpdateSaveCampaign.isPending
                ? "bg-gray-400 text-black cursor-not-allowed border border-gray-400 hover:bg-gray-400"
                : "text-nyx-yellow",
            )}
            onClick={() =>
              router.push(
                `/apphome/${workspacename}/admanager/campaign-creation?campaignId=${campaignId}&brandid=${campaignDetails?.data[0].brandId}&productid=${
                  campaignDetails?.data[0].productId
                }`,
              )
            }
            disabled={
              mutateUpdateCampaign.isPending ||
              mutateUpdateSaveCampaign.isPending
            }
          >
            Back
          </Button>

          <Button
            className={classNames(
              "rounded-full w-[124px] font-semibold text-black",
              mutateUpdateCampaign.isPending ||
                mixedArray.length == 0 ||
                mutateUpdateSaveCampaign.isPending
                ? "bg-gray-400 cursor-not-allowed border border-gray-400 hover:bg-gray-400 hover:shadow-none"
                : "bg-nyx-yellow hover:shadow-none",
            )}
            onClick={adCreativeNextClick}
            disabled={
              mutateUpdateCampaign.isPending ||
              mixedArray.length == 0 ||
              mutateUpdateSaveCampaign.isPending
            }
          >
            {mutateUpdateCampaign.isPending ? <ButtonLoadingGenAI /> : "Next"}
          </Button>
          {search.has("edit") && search.get("edit") == "true" && (
            <Button
              className={classNames(
                "rounded-full w-44 font-semibold text-black",
                mutateUpdateCampaign.isPending ||
                  mixedArray.length == 0 ||
                  mutateUpdateSaveCampaign.isPending
                  ? "bg-gray-400 cursor-not-allowed border border-gray-400 hover:bg-gray-400 hover:shadow-none"
                  : "text-nyx-yellow hover:shadow-none",
              )}
              onClick={adCreativeSave}
              disabled={
                mutateUpdateCampaign.isPending ||
                mixedArray.length == 0 ||
                mutateUpdateSaveCampaign.isPending
              }
            >
              {mutateUpdateSaveCampaign.isPending ? (
                <ButtonLoadingGenAI />
              ) : (
                "Save & Update"
              )}
            </Button>
          )}
        </div>
      </div>

      {uploadProcess ? (
        <UploadAdCreative
          datanotloaded={datanotloaded}
          onClose={handleCloseModal}
          handleSystemButtonClick={handleSystemButtonClick}
          handleDriveButtonClick={handleDriveButtonClick}
          fileInputRef={fileInputRef}
          uploadType={uploadType}
          generateVideoButtonClick={generateVideoButtonClick}
          setDriveClickedArray={setDriveClickedArray}
          setDriveVideoClickedArray={setDriveVideoClickedArray}
          driveClickedArray={driveClickedArray}
          driveVideoClickedArray={driveVideoClickedArray}
        />
      ) : null}
      {uploadImageProcess ? (
        <SelectImage
          onClose={handleCloseImageModal}
          driveClickedArray={driveClickedArray}
          setDriveClickedArray={setDriveClickedArray}
        />
      ) : null}

      {uploadThumbnailProcess ? (
        <UploadThumnail
          onClose={handleCloseThumbnailModal}
          onSelected={driveThumbnailSelected}
          handleSystemButtonClick={handleSystemButtonClickforThumbnail}
          handleDriveButtonClick={handleDriveButtonClickforThumbnail}
          fileInputRef={fileInputThumbnailRef}
        />
      ) : null}
    </>
  );
};

export default Previews;
