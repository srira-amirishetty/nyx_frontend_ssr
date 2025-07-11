/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, {
  useState,
  useRef,
  useEffect,
  useContext,
  forwardRef,
  useImperativeHandle,
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
  AiHeadlineSuggestion,
} from "@nyx-frontend/main/services/admanagerServices";
import { useMutation, useQuery } from "@tanstack/react-query";

import ButtonLoadingGenAI from "@nyx-frontend/main/components/ButtonLoadingGenAI";
import Loading from "./_components/Loading";
import { Reorder } from "framer-motion";

import { BsFillInfoCircleFill } from "react-icons/bs";

import InstaPost from "./_components/Instagram/InstaPost";
import InstaStoriesCarousel from "./_components/Instagram/InstaStoriesCarousel";
import InstaStoriesVideo from "./_components/Instagram/InstaStoriesVideo";
import InstaReels from "./_components/Instagram/InstaReels";

import FbPost from "./_components/Facebook/FbPost";
import FbMarketPlace from "./_components/Facebook/FbMarketPlace";
import FbStoriesCarousel from "./_components/Facebook/FbStoriesCarousel";
import FbStoriesVideo from "./_components/Facebook/FbStoriesVideo";
import FbReels from "./_components/Facebook/FbReels";

import GoogleSearched from "./_components/GoogleAds/GoogleSearched";
import GoogleDisplay from "./_components/GoogleAds/GoogleDisplay";

import SearchedPmax from "./_components/GooglePerformanceMax/Searched";
import GoogleGmailPmax from "./_components/GooglePerformanceMax/Gmail";
import DisplayPmax from "./_components/GooglePerformanceMax/Display";
import GoogleYoutubePmax from "./_components/GooglePerformanceMax/Youtube";

import LinkedInFeedOne from "./_components/LinkedIn/LinkedInFeedOne";
import LinkedInFeedTwo from "./_components/LinkedIn/LinkedInFeedTwo";
import LinkedInFeedThree from "./_components/LinkedIn/LinkedInFeedThree";

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
import "@nyx-frontend/main/app/_components/toastifyTest/toastify.css";

import MultipletgTab from "./_components/MultipletgTab";
import MultipleAd from "./_components/MultipleAd";

interface YoutubeUrlsType {
  [key: string]: string;
}
interface PreviewUrl {
  url?: string;
  type?: string;
}

const Previews = forwardRef(
  (
    {
      brandId,
      campaignId,
      campaignDetails,
      tgDetails,
      unique_adbatch_id,
      targetGroups,
      activeTgTab,
      setActiveTgTab,
      ads,
      activeAd,
      setActiveAd,
      addNewAd,
      removeAd
    }: any,
    ref
  ) => {
    const search = useSearchParams();
    const [isExit, setIsExit] = useState(false);
    const [headlineInputs, setHeadlineInputs] = useState(["", "", ""]);
    const [descriptionInputs, setDescriptionInputs] = useState(["", ""]);
    const [captionInputs, setCaptionInputs] = useState([""]);
    const [previewUrl, setPreviewUrl] = useState<PreviewUrl>({});
    const reorderGroup = useRef<HTMLUListElement>(null);
    const reorderGroupParent = useRef<HTMLDivElement>(null);
    const [scrollCount, setScrollCount] = useState(0);
    const [maxScrollCount, setMaxScrollCount] = useState(() =>
      reorderGroup.current ? reorderGroup.current?.clientWidth : 0
    );
    const [isNextDisabled, setIsNextDisabled] = useState(false);

    const [mediaTab, setMediaTab] = useState<any>();
    const fileInputRef = useRef<any>(null);
    const fileInputThumbnailRef = useRef<any>(null);
    const [uploadImageProcess, setUploadImageProcess] =
      useState<boolean>(false);
    const [uploadProcess, setUploadProcess] = useState<boolean>(false);
    const [datanotloaded, setDataNotLoaded] = useState<boolean>(false);
    const [uploadType, setUploadType] = useState<string>("");
    const [driveClickedArray, setDriveClickedArray] = useState<any>([]);
    const [driveVideoClickedArray, setDriveVideoClickedArray] = useState<any>(
      []
    );
    const [mixedArray, setMixedArray] = useState<any>([]);

    const [workspacename, setWorkspacename] = useState<string>("");
    const [campaingSiteUrl, setCampaingSiteUrl] = useState<string>("");
    const [brandName, setBrandName] = useState<string>("");


    const [instaPostChecked, setInstaPostChecked] = useState<boolean>(false);
    const [instaStoryChecked, setInstaStoryChecked] = useState<boolean>(false);
    const [instaStoryVideoChecked, setInstaStoryVideoChecked] =
      useState<boolean>(false);
    const [instareelsChecked, setInstareelsChecked] = useState<boolean>(false);

    const [fbPostChecked, setFbPostChecked] = useState<boolean>(false);
    const [fbStoryChecked, setFbStoryChecked] = useState<boolean>(false);
    const [fbStoryVideoChecked, setFbStoryVideoChecked] =
      useState<boolean>(false);
    const [fbMarketplaceChecked, setFbMarketplaceChecked] =
      useState<boolean>(false);
    const [fbreelsChecked, setFbreelsChecked] = useState<boolean>(false);

    const [googleSearchedChecked, setGoogleSearchedChecked] =
      useState<boolean>(false);
    const [googleDisplayChecked, setGoogleDisplayChecked] =
      useState<boolean>(false);
    const [googleVideoOneChecked, setGoogleVideoOneChecked] =
      useState<boolean>(false);
    const [googleVideoTwoChecked, setGoogleVideoTwoChecked] =
      useState<boolean>(false);

    const [linkedinFeedOneChecked, setLinkedinFeedOneChecked] =
      useState<boolean>(false);
    const [linkedinFeedTwoChecked, setLinkedinFeedTwoChecked] =
      useState<boolean>(false);
    const [linkedinFeedThreeChecked, setLinkedinFeedThreeChecked] =
      useState<boolean>(false);

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
    const [pMaxStatus, setPMaxStatus] = useState<boolean>(false);
    const [campainObjective, setCampaignObjective] = useState<string>("");
    const [error, setError] = useState<boolean>(false);
    const [errorMedia, setErrorMedia] = useState<boolean>(true);

    const [isEdit, setIsEdit] = useState<boolean>(false);

    const { data: brandDetails } = useQuery({
      queryKey: ["brand-details", brandId],
      queryFn: () => {
        if (brandId) {
          return getbrandServiceonbording(brandId);
        }

        return null;
      },
    });

    useEffect(() => {
      const newCombinedArray = [
        ...driveClickedArray,
        ...driveVideoClickedArray,
      ];
      setMixedArray(newCombinedArray);
    }, [driveClickedArray, driveVideoClickedArray]);


    const mutateAiHeadlineSuggestion = useMutation({
      mutationKey: ["headline-suggestion"],
      mutationFn: AiHeadlineSuggestion,
    });

    useEffect(() => {
      if (search.has("edit") && search.get("edit") === "true") {
        setIsEdit(true);
      } else {
        setIsEdit(false);
      }
    }, [search]);

    useEffect(() => {
      if (campaignDetails?.length > 0) {
        setPMaxStatus(campaignDetails?.[0]?.objectiveInfo?.pMax);
        setCampaignObjective(campaignDetails?.[0]?.objective);
        setCampaingSiteUrl(campaignDetails?.[0]?.siteUrl);
        setBrandName(campaignDetails?.[0]?.brand?.brand_name);
        setBrandLogos(campaignDetails?.[0]?.brand?.brand_logos);
        setYoutubeUrls(campaignDetails?.[0]?.templateJson?.urls);

        let platform = Object.keys(tgDetails.platforms)[0]
        let template = tgDetails?.platforms[platform]?.ads?.ad_views
        if (template) {
          setIsExit(tgDetails?.isExit ?? false);
          setHeadlineInputs(template?.heading ?? [""]);
          setDescriptionInputs(template?.description ?? [""]);
          setCaptionInputs(template?.caption ?? [""]);

          if (template?.instagram_post) {
            setInstaPostChecked(true);
            setMixedArray([...template.instagram_post]);
            const { images, videos, hasImages } = imageAndVideos(
              template.instagram_post
            );
            if (hasImages) {
              setImagePresent(true);
              setDriveClickedArray([...images]);
            } else {
              setVideoPresent(true);
              setDriveVideoClickedArray([...videos]);
            }
          }

          if (template?.instagram_reels) {
            setInstareelsChecked(true);
            setVideoPresent(true);
            setMixedArray([...template.instagram_reels]);
            setDriveVideoClickedArray([...template.instagram_reels]);
          }

          if (template?.instagram_story_image) {
            setInstaStoryChecked(true);
            setImagePresent(true);
            setMixedArray([...template.instagram_story_image]);
            setDriveClickedArray([...template.instagram_story_image]);
          }

          if (template?.instagram_story_video) {
            setInstaStoryVideoChecked(true);
            setVideoPresent(true);
            setMixedArray([...template.instagram_story_video]);
            setDriveVideoClickedArray([...template.instagram_story_video]);
          }

          if (template?.facebook_post) {
            setFbPostChecked(true);
            setMixedArray([...template.facebook_post]);
            const { images, videos, hasImages } = imageAndVideos(
              template.facebook_post
            );
            if (hasImages) {
              setImagePresent(true);
              setDriveClickedArray([...images]);
            } else {
              setVideoPresent(true);
              setDriveVideoClickedArray([...videos]);
            }
          }

          if (template?.facebook_marketplace) {
            setFbMarketplaceChecked(true);
            setMixedArray([...template.facebook_marketplace]);
            const { images, videos, hasImages } = imageAndVideos(
              template.facebook_marketplace
            );
            if (hasImages) {
              setImagePresent(true);
              setDriveClickedArray([...images]);
            } else {
              setVideoPresent(true);
              setDriveVideoClickedArray([...videos]);
            }
          }

          if (template?.facebook_story_image) {
            setFbStoryChecked(true);
            setImagePresent(true);
            setMixedArray([...template.facebook_story_image]);
            setDriveClickedArray([...template.facebook_story_image]);
          }

          if (template?.facebook_story_video) {
            setFbStoryVideoChecked(true);
            setVideoPresent(true);
            setMixedArray([...template.facebook_story_video]);
            setDriveVideoClickedArray([...template.facebook_story_video]);
          }

          if (template?.facebook_reels) {
            setFbreelsChecked(true);
            setVideoPresent(true);
            setMixedArray([...template.facebook_reels]);
            setDriveVideoClickedArray([...template.facebook_reels]);
          }

          if (template?.google_searchad) {
            setGoogleSearchedChecked(true);
            setMixedArray([...template.google_searchad]);
            const { images, videos, hasImages } = imageAndVideos(
              template.google_searchad
            );
            if (hasImages) {
              setImagePresent(true);
              setDriveClickedArray([...images]);
            } else {
              setVideoPresent(true);
              setDriveVideoClickedArray([...videos]);
            }
          }

          if (template?.google_displayad) {
            setGoogleDisplayChecked(true);
            setImagePresent(true);
            setMixedArray([...template.google_displayad]);
            setDriveClickedArray([...template.google_displayad]);
          }

          if (template?.google_video_one) {
            setGoogleVideoOneChecked(true);
            setVideoPresent(true);
            setMixedArray([...template.google_video_one]);
            setDriveVideoClickedArray([...template.google_video_one]);
          }

          if (template?.google_video_two) {
            setGoogleVideoTwoChecked(true);
            setVideoPresent(true);
            setMixedArray([...template.google_video_two]);
            setDriveVideoClickedArray([...template.google_video_two]);
          }

          if (template?.google_display_pmax) {
            setMixedArray([...template.google_display_pmax]);
            const { images, videos, hasImages } = imageAndVideos(
              template.google_display_pmax
            );
            if (hasImages) {
              setImagePresent(true);
              setDriveClickedArray([...images]);
            } else {
              setVideoPresent(true);
              setDriveVideoClickedArray([...videos]);
            }
          }

          if (template?.google_gmail_pmax) {
            setMixedArray([...template.google_gmail_pmax]);
            const { images, videos, hasImages } = imageAndVideos(
              template.google_gmail_pmax
            );
            if (hasImages) {
              setImagePresent(true);
              setDriveClickedArray([...images]);
            } else {
              setVideoPresent(true);
              setDriveVideoClickedArray([...videos]);
            }
          }

          if (template?.google_search_pmax) {
            setMixedArray([...template.google_search_pmax]);
            const { images, videos, hasImages } = imageAndVideos(
              template.google_search_pmax
            );
            if (hasImages) {
              setImagePresent(true);
              setDriveClickedArray([...images]);
            } else {
              setVideoPresent(true);
              setDriveVideoClickedArray([...videos]);
            }
          }

          if (template?.google_youtube_pmax) {
            setMixedArray([...template.google_youtube_pmax]);
            const { images, videos, hasImages } = imageAndVideos(
              template.google_youtube_pmax
            );
            if (hasImages) {
              setImagePresent(true);
              setDriveClickedArray([...images]);
            } else {
              setVideoPresent(true);
              setDriveVideoClickedArray([...videos]);
            }
          }

          if (template?.linkedin_feed_one) {
            setLinkedinFeedOneChecked(true);
            setMixedArray([...template.linkedin_feed_one]);
            const { images, videos, hasImages } = imageAndVideos(
              template.linkedin_feed_one
            );
            if (hasImages) {
              setImagePresent(true);
              setDriveClickedArray([...images]);
            } else {
              setVideoPresent(true);
              setDriveVideoClickedArray([...videos]);
            }
          }

          if (template?.linkedin_feed_two) {
            setLinkedinFeedTwoChecked(true);
            setMixedArray([...template.linkedin_feed_two]);
            const { images, videos, hasImages } = imageAndVideos(
              template.linkedin_feed_two
            );
            if (hasImages) {
              setImagePresent(true);
              setDriveClickedArray([...images]);
            } else {
              setVideoPresent(true);
              setDriveVideoClickedArray([...videos]);
            }
          }

          if (template?.linkedin_feed_three) {
            setLinkedinFeedThreeChecked(true);
            setMixedArray([...template.linkedin_feed_three]);
            const { images, videos, hasImages } = imageAndVideos(
              template.linkedin_feed_three
            );
            if (hasImages) {
              setImagePresent(true);
              setDriveClickedArray([...images]);
            } else {
              setVideoPresent(true);
              setDriveVideoClickedArray([...videos]);
            }
          }
        }

      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [campaignDetails, tgDetails]);


    useEffect(() => {
      if (campaignDetails?.[0]?.templateJson == null) {
        setPMaxStatus(campaignDetails?.objectiveInfo?.pMax);
        setCampaignObjective(campaignDetails?.objective);
        setCampaingSiteUrl(campaignDetails?.siteUrl);
        setBrandName(campaignDetails?.brand?.brand_name);
        setBrandLogos(campaignDetails?.brand?.brand_logos);

        if (platforms.includes("Instagram")) {
          if (
            mixedArray.length > 0 &&
            driveVideoClickedArray.length > 0 &&
            driveClickedArray.length == 0
          ) {
            setInstaPostChecked(true);

            setInstaStoryVideoChecked(true);
            setInstareelsChecked(true);

            setInstaStoryChecked(false);
          } else if (
            mixedArray.length > 0 &&
            driveVideoClickedArray.length == 0 &&
            driveClickedArray.length > 0
          ) {
            setInstaPostChecked(true);
            setInstaStoryChecked(true);

            setInstaStoryVideoChecked(false);
            setInstareelsChecked(false);
          }
        }
        if (platforms.includes("Facebook")) {
          if (
            mixedArray.length > 0 &&
            driveVideoClickedArray.length > 0 &&
            driveClickedArray.length == 0
          ) {
            setFbPostChecked(true);
            setFbMarketplaceChecked(true);

            setFbreelsChecked(true);
            setFbStoryVideoChecked(true);

            setFbStoryChecked(false);
          } else if (
            mixedArray.length > 0 &&
            driveVideoClickedArray.length == 0 &&
            driveClickedArray.length > 0
          ) {
            setFbPostChecked(true);
            setFbMarketplaceChecked(true);
            setFbStoryChecked(true);

            setFbreelsChecked(false);
            setFbStoryVideoChecked(false);
          }
        }

        if (platforms.includes("Google")) {
          if (
            pMaxStatus == false ||
            pMaxStatus == undefined ||
            pMaxStatus == null
          ) {
            if (
              mixedArray.length > 0 &&
              driveVideoClickedArray.length > 0 &&
              driveClickedArray.length === 0
            ) {
              setGoogleSearchedChecked(true);
              // setGoogleVideoOneChecked(true);
              // setGoogleVideoTwoChecked(true);

              setGoogleDisplayChecked(false);
            } else if (
              mixedArray.length > 0 &&
              driveVideoClickedArray.length === 0 &&
              driveClickedArray.length > 0
            ) {
              setGoogleSearchedChecked(true);
              setGoogleDisplayChecked(true);

              // setGoogleVideoOneChecked(false);
              // setGoogleVideoTwoChecked(false);
            }
          }
        }

        if (platforms.includes("LinkedIn")) {
          if (
            mixedArray.length > 1 ||
            driveVideoClickedArray.length > 1 ||
            driveClickedArray.length > 1
          ) {
            setLinkedinFeedOneChecked(false);
            setLinkedinFeedTwoChecked(false);
            setLinkedinFeedThreeChecked(true);
          } else if (
            mixedArray.length == 1 ||
            driveVideoClickedArray.length == 1 ||
            driveClickedArray.length == 1
          ) {
            setLinkedinFeedOneChecked(true);
            setLinkedinFeedTwoChecked(true);
            setLinkedinFeedThreeChecked(false);
          }
        }
      }
    }, [driveClickedArray, driveVideoClickedArray, mixedArray]);

    const platforms = Object.keys(tgDetails?.platforms)

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
      setErrorMedia(true)
      setUploadImageProcess(true);
    };

    const videoUpload = () => {
      setErrorMedia(true)
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

    const deleteHeadline = (index: number) => {
      setHeadlineInputs(headlineInputs.filter((_, i) => i !== index));
    };

    const addDescription = () => {
      if (descriptionInputs.length < 3) {
        setDescriptionInputs([...descriptionInputs, ""]);
      }
    };

    const deleteDescription = (index: number) => {
      setDescriptionInputs(descriptionInputs.filter((_, i) => i !== index));
    };

    const addCaption = () => {
      if (captionInputs.length < 3) {
        setCaptionInputs([...captionInputs, ""]);
      }
    };

    const deleteCaption = (index: number) => {
      setCaptionInputs(captionInputs.filter((_, i) => i !== index));
    };

    const handleInputHeadlineChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const newInputs = [...headlineInputs];
      newInputs[index] = event.target.value;
      setHeadlineInputs(newInputs);
    };

    const handleInputDescriptionChange = (index: number) => (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newInputs = [...descriptionInputs];
      newInputs[index] = event.target.value;
      setDescriptionInputs(newInputs);
    };

    const handleInputCaptionChange = (index: number) => (event: React.ChangeEvent<HTMLTextAreaElement>) => {
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
          (item: any) => item.id === itemToDelete.id
        );
        if (imageIndex !== -1) {
          const newImageArray = [...driveClickedArray];
          newImageArray.splice(imageIndex, 1);
          setDriveClickedArray(newImageArray);
        }
      } else if (type === "videos") {
        const videoIndex = driveVideoClickedArray.findIndex(
          (item: any) => item.id === itemToDelete.id
        );
        if (videoIndex !== -1) {
          const newVideoArray = [...driveVideoClickedArray];
          newVideoArray.splice(videoIndex, 1);
          setDriveVideoClickedArray(newVideoArray);
        }
      }
    };

    const metaGetCtaValue = (objective: any) => {
      switch (objective) {
        case "Brand Awareness":
          return "Learn More";
        case "Traffic":
          return "Learn More";
        case "Engagement":
          return "Engage";
        case "Video views":
          return "Watch More";
        case "Lead generation":
          return "Apply Now";
        case "Website conversion":
          return "Sign Up";
        case "Store traffic":
          return "Shop Now";
        case "Catalogue sales":
          return "Shop Now";
        case "UAC/AAA":
          return "Download";
        default:
          return "";
      }
    };

    const googleGetCtaValue = (objective: any) => {
      switch (objective) {
        case "Brand Awareness":
          return "Learn More";
        case "Traffic":
          return "Visit Site";
        case "Engagement":
          return "Learn More";
        case "Video views":
          return "Watch Now";
        case "Lead generation":
          return "Apply Now";
        case "Website conversion":
          return "Sign Up";
        case "Store traffic":
          return "Shop Now";
        case "Catalogue sales":
          return "Shop Now";
        case "UAC/AAA":
          return "Download";
        default:
          return "";
      }
    };

    const linkedinGetCtaValue = (objective: any) => {
      switch (objective) {
        case "Brand Awareness":
          return "Learn More";
        case "Traffic":
          return "Visit Website";
        case "Engagement":
          return "Follow";
        case "Video views":
          return "Watch";
        case "Lead generation":
          return "Apply Now";
        case "Website conversion":
          return "Sign Up";
        case "Store traffic":
          return "Visit Store";
        case "Catalogue sales":
          return "Shop Now";
        case "UAC/AAA":
          return "Download";
        default:
          return "";
      }
    };


    useEffect(() => {
      const videoItems = mixedArray.filter(
        (item: any) => item.type === "videos"
      );

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
        INSTAGRAM: {
          ...(instaPostChecked
            ? {
              instagram_post: mixedArray,
              cta: metaGetCtaValue(campainObjective),
            }
            : {}),

          ...(instaStoryChecked
            ? {
              instagram_story_image: mixedArray,
              cta: metaGetCtaValue(campainObjective),
            }
            : {}),

          ...(instaStoryVideoChecked
            ? {
              instagram_story_video: mixedArray,
              cta: metaGetCtaValue(campainObjective),
            }
            : {}),

          ...(instareelsChecked
            ? {
              instagram_reels: mixedArray,
              cta: metaGetCtaValue(campainObjective),
            }
            : {}),
        },
        FACEBOOK: {
          ...(fbPostChecked
            ? {
              facebook_post: mixedArray,
              cta: metaGetCtaValue(campainObjective),
            }
            : {}),

          ...(fbStoryChecked
            ? {
              facebook_story_image: mixedArray,
              cta: metaGetCtaValue(campainObjective),
            }
            : {}),

          ...(fbStoryVideoChecked
            ? {
              facebook_story_video: mixedArray,
              cta: metaGetCtaValue(campainObjective),
            }
            : {}),

          ...(fbMarketplaceChecked
            ? {
              facebook_marketplace: mixedArray,
              cta: metaGetCtaValue(campainObjective),
            }
            : {}),
          ...(fbreelsChecked
            ? {
              facebook_reels: mixedArray,
              cta: metaGetCtaValue(campainObjective),
            }
            : {}),
        },
        GOOGLE:
          pMaxStatus == true
            ? {
              google_display_pmax: mixedArray,
              google_gmail_pmax: mixedArray,
              google_search_pmax: mixedArray,
              google_youtube_pmax: mixedArray,
            }
            : {
              ...(googleSearchedChecked
                ? {
                  google_searchad: mixedArray,

                  cta: googleGetCtaValue(campainObjective),
                }
                : {}),

              ...(googleDisplayChecked
                ? {
                  google_displayad: mixedArray,

                  cta: googleGetCtaValue(campainObjective),
                }
                : {}),

              ...(googleVideoOneChecked
                ? {
                  google_video_one: mixedArray,

                  cta: googleGetCtaValue(campainObjective),
                }
                : {}),

              ...(googleVideoTwoChecked
                ? {
                  google_video_two: mixedArray,

                  cta: googleGetCtaValue(campainObjective),
                }
                : {}),
            },
        LINKEDIN: {
          ...(linkedinFeedOneChecked
            ? {
              linkedin_feed_one: mixedArray,

              cta: linkedinGetCtaValue(campainObjective),
            }
            : {}),

          ...(linkedinFeedTwoChecked
            ? {
              linkedin_feed_two: mixedArray,
              cta: linkedinGetCtaValue(campainObjective),
            }
            : {}),
          ...(linkedinFeedThreeChecked
            ? {
              linkedin_feed_three: mixedArray,
              cta: linkedinGetCtaValue(campainObjective),
            }
            : {}),
        },
      };

      const payload = { platforms: {} }
      for (let platform of platforms) {

        const platformName = platform.toUpperCase();
        const templateJson = {
          heading: headlineInputs,
          description: descriptionInputs,
          caption: captionInputs,
          urls: youtubeUrls,
          ...(platformTemplates[platformName] || {}),
        };
        payload.platforms[platformName] = {
          unique_adbatch_id: unique_adbatch_id,
          isExit: isExit,
          templateJson,
        };
      }

      return payload;
    };

    useImperativeHandle(ref, () => ({
      getData: () => adCreativeNextClick(),
    }));

    const adCreativeNextClick = () => {

      // Validate the number of inputs
      const hasValidInputs =
        headlineInputs.length == 3 &&
        descriptionInputs.length >= 2 &&
        captionInputs.length >= 1;

      // Validate character limits for each input
      const isValidHeadlines = headlineInputs.every(
        (headline) => headline.length > 0 && headline.length <= 30
      );

      const isValidDescriptions = descriptionInputs.every(
        (description) => description.length > 0 && description.length <= 90
      );
      const isValidCaptions = captionInputs.every(
        (caption) => caption.length > 0 && caption.length <= 90
      );

      // Check platform conditions
      const platformConditions = [
        {
          present: platforms.includes("Instagram"),
          checked:
            instaPostChecked ||
            instaStoryChecked ||
            instaStoryVideoChecked ||
            instareelsChecked,
        },
        {
          present: platforms.includes("Facebook"),
          checked:
            fbPostChecked ||
            fbMarketplaceChecked ||
            fbStoryChecked ||
            fbStoryVideoChecked ||
            fbreelsChecked,
        },
        {
          present: platforms.includes("Google"),
          checked:
            pMaxStatus ||
            googleSearchedChecked ||
            googleDisplayChecked ||
            googleVideoOneChecked ||
            googleVideoTwoChecked,
        },
        {
          present: platforms.includes("LinkedIn"),
          checked:
            linkedinFeedOneChecked ||
            linkedinFeedTwoChecked ||
            linkedinFeedThreeChecked,
        },
      ];

      const activePlatforms = platformConditions.filter((p) => p.present);
      const allChecked = activePlatforms.every((p) => p.checked);

      // Final validation check
      if (
        hasValidInputs &&
        isValidHeadlines &&
        isValidDescriptions &&
        isValidCaptions &&
        allChecked
      ) {
        return apiCall();
      } else {
        setErrorMedia(allChecked)
        setError(true)
        toast.warn(
          <>
            <span className="text-white text-[16px] leading-[20px]">
              {" "}
              Information Missing!
            </span>
            <br />
            <span className="text-white text-[12px] leading-[18px] truncate2lines mt-2">
              {" "}
              Please fill{" "}
              <span className=" text-nyx-red font-semibold">*</span> marked
              fields Correctly.
            </span>
          </>,
          { autoClose: 5000 }
        );
      }
    };

    const updateButtonState = (amountLeft: number) => {
      if (reorderGroup.current && reorderGroupParent.current) {
        const sliderWidth = reorderGroup.current.scrollWidth;
        const containerWidth = reorderGroupParent.current.clientWidth;
        setIsNextDisabled(
          sliderWidth <= containerWidth ||
          amountLeft + containerWidth >= sliderWidth
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
          name: campaignDetails[0]?.campaignName,
          objective: campaignDetails[0]?.objective,
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
          (product: any) => product.id === campaignDetails[0]?.productId
        ),
        targetGroup: campaignDetails[0]?.targetGroups,
      };

      mutateAiHeadlineSuggestion.mutate(payload, {
        onSuccess: (response: any) => {
          if (response?.headlines.length > 0) {
            setHeadlineInputs(
              response?.headlines?.map((headline: any) => headline.slice(0, 30))
            );
          } else {
            setHeadlineInputs(["", "", ""]);
          }

          if (response?.descriptions.length > 0) {
            setDescriptionInputs(
              response?.descriptions?.map((description: any) =>
                description.slice(0, 90)
              )
            );
          } else {
            setDescriptionInputs(["", ""]);
          }

          if (response?.captions.length > 0) {
            setCaptionInputs(
              response?.captions?.map((caption: any) => caption.slice(0, 90))
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
          selectedDriveThumbnail?.file_details?.signed_image_url
        );
        setUploadThumbnailProcess(false);
      }
    };

    useEffect(() => {
      // setMixedArraysValue(mixedArray);
    }, [mixedArray.length]);

    return (
      <>
        <div className="flex gap-3 mt-5">
          <div className="w-[38.5%]  flex flex-col">
            <div className="ml-5 bg-[#23145A] pb-3 rounded-t-lg">
              <MultipletgTab
                data={targetGroups}
                activeTg={activeTgTab}
                setActiveTg={setActiveTgTab}
              />
              <MultipleAd
                ads={ads}
                activeAd={activeAd}
                setActiveAd={setActiveAd}
                addNewAd={addNewAd}
                removeAd={removeAd}
              />
            </div>
            <div className="w-full  flex flex-col  overflow-hidden overflow-y-auto h-[68vh] px-[20px] xl:px-6 mt-6 pb-[33px] PanelHeight">
              <div className="w-full flex flex-col gap-[14px] mb-[48px]">
                <p className="w-full text-white text-sm font-[600] flex gap-1">
                  Select Media <span className="ml-1 text-nyx-red">*</span>
                </p>

                <div className="w-full flex gap-[23px]">
                  {search.get("objective") == "Video views" ||
                    (mixedArray?.length > 0 &&
                      driveVideoClickedArray?.length > 0) ||
                    videoPresent ? (
                    <button
                      className={`w-full h-[40px] text-black rounded flex justify-center items-center px-5 cursor-not-allowed bg-[#8297BD] border border-[#8297BD] text-[14px] leading-[17px]`}
                    >
                      <span className="flex items-center gap-[6px]">
                        <svg
                          width="22"
                          height="18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M2.645 2h3.19l2.128-2h6.382l2.127 2h3.191c.564 0 1.105.21 1.504.586.4.375.623.884.623 1.414v12c0 .53-.224 1.04-.623 1.414-.399.375-.94.586-1.504.586H2.645c-.564 0-1.105-.21-1.504-.586A1.941 1.941 0 0 1 .518 16V4c0-.53.224-1.04.623-1.414A2.192 2.192 0 0 1 2.645 2Zm8.509 3c-1.41 0-2.763.527-3.76 1.464-.998.938-1.558 2.21-1.558 3.536s.56 2.598 1.557 3.536A5.498 5.498 0 0 0 11.153 15c1.411 0 2.764-.527 3.761-1.464.998-.938 1.558-2.21 1.558-3.536s-.56-2.598-1.558-3.536C13.918 5.527 12.565 5 11.155 5Zm0 2c.846 0 1.658.316 2.256.879.599.562.935 1.325.935 2.121s-.336 1.559-.935 2.121a3.297 3.297 0 0 1-2.256.879 3.297 3.297 0 0 1-2.256-.879A2.912 2.912 0 0 1 7.963 10c0-.796.336-1.559.935-2.121A3.297 3.297 0 0 1 11.154 7Z"
                            fill="black"
                          />
                        </svg>
                        Image
                      </span>{" "}
                    </button>
                  ) : (
                    <button
                      className={`w-full h-[40px] text-white rounded flex justify-center items-center px-5 cursor-pointer border border-[#543891] bg-[#332270] hover:bg-[#5E32FF] hover:border-[#5E32FF] text-[14px] leading-[17px]`}
                      onClick={imageUpload}
                    >
                      <span className="flex items-center gap-[6px]">
                        <svg
                          width="22"
                          height="18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M2.645 2h3.19l2.128-2h6.382l2.127 2h3.191c.564 0 1.105.21 1.504.586.4.375.623.884.623 1.414v12c0 .53-.224 1.04-.623 1.414-.399.375-.94.586-1.504.586H2.645c-.564 0-1.105-.21-1.504-.586A1.941 1.941 0 0 1 .518 16V4c0-.53.224-1.04.623-1.414A2.192 2.192 0 0 1 2.645 2Zm8.509 3c-1.41 0-2.763.527-3.76 1.464-.998.938-1.558 2.21-1.558 3.536s.56 2.598 1.557 3.536A5.498 5.498 0 0 0 11.153 15c1.411 0 2.764-.527 3.761-1.464.998-.938 1.558-2.21 1.558-3.536s-.56-2.598-1.558-3.536C13.918 5.527 12.565 5 11.155 5Zm0 2c.846 0 1.658.316 2.256.879.599.562.935 1.325.935 2.121s-.336 1.559-.935 2.121a3.297 3.297 0 0 1-2.256.879 3.297 3.297 0 0 1-2.256-.879A2.912 2.912 0 0 1 7.963 10c0-.796.336-1.559.935-2.121A3.297 3.297 0 0 1 11.154 7Z"
                            fill="#fff"
                          />
                        </svg>
                        Image
                      </span>{" "}
                    </button>
                  )}

                  {(mixedArray?.length > 0 &&
                    driveClickedArray?.length > 0) ||
                    (mixedArray?.length > 0 &&
                      driveVideoClickedArray?.length == 1) ||
                    imagePresent ? (
                    <button
                      className={`w-full h-[40px] text-black rounded flex justify-center items-center px-5 cursor-not-allowed bg-[#8297BD] border border-[#8297BD] text-[14px] leading-[17px]`}
                    >
                      <span className="flex items-center gap-[6px]">
                        <svg
                          width="22"
                          height="14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M17.727 2c0-1.103-.954-2-2.127-2H2.836C1.663 0 .71.897.71 2v10c0 1.103.954 2 2.127 2H15.6c1.173 0 2.127-.897 2.127-2V8.667L21.982 12V2l-4.255 3.333V2Z"
                            fill="black"
                          />
                        </svg>
                        Video
                      </span>
                    </button>
                  ) : (
                    <button
                      className={`w-full h-[40px] text-white rounded flex justify-center items-center px-5 cursor-pointer border border-[#543891] bg-[#332270] hover:bg-[#5E32FF] hover:border-[#5E32FF] text-[14px] leading-[17px]`}
                      onClick={videoUpload}
                    >
                      <span className="flex items-center gap-[6px]">
                        <svg
                          width="22"
                          height="14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M17.727 2c0-1.103-.954-2-2.127-2H2.836C1.663 0 .71.897.71 2v10c0 1.103.954 2 2.127 2H15.6c1.173 0 2.127-.897 2.127-2V8.667L21.982 12V2l-4.255 3.333V2Z"
                            fill="#fff"
                          />
                        </svg>
                        Video
                      </span>
                    </button>
                  )}
                </div>
                {!errorMedia && (<div className={classNames(
                  "w-full bg-transparent border-2 rounded-md p-2 text-white text-sm placeholder:italic border-red-500"
                )}>Select at least one post from each platform for the next steps.</div>)}
              </div>

              <div className="w-full flex justify-between">
                <p className=" text-[14px] leading-[17px] xl:text-[16px] xl:leading-[20px] font-bold text-white">
                  Ad Copy Content
                </p>
                <div>
                  <button
                    className={`w-[171px] xl:w-[210px] h-[42px] rounded-[8px] py-[7px] px-[10px] xl:px-[16px] flex gap-2 items-center justify-center cursor-pointer ${mutateAiHeadlineSuggestion.isPending
                      ? "bg-[#5E32FF]"
                      : "bg-[#28134B] hover:bg-[#5E32FF]"
                      }`}
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
                      <div className="w-full flex items-center justify-center gap-[6px] xl:gap-2 ">
                        <div className="hidden xl:block">
                          <svg
                            width="28"
                            height="28"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              width="28"
                              height="28"
                              rx="14"
                              fill="#8252FD"
                            />
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M13.444 8.13c-.325-.892-1.587-.892-1.912 0l-1.476 4.058-4.058 1.476c-.893.325-.893 1.588 0 1.913l4.058 1.476 1.476 4.057c.325.893 1.587.893 1.912 0l1.476-4.057 4.058-1.476c.893-.325.893-1.588 0-1.913l-4.058-1.476-1.476-4.057Z"
                              fill="#fff"
                            />
                            <g clipPath="url(#b)">
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M20.05 6.51a.43.43 0 0 0-.807 0l-.624 1.713-1.714.624a.43.43 0 0 0 0 .808l1.714.623.624 1.714a.43.43 0 0 0 .808 0l.623-1.714 1.714-.623a.43.43 0 0 0 0-.808l-1.714-.624-.623-1.714Z"
                                fill="#fff"
                              />
                            </g>
                            <defs>
                              <clipPath id="b">
                                <path
                                  fill="#fff"
                                  transform="translate(16.623 6.227)"
                                  d="M0 0h6.049v6.049H0z"
                                />
                              </clipPath>
                            </defs>
                          </svg>
                        </div>
                        <div className="block xl:hidden">
                          <svg
                            width="22"
                            height="18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              x="4"
                              y="2"
                              width="14"
                              height="14"
                              rx="7"
                              fill="#8252FD"
                            />
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M10.967 6.327a.497.497 0 0 0-.934 0L9.31 8.311l-1.984.721a.498.498 0 0 0 0 .936l1.984.721.722 1.984a.497.497 0 0 0 .934 0l.722-1.984 1.984-.721a.498.498 0 0 0 0-.936l-1.984-.721-.722-1.984ZM13.7 5.14a.213.213 0 0 0-.4 0l-.31.85-.85.31a.213.213 0 0 0 0 .4l.85.31.31.85a.213.213 0 0 0 .4 0l.31-.85.85-.31a.213.213 0 0 0 0-.4l-.85-.31-.31-.85Z"
                              fill="#fff"
                            />
                          </svg>
                        </div>
                        <p className="font-semibold text-[12px] leading-[14px] xl:text-[14px] xl:leading-[17px] text-white">
                          Ask AI Suggestions
                        </p>
                      </div>
                    )}
                  </button>
                  <p className="text-[10px] font-normal text-end text-white leading-[12px] mt-[6px]">
                    for optimized results
                  </p>
                </div>
              </div>

              <div className="w-full flex flex-col ">
                <div className="w-full flex  gap-2">
                  <p className="text-white text-sm font-[600] mb-[8px]">
                    Headline<span className="ml-1 text-nyx-red">*</span>
                  </p>
                  <div className="text-white flex items-center group relative">
                    <BsFillInfoCircleFill className="cursor-pointer text-[12px] mt-[-5px]" />
                    <div className="absolute top-[35px] left-[-60px] bg-[#0d0718] text-white p-4 w-[300px] rounded-2xl z-10 hidden group-hover:block transition-opacity duration-300 text-[14px]">
                      Be compelling. Motivate actions in 5 words or less,
                      for google you need atleast 3 headlines.
                    </div>
                  </div>
                </div>

                {headlineInputs?.map((input, index) => (
                  <div
                    key={`headline-container-${index}`}
                    className="w-full relative group mb-[12px]"
                  >
                    <input
                      key={`headline-${index}`}
                      type="text"
                      value={input}
                      placeholder={`Enter your headline ${index + 1}`}
                      className={classNames(
                        "w-full bg-transparent border-2 rounded-md p-2 text-white text-sm placeholder:italic",
                        (error) &&
                          input.length === 0
                          ? "border-red-500"
                          : "border-[#FFFFFF33] focus:outline-none"
                      )}
                      onChange={handleInputHeadlineChange(index)}
                      maxLength={30}
                      onFocus={(e) => {
                        const nextSibling = e.target
                          .nextElementSibling as HTMLElement;
                        if (nextSibling)
                          nextSibling.style.display = "block";
                      }}
                      onBlur={(e) => {
                        const nextSibling = e.target
                          .nextElementSibling as HTMLElement;
                        if (nextSibling) nextSibling.style.display = "none";
                      }}
                    />

                    <p
                      className={`w-full text-right text-xs mt-1 font-[400] ${input.length === 30 ? "text-red-500" : "text-white"
                        }`}
                      style={{ display: "none" }} // Initially hide the paragraph
                    >
                      {input.length} / 30 characters
                    </p>

                    {index >= 3 && (
                      <button
                        onClick={() => deleteHeadline(index)}
                        className="absolute top-[-10px] right-[-10px] text-white bg-[#28134B] group-hover:opacity-100 opacity-0 rounded-full w-[23px] h-[23px] flex justify-center items-center text-sm"
                      >
                        x
                      </button>
                    )}
                  </div>
                ))}

                {headlineInputs?.length < 3 && (
                  <button
                    onClick={addHeadline}
                    className="text-[#FFCB54] underline underline-offset-3  hover:text-nyx-yellow w-max text-[12px] leading-[20px] font-[500] flex justify-center items-center"
                  >
                    + Add Headline
                  </button>
                )}
              </div>

              <div className="w-full flex flex-col mt-[24px]">
                <div className="w-full flex gap-2">
                  <p className="text-white text-sm font-[600] mb-2">
                    Ad description
                    <span className="ml-1 text-nyx-red">*</span>
                  </p>
                  <div className="text-white flex items-center group relative">
                    <BsFillInfoCircleFill className="cursor-pointer text-[12px] mt-[-5px]" />
                    <div className="absolute top-[35px] left-[-60px] bg-[#0d0718] text-white p-4 w-[300px] rounded-2xl z-10 hidden group-hover:block transition-opacity duration-300 text-[14px]">
                      Tell customers why should they choose you. Use
                      statistics.Add 2-4 line description.
                    </div>
                  </div>
                </div>

                {descriptionInputs?.map((input, index) => (
                  <div
                    key={`description-${index}`}
                    className="w-full relative group mb-[12px]"
                  >
                    <textarea
                      value={input}
                      placeholder={`Enter your description ${index + 1}`}
                      className={classNames(
                        "w-full bg-transparent border-2 rounded-md p-2 text-white resize-none text-sm placeholder:italic",
                        (error) &&
                          input.length === 0
                          ? "border-red-500"
                          : "border-[#FFFFFF33] focus:outline-none"
                      )}
                      rows={3}
                      onChange={handleInputDescriptionChange(index)}
                      maxLength={90}
                      onFocus={(e) => {
                        const nextSibling = e.target
                          .nextElementSibling as HTMLElement;
                        if (nextSibling)
                          nextSibling.style.display = "block";
                      }}
                      onBlur={(e) => {
                        const nextSibling = e.target
                          .nextElementSibling as HTMLElement;
                        if (nextSibling) nextSibling.style.display = "none";
                      }}
                    />

                    <p
                      className={`w-full text-right text-xs mt-1 font-[400] ${input.length === 90 ? "text-red-500" : "text-white"
                        }`}
                      style={{ display: "none" }} // Initially hide the paragraph
                    >
                      {input.length} / 90 characters
                    </p>

                    {index >= 2 && (
                      <button
                        onClick={() => deleteDescription(index)}
                        className="absolute top-[-10px] right-[-10px] text-white  bg-[#28134B] group-hover:opacity-100 opacity-0 rounded-full w-[23px] h-[23px] flex justify-center items-center text-sm"
                      >
                        x
                      </button>
                    )}
                  </div>
                ))}
                {descriptionInputs?.length < 3 && (
                  <button
                    onClick={addDescription}
                    className="text-[#FFCB54] underline underline-offset-3  hover:text-nyx-yellow w-max text-[12px] leading-[20px] font-[500] flex justify-center items-center"
                  >
                    + Add Description
                  </button>
                )}
              </div>

              <div className="w-full flex flex-col mt-[24px]">
                <div className="w-full flex gap-2">
                  <p className="text-white text-sm font-[600] mb-2">
                    Provide your caption
                    <span className="ml-1 text-nyx-red">*</span>
                  </p>
                  <div className="text-white flex items-center group relative">
                    <BsFillInfoCircleFill className="cursor-pointer text-[12px] mt-[-5px]" />
                    <div className="absolute top-[35px] left-[-60px] bg-[#0d0718] text-white p-4 w-[300px] rounded-2xl z-10 hidden group-hover:block transition-opacity duration-300 text-[14px]">
                      There will be the description or caption of your post,
                      which people will see after your ad.
                    </div>
                  </div>
                </div>

                {captionInputs?.map((input, index) => (
                  <div
                    key={`caption-${index}`}
                    className="w-full relative group mb-[12px]"
                  >
                    <textarea
                      value={input}
                      placeholder={`Enter your caption ${index + 1}`}
                      className={classNames(
                        "w-full bg-transparent border-2 rounded-md p-2  text-white resize-none text-sm placeholder:italic",
                        (error) &&
                          input.length === 0
                          ? "border-red-500"
                          : "border-[#FFFFFF33]  focus:outline-none"
                      )}
                      rows={3}
                      onChange={handleInputCaptionChange(index)}
                      maxLength={90}
                      onFocus={(e) => {
                        const nextSibling = e.target
                          .nextElementSibling as HTMLElement;
                        if (nextSibling)
                          nextSibling.style.display = "block";
                      }}
                      onBlur={(e) => {
                        const nextSibling = e.target
                          .nextElementSibling as HTMLElement;
                        if (nextSibling) nextSibling.style.display = "none";
                      }}
                    />

                    <p
                      className={`w-full text-right text-xs mt-1 font-[400] ${input.length === 90 ? "text-red-500" : "text-white"
                        }`}
                      style={{ display: "none" }} // Initially hide the paragraph
                    >
                      {input.length} / 90 characters
                    </p>

                    {index >= 1 && (
                      <button
                        onClick={() => deleteCaption(index)}
                        className="absolute top-[-10px] right-[-10px] text-white bg-[#28134B] group-hover:opacity-100 opacity-0 rounded-full w-[23px] h-[23px] flex justify-center items-center text-sm"
                      >
                        x
                      </button>
                    )}
                  </div>
                ))}
                {captionInputs?.length < 3 && (
                  <button
                    onClick={addCaption}
                    className="text-[#FFCB54] underline underline-offset-3 hover:text-nyx-yellow w-max text-[12px] leading-[20px] font-[500] flex justify-center items-center"
                  >
                    + Add Caption
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="w-[60%] bg-[#23145A] h-[90vh] rounded-t-[10px] relative">
            <div className="w-full h-full flex flex-col ">
              <div className="w-[100%] bg-[#332270] rounded-t-[10px]">
                <AdManagerTabs
                  data={platforms as string[]}
                  activeTabName={activeTabName}
                  onTabChange={setMediaTab}
                />
              </div>
              <div className="w-full">
                {activeTabName === "Instagram" && (
                  <div className="overflow-hidden overflow-y-auto max-h-[390px] xl:max-h-[450px] pb-6 flex items-baseline justify-center flex-wrap gap-[40px]">
                    {mixedArray?.length > 0 &&
                      driveVideoClickedArray?.length > 0 &&
                      driveClickedArray?.length == 0 ? (
                      <>
                        <InstaPost
                          headlines={headlineInputs}
                          descriptions={descriptionInputs}
                          captions={captionInputs}
                          mixedArray={mixedArray}
                          instaPostChecked={instaPostChecked}
                          setInstaPostChecked={setInstaPostChecked}
                          campainObjective={campainObjective}
                          brandName={brandName}
                          brandLogos={brandLogos}
                        />
                        <InstaStoriesVideo
                          headlines={headlineInputs}
                          descriptions={descriptionInputs}
                          captions={captionInputs}
                          mixedArray={mixedArray}
                          instaStoryVideoChecked={instaStoryVideoChecked}
                          setInstaStoryVideoChecked={
                            setInstaStoryVideoChecked
                          }
                          driveClickedArray={driveClickedArray}
                          driveVideoClickedArray={driveVideoClickedArray}
                          campainObjective={campainObjective}
                          brandName={brandName}
                          brandLogos={brandLogos}
                          previewUrl={previewUrl}
                        />

                        <InstaReels
                          headlines={headlineInputs}
                          descriptions={descriptionInputs}
                          captions={captionInputs}
                          instareelsChecked={instareelsChecked}
                          setInstareelsChecked={setInstareelsChecked}
                          driveVideoClickedArray={driveVideoClickedArray}
                          campainObjective={campainObjective}
                          brandName={brandName}
                          previewUrl={previewUrl}
                          brandLogos={brandLogos}
                        />
                      </>
                    ) : mixedArray?.length > 0 &&
                      driveVideoClickedArray?.length == 0 &&
                      driveClickedArray?.length > 0 ? (
                      <>
                        <InstaPost
                          headlines={headlineInputs}
                          descriptions={descriptionInputs}
                          captions={captionInputs}
                          mixedArray={mixedArray}
                          instaPostChecked={instaPostChecked}
                          setInstaPostChecked={setInstaPostChecked}
                          campainObjective={campainObjective}
                          brandName={brandName}
                          brandLogos={brandLogos}
                        />

                        <InstaStoriesCarousel
                          headlines={headlineInputs}
                          descriptions={descriptionInputs}
                          captions={captionInputs}
                          mixedArray={mixedArray}
                          instaStoryChecked={instaStoryChecked}
                          setInstaStoryChecked={setInstaStoryChecked}
                          driveClickedArray={driveClickedArray}
                          driveVideoClickedArray={driveVideoClickedArray}
                          campainObjective={campainObjective}
                          brandName={brandName}
                          brandLogos={brandLogos}
                        />
                      </>
                    ) : (
                      <div className="w-full h-[300px] text-white p-5 font-semibold text-lg">
                        Please select the media before proceeding.
                      </div>
                    )}
                  </div>
                )}
                {activeTabName === "Facebook" && (
                  <div className="overflow-hidden overflow-y-auto max-h-[390px] xl:max-h-[450px] pb-6 flex items-baseline justify-center flex-wrap gap-[40px]">
                    {mixedArray?.length > 0 &&
                      driveVideoClickedArray?.length > 0 &&
                      driveClickedArray?.length == 0 ? (
                      <>
                        <FbPost
                          headlines={headlineInputs}
                          descriptions={descriptionInputs}
                          captions={captionInputs}
                          fbPostChecked={fbPostChecked}
                          setFbPostChecked={setFbPostChecked}
                          campaingSiteUrl={campaingSiteUrl}
                          campainObjective={campainObjective}
                          brandName={brandName}
                          mixedArray={mixedArray}
                          brandLogos={brandLogos}
                        />

                        <FbMarketPlace
                          headlines={headlineInputs}
                          descriptions={descriptionInputs}
                          captions={captionInputs}
                          fbMarketplaceChecked={fbMarketplaceChecked}
                          setFbMarketplaceChecked={setFbMarketplaceChecked}
                          campaingSiteUrl={campaingSiteUrl}
                          driveClickedArray={driveClickedArray}
                          driveVideoClickedArray={driveVideoClickedArray}
                          campainObjective={campainObjective}
                          brandName={brandName}
                          previewUrl={previewUrl}
                          mixedArray={mixedArray}
                          brandLogos={brandLogos}
                        />
                        <FbStoriesVideo
                          headlines={headlineInputs}
                          descriptions={descriptionInputs}
                          captions={captionInputs}
                          fbStoryVideoChecked={fbStoryVideoChecked}
                          setFbStoryVideoChecked={setFbStoryVideoChecked}
                          campaingSiteUrl={campaingSiteUrl}
                          driveClickedArray={driveClickedArray}
                          driveVideoClickedArray={driveVideoClickedArray}
                          campainObjective={campainObjective}
                          brandName={brandName}
                          mixedArray={mixedArray}
                          brandLogos={brandLogos}
                          previewUrl={previewUrl}
                        />

                        <FbReels
                          headlines={headlineInputs}
                          descriptions={descriptionInputs}
                          captions={captionInputs}
                          fbreelsChecked={fbreelsChecked}
                          setFbreelsChecked={setFbreelsChecked}
                          driveVideoClickedArray={driveVideoClickedArray}
                          campainObjective={campainObjective}
                          brandName={brandName}
                          previewUrl={previewUrl}
                          brandLogos={brandLogos}
                        />
                      </>
                    ) : mixedArray?.length > 0 &&
                      driveVideoClickedArray?.length == 0 &&
                      driveClickedArray?.length > 0 ? (
                      <>
                        <FbPost
                          headlines={headlineInputs}
                          descriptions={descriptionInputs}
                          captions={captionInputs}
                          fbPostChecked={fbPostChecked}
                          setFbPostChecked={setFbPostChecked}
                          campaingSiteUrl={campaingSiteUrl}
                          campainObjective={campainObjective}
                          brandName={brandName}
                          mixedArray={mixedArray}
                          brandLogos={brandLogos}
                        />

                        <FbMarketPlace
                          headlines={headlineInputs}
                          descriptions={descriptionInputs}
                          captions={captionInputs}
                          fbMarketplaceChecked={fbMarketplaceChecked}
                          setFbMarketplaceChecked={setFbMarketplaceChecked}
                          campaingSiteUrl={campaingSiteUrl}
                          driveClickedArray={driveClickedArray}
                          driveVideoClickedArray={driveVideoClickedArray}
                          campainObjective={campainObjective}
                          brandName={brandName}
                          previewUrl={previewUrl}
                          mixedArray={mixedArray}
                          brandLogos={brandLogos}
                        />

                        <FbStoriesCarousel
                          headlines={headlineInputs}
                          descriptions={descriptionInputs}
                          captions={captionInputs}
                          fbStoryChecked={fbStoryChecked}
                          setFbStoryChecked={setFbStoryChecked}
                          campaingSiteUrl={campaingSiteUrl}
                          driveClickedArray={driveClickedArray}
                          driveVideoClickedArray={driveVideoClickedArray}
                          campainObjective={campainObjective}
                          brandName={brandName}
                          mixedArray={mixedArray}
                          brandLogos={brandLogos}
                        />
                      </>
                    ) : (
                      <div className="w-full h-[300px] text-white p-5 font-semibold text-lg">
                        Please select the media before proceeding.
                      </div>
                    )}
                  </div>
                )}
                {activeTabName === "Google" && pMaxStatus == true ? (
                  <div className="w-full overflow-hidden overflow-y-auto max-h-[390px] xl:max-h-[450px] pb-[60px]">
                    {mixedArray?.length > 0 ? (
                      <>
                        <SearchedPmax
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

                        <GoogleGmailPmax
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

                        <DisplayPmax
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

                        <GoogleYoutubePmax
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
                      </>
                    ) : (
                      <div className="w-full h-[300px] text-white p-5 font-semibold text-lg">
                        Please select the media before proceeding.
                      </div>
                    )}
                  </div>
                ) : activeTabName === "Google" ? (
                  <div className="overflow-hidden overflow-y-auto max-h-[390px] xl:max-h-[450px] pb-[60px]">
                    {mixedArray?.length > 0 &&
                      driveVideoClickedArray?.length > 0 &&
                      driveClickedArray?.length == 0 ? (
                      <>
                        <GoogleSearched
                          headlines={headlineInputs}
                          descriptions={descriptionInputs}
                          captions={captionInputs}
                          googleSearchedChecked={googleSearchedChecked}
                          setGoogleSearchedChecked={
                            setGoogleSearchedChecked
                          }
                          campaingSiteUrl={campaingSiteUrl}
                          driveClickedArray={driveClickedArray}
                          driveVideoClickedArray={driveVideoClickedArray}
                          campainObjective={campainObjective}
                          brandName={brandName}
                          brandLogos={brandLogos}
                        />
                      </>
                    ) : mixedArray?.length > 0 &&
                      driveVideoClickedArray?.length == 0 &&
                      driveClickedArray?.length > 0 ? (
                      <>
                        <GoogleSearched
                          headlines={headlineInputs}
                          descriptions={descriptionInputs}
                          captions={captionInputs}
                          googleSearchedChecked={googleSearchedChecked}
                          setGoogleSearchedChecked={
                            setGoogleSearchedChecked
                          }
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
                          googleDisplayChecked={googleDisplayChecked}
                          setGoogleDisplayChecked={setGoogleDisplayChecked}
                          campaingSiteUrl={campaingSiteUrl}
                          driveClickedArray={driveClickedArray}
                          driveVideoClickedArray={driveVideoClickedArray}
                          campainObjective={campainObjective}
                          brandName={brandName}
                          previewUrl={previewUrl}
                          mixedArray={mixedArray}
                          brandLogos={brandLogos}
                        />
                      </>
                    ) : (
                      <div className="w-full h-[300px] text-white p-5 font-semibold text-lg">
                        Please select the media before proceeding.
                      </div>
                    )}
                  </div>
                ) : null}

                {activeTabName === "LinkedIn" && (
                  <div className="overflow-hidden overflow-y-auto   max-h-[400px] xl:max-h-[550px] pb-6 flex items-baseline justify-center flex-wrap gap-[32px] ">
                    {mixedArray?.length == 1 ? (
                      <>
                        <LinkedInFeedOne
                          headlines={headlineInputs}
                          descriptions={descriptionInputs}
                          captions={captionInputs}
                          linkedinFeedOneChecked={linkedinFeedOneChecked}
                          setLinkedinFeedOneChecked={
                            setLinkedinFeedOneChecked
                          }
                          campaingSiteUrl={campaingSiteUrl}
                          driveClickedArray={driveClickedArray}
                          driveVideoClickedArray={driveVideoClickedArray}
                          campainObjective={campainObjective}
                          brandName={brandName}
                          previewUrl={previewUrl}
                          mixedArray={mixedArray}
                          brandLogos={brandLogos}
                        />
                        <LinkedInFeedTwo
                          headlines={headlineInputs}
                          descriptions={descriptionInputs}
                          captions={captionInputs}
                          linkedinFeedTwoChecked={linkedinFeedTwoChecked}
                          setLinkedinFeedTwoChecked={
                            setLinkedinFeedTwoChecked
                          }
                          campaingSiteUrl={campaingSiteUrl}
                          driveClickedArray={driveClickedArray}
                          driveVideoClickedArray={driveVideoClickedArray}
                          campainObjective={campainObjective}
                          brandName={brandName}
                          previewUrl={previewUrl}
                          mixedArray={mixedArray}
                          brandLogos={brandLogos}
                        />
                      </>
                    ) : mixedArray?.length > 1 ? (
                      <>
                        <LinkedInFeedThree
                          headlines={headlineInputs}
                          descriptions={descriptionInputs}
                          captions={captionInputs}
                          linkedinFeedThreeChecked={
                            linkedinFeedThreeChecked
                          }
                          setLinkedinFeedThreeChecked={
                            setLinkedinFeedThreeChecked
                          }
                          campaingSiteUrl={campaingSiteUrl}
                          driveClickedArray={driveClickedArray}
                          driveVideoClickedArray={driveVideoClickedArray}
                          campainObjective={campainObjective}
                          brandName={brandName}
                          mixedArray={mixedArray}
                          brandLogos={brandLogos}
                        />
                      </>
                    ) : (
                      <div className="w-full h-[300px] text-white p-5 font-semibold text-lg">
                        Please select the media before proceeding.
                      </div>
                    )}
                  </div>
                )}
              </div>

              {mixedArray?.length > 0 ? (
                <div
                  className="w-[100%] bg-[#332270] absolute bottom-[75px] left-0 h-[65px] xl:h-[91px] z-50"
                  ref={reorderGroupParent}
                >
                  <button
                    onClick={prevSlide}
                    disabled={scrollCount <= 0}
                    className="absolute cursor-pointer left-[10%] inset-y-0 my-auto size-6 bg-[#000000] text-blue-600 rounded-[50%] z-10 inline-flex justify-center items-center"
                  >
                    <span className="sr-only">Prev</span>
                    <ChevronLeftIcon className="size-4 text-white" />
                  </button>
                  <button
                    onClick={nextSlide}
                    disabled={
                      scrollCount >= maxScrollCount || isNextDisabled
                    }
                    className="absolute cursor-pointer right-[10%] inset-y-0 my-auto size-6 bg-[#000000] text-blue-600 rounded-[50%] z-10 inline-flex justify-center items-center"
                  >
                    <span className="sr-only">Next</span>
                    <ChevronRightIcon className="size-4 text-white " />
                  </button>
                  <Reorder.Group
                    axis="x"
                    values={mixedArray}
                    onReorder={setMixedArray}
                    className="!flex space-x-2 w-[70%] mx-auto transition-transform duration-300 overflow-x-auto bottomSlider "
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
                          selected={Boolean(
                            previewUrl?.url &&
                            previewUrl.url === item.signed_image_url
                          )}
                        ></Draggable>
                      </Reorder.Item>
                    ))}
                  </Reorder.Group>
                </div>
              ) : null}
            </div>
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
  }
);

export default Previews;
