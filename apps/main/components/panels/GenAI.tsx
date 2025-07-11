/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState, useContext, useRef } from "react";
import Image from "next/image";
import { observer } from "mobx-react";
import { GenAITab } from "@nyx-frontend/main/shared/inputs";
import { INPAINTING_TABS_GENAI } from "@nyx-frontend/main/utils/utils";
import Button from "@nyx-frontend/main/components/Button";
import { Slider } from "rsuite";
import "rsuite/Slider/styles/index.css";
import "rsuite/RangeSlider/styles/index.css";
import "./rsuiteSlider.css";
import { IMAGE_URL } from "@nyx-frontend/main/components/constants";
import { StoreContext } from "@nyx-frontend/main/store";

import { TActiveTabs } from "./types";
import classNames from "@nyx-frontend/main/utils/classNames";
import { urlToBlob } from "@nyx-frontend/main/utils/helper";
import { useMutation } from "@tanstack/react-query";
import { bgRemoveServices } from "@nyx-frontend/main/services/model";
import axios from "axios";
import { ImageEditorElement } from "@nyx-frontend/main/types";
import ButtonLoadingGenAI from "@nyx-frontend/main/components/ButtonLoadingGenAI";
import { updatePassStyle } from "@nyx-frontend/main/utils/modalstyles";
import Modal from "react-modal";

export const GenAI = observer(() => {
  const store = useContext(StoreContext);
  const [activeTab, setActiveTab] = useState<TActiveTabs>(null);
  const seletected = useRef<ImageEditorElement>(null);

  const [InpaintingPromptDraw, setInpaintingPromptDraw] =
    useState<boolean>(false);
  const [InpaintingPromptErase, setInpaintingPromptErase] =
    useState<boolean>(false);
  const [InpaintingPromptDrawImage, setInpaintingPromptDrawImage] =
    useState<boolean>(false);
  const [InpaintingPromptEraseImage, setInpaintingPromptEraseImage] =
    useState<boolean>(false);
  const [textareaValue, settextareaValue] = useState<String>("");
  const [Inpainting, setInpainting] = useState<boolean>(false);
  const [imageNotSelectedbgRem, setimageNotSelectedbgRem] =
    useState<boolean>(false);
  const [genAITabState, setGenAITabState] = useState(0);
  const [RangeSliderValue, setRangeSliderValue] = useState(20);

  const mutatebgremoveServices = useMutation({
    mutationKey: ["image-backgroung-remove"],
    mutationFn: bgRemoveServices,
    onSuccess: async (response) => {
      const image = await axios(`/api/image/${response.output_url}`);
      const uri = `data:image/png;base64,${image.data}`;
      if (!seletected.current) return;
      store.addImageOnSelect(seletected.current, uri);
    },
  });

  const handleTextareaChange = (e: any) => {
    settextareaValue(e.target.value);
  };

  const onClickTabHandler = (newActiveTabs: TActiveTabs) => () => {
    setActiveTab(newActiveTabs);
  };

  const onClickBackgroundRemoverHandler = () => {
    const activeElement = store.selectedElement;
    if (activeElement?.type !== "image") return setimageNotSelectedbgRem(true);

    seletected.current = activeElement;
    const dataURL = activeElement?.fabricObject?.toDataURL({});
    if (!dataURL?.length) return;

    // @ts-ignore
    urlToBlob(activeElement.fabricObject?._originalElement.src, (blob) => {
      const formData = new FormData();
      formData.append("image_url", blob, "exported_image.png"); // Append the uploaded file to the FormData object
      formData.append("generate_id", `1`);
      mutatebgremoveServices.mutate(formData);
    });
  };

  return (
    <>
      <div className="w-full flex flex-wrap gap-3">
        <button onClick={onClickTabHandler("bg-remover")} className="relative">
          <div
            className={classNames(
              "absolute -inset-1 z-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-0 transition duration-1000",
              mutatebgremoveServices.isPending
                ? "opacity-100 animate-pulse duration-200"
                : "",
            )}
          ></div>
          <div className="bg-[#50387B] w-[100px] h-[65px] rounded-t-lg flex justify-center items-center flex-col relative z-0">
            <span>
              <Image
                src={`${IMAGE_URL}/assets/images/brand/bg-remove.png`}
                width={32}
                height={32}
                alt="bg icon"
              />
            </span>
          </div>
          <div
            className={classNames(
              "w-[100px] flex justify-center items-center relative z-0 h-[35px] rounded-b-lg text-[#FFF] px-1 py-4 text-[12px] font-medium",
              activeTab === "bg-remover" ? `bg-[#5E32FF]` : `bg-[#1D1138]`,
            )}
          >
            BG Remover
          </div>
        </button>
        <button onClick={onClickTabHandler("inpainting")} className="hidden">
          <div className="bg-[#50387B] w-[100px] h-[65px] rounded-t-lg flex justify-center items-center flex-col">
            <button>
              <Image
                src={`${IMAGE_URL}/assets/images/brand/inpaint.png`}
                width={32}
                height={32}
                alt="bg icon"
              />
            </button>
          </div>
          <div
            className={classNames(
              "w-[100px] flex justify-center items-center relative z-0 h-[35px] rounded-b-lg text-[#FFF] px-1 py-4 text-[12px] font-medium",
              activeTab === "inpainting" ? `bg-[#5E32FF]` : `bg-[#1D1138]`,
            )}
          >
            Inpainting
          </div>
        </button>
        <button
          onClick={onClickTabHandler("generative-fill")}
          className="hidden"
        >
          <div className="bg-[#50387B] w-[100px] h-[65px] rounded-t-lg flex justify-center items-center flex-col">
            <button>
              <Image
                src={`${IMAGE_URL}/assets/images/brand/bucket.png`}
                width={32}
                height={32}
                alt="bg icon"
              />
            </button>
          </div>
          <div
            className={classNames(
              "w-[100px] flex justify-center items-center relative z-0 h-[35px] rounded-b-lg text-[#FFF] px-1 py-4 text-[12px] font-medium",
              activeTab === "generative-fill" ? `bg-[#5E32FF]` : `bg-[#1D1138]`,
            )}
          >
            Generative Fill
          </div>
        </button>
      </div>
      {activeTab === "bg-remover" && (
        <div className="w-full">
          <Button
            disabled={mutatebgremoveServices.isPending}
            onClick={onClickBackgroundRemoverHandler}
            className="rounded-full my-4 py-1 bg-nyx-yellow text-black w-full font-normal"
          >
            {mutatebgremoveServices.isPending ? (
              <ButtonLoadingGenAI />
            ) : (
              "Remove BG"
            )}
          </Button>
        </div>
      )}

      {activeTab === "inpainting" && (
        <>
          {" "}
          <div className="w-full">
            <GenAITab
              data={INPAINTING_TABS_GENAI}
              tabState={setGenAITabState}
              tabStatus={genAITabState}
            />
          </div>
          <div className="w-full relative">
            {genAITabState === 0 && (
              <>
                <div className="py-3 md:px-7 sm:px-4 amountOfMotionn ">
                  <p className="text-white text-[14px] leading-[17px] absolute left-0 top-6 ">
                    Brush Width
                  </p>
                  <div className="mr-[-20px]">
                    <Slider
                      progress
                      defaultValue={20}
                      value={RangeSliderValue}
                      onChange={(value: any) => {
                        setRangeSliderValue(value);
                      }}
                      className="mt-4 mb-2 w-[58%] mx-auto "
                    />
                  </div>
                  <div className="absolute right-0 top-[15px] w-[67px] h-[33px] rounded-[4px] border border-solid flex items-center justify-center ">
                    <p className="text-white">{RangeSliderValue}</p>
                  </div>
                </div>
                <div className="flex justify-center">
                  <Button
                    className="rounded-full w-[100px] my-2 py-1 text-white font-normal"
                    onClick={() => {
                      setInpaintingPromptDraw(true);
                      setInpainting(false);
                    }}
                  >
                    Next
                  </Button>
                </div>
              </>
            )}
            {genAITabState === 1 && (
              <>
                <div className="py-3 md:px-7 sm:px-4 amountOfMotionn ">
                  <p className="text-white text-[14px] leading-[17px] absolute left-0 top-6 ">
                    Brush Width
                  </p>
                  <div className="mr-[-20px]">
                    <Slider
                      progress
                      defaultValue={20}
                      value={RangeSliderValue}
                      onChange={(value: any) => {
                        setRangeSliderValue(value);
                      }}
                      className="mt-4 mb-2 w-[58%] mx-auto "
                    />
                  </div>
                  <div className="absolute right-0 top-[15px] w-[67px] h-[33px] rounded-[4px] border border-solid flex items-center justify-center ">
                    <p className="text-white">{RangeSliderValue}</p>
                  </div>
                </div>

                <div className="flex justify-center">
                  <Button
                    className="rounded-full w-[100px] my-2 py-1 text-white font-normal"
                    onClick={() => {
                      setInpaintingPromptErase(true);
                      setInpainting(false);
                    }}
                  >
                    Next
                  </Button>
                </div>
              </>
            )}
          </div>
        </>
      )}
      {InpaintingPromptDraw && (
        <div>
          <hr className="h-1 text-gray-500 mt-3 mb-3" />
          <p className="text-[14px] font-normal mt-4 mb-2 text-white ">
            Add the item you want to replace
          </p>
          <input
            name=""
            id=""
            //@ts-ignore
            value={textareaValue} // Set value to state variable
            onChange={handleTextareaChange} // Handle textarea value change
            className="w-full h-[34px] bg-transparent rounded-lg border border-[#8297BD] text-white p-4"
            placeholder="Enter you text here"
          />
          <div className="flex justify-center items-center gap-5 mt-4">
            <Button
              className="rounded-full w-[100px] my-2 py-1 text-white font-normal"
              onClick={() => {
                setInpaintingPromptDraw(false);
                setInpaintingPromptDrawImage(false);
                setInpainting(true);
              }}
            >
              Back
            </Button>
            <Button
              className="rounded-full w-[100px] flex items-center justify-center my-2 py-1 text-white font-normal"
              onClick={() => {
                setInpaintingPromptDrawImage(true);
                setInpaintingPromptDraw(false);
              }}
            >
              Generate
            </Button>
          </div>
        </div>
      )}
      {InpaintingPromptErase && (
        <div>
          <hr className="h-1 text-gray-500 mt-3 mb-3" />
          <p className="text-[14px] font-normal mt-4 mb-2 text-white ">
            Add the item you want to replace
          </p>
          <input
            name=""
            id=""
            //@ts-ignore
            value={textareaValue} // Set value to state variable
            onChange={handleTextareaChange} // Handle textarea value change
            className="w-full h-[34px] bg-transparent rounded-lg border border-[#8297BD] text-white p-4"
            placeholder="Enter you text here"
          />
          <div className="flex justify-center items-center gap-5 mt-4">
            <Button
              className="rounded-full w-[100px] my-2 py-1 text-white font-normal"
              onClick={() => {
                setInpaintingPromptErase(false);
                setInpainting(true);
                setInpaintingPromptEraseImage(false);
              }}
            >
              Back
            </Button>
            <Button
              className="rounded-full w-[100px] flex items-center justify-center   my-2 py-1 text-white font-normal"
              onClick={() => {
                setInpaintingPromptEraseImage(true);
                setInpaintingPromptErase(false);
              }}
            >
              Generate
            </Button>
          </div>
        </div>
      )}
      {InpaintingPromptDrawImage && (
        <div className="mt-4 mb-4 ">
          <div className="bg-black w-full h-[200px]"></div>
          <div className="flex justify-center items-center gap-3">
            <Button
              className="rounded-full w-[100px] flex items-center justify-center my-2 py-1 text-white font-normal"
              onClick={() => {
                setInpaintingPromptDrawImage(false);
                setInpaintingPromptDraw(true);
              }}
            >
              Back
            </Button>
            <Button className="rounded-full p-1 w-[37px] h-[37px]   flex items-center justify-center text-white font-normal">
              <Image
                src={`${IMAGE_URL}/assets/images/brand/retryIcon.png`}
                width={16}
                height={16}
                alt="bg icon"
              />
            </Button>
            <Button className="rounded-full w-[100px] flex items-center justify-center my-2 py-1 text-white font-normal">
              Apply
            </Button>
          </div>
        </div>
      )}
      {InpaintingPromptEraseImage && (
        <div className="mt-4 mb-4 ">
          <div className="bg-black w-full h-[200px]"></div>
          <div className="flex justify-center items-center gap-3">
            <Button
              className="rounded-full w-[100px] flex items-center justify-center my-2 py-1 text-white font-normal"
              onClick={() => {
                setInpaintingPromptEraseImage(false);
                setInpaintingPromptErase(true);
              }}
            >
              Back
            </Button>
            <Button className="rounded-full p-1 w-[37px] h-[37px]  flex items-center justify-center text-white font-normal ">
              <Image
                src={`${IMAGE_URL}/assets/images/brand/retryIcon.png`}
                width={16}
                height={16}
                alt="bg icon"
              />
            </Button>
            <Button className="rounded-full w-[100px] flex items-center justify-center my-2 py-1 text-white font-normal">
              Apply
            </Button>
          </div>
        </div>
      )}
      {imageNotSelectedbgRem ? (
        <Modal
          isOpen={imageNotSelectedbgRem}
          style={updatePassStyle}
          onRequestClose={() => setimageNotSelectedbgRem(false)}
          ariaHideApp={false}
        >
          <div className="flex text-[20px] justify-center items-center text-nyx-yellow ">
            <p>Please select an Image!</p>
          </div>
          <div className="flex flex-row  justify-center items-center gap-2 px-2 mt-6">
            <Button
              className="rounded-full  text-nyx-yellow hover:bg-transprent  hover:text-none font-semibold"
              onClick={() => {
                setimageNotSelectedbgRem(false);
              }}
            >
              Continue
            </Button>
          </div>
        </Modal>
      ) : null}
    </>
  );
});
