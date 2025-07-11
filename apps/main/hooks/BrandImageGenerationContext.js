"use client";
import { createContext, useContext, useState } from "react";
import { nanoid } from "nanoid";
import colors from "color-name";
import { MessagePopupContext } from "./MessagePopupContext";
import { useMutation } from "@tanstack/react-query";
import { addCampaignService } from "@nyx-frontend/main/services/brandService";
import { BRAND_TABS, IMAGESTYLEDATA } from "@nyx-frontend/main/utils/productConstants";
import {
  useImageActive,
  useImageUrls,
  useImageTabActive,
} from "@nyx-frontend/main/app/apphome/[workspace]/image-craft-ai/text-to-image/_store/store";

const BrandImageGenerationContext = createContext();

const BrandImageGenerationContextProvider = (props) => {
  const [selectbackgroundColor, setSelectBackgroundColor] = useState([]);
  const [selectedColors, setSelectedColors] = useState(new Set());
  const [selectedColorButton, setSelectedColorButton] = useState([]);
  const { displayMessagePopup } = useContext(MessagePopupContext);
  const [focusElement, setFocusElement] = useState("People");
  const [contextImage, setContextImage] = useState("Indian");
  const [imageStyle, setImageStyle] = useState(IMAGESTYLEDATA[0].key);
  const [cameraPerspectiveValue, setcameraPerspectiveValue] = useState("");
  const [shutterValue, setShutterValue] = useState("");
  const [lightValue, setLightValue] = useState("");
  const [cameraFilterValue, setCameraFilterValue] = useState("");
  const [tab, setBrandTab] = useState(BRAND_TABS.BRANDING);
  const [isCreativeSubmitDone, setIsCreativeSubmitDone] = useState(false);
  const [mediaResponse, setMediaResponse] = useState();
  const [dataFromCreative, setDataFromCreative] = useState([]);
  const [campaignName, setCampaignName] = useState("");
  const [isGenerateButtonDisabled, setIsGenerateButtonDisabled] =
    useState(false);
  const [creativePending, setCreativePending] = useState(false);

  /**
   * Functions
   */

  function hexToColorName(hex) {
    // Remove any leading # from the hex code
    hex = hex.replace("#", "");

    // Split the hex code into red, green, and blue components
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    // Find the nearest color name for the given RGB components
    let nearestColor = "";
    let shortestDistance = Infinity;
    for (const name in colors) {
      const color = colors[name];
      const distance = Math.sqrt(
        (r - color[0]) ** 2 + (g - color[1]) ** 2 + (b - color[2]) ** 2,
      );
      if (distance < shortestDistance) {
        shortestDistance = distance;
        nearestColor = name;
      }
    }

    return nearestColor;
  }

  const onChangeBackgroundColor = (value) => {
    setSelectBackgroundColor([...selectbackgroundColor, value]);
  };

  const deleteColor = (color) => {
    const updatedColors = selectbackgroundColor.filter((bg) => bg !== color);

    setSelectBackgroundColor(updatedColors);
  };

  const selectedColorButtonClick = (data) => {
    let hColor = hexToColorName(data);
    let colors = new Set([...selectedColorButton, hColor]);

    if (colors.size > 3) {
      // Use the global error popup to display error
      displayMessagePopup(
        "selected-color-limit-exceeded",
        "error",
        "Error",
        "You can only select maximum upto 3 colors.",
      );
    } else {
      if (selectedColors.has(data)) {
        selectedColors.delete(data);
        setSelectedColorButton((prevColors) =>
          prevColors.filter((color) => color !== hColor),
        );
      } else {
        selectedColors.add(data);
        setSelectedColorButton((prevColors) => [...prevColors, hColor]);
      }
      setSelectedColors(new Set(selectedColors));
    }
  };

  const setImageTabActive = useImageTabActive(
    (state) => state.setImageTabActive,
  );

  const responseFromCtreativeType = (data) => {
    setDataFromCreative(data);
    // setImageTabActive(data?.campaign?.target_group_ids[0]);
    // console.log(data?.campaign?.target_group_ids[0]);
    setCampaignName(data?.campaign?.name);
  };

  const creativeSubmitButtonClick = () => {
    return new Promise((resolve, reject) => {
      if (!mediaResponse) {
        reject("media_response_not_found");
      } else {
        const payload = {
          name: mediaResponse?.campaign?.name,
          brand_id: mediaResponse?.campaign?.brand_id,
          objective: mediaResponse?.campaign?.objective,
          product_ids: mediaResponse?.campaign?.product_ids,
          target_group_ids: mediaResponse?.campaign?.target_group_ids,
          ad_platform: mediaResponse?.campaign?.ad_platform,
          creative_type: mediaResponse?.campaign?.creative_type,
          workspace_id: parseInt(
            localStorage.getItem("workspace_id") || "1",
            10,
          ),
          essential: {
            color_composition: selectedColorButton?.join(", "),
            focus_elements: focusElement,
            context_of_image: contextImage,
            image_style: imageStyle,
          },
          advanced: {
            camera_perspective: cameraPerspectiveValue,
            camera_filters: cameraFilterValue,
            shutter_speed: shutterValue,
            lighting_option: lightValue,
          },
        };

        if (!isCreativeSubmitDone) {
          setCreativePending(true);
          mutateAddCreative.mutate(payload, {
            onSuccess: (response) => {
              responseFromCtreativeType(response);
              setIsCreativeSubmitDone(true);
              // setBrandTab("");
              setBrandTab(BRAND_TABS.PROMPT);
              resolve(response);
              setCreativePending(false);
            },
            onError: (errorResponse) => {
              reject(errorResponse);
              setCreativePending(false);
            },
          });
        } else {
          // setBrandTab("");
          setBrandTab(BRAND_TABS.PROMPT);
          resolve(dataFromCreative);
        }
      }
    });
  };

  const mutateAddCreative = useMutation({
    mutationKey: ["add-creative"],
    mutationFn: addCampaignService,
  });

  /**
   * Provider values
   */
  const ContextValues = {
    selectbackgroundColor,
    setSelectBackgroundColor,
    selectedColors,
    setSelectedColors,
    focusElement,
    setFocusElement,
    contextImage,
    setContextImage,
    imageStyle,
    setImageStyle,
    cameraPerspectiveValue,
    setcameraPerspectiveValue,
    shutterValue,
    setShutterValue,
    lightValue,
    setLightValue,
    cameraFilterValue,
    setCameraFilterValue,
    tab,
    setBrandTab,
    isCreativeSubmitDone,
    setIsCreativeSubmitDone,
    mediaResponse,
    setMediaResponse,
    dataFromCreative,
    setDataFromCreative,
    campaignName,
    setCampaignName,
    isGenerateButtonDisabled,
    setIsGenerateButtonDisabled,
    creativePending,
    setCreativePending,
    onChangeBackgroundColor,
    deleteColor,
    selectedColorButtonClick,
    creativeSubmitButtonClick,
    setImageTabActive,
  };

  return (
    <BrandImageGenerationContext.Provider value={ContextValues}>
      {props.children}
    </BrandImageGenerationContext.Provider>
  );
};

export { BrandImageGenerationContextProvider, BrandImageGenerationContext };
