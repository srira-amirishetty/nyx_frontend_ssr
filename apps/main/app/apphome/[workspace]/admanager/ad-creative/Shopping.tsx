"use client";
import React, { useState, useRef, useEffect, useContext } from "react";

import Button from "@nyx-frontend/main/components/Button";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Switch from "react-switch";
import Select from "react-select";
import Loading from "./_components/Loading";
import { admanagerConversion, CatalogStyle } from "@nyx-frontend/main/utils/productStyle";
import AdManagerTabs from "./_components/AdManagerTabs";
import {
  getCampaign,
  updateCampaign,
  AiHeadlineSuggestion,
  getBuisnessId,
  getProductCatalouge,
  getProductSet,
  getProductList,
  getGmc,
  getGmcProduct,
  getGmcProductList,
} from "@nyx-frontend/main/services/admanagerServices";
import { useMutation, useQuery } from "@tanstack/react-query";
import { BsFillInfoCircleFill } from "react-icons/bs";

import ButtonLoadingGenAI from "@nyx-frontend/main/components/ButtonLoadingGenAI";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";
import useStore from "../component/store";

import Steper from "../component/Steper";
import { getbrandServiceonbording } from "@nyx-frontend/main/services/brandService";
import { TDriveImageList } from "@nyx-frontend/main/components/uploadComponentsImage/DriveImageLists.types";
import classNames from "@nyx-frontend/main/utils/classNames";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@nyx-frontend/main/app/_components/toastifyTest/toastify.css";
import FbFeedOne from "./_components/Facebook/FbFeedOne";
import FbShoppingCrousel from "./_components/Facebook/FbShoppingCrousel";
import FbShoppingSingle from "./_components/Facebook/FbShoppingSingle";
import InstaShoppingStory from "./_components/Instagram/InstaShoppingStory";
import InstaShoppingFeed from "./_components/Instagram/InstaShoppingFeed";
import InstaShoppingReel from "./_components/Instagram/InstaShoppingReel";
import GoogleShoppingLight from "./_components/GoogleAds/GoogleShoppingLight";
import GoogleShoppingDark from "./_components/GoogleAds/GoogleShoppingDark";
import MultipletgTab from "./_components/MultipletgTab";
import MultipleAd from "./_components/MultipleAd";

const Shopping = ({ brandId, campaignId, objective }: any) => {
  const router = useRouter();
  const search = useSearchParams();
  const { setElement } = useStore();
  const [headlineInputs, setHeadlineInputs] = useState([""]);
  const [headLine, setHeadLine] = useState("");
  const [discription, setDiscription] = useState("");
  const [caption, setCaption] = useState("");
  const [buinessOption, setBuisnessOption] = useState([]);
  const [catalogOption, setCatalogOption] = useState([]);
  const [productOption, setProductOption] = useState([]);
  const [previewData, setPreviewData] = useState([]);
  const [googlePreviewData, setGooglePreviewData] = useState<any>([]);
  const [googleFilteredData, setGoogleFilteredData] = useState([]);
  const [buisnessId, setBuisnessId] = useState<any>();
  const [feedLabel, setFeedlabel] = useState<any>();
  const [gmcOption, setGmcOptions] = useState([]);
  const [googleProductOptions, setGoogleProductOptions] = useState([]);
  const [gmcId, setGmcId] = useState<any>();
  const [googleProductId, setGoogleProductId] = useState<any>();
  const [catalogId, setCatalogId] = useState<any>();
  const [productSetId, setProductSetId] = useState<any>();
  const [mixedArray, setMixedArray] = useState<any>([]);
  const [captionInputs, setCaptionInputs] = useState([""]);
  const [workspacename, setWorkspacename] = useState<string>("");
  const [discriptionInput, setDiscriptionInput] = useState("");
  const [mediaTab, setMediaTab] = useState<any>();
  const [fbPostChecked, setFbPostChecked] = useState<boolean>(false);
  const [campaingSiteUrl, setCampaingSiteUrl] = useState<string>("");
  const [campainObjective, setCampaignObjective] = useState<string>("");
  const [brandName, setBrandName] = useState<string>("");
  const [brandLogos, setBrandLogos] = useState<any>([]);
  const [driveClickedArray, setDriveClickedArray] = useState<any>([]);
  const [driveVideoClickedArray, setDriveVideoClickedArray] = useState<any>([]);
  const [showDiscription, setShowDiscription] = useState(true);
  const [instaPostChecked, setInstaPostChecked] = useState<boolean>(false);
  const [instaStoryChecked, setInstaStoryChecked] = useState<boolean>(false);
  const [instareelsChecked, setInstareelsChecked] = useState<boolean>(false);
  const [isInventry, setIsInvenrtry] = useState(false);
  const [valueOption, setValueOptions] = useState<any>([]);
  const [valueOptionArray, setValueOptionsArray] = useState([[]]);
  const [filters, setFilters] = useState([{ category: "", value: "" }]);
  const [previewUrl, setPreviewUrl] = useState({});
  const [activeTgTab, setActiveTgTab] = useState<any>(null);
  const [targetGroups, setTargetGroups] = useState([]);
  

  const { data: brandDetails } = useQuery({
    queryKey: ["brand-details", brandId],
    queryFn: () => {
      if (brandId) {
        return getbrandServiceonbording(brandId);
      }

      return null;
    },
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

  console.log("campaignDetails",campaignDetails)

   useEffect(() => {
    if (campaignDetails) {
      setActiveTgTab(campaignDetails?.data?.[0]?.targetGroups[0].id);
      setTargetGroups(campaignDetails?.data?.[0]?.targetGroups);
    }
  }, [campaignDetails]);



  useEffect(() => {
    if (campaignDetails?.data) {
      campaignDetails.data.forEach((campaign: any) => {
        const templateJson = campaign.templateJson;
        const platformName = campaign.platform?.platformName.toLowerCase();

        if (templateJson) {
          setCaption(templateJson.caption);
          setDiscription(templateJson.description);
          setHeadLine(templateJson.message);
          if (platformName === "instagram" || platformName === "facebook") {
            // Set businessId and related data for Instagram/Facebook
            setBuisnessId(Number(templateJson.buisnessId));
            setCatalogId(Number(templateJson.catalogId));
            setProductSetId(Number(templateJson.product_set_id));

            getCatalog(Number(templateJson.buisnessId));
            getProductSetList(Number(templateJson.catalogId));
            getProductData(Number(templateJson.product_set_id));
          } else if (platformName === "google") {
            // Set catalogId and related data for Google
            setGmcId(Number(templateJson.merchant_center_id));
            if (templateJson.filterData) {
              setIsInvenrtry(true);
              getGoogleProduct(
                Number(templateJson.merchant_center_id),
                templateJson.filterData,
              );
              setFilters(templateJson.filterData);
            } else {
              getGoogleProduct(Number(templateJson.merchant_center_id));
            }
          }
        }
      });
    }
  }, [campaignDetails]);

  useEffect(() => {
    if (brandId) {
      const data = {
        workspace_id: Number(localStorage.getItem("workspace_id")),
        brand_id: brandId,
      };
      mutateGetBuisnessId.mutate(data, {
        onSuccess: (response: any) => {
          console.log(response);

          const transformedOptions = response.data.map((item: any) => ({
            value: item.id,
            label: item.name,
          }));

          setBuisnessOption(transformedOptions);
        },
        onError: (res: any) => {
          console.log(res);
        },
      });

      mutateGetGmcId.mutate(data, {
        onSuccess: (response: any) => {
          console.log(response);

          const transformedOptions = response.gmcAccounts.map((item: any) => ({
            value: item.id,
            label: item.name,
          }));

          setGmcOptions(transformedOptions);
        },
        onError: (res: any) => {
          console.log(res);
        },
      });
    }
  }, [brandId]);

  const isFiltersValid = () => {
    // Check if all filters in the array have a valid category and value
    return filters.every((filter) => filter.category && filter.value);
  };

  const category = [
    { label: "category", value: "product_category" },
    { label: "brand", value: "product_brand" },
    { label: "item id", value: "product_item_id" },
    { label: "condition", value: "product_condition" },
    { label: "product type", value: "product_type" },
    { label: "custom label 0", value: "customLabel0" },
    { label: "custom label 1", value: "customLabel1" },
    { label: "custom label 2", value: "customLabel2" },
    { label: "custom label 3", value: "customLabel3" },
    { label: "custom label 4", value: "customLabel4" },
    { label: "channel", value: "product_channel" },
    { label: "channel exclusivity", value: "product_channel_exclusivity" },
    { label: "shipping label", value: "shippingLabel" },
  ];
  console.log(filters);
  const apiCall = () => {
    const payload = {
      campaignId: campaignId,
      platforms: campaignDetails?.data?.reduce((acc: any, item: any) => {
        const platformName = item.platform.platformName.toUpperCase();

        // Define the templateJson based on the platform
        const templateJson =
          platformName === "GOOGLE"
            ? {
                cta: "Shop Now",
                name: brandDetails?.brand_name,
                message: headLine,
                description: discription,
                caption: caption,
                previewData: previewData,
                googlePreviewData: googlePreviewData,
                merchant_center_id: String(gmcId),
                ...(isInventry && { filterData: filters }),
              }
            : {
                cta: "Shop Now",
                name: brandDetails?.brand_name,
                message: headLine,
                description: discription,
                caption: caption,
                previewData: previewData,
                googlePreviewData: googlePreviewData,
                product_set_id: String(productSetId),
                buisnessId: String(buisnessId),
                catalogId: String(catalogId),
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
    const payload = {
      campaignId: campaignId,
      platforms: campaignDetails?.data?.reduce((acc: any, item: any) => {
        const platformName = item.platform.platformName.toUpperCase();

        // Define the templateJson based on the platform
        const templateJson =
          platformName === "GOOGLE"
            ? {
                cta: "Shop Now",
                name: brandDetails?.brand_name,
                message: headLine,
                description: discription,
                caption: caption,
                previewData: previewData,
                googlePreviewData: googlePreviewData,
                merchant_center_id: String(gmcId),
                ...(isInventry && { filterData: filters }),
              }
            : {
                cta: "Shop Now",
                name: brandDetails?.brand_name,
                message: headLine,
                description: discription,
                caption: caption,
                previewData: previewData,
                googlePreviewData: googlePreviewData,
                product_set_id: String(productSetId),
                buisnessId: String(buisnessId),
                catalogId: String(catalogId),
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

  const mutateGetProductData = useMutation({
    mutationKey: ["get-product-data"],
    mutationFn: getProductList,
  });

  const mutateGetProductSet = useMutation({
    mutationKey: ["get-product"],
    mutationFn: getProductSet,
  });

  const mutateGetCatalog = useMutation({
    mutationKey: ["get-catalog"],
    mutationFn: getProductCatalouge,
  });

  const mutateGetBuisnessId = useMutation({
    mutationKey: ["buisness-id"],
    mutationFn: getBuisnessId,
  });

  const mutateGetGmcId = useMutation({
    mutationKey: ["gmc-id"],
    mutationFn: getGmc,
  });
  const mutateGetGmcproduct = useMutation({
    mutationKey: ["gmc-id-product"],
    mutationFn: getGmcProduct,
  });

  const mutateGetGmcproductList = useMutation({
    mutationKey: ["gmc-id-product-list"],
    mutationFn: getGmcProductList,
  });

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

  const platforms = Array.from(
    new Set(
      campaignDetails?.data?.map(
        (campaignDetail: { platform: { platformName: string } }) =>
          campaignDetail.platform.platformName,
      ),
    ),
  );

  const getCatalog = (buiness: any) => {
    if (buiness) {
      setBuisnessId(Number(buiness));
      const data = {
        workspace_id: Number(localStorage.getItem("workspace_id")),
        brand_id: brandId,
        businessId: Number(buiness),
      };
      mutateGetCatalog.mutate(data, {
        onSuccess: (response: any) => {
          console.log(response);

          const transformedOptions = response.data.map((item: any) => ({
            value: item.id,
            label: item.name,
          }));

          setCatalogOption(transformedOptions);
        },
        onError: (res: any) => {
          console.log(res);
        },
      });
    }
  };

  const getGoogleProduct = (buiness: any, filterData?: any) => {
    if (buiness) {
      setGmcId(Number(buiness));
      const data = {
        workspace_id: Number(localStorage.getItem("workspace_id")),
        brand_id: brandId,
        merchant_center_id: String(buiness),
      };
      mutateGetGmcproduct.mutate(data, {
        onSuccess: (response: any) => {
          console.log(response);

          // setGoogleProductOptions(mappedArray)

          setGoogleFilteredData(response);
          if (filterData) {
            setGooglePreviewData(() => {
              const categoryFieldMap: Record<string, string> = {
                product_brand: "brand",
                product_item_id: "itemId",
                product_condition: "condition",
                product_type: "productType",
                customLabel0: "customLabel0",
                customLabel1: "customLabel1",
                customLabel2: "customLabel2",
                customLabel3: "customLabel3",
                customLabel4: "customLabel4",
                product_channel: "channel",
                product_channel_exclusivity: "channelExclusivity",
                shippingLabel: "shippingLabel",
              };

              return filterData.reduce(
                (filteredData: any, filter: any, i: any) => {
                  if (!filter.category || !filter.value) {
                    return filteredData; // Skip if category or value is not set
                  }

                  const mappedField = categoryFieldMap[filter.category];
                  if (!mappedField) {
                    console.error(
                      `Mapping for category ${filter.category} not found`,
                    );
                    return filteredData;
                  }

                  // Apply other active filters
                  return filteredData.filter(
                    (product: any) => product[mappedField] === filter.value,
                  );
                },
                response,
              ); // Start filtering from the original data
            });
          } else {
            setGooglePreviewData(response);
          }
        },
        onError: (res: any) => {
          console.log(res);
        },
      });
    }
  };

  const invertyCheck = () => {
    setFilters([{ category: "", value: "" }]);
    setGooglePreviewData(googleFilteredData);
    setIsInvenrtry(!isInventry);
  };

  const addFilter = () => {
    setFilters([...filters, { category: "", value: "" }]);
  };

  const getProductSetList = (catalog: any) => {
    if (catalog) {
      setCatalogId(Number(catalog));
      const data = {
        workspace_id: Number(localStorage.getItem("workspace_id")),
        brand_id: brandId,
        catalogId: Number(catalog),
      };
      mutateGetProductSet.mutate(data, {
        onSuccess: (response: any) => {
          console.log(response);

          const transformedOptions = response.data.map((item: any) => ({
            value: item.id,
            label: item.name,
          }));

          setProductOption(transformedOptions);
        },
        onError: (res: any) => {
          console.log(res);
        },
      });
    }
  };

  const getProductData = (product: any) => {
    if (product) {
      setProductSetId(Number(product));
      const data = {
        workspace_id: Number(localStorage.getItem("workspace_id")),
        brand_id: brandId,
        productSetId: Number(product),
      };
      mutateGetProductData.mutate(data, {
        onSuccess: (response: any) => {
          console.log(response);

          setPreviewData(response.data);
        },
        onError: (res: any) => {
          console.log(res);
        },
      });
    }
  };

  const getValueList = (category: any, index: any) => {
    // Define a mapping of category to data field
    const categoryFieldMap: Record<string, string> = {
      product_brand: "brand",
      product_item_id: "itemId",
      product_condition: "condition",
      product_type: "productType",
      customLabel0: "customLabel0",
      customLabel1: "customLabel1",
      customLabel2: "customLabel2",
      customLabel3: "customLabel3",
      customLabel4: "customLabel4",
      product_channel: "channel",
      product_channel_exclusivity: "channelExclusivity",
      shippingLabel: "shippingLabel",
    };

    // Check if the category is valid
    const dataField = categoryFieldMap[category];
    if (!dataField) {
      console.error(`Invalid category: ${category}`);
      return;
    }

    // Extract unique values for the given category
    const uniqueValues = Array.from(
      new Set(googleFilteredData.map((product: any) => product[dataField])),
    ).filter((value) => value !== undefined); // Filter out undefined values

    // Map the filtered values to options format
    const filteredValue = uniqueValues.map((value) => ({
      label: value,
      value: value,
    }));

    console.log(filteredValue);

    // Update the filters state

    setFilters((prevState) => {
      const newFilters = [...prevState];
      if (!newFilters[index]) {
        newFilters[index] = { category: "", value: "" }; // Initialize index if not present
      }
      newFilters[index].category = category;
      newFilters[index].value = ""; // Update category at the specific index
      return newFilters;
    });

    // Update the value options array
    setValueOptionsArray((prevState: any) => {
      const newState = [...prevState]; // Copy the previous state
      newState[index] = filteredValue; // Update the specific index
      return newState; // Return the updated state
    });

    setValueOptionsArray((prevState: any) => {
      const newState = [...prevState]; // Copy the previous state
      newState[index] = filteredValue; // Update the specific index
      return newState; // Return the updated state
    });

    // Reapply filters to update GooglePreviewData
  };

  const filterByValue = (value: any, index: any) => {
    const categoryFieldMap: Record<string, string> = {
      product_brand: "brand",
      product_item_id: "itemId",
      product_condition: "condition",
      product_type: "productType",
      customLabel0: "customLabel0",
      customLabel1: "customLabel1",
      customLabel2: "customLabel2",
      customLabel3: "customLabel3",
      customLabel4: "customLabel4",
      product_channel: "channel",
      product_channel_exclusivity: "channelExclusivity",
      shippingLabel: "shippingLabel",
    };

    const categoryByIndex = filters[index]?.category;

    if (!categoryByIndex || !categoryFieldMap[categoryByIndex]) {
      console.error(`Invalid category at index ${index}`);
      return;
    }

    // Update filters state
    setFilters((prevState) => {
      const newFilters = [...prevState];
      if (!newFilters[index]) {
        newFilters[index] = { category: "", value: "" }; // Initialize index if not present
      }
      newFilters[index].value = value; // Update value at the specific index
      return newFilters;
    });

    // Apply all filters to the data
    setGooglePreviewData(() => {
      return filters.reduce((filteredData, filter, i) => {
        if (!filter.category || !filter.value) {
          return filteredData; // Skip if category or value is not set
        }

        const mappedField = categoryFieldMap[filter.category];
        if (!mappedField) {
          console.error(`Mapping for category ${filter.category} not found`);
          return filteredData;
        }

        if (i === index) {
          // Apply the current dropdown's value as it's being updated
          return filteredData.filter(
            (product: any) => product[mappedField] === value,
          );
        } else {
          // Apply other active filters
          return filteredData.filter(
            (product: any) => product[mappedField] === filter.value,
          );
        }
      }, googleFilteredData); // Start filtering from the original data
    });
  };

  const deleteLastFilter = () => {
    const categoryFieldMap: Record<string, string> = {
      product_brand: "brand",
      product_item_id: "itemId",
      product_condition: "condition",
      product_type: "productType",
      customLabel0: "customLabel0",
      customLabel1: "customLabel1",
      customLabel2: "customLabel2",
      customLabel3: "customLabel3",
      customLabel4: "customLabel4",
      product_channel: "channel",
      product_channel_exclusivity: "channelExclusivity",
      shippingLabel: "shippingLabel",
    };
    setFilters((prevFilters) => {
      // Remove the last filter from the filters array
      const updatedFilters = prevFilters.slice(0, -1);

      // Reapply the filters to the original data
      const updatedPreviewData = updatedFilters.reduce(
        (filteredData, filter) => {
          if (filter.category && filter.value) {
            const mappedField = categoryFieldMap[filter.category];
            if (!mappedField) {
              console.error(
                `Mapping for category ${filter.category} not found`,
              );
              return filteredData;
            }
            return filteredData.filter(
              (product: any) => product[mappedField] === filter.value,
            );
          }
          return filteredData;
        },
        googleFilteredData,
      );

      // Update both the filters and the filtered preview data
      setGooglePreviewData(updatedPreviewData);
      return updatedFilters;
    });
  };

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
        // if (response?.headlines.length > 0) {
        //   setHeadlineInputs(
        //     response?.headlines?.map((headline: any) => headline.slice(0, 30)),
        //   );
        // } else {
        //   setHeadlineInputs(["", "", ""]);
        // }
        setHeadLine(response?.headlines[0]);
        if (showDiscription) {
          setDiscription(response?.descriptions[0]);
        }
        setCaption(response?.captions[0]);
      },
      onError: (res: any) => {
        console.log(res);
      },
    });
  };

  useEffect(() => {
    const name = localStorage.getItem("workspace_name");
    if (name) {
      setWorkspacename(name);
    }
  }, []);

  const activeTabName = mediaTab ?? platforms[0];

  return (
    <>
      {/* <div className="relative flex items-center justify-center h-full">
        <div className="absolute top-[-25px]">
          <Steper />
        </div>
      </div> */}
      <div className="w-full h-full">
        <div className=" h-[80vh]  overflow-hidden overflow-y-auto rounded-t-lg">
          {/* <div className="font-medium text-[16px] bg-[#000000] h-[50px] px-12 text-white flex items-center justify-between">
            <div>Add creative upload</div>
            <button
              className="flex gap-1 text-white hover:text-nyx-yellow"
              onClick={() =>
                router.push(`/apphome/${workspacename}/admanager/dashboard?view=graph`)
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
          </div> */}
        
          <div className=" flex gap-3">
            <div className="w-[38.5%] flex flex-col gap-7 overflow-hidden overflow-y-auto h-[600px] p-3">
              <div className="flex flex-col gap-5">
                <div className="bg-[#23145A] pb-3 rounded-t-lg">
                  <MultipletgTab
                  data={targetGroups}
                  activeTg={activeTgTab}
                  setActiveTg={setActiveTgTab}
                  />
                  {/* <MultipleAd
                  ads={ads} 
                  /> */}
                </div>
                <div>
                  <div className="text-white font-semibold text-base">
                    Select catalogue
                  </div>

                  {campaignFeatching ? (
                    <div className=" w-full h-[150px] rounded-3xl">
                      <SkeletonTheme highlightColor="rgba(108,91,130,0.5)">
                        <div>
                          <Skeleton
                            // animation="wave"
                            baseColor="rgba(255, 255, 255, 0.09)"
                            className="w-[300px] h-[150px] rounded-3xl"
                          />
                        </div>
                      </SkeletonTheme>
                    </div>
                  ) : (
                    <>
                      {(platforms.includes("Instagram") ||
                        platforms.includes("Facebook")) && (
                        <div className="mt-2 bg-[#332270]  rounded-lg">
                          <div className="flex flex-row gap-2 p-2 ml-3 items-center">
                            <div>
                              <svg
                                width="26"
                                height="25"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M26 12.531C26 5.614 20.176 0 13 0S0 5.614 0 12.531c0 6.065 4.472 11.116 10.4 12.281v-8.521H7.8v-3.76h2.6V9.398c0-2.418 2.041-4.385 4.55-4.385h3.25v3.759h-2.6c-.715 0-1.3.564-1.3 1.253v2.506h3.9v3.76h-3.9V25c6.565-.627 11.7-5.965 11.7-12.469Z"
                                  fill="#fff"
                                />
                              </svg>
                            </div>
                            <div className="text-white font-semibold text-sm ">
                              Facebook
                            </div>
                          </div>
                          <div className="flex flex-col gap-3 flex-wrap px-5 pb-5">
                            <div className="flex flex-col gap-1">
                              <div className="text-white font-semibold text-sm">
                                Business Id
                              </div>
                              <div className="w-full ">
                                <Select
                                  className={`w-full text-sm md:text-base ${
                                    !!campaignDetails?.data?.[0]
                                      ?.savedCampaignInfo
                                      ? "cursor-not-allowed opacity-50"
                                      : ""
                                  }`}
                                  placeholder="Select Catalogue"
                                  styles={admanagerConversion}
                                  options={buinessOption}
                                  isLoading={mutateGetBuisnessId.isPending}
                                  isDisabled={
                                    !!campaignDetails?.data?.[0]
                                      ?.savedCampaignInfo
                                  } // Disable if savedCampaignInfo is not null
                                  value={buinessOption.find(
                                    (option: any) =>
                                      option.value === String(buisnessId),
                                  )}
                                  onChange={(selectedOption: any) => {
                                    if (selectedOption) {
                                      getCatalog(selectedOption.value);
                                    }
                                  }}
                                  components={{
                                    IndicatorSeparator: () => null,
                                  }}
                                />
                              </div>
                            </div>
                            {buisnessId && (
                              <div className="flex flex-col gap-1">
                                <div className="text-white font-semibold text-sm">
                                  Catalogue
                                </div>
                                <div className="w-full ">
                                  <Select
                                    className={`w-full text-sm md:text-base ${
                                      !!campaignDetails?.data?.[0]
                                        ?.savedCampaignInfo
                                        ? "cursor-not-allowed opacity-50"
                                        : ""
                                    }`}
                                    placeholder="Select Catalogue"
                                    styles={CatalogStyle}
                                    isLoading={mutateGetCatalog.isPending}
                                    isDisabled={
                                      !!campaignDetails?.data?.[0]
                                        ?.savedCampaignInfo
                                    } // Disable if savedCampaignInfo is not null
                                    options={catalogOption}
                                    value={catalogOption.find(
                                      (option: any) =>
                                        option.value === String(catalogId),
                                    )}
                                    onChange={(selectedOption: any) => {
                                      if (selectedOption) {
                                        setPreviewData([]);
                                        setProductSetId("");
                                        getProductSetList(selectedOption.value);
                                      }
                                    }}
                                    components={{
                                      IndicatorSeparator: () => null,
                                    }}
                                  />
                                </div>
                              </div>
                            )}

                            {catalogId && (
                              <div className="flex flex-col gap-1">
                                <div className="text-white font-semibold text-sm">
                                  Product Set
                                </div>
                                <div className="w-full ">
                                  <Select
                                    className={`w-full text-sm md:text-base ${
                                      !!campaignDetails?.data?.[0]
                                        ?.savedCampaignInfo
                                        ? "cursor-not-allowed opacity-50"
                                        : ""
                                    }`}
                                    placeholder="Select Product Set"
                                    styles={admanagerConversion}
                                    isLoading={mutateGetProductSet.isPending}
                                    isDisabled={
                                      !!campaignDetails?.data?.[0]
                                        ?.savedCampaignInfo
                                    } // Disable if savedCampaignInfo is not null
                                    options={productOption}
                                    // value={productOption.find(
                                    //   (option: any) =>
                                    //     option.value === String(productSetId),
                                    // )}
                                    value={
                                      productSetId
                                        ? productOption.find(
                                            (option: any) =>
                                              option.value ===
                                              String(productSetId),
                                          )
                                        : null
                                    }
                                    onChange={(selectedOption: any) => {
                                      if (selectedOption) {
                                        getProductData(selectedOption.value);
                                      }
                                    }}
                                    components={{
                                      IndicatorSeparator: () => null,
                                    }}
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {platforms.includes("Google") && (
                        <div className="mt-2 bg-[#332270]  rounded-lg">
                          <div className="flex flex-row ml-3 p-2 items-center gap-2">
                            <div>
                              <svg
                                width="25"
                                height="22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M12.605.001a5.018 5.018 0 0 0-2.603.647c-.782.442-1.323 1.1-1.746 1.818l-.074-.043-7.5 12.225.033.02C.285 15.431 0 16.257 0 17.11c0 1.188.398 2.393 1.253 3.333C2.107 21.383 3.438 22 5 22c1.563 0 2.894-.617 3.748-1.557.242-.266.367-.588.537-.89l.034.019 3.182-5.184 3.17 5.167.004.007c1.376 2.32 4.45 3.126 6.828 1.784 2.38-1.343 3.205-4.355 1.831-6.681l-.007-.01L16.834 2.44l-.005-.007C15.927.91 14.293.041 12.605.002Zm.075 2.438a2.485 2.485 0 0 1 1.988 1.223l.005.01.005.007 7.491 12.208c.698 1.182.293 2.659-.916 3.34a2.513 2.513 0 0 1-3.416-.895l-.005-.01-7.496-12.215c-.698-1.182-.294-2.657.916-3.34a2.55 2.55 0 0 1 1.428-.328ZM8.141 7.241c.016.028.013.06.03.089l.007.01 2.866 4.672-1.694 2.763c-.182-.343-.33-.7-.601-.998-.84-.924-2.145-1.522-3.673-1.543l3.065-4.993Zm-3.14 7.424c.937 0 1.482.3 1.878.735.396.436.622 1.065.622 1.71s-.226 1.274-.622 1.71c-.396.435-.94.735-1.878.735s-1.482-.3-1.878-.735c-.396-.436-.623-1.065-.623-1.71 0-.628.23-1.23.606-1.664l.032-.05c.395-.43.932-.731 1.863-.731Z"
                                  fill="#fff"
                                />
                              </svg>
                            </div>
                            <div className="text-white font-semibold text-sm ">
                              Google
                            </div>
                          </div>
                          <div className="flex flex-col gap-3 flex-wrap px-5 pb-5">
                            <div className="flex flex-col gap-1">
                              <div className="text-white font-semibold text-sm">
                                GMC Account
                              </div>
                              <div className="w-full ">
                                <Select
                                  className="w-full text-sm md:text-base"
                                  placeholder="Select Catalogue"
                                  styles={admanagerConversion}
                                  options={gmcOption}
                                  isLoading={mutateGetBuisnessId.isPending}
                                  value={gmcOption.find(
                                    (option: any) =>
                                      option.value === String(gmcId),
                                  )}
                                  onChange={(selectedOption: any) => {
                                    if (selectedOption) {
                                      getGoogleProduct(selectedOption.value);
                                      setFilters([{ category: "", value: "" }]);
                                      setIsInvenrtry(false);
                                    }
                                  }}
                                  components={{
                                    IndicatorSeparator: () => null,
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {platforms.includes("Google") && gmcId && (
                        <>
                          <div className=" flex flex-row gap-4 items-center mt-4">
                            <div className="  font-semibold text-base text-white">
                              Inventory Filter
                            </div>
                            <div className="flex items-center">
                              <Switch
                                onChange={invertyCheck}
                                checked={isInventry}
                                checkedIcon={false}
                                onColor="#53D73D" // Color when checked
                                offColor="#503193"
                                handleDiameter={20}
                                uncheckedIcon={false}
                              />
                            </div>
                          </div>
                          {isInventry && (
                            <div className="mt-2 bg-[#332270]  rounded-lg">
                              {filters.map((item, index) => (
                                <React.Fragment
                                  key={`${item.category || "category"}-${item.value || "value"}-${index}`}
                                >
                                  <div
                                    className={`grid grid-cols-2 gap-5 ${index == 0 ? "pt-5" : "pt-2"} px-5 pb-2`}
                                  >
                                    <div className="w-full">
                                      {/* Heading for Category */}
                                      {index == 0 && (
                                        <label
                                          className="block text-sm font-semibold text-white mb-1"
                                          htmlFor={`category-${index}`}
                                        >
                                          Category
                                        </label>
                                      )}
                                      <Select
                                        id={`category-${index}`}
                                        className="w-full text-sm md:text-base"
                                        placeholder="Category"
                                        styles={admanagerConversion}
                                        options={category}
                                        isLoading={
                                          mutateGetBuisnessId.isPending
                                        }
                                        value={
                                          category.find(
                                            (option) =>
                                              option.value ===
                                              filters[index]?.category,
                                          ) || null
                                        }
                                        onChange={(selectedOption: any) => {
                                          if (selectedOption) {
                                            getValueList(
                                              selectedOption.value,
                                              index,
                                            );
                                          }
                                        }}
                                        components={{
                                          IndicatorSeparator: () => null,
                                        }}
                                      />
                                    </div>
                                    <div className="w-full">
                                      {/* Heading for Value */}
                                      {index == 0 && (
                                        <label
                                          className="block text-sm font-semibold text-white mb-1"
                                          htmlFor={`value-${index}`}
                                        >
                                          Value
                                        </label>
                                      )}
                                      <Select
                                        id={`value-${index}`}
                                        className="w-full text-sm md:text-base"
                                        placeholder="Value"
                                        styles={admanagerConversion}
                                        options={valueOptionArray[index]}
                                        isLoading={
                                          mutateGetBuisnessId.isPending
                                        }
                                        value={
                                          filters[index]?.value
                                            ? {
                                                value: filters[index].value,
                                                label: filters[index].value,
                                              }
                                            : null
                                        }
                                        onChange={(selectedOption: any) => {
                                          if (selectedOption) {
                                            filterByValue(
                                              selectedOption.value,
                                              index,
                                            );
                                          }
                                        }}
                                        components={{
                                          IndicatorSeparator: () => null,
                                        }}
                                      />
                                    </div>
                                  </div>

                                  {/* Add "AND" between rows */}
                                  {index < filters.length - 1 && (
                                    <div className=" font-semibold text-white text-sm ml-6">
                                      AND
                                    </div>
                                  )}
                                </React.Fragment>
                              ))}

                              <button
                                onClick={addFilter}
                                className=" cursor-pointer text-xs ml-5 text-nyx-yellow underline pb-2"
                              >
                                + Add Condition
                              </button>
                              {filters.length >= 2 && (
                                <button
                                  onClick={deleteLastFilter}
                                  className=" cursor-pointer ml-5 text-nyx-yellow "
                                >
                                  <svg
                                    width="12"
                                    height="16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M11.83 1.333H8.915L8.081.5H3.914l-.833.833H.164V3h11.667M.997 13.833A1.666 1.666 0 0 0 2.664 15.5h6.667a1.666 1.666 0 0 0 1.666-1.667v-10h-10v10Z"
                                      fill="#fff"
                                    />
                                  </svg>
                                </button>
                              )}
                            </div>
                          )}
                        </>
                      )}
                    </>
                  )}
                </div>
                <div>
                  <div className="flex flex-row justify-between">
                    <div className=" text-[14px] leading-[17px] xl:text-[16px] xl:leading-[20px] font-bold text-white ">
                      Headline and Description
                    </div>

                    <div className="">
                      <button
                        className={`w-[171px] xl:w-[210px] h-[42px] rounded-[8px] py-[7px] px-[10px] xl:px-[16px] flex gap-2 items-center justify-center cursor-pointer ${mutateAiHeadlineSuggestion.isPending ? "bg-[#5E32FF]" : "bg-[#28134B] hover:bg-[#5E32FF]"}`}
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
                      <p className="text-[10px] font-normal text-white leading-[12px] mt-[6px]">
                        for optimized results
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 mt-4  p-5 rounded-lg">
                    {/* headline */}
                    <div className="w-full flex flex-col gap-2">
                      <div className="w-full flex gap-2">
                        <p className="text-white text-sm font-[600]">
                          Headline
                          {/* <span className="ml-1 text-nyx-red">*</span> */}
                        </p>
                        {/* <div className="text-white flex items-center group relative">
                          <BsFillInfoCircleFill className="cursor-pointer" />
                          <div className="absolute top-[-35px] left-[20px] bg-[#0d0718] text-white p-4 w-[300px] rounded-2xl z-10 hidden group-hover:block transition-opacity duration-300">
                            Be compelling. Motivate actions in 5 words or less,
                            for google you need atleast 3 headlines.
                          </div>
                        </div> */}
                      </div>

                      <div className="w-full">
                        <input
                          key={`headline`}
                          type="text"
                          value={headLine}
                          onChange={(e) => setHeadLine(e.target.value)}
                          className={classNames(
                            "w-full bg-transparent border border-[#FFFFFF99] rounded-md p-2 text-white text-sm placeholder:italic",
                          )}
                        />
                      </div>
                    </div>
                    {/* {!showDiscription && (
                      <button
                        onClick={() => showDiscriptionFn(true)}
                        className="text-white hover:text-nyx-yellow w-max text-lg font-[500] flex justify-center items-center"
                      >
                        +{" "}
                        <span className="underline text-xs font-[400] px-1">
                          Add Description
                        </span>
                      </button>
                    )} */}

                    {/* Discription */}
                    {showDiscription && (
                      <div className="w-full flex flex-col gap-2">
                        <div className="flex flex-row justify-between items-center">
                          <div className="w-full flex gap-2">
                            <p className="text-white text-sm font-[600]">
                              Description
                              {/* <span className="ml-1 text-nyx-red">*</span> */}
                            </p>
                            {/* <div className="text-white flex items-center group relative">
                              <BsFillInfoCircleFill className="cursor-pointer" />
                              <div className="absolute top-[35px] left-[-60px] bg-[#0d0718] text-white p-4 w-[300px] rounded-2xl z-10 hidden group-hover:block transition-opacity duration-300">
                                Be compelling. Motivate actions in 5 words or
                                less, for google you need atleast 3 headlines.
                              </div>
                            </div> */}
                          </div>
                          {/* <div
                            onClick={() => setShowDiscription(false)}
                            className=" cursor-pointer"
                          >
                            <svg
                              width="24"
                              height="25"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M7 21.5c-.55 0-1.02-.196-1.412-.587A1.93 1.93 0 0 1 5 19.5v-13H4v-2h5v-1h6v1h5v2h-1v13c0 .55-.196 1.021-.587 1.413A1.92 1.92 0 0 1 17 21.5H7Zm10-15H7v13h10v-13Zm-8 11h2v-9H9v9Zm4 0h2v-9h-2v9Z"
                                fill="#fff"
                              />
                            </svg>
                          </div> */}
                        </div>

                        <div className="w-full">
                          <textarea
                            key={`headline`}
                            value={discription}
                            onChange={(e) => setDiscription(e.target.value)}
                            rows={4} // Adjust the number of rows to control the height
                            className={classNames(
                              "w-full bg-transparent border border-[#FFFFFF99] rounded-md p-2 text-white text-sm placeholder:italic resize-none",
                            )}
                          />
                        </div>
                      </div>
                    )}

                    {/* caption */}
                    <div className="w-full flex flex-col gap-2">
                      <div className="w-full flex gap-2">
                        <p className="text-white text-sm font-[600]">
                          Captions
                          {/* <span className="ml-1 text-nyx-red">*</span> */}
                        </p>
                        {/* <div className="text-white flex items-center group relative">
                          <BsFillInfoCircleFill className="cursor-pointer" />
                          <div className="absolute top-[35px] left-[-60px] bg-[#0d0718] text-white p-4 w-[300px] rounded-2xl z-10 hidden group-hover:block transition-opacity duration-300">
                            There will be the description or caption of your
                            post, which people will see after your ad.
                          </div>
                        </div> */}
                      </div>

                      <div className="w-full">
                        <input
                          key={`caption`}
                          type="text"
                          value={caption}
                          onChange={(e) => setCaption(e.target.value)}
                          className={classNames(
                            "w-full bg-transparent border rounded-md p-2 border-[#FFFFFF99] text-white text-sm placeholder:italic",
                          )}
                          maxLength={30}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div>
                  <div className="text-white font-semibold text-lg">
                    Destinantion
                  </div>
                  <div className="flex flex-col gap-4 mt-2 bg-[#3A216D] p-5 rounded-lg">
                    <div className="w-full flex flex-col gap-2">
                      <div className="w-full flex gap-2">
                        <p className="text-white text-base font-[600]">
                          Display Link
                        </p>
                      </div>

                      <div className="w-full">
                        <input
                          key={`display-link`}
                          type="text"
                          // value={headlineInputs[index]}
                          placeholder="Enter the link you want to show your ad."
                          className={classNames(
                            "w-full bg-transparent border border-[#8297BD] rounded-md p-2 text-white text-sm placeholder:italic",
                          )}
                          // onChange={handleInputHeadlineChange(index)}
                        />
                      </div>
                    </div>
                    <div className="w-full flex flex-col gap-2">
                      <div className="w-full flex gap-2">
                        <p className="text-white text-base font-[600]">
                          Additional Link
                        </p>
                      </div>

                      <div className="w-full">
                        <input
                          key={`additional-link`}
                          type="text"
                          // value={captionInputs[index]}
                          placeholder="Enter the link you want to show your ad."
                          className={classNames(
                            "w-full bg-transparent border rounded-md p-2 border-[#8297BD] text-white text-sm placeholder:italic",
                          )}
                          // onChange={handleInputCaptionChange(index)}
                        />
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>

            <div className="w-[65%]  bg-[#23145A] h-[600px] relative rounded-t-xl">
              {campaignFeatching || mutateGetProductData.isPending ? (
                <div className="w-full h-[400px] flex justify-center items-center">
                  <Loading />
                </div>
              ) : (
                <div className="w-full h-full flex flex-col ">
                  <div className="w-[100%] bg-[#332270] rounded-t-xl">
                    <AdManagerTabs
                      data={platforms as string[]}
                      activeTabName={activeTabName}
                      onTabChange={setMediaTab}
                    />
                  </div>
                  <div className="w-full">
                    {activeTabName === "Facebook" && (
                      <div className="overflow-hidden overflow-y-auto max-h-[500px] pb-6 flex items-baseline justify-center flex-wrap gap-[40px]">
                        {previewData.length != 0 ? (
                          <>
                            {previewData.length > 3 && (
                              <FbFeedOne
                                headlines={headLine}
                                descriptions={discription}
                                captions={caption}
                                fbPostChecked={fbPostChecked}
                                setFbPostChecked={setFbPostChecked}
                                campaingSiteUrl={campaingSiteUrl}
                                campainObjective={campainObjective}
                                brandName={brandDetails?.brand_name}
                                mixedArray={mixedArray}
                                brandLogos={brandLogos}
                                previewData={previewData}
                              />
                            )}

                            <FbShoppingCrousel
                              headlines={headLine}
                              descriptions={discription}
                              captions={caption}
                              fbPostChecked={fbPostChecked}
                              setFbPostChecked={setFbPostChecked}
                              campaingSiteUrl={campaingSiteUrl}
                              campainObjective={campainObjective}
                              brandName={brandDetails?.brand_name}
                              mixedArray={mixedArray}
                              brandLogos={brandLogos}
                              previewData={previewData}
                            />

                            <FbShoppingSingle
                              headlines={headLine}
                              descriptions={discription}
                              captions={caption}
                              fbPostChecked={fbPostChecked}
                              setFbPostChecked={setFbPostChecked}
                              campaingSiteUrl={campaingSiteUrl}
                              campainObjective={campainObjective}
                              brandName={brandDetails?.brand_name}
                              mixedArray={mixedArray}
                              brandLogos={brandLogos}
                              previewData={previewData}
                            />
                          </>
                        ) : (
                          <div className="w-full h-[300px] text-white p-5 font-semibold text-lg">
                            Please select the media before proceeding.
                          </div>
                        )}
                      </div>
                    )}

                    {activeTabName === "Instagram" && (
                      <div className="overflow-hidden overflow-y-auto max-h-[500px] pb-6 flex items-baseline justify-center flex-wrap gap-[40px]">
                        {previewData.length != 0 ? (
                          <>
                            <InstaShoppingFeed
                              headlines={headLine}
                              descriptions={discription}
                              captions={caption}
                              mixedArray={mixedArray}
                              instaPostChecked={instaPostChecked}
                              setInstaPostChecked={setInstaPostChecked}
                              campainObjective={campainObjective}
                              brandName={brandDetails?.brand_name}
                              brandLogos={brandLogos}
                              previewData={previewData}
                            />

                            <InstaShoppingStory
                              headlines={headLine}
                              descriptions={discription}
                              captions={caption}
                              mixedArray={mixedArray}
                              instaStoryChecked={instaStoryChecked}
                              driveClickedArray={driveClickedArray}
                              driveVideoClickedArray={driveVideoClickedArray}
                              setInstaStoryChecked={setInstaStoryChecked}
                              campainObjective={campainObjective}
                              brandName={brandDetails?.brand_name}
                              brandLogos={brandLogos}
                              previewData={previewData}
                            />

                            <InstaShoppingReel
                              headlines={headLine}
                              descriptions={discription}
                              captions={caption}
                              instareelsChecked={instareelsChecked}
                              previewUrl={previewUrl}
                              driveVideoClickedArray={driveVideoClickedArray}
                              setInstareelsChecked={setInstareelsChecked}
                              campainObjective={campainObjective}
                              brandName={brandDetails?.brand_name}
                              brandLogos={brandLogos}
                              previewData={previewData}
                            />
                          </>
                        ) : (
                          <div className="w-full h-[300px] text-white p-5 font-semibold text-lg">
                            Please select the media before proceeding.
                          </div>
                        )}
                      </div>
                    )}

                    {activeTabName === "Google" && (
                      <div className="overflow-hidden overflow-y-auto max-h-[500px] pb-6 flex items-baseline justify-center flex-wrap gap-[40px]">
                        {googlePreviewData.length != 0 ? (
                          <>
                            <GoogleShoppingLight
                              headlines={headLine}
                              descriptions={discription}
                              captions={caption}
                              fbPostChecked={fbPostChecked}
                              setFbPostChecked={setFbPostChecked}
                              campaingSiteUrl={campaingSiteUrl}
                              campainObjective={campainObjective}
                              brandName={brandDetails?.brand_name}
                              mixedArray={mixedArray}
                              brandLogos={brandLogos}
                              googlePreviewData={googlePreviewData}
                            />

                            <GoogleShoppingDark
                              headlines={headLine}
                              descriptions={discription}
                              captions={caption}
                              fbPostChecked={fbPostChecked}
                              setFbPostChecked={setFbPostChecked}
                              campaingSiteUrl={campaingSiteUrl}
                              campainObjective={campainObjective}
                              brandName={brandDetails?.brand_name}
                              mixedArray={mixedArray}
                              brandLogos={brandLogos}
                              googlePreviewData={googlePreviewData}
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
              // Disable button styles
              mutateUpdateCampaign.isPending ||
                (platforms.includes("Google") &&
                  platforms.some((p: any) =>
                    ["Instagram", "Facebook"].includes(p),
                  ) &&
                  (!gmcId || !buisnessId || !catalogId || !productSetId)) || // Google + (Instagram/Facebook)
                (platforms.includes("Google") &&
                  !platforms.some((p: any) =>
                    ["Instagram", "Facebook"].includes(p),
                  ) &&
                  !gmcId) || // Only Google
                (platforms.some((p: any) =>
                  ["Instagram", "Facebook"].includes(p),
                ) &&
                  !platforms.includes("Google") &&
                  (!buisnessId || !catalogId || !productSetId)) || // Only Instagram/Facebook
                caption === "" ||
                discription === "" ||
                headLine === "" ||
                mutateUpdateSaveCampaign.isPending ||
                (platforms.includes("Google") &&
                  isInventry &&
                  !isFiltersValid())
                ? "bg-gray-400 cursor-not-allowed border border-gray-400 hover:bg-gray-400 hover:shadow-none"
                : "bg-nyx-yellow hover:shadow-none",
            )}
            disabled={
              mutateUpdateCampaign.isPending ||
              (platforms.includes("Google") &&
                platforms.some((p: any) =>
                  ["Instagram", "Facebook"].includes(p),
                ) &&
                (!gmcId || !buisnessId || !catalogId || !productSetId)) || // Google + (Instagram/Facebook)
              (platforms.includes("Google") &&
                !platforms.some((p: any) =>
                  ["Instagram", "Facebook"].includes(p),
                ) &&
                !gmcId) || // Only Google
              (platforms.some((p: any) =>
                ["Instagram", "Facebook"].includes(p),
              ) &&
                !platforms.includes("Google") &&
                (!buisnessId || !catalogId || !productSetId)) || // Only Instagram/Facebook
              caption === "" ||
              discription === "" ||
              headLine === "" ||
              mutateUpdateSaveCampaign.isPending ||
              (platforms.includes("Google") && isInventry && !isFiltersValid())
            }
            onClick={apiCall}
          >
            {mutateUpdateCampaign.isPending ? <ButtonLoadingGenAI /> : "Next"}
          </Button>

          {search.has("edit") && search.get("edit") == "true" && (
            <Button
              className={classNames(
                "rounded-full w-44 font-semibold text-black",
                mutateUpdateCampaign.isPending ||
                  (platforms.includes("Google") &&
                    platforms.some((p: any) =>
                      ["Instagram", "Facebook"].includes(p),
                    ) &&
                    (!gmcId || !buisnessId || !catalogId || !productSetId)) || // Google + (Instagram/Facebook)
                  (platforms.includes("Google") &&
                    !platforms.some((p: any) =>
                      ["Instagram", "Facebook"].includes(p),
                    ) &&
                    !gmcId) || // Only Google
                  (platforms.some((p: any) =>
                    ["Instagram", "Facebook"].includes(p),
                  ) &&
                    !platforms.includes("Google") &&
                    (!buisnessId || !catalogId || !productSetId)) || // Only Instagram/Facebook
                  caption === "" ||
                  discription === "" ||
                  headLine === "" ||
                  mutateUpdateSaveCampaign.isPending ||
                  (platforms.includes("Google") &&
                    isInventry &&
                    !isFiltersValid())
                  ? "bg-gray-400 cursor-not-allowed border border-gray-400 hover:bg-gray-400 hover:shadow-none"
                  : "bg-nyx-yellow hover:shadow-none",
              )}
              disabled={
                mutateUpdateCampaign.isPending ||
                (platforms.includes("Google") &&
                  platforms.some((p: any) =>
                    ["Instagram", "Facebook"].includes(p),
                  ) &&
                  (!gmcId || !buisnessId || !catalogId || !productSetId)) || // Google + (Instagram/Facebook)
                (platforms.includes("Google") &&
                  !platforms.some((p: any) =>
                    ["Instagram", "Facebook"].includes(p),
                  ) &&
                  !gmcId) || // Only Google
                (platforms.some((p: any) =>
                  ["Instagram", "Facebook"].includes(p),
                ) &&
                  !platforms.includes("Google") &&
                  (!buisnessId || !catalogId || !productSetId)) || // Only Instagram/Facebook
                caption === "" ||
                discription === "" ||
                headLine === "" ||
                mutateUpdateSaveCampaign.isPending ||
                (platforms.includes("Google") &&
                  isInventry &&
                  !isFiltersValid())
              }
              onClick={apiCall2}
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
    </>
  );
};

export default Shopping;
