/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect, useRef, Fragment } from "react";
import ImageBackdrop from "./ImageBackdrop";
import ProductName from "./ProductName";
import ProductImage from "./ProductImage";
import Sidebar from "@nyx-frontend/main/components/Sidebar";
import TopBar from "@nyx-frontend/main/components/TopBar";
import Steper from "./Steper";
import { useRouter, usePathname } from "next/navigation";
import Imageloader from "./Imageloader";
import Imageslider from "./ImageSlider";
import clsx from "clsx";
import { BRAND_TABS_Two } from "@nyx-frontend/main/utils/productConstants";
import Modal from "react-modal";
import { savePopupStyle, changeLocationPopupStyle } from "@nyx-frontend/main/utils/modalstyles";
import Button from "@nyx-frontend/main/components/Button";
import { useShallow } from "zustand/react/shallow";
import { useQuery, useMutation } from "@tanstack/react-query";
import "@nyx-frontend/main/app/_components/toastifyTest/toastify.css";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import classNames from "@nyx-frontend/main/utils/classNames";
import {
  ConvertB64ToBlob,
  ConvertB64ToImageURL,
  ConvertBlobToImageURL,
} from "./utility";
import { image2imageBaseURL } from "@nyx-frontend/main/services/image2imageService";
import AnimateText from "./_components/AnimateText";

import {
  getbrandServiceonbording,
  addCampaignService,
  getpromtandimageService,
  imageLikeDisLikeService,
  getFolderService,
  changeImageFolderServiceImageToImage,
  createFolderService,
} from "@nyx-frontend/main/services/brandService";
import "../../../../../css/toolResponsive.css";
import LandscapePopup from "../../../LandscapePopUp";
import { paymentWarningStyle } from "@nyx-frontend/main/utils/modalstyles";
import {
  getAvailableCredit,
  getWorkspaceDetailsById,
} from "@nyx-frontend/main/services/workSpace";
import {
  useImageActive,
  useImageUrls,
  useImageTabActive,
} from "./_store/store";
import BgRemoveLoading from "./BgRemoveLoading";
import ButtonLoading from "@nyx-frontend/main/components/ButtonLoading";
import Profileicon from "@nyx-frontend/main/components/Profileicon";

type productDataType = {
  id?: number;
  product_name?: string;
  workspace_id?: number;
};

type generationType = "auto" | "ref_img" | "prompt";

type GenerateParamType = {
  generation_type: generationType;
  prompt?: string;
  ref_img?: File;
  order?: number;
  version?: number;
  regenerate?: boolean;
  imageData?: FormData;
};

const Page = () => {
  // const imageTabActive = useImageTabActive((state) => state.imageTabActive);
  // const setImageTabActive = useImageTabActive(
  //   (state) => state.setImageTabActive,
  // );
  const activeImageUrlIndex = useImageActive((state) => state.imageActive);
  const setActiveImageUrlIndex = useImageActive(
    (state) => state.setImageActive,
  );
  const [tab, setBrandTab] = useState<string>(BRAND_TABS_Two.PRODUCTNAME); // Product Name tab should be open by default.
  const [creditFailed, setCreditFailed] = useState(false);
  const [showerror, setshowError] = useState<boolean>(false);
  // States that we actually need.
  const [productData, setProductData] = useState<productDataType | null>(null);
  const [productImageFile, setProductImageFile] = useState<File | null>(null);
  const [productImageBGRemovedFile, setProductImageBGRemovedFile] =
    useState<File | null>();
  const [generateId, setGenerateId] = useState<number>();
  const [genType, setGenType] = useState<generationType>();
  const [userPrompt, setUserPrompt] = useState<string>("");
  const [referenceImageFile, setReferenceImageFile] = useState<File | null>(
    null,
  );
  const [productImageOffset, setProductImageOffset] = useState([0, 0]);
  const [imageVersion, setImageVersion] = useState<number>(0);
  const [firstGeneration, setFirstGeneration] = useState<boolean>(true);
  const [savePopup, setSavePopup] = useState<boolean>(false);
  const [changeLocationPopup, setChangeLocationPopup] =
    useState<boolean>(false);
  const [folderChanged, setFolderChanged] = useState<boolean>(false);
  const draggableImage = useRef<HTMLImageElement | null>(null);
  const imageParentDiv = useRef<HTMLDivElement | null>(null);
  const imageCanvasDiv = useRef<HTMLDivElement | null>(null);

  const [folderClicked, setfolderClicked] = useState(false);
  const [folderClickedIndex, setfolderClickedIndex] = useState(null);
  const [folderID, setFolderID] = useState(null);
  const [productNameErr, setProductNameErr] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [productImageUrl, setProductImageUrl] = useState<any>("");
  const [imageCanvasSize, setImageCanvasSize] = useState<number[]>([0, 0]);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [productImageCanvasRatio, setProductImageCanvasRatio] = useState<
    number[]
  >([0, 0]);
  const imageRef = useRef<any>(null);
  const [generateImageUrl, setGenerateImageUrl] = useState<any>("");
  const [productImageLoading, setProductImageLoading] = useState<number>(-1); // -1 before loading, 0 loading, 1 loaded.
  const [generateImageLoading, setGenerateImageLoading] = useState<number>(-1); // -1 before loading, 0 loading, 1 loaded.
  const [uploadedFile, setUploadedFile] = useState<any>();
  const [textareaValue, setTextareaValue] = useState("");
  const [Generationtype, setGenerationtype] = useState("");
  const [
    imageUrl,
    setImageUrl,
    setDisLike,
    setLike,
    setSaved,
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
      state.setDownload,
      state.setLoading,
      state.setError,
    ]),
  );
  const imageTabActive = useImageTabActive((state) => state.imageTabActive);
  const setImageTabActive = useImageTabActive(
    (state) => state.setImageTabActive,
  );

  const router = useRouter();
  //@ts-ignore
  // useEffect((event:any) => {
  //   const handleBeforeUnload = (event:any) => {
  //     event.preventDefault();
  //     event.returnValue = ''; // Required for Chrome to show the dialog
  //   };

  //   window.addEventListener('beforeunload', handleBeforeUnload);
  //   return () => {
  //     window.removeEventListener('beforeunload', handleBeforeUnload);
  //   };
  // }, []);

  // const pathname = usePathname();
  // const [previousPathname, setPreviousPathname] = useState(pathname);
  // useEffect(() => {
  //   console.log(pathname,"pathname")
  //   const handleBeforeUnload = (event:any) => {
  //     event.preventDefault();
  //     event.returnValue = ''; // Required for Chrome to show the dialog
  //   };

  //   const handleRouteChange = () => {
  //     if (previousPathname !== pathname) {
  //       console.log("path changed")
  //       window.addEventListener('beforeunload', handleBeforeUnload);
  //       setPreviousPathname(pathname);
  //       window.removeEventListener('beforeunload', handleBeforeUnload);
  //     }
  //   };

  //   handleRouteChange();
  // }, [pathname, previousPathname]);

  useEffect(() => {
    const storage = localStorage.getItem("token");
    if (storage) {
    } else {
      router.push("/apphome/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!draggableImage.current) return;
    if (!imageParentDiv.current) return;
    if (!imageCanvasDiv.current) return;
    const parentElement = imageParentDiv.current as HTMLElement;
    const parentRect = (
      imageCanvasDiv.current as HTMLElement
    ).getBoundingClientRect();

    let posx = 0,
      posy = 0;

    function moveelement(event: MouseEvent) {
      if (!draggableImage.current) return;
      if (!parentElement) return;
      let mousex = event.clientX - posx;
      let mousey = event.clientY - posy;
      const childRect = parentElement.getBoundingClientRect();
      if (parentRect && childRect && draggableImage.current) {
        setProductImageOffset([mousex, mousey]);
        setProductImageCanvasRatio([
          (draggableImage.current as HTMLElement).offsetWidth /
          parentRect.width,
          (draggableImage.current as HTMLElement).offsetHeight /
          parentRect.height,
        ]);
        setImageCanvasSize([parentRect.width, parentRect.height]);
      }
      parentElement.style.left = mousex + "px";
      parentElement.style.top = mousey + "px";
    }

    function mousedown(event: MouseEvent) {
      event.preventDefault();
      if (!parentElement) return;
      if (!draggableImage.current) return;
      posx = event.clientX - parentElement.offsetLeft;
      posy = event.clientY - parentElement.offsetTop;
      (draggableImage.current as HTMLElement).addEventListener(
        "mousemove",
        moveelement,
        false,
      );
    }

    function mouseup(event: MouseEvent) {
      event.preventDefault();
      if (!draggableImage.current) return;
      (draggableImage.current as HTMLElement).removeEventListener(
        "mousemove",
        moveelement,
        false,
      );
    }

    window.addEventListener("mouseup", mouseup, false);

    (draggableImage.current as HTMLElement).addEventListener(
      "mousedown",
      mousedown,
      false,
    );

    // Register a ResizeObserver - it's from web APIs.
    const resizeObserver = new ResizeObserver(
      (entries: ResizeObserverEntry[]) => {
        for (const entry of entries) {
          if (entry.target === draggableImage?.current) {
            if (parentRect)
              setProductImageCanvasRatio([
                entry.contentRect.width / parentRect.width,
                entry.contentRect.height / parentRect.height,
              ]);
          }
        }
      },
    );

    (function registerImageResizeObserver() {
      resizeObserver.observe(draggableImage?.current as HTMLElement);
    })();

    if (parentRect && draggableImage.current) {
      setProductImageOffset([
        parentElement.offsetLeft,
        parentElement.offsetTop,
      ]);
      setProductImageCanvasRatio([
        (draggableImage.current as HTMLElement).offsetWidth / parentRect.width,
        (draggableImage.current as HTMLElement).offsetHeight /
        parentRect.height,
      ]);
      setImageCanvasSize([parentRect.width, parentRect.height]);
    }

    return () => {
      draggableImage.current &&
        (draggableImage.current as HTMLElement)?.removeEventListener(
          "mousedown",
          mousedown,
          false,
        );
      window.removeEventListener("mouseup", mouseup);
    };
  }, [
    productImageBGRemovedFile,
    setProductImageOffset,
    setProductImageCanvasRatio,
    setImageCanvasSize,
  ]);

  const nextToProductImage = async (reqProductName: string) => {
    const hasAlphabet = /[a-zA-Z]/.test(reqProductName);
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const numSpecialChars = (reqProductName.match(specialCharRegex) || [])
      .length;
    if (!hasAlphabet || numSpecialChars === reqProductName.length) {
      setProductNameErr(true);
      setErrorMessage("Please Provide valid product name");

      toast.warn(
        <>
          <span className="text-white text-[16px] leading-[20px]">
            {" "}
            Product Name Missing!
          </span>
          <br />
          <span className="text-white text-[12px] leading-[18px] truncate2lines mt-2">
            {" "}
            Please Provide valid product name
          </span>
        </>,
        { autoClose: 5000 },
      );
    } else {
      try {
        const endpoint = "/product-create";
        const requestObject = {
          product_name: reqProductName,
          workspace_id: Number(localStorage.getItem("workspace_id")),
        };
        const responseObject = await fetch(image2imageBaseURL + endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          } as HeadersInit,
          body: JSON.stringify(requestObject),
        });
        const responseData = await responseObject.json();

        if (!responseObject.ok) throw responseData;

        const responseProductData: productDataType = responseData.product;
        setProductData(responseProductData);
        setBrandTab(BRAND_TABS_Two.PRODUCTIMAGE);
        window.onbeforeunload = function (e) {
          return "You are about to leave this website";
        };
      } catch (error: any) {
        setProductNameErr(true);
        setErrorMessage("Please Provide product name");


        toast.error(
          <>
            <span className="text-white text-[16px] leading-[20px]">
              {" "}
              Bad Request!
            </span>
            <br />
            <span className="text-white text-[12px] leading-[18px] truncate2lines mt-2">
              {" "}
              {error.message}
            </span>
          </>,
          { autoClose: 5000 },
        );
      }
    }
  };

  const nextToImageBackdrop = async (uploadedFile: any) => {
    try {
      if (!productData) throw "Product Name has not been set";
      setProductImageLoading(0);
      const endpoint = "/product-removebg";

      const requestFormData = new FormData();
      requestFormData.append("product_id", "" + productData.id);
      requestFormData.append("workspace_id", "" + productData.workspace_id);
      requestFormData.append("generation_type", "auto");
      requestFormData.append("product_img", uploadedFile);

      const responseObject = await fetch(image2imageBaseURL + endpoint, {
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("token"),
        } as HeadersInit,
        body: requestFormData,
      });
      const responseData = await responseObject.json();

      if (!responseObject.ok) throw responseData;

      const generate_id = responseData.generate_id;
      const imageB64String = responseData.product_img_bg_removed;
      // const imageBlob = ConvertB64ToBlob(imageB64String);
      // const imageFile = new File([imageBlob], "bg_removed_image.png", {
      //   type: imageBlob.type,
      //   lastModified: Date.now(),
      // });
      const imageURL = imageB64String;
      setGenerateId(generate_id); // Set the generate ID.
      setFirstGeneration(true); // If the user uploads a new product_image
      setProductImageUrl(imageURL); // Set the image url
      setProductImageFile(uploadedFile); // Store the image file as a state.
      setProductImageBGRemovedFile(imageB64String); // Store the background removed file as a state.
      setBrandTab(BRAND_TABS_Two.IMAGEBACKDROPS); // Change the tabs.
      setProductImageLoading(1);
    } catch (error: any) {
      toast.error(
        <>
          <span className="text-white text-[16px] leading-[20px]">
            {" "}
            Bad Request!
          </span>
          <br />
          <span className="text-white text-[12px] leading-[18px] truncate2lines mt-2">
            {" "}
            {error.message}
          </span>
        </>,
        { autoClose: 5000 },
      );
      setProductImageLoading(-1);
    }
  };

  const {
    data: availableCredit,
    refetch: creditRefetching,
    isRefetchError,
  } = useQuery({
    queryKey: ["image-to-image-credit-change"],
    queryFn: () => {
      return getAvailableCredit(Number(localStorage.getItem("workspace_id")));
    },
  });

  const generate = async ({
    generation_type,
    prompt,
    ref_img,
    order,
    version,
    regenerate,
    imageData,
  }: GenerateParamType) => {
    let structuredData;
    const storedData = localStorage.getItem("structuredCreditData");
    if (storedData) {
      // Parse the JSON string back into an object
      structuredData = JSON.parse(storedData);
    }

    await creditRefetching();
    const object = {};
    if (
      availableCredit?.availableCredits >
      structuredData["IMAGE_IMAGE_GENERATION"].credits_generation &&
      !isRefetchError
    ) {
      try {
        if (!productData) throw "Product Name is not set";
        if (!productImageFile) throw "Product Image is not set";
        if (!productImageBGRemovedFile)
          throw "Product Image Background is not removed";

        (order === undefined || order === null) &&
          setImageVersion((prev) => prev + 1);
        const activeIndex = activeImageUrlIndex + 1;
        setGenerateImageLoading(0);
        setButtonLoading(true);
        setLoading({
          tabId: "1",
          index: activeIndex, //vertical
          subIndex: 0, //horizontal
          isLoading: true,
          isError: false,
        });

        const endpoint = "/product-generatebg";
        let requestFormData = new FormData();
        requestFormData.append("product_id", "" + productData.id);
        requestFormData.append("workspace_id", "" + productData.workspace_id);
        // if (firstGeneration) {
        requestFormData.append("generate_id", "" + generateId);
        // }
        requestFormData.append("generation_type", generation_type);
        requestFormData.append("version", "" + imageVersion);
        requestFormData.append("order", "" + (order ?? 1));
        requestFormData.append(
          "product_placement",
          `[${productImageOffset.join(", ")}]`,
        );
        requestFormData.append("product_img", productImageFile);
        requestFormData.append(
          "product_img_bg_removed",
          productImageBGRemovedFile,
        );
        requestFormData.append(
          "product_img_canvas_ratio",
          `[${productImageCanvasRatio.join(", ")}]`,
        );
        requestFormData.append(
          "product_img_canvas_size",
          `[${imageCanvasSize.join(", ")}]`,
        );
        if (generation_type === "auto") {
          // No extra parameters need to be added here.
          // It's just for the generation_type input check.
        } else if (generation_type === "prompt") {
          if (prompt) requestFormData.append("user_prompt", prompt);
          else if (userPrompt)
            requestFormData.append("user_prompt", userPrompt);
          else throw "Prompt undefined";
        } else if (generation_type === "ref_img" && ref_img) {
          if (ref_img) requestFormData.append("ref_img", ref_img);
          else if (referenceImageFile)
            requestFormData.append("ref_img", referenceImageFile);
          else throw "Reference Image not defined";
        } else {
          throw "Invalid generation type: It can either be 'auto', 'prompt' or 'ref_img'";
        }

        const responseObject = await fetch(image2imageBaseURL + endpoint, {
          method: "POST",
          headers: {
            Authorization: localStorage.getItem("token"),
          } as HeadersInit,
          body: requestFormData,
        });
        const responseData = await responseObject.json();
        if (!responseObject.ok) throw responseData.error;

        setGenerateId(responseData.generate_id);
        const generateImageB64String = responseData.generated_image;
        // const generated_image_url = ConvertB64ToImageURL(generateImageB64String);
        // const version = responseData.version;

        const imageListItem = {
          generate_id: responseData.generate_id,
          user_id: responseData.user_id,
          requestFormData: requestFormData,
          generated_image: generateImageB64String,
          file_id: responseData.file_id,
          order: responseData.order,
          is_liked: responseData.likes != 0,
          is_disliked: responseData.dislikes != 0,
          is_downloaded: responseData.is_downloaded,
          is_saved: responseData.is_saved,
        };

        requestFormData.forEach(function (value: any, key: any) {
          // @ts-ignore
          object[key] = value;
        });

        setImageUrl({
          tabId: "1",
          index: activeIndex,
          subIndex: 0,
          image: responseData.generated_image,
          isLoading: false,
          isError: false,
          other: { ...responseData, requestJsonData: object },
        });

        setActiveImageUrlIndex(activeIndex);

        // setImageUrl(
        //   //yha bhi hoga like dislike ka ***
        //   imageListItem.generated_image,
        //   "1",
        //   version !== undefined ? version : imageVersion,
        //   {
        //     order: imageListItem.order,
        //     generate_id: imageListItem.generate_id,
        //     requestFormData: imageListItem.requestFormData,
        //     user_id: imageListItem.user_id,
        //     file_id: imageListItem.file_id,
        //     is_liked: imageListItem.is_liked,
        //     is_disliked: imageListItem.is_disliked,
        //     is_downloaded: imageListItem.is_downloaded,
        //     is_saved: imageListItem.is_saved,
        //   },
        //   false,
        //   false
        // );
        setGenType(generation_type);
        if (generation_type == "prompt" && prompt) setUserPrompt(prompt);
        if (generation_type == "ref_img" && ref_img)
          setReferenceImageFile(ref_img);
        setGenerateImageUrl(generateImageB64String);
        setFirstGeneration(false);
        setGenerateImageLoading(1);
        setButtonLoading(false);
      } catch (error: any) {
        setButtonLoading(false);
        console.log("An error occurred while generating the image ", error);

        toast.error(
          <>
            <span className="text-white text-[16px] leading-[20px]">
              {" "}
              Bad Request!
            </span>
            <br />
            <span className="text-white text-[12px] leading-[18px] truncate2lines mt-2">
              {" "}
              An error occurred while generating the image
            </span>
          </>,
          { autoClose: 5000 },
        );
        setImageVersion((prev) => prev - 1);
        const activeIndex = activeImageUrlIndex + 1;
        setImageError({
          tabId: `1`,
          index: activeIndex,
          subIndex: 0,
          isLoading: false,
          isError: true,
          other: { requestJsonData: object },
        });
      }
    } else if (
      availableCredit?.availableCredits <=
      structuredData["IMAGE_IMAGE_GENERATION"].credits_generation &&
      !isRefetchError
    ) {
      //setCreditFailed(true);
      toast.warn(
        <>
          <span className="text-white text-[16px] leading-[20px]">
            {" "}
            Insufficient Credits!
          </span>
          <br />
          <span className="text-white text-[12px] leading-[18px] truncate2lines mt-2">
            {" "}
            There are no available credits left for your generation, either
            renew your plan or upgrade to a different plan to continue
            generating.
          </span>
        </>,
        { autoClose: 5000 },
      );
    } else {
      toast.error(
        <>
          <span className="text-white text-[16px] leading-[20px]">
            {" "}
            Bad Request!
          </span>
          <br />
          <span className="text-white text-[12px] leading-[18px] truncate2lines mt-2">
            {" "}
            Please try again.
          </span>
        </>,
        { autoClose: 5000 },
      );

      //setshowError(true);
    }
  };

  const handleImageLike = async (attr: {
    activeId: string;
    activeIndex: number;
    index: number;
    details: { other: { file_id: string } };
  }) => {
    try {
      setLike({
        tabId: attr.activeId,
        index: attr.activeIndex,
        subIndex: attr.index,
      });
      const file_id = attr.details.other.file_id; // Retrieve the generate id.
      const action = "like";
      const endpoint = "/update-generation-reaction";

      const data = {
        file_id: file_id,
        action: action,
      };
      const requestFormData = new FormData();
      requestFormData.append("file_id", "" + file_id);
      requestFormData.append("action", action);
      const responseObject = await fetch(image2imageBaseURL + endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        } as HeadersInit,
        body: JSON.stringify(data),
      });
      const responseData = await responseObject.json();

      if (!responseObject.ok) throw responseData.error;
    } catch (error) {
      toast.warn(
        <>
          <span className="text-white text-[16px] leading-[20px]">
            {" "}
            Error occurred!
          </span>
          <br />
          <span className="text-white text-[12px] leading-[18px] truncate2lines mt-2">
            {" "}
            An Error occurred while liking the image
          </span>
        </>,
        { autoClose: 5000 },
      );

      console.log("An Error occurred while liking the image ", error);
    }
  };

  const handleImageDislike = async (attr: {
    activeId: string;
    activeIndex: number;
    index: number;
    details: { other: { file_id: string } };
  }) => {
    try {
      setDisLike({
        tabId: attr.activeId,
        index: attr.activeIndex,
        subIndex: attr.index,
      });
      const file_id = attr.details.other.file_id; // Retrieve the generate id.
      const action = "dislike";
      const endpoint = "/update-generation-reaction";

      const data = {
        file_id: file_id,
        action: action,
      };

      const requestFormData = new FormData();
      requestFormData.append("file_id", "" + file_id);
      requestFormData.append("action", action);
      const responseObject = await fetch(image2imageBaseURL + endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        } as HeadersInit,
        body: JSON.stringify(data),
      });
      const responseData = await responseObject.json();

      if (!responseObject.ok) throw responseData.error;
    } catch (error) {
      console.log("An Error occurred while disliking the image ", error);
      toast.warn(
        <>
          <span className="text-white text-[16px] leading-[20px]">
            {" "}
            Error occurred!
          </span>
          <br />
          <span className="text-white text-[12px] leading-[18px] truncate2lines mt-2">
            {" "}
            An Error occurred while disliking the image
          </span>
        </>,
        { autoClose: 5000 },
      );

    }
  };

  const handleImageDownload = async (attr: {
    activeId: string;
    activeIndex: number;
    index: number;
    details: { other: { file_id: string } };
  }) => {
    try {
      setDownload({
        tabId: attr.activeId,
        index: attr.activeIndex,
        subIndex: attr.index,
        downloadClicked: true,
      });
      const file_id = attr.details.other.file_id; // Retrieve the generate id.
      const action = "download";
      const endpoint = "/update-generation-reaction";

      const data = {
        file_id: file_id,
        action: action,
      };

      const requestFormData = new FormData();
      requestFormData.append("file_id", "" + file_id);
      requestFormData.append("action", action);
      const responseObject = await fetch(image2imageBaseURL + endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        } as HeadersInit,
        body: JSON.stringify(data),
      });
      const responseData = await responseObject.json();

      if (!responseObject.ok) throw responseData.error;
    } catch (error) {
      console.log("An Error occurred while downloading the image ", error);
      toast.warn(
        <>
          <span className="text-white text-[16px] leading-[20px]">
            {" "}
            Error occurred!
          </span>
          <br />
          <span className="text-white text-[12px] leading-[18px] truncate2lines mt-2">
            {" "}
            An Error occurred while downloading the image
          </span>
        </>,
        { autoClose: 5000 },
      );

    }
  };

  const handleImageSave = async (attr: {
    activeId: string;
    activeIndex: number;
    index: number;
    details: { other: { file_id: string } };
  }) => {
    try {
      setSaved({
        tabId: attr.activeId,
        index: attr.activeIndex,
        subIndex: attr.index,
        saveClicked: true,
      });
      const file_id = attr.details.other.file_id; // Retrieve the generate id.
      const action = "save";
      const endpoint = "/update-generation-reaction";

      const data = {
        file_id: file_id,
        action: action,
      };
      const requestFormData = new FormData();
      requestFormData.append("file_id", "" + file_id);
      requestFormData.append("action", action);
      const responseObject = await fetch(image2imageBaseURL + endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        } as HeadersInit,
        body: JSON.stringify(data),
      });
      const responseData = await responseObject.json();
      //setSavePopup(true);

      toast.success(
        <>
          <span className="text-white text-[16px] leading-[20px]">
            {" "}
            Image Saved
          </span>
          <br />
          <span className="text-white text-[12px] leading-[18px] truncate2lines mt-2">
            {" "}
            Image has been saved in the default location!
          </span>
        </>,
        { autoClose: 5000 },
      );
      // toast.success("Image saved successfully");
      if (!responseObject.ok) throw responseData.error;
    } catch (error) {
      console.log("An Error occurred while saving the image ", error);
      toast.warn(
        <>
          <span className="text-white text-[16px] leading-[20px]">
            {" "}
            Error occurred!
          </span>
          <br />
          <span className="text-white text-[12px] leading-[18px] truncate2lines mt-2">
            {" "}
            An Error occurred while downloading the image
          </span>
        </>,
        { autoClose: 5000 },
      );

    }
  };

  const handleImageRegenerate = async (attr: {
    activeId: string;
    activeIndex: number;
    index: number;
  }) => {
    const requestFormData =
      imageUrl?.[`${attr.activeId}`]?.[attr.activeIndex]?.[attr.index - 1]
        ?.other?.requestJsonData;
    requestFormData.order = (parseInt(requestFormData.order) + 1).toString();

    try {
      const generation_type = genType;
      const order =
        //@ts-ignore
        imageUrl?.[`${attr.activeId}`]?.[attr.activeIndex]?.length + 1 ?? 1;
      const version = imageVersion;
      if (order === undefined || order === null) {
        setImageVersion((prev) => prev + 1);
      }
      setGenerateImageLoading(0);
      setButtonLoading(true);
      setLoading({
        tabId: attr.activeId,
        index: attr.activeIndex,
        subIndex: attr.index,
        isLoading: true,
        isError: false,
      });
      const endpoint = "/product-generatebg";
      const form_data = new FormData();
      for (let key in requestFormData) {
        form_data.append(key, requestFormData[key]);
      }
      const responseObject = await fetch(image2imageBaseURL + endpoint, {
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("token"),
        } as HeadersInit,
        body: form_data,
      });

      const responseData = await responseObject.json();

      // setGenerateId(responseData.generate_id);

      if (!responseObject.ok) throw responseData.error;

      const generateImageB64String = responseData.generated_image;

      const imageListItem = {
        generate_id: responseData.generate_id,
        user_id: responseData.user_id,
        requestFormData: requestFormData,
        generated_image: generateImageB64String,
        file_id: responseData.file_id,
        order: responseData.order,
        is_liked: responseData.likes != 0,
        is_disliked: responseData.dislikes != 0,
        is_downloaded: responseData.is_downloaded,
        is_saved: responseData.is_saved,
      };

      setImageUrl({
        tabId: "1",
        index: attr.activeIndex,
        subIndex: attr.index,
        image: responseData.generated_image,
        isLoading: false,
        isError: false,
        other: { ...responseData, requestJsonData: requestFormData },
      });

      // setActiveImageUrlIndex(attr.index);

      setGenType(generation_type);

      setGenerateImageUrl(generateImageB64String);
      setFirstGeneration(false);
      setGenerateImageLoading(1);
      setButtonLoading(false);
    } catch (error: any) {
      setButtonLoading(false);
      console.log("An error occurred while generating the image ", error);
      toast.error(
        <>
          <span className="text-white text-[16px] leading-[20px]">
            {" "}
            Bad Request!
          </span>
          <br />
          <span className="text-white text-[12px] leading-[18px] truncate2lines mt-2">
            {" "}
            An error occurred while generating the image
          </span>
        </>,
        { autoClose: 5000 },
      );

      setImageVersion((prev) => prev - 1);
      setImageError({
        tabId: "1",
        index: attr.activeIndex,
        subIndex: attr.index,
        isLoading: false,
        isError: true,
        other: { requestJsonData: requestFormData },
      });
    }

    //   if (generation_type === "auto")
    //     // generate({
    //     //   generation_type: generation_type,
    //     //   order: order,
    //     //   version: version,
    //     //   regenerate: true,
    //     //   imageData: details.imageLists[imageIndex].other.requestFormData,
    //     // });
    //   else if (generation_type === "prompt" && userPrompt)
    //     // generate({
    //     //   generation_type: generation_type,
    //     //   prompt: userPrompt,
    //     //   order: order,
    //     //   version: version,
    //     //   regenerate: true,
    //     //   imageData: details.imageLists[imageIndex].other.requestFormData,
    //     // });
    //   else if (generation_type === "ref_img" && referenceImageFile)
    //     // generate({
    //     //   generation_type: generation_type,
    //     //   ref_img: referenceImageFile,
    //     //   order: order,
    //     //   version: version,
    //     //   regenerate: true,
    //     //   imageData: details.imageLists[imageIndex].other.requestFormData,
    //     // });
  };

  const { data: folderDetails, refetch: getFolderRefetch } = useQuery({
    queryKey: ["folder-details"],
    queryFn: () => {
      return getFolderService(1);
    },
  });

  const mutateCreateFolder = useMutation({
    mutationKey: ["create-folder"],
    mutationFn: createFolderService,
  });

  const mutateChangeFolder = useMutation({
    mutationKey: ["change-folder"],
    mutationFn: changeImageFolderServiceImageToImage,
  });

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

  // const folderButtonClick = (value: any, index: any) => {
  //   setfolderClicked(true);
  //   setfolderClickedIndex(index);
  //   setFolderID(value);
  // };

  // const changeFolderClick = () => {
  //   let data = {
  //     generate_id: generateId,

  //     folder_id: folderID,
  //   };
  //   mutateChangeFolder.mutate(data, {
  //     onSuccess: (response: any) => {
  //       setFolderChanged(true);
  //       setChangeLocationPopup(false);
  //       setSavePopup(true);
  //     },
  //   });
  // };

  const SECOND = 1000;

  const texts = [
    {
      name: "Parsing the input image",
      time: SECOND * 2,
    },
    {
      name: "Understanding relative positioning and relative size with frame",
      time: SECOND * 2,
    },
    {
      name: "Generating backdrop according to your input",
      time: SECOND * 2,
    },
    {
      name: "Positioning and sizing your product according to inputs",
      time: Infinity,
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

  const generateImage = async (type: string) => {
    if (type == "auto") await generate({ generation_type: "auto" });
    else if (type == "prompt")
      await generate({ generation_type: "prompt", prompt: textareaValue });
    else if (type == "ref_img")
      await generate({ generation_type: "ref_img", ref_img: uploadedFile });
  };

  return (
    <>
      <div className="justify-start flex w-full bg-[#130828]">
        <Sidebar />
        <div className="w-full overflow-hidden overflow-y-auto h-[100vh]">
          <TopBar title="Generate Product Photo-shoots" />
          <div className="w-full py-2 px-2">
            <div className="flex w-full gap-2 justify-center right_side_tool">
              <div className="tool-left-panel flex flex-col gap-4 p-2 overflow-hidden rounded-[8px] overflow-y-auto justify-between -mt-2">
                <div className="flex flex-col gap-2">
                  <ProductName
                    tab={tab}
                    setBrandTab={setBrandTab}
                    next={nextToProductImage}
                    productNameErr={productNameErr}
                    setProductNameErr={setProductNameErr}
                    errorMessage={errorMessage}
                  />
                  <ProductImage
                    tab={tab}
                    setBrandTab={setBrandTab}
                    next={nextToImageBackdrop}
                    productImageLoading={productImageLoading}
                    disabled={productData === null} // Disable Media input if productData is not present.
                  />
                  <ImageBackdrop
                    tab={tab}
                    setBrandTab={setBrandTab}
                    onGenerate={generate}
                    generateImageLoading={generateImageLoading}
                    textareaValue={textareaValue}
                    uploadedFile={uploadedFile}
                    setUploadedFile={setUploadedFile}
                    setGenerationtype={setGenerationtype}
                    setTextareaValue={setTextareaValue}
                    generateImage={generateImage}
                    buttonLoading={buttonLoading}
                    Generationtype={Generationtype}
                    disabled={productImageFile === null} // Disable CreativeType input if product image has not been uploaded.
                  />

                  {/* <div className="w-full flex mt-2 justify-center items-center">
                  <Button
                    className={
                      "disabled rounded-full px-20  font-semibold text-nyx-yellow hover:shadow-none focus:shadow-glow disabled:bg-nyx-gray-1  disabled:border-nyx-gray-1 disabled:text-black disabled:cursor-not-allowed"
                    }
                    onClick={generateImage}
                    disabled={Generationtype === "" || buttonLoading == true}
                  >
                    {buttonLoading == true ? <ButtonLoading /> : "Generate"}
                  </Button>
                </div> */}
                </div>
              </div>
              <div className="relative w-[65%] bg-[#332270] rounded-[8px]">
                <div className="h-[45%] relative flex justify-center items-center">
                  <div
                    ref={imageCanvasDiv}
                    className={clsx(
                      "relative overflow-clip h-[270px] w-[392px] rounded-md m-auto flex justify-center flex-col items-center z-0  gap-1",
                      productImageLoading === 1 && productImageUrl
                        ? "bg-white bg-[conic-gradient(#9e9e9e_90deg,#ffffff_90deg_180deg,#9e9e9e_180deg_270deg,#ffffff_270deg)] bg-[0px_0px] bg-repeat bg-[length:10px_10px]"
                        : "bg-gradient-to-r from-gray-300/45 to-gray-500/25",
                    )}
                  >
                    {
                      <>
                        <>
                          {productImageLoading === 0 && (
                            <BgRemoveLoading
                              message={"Background Removing..."}
                            />
                          )}
                        </>
                        <>
                          {productImageLoading === 1 && productImageUrl && (
                            <div
                              ref={imageParentDiv}
                              className="absolute border-2 border-gray-500"
                              style={{
                                resize: "both",
                                overflow: "hidden",
                                height: "250px",
                                width: "200px",
                              }}
                            >
                              {/* <div className="z-0 absolute left-2 h-[100%] w-[calc(100%-16px)] border-t-2 border-b-2 border-t-red-900 border-b-red-900"></div>
                            <div className="z-0 absolute top-2 h-[calc(100%-16px)] w-[100%] border-l-2 border-r-2 border-l-red-900 border-r-red-900"></div> */}
                              {/* <div ref={resize_tl_ref} style={{zIndex: 1000}} className="cursor-pointer h-4 w-4 rounded-full border-2 border-red-900 absolute -top-2 -left-2 hover:bg-red-900" />
                            <div ref={resize_tr_ref} style={{zIndex: 1000}} className="cursor-pointer h-4 w-4 rounded-full border-2 border-red-900 absolute -top-2 -right-2 hover:bg-red-900" /> */}
                              <div
                                style={{ zIndex: 1000 }}
                                className="cursor-pointer h-4 w-4 rounded-full border-4 border-red-500 absolute -bottom-2 -right-2 hover:bg-red-900"
                              />
                              {/* <div ref={resize_br_ref} style={{zIndex: 1000}} className="cursor-pointer h-4 w-4 rounded-full border-2 border-red-900 absolute -bottom-2 -right-2 hover:bg-red-900" /> */}
                              <img
                                ref={draggableImage}
                                src={productImageUrl}
                                alt="Dynamic Image"
                                width="200x"
                                style={{
                                  zIndex: 100,
                                  position: "relative",
                                  maxHeight: "100%",
                                  maxWidth: "100%",
                                  height: "auto",
                                  width: "auto",
                                }}
                              />
                            </div>
                          )}
                        </>
                        <>{productImageLoading === -1 && <div></div>}</>
                      </>
                    }
                  </div>
                </div>
                <div
                  className={
                    imageUrl["1"].length > 0
                      ? "h-[55%] bg-[#1F1D4D]  flex justify-center "
                      : "h-[55%] bg-[#1F1D4D]  flex pl-4 "
                  }
                >
                  {
                    <div className="w-full">
                      <section
                        className="h-[380px] overflow-hidden overflow-y-auto"
                        ref={imageRef}
                        data-id={`${imageTabActive}`}
                      >
                        {imageUrl["1"].length > 0 ? (
                          <>
                            {[{ id: 1 }]?.map((tab: { id: number }) => (
                              <section
                                key={`section-${tab.id}`}
                                data-id={tab.id}
                                className={"flex flex-wrap flex-col-reverse"}
                              >
                                {imageUrl["1"]?.map(
                                  (sImageUrl: any, index: number) => (
                                    <Fragment key={`Slide-${index}`}>
                                      <Imageslider
                                        imageurl={sImageUrl}
                                        tabId={1}
                                        activeIndex={index}
                                        details={sImageUrl}
                                        regenerateButton={handleImageRegenerate}
                                        hitDisLikeButton={handleImageDislike}
                                        hitLikeButton={handleImageLike}
                                        downLoadButtonClick={
                                          handleImageDownload
                                        }
                                        saveButtonClicked={handleImageSave}
                                      />
                                    </Fragment>
                                  ),
                                )}
                              </section>
                            ))}
                          </>
                        ) : (
                          <div className="h-full w-full flex flex-col justify-center items-center">
                            <p className="text-white p-2 text-[24px] ">
                              Steps for Brand Image Generation
                            </p>
                            <Steper tab={tab} />
                          </div>
                        )}
                      </section>
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {savePopup ? (
        <Modal isOpen={savePopup} style={savePopupStyle}>
          <div className="flex justify-between mt-5">
            <div className="text-xl font-bold text-[#FFFFFF]">Image Saved</div>
            <div
              className="pr-3 cursor-pointer"
              onClick={() => {
                setSavePopup(false);
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
          {/* <div className="w-full my-10">
            <p className="w-full text-center text-[#FFFFFF] text-base">
              {folderChanged
                ? "Your default location is Updated Image has been saved in the New location!"
                : "Image has been saved in the default location!"}
            </p>
          </div> */}
          <div className="w-full my-10">
            <p className="w-full text-center text-[#FFFFFF] text-base">
              Image has been saved in the default location!
            </p>
          </div>

          {/* <div className="w-full flex gap-4 mt-6 justify-center items-center">
            <Button
              className="rounded-full w-60"
              onClick={() => {
                setSavePopup(false);
                setChangeLocationPopup(true);
              }}
            >
              Change Location
            </Button>
            <Button
              className="rounded-full w-60"
              onClick={() => {
                setSavePopup(false);
                setFolderChanged(false);
              }}
            >
              {folderChanged ? "Ok" : "Open File"}
            </Button>
          </div> */}

          <div className="w-full flex gap-4 mt-6 justify-center items-center">
            <Button
              className="rounded-full w-60"
              onClick={() => {
                setSavePopup(false);
                setFolderChanged(false);
              }}
            >
              Ok
            </Button>
          </div>
        </Modal>
      ) : null}

      <LandscapePopup />

      {/* {changeLocationPopup ? (
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
                className={`w-[155px] h-[170px] bg-[#3B226F] py-2 rounded-md flex flex-col items-center hover:border-[#5E32FF] border-transparent border-2 cursor-pointer ${
                  folderClicked && folderClickedIndex === index
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
      {/* {item?.name}
                  </p>
                </div>
              </div>
            ))}
          </div> */}

      {/* <div className="flex items-center">
            <input
              id="default-checkbox"
              type="checkbox"
              value=""
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 placeholder:italic"
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
          </div> */}
      {/* </Modal>
      ) : null} */}

      {creditFailed ? (
        <Modal isOpen={creditFailed} style={paymentWarningStyle}>
          <div className="w-full text-[#FFCB54] flex flex-col text-lg font-semibold my-3 gap-3 text-center">
            Insufficient Credits!
          </div>
          <div className="w-full text-[#FFFFFF] flex flex-col text-sm font-normal my-4 gap-3 text-center">
            There are no available credits left for your generation, either
            renew your plan or upgrade to a different plan to continue
            generating.
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
