/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { Fragment, useEffect, useContext } from "react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import Button from "@nyx-frontend/main/components/Button";
import Modal from "react-modal";
import { useMutation, useQuery } from "@tanstack/react-query";
import { MessagePopupContext } from "@nyx-frontend/main/hooks/MessagePopupContext";
import {
  createCampaign,
  getCampaign3,
  updateCampaign3,
} from "@nyx-frontend/main/services/admanagerServices";
import { getbrandServiceonbording } from "@nyx-frontend/main/services/brandService";
import TargetGroup from "./_components/TargetGroup";
import ChannelsName from "./_components/ChannelsName";
import Objectives from "./_components/Objectives";
import { useRouter } from "next/navigation";
import ButtonLoadingGenAI from "@nyx-frontend/main/components/ButtonLoadingGenAI";
import { toast } from "react-toastify";
import CampaignLoading from "./_components/CampaignLoading";
import useStore from "../component/store";
import Steper from "../component/Steper";
import "@nyx-frontend/main/app/_components/toastifyTest/toastify.css";
import {
  getAllPlatform,
  getAllGoals,
  getPixel,
} from "@nyx-frontend/main/services/admanagerServices";
import classNames from "@nyx-frontend/main/utils/classNames";
import {
  addTagetGroupPopupStyle,
  deletePopupStyle,
  CreatNewAudiencepopup,
  popupHeader2,
  Audience,
  lookalikeStyle,
} from "@nyx-frontend/main/utils/modalstyles";
import useGlobalStore from "../store/store";

const Campaign = () => {
  const router = useRouter();
  // const [channlesArray, setChannelsArray] = useState<any>([]);
  // const [channelIdArray, setChannelIdArray] = useState<any>([]);
  // const [objective, setObjective] = useState();
  // const [goalId, setGoalId] = useState();
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [targetGrps, setTargetGrps] = useState([]);
  const search = useSearchParams();
  const [workspacename, setWorkspacename] = useState<string>("");
  // const [goalData, setGoalData] = useState<any>();
  const [accIds, setAccIds] = useState<any>([]);
  // const [subTopic, setSubTopic] = useState<any>(null);
  // const [optionValue, setOptionValue] = useState<any>({});
  const [popUp, setPopUp] = useState(false);
  const [nextClick, setNextClick] = useState(false);
  const [saveClick, setSaveClick] = useState(false);
  const [pixelData, setPixelData] = useState({});
  const [appData, setAppData] = useState({});
  const [validUrl, setValidUrl] = useState(true);
  const [pMax, setPmax] = useState(false);
  const { setElement } = useStore();
  const {
    objective,
    goalId,
    goalData,
    subTopic,
    optionValue,
    channelIdArray,
    setChannelsArray,
    setObjective,
    setGoalId,
    channlesArray,
    setGoalData,
    setSubTopic,
    setOptionValue,
    setChannelIdArray,
  } = useGlobalStore();

  useEffect(() => {
    setElement("element1", true);
    setElement("element2", false);
    setElement("element3", false);
    setElement("element4", false);
    setElement("element5", false);
    const name = localStorage.getItem("workspace_name");
    if (name) {
      setWorkspacename(name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    data: brandDetails,
    isLoading: getProduct2Loading,
    refetch: brandDetailsRefetch,
  } = useQuery({
    queryKey: ["getProduct2", Number(search.get("brandid"))],
    queryFn: () => {
      if (Number(search.get("brandid"))) {
        return getbrandServiceonbording(Number(search.get("brandid")));
      }

      return null;
    },
  });

  // console.log("channelIdArray", channelIdArray);
  // console.log("channelArray", channlesArray);
  // console.log("accIds", accIds);

  useEffect(() => {
    if (accIds.length === 0) {
      setChannelsArray([]);
      setChannelIdArray([]);
    }
  }, [accIds]);

  const {
    data: campaignDetails,
    isLoading: getCampaignLoading,
    isFetching: dataFetching,
    isPending: dataPending,
  } = useQuery({
    queryKey: ["getCampaign-campaign", Number(search.get("campaignId"))],
    queryFn: () => {
      if (Number(search.get("campaignId"))) {
        return getCampaign3(Number(search.get("campaignId")));
      }

      return null;
    },
    enabled: !!Number(search.get("campaignId")),
  });

  const mutateUpdateCampaign = useMutation({
    mutationKey: ["update-campaign-creation"],
    mutationFn: updateCampaign3,
  });

  const mutateUpdateSaveCampaign = useMutation({
    mutationKey: ["update-save-campaign-creation"],
    mutationFn: updateCampaign3,
  });

  const mutateCreateCampaign = useMutation({
    mutationKey: ["add-campign"],
    mutationFn: createCampaign,
  });

  const reset = () => {
    setChannelIdArray([]);
    setChannelsArray([]);
    setObjective(undefined);
    setGoalId(undefined);
    // setTargetGrp(undefined);
    setTargetGrps([]);
    setGoalData(undefined);
    setName("");
    setUrl("");
    setAccIds([]);
    setSubTopic(null);
    setOptionValue({});
    setPixelData({});
    setSaveClick(false);
    setNextClick(false);

    setPopUp(false);
  };

  const createPixelDetailsPayload = (
    selectedChannels: any,
    pixelDetails: any,
    platformMap: any
  ) => {
    const pixelDetailsPayload = [];

    // Check if both 'facebook' and 'instagram' are selected
    const hasFacebook = selectedChannels.includes("Facebook");
    const hasInstagram = selectedChannels.includes("Instagram");

    if (hasFacebook && hasInstagram) {
      // Add Facebook and Instagram separately
      const metaPixelInfo = pixelDetails.Meta.pixelInfo;

      // Add Facebook with the 'pixel' and 'data' info
      pixelDetailsPayload.push({
        platformId: platformMap.Facebook, // Facebook platformId
        pixelInfo: {
          pixel: metaPixelInfo.pixel, // Facebook Pixel
          ...(metaPixelInfo.data && { data: metaPixelInfo.data }),
          ...(metaPixelInfo.event && { event: metaPixelInfo.event }),
        },
      });

      // Add Instagram with only 'data' info
      pixelDetailsPayload.push({
        platformId: platformMap.Instagram, // Instagram platformId
        pixelInfo: {
          pixel: metaPixelInfo.pixel,
          ...(metaPixelInfo.data && { data: metaPixelInfo.data }),
          ...(metaPixelInfo.event && { event: metaPixelInfo.event }),
        },
      });
    } else if (hasFacebook || hasInstagram) {
      // Add only Facebook or Instagram, depending on which one is selected
      const platformId = hasFacebook
        ? platformMap.Facebook
        : platformMap.Instagram;
      const metaPixelInfo = pixelDetails.Meta.pixelInfo;

      pixelDetailsPayload.push({
        platformId: platformId,
        pixelInfo: {
          pixel: metaPixelInfo.pixel,
          ...(metaPixelInfo.data && { data: metaPixelInfo.data }),
          ...(metaPixelInfo.event && { event: metaPixelInfo.event }),
        },
      });
    }

    // Handle Google
    if (selectedChannels.includes("Google")) {
      const googlePixelInfo = pixelDetails.Google.pixelInfo;

      pixelDetailsPayload.push({
        platformId: platformMap.Google,
        pixelInfo: {
          data: googlePixelInfo.data,
        },
      });
    }

    // Handle LinkedIn
    // if (selectedChannels.includes("LinkedIn")) {
    //   pixelDetailsPayload.push({
    //     platformId: platformMap.LinkedIn,
    //     pixelInfo: {
    //       data: "LinkedIn conversion data here", // Replace with actual data for LinkedIn
    //     },
    //   });
    // }

    return pixelDetailsPayload;
  };

  const createAppDetailsPayload = (
    selectedChannels: any,
    appDetails: any,
    platformMap: any
  ) => {
    const pixelDetailsPayload = [];

    // Check if both 'facebook' and 'instagram' are selected
    const hasFacebook = selectedChannels.includes("Facebook");
    const hasInstagram = selectedChannels.includes("Instagram");

    if (hasFacebook && hasInstagram) {
      // Add Facebook and Instagram separately
      const metaAppInfo = appDetails.Meta.appInfo;

      pixelDetailsPayload.push({
        platformId: platformMap.Facebook, // Facebook platformId
        appInfo: {
          ...(metaAppInfo.data && { data: metaAppInfo.data }),
        },
      });

      // Add Instagram with only 'data' info
      pixelDetailsPayload.push({
        platformId: platformMap.Instagram, // Instagram platformId
        appInfo: {
          ...(metaAppInfo.data && { data: metaAppInfo.data }),
        },
      });
    } else if (hasFacebook || hasInstagram) {
      // Add only Facebook or Instagram, depending on which one is selected
      const platformId = hasFacebook
        ? platformMap.Facebook
        : platformMap.Instagram;
      const metaAppInfo = appDetails.Meta.appInfo;

      pixelDetailsPayload.push({
        platformId: platformId,
        appInfo: {
          ...(metaAppInfo.data && { data: metaAppInfo.data }),
        },
      });
    }

    // Handle Google
    // if (selectedChannels.includes("Google")) {
    //   const googleAppInfo = appDetails.Google.appInfo;

    //   pixelDetailsPayload.push({
    //     platformId: platformMap.Google,
    //     appInfo: {
    //       data: googleAppInfo.data,
    //     },
    //   });
    // }

    // Handle LinkedIn
    // if (selectedChannels.includes("LinkedIn")) {
    //   pixelDetailsPayload.push({
    //     platformId: platformMap.LinkedIn,
    //     pixelInfo: {
    //       data: "LinkedIn conversion data here", // Replace with actual data for LinkedIn
    //     },
    //   });
    // }

    return pixelDetailsPayload;
  };

  const validatePixelData = (
    channelsArray: string[],
    pixelData: any
  ): boolean => {
    // Loop through each channel in the array
    for (const channel of channelsArray) {
      if (channel === "Facebook" || channel === "Instagram") {
        // Check if Meta data is available for Facebook/Instagram
        if (
          !pixelData.Meta ||
          !pixelData.Meta.pixelInfo ||
          !pixelData.Meta.pixelInfo.pixel ||
          (!pixelData.Meta.pixelInfo.data && !pixelData.Meta.pixelInfo.event)
        ) {
          return false; // Return false if Meta pixel info is missing
        }
      } else {
        // Check if pixel data exists for other channels (e.g., Google)
        if (
          !pixelData[channel] ||
          !pixelData[channel].pixelInfo ||
          !pixelData[channel].pixelInfo.data
        ) {
          return false; // Return false if any other channel's pixel info is missing
        }
      }
    }

    // Return true if all checks pass
    return true;
  };

  const validateAppData = (channelsArray: string[], appData: any): boolean => {
    // Loop through each channel in the array
    for (const channel of channelsArray) {
      if (channel === "Facebook" || channel === "Instagram") {
        // Check if Meta data is available for Facebook/Instagram
        if (
          !appData.Meta ||
          !appData.Meta.appInfo ||
          !appData.Meta.appInfo.data
        ) {
          return false; // Return false if Meta pixel info is missing
        }
      }
    }

    // Return true if all checks pass
    return true;
  };

  const {
    data: allPlatform,
    isLoading: allPlatformLoading,
    isFetching: allPlatformFetching,
    isPending: allPlatformPending,
  } = useQuery({
    queryKey: ["platForm-All"],
    queryFn: () => {
      return getAllPlatform();
    },
  });

  const {
    data: allGoals,
    isLoading: allGoalsLoading,
    isFetching: allGoalsFetching,
    isPending: allGoalsPending,
  } = useQuery({
    queryKey: ["Goalls-All"],
    queryFn: () => {
      return getAllGoals();
    },
  });

  function ensureValidUrl(url: any) {
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      return "https://" + url;
    }

    return url;
  }

  const handlePopUp = () => {
    setPopUp(false);
  };

  const campaignNext = () => {
    setNextClick(true);
    if (search.has("campaignId")) {
      if (
        channelIdArray.length > 0 &&
        goalId &&
        name != "" &&
        url != "" &&
        validUrl != false &&
        targetGrps.length > 0 &&
        objective
      ) {
        let pixelDetailsPayload;
        let appDetailsPayload;
        if (
          objective === "Website conversion" ||
          objective == "Lead generation" ||
          objective == "Shopping" ||
          objective == "App Engagement"
        ) {
          const platformMap = goalData.platforms.reduce(
            (acc: any, platform: any) => {
              acc[platform.platformName] = platform.id;
              return acc;
            },
            {}
          );

          if (validatePixelData(channlesArray, pixelData) == false) {
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
            return;
          } else {
            pixelDetailsPayload = createPixelDetailsPayload(
              channlesArray,
              pixelData,
              platformMap
            );
          }
        }

        if (objective === "App Engagement" || objective == "App Install") {
          const platformMap = goalData.platforms.reduce(
            (acc: any, platform: any) => {
              acc[platform.platformName] = platform.id;
              return acc;
            },
            {}
          );

          if (validateAppData(channlesArray, appData) == false) {
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
            return;
          } else {
            appDetailsPayload = createAppDetailsPayload(
              channlesArray,
              appData,
              platformMap
            );
          }
        }

        const payload = {
          campaignId: Number(search.get("campaignId")),
          platformIds: channelIdArray,
          goalId: goalId,
          campaignName: name,
          siteUrl: ensureValidUrl(url),
          brandId: Number(search.get("brandid")),
          productId: Number(search.get("productid")),
          workspaceId: Number(localStorage.getItem("workspace_id")),
          accountIdsData: accIds,
          // targetGroupIds: [Number(targetGrp)],
          targetGroupIds: targetGrps,
          objective: objective,
          // ...(subTopic && { objectiveInfo: { subtopic: subTopic } }),
          ...((subTopic || pMax !== undefined) && {
            objectiveInfo: {
              ...(subTopic && { subtopic: subTopic }),
              ...(pMax !== undefined && { pMax: pMax }),
            },
          }),
          ...((objective === "Website conversion" ||
            objective == "Lead generation" ||
            objective == "Shopping" ||
            objective == "App Engagement") && {
            pixel_details: pixelDetailsPayload,
          }),
          ...((objective === "App Engagement" ||
            objective == "App Install") && {
            app_details: appDetailsPayload,
          }),
        };
        mutateUpdateCampaign.mutate(payload, {
          onSuccess: (response: any) => {
            setElement("element2", true);

            router.push(
              `/apphome/${workspacename}/admanager/ad-creative?campaignId=${Number(
                search.get("campaignId")
              )}&brandid=${Number(
                search.get("brandid")
              )}&objective=${objective}`
            );
          },
          onError: (error: any) => {
            toast.error(
              <>
                <span className="text-white text-[16px] leading-[20px]">
                  {" "}
                  Something Went Wrong!
                </span>
                <br />
                <span className="text-white text-[12px] leading-[18px] truncate2lines mt-2">
                  {" "}
                  {error.response.data.error}
                </span>
              </>,
              { autoClose: 5000 }
            );
          },
        });
      } else {
        toast.warn(
          <>
            <span className="text-white text-[16px] leading-[20px]">
              {" "}
              Information Missing!
            </span>
            <br />
            <span className="text-white text-[12px] leading-[18px] truncate2lines mt-2">
              {" "}
              Please fill <span className=" text-nyx-red font-semibold">
                *
              </span>{" "}
              marked fields Correctly.
            </span>
          </>,
          { autoClose: 5000 }
        );
      }
    } else {
      if (
        channelIdArray.length > 0 &&
        goalId &&
        name != "" &&
        url != "" &&
        validUrl != false &&
        targetGrps.length > 0 &&
        objective &&
        search.has("brandid")
      ) {
        setPopUp(true);
      } else {
        toast.warn(
          <>
            <span className="text-white text-[16px] leading-[20px]">
              {" "}
              Information Missing!
            </span>
            <br />
            <span className="text-white text-[12px] leading-[18px] truncate2lines mt-2">
              {" "}
              Please fill <span className=" text-nyx-red font-semibold">
                *
              </span>{" "}
              marked fields Correctly.
            </span>
          </>,
          { autoClose: 5000 }
        );
      }
    }
  };

  const nextFromPopUp = () => {
    if (
      channelIdArray.length > 0 &&
      goalId &&
      name != "" &&
      url != "" &&
      validUrl != false &&
      targetGrps.length > 0 &&
      objective &&
      search.has("brandid")
    ) {
      let pixelDetailsPayload;
      let appDetailsPayload;
      if (
        objective === "Website conversion" ||
        objective == "Lead generation" ||
        objective == "Shopping" ||
        objective == "App Engagement"
      ) {
        const platformMap = goalData.platforms.reduce(
          (acc: any, platform: any) => {
            acc[platform.platformName] = platform.id;
            return acc;
          },
          {}
        );

        if (validatePixelData(channlesArray, pixelData) == false) {
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
          return;
        } else {
          pixelDetailsPayload = createPixelDetailsPayload(
            channlesArray,
            pixelData,
            platformMap
          );
        }
      }

      if (objective === "App Engagement" || objective == "App Install") {
        const platformMap = goalData.platforms.reduce(
          (acc: any, platform: any) => {
            acc[platform.platformName] = platform.id;
            return acc;
          },
          {}
        );

        if (validateAppData(channlesArray, appData) == false) {
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
          return;
        } else {
          appDetailsPayload = createAppDetailsPayload(
            channlesArray,
            appData,
            platformMap
          );
        }
      }

      const data = {
        platformIds: channelIdArray,
        goalId: goalId,
        // productId: search.get("productid")!="null"?Number(search.get("productid")):119,
        brandId: Number(search.get("brandid")),
        workspaceId: Number(localStorage.getItem("workspace_id")),
        campaignName: name,
        siteUrl: ensureValidUrl(url), //validation is required
        // targetGroupIds: [Number(targetGrp)],
        targetGroupIds: targetGrps,
        objective: objective,

        accountIdsData: accIds,
        ...(search.get("productid") != "null"
          ? { productId: Number(search.get("productid")) }
          : {}),
        // ...(subTopic && { objectiveInfo: { subtopic: subTopic } }),
        ...((subTopic || pMax !== undefined) && {
          objectiveInfo: {
            ...(subTopic && { subtopic: subTopic }),
            ...(pMax !== undefined && { pMax: pMax }),
          },
        }),
        ...((objective === "Website conversion" ||
          objective == "Lead generation" ||
          objective == "Shopping" ||
          objective == "App Engagement") && {
          pixel_details: pixelDetailsPayload,
        }),
        ...((objective === "App Engagement" || objective == "App Install") && {
          app_details: appDetailsPayload,
        }),
      };

      mutateCreateCampaign.mutate(data, {
        onSuccess: (response: any) => {
          setElement("element2", true);
          router.push(
            `/apphome/${workspacename}/admanager/ad-creative?campaignId=${response?.data?.id
            }&brandid=${Number(search.get("brandid"))}&objective=${objective}`
          );
        },
        onError: (error: any) => {
          // toast.error(error.response.data.message);
          toast.error(
            <>
              <span className="text-white text-[16px] leading-[20px]">
                {" "}
                Something Went Wrong!
              </span>
              <br />
              <span className="text-white text-[12px] leading-[18px] truncate2lines mt-2">
                {" "}
                {error.response.data.error}
              </span>
            </>,
            { autoClose: 5000 }
          );
        },
      });
    } else {
      toast.warn(
        <>
          <span className="text-white text-[16px] leading-[20px]">
            {" "}
            Information Missing!
          </span>
          <br />
          <span className="text-white text-[12px] leading-[18px] truncate2lines mt-2">
            {" "}
            Please fill <span className=" text-nyx-red font-semibold">
              *
            </span>{" "}
            marked fields Correctly.
          </span>
        </>,
        { autoClose: 5000 }
      );
    }
  };

  const campaignSave = () => {
    setSaveClick(true);
    if (search.has("campaignId")) {
      if (
        channelIdArray.length > 0 &&
        goalId &&
        name != "" &&
        url != "" &&
        validUrl != false &&
        targetGrps.length > 0 &&
        objective
      ) {
        let pixelDetailsPayload;
        let appDetailsPayload;
        if (
          objective === "Website conversion" ||
          objective == "Lead generation" ||
          objective == "Shopping" ||
          objective == "App Engagement"
        ) {
          const platformMap = goalData.platforms.reduce(
            (acc: any, platform: any) => {
              acc[platform.platformName] = platform.id;
              return acc;
            },
            {}
          );

          if (validatePixelData(channlesArray, pixelData) == false) {
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
            return;
          } else {
            pixelDetailsPayload = createPixelDetailsPayload(
              channlesArray,
              pixelData,
              platformMap
            );
          }
        }

        if (objective === "App Engagement" || objective == "App Install") {
          const platformMap = goalData.platforms.reduce(
            (acc: any, platform: any) => {
              acc[platform.platformName] = platform.id;
              return acc;
            },
            {}
          );

          if (validateAppData(channlesArray, appData) == false) {
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
            return;
          } else {
            appDetailsPayload = createAppDetailsPayload(
              channlesArray,
              appData,
              platformMap
            );
          }
        }

        const payload = {
          campaignId: Number(search.get("campaignId")),
          platformIds: channelIdArray,
          goalId: goalId,
          campaignName: name,
          siteUrl: ensureValidUrl(url),
          brandId: Number(search.get("brandid")),
          productId: Number(search.get("productid")),
          workspaceId: Number(localStorage.getItem("workspace_id")),
          accountIdsData: accIds,
          // targetGroupIds: [Number(targetGrp)],
          targetGroupIds: targetGrps,
          objective: objective,
          // ...(subTopic && { objectiveInfo: { subtopic: subTopic } }),
          ...((subTopic || pMax !== undefined) && {
            objectiveInfo: {
              ...(subTopic && { subtopic: subTopic }),
              ...(pMax !== undefined && { pMax: pMax }),
            },
          }),
          ...((objective === "Website conversion" ||
            objective == "Lead generation" ||
            objective == "Shopping" ||
            objective == "App Engagement") && {
            pixel_details: pixelDetailsPayload,
          }),
          ...((objective === "App Engagement" ||
            objective == "App Install") && {
            app_details: appDetailsPayload,
          }),
        };
        mutateUpdateSaveCampaign.mutate(payload, {
          onSuccess: (response: any) => {
            setElement("element2", true);

            router.push(
              `/apphome/${workspacename}/admanager/summary?campaignId=${Number(
                search.get("campaignId")
              )}&brandid=${Number(
                search.get("brandid")
              )}&objective=${objective}`
            );
          },
          onError: (error: any) => {
            // toast.error(error.response.data.message);
            toast.error(
              <>
                <span className="text-white text-[16px] leading-[20px]">
                  {" "}
                  Something Went Wrong!
                </span>
                <br />
                <span className="text-white text-[12px] leading-[18px] truncate2lines mt-2">
                  {" "}
                  {error.response.data.error}
                </span>
              </>,
              { autoClose: 5000 }
            );
          },
        });
      } else {
        toast.warn(
          <>
            <span className="text-white text-[16px] leading-[20px]">
              {" "}
              Information Missing!
            </span>
            <br />
            <span className="text-white text-[12px] leading-[18px] truncate2lines mt-2">
              {" "}
              Please fill <span className=" text-nyx-red font-semibold">
                *
              </span>{" "}
              marked fields Correctly.
            </span>
          </>,
          { autoClose: 5000 }
        );
      }
    }
  };

  useEffect(() => {
    if (campaignDetails && allGoals) {
      setName(campaignDetails?.data[0]?.campaignName);
      setUrl(campaignDetails?.data[0]?.siteUrl);
      setChannelsArray(platforms);
      setChannelIdArray(platformsId);
      setObjective(campaignDetails?.data[0]?.objective);
      setGoalId(campaignDetails?.data[0]?.goalId);
      if (campaignDetails?.data[0]?.objectiveInfo) {
        if (campaignDetails?.data[0]?.objectiveInfo?.subtopic) {
          setSubTopic(campaignDetails?.data[0]?.objectiveInfo?.subtopic);
          setOptionValue({
            objective: campaignDetails?.data[0]?.objective,
            option: campaignDetails?.data[0]?.objectiveInfo?.subtopic,
          });
        }
        if (campaignDetails?.data[0]?.objectiveInfo?.pMax) {
          setPmax(campaignDetails?.data[0]?.objectiveInfo?.pMax);
        }
      }
      setGoalData(
        allGoals?.find(
          (goal: any) => goal.goalName === campaignDetails.data[0].objective
        )
      ); // Set the matching goal data

      setAccIds(
        campaignDetails.data
          .filter((item: any) => item.adAccountId !== null) // Filter out items where adAccountId is null
          .map((item: any) => ({
            accountId: item.adAccountId,
            platformId: item.platformId,
          }))
      );

      if (campaignDetails.data[0].pixelInfo !== null) {
        const transformedData = campaignDetails?.data?.reduce(
          (acc: any, item: any) => {
            const platformName = item.platform.platformName;

            if (platformName === "Facebook" || platformName === "Instagram") {
              // Group under Meta if it's Facebook or Instagram
              if (!acc.Meta) {
                acc.Meta = { pixelInfo: {} };
              }
              acc.Meta.pixelInfo = {
                ...acc.Meta.pixelInfo,
                ...item.pixelInfo,
              };
            } else {
              // Otherwise, use the platform name
              acc[platformName] = { pixelInfo: item.pixelInfo };
            }

            return acc;
          },
          {}
        );

        setPixelData(transformedData);
      }
      if (campaignDetails.data[0].appInfo !== null) {
        const transformedData = campaignDetails?.data?.reduce(
          (acc: any, item: any) => {
            const platformName = item.platform.platformName;

            if (platformName === "Facebook" || platformName === "Instagram") {
              // Group under Meta if it's Facebook or Instagram
              if (!acc.Meta) {
                acc.Meta = { appInfo: {} };
              }
              acc.Meta.appInfo = {
                ...acc.Meta.appInfo,
                ...item.appInfo,
              };
            } else {
              // Otherwise, use the platform name
              acc[platformName] = { appInfo: item.appInfo };
            }

            return acc;
          },
          {}
        );
        setAppData(transformedData);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [campaignDetails, allGoals]);

  const platforms = Array.from(
    new Set(
      campaignDetails?.data?.map(
        (campaignDetail: { platform: { platformName: string } }) =>
          campaignDetail.platform.platformName
      )
    )
  );
  const platformsId = Array.from(
    new Set(
      campaignDetails?.data?.map(
        (campaignDetail: { platform: { id: Number } }) =>
          campaignDetail.platform.id
      )
    )
  );

  return (
    <>
      <div className="w-full h-full">
        <div className="relative flex items-center justify-center h-full mt-2">
          <Steper />
        </div>
        <div
        //  className="bg-[#3B226F] h-[71vh] overflow-hidden overflow-y-auto rounded-t-lg"
        >
          {getProduct2Loading ||
            getCampaignLoading ||
            allGoalsLoading ||
            allPlatformLoading ||
            allPlatformPending ? (
            <div className="p-6 bg-[#3B226F] flex flex-col gap-4">
              {[1, 2, 3].map((item, index) => (
                <CampaignLoading key={index} />
              ))}
            </div>
          ) : (
            <>
              <div className="p-6 h-auto ">
                <ChannelsName
                  setChannelIdArray={setChannelIdArray}
                  channelIdArray={channelIdArray}
                  setChannelsArray={setChannelsArray}
                  channlesArray={channlesArray}
                  setName={setName}
                  name={name}
                  url={url}
                  objective={objective}
                  setUrl={setUrl}
                  accIds={accIds}
                  setAccIds={setAccIds}
                  campaignDetails={campaignDetails}
                  allPlatform={allPlatform}
                  goalData={goalData}
                  subTopic={subTopic}
                  setPixelData={setPixelData}
                  pixelData={pixelData}
                  appData={appData}
                  setAppData={setAppData}
                  nextClick={nextClick}
                  validUrl={validUrl}
                  setValidUrl={setValidUrl}
                  saveClick={saveClick}
                  setPmax={setPmax}
                  pMax={pMax}
                />

                {/* target grp */}
                <TargetGroup
                  setTargetGrps={setTargetGrps}
                  targetGrps={targetGrps}
                  brandDetails={brandDetails}
                  brandId={brandDetails?.id}
                  campaignDetails={campaignDetails}
                  brandDetailsRefetch={brandDetailsRefetch}
                  campaignId={search.get("campaignId")}
                />
              </div>
            </>
          )}
        </div>
        <div className="flex justify-center items-center gap-4 pb-3 bg-[#130828]">
          <Button
            className={classNames(
              "rounded-full w-32 font-semibold hover:shadow-none",
              mutateCreateCampaign.isPending ||
                mutateUpdateCampaign.isPending ||
                mutateUpdateSaveCampaign.isPending
                ? "bg-gray-400 text-black cursor-not-allowed border border-gray-400 hover:bg-gray-400"
                : "text-nyx-yellow"
            )}
            onClick={() =>
              router.push(
                `/apphome/${workspacename}/admanager/brand-details?brandid=${Number(
                  search.get("brandid")
                )}${search.get("productid") !== "null"
                  ? `&productid=${Number(search.get("productid"))}`
                  : ""
                }${search.has("campaignId")
                  ? `&campaignId=${Number(search.get("campaignId"))}`
                  : ""
                }`
              )
            }
            disabled={
              mutateCreateCampaign.isPending ||
              mutateUpdateCampaign.isPending ||
              mutateUpdateSaveCampaign.isPending
            }
          >
            Back
          </Button>

          <Button
            className={classNames(
              "rounded-full w-32 font-semibold text-black",
              mutateCreateCampaign.isPending ||
                mutateUpdateCampaign.isPending ||
                mutateUpdateSaveCampaign.isPending
                ? "bg-gray-400 cursor-not-allowed border border-gray-400 hover:bg-gray-400 hover:shadow-none"
                : "bg-nyx-yellow hover:shadow-none"
            )}
            onClick={campaignNext}
            disabled={
              mutateCreateCampaign.isPending ||
              mutateUpdateCampaign.isPending ||
              mutateUpdateSaveCampaign.isPending
            }
          >
            {mutateCreateCampaign.isPending ||
              mutateUpdateCampaign.isPending ? (
              <ButtonLoadingGenAI />
            ) : (
              "Next"
            )}
          </Button>
          {search.has("edit") && search.get("edit") == "true" && (
            <Button
              className={classNames(
                "rounded-full w-44 font-semibold text-black",
                mutateCreateCampaign.isPending ||
                  mutateUpdateCampaign.isPending ||
                  mutateUpdateSaveCampaign.isPending
                  ? "bg-gray-400 cursor-not-allowed border border-gray-400 hover:bg-gray-400 hover:shadow-none"
                  : "text-nyx-yellow hover:shadow-none"
              )}
              onClick={campaignSave}
              disabled={
                mutateCreateCampaign.isPending ||
                mutateUpdateCampaign.isPending ||
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

      {popUp ? (
        <Modal
          isOpen={popUp}
          style={addTagetGroupPopupStyle}
          onRequestClose={handlePopUp}
          ariaHideApp={false}
        >
          <div className="flex items-end justify-end">
            <div className="cursor-pointer" onClick={handlePopUp}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path
                  fill="#FFFFFF"
                  d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0s-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.39-.39.39-1.02 0-1.4z"
                />
              </svg>
            </div>
          </div>
          <div className="w-full flex flex-col justify-center items-center gap-5">
            <div className="w-[70%] text-white text-center text-base font-medium">
              Channel and objective settings can&apos;t be changed once
              confirmed.
            </div>
            <div className=" flex flex-row gap-4">
              <Button
                className="text-sm text-nyx-yellow font-[600] rounded-full w-[97px] px-2 h-[36px] hover:shadow-none"
                onClick={reset}
              >
                Reset
              </Button>
              <Button
                className={classNames(
                  "text-sm text-nyx-yellow font-[600] rounded-full w-[97px] px-2 h-[36px] hover:shadow-none flex justify-center items-center",
                  mutateCreateCampaign.isPending ||
                    mutateUpdateCampaign.isPending ||
                    mutateUpdateSaveCampaign.isPending
                    ? "bg-gray-400 cursor-not-allowed border border-gray-400 hover:bg-gray-400 hover:shadow-none"
                    : "bg-transparent"
                )}
                onClick={nextFromPopUp}
                disabled={
                  mutateCreateCampaign.isPending ||
                  mutateUpdateCampaign.isPending ||
                  mutateUpdateSaveCampaign.isPending
                }
              >
                {mutateCreateCampaign.isPending ||
                  mutateUpdateCampaign.isPending ? (
                  <ButtonLoadingGenAI />
                ) : (
                  "Confirm"
                )}
              </Button>
            </div>
          </div>
        </Modal>
      ) : null}
    </>
  );
};

export default Campaign;
