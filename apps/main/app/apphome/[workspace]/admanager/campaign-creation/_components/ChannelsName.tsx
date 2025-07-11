"use client";
import {
  getApp,
  getAllPlatform,
  getPixel,
  getConversionEvent,
  getConversionEventUrl,
} from "@nyx-frontend/main/services/admanagerServices";
import { useState, useEffect, useMemo } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import { AdService } from "@nyx-frontend/main/services/plateformService";
import { useSearchParams } from "next/navigation";
import { AdServiceBrands } from "@nyx-frontend/main/services/admanagerServices";
import Link from "next/link";
import ChainIcon from "@nyx-frontend/main/components/Icons/ChainIcon";
import Select from "react-select";
import Switch from "react-switch";
import "../index.css";
import { admanagerConversion } from "@nyx-frontend/main/utils/productStyle";
import useGlobalStore from "../../store/store";
type PlatformSvgMaName = {
  [key: string]: React.ReactNode;
};

type channelsName = {
  name?: any;
  url?: any;
  setName?: any;
  setChannelIdArray: any;
  channelIdArray: any;
  setChannelsArray: any;
  channlesArray: any;
  setUrl?: any;
  campaignDetails: any;
  allPlatform: any;
  goalData?: any;
  accIds: any;
  setAccIds: any;
  objective: any;
  subTopic: any;
  setPixelData: any;
  pixelData: any;
  appData: any;
  setAppData: any;
  nextClick: any;
  saveClick: any;
  validUrl: any;
  setValidUrl: any;
  setPmax: any;
  pMax: any;
};
const ChannelsName = ({
  name,
  url,
  setUrl,
  setName,
  setChannelsArray,
  channlesArray,
  campaignDetails,
  allPlatform,
  accIds,
  setAccIds,
  objective,
  subTopic,
  setPixelData,
  pixelData,
  appData,
  setAppData,
  nextClick,
  saveClick,
  validUrl,
  setValidUrl,
  setPmax,
  pMax,
}: channelsName) => {
  const handleTabClick = (tabName: any, id: any) => {
    if (!search.has("campaignId")) {
      setChannelIdArray((prevChannelsArray: any) => {
        if (prevChannelsArray.includes(id)) {
          return prevChannelsArray.filter((channel: any) => channel !== id);
        } else {
          return [...prevChannelsArray, id];
        }
      });
      setChannelsArray((prevChannelsArray: any) => {
        if (prevChannelsArray.includes(tabName)) {
          return prevChannelsArray.filter(
            (channel: any) => channel !== tabName,
          );
        } else {
          return [...prevChannelsArray, tabName];
        }
      });

      setAccIds((prevAccIds: any[]) => {
        // Filter out the object with matching platformId
        return prevAccIds.filter((acc: any) => acc.platformId !== id);
      });
    }
  };

  const MetaStandardActions = useMemo(()=>{
    let actions: { value: string; label: string; type: string }[] = [];

    // Mapping based on the objective
    if (objective === "Brand Awareness") {
      // No conversion event required, so actions array remains empty
      actions = [];
    } else if (objective === "Traffic") {
      // No conversion event required, so actions array remains empty
      actions = [];
    } else if (objective === "Engagement" || objective === "App promotion") {
      actions = [
        { value: "VIDEO_VIEWS", label: "Video Views", type: "event" },
        { value: "POST_ENGAGEMENT", label: "Post Engagement", type: "event" },
        { value: "EVENT_RESPONSE", label: "Event Response", type: "event" },
        { value: "ADD_TO_WISHLIST", label: "Add to Wishlist", type: "event" },
        { value: "CONTACT", label: "Contact", type: "event" },
        {
          value: "CUSTOMIZE_PRODUCT",
          label: "Customize Product",
          type: "event",
        },
        { value: "DONATE", label: "Donate", type: "event" },
        { value: "FIND_LOCATION", label: "Find Location", type: "event" },
        { value: "SCHEDULE", label: "Schedule", type: "event" },
        { value: "SEARCH", label: "Search", type: "event" },
        { value: "START_TRIAL", label: "Start Trial", type: "event" },
        {
          value: "SUBMIT_APPLICATION",
          label: "Submit Application",
          type: "event",
        },
        { value: "SUBSCRIBE", label: "Subscribe", type: "event" },
        { value: "CONTENT_VIEW", label: "Content View", type: "event" },
        { value: "ACHIEVE_LEVEL", label: "Achieve Level", type: "event" },
        {
          value: "UNLOCK_ACHIEVEMENT",
          label: "Unlock Achievement",
          type: "event",
        },
        { value: "RATE", label: "Rate", type: "event" },
        { value: "SPENT_CREDITS", label: "Spent Credits", type: "event" },
      ];
    } else if (objective === "Lead generation" || objective === "App promotion") {
      actions = [
        {
          value: "COMPLETE_REGISTRATION",
          label: "Complete Registration",
          type: "event",
        },
        { value: "CONTACT", label: "Contact", type: "event" },
        { value: "FIND_LOCATION", label: "Find Location", type: "event" },
        { value: "LEAD", label: "Lead", type: "event" },
        { value: "SCHEDULE", label: "Schedule", type: "event" },
        { value: "SEARCH", label: "Search", type: "event" },
        { value: "START_TRIAL", label: "Start Trial", type: "event" },
        {
          value: "SUBMIT_APPLICATION",
          label: "Submit Application",
          type: "event",
        },
        { value: "SUBSCRIBE", label: "Subscribe", type: "event" },
        { value: "CONTENT_VIEW", label: "Content View", type: "event" },
      ];
    } else if (objective === "Sales" || objective === "App promotion") {
      actions = [
        { value: "ADD_PAYMENT_INFO", label: "Add Payment Info", type: "event" },
        { value: "ADD_TO_CART", label: "Add To Cart", type: "event" },
        { value: "ADD_TO_WISHLIST", label: "Add To Wishlist", type: "event" },
        {
          value: "COMPLETE_REGISTRATION",
          label: "Complete Registration",
          type: "event",
        },
        { value: "DONATE", label: "Donate", type: "event" },
        {
          value: "INITIATED_CHECKOUT",
          label: "Initiate Checkout",
          type: "event",
        },
        { value: "PURCHASE", label: "Purchase", type: "event" },
        { value: "SEARCH", label: "Search", type: "event" },
        { value: "START_TRIAL", label: "Start Trial", type: "event" },
        { value: "SUBSCRIBE", label: "Subscribe", type: "event" },
        { value: "CONTENT_VIEW", label: "Content View", type: "event" },
        { value: "IN_APP_AD_CLICK", label: "In-app Ad Click", type: "event" },
        {
          value: "IN_APP_AD_IMPRESSION",
          label: "In-app Ad Impression",
          type: "event",
        },
        { value: "SPENT_CREDITS", label: "Spent Credits", type: "event" },
      ];
    } else {
      // If no matching objective, set actions to empty
      actions = [];
    }
    return actions;
  },[objective])


  const shoppingAction = [
    { value: "PURCHASE", label: "Purchase", type: "event" },
  ];

  const [allAds, setAllAds] = useState([]);
  const [workspacename, setWorkspacename] = useState<any>("");
  const [pixelOptions, setPixelOptions] = useState([]);
  const [metaOptions, setMetaOptions] = useState([]);
  const [googleOption, setGoogleOptions] = useState([]);
  const [googleOption2, setGoogleOptions2] = useState([]);
  const [metaOption2, setMetaOptions2] = useState([]);
  const [appOptions, setAppOptions] = useState([]);
  const { channelIdArray, setChannelIdArray, goalData } = useGlobalStore();

  useEffect(() => {
    const work = localStorage.getItem("workspace_name");
    setWorkspacename(work);
  }, []);

  const mutateAd = useMutation({
    mutationKey: ["All-Ad"],
    mutationFn: AdService,
  });

  useEffect(() => {
    const storage = localStorage.getItem("workspace_id");
    // @ts-ignore
    mutateAd.mutate(storage, {
      onSuccess: (response: any) => {
        setAllAds(response);
      },
      onError: (error: any) => {
        console.error(error);
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { data: allPlatBrands } = useQuery({
    queryKey: ["platForm-All-Brands"],
    queryFn: () => {
      return AdServiceBrands({
        workspaceId: Number(localStorage.getItem("workspace_id")),
        brandId: [Number(search.get("brandid"))],
      });
    },
  });

  const pMaxChange = () => {
    setPmax(!pMax);
  };

  const platFormSvgName: PlatformSvgMaName = {
    instagram: (
      <svg
        width="25"
        height="24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.375 3c-2.757 0-5 2.243-5 5v8c0 2.757 2.243 5 5 5h8c2.757 0 5-2.243 5-5V8c0-2.757-2.243-5-5-5h-8Zm0 2h8c1.654 0 3 1.346 3 3v8c0 1.654-1.346 3-3 3h-8c-1.654 0-3-1.346-3-3V8c0-1.654 1.346-3 3-3Zm9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm-5 1c-2.757 0-5 2.243-5 5s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5Zm0 2c1.654 0 3 1.346 3 3s-1.346 3-3 3-3-1.346-3-3 1.346-3 3-3Z"
          fill="currentColor"
        />
      </svg>
    ),
    facebook: (
      <svg
        width="25"
        height="24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#a)">
          <path
            d="M22.375 12c0-5.52-4.48-10-10-10s-10 4.48-10 10c0 4.84 3.44 8.87 8 9.8V15h-2v-3h2V9.5c0-1.93 1.57-3.5 3.5-3.5h2.5v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95Z"
            fill="currentColor"
          />
        </g>
        <defs>
          <clipPath id="a">
            <path
              fill="currentColor"
              transform="translate(.375)"
              d="M0 0h24v24H0z"
            />
          </clipPath>
        </defs>
      </svg>
    ),
    google: (
      <svg
        width="27"
        height="24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14.291 1.715a4.223 4.223 0 0 0-2.427.572A4.265 4.265 0 0 0 10.29 8.12l8.564 14.817c1.178 2.053 3.791 2.73 5.845 1.563 2.041-1.166 2.718-3.791 1.551-5.833L17.71 3.85a4.31 4.31 0 0 0-3.418-2.135ZM7.956 7.887l-6.207 10.78a4.282 4.282 0 0 0-.583 2.135 4.282 4.282 0 0 0 4.282 4.282 4.281 4.281 0 0 0 3.698-2.147v.012l3.687-6.394c-1.575-2.683-3.185-5.354-4.632-8.12a3.226 3.226 0 0 1-.233-.548h-.012Z"
          fill="currentColor"
        />
      </svg>
    ),
    linkedin: (
      <svg viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M22.9167 0.25C23.6681 0.25 24.3888 0.548511 24.9201 1.07986C25.4515 1.61122 25.75 2.33189 25.75 3.08333V22.9167C25.75 23.6681 25.4515 24.3888 24.9201 24.9201C24.3888 25.4515 23.6681 25.75 22.9167 25.75H3.08333C2.33189 25.75 1.61122 25.4515 1.07986 24.9201C0.548511 24.3888 0.25 23.6681 0.25 22.9167V3.08333C0.25 2.33189 0.548511 1.61122 1.07986 1.07986C1.61122 0.548511 2.33189 0.25 3.08333 0.25H22.9167ZM22.2083 22.2083V14.7C22.2083 13.4751 21.7218 12.3005 20.8557 11.4343C19.9895 10.5682 18.8149 10.0817 17.59 10.0817C16.3858 10.0817 14.9833 10.8183 14.3033 11.9233V10.3508H10.3508V22.2083H14.3033V15.2242C14.3033 14.1333 15.1817 13.2408 16.2725 13.2408C16.7985 13.2408 17.303 13.4498 17.6749 13.8217C18.0469 14.1937 18.2558 14.6982 18.2558 15.2242V22.2083H22.2083ZM5.74667 8.12667C6.37788 8.12667 6.98324 7.87592 7.42958 7.42958C7.87592 6.98324 8.12667 6.37788 8.12667 5.74667C8.12667 4.42917 7.06417 3.3525 5.74667 3.3525C5.11169 3.3525 4.50273 3.60474 4.05374 4.05374C3.60474 4.50273 3.3525 5.11169 3.3525 5.74667C3.3525 7.06417 4.42917 8.12667 5.74667 8.12667ZM7.71583 22.2083V10.3508H3.79167V22.2083H7.71583Z"
          fill="currentColor"
        />
      </svg>
    ),
    meta: (
      <svg
        width="25"
        height="25"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#a)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.193 5.841c-1.595-.11-2.865.816-3.753 1.98-.893 1.17-1.522 2.72-1.87 4.267-.346 1.547-.433 3.19-.154 4.564.272 1.336.964 2.71 2.42 3.145 1.389.415 2.635-.175 3.587-.976.954-.802 1.78-1.946 2.446-3.05.522-.868.968-1.75 1.318-2.505.35.753.796 1.637 1.317 2.504.666 1.105 1.492 2.25 2.446 3.051.952.801 2.198 1.391 3.587.976 1.456-.435 2.148-1.809 2.42-3.145.28-1.375.192-3.017-.154-4.564-.348-1.548-.977-3.099-1.87-4.268-.887-1.163-2.157-2.09-3.752-1.979-1.734.12-2.97 1.47-3.687 2.488-.106.152-.209.307-.307.465a10.405 10.405 0 0 0-.308-.465c-.717-1.02-1.952-2.367-3.686-2.488Zm2.85 5.025c-.283.715-.97 2.348-1.888 3.873-.621 1.032-1.313 1.958-2.02 2.552-.707.595-1.262.728-1.725.59-.396-.118-.817-.56-1.034-1.627-.208-1.027-.157-2.375.146-3.728.304-1.353.838-2.614 1.508-3.493.675-.885 1.369-1.242 2.024-1.196.766.053 1.53.705 2.188 1.642.368.523.643 1.052.8 1.386l.001.001Zm2.288 0c.282.715.97 2.348 1.887 3.873.622 1.032 1.314 1.958 2.02 2.552.708.595 1.262.728 1.726.59.395-.118.816-.56 1.033-1.627.209-1.027.158-2.375-.146-3.728-.304-1.353-.837-2.614-1.508-3.493-.675-.885-1.368-1.242-2.024-1.196-.766.053-1.53.705-2.188 1.642a9.593 9.593 0 0 0-.8 1.386v.001Z"
            fill="currentColor"
          />
        </g>
        <defs>
          <clipPath id="a">
            <path
              fill="currentColor"
              transform="translate(.125 .84)"
              d="M0 0h24v24H0z"
            />
          </clipPath>
        </defs>
      </svg>
    ),
  };

  const handlePixelChange = (platform: any, value: any, field: any) => {
    setPixelData((prevState: any) => ({
      ...prevState,
      [platform]: {
        pixelInfo: {
          ...(prevState[platform]?.pixelInfo || {}),
          [field]: value, // Update either 'data' or 'pixel' inside pixelInfo
        },
      },
    }));
  };

  const handleAppChange = (platform: any, value: any, field: any) => {
    setAppData((prevState: any) => ({
      ...prevState,
      [platform]: {
        appInfo: {
          ...(prevState[platform]?.appInfo || {}),
          [field]: value, // Update either 'data' or 'pixel' inside pixelInfo
        },
      },
    }));
  };

  const handlePixelChange2 = (platform: any, value: any, field: any) => {
    setPixelData((prevState: any) => {
      const updatedPixelInfo = {
        ...(prevState[platform]?.pixelInfo || {}),
        [field]: value, // Add or update 'data' or 'event'
      };

      // Remove the opposite field ('data' if 'event' is selected, or 'event' if 'data' is selected)
      if (field === "data") {
        delete updatedPixelInfo.event; // Remove 'event' if 'data' is selected
      } else if (field === "event") {
        delete updatedPixelInfo.data; // Remove 'data' if 'event' is selected
      }

      return {
        ...prevState,
        [platform]: {
          pixelInfo: updatedPixelInfo, // Update pixelInfo with only the selected field
        },
      };
    });
  };

  const handleAccountIds = (
    platformName: any,
    accountId: any,
    platformId: any,
  ) => {
    // Get the platformId based on platformName
    const exists = accIds.some(
      (item: any) =>
        item.platformId === platformId && item.accountId === accountId,
    );

    setAccIds((prevAccIds: any) =>
      exists
        ? prevAccIds.filter(
            (item: any) =>
              !(item.platformId === platformId && item.accountId === accountId),
          )
        : [...prevAccIds, { platformId, accountId }],
    );
  };

  const mutateGetPixel = useMutation({
    mutationKey: ["get-pixel"],
    mutationFn: getPixel,
  });

  const mutateApp = useMutation({
    mutationKey: ["get-app"],
    mutationFn: getApp,
  });

  const mutateConversion = useMutation({
    mutationKey: ["get-conversion"],
    mutationFn: getConversionEvent,
  });

  const mutateConversion2 = useMutation({
    mutationKey: ["get-conversion-google"],
    mutationFn: getConversionEvent,
  });

  const mutateConversion3 = useMutation({
    mutationKey: ["get-conversion-google-url"],
    mutationFn: getConversionEventUrl,
  });

  const mutateConversion4Meta = useMutation({
    mutationKey: ["get-conversion-meta-url"],
    mutationFn: getConversionEventUrl,
  });

  const handlePixelEvent = (name: any, id: any) => {
    let platform = name.toUpperCase();

    // Check if platform is either facebook or instagram
    if (platform === "FACEBOOK" || platform === "INSTAGRAM") {
      platform = "META";
    }

    const payload = {
      workspace_id: localStorage.getItem("workspace_id"),
      brandId: search.get("brandid"),
      platform: platform,
    };
    if (platform == "META" && !channelIdArray.includes(id)) {
      mutateGetPixel.mutate(payload, {
        onSuccess: (response: any) => {
          const newOptions = response.map((item: any) => ({
            value: item.id,
            label: item.name,
          }));
          setPixelOptions(newOptions);
        },
        onError: (error: any) => {
          // handle error
        },
      });
    }
    if (!channelIdArray.includes(id)) {
      if (platform == "GOOGLE") {
        mutateConversion2.mutate(payload, {
          onSuccess: (response: any) => {
            const selectOptions = response.map((action: any) => ({
              value: action.resource_name,
              label: action.name,
            }));
            setGoogleOptions(selectOptions);
          },
          onError: (error: any) => {
            // handle error
          },
        });
      }
      if (platform == "META") {
        mutateConversion.mutate(payload, {
          onSuccess: (response: any) => {
            const newOptions = response.map((item: any) => ({
              value: item.id,
              label: item.name,
              type: "data",
            }));
            // setMetaOptions(newOptions)

            setMetaOptions(newOptions);
          },
          onError: (error: any) => {
            // handle error
          },
        });
      }
    }
  };

  //Fetch Events on edit or goback while create
  useEffect(()=>{
    handlePixelEvent("GOOGLE", "google");
    handlePixelEvent("META", "meta");
  },[])

  const handleAppIntegration = (name: any, id: any) => {
    let platform = name.toUpperCase();

    // Check if platform is either facebook or instagram
    if (platform === "FACEBOOK" || platform === "INSTAGRAM") {
      platform = "META";
    }

    const payload = {
      workspace_id: localStorage.getItem("workspace_id"),
      brandId: search.get("brandid"),
      platform: platform,
    };
    if (platform == "META" && !channelIdArray.includes(id)) {
      mutateApp.mutate(payload, {
        onSuccess: (response: any) => {
          const newOptions = response?.apps?.map((item: any) => ({
            value: item.id,
            label: item.name,
            url: item.object_store_urls.instant_game,
          }));
          setAppOptions(newOptions);
        },
        onError: (error: any) => {
          // handle error
        },
      });
    }
    // if (!channelIdArray.includes(id)) {
    //   if (platform == "GOOGLE") {
    //     mutateConversion2.mutate(payload, {
    //       onSuccess: (response: any) => {
    //
    //         const selectOptions = response.map((action: any) => ({
    //           value: action.resource_name,
    //           label: action.name,
    //         }));
    //         setGoogleOptions(selectOptions);
    //       },
    //       onError: (error: any) => {
    //         // handle error
    //       },
    //     });
    //   }
    //   if (platform == "META") {
    //     mutateConversion.mutate(payload, {
    //       onSuccess: (response: any) => {
    //
    //         const newOptions = response.map((item: any) => ({
    //           value: item.id,
    //           label: item.name,
    //           type: "data",
    //         }));
    //         // setMetaOptions(newOptions)

    //         setMetaOptions(newOptions);
    //       },
    //       onError: (error: any) => {
    //         // handle error
    //       },
    //     });
    //   }
    // }
  };

  // useEffect(() => {
  //   if (objective === "Shopping") {
  //     setPixelData({
  //       Meta: {
  //         pixelInfo: {
  //           event: {
  //             value: "Shopping",
  //             label: "Shopping",
  //             type: "event",
  //           },
  //         },
  //       },
  //     });
  //   } else {
  //     setPixelData({});
  //   }
  // }, [objective]);

  const handleUrlChange = (e: any) => {
    const value = e.target.value;
    setUrl(value);

    // Check if URL has a valid TLD pattern like .com, .in, .eu, etc.
    const urlPattern =
      /^(https?:\/\/)?([a-zA-Z0-9-]+\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}((\/[a-zA-Z0-9_-]+)+)?(\/[a-zA-Z0-9_.-]*)?(\?[a-zA-Z0-9&=_.-]+)?(\/[a-zA-Z0-9_-]+)?(\/)?(#[\S]*)?$/;

    setValidUrl(urlPattern.test(value));

    if (
      urlPattern.test(value) == true &&
      value != "" &&
      goalData?.goalName?.toLowerCase() == "App Engagement".toLocaleLowerCase()
    ) {
      const payload = {
        workspace_id: localStorage.getItem("workspace_id"),
        brandId: search.get("brandid"),
        platform: "GOOGLE",
        url: value,
      };
      mutateConversion3.mutate(payload, {
        onSuccess: (response: any) => {
          console.log(response);
          const selectOptions = response.map((action: any) => ({
            value: action.resource_name,
            label: action.name,
          }));
          setGoogleOptions2(selectOptions);
        },
        onError: (error: any) => {
          // handle error
        },
      });
    }

    if (
      urlPattern.test(value) == true &&
      value != "" &&
      goalData?.goalName?.toLowerCase() == "App Engagement".toLocaleLowerCase()
    ) {
      const payload = {
        workspace_id: localStorage.getItem("workspace_id"),
        brandId: search.get("brandid"),
        platform: "META",
        url: value,
      };

      mutateConversion4Meta.mutate(payload, {
        onSuccess: (response: any) => {
          console.log(response);
          const newOptions = response.map((item: any) => ({
            value: item.id,
            label: item.name,
            type: "data",
          }));
          setMetaOptions2(newOptions);
        },
        onError: (error: any) => {
          // handle error
        },
      });
    }
  };
  const handleBlur = () => {
    // Set validUrl to true if the input is empty
    if (url === "") {
      setValidUrl(true);
    }
  };

  const search = useSearchParams();
  return (
    <>
      <div className="">
        <div className="mb-5">
          <div className="flex flex-row justify-between mb-[10px] border-b-[0.5px] border-opacity-60 border-[#FFFFFF99] pb-2">
            <div className=" text-white text-[14px] xl:text-[16px] font-semibold ">
              Select Channels
              <span className=" text-nyx-red">*</span>
            </div>
            <div className="flex flex-row gap-1 items-center hover:text-nyx-yellow text-white">
              <ChainIcon className="h-3 w-3 "></ChainIcon>{" "}
              <div
                className=" text-[12px] font-normal underline underline-offset-2  cursor-pointer"
                onClick={() =>
                  window.open(
                    `/apphome/${localStorage.getItem("workspace_name")}/platform-integration`,
                    "_blank",
                    "noopener,noreferrer",
                  )
                }
              >
                Manage Mapping
              </div>
            </div>
          </div>
          <div className="flex justify-between items-end">
            <div>
              {goalData ? (
                <>
                  <div className="flex gap-6 flex-wrap">
                    {goalData?.platforms?.map((tab: any) => {
                      const platformName = tab.platformName.toLowerCase();
                      const isSelected = channlesArray
                        .map((channel: any) => channel.toLowerCase())
                        .includes(platformName);

                      // Default variables
                      let accountId = "";
                      let isEnabled = false;

                      if (
                        platformName === "facebook" ||
                        platformName === "instagram"
                      ) {
                        // Handle Meta-specific logic
                        const metaAccount = allPlatBrands?.find(
                          (item: any) =>
                            item.ad_platform.toLowerCase() === "meta",
                        );
                        accountId = metaAccount?.account_id || "";

                        // Determine display logic based on adPageId and InstaPageId
                        if (platformName === "facebook") {
                          isEnabled = !!metaAccount?.adPageId;
                        } else if (platformName === "instagram") {
                          isEnabled = !!metaAccount?.InstaPageId;
                        }
                      } else {
                        // Handle other platforms
                        const platformAccount = allPlatBrands?.find(
                          (item: any) =>
                            item.ad_platform.toLowerCase() === platformName,
                        );
                        accountId = platformAccount?.account_id || "";
                        isEnabled = !!accountId; // Enable if account_id is present
                      }

                      return (
                        <div
                          key={tab.name}
                          className={`relative group w-[161px] xl:w-[234px] h-[50px] xl:h-[63px] rounded flex items-center px-5 py-2 border ${
                            isEnabled
                              ? isSelected
                                ? "bg-[#5E32FF] border-[#5E32FF] cursor-pointer"
                                : "bg-[#332270] border-[#332270] cursor-pointer hover:border-[0.5px] hover:border-white"
                              : "bg-[#8297BD] border-[#8297BD] cursor-pointer opacity-50"
                          } ${
                            search.has("campaignId")
                              ? "cursor-not-allowed opacity-50"
                              : ""
                          }`}
                          onClick={() => {
                            if (
                              accountId &&
                              isEnabled &&
                              !search.has("campaignId")
                            ) {
                              handleTabClick(tab.platformName, tab.id);
                              handleAccountIds(
                                tab.platformName,
                                accountId,
                                tab.id,
                              );
                              handleAppIntegration(tab.platformName, tab.id);
                              handlePixelEvent(tab.platformName, tab.id);
                            }
                            if (!isEnabled && !search.has("campaignId")) {
                              window.open(
                                `/apphome/${localStorage.getItem(
                                  "workspace_name",
                                )}/platform-integration`,
                                "_blank",
                                "noopener,noreferrer",
                              );
                            }
                          }}
                        >
                          <div className="flex flex-col gap-2">
                            <div className="flex gap-2 items-center text-[#3B226F]">
                              <div
                                className={`w-[24px] h-[24px] ${
                                  isEnabled
                                    ? isSelected
                                      ? "text-nyx-yellow"
                                      : "text-white"
                                    : "text-[#353E4C]"
                                }`}
                              >
                                {
                                  platFormSvgName[
                                    tab.platformName.toLowerCase()
                                  ]
                                }
                              </div>
                              <div
                                className={`lg:text-[12px] xl:text-[14px] font-bold select-none ${
                                  isEnabled
                                    ? isSelected
                                      ? "text-nyx-yellow"
                                      : "text-white"
                                    : "text-[#353E4C]"
                                }`}
                              >
                                {tab.platformName}
                              </div>
                            </div>
                            {accountId ? (
                              <>
                                {accountId && !isEnabled ? (
                                  <>
                                    <div className="text-[#353E4C] lg:text-[10px] xl:text-[12px] font-normal  w-full select-none">
                                      Account not found
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    <div className="flex flex-row gap-2 items-center">
                                      <span className="w-[8px] h-[8px] rounded-[80px] bg-[#53D73D]"></span>{" "}
                                      <div
                                        className={`${
                                          isSelected
                                            ? "text-nyx-yellow"
                                            : "text-white"
                                        } lg:text-[10px] xl:text-[12px] font-normal`}
                                      >
                                        {accountId}
                                      </div>
                                    </div>
                                  </>
                                )}
                              </>
                            ) : (
                              <>
                                <div
                                  className="text-[#353E4C] lg:text-[10px] xl:text-[12px] font-normal hover:underline"
                                  onClick={() =>
                                    window.open(
                                      `/apphome/${localStorage.getItem(
                                        "workspace_name",
                                      )}/platform-integration`,
                                      "_blank",
                                      "noopener,noreferrer",
                                    )
                                  }
                                >
                                  Add Accounts
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : (
                <>
                  <div className="flex gap-6 flex-wrap">
                    {allPlatform?.map((tab: any) => (
                      <div
                        key={tab.platformName}
                        //w-[129px] h-[40px]
                        className={`relative group w-[129px] h-[40px] rounded flex justify-center items-center px-5  border ${
                          channlesArray.includes(tab.platformName)
                            ? "bg-[#5E32FF] border-[#5E32FF]"
                            : " bg-inherit border-[#8297BD]"
                        }   cursor-not-allowed opacity-50`}
                      >
                        <div className="flex gap-2 items-center justify-center text-[#3B226F]">
                          <div className="w-[24px] h-[24px] text-white">
                            {platFormSvgName[tab.platformName.toLowerCase()]}
                          </div>
                          <div
                            className={` text-sm font-normal  select-none ${
                              channlesArray.includes(tab.platformName)
                                ? " text-nyx-yellow"
                                : " text-white"
                            }`}
                          >
                            {tab.platformName}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="flex flex-row gap-6 flex-wrap  mb-[48px] mt-[48px]">
            <div className=" relative">
              <label
                htmlFor=" Campaign name"
                className="flex mb-[6px] text-[14px] xl:text-[16px] font-semibold w-full text-white"
              >
                Campaign name
                <span className=" text-nyx-red">*</span>
              </label>

              <input
                type="text"
                id="Campaign name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="eg. Holiday Sale 2024"
                className={`  text-[12px] text-white lg:text-[14px] w-[492px] h-[40px] border ${(nextClick || saveClick) && name === "" ? " border-nyx-red" : "border-[#FFFFFF99] border-opacity-60"}  rounded-[4px] px-[24px]  bg-inherit focus:outline-none autofill active:text-[#FFFFFF] placeholder:text-[#FFFFFF99] placeholder:opacity-60 placeholder:italic`}
              />
            </div>
            <div className=" relative">
              <label
                htmlFor="Campaign URL"
                className="flex mb-[6px] text-[14px] xl:text-[16px] font-semibold w-full text-white"
              >
                {(objective == "App Engagement" && subTopic) ||
                (objective == "App Install" && subTopic)
                  ? "App URL"
                  : "Campaign URL"}

                <span className=" text-nyx-red">*</span>
              </label>
              <input
                type="text"
                id="Campaign URL"
                value={url}
                // onChange={(e) => setUrl(e.target.value)}
                onChange={(e) => handleUrlChange(e)}
                onBlur={handleBlur}
                placeholder="e.g., https://www.apple.com/holidaysale"
                className={`text-[12px] text-white lg:text-[14px] w-[492px] h-[40px] ${!validUrl || ((nextClick || saveClick) && url === "") ? " border-nyx-red" : "border-[#FFFFFF99] border-opacity-60"} border  rounded-[4px] px-[24px] bg-inherit focus:outline-none autofill active:text-[#FFFFFF] placeholder:text-[#FFFFFF99] placeholder:opacity-60 placeholder:italic`}
              />
              {!validUrl && (
                <p className="text-nyx-red text-[12px] mt-1">
                  Please enter a valid URL with a top-level domain e.g., .com,
                  .in
                </p>
              )}
            </div>
          </div>
          {/* Radio button when selected Shopping */}
          {/* {goalData?.goalName?.toLowerCase() == "shopping" && (
            <div className="border-b border-[#8297BD80] border-opacity-50 mt-6">
              <div className=" text-white font-bold text-[16px]">
                Campaign Priority
                <span className=" text-nyx-red">*</span>
              </div>

              <div className="flex flex-row gap-6 mt-3 mb-6">
                <div className="flex items-center gap-2">
                  <input
                    id="priority-low"
                    type="radio"
                    name="priority"
                    value="low"
                    // onChange={hideShow}
                    // checked={color == "show"}
                    className="cursor-pointer  appearance-none bg-transparent w-4 h-4 border-[2px] border-nyx-yellow rounded-full checked:bg-nyx-yellow checked:border-nyx-yellow  checked:border-[4px]"
                  />
                  <label htmlFor="priority-low">
                    <span className="cursor-pointer text-sm text-white font-light">
                      Low
                    </span>
                  </label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    id="priority-medium"
                    type="radio"
                    name="priority"
                    value="medium"
                    // onChange={hideShow}
                    // checked={color == "show"}
                    className="cursor-pointer  appearance-none bg-transparent w-4 h-4 border-[2px] border-nyx-yellow rounded-full checked:bg-nyx-yellow checked:border-nyx-yellow focus:outline-nyx-white-1 checked:border-[4px]"
                  />
                  <label htmlFor="priority-medium">
                    <span className="cursor-pointer text-sm text-white font-light">
                      Medium
                    </span>
                  </label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    id="priority-high"
                    type="radio"
                    name="priority"
                    value="high"
                    // onChange={hideShow}
                    // checked={color == "show"}
                    className="cursor-pointer  appearance-none bg-transparent w-4 h-4 border-[2px] border-nyx-yellow rounded-full checked:bg-nyx-yellow checked:border-nyx-yellow focus:outline-nyx-white-1 checked:border-[4px]"
                  />
                  <label htmlFor="priority-high">
                    <span className="cursor-pointer text-sm text-white font-light">
                      High
                    </span>
                  </label>
                </div>
              </div>
            </div>
          )} */}

          {(goalData?.goalName?.toLowerCase() == "lead generation" ||
            goalData?.goalName?.toLowerCase() == "shopping" ||
            goalData?.goalName?.toLowerCase() == "website conversion") &&
            channlesArray.includes("Google") &&
            process.env.NEXT_PUBLIC_ENVIRONMENT == "test" && (
              <>
                <div className="mt-3">
                  <div className="text-white font-bold text-base">
                    Enable Performance Max for Google
                  </div>
                  <div className="flex flex-row gap-3 items-center mt-1">
                    <div className="text-white">No</div>
                    <Switch
                      onChange={pMaxChange}
                      checked={pMax}
                      checkedIcon={false}
                      onColor="#53D73D" // Color when checked
                      offColor="#503193"
                      handleDiameter={20}
                      uncheckedIcon={false}
                    />
                    <div className="text-white">Yes</div>
                  </div>
                </div>
              </>
            )}

          {/* Merchant section and pixel conversion for shopping */}
          {goalData?.goalName?.toLowerCase() == "shopping" &&
            channlesArray.length !== 0 && (
              <>
                <div className=" mt-[48px] mb-[48px]">
                  {/* <div className="mb-6">
                    <div className=" text-white font-bold text-[16px]">
                      Select Merchant Center Account*
                      <span className=" text-nyx-red">*</span>
                    </div>

                    <div>
                      <div className="w-[424px] mt-2">
                        <Select
                          className="w-full text-sm md:text-base"
                          placeholder="Select a Account"
                          styles={admanagerConversion}
                          components={{ IndicatorSeparator: () => null }}
                        />
                      </div>
                    </div>
                  </div> */}
                  <div className=" text-white font-bold text-[14px] xl:text-[16px]">
                    Select Your Conversion Events
                    <span className=" text-nyx-red">*</span>
                  </div>

                  <div className="flex flex-col gap-4 mt-3 mb-6">
                    {(channlesArray.includes("Facebook") ||
                      channlesArray.includes("Instagram")) && (
                      <div>
                        <div className=" flex flex-row gap-1 mb-2 items-center ">
                          <div>
                            <svg
                              width="24"
                              height="24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M8.068 5.001c-1.595-.11-2.865.816-3.753 1.98-.893 1.17-1.522 2.72-1.87 4.267-.346 1.547-.433 3.19-.154 4.564.272 1.336.964 2.71 2.42 3.145 1.389.415 2.635-.175 3.587-.976.954-.802 1.78-1.946 2.446-3.05.522-.868.968-1.75 1.318-2.505.35.753.796 1.637 1.317 2.504.666 1.105 1.492 2.25 2.446 3.051.952.801 2.198 1.391 3.587.976 1.456-.435 2.148-1.809 2.42-3.145.28-1.375.192-3.017-.154-4.564-.348-1.548-.977-3.099-1.87-4.268-.887-1.163-2.157-2.09-3.752-1.979-1.734.12-2.97 1.47-3.687 2.488-.106.153-.209.308-.307.465a9.95 9.95 0 0 0-.308-.465c-.717-1.02-1.952-2.367-3.686-2.488Zm2.85 5.025c-.283.715-.97 2.348-1.888 3.873-.621 1.032-1.313 1.958-2.02 2.552-.707.594-1.262.728-1.725.59-.396-.118-.817-.56-1.034-1.627-.208-1.027-.157-2.375.146-3.728.304-1.353.838-2.614 1.508-3.493.675-.885 1.369-1.242 2.024-1.196.766.053 1.53.705 2.188 1.642.368.523.643 1.052.8 1.386l.001.001Zm2.288 0c.282.715.97 2.348 1.887 3.873.622 1.032 1.314 1.958 2.02 2.552.708.595 1.262.728 1.726.59.395-.118.816-.56 1.033-1.627.209-1.027.158-2.375-.146-3.728-.304-1.353-.837-2.614-1.508-3.493-.675-.885-1.368-1.242-2.024-1.196-.766.053-1.53.705-2.188 1.642a9.596 9.596 0 0 0-.8 1.386v.001Z"
                                fill="#fff"
                              />
                            </svg>
                          </div>
                          <div className=" text-white  font-medium text-base">
                            Meta
                          </div>
                        </div>
                        <div className="flex flex-row gap-5">
                          <div className="w-[492px]">
                            <Select
                              options={pixelOptions}
                              className="w-full text-sm md:text-base"
                              placeholder="Select a Pixel"
                              styles={admanagerConversion}
                              value={pixelData?.Meta?.pixelInfo?.pixel}
                              isLoading={mutateGetPixel.isPending}
                              components={{ IndicatorSeparator: () => null }}
                              onChange={(option) =>
                                handlePixelChange("Meta", option, "pixel")
                              }
                              noOptionsMessage={() =>
                                "No conversion action found"
                              }
                            />
                          </div>
                          <div className="w-[492px]">
                            <Select
                              className="w-full text-sm md:text-base"
                              options={shoppingAction} // Merge the static and dynamic options
                              placeholder="Demo"
                              value={
                                pixelData?.Meta?.pixelInfo?.data ||
                                pixelData?.Meta?.pixelInfo?.event
                              }
                              styles={admanagerConversion}
                              components={{ IndicatorSeparator: () => null }}
                              onChange={(option) => {
                                if (option.type === "data") {
                                  handlePixelChange2("Meta", option, "data");
                                } else if (option.type === "event") {
                                  handlePixelChange2("Meta", option, "event");
                                }
                              }}
                              noOptionsMessage={() =>
                                "No conversion action found"
                              }
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {channlesArray.includes("Google") && (
                      <div>
                        <div className=" flex flex-row gap-1 mb-2 items-center ">
                          <div>
                            <svg
                              width="24"
                              height="24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M3.064 7.51A10 10 0 0 1 12 2c2.695 0 4.959.991 6.69 2.605l-2.867 2.868C14.786 6.482 13.468 5.977 12 5.977c-2.605 0-4.81 1.76-5.595 4.123-.2.6-.314 1.24-.314 1.9 0 .66.114 1.3.314 1.9.786 2.364 2.99 4.123 5.595 4.123 1.345 0 2.49-.355 3.386-.955a4.601 4.601 0 0 0 1.996-3.018H12v-3.868h9.418c.118.654.182 1.336.182 2.045 0 3.046-1.09 5.61-2.982 7.35C16.964 21.105 14.7 22 12 22A9.998 9.998 0 0 1 3.064 7.51Z"
                                fill="#fff"
                              />
                            </svg>
                          </div>
                          <div className=" text-white font-medium text-base">
                            Google
                          </div>
                        </div>
                        <div className="flex flex-row gap-5">
                          <div className="w-[1009px]">
                            <Select
                              options={googleOption}
                              className="w-full text-sm md:text-base"
                              placeholder="Select a Conversion Event"
                              styles={admanagerConversion}
                              value={pixelData?.Google?.pixelInfo?.data}
                              components={{ IndicatorSeparator: () => null }}
                              onChange={(option) =>
                                handlePixelChange("Google", option, "data")
                              }
                              isLoading={mutateConversion2.isPending}
                              noOptionsMessage={() =>
                                "No conversion action found"
                              }
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}

          {/* Pixel conversion for Lead generation and website conversion */}
          {(goalData?.goalName?.toLowerCase() ==
            "Website conversion".toLocaleLowerCase() ||
            goalData?.goalName?.toLowerCase() ==
              "lead generation".toLocaleLowerCase()) &&
            channlesArray.length !== 0 && (
              <>
                <div className="  mt-[48px] mb-[48px]">
                  <div className=" text-white font-bold text-[14px] xl:text-[16px]">
                    Select Your Conversion Events
                    <span className=" text-nyx-red">*</span>
                  </div>

                  <div className="flex flex-col gap-4 mt-3 ">
                    {(channlesArray.includes("Facebook") ||
                      channlesArray.includes("Instagram")) && (
                      <div>
                        <div className=" flex flex-row gap-1 mb-2 items-center ">
                          <div>
                            <svg
                              width="24"
                              height="24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M8.068 5.001c-1.595-.11-2.865.816-3.753 1.98-.893 1.17-1.522 2.72-1.87 4.267-.346 1.547-.433 3.19-.154 4.564.272 1.336.964 2.71 2.42 3.145 1.389.415 2.635-.175 3.587-.976.954-.802 1.78-1.946 2.446-3.05.522-.868.968-1.75 1.318-2.505.35.753.796 1.637 1.317 2.504.666 1.105 1.492 2.25 2.446 3.051.952.801 2.198 1.391 3.587.976 1.456-.435 2.148-1.809 2.42-3.145.28-1.375.192-3.017-.154-4.564-.348-1.548-.977-3.099-1.87-4.268-.887-1.163-2.157-2.09-3.752-1.979-1.734.12-2.97 1.47-3.687 2.488-.106.153-.209.308-.307.465a9.95 9.95 0 0 0-.308-.465c-.717-1.02-1.952-2.367-3.686-2.488Zm2.85 5.025c-.283.715-.97 2.348-1.888 3.873-.621 1.032-1.313 1.958-2.02 2.552-.707.594-1.262.728-1.725.59-.396-.118-.817-.56-1.034-1.627-.208-1.027-.157-2.375.146-3.728.304-1.353.838-2.614 1.508-3.493.675-.885 1.369-1.242 2.024-1.196.766.053 1.53.705 2.188 1.642.368.523.643 1.052.8 1.386l.001.001Zm2.288 0c.282.715.97 2.348 1.887 3.873.622 1.032 1.314 1.958 2.02 2.552.708.595 1.262.728 1.726.59.395-.118.816-.56 1.033-1.627.209-1.027.158-2.375-.146-3.728-.304-1.353-.837-2.614-1.508-3.493-.675-.885-1.368-1.242-2.024-1.196-.766.053-1.53.705-2.188 1.642a9.596 9.596 0 0 0-.8 1.386v.001Z"
                                fill="#fff"
                              />
                            </svg>
                          </div>
                          <div className=" text-white  font-medium text-base">
                            Meta
                          </div>
                        </div>
                        <div className="flex flex-row gap-6">
                          <div className="w-[492px]">
                            <Select
                              options={pixelOptions}
                              className="w-full text-sm md:text-base"
                              placeholder="Select a Pixel"
                              styles={admanagerConversion}
                              value={pixelData?.Meta?.pixelInfo?.pixel}
                              isLoading={mutateGetPixel.isPending}
                              components={{ IndicatorSeparator: () => null }}
                              onChange={(option) =>
                                handlePixelChange("Meta", option, "pixel")
                              }
                              noOptionsMessage={() =>
                                "No conversion action found"
                              }
                            />
                          </div>
                          <div className="w-[492px]">
                            <Select
                              className="w-full text-sm md:text-base"
                              options={[...metaOptions, ...MetaStandardActions]} // Merge the static and dynamic options
                              placeholder="Demo"
                              value={
                                pixelData?.Meta?.pixelInfo?.data ||
                                pixelData?.Meta?.pixelInfo?.event ||
                                null
                              }
                              styles={admanagerConversion}
                              components={{ IndicatorSeparator: () => null }}
                              onChange={(option) => {
                                if (option.type === "data") {
                                  handlePixelChange2("Meta", option, "data");
                                } else if (option.type === "event") {
                                  handlePixelChange2("Meta", option, "event");
                                }
                              }}
                              noOptionsMessage={() =>
                                "No conversion action found"
                              }
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {channlesArray.includes("Google") && (
                      <div>
                        <div className=" flex flex-row gap-1 mb-2 items-center ">
                          <div>
                            <svg
                              width="24"
                              height="24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M3.064 7.51A10 10 0 0 1 12 2c2.695 0 4.959.991 6.69 2.605l-2.867 2.868C14.786 6.482 13.468 5.977 12 5.977c-2.605 0-4.81 1.76-5.595 4.123-.2.6-.314 1.24-.314 1.9 0 .66.114 1.3.314 1.9.786 2.364 2.99 4.123 5.595 4.123 1.345 0 2.49-.355 3.386-.955a4.601 4.601 0 0 0 1.996-3.018H12v-3.868h9.418c.118.654.182 1.336.182 2.045 0 3.046-1.09 5.61-2.982 7.35C16.964 21.105 14.7 22 12 22A9.998 9.998 0 0 1 3.064 7.51Z"
                                fill="#fff"
                              />
                            </svg>
                          </div>
                          <div className=" text-white font-medium text-base">
                            Google
                          </div>
                        </div>
                        <div className="flex flex-row gap-5">
                          <div className="w-[1009px]">
                            <Select
                              options={googleOption}
                              className="w-full text-sm md:text-base"
                              placeholder="Select a Conversion Event"
                              styles={admanagerConversion}
                              value={pixelData?.Google?.pixelInfo?.data}
                              isLoading={mutateConversion2.isPending}
                              components={{ IndicatorSeparator: () => null }}
                              onChange={(option) =>
                                handlePixelChange("Google", option, "data")
                              }
                              noOptionsMessage={() =>
                                "No conversion action found"
                              }
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {channlesArray.some(
                      (channel: any) => channel.toLowerCase() === "linkedin",
                    ) && (
                      <div>
                        <div className=" flex flex-row gap-1 mb-2 items-center ">
                          <div>
                            <svg
                              width="24"
                              height="24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14Zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79ZM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68Zm1.39 9.94v-8.37H5.5v8.37h2.77Z"
                                fill="#fff"
                              />
                            </svg>
                          </div>
                          <div className=" text-white font-medium text-base">
                            LinkedIn
                          </div>
                        </div>
                        <div className="flex flex-row gap-5">
                          <div className="w-[1009px]">
                            <Select
                              className="w-full text-sm md:text-base"
                              placeholder="Select a Conversion Event"
                              styles={admanagerConversion}
                              components={{ IndicatorSeparator: () => null }}
                              onChange={(option) =>
                                handlePixelChange("LinkedIn", option, "data")
                              }
                              noOptionsMessage={() =>
                                "No conversion action found"
                              }
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}

          {/* App Integration for AAA objective */}
          {(goalData?.goalName?.toLowerCase() ===
            "App Engagement".toLowerCase() ||
            goalData?.goalName?.toLowerCase() ===
              "App Install".toLowerCase()) &&
            channlesArray.length !== 0 && (
              <>
                {/* Integrated Application Section */}
                {(channlesArray.includes("Facebook") ||
                  channlesArray.includes("Instagram")) && (
                  <div className="mb-[48px]">
                    <div className="text-white font-bold text-[16px]">
                      Select Your Integrated Application
                      <span className="text-nyx-red">*</span>
                    </div>

                    <div className="flex gap-5">
                      <div className="mt-3">
                        <div className="flex items-center gap-1 mb-2">
                          <svg
                            width="24"
                            height="24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M8.068 5.001c-1.595-.11-2.865.816-3.753 1.98-.893 1.17-1.522 2.72-1.87 4.267-.346 1.547-.433 3.19-.154 4.564.272 1.336.964 2.71 2.42 3.145 1.389.415 2.635-.175 3.587-.976.954-.802 1.78-1.946 2.446-3.05.522-.868.968-1.75 1.318-2.505.35.753.796 1.637 1.317 2.504.666 1.105 1.492 2.25 2.446 3.051.952.801 2.198 1.391 3.587.976 1.456-.435 2.148-1.809 2.42-3.145.28-1.375.192-3.017-.154-4.564-.348-1.548-.977-3.099-1.87-4.268-.887-1.163-2.157-2.09-3.752-1.979-1.734.12-2.97 1.47-3.687 2.488-.106.153-.209.308-.307.465a9.95 9.95 0 0 0-.308-.465c-.717-1.02-1.952-2.367-3.686-2.488Zm2.85 5.025c-.283.715-.97 2.348-1.888 3.873-.621 1.032-1.313 1.958-2.02 2.552-.707.594-1.262.728-1.725.59-.396-.118-.817-.56-1.034-1.627-.208-1.027-.157-2.375.146-3.728.304-1.353.838-2.614 1.508-3.493.675-.885 1.369-1.242 2.024-1.196.766.053 1.53.705 2.188 1.642.368.523.643 1.052.8 1.386l.001.001Zm2.288 0c.282.715.97 2.348 1.887 3.873.622 1.032 1.314 1.958 2.02 2.552.708.595 1.262.728 1.726.59.395-.118.816-.56 1.033-1.627.209-1.027.158-2.375-.146-3.728-.304-1.353-.837-2.614-1.508-3.493-.675-.885-1.368-1.242-2.024-1.196-.766.053-1.53.705-2.188 1.642a9.596 9.596 0 0 0-.8 1.386v.001Z"
                              fill="#fff"
                            />
                          </svg>
                          <span className="text-white font-medium text-base">
                            Meta
                          </span>
                        </div>

                        <div className="flex gap-5">
                          <div className="w-[492px]">
                            <Select
                              options={appOptions}
                              className="w-full text-sm md:text-base"
                              placeholder="Select your App"
                              styles={admanagerConversion}
                              value={appData?.Meta?.appInfo?.data}
                              isLoading={mutateApp.isPending}
                              components={{ IndicatorSeparator: () => null }}
                              onChange={(option) =>
                                handleAppChange("Meta", option, "data")
                              }
                              noOptionsMessage={() => "No app found"}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Conversion Event Section */}
                {(channlesArray.includes("Facebook") ||
                  channlesArray.includes("Instagram") ||
                  channlesArray.includes("Google")) &&
                  goalData?.goalName?.toLowerCase() ===
                    "App Engagement".toLowerCase() &&
                  validUrl &&
                  url !== "" && (
                    <div className="mb-[48px]">
                      <div className="text-white font-bold text-[16px]">
                        Select Your conversion event
                        <span className="text-nyx-red">*</span>
                      </div>

                      {/* Meta (Facebook/Instagram) Conversion Events */}
                      {(channlesArray.includes("Facebook") ||
                        channlesArray.includes("Instagram")) &&
                        goalData?.goalName?.toLowerCase() ===
                          "App Engagement".toLowerCase() && (
                          <div className="mt-3">
                            <div className="flex items-center gap-1 mb-2">
                              <svg
                                width="24"
                                height="24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M8.068 5.001c-1.595-.11-2.865.816-3.753 1.98-.893 1.17-1.522 2.72-1.87 4.267-.346 1.547-.433 3.19-.154 4.564.272 1.336.964 2.71 2.42 3.145 1.389.415 2.635-.175 3.587-.976.954-.802 1.78-1.946 2.446-3.05.522-.868.968-1.75 1.318-2.505.35.753.796 1.637 1.317 2.504.666 1.105 1.492 2.25 2.446 3.051.952.801 2.198 1.391 3.587.976 1.456-.435 2.148-1.809 2.42-3.145.28-1.375.192-3.017-.154-4.564-.348-1.548-.977-3.099-1.87-4.268-.887-1.163-2.157-2.09-3.752-1.979-1.734.12-2.97 1.47-3.687 2.488-.106.153-.209.308-.307.465a9.95 9.95 0 0 0-.308-.465c-.717-1.02-1.952-2.367-3.686-2.488Zm2.85 5.025c-.283.715-.97 2.348-1.888 3.873-.621 1.032-1.313 1.958-2.02 2.552-.707.594-1.262.728-1.725.59-.396-.118-.817-.56-1.034-1.627-.208-1.027-.157-2.375.146-3.728.304-1.353.838-2.614 1.508-3.493.675-.885 1.369-1.242 2.024-1.196.766.053 1.53.705 2.188 1.642.368.523.643 1.052.8 1.386l.001.001Zm2.288 0c.282.715.97 2.348 1.887 3.873.622 1.032 1.314 1.958 2.02 2.552.708.595 1.262.728 1.726.59.395-.118.816-.56 1.033-1.627.209-1.027.158-2.375-.146-3.728-.304-1.353-.837-2.614-1.508-3.493-.675-.885-1.368-1.242-2.024-1.196-.766.053-1.53.705-2.188 1.642a9.596 9.596 0 0 0-.8 1.386v.001Z"
                                  fill="#fff"
                                />
                              </svg>
                              <span className="text-white font-medium text-base">
                                Meta
                              </span>
                            </div>

                            <div className="flex gap-5">
                              <div className="w-[492px]">
                                <Select
                                  options={pixelOptions}
                                  className="w-full text-sm md:text-base"
                                  placeholder="Select a Pixel"
                                  styles={admanagerConversion}
                                  value={pixelData?.Meta?.pixelInfo?.pixel}
                                  isLoading={mutateGetPixel.isPending}
                                  components={{
                                    IndicatorSeparator: () => null,
                                  }}
                                  onChange={(option) =>
                                    handlePixelChange("Meta", option, "pixel")
                                  }
                                  noOptionsMessage={() =>
                                    "No conversion action found"
                                  }
                                />
                              </div>
                              <div className="w-[492px]">
                                <Select
                                  className="w-full text-sm md:text-base"
                                  options={[
                                    ...(objective !== "App Engagement"
                                      ? metaOption2
                                      : []),
                                    ...MetaStandardActions,
                                  ]} // Merge the static and dynamic options
                                  placeholder="Demo"
                                  value={
                                    pixelData?.Meta?.pixelInfo?.data ||
                                    pixelData?.Meta?.pixelInfo?.event ||
                                    null
                                  }
                                  styles={admanagerConversion}
                                  components={{
                                    IndicatorSeparator: () => null,
                                  }}
                                  onChange={(option) => {
                                    if (option.type === "data") {
                                      handlePixelChange2(
                                        "Meta",
                                        option,
                                        "data",
                                      );
                                    } else if (option.type === "event") {
                                      handlePixelChange2(
                                        "Meta",
                                        option,
                                        "event",
                                      );
                                    }
                                  }}
                                  noOptionsMessage={() =>
                                    "No conversion action found"
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        )}

                      {/* Google Conversion Events */}
                      {channlesArray.includes("Google") &&
                        goalData?.goalName?.toLowerCase() ===
                          "App Engagement".toLowerCase() && (
                          <div className="mt-3">
                            <div className="flex items-center gap-1 mb-2">
                              <svg
                                width="24"
                                height="24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M3.064 7.51A10 10 0 0 1 12 2c2.695 0 4.959.991 6.69 2.605l-2.867 2.868C14.786 6.482 13.468 5.977 12 5.977c-2.605 0-4.81 1.76-5.595 4.123-.2.6-.314 1.24-.314 1.9 0 .66.114 1.3.314 1.9.786 2.364 2.99 4.123 5.595 4.123 1.345 0 2.49-.355 3.386-.955a4.601 4.601 0 0 0 1.996-3.018H12v-3.868h9.418c.118.654.182 1.336.182 2.045 0 3.046-1.09 5.61-2.982 7.35C16.964 21.105 14.7 22 12 22A9.998 9.998 0 0 1 3.064 7.51Z"
                                  fill="#fff"
                                />
                              </svg>
                              <span className="text-white font-medium text-base">
                                Google
                              </span>
                            </div>
                            <div className="flex gap-5">
                              <div className="w-[1009px]">
                                <Select
                                  options={googleOption2}
                                  className="w-full text-sm md:text-base"
                                  placeholder="Select a Conversion Event"
                                  styles={admanagerConversion}
                                  isLoading={mutateConversion3.isPending}
                                  value={pixelData?.Google?.pixelInfo?.data}
                                  components={{
                                    IndicatorSeparator: () => null,
                                  }}
                                  onChange={(option) =>
                                    handlePixelChange("Google", option, "data")
                                  }
                                  noOptionsMessage={() =>
                                    "No conversion action found"
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        )}
                    </div>
                  )}
              </>
            )}
        </div>
      </div>
    </>
  );
};

export default ChannelsName;
