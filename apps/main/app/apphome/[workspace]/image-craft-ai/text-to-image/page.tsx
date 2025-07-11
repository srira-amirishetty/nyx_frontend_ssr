/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  Fragment,
} from "react";
import CreativeType from "./CreativeType";
import PromptSection from "./Prompt";
import Campaign from "./Campaign";
import Branding from "./Branding";
import { toast } from "react-toastify";
import "@nyx-frontend/main/app/_components/toastifyTest/toastify.css";
import "react-toastify/dist/ReactToastify.css";
import Media from "./MediaChannel";
import Sidebar from "@nyx-frontend/main/components/Sidebar";
import TopBar from "@nyx-frontend/main/components/TopBar";
import Steper from "./Steper";
import Button from "@nyx-frontend/main/components/Button";
import { useRouter, usePathname } from "next/navigation";
import {
  getbrandServiceonbording,
  addCampaignService,
  getpromtandimageService,
  imageLikeDisLikeService,
  getFolderService,
  changeImageFolderService,
  createFolderService,
} from "@nyx-frontend/main/services/brandService";
import {
  generateAnalysisService,
  generateEnhancedImageServices,
} from "@nyx-frontend/main/services/ctrServices";
import { useQuery, useMutation } from "@tanstack/react-query";
import Imageslider from "./Imageslider";
// import Imageloader from "./Imageloader";
// import ImageError from "./ImageError";
import { TargetGroupTabs } from "@nyx-frontend/main/shared/inputs";
import classNames from "@nyx-frontend/main/utils/classNames";
import { savePopupStyle, changeLocationPopupStyle } from "@nyx-frontend/main/utils/modalstyles";
import {
  useImageActive,
  useImageUrls,
  useImageTabActive,
} from "./_store/store";
import Modal from "react-modal";
import { revealPromptStyle } from "@nyx-frontend/main/utils/modalstyles";
import { useShallow } from "zustand/react/shallow";
import { Target, TargetID } from "./types";
import { BrandImageGenerationContext } from "@nyx-frontend/main/hooks/BrandImageGenerationContext";
import { BRAND_TABS } from "@nyx-frontend/main/utils/productConstants";
import { MessagePopupContext } from "@nyx-frontend/main/hooks/MessagePopupContext";
// import AnimateText from "./_components/AnimateText";
import { nanoid } from "nanoid";

import ButtonLoading from "@nyx-frontend/main/components/ButtonLoading";

import "../../../../../css/toolResponsive.css";
import LandscapePopup from "../../../LandscapePopUp";
import { paymentWarningStyle } from "@nyx-frontend/main/utils/modalstyles";
import { getAvailableCredit } from "@nyx-frontend/main/services/workSpace";

const Page = () => {
  const imageTabActive = useImageTabActive((state) => state.imageTabActive);
  const setImageTabActive = useImageTabActive(
    (state) => state.setImageTabActive,
  );
  const [
    imageurl,
    setImageUrl,
    setDisLike,
    setLike,
    setSaved,
    setAnalysisResult,
    modifyAnalysisResult,
    setDownload,
    setLoading,
    setImageError,
  ] = useImageUrls(
    useShallow((state) => [
      state.imageUrl,
      state.setImageUrl,
      state.setDisLike,
      state.setLike,
      state.setSaved,
      state.setAnalysisResult,
      state.modifyAnalysisResult,
      state.setDownload,
      state.setLoading,
      state.setError,
    ]),
  );
  const activeImageUrlIndex = useImageActive((state) => state.imageActive);
  const setActiveImageUrlIndex = useImageActive(
    (state) => state.setImageActive,
  );
  const [brandId, setBrandId] = useState<any>();
  const [campignapidata, setcampignapidata] = useState<any>();
  const [Promptvalue, setPromptvalue] = useState<string>();
  const [imageVersion, setImageVersion] = useState<number>(0);
  const [promtString, setPromtString] = useState<string>("");
  const [promptPopup, setPromptPopup] = useState(false);
  const [savePopup, setSavePopup] = useState<boolean>(false);

  const [folderClicked, setfolderClicked] = useState(false);
  const [folderClickedIndex, setfolderClickedIndex] = useState(null);
  const [folderID, setFolderID] = useState(null);
  const [generatepromptID, setgeneratePromptID] = useState<any>();

  const [generatePending, setGeneratePending] = useState<boolean>(false);

  const [changeLocationPopup, setChangeLocationPopup] =
    useState<boolean>(false);
  const [folderChanged, setFolderChanged] = useState<boolean>(false);
  const [dataLoadingForTargetGroupID, setDataLoadingForTargetGroupID] =
    useState<number | null>(null);

  const [brandSubmitStatus, setBrandSubmitStatus] = useState<boolean>(false);
  const [campaignSubmitStatus, setCampaignSubmitStatus] =
    useState<boolean>(false);
  const [campaignLoading, setCampaignLoading] = useState<boolean>(false);
  const [mediaSubmitStatus, setMediaSubmitStatus] = useState<boolean>(false);
  const [finalSubmitStatus, setFinalSubmitStatus] = useState<boolean>(false);

  const [analysisLoadingStatus, setAnalysisLoadingStatus] =
    useState<boolean>(false);

  const [creditFailed, setCreditFailed] = useState<boolean>(false);
  const [showerror, setshowError] = useState<boolean>(false);
  const imageRef = useRef<any>(null);
  const router = useRouter();
  const pathname = usePathname();
  const [previousPathname, setPreviousPathname] = useState(pathname);

  const sliderRef = useRef(null);

  // const [generated, setGenerated] = useState<boolean>(false);
  // const [userBrandClick, setUserBrandClick] = useState<boolean>(false);

  // console.log(generated, userBrandClick);
  /**
   * Use Context
   */
  const {
    tab,
    setBrandTab,
    creativeSubmitButtonClick,
    setMediaResponse,
    dataFromCreative,
    campaignName,
    setIsCreativeSubmitDone,
    isGenerateButtonDisabled,
    setIsGenerateButtonDisabled,
    mediaResponse,
    setDataFromCreative,
    setCreativePending,
  } = useContext(BrandImageGenerationContext);

  const { displayMessagePopup } = useContext(MessagePopupContext);

  const {
    data: brandDetails,
    error: brandDetailsError,
    refetch: getProductRefetch,
  } = useQuery({
    queryKey: ["getProduct", brandId],
    queryFn: () => {
      if (brandId) {
        return getbrandServiceonbording(brandId);
      }

      return null;
    },
  });

  useEffect(() => {
    setcampignapidata(null);
    setMediaResponse(null);
    setIsGenerateButtonDisabled(true);
  }, [brandDetails]);

  const { data: folderDetails, refetch: getFolderRefetch } = useQuery({
    queryKey: ["folder-details"],
    queryFn: () => {
      return getFolderService(1);
    },
  });

  const TARGET_GROUP_TAB = dataFromCreative?.campaign?.target_group_ids
    .map((id: number) => ({
      name: brandDetails?.brand_target_group_v2?.find(
        (el: { id: number }) => el.id === id,
      )?.name,
      id,
    }))
    .filter((groupTab: { name: string }) => Boolean(groupTab.name?.trim()));

  const mutateAddCampaign = useMutation({
    mutationKey: ["add-campign"],
    mutationFn: addCampaignService,
  });

  const mutategetpromptandimage = useMutation({
    mutationKey: ["get-image"],
    mutationFn: getpromtandimageService,
  });

  const mutateDislike = useMutation({
    mutationKey: ["dislike"],
    mutationFn: imageLikeDisLikeService,
  });

  const muateLike = useMutation({
    mutationKey: ["like"],
    mutationFn: imageLikeDisLikeService,
  });

  const mutateChangeFolder = useMutation({
    mutationKey: ["change-folder"],
    mutationFn: changeImageFolderService,
  });

  const mutateCreateFolder = useMutation({
    mutationKey: ["create-folder"],
    mutationFn: createFolderService,
  });

  useEffect(() => {
    const storage = localStorage.getItem("token");
    if (storage) {
    } else {
      router.push("/apphome/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // if (brandDetailsError) {
  //   // @ts-ignore
  //   if (brandDetailsError.response.status === 401) {
  //     router.push("/apphome/login");
  //     return <></>;
  //   }
  // }

  const {
    data: availableCredit,
    refetch: creditRefetch,
    isRefetchError,
  } = useQuery({
    queryKey: ["available-credit-text-to-image"],
    queryFn: () => {
      return getAvailableCredit(Number(localStorage.getItem("workspace_id")));
    },
  });

  const onClickGenerateHandler = async () => {
    let structuredData;
    const storedData = localStorage.getItem("structuredCreditData");
    if (storedData) {
      // Parse the JSON string back into an object
      structuredData = JSON.parse(storedData);
    }
    await creditRefetch();

    if (
      availableCredit?.availableCredits >
      structuredData["TEXT_IMAGE_GENERATION"].credits_generation &&
      !isRefetchError
    ) {
      setGeneratePending(true);
      const activeIndex = activeImageUrlIndex + 1;

      if (TARGET_GROUP_TAB) {
        TARGET_GROUP_TAB.forEach((targetGroup: { id: number }) => {
          setLoading({
            tabId: `${targetGroup.id}`,
            index: activeIndex,
            subIndex: 0,
            isLoading: true,
            isError: false,
            analysisLoading: false,
          });
        });

        tabClick(TARGET_GROUP_TAB[0].id);
      }

      // generating propmt
      creativeSubmitButtonClick()
        .then((creativeData: any) => {
          const TARGET_GROUP_TAB_LOCAL: Array<{ name: string; id: number }> =
            creativeData?.campaign?.target_group_ids.map((id: number) => ({
              name: brandDetails?.brand_target_group_v2.find(
                (el: { id: number }) => el.id === id,
              )?.name,
              id,
            }));

          tabClick(TARGET_GROUP_TAB_LOCAL[0].id);
          TARGET_GROUP_TAB_LOCAL.forEach((targetGroup) => {
            setIsCreativeSubmitDone(false);
            imageGenrateWithPrompt(targetGroup.id, activeIndex, creativeData)
              .then((response) => {
                setImageUrl({
                  tabId: `${targetGroup.id}`,
                  index: activeIndex,
                  subIndex: 0,
                  image: response.generatedImage,
                  isLoading: false,
                  isError: false,
                  other: response,
                  enhanced: false,
                  analysisLoading: false,
                });
              })
              .catch(() => {
                setImageError({
                  tabId: `${targetGroup.id}`,
                  index: activeIndex,
                  subIndex: 0,
                  isLoading: false,
                  isError: true,
                });
              });
          });

          setActiveImageUrlIndex(activeIndex);
        })
        .catch((error: any) => {
          if (error === "media_response_not_found") {
            if (!campignapidata) {
              setBrandTab(BRAND_TABS.CAMPAIGN);
              displayMessagePopup(
                "handle-input-prod-logo",
                "error",
                "Error",
                "Please create a campaign and click next.",
              );
            } else if (!mediaResponse) {
              setBrandTab(BRAND_TABS.MEDIA);
              displayMessagePopup(
                "handle-input-prod-logo",
                "error",
                "Error",
                "Please select media channel and click next.",
              );
            }
          }
        });
    } else if (
      availableCredit?.availableCredits <=
      structuredData["TEXT_IMAGE_GENERATION"].credits_generation &&
      !isRefetchError
    ) {
      setCreditFailed(true);
    } else {
      setshowError(true);
    }
  };

  const imageGenrateWithPrompt = (
    activeId: TargetID,
    activeIndex: number,
    creativeData: any,
  ): Promise<{ generatedImage: any; targetGroupId: any }> => {
    setIsGenerateButtonDisabled(true);

    return new Promise(async (resolve, reject) => {
      const productsarr = brandDetails?.brand_product_v2.filter((item: any) =>
        creativeData.campaign.product_ids.includes(item.id),
      );
      const targetgrouparr = brandDetails?.brand_target_group_v2.filter(
        (item: any) => creativeData.campaign.target_group_ids.includes(item.id),
      );

      const newtargetgrouparr = targetgrouparr.filter(
        (group: any) => group.id === Number(activeId),
      );

      // const campaign_id = Number(creativeData.campaign.id);
      // const tg_id = Number(activeId);
      // const concatenatedNumber = campaign_id.toString() + tg_id.toString();
      // const generateid = parseInt(concatenatedNumber, 10);

      const version = imageVersion + 1;
      setImageVersion(version);
      const data = {
        ...creativeData,
        user_prompt: Promptvalue,
        context_prompt: Promptvalue,
        brand_id: brandDetails?.id,
        products: productsarr,
        targetGroups: newtargetgrouparr,
        //order: imageurl?.[`${activeId}`]?.[activeIndex]?.length + 1 ?? 1, // regeneration times like default 1
        order: 1,
        version: version, // !version ? 1 : version + 1, // generate again like default version 1
        targetGroupId: Number(activeId), // In which target Group image should be generated
        generate_id: nanoid(),
        workspace_id: Number(localStorage.getItem("workspace_id")),
      };

      setDataLoadingForTargetGroupID(Number(activeId));

      try {
        const response = await mutategetpromptandimage.mutateAsync(data);
        setgeneratePromptID(response.promptId);
        setDataLoadingForTargetGroupID(null);
        resolve(response);
        setCreativePending(false);
      } catch (error) {
        setCreativePending(false);
        reject(error);
      } finally {
        setIsGenerateButtonDisabled(false);
        setGeneratePending(false);
      }
    });
  };

  const regenerateButton = async ({
    activeId,
    activeIndex,
    index,
  }: {
    activeId: string;
    activeIndex: number;
    index: number;
  }) => {
    let structuredData;
    const storedData = localStorage.getItem("structuredCreditData");
    if (storedData) {
      // Parse the JSON string back into an object
      structuredData = JSON.parse(storedData);
    }
    await creditRefetch();

    if (
      availableCredit?.availableCredits >
      structuredData["TEXT_IMAGE_GENERATION"].credits_generation &&
      !isRefetchError
    ) {
      let productsarr = brandDetails?.brand_product_v2.filter((item: any) =>
        dataFromCreative.campaign.product_ids.includes(item.id),
      );
      let targetgrouparr = brandDetails?.brand_target_group_v2.filter(
        (item: any) =>
          dataFromCreative.campaign.target_group_ids.includes(item.id),
      );

      const newtargetgrouparr = targetgrouparr.filter(
        (group: any) => group.id === Number(activeId),
      );

      // const campaign_id = Number(dataFromCreative.campaign.id);
      // const tg_id = Number(activeId);
      // const concatenatedNumber = campaign_id.toString() + tg_id.toString();
      // const generateid = parseInt(concatenatedNumber, 10);

      if (sliderRef.current) {
        //@ts-ignore
        sliderRef.current.triggerAfterChange(index);
      }

      let data = {
        ...dataFromCreative,
        user_prompt: Promptvalue,
        context_prompt: Promptvalue,
        brand_id: brandDetails?.id,
        products: productsarr,
        targetGroups: newtargetgrouparr,
        order: imageurl?.[`${activeId}`]?.[activeIndex]?.length + 1 || 1, // regeneration times like default 1
        version: imageVersion, // imageurl?.[`${imageTabActive}`]?.[activeImageUrlIndex]?.imageLists?.length + 1, // generate again like default version 1
        targetGroupId: Number(imageTabActive), // In which target Group image should be generated
        generate_id: nanoid(),
        workspace_id: Number(localStorage.getItem("workspace_id")),
      };

      setLoading({
        tabId: activeId,
        index: activeIndex,
        subIndex: index,
        isLoading: true,
        isError: false,
        analysisLoading: false,
      });

      mutategetpromptandimage.mutate(data, {
        onSuccess: (response: any) => {
          setImageUrl({
            tabId: activeId,
            index: activeIndex,
            subIndex: index,
            image: response.generatedImage,
            isLoading: false,
            isError: false,
            other: response,
            enhanced: false,
            analysisLoading: false,
          });
          setActiveImageUrlIndex(index);
          setgeneratePromptID(response.promptId);
        },
        onError: () => {
          setImageError({
            tabId: activeId,
            index: activeIndex,
            subIndex: index,
            isLoading: false,
            isError: true,
          });
        },
      });
    } else if (
      availableCredit?.availableCredits <=
      structuredData["TEXT_IMAGE_GENERATION"].credits_generation &&
      !isRefetchError
    ) {
      setCreditFailed(true);
    } else {
      setshowError(true);
    }
  };

  function callapifromallcomp(data: any) {
    mutateAddCampaign.mutate(data, {
      onSuccess: (response: any) => {
        setcampignapidata(response);
        setBrandTab(BRAND_TABS.MEDIA);
        setCampaignLoading(false);
      },
      onError: (response: any) => {
        setCampaignLoading(false);
      },
    });
  }

  function callCampaignApiAtMedia(data: any) {
    setMediaResponse(data);
  }

  const selectedBrandFromBranding = (id: any) => {
    setBrandId(id);
  };
  // const clickBrandFromBranding = (click: boolean) => {
  //   setUserBrandClick(click);
  // };

  const hitDisLikeButton = (attr: {
    activeId: string;
    activeIndex: number;
    index: number;
    details: { other: { file_id: string } };
  }) => {
    setDisLike({
      tabId: attr.activeId,
      index: attr.activeIndex,
      subIndex: attr.index,
    });
    const data = {
      file_id: attr.details.other.file_id,
      action: "dislike",
    };
    muateLike.mutate(data, {
      onSuccess: (response: any) => {
        console.log(response);
      },
    });
  };

  const hitLikeButton = (attr: {
    activeId: string;
    activeIndex: number;
    index: number;
    details: { other: { file_id: string } };
  }) => {
    setLike({
      tabId: attr.activeId,
      index: attr.activeIndex,
      subIndex: attr.index,
    });

    let data = {
      file_id: attr.details.other.file_id,
      action: "like",
    };
    muateLike.mutate(data, {
      onSuccess: (response: any) => {
        console.log(response);
      },
    });
  };

  const downLoadButtonClick = (attr: {
    activeId: string;
    activeIndex: number;
    index: number;
    details: { other: { file_id: string } };
  }) => {
    setDownload({
      tabId: attr.activeId,
      index: attr.activeIndex,
      subIndex: attr.index,
      downloadClicked: true,
    });
    let data = {
      file_id: attr.details.other.file_id,
      action: "download",
    };
    muateLike.mutate(data, {
      onSuccess: (response: any) => {
        console.log(response);
      },
    });
  };

  const handleStopGeneration = () => {
    window.location.reload();
  };

  const saveButtonClicked = (attr: {
    activeId: string;
    activeIndex: number;
    index: number;
    details: { other: { file_id: string } };
  }) => {
    setSaved({
      tabId: attr.activeId,
      index: attr.activeIndex,
      subIndex: attr.index,
      saveClicked: true,
    });
    let data = {
      file_id: attr.details.other.file_id,
      action: "save",
    };
    muateLike.mutate(data, {
      onSuccess: (response: any) => {
        console.log(response);

        (function () {
          const error = () => {

            toast.success(
              <>
                <span className="text-white text-[16px] leading-[20px]">
                  {" "}
                  Request Successful!
                </span>
                <br />
                <span className="text-white text-[12px] leading-[18px] truncate2lines mt-2">
                  {" "}
                  Image has been saved in the default location!
                </span>
              </>,
              { autoClose: 5000 },
            );
          };

          error(); // Invoke the Warning function immediately
        })();
      },
    });
  };

  const mutateAnalysisResult = useMutation({
    mutationKey: ["analysis-result"],
    mutationFn: generateAnalysisService,
  });

  const mutateGenerateEnhancedImage = useMutation({
    mutationKey: ["enhamced-image-generate"],
    mutationFn: generateEnhancedImageServices,
  });

  const analysisButtonClicked = (attr: {
    activeId: string;
    activeIndex: number;
    index: number;
    details: any;
  }) => {
    setLoading({
      tabId: attr.activeId,
      index: attr.activeIndex,
      subIndex: attr.index,
      isLoading: false,
      isError: false,
      analysisLoading: true,
    });

    let data = {
      prompt_id: attr.details.other.promptId,
      workspace_id: Number(localStorage.getItem("workspace_id")),
    };

    mutateAnalysisResult.mutate(data, {
      onSuccess: (response: any) => {
        const featureAnalysesResult =
          response?.data?.feature_comparision?.recommendations
            ?.feature_analyses;

        const filteredFeatureAnalysesResult: { [key: string]: any } =
          Object.entries(featureAnalysesResult || {}) // Ensure featureAnalysesResult is not null/undefined
            .filter(([key, value]) => (value as any).feature_similarity <= 0.35)
            .reduce((acc: { [key: string]: any }, [key, value]) => {
              acc[key] = value;
              return acc;
            }, {});

        setAnalysisResult({
          tabId: attr.activeId,
          index: attr.activeIndex,
          subIndex: attr.index,
          analysisId: response?.data?.id,
          result: featureAnalysesResult,
          filterResult: filteredFeatureAnalysesResult,
          analysisLoading: false,
          checked: filteredFeatureAnalysesResult
            ? Object.keys(filteredFeatureAnalysesResult)
            : [],
        });
      },
      onError: (response: any) => {
        setLoading({
          tabId: attr.activeId,
          index: attr.activeIndex,
          subIndex: attr.index,
          isLoading: false,
          isError: false,
          analysisLoading: false,
        });

        (function () {
          const error = () => {

            toast.error(
              <>
                <span className="text-white text-[16px] leading-[20px]">
                  {" "}
                  Bad Request!
                </span>
                <br />
                <span className="text-white text-[12px] leading-[18px] truncate2lines mt-2">
                  {" "}
                  Some error occured.
                </span>
              </>,
              { autoClose: 5000 },
            );
          };

          error();
        })();
      },
    });
  };

  const generatEhancedImage = (attr: {
    activeId: string;
    activeIndex: number;
    index: number;
    details: any;
  }) => {
    const updatedRecommendations = attr.details.checked.reduce(
      (acc: any, val: any) => {
        acc[val] = attr?.details?.filterResult[val];

        return acc;
      },
      {},
    );

    if (sliderRef.current) {
      //@ts-ignore
      sliderRef.current.triggerAfterChange(attr.index);
    }

    let payload = {
      workspace_id: Number(localStorage.getItem("workspace_id")),
      prompt_id: attr.details.other.promptId,
      version: attr?.details?.other?.version,
      order: attr?.details?.other?.order + 1,
      image_analysis_id: attr?.details?.analysisId,
      recommendations: updatedRecommendations,
    };

    setLoading({
      tabId: attr.activeId,
      index: attr.activeIndex,
      subIndex: attr.index,
      isLoading: true,
      isError: false,
      analysisLoading: false,
    });

    mutateGenerateEnhancedImage.mutate(payload, {
      onSuccess: (response: any) => {
        setImageUrl({
          tabId: attr.activeId,
          index: attr.activeIndex,
          subIndex: attr.index,
          image: response.generatedImage,
          isLoading: false,
          isError: false,
          other: response,
          enhanced: true,
          analysisLoading: false,
        });
        setActiveImageUrlIndex(attr.index);
        setgeneratePromptID(response.promptId);
      },
      onError: () => {
        setImageError({
          tabId: attr.activeId,
          index: attr.activeIndex,
          subIndex: attr.index,
          isLoading: false,
          isError: true,
        });
      },
    });
  };

  const handleCheckboxChange = (
    event: any,
    key: any,
    attr: {
      activeId: string;
      activeIndex: number;
      index: number;
      details: any;
    },
  ) => {
    const isChecked = event.target.checked;

    modifyAnalysisResult({
      tabId: attr.activeId,
      index: attr.activeIndex,
      subIndex: attr.index,
      selectedItem: { item: key, checked: isChecked },
    });
  };

  const revealPromtButtonClick = (details: {
    other: { user_prompt: string };
  }) => {
    setPromtString(details.other.user_prompt);
    setPromptPopup(true);
  };

  /**
   *
   * @param id string | number
   * @param index number
   * @returns
   *
   * @example
   * tabClick(10, 0);
   */
  const tabClick = (id: string | number) => {
    setImageTabActive(`${id}`);
    return;
  };

  const folderButtonClick = (value: any, index: any) => {
    setfolderClicked(true);
    setfolderClickedIndex(index);
    setFolderID(value);
  };

  const changeFolderClick = () => {
    let data = {
      prompt_id: generatepromptID,

      folder_id: folderID,
    };
    mutateChangeFolder.mutate(data, {
      onSuccess: (response: any) => {
        setFolderChanged(true);
        setChangeLocationPopup(false);
        setSavePopup(true);
      },
    });
  };

  const createFolderButtonClick = () => {
    let data = {
      workspace_id: Number(localStorage.getItem("workspace_id")),
      name: "New Folder",
      is_default: false,
    };
    mutateCreateFolder.mutate(data, {
      onSuccess: (response: any) => {
        getFolderRefetch();
      },
    });
  };

  const handleCopy = () => {
    // Copy text to clipboard
    navigator.clipboard
      .writeText(promtString)
      .then(() => {
        // Success message or any other action
        console.log("Text copied to clipboard:", promtString);
        // You can also show a success message here if needed
        toast.success(
          <>
            <span className="text-white text-[16px] leading-[20px]">
              {" "}
              Request Successful!
            </span>
            <br />
            <span className="text-white text-[12px] leading-[18px] truncate2lines mt-2">
              {" "}
              Copied Successfully
            </span>
          </>,
          { autoClose: 5000 },
        );
      })
      .catch((err) => {
        // Error handling
        console.error("Error copying text to clipboard:", err);
        // You can also show an error message here if needed
      });
  };

  const brandSubmitClick = () => {
    setBrandSubmitStatus(true);
  };

  const campaignSubmitClick = () => {
    setCampaignSubmitStatus(true);
    setCampaignLoading(true);
  };

  const mediaSubmitClick = () => {
    setMediaSubmitStatus(true);
  };

  const finalSubmit = () => {
    setIsGenerateButtonDisabled(false);
    setFinalSubmitStatus(true);
  };

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
      <div className="justify-start flex w-full bg-[#130828]">
        <Sidebar />
        <div className="w-full overflow-hidden overflow-y-auto h-[100vh]">
          <TopBar title="Generate Image Ads" />
          <div className="w-full py-2 px-2">
            <div className="flex w-full gap-2 justify-center right_side_tool">
              <div className="tool-left-panel w-full flex flex-col justify-between px-2 overflow-hidden overflow-y-auto">
                <div className="flex flex-col gap-2">
                  <Branding
                    selectedBrandFromBranding={selectedBrandFromBranding}
                    brandSubmitClick={brandSubmitClick}
                  />
                  <Campaign
                    callcampignapi={callapifromallcomp}
                    brandDetails={brandDetails}
                    campaignSubmitClick={campaignSubmitClick}
                    getProductRefetch={getProductRefetch}
                    campaignLoading={campaignLoading}
                    setFinalSubmitStatus={setFinalSubmitStatus}
                  />
                  <Media
                    campignapidata={campignapidata}
                    callCampaignApiAtMedia={callCampaignApiAtMedia}
                    mediaSubmitClick={mediaSubmitClick}
                    brandDetails={brandDetails}
                  />
                  <CreativeType
                    brandDetails={brandDetails}
                    finalSubmit={finalSubmit}
                  />
                  <PromptSection
                    Promptvalue={Promptvalue}
                    setPromptvalue={setPromptvalue}
                    onClickGenerateHandler={onClickGenerateHandler}
                    isGenerateButtonDisabled={isGenerateButtonDisabled}
                    generatePending={generatePending}
                  />
                </div>
              </div>

              <div className="w-[65%] bg-[#332270] rounded-lg overflow-hidden overflow-y-auto">
                {Object.keys(imageurl).length > 0 ? (
                  <div className="bg-[#23145A] py-3 pl-4 pr-3 h-[54px] w-full flex justify-between border-b-2 border-[#322270]">
                    <div className="w-max text-white rounded-md">
                      <span className="font-[700] px-2">Campaign :</span>
                      <span className="font-[400]">{campaignName}</span>
                    </div>
                    <TargetGroupTabs
                      tabs={TARGET_GROUP_TAB || []}
                      tabClick={tabClick}
                    />
                  </div>
                ) : (
                  <div className="bg-transparent py-3 pl-4 pr-3 h-[24px] w-full flex justify-center"></div>
                )}

                <div className="">
                  <section
                    className="min-h-[640px] max-h-[calc(100vh-200px)] overflow-y-auto"
                    ref={imageRef}
                    data-id={`${imageTabActive}`}
                  >
                    {Object.keys(imageurl).length > 0 ? (
                      <>
                        {TARGET_GROUP_TAB?.map((tab: { id: number }) => (
                          <section
                            key={`section-${tab.id}`}
                            data-id={tab.id}
                            className={classNames(
                              Number(imageTabActive) === Number(tab.id)
                                ? "flex flex-col gap-4"
                                : "hidden",
                            )}
                          >
                            {imageurl[tab.id]?.map(
                              (sImageUrl: any, index: number) => (
                                <Fragment key={`Slide-${index}`}>
                                  <div className="w-full scrollbar-hide">
                                    <Imageslider
                                      ref={sliderRef}
                                      //@ts-ignore
                                      imageurl={sImageUrl}
                                      tabId={tab.id}
                                      activeIndex={index}
                                      details={sImageUrl}
                                      regenerateButton={regenerateButton}
                                      hitDisLikeButton={hitDisLikeButton}
                                      hitLikeButton={hitLikeButton}
                                      downLoadButtonClick={downLoadButtonClick}
                                      saveButtonClicked={saveButtonClicked}
                                      handleStopGeneration={handleStopGeneration}
                                      revealPromtButtonClick={
                                        revealPromtButtonClick
                                      }
                                      campaignName={campaignName}
                                      analysisButtonClicked={
                                        analysisButtonClicked
                                      }
                                      generatEhancedImage={generatEhancedImage}
                                      handleCheckboxChange={handleCheckboxChange}
                                    />
                                  </div>
                                </Fragment>
                              ),
                            )}
                          </section>
                        ))}
                      </>
                    ) : (
                      <>
                        <p className="text-white p-4 text-[24px] font-bold">
                          Steps for Brand Image Generation
                        </p>
                        <Steper
                          tab={tab}
                          // isGenerateButtonDisabled={isGenerateButtonDisabled}
                          brandSubmitStatus={brandSubmitStatus}
                          campaignSubmitStatus={campaignSubmitStatus}
                          mediaSubmitStatus={mediaSubmitStatus}
                          finalSubmitStatus={finalSubmitStatus}
                        />
                      </>
                    )}
                  </section>
                  {/* {["camaign", "media", "creative"].includes(tab) ||
                  dataFromCreative ? (
                    <div>
                      <div className="absolute bottom-0 bg-[#1F1D4D] w-full text-center p-2">
                        <textarea
                          className="w-full h-[100px] bg-transparent border placeholder:italic border-x-nyx-gray-1 rounded-lg p-5 text-white  outline-none"
                          placeholder="Write description of the desired image"
                          value={Promptvalue}
                          onChange={(e) => setPromptvalue(e.target.value)}
                          onFocus={(e) => (e.target.placeholder = "")}
                          onBlur={(e) =>
                            (e.target.placeholder =
                              "Write description of the desired image")
                          }
                        ></textarea>
                        <Button
                          className={classNames(
                            "hover:shadow-none text-sm font-semibold w-[150px] shadow-sm rounded-full my-4",
                            !isGenerateButtonDisabled && Promptvalue
                              ? ""
                              : " bg-gray-600 border-gray-600 text-black hover:bg-gray-600 cursor-not-allowed",
                          )}
                          onClick={onClickGenerateHandler}
                          disabled={!(!isGenerateButtonDisabled && Promptvalue)}
                        >
                          {generatePending ? <ButtonLoading /> : "Generate"}
                        </Button>
                      </div>
                    </div>
                  ) : null} */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {promptPopup ? (
        <Modal
          isOpen={promptPopup}
          style={revealPromptStyle}
          ariaHideApp={false}
        >
          <div className="flex justify-between mt-5">
            <div className="text-xl font-bold text-[#FFFFFF]">
              Reveal Prompt
            </div>

            <div
              className="pr-3 cursor-pointer"
              onClick={() => {
                setPromptPopup(false);
              }}
            >
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

          <div className="w-full text-[#FFFFFF] text-base font-normal my-12 text-left">
            {promtString}
          </div>

          <div className="w-full flex gap-4 justify-center items-center mb-5">
            <Button
              className="rounded-full w-40"
              onClick={() => {
                setPromptPopup(false);
              }}
            >
              Cancel
            </Button>
            <Button className="rounded-full w-40" onClick={handleCopy}>
              Copy
            </Button>
          </div>
        </Modal>
      ) : null}

      {changeLocationPopup ? (
        <Modal isOpen={changeLocationPopup} style={changeLocationPopupStyle}>
          <div className="flex justify-between mt-5">
            <div className="text-xl font-bold text-[#FFFFFF]">
              Select a Location
            </div>
            <div
              className="pr-3 cursor-pointer"
              onClick={() => {
                setChangeLocationPopup(false);
              }}
            >
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
          <button
            className="text-base font-light text-[#FFFFFF] underline cursor-pointer"
            onClick={createFolderButtonClick}
          >
            Create Folder
          </button>
          <div className="w-full my-10 flex gap-3 flex-wrap overflow-y-auto overflow-x-hidden h-[180px]">
            {folderDetails?.folders.map((item: any, index: any) => (
              <div
                key={item?.id}
                className={`w-[155px] h-[170px] bg-[#3B226F] py-2 rounded-md flex flex-col items-center hover:border-[#5E32FF] border-transparent border-2 cursor-pointer ${folderClicked && folderClickedIndex === index
                    ? "bg-[#5E32FF]"
                    : "bg-transparent"
                  }`}
                onClick={() => folderButtonClick(item?.id, index)}
              >
                <div className="w-[141px] h-[105px] bg-[#FFCB54] rounded-md flex justify-center items-center">
                  <svg
                    width="51"
                    height="41"
                    viewBox="0 0 51 41"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.1 41C3.6975 41 2.49688 40.4982 1.49812 39.4945C0.499375 38.4909 0 37.2844 0 35.875V5.125C0 3.71563 0.499375 2.50911 1.49812 1.50547C2.49688 0.501823 3.6975 0 5.1 0H20.4L25.5 5.125H45.9C47.3025 5.125 48.5031 5.62682 49.5019 6.63047C50.5006 7.63411 51 8.84062 51 10.25V35.875C51 37.2844 50.5006 38.4909 49.5019 39.4945C48.5031 40.4982 47.3025 41 45.9 41H5.1ZM5.1 35.875H45.9V10.25H23.3962L18.2962 5.125H5.1V35.875Z"
                      fill="black"
                    />
                  </svg>
                </div>
                <div className="flex flex-col w-full p-2">
                  <p className="text-[#FFF] text-xs md:text-sm">
                    {/* {item?.name.slice(0, 8) + "..."} */}
                    {item?.name}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center">
            <input
              id="default-checkbox"
              type="checkbox"
              value=""
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="default-checkbox"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              {" "}
              Save this location as default for my images
            </label>
          </div>

          <div className="w-full flex gap-4 mt-6 justify-center items-center">
            <Button
              className="rounded-full w-60"
              onClick={() => {
                setChangeLocationPopup(false);
              }}
            >
              Cancel
            </Button>
            <Button className="rounded-full w-60" onClick={changeFolderClick}>
              Save File
            </Button>
          </div>
        </Modal>
      ) : null}

      <LandscapePopup />

      {/* {generated && userBrandClick ? (
        <Modal
          isOpen={generated && userBrandClick}
          style={warningText2ImageStyle}
          onRequestClose={warningNoButtonClick}
        >
          <p className="text-white flex justify-center items-center text-center m-10 text-lg font-medium">
            Do you want to Discard Your Changes ?
          </p>
          <div className="flex justify-center items-center gap-3">
            <Button
              className="w-[40%]  shadow-sm border-[#DFD7A8] shadow-nyx-yellow rounded-full"
              onClick={warningYesButtonClick}
            >
              Yes
            </Button>
            <Button
              className="w-[40%]  shadow-sm border-[#DFD7A8] shadow-nyx-yellow rounded-full"
              onClick={warningNoButtonClick}
            >
              No
            </Button>
          </div>
        </Modal>
      ) : null} */}

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

      {showerror ? (
        <Modal isOpen={showerror} style={paymentWarningStyle}>
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
              onClick={() => setshowError(false)}
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