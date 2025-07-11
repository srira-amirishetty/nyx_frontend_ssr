/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import { Slider } from "rsuite";
import { BRAND_TABS_Three } from "@nyx-frontend/main/utils/productConstants";
import Button from "@nyx-frontend/main/components/Button";
import { CreativesTab } from "@nyx-frontend/main/shared/inputs";
import {
  VIDEO_CREATIVES_TABS,
  WRITING_STYLES,
} from "@nyx-frontend/main/utils/utils";
import { toast } from "react-toastify";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  updateTextToVideo,
  getCampaignWithId,
} from "@nyx-frontend/main/services/videoGenerationServices";
import { scriptGeneration } from "@nyx-frontend/main/services/videoGenerationServices";
import { MessagePopupContext } from "@nyx-frontend/main/hooks/MessagePopupContext";
import "rsuite/Slider/styles/index.css";
import "rsuite/RangeSlider/styles/index.css";
import "./rsuitetextVid.css";
import ButtonLoading from "./ButtonLoading";
import "react-toastify/dist/ReactToastify.css";
import "@nyx-frontend/main/app/_components/toastifyTest/toastify.css";

const CreativeType = ({
  tab,
  setBrandTab,
  campaignId,
  campaignDone,
  settingCreativeDone,
  targetGrp,
  brandDetails,
  settingLongScript,
  setPrompt,
  settingDuration,
  productDis,
  productName,
}) => {
  const [creativeTabState, setCreativeTabState] = useState(0);
  const [cameraTab, setCameraTab] = useState("");
  const [btnVal, setBtnVal] = useState("");
  const [RangeSliderValue, setRangeSliderValue] = useState(10);
  const [aiVal, setAiVal] = useState("");
  const [ownVal, setOwnVal] = useState("");
  const [inputText, setInputText] = useState("");
  const [inputText1, setInputText1] = useState("");
  const [inputTextOwn, setInputTextOwn] = useState("");
  const [longScript, setLongScript] = useState("");
  const [AiScript, setAIScript] = useState(false);
  const [checkAiVal, setCheckAIVal] = useState("");
  const [RangeSliderValue2, setRangeSliderValue2] = useState(0);

  const handleChange = (event) => {
    // if (event.target.value.length <= 500) {
    //   setInputText(event.target.value);
    //   setOwnVal(event.target.value);
    // }
    const newText = event.target.value;

    if (newText.length <= 500) {
      setInputText(newText);
    } else {
      // If the input exceeds 500 characters, truncate it to 500 characters
      setInputText(newText.substring(0, 500));
    }
  };

  function calculateScriptDuration(text) {
    const textWithoutNewlines = text.replace(/\n/g, "");

    const alphabeticText = textWithoutNewlines.replace(/[^a-zA-Z]/g, "");

    const numOfCharacters = alphabeticText.length;

    const readingTimeInSeconds = numOfCharacters / 14;

    const wholeReadingTime = Math.ceil(readingTimeInSeconds);

    setRangeSliderValue2(wholeReadingTime);
  }

  const {
    data: campaignDetails,
    refetch: refetchCampaign,
    isRefetching: campaignLoading,
    isFetching,
  } = useQuery({
    queryKey: ["get-campaign-details"],
    queryFn: () => {
      if (campaignId) {
        return getCampaignWithId(campaignId);
      }
      return null;
    },
    enabled: false,
  });

  const handleChangeOwn = (event) => {
    if (event.target.value.length <= 500) {
      setInputTextOwn(event.target.value);
      calculateScriptDuration(event.target.value);
    } else {
      setInputTextOwn(event.target.value.substring(0, 500));
      calculateScriptDuration(event.target.value.substring(0, 500));
    }
  };

  useEffect(() => {
    setInputText("");
    setBtnVal("");
    setInputText1("");
    setInputTextOwn("");
    setAiVal("");
    setCreativeTabState(0);
    settingLongScript("");
  }, [brandDetails]);

  useEffect(() => {
    setInputText("");
    setBtnVal("");
    setInputText1("");
    setAIScript(false);
    setAiVal("");
    setCreativeTabState(0);
  }, [campaignId]);

  const handleChange1 = (event) => {
    if (event.target.value.length <= 500) {
      setInputText1(event.target.value);
      setAi(event.target.value);
    } else {
      setInputText1(event.target.value.substring(0, 500));
      setAi(event.target.value.substring(0, 500));
    }
  };

  const nextToVideoSett = async () => {
    if (creativeTabState == 0) {
      if (inputText == "") {
        toast.error(
          <>
            <span className="text-white text-[20px]">Bad Request</span>
            <br />
            <span className="text-white text-[16px]">
              Please fill the Generative AI script
            </span>
            <br />
          </>,
          { autoClose: 5000 }
        );
      } else {
        const data = {
          script: inputText,
        };
        const args = { campaignId, data };

        updateCampaign2.mutate(args, {
          onSuccess: () => {
            setBrandTab(BRAND_TABS_Three.MEDIA);

            settingCreativeDone(true);
          },
          onError: (res) => {
            toast.error(
              <>
                <span className="text-white text-[20px]">Bad Request</span>
                <br />
                <span className="text-white text-[16px]">
                  {res?.response?.data?.message}
                </span>
                <br />
              </>,
              { autoClose: 5000 }
            );
          },
        });
      }
    } else {
      if (inputTextOwn !== "") {
        const { data: details } = await refetchCampaign();

        const data = {
          BrandInfo: {
            BrandName: brandDetails?.brand_name,
            BrandDescription: brandDetails?.description,
            BrandCategory: brandDetails?.cat_name,
            TargetGroup: targetGrp.map((targetGroup) => ({
              age: targetGroup.age_group,
              region: targetGroup.region,
              gender: targetGroup.gender,
            })),
            Product: {
              Name: productName,
              Description: productDis,
            },
            Campaign: {
              Name: details?.name,
              Description: details?.objective,
            },
          },
          Script: {
            UserPrompt: inputTextOwn,
            VideoDuration: RangeSliderValue2.toString(),
            is_ai: false,
            WritingStyle: null,
          },
        };

        console.log(data);

        mutateScriptGeneration.mutate(data, {
          onSuccess: (response) => {
            const data = {
              script: response?.Audio_Script,
            };
            const args = { campaignId, data };

            updateCampaign2.mutate(args, {
              onSuccess: () => {
                setBrandTab(BRAND_TABS_Three.MEDIA);
                settingDuration(RangeSliderValue2.toString());
                settingCreativeDone(true);
              },
              onError: (res) => {
                console.log(res);
                toast.error(
                  <>
                    <span className="text-white text-[20px]">Bad Request</span>
                    <br />
                    <span className="text-white text-[16px]">
                      {res?.response?.data?.message}
                    </span>
                    <br />
                  </>,
                  { autoClose: 5000 }
                );
              },
            });
            settingLongScript(response?.Image_Script);
          },
          onError: (res) => {
            toast.error(
              <>
                <span className="text-white text-[20px]">Bad Request</span>
                <br />
                <span className="text-white text-[16px]">
                  {res?.response?.data?.message}
                </span>
                <br />
              </>,
              { autoClose: 5000 }
            );
          },
        });
      }
    }
  };

  const nextToVideoSett1 = async () => {
    const { data: details } = await refetchCampaign();

    if (btnVal != "" && aiVal != "") {
      const data = {
        BrandInfo: {
          BrandName: brandDetails?.brand_name,
          BrandDescription: brandDetails?.description,
          BrandCategory: brandDetails?.cat_name,
          TargetGroup: targetGrp.map((targetGroup) => ({
            age: targetGroup.age_group,
            region: targetGroup.region,
            gender: targetGroup.gender,
          })),
          Product: {
            Name: productName,
            Description: productDis,
          },
          Campaign: {
            Name: details?.name,
            Description: details?.objective,
          },
        },
        Script: {
          UserPrompt: aiVal,
          VideoDuration: RangeSliderValue.toString(),
          is_ai: true,
          WritingStyle: btnVal,
        },
      };

      console.log(data);

      mutateScriptGeneration.mutate(data, {
        onSuccess: async (response) => {
          var modifiedText = response?.Audio_Script?.replace(/(\\n)/g, "");
          setInputText(modifiedText);
          setCheckAIVal(modifiedText);
          settingLongScript(response?.Image_Script);
          // setAIScript(true);
          settingDuration(RangeSliderValue.toString());

          await new Promise((resolve) => setTimeout(resolve, 0));

          if (!modifiedText) {
            toast.error(
              <>
                <span className="text-white text-[20px]">Bad Request</span>
                <br />
                <span className="text-white text-[16px]">
                  Please fill the Generative AI script
                </span>
                <br />
              </>,
              { autoClose: 5000 }
            );
            return;
          }

          const requestData = {
            script: modifiedText,
          };
          const args = { campaignId, data: requestData };

          updateCampaign2.mutate(args, {
            onSuccess: () => {
              setBrandTab(BRAND_TABS_Three.MEDIA);
              settingCreativeDone(true);
            },
            onError: (res) => {
              toast.error(
                <>
                  <span className="text-white text-[20px]">Bad Request</span>
                  <br />
                  <span className="text-white text-[16px]">
                    {res?.response?.data?.message}
                  </span>
                  <br />
                </>,
                { autoClose: 5000 }
              );
            },
          });
        },
        onError: (res) => {
          (function () {
            const error = () => {
              // Store the toastId to control this specific toast later
              const toastId = toast.error(
                <>
                  <span className="text-white text-[20px]">Bad Request</span>
                  <br />
                  <span className="text-white text-[16px]">
                    {res?.response?.data?.message}
                  </span>
                  <br />
                </>,
                { autoClose: 5000 }
              );
            };

            error(); // Invoke the error function immediately
          })();
          console.log(res);
        },
      });
    }
  };

  const mutateScriptGeneration = useMutation({
    mutationKey: ["Scriptgenerate"],
    mutationFn: scriptGeneration,
  });

  const setAi = (val) => {
    setAiVal(val);
  };

  const updateCampaign2 = useMutation({
    mutationKey: ["Update-campaign2"],
    mutationFn: updateTextToVideo,
  });

  const handleTab = () => {
    if (campaignDone) {
      if (tab !== BRAND_TABS_Three.CREATIVE) {
        setBrandTab(BRAND_TABS_Three.CREATIVE);
      } else {
        setBrandTab("");
      }
    } else {
      toast.warn(
        <>
          <span className="text-white text-[20px]"> Campaign Missing!</span>
          <br />
          <span className="text-white text-[16px]">
            {" "}
            Please complete Campaign first and Click on Save.
          </span>
        </>,
        { autoClose: 5000 }
      );
    }
  };

  const handleBtn = (val) => {
    if (val == btnVal) {
      setBtnVal("");
    } else {
      setBtnVal(val);
    }
  };
  const { displayMessagePopup } = useContext(MessagePopupContext);
  return (
    <>
      <div className={`${tab === BRAND_TABS_Three.CREATIVE?  "bg-[#332270]":"bg-[#23145A]"} rounded-lg`}>
        <h2 className="mb-0">
          <div
            className={`${
              tab === BRAND_TABS_Three.CREATIVE
            } group relative flex w-full items-center border-0 px-5 py-4 text-left text-base cursor-pointer  text-[#FFFFFF] rounded-lg`}
            onClick={handleTab}
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            <div className="flex w-full justify-between items-center">
              <div
                className={`w-[50%] md:w-full font-semibold flex ${
                  tab === BRAND_TABS_Three.CREATIVE
                    ? "text-[#FFCB54] text-lg"
                    : "text-[#FFFFFF] text-sm"
                }`}
              >
                Script{" "}
              </div>
            </div>

            <span
              className={`${
                tab === BRAND_TABS_Three.CREATIVE
                  ? `rotate-[-180deg] -mr-1`
                  : `dark:fill-white`
              } ml-auto h-5 w-5 shrink-0 transition-transform duration-200 ease-in-out motion-reduce:transition-none`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </span>
          </div>
        </h2>
        <motion.div
          initial={{
            height: 0,
            opacity: 0,
          }}
          animate={{
            height: tab === BRAND_TABS_Three.CREATIVE ? "auto" : 0,
            opacity: 1,
          }}
          exit={{
            height: 0,
            opacity: 0,
          }}
          className={clsx(` w-full overflow-hidden rounded-lg`)}
        >
          <div className="py-2 md:px-7 sm:px-4">
            <div className="flex flex-col gap-5">
              <div className="w-full">
                <CreativesTab
                  data={VIDEO_CREATIVES_TABS}
                  tabState={setCreativeTabState}
                  tabStatus={creativeTabState}
                />
              </div>
              <div className="w-full">
                {creativeTabState === 0 && (
                  <>
                    {AiScript == false ? (
                      <>
                        <div className="w-full">
                          <div className="mb-3">
                            <textarea
                              value={inputText1}
                              placeholder={`Enter text (max ${500} characters)`}
                              onChange={handleChange1}
                              rows={5} // Adjust the number of rows as needed
                              className={`w-full h-[84px}] bg-transparent py-[20px] px-[23px]  border border-solid outline-none rounded-lg placeholder:italic text-white focus:placeholder-transparent`}
                            />
                          </div>

                          <div>
                            <p className="text-sm font-bold my-2 text-white">
                              Writing Style{" "}
                              <span className="text-[#a21f44]">*</span>{" "}
                            </p>
                            <div className="flex flex-wrap gap-2.5 font-medium mt-3">
                              {WRITING_STYLES.map((item, index) => (
                                <div
                                  className={`${
                                    btnVal == item.name
                                      ? ` py-[10px] px-[14px] cursor-pointer rounded-[4px]   hover:text-white  bg-[#5E32FF] text-white`
                                      : `py-[10px] px-[14px] cursor-pointer rounded-[4px] bg-[#1D1138] text-white `
                                  }`}
                                  key={index}
                                  onClick={() => handleBtn(item.name)}
                                >
                                  {item.name}
                                </div>
                              ))}
                            </div>
                            <p className="mt-5 text-sm font-bold my-2 text-white">
                              Duration (Approx.){" "}
                              <span className="text-[#a21f44]">*</span>{" "}
                            </p>

                            <Slider
                              progress
                              min={0}
                              max={15}
                              defaultValue={10}
                              value={RangeSliderValue}
                              onChange={(value) => {
                                setRangeSliderValue(value);
                              }}
                              className="mt-5 mb-3 duration"
                            />
                            <div className="flex justify-between items-center">
                              <p
                                className="text-[#8297BD] text-xs font-medium"
                                id="rangeValue"
                              >
                                {RangeSliderValue} Sec
                              </p>
                              <p className="text-[#8297BD] text-xs font-medium">
                                15 Sec
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="w-full flex justify-center items-center gap-3 my-4">
                          <Button
                            className={` font-semibold  disabled:cursor-not-allowed disabled:bg-nyx-gray-1 disabled:border-none w-52 ${
                              btnVal != "" && aiVal != ""
                                ? " rounded-full  text-nyx-yellow hover:bg-nyx-yellow hover:shadow-none focus:shadow-glow focus:bg-nyx-yellow focus:text-black"
                                : " hover:cursor-not-allowed rounded-full  hover:shadow-none  hover:bg-nyx-gray-1 hover:text-black  text-black  bg-nyx-gray-1 border-none "
                            }`}
                            onClick={nextToVideoSett1}
                            disabled={
                              mutateScriptGeneration.isPending ||
                              campaignLoading ||
                              isFetching
                            }
                          >
                            {mutateScriptGeneration.isPending ||
                            campaignLoading ||
                            isFetching ? (
                              <ButtonLoading />
                            ) : (
                              "Generate with AI"
                            )}
                          </Button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="w-full flex flex-col gap-3">
                          <div>
                            <textarea
                              value={inputText}
                              placeholder={`Enter text (max ${500} characters)`}
                              onChange={handleChange}
                              rows={5} // Adjust the number of rows as needed
                              className={`w-full h-[84px}] bg-transparent py-[20px] px-[23px] text-[#8297BD] border border-solid outline-none rounded-lg placeholder:italic`}
                            />

                            <div className="flex flex-row justify-between">
                              {inputText !== checkAiVal ? (
                                <div>
                                  <p className=" text-white  opacity-40 italic text-xs ">
                                    Changing prompt may affect your video
                                    duration
                                  </p>
                                </div>
                              ) : (
                                <div></div>
                              )}

                              <div>
                                <p
                                  className={`text-xs ${
                                    inputText.length >= 500
                                      ? " text-red-600"
                                      : "text-[#8297BD]"
                                  }`}
                                >
                                  {inputText.length} /{500}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="w-full flex justify-center items-center gap-3 my-6">
                          <Button
                            className="rounded-full w-32  text-nyx-yellow font-semibold focus:text-black hover:shadow-none focus:shadow-glow focus:bg-nyx-yellow"
                            onClick={() => setAIScript(false)}
                          >
                            Retry
                          </Button>
                          <Button
                            className={`" text-nyx-yellow rounded-full w-32 font-semibold hover:bg-nyx-yellow hover:shadow-none focus:shadow-glow  focus:bg-nyx-yellow focus:text-black" ${
                              updateCampaign2.isPending &&
                              "   bg-nyx-gray-1 hover:bg-nyx-gray-1 border-none"
                            }  disabled:cursor-not-allowed`}
                            onClick={nextToVideoSett}
                            disabled={updateCampaign2.isPending}
                          >
                            {updateCampaign2.isPending ? (
                              <ButtonLoading />
                            ) : (
                              "Next"
                            )}
                          </Button>
                        </div>
                      </>
                    )}
                  </>
                )}
                {creativeTabState === 1 && (
                  <>
                    <div className="w-full flex flex-col gap-3">
                      <div>
                        <textarea
                          value={inputTextOwn}
                          placeholder={`Enter text (max ${500} characters)`}
                          onChange={handleChangeOwn}
                          rows={5} // Adjust the number of rows as needed
                          className={`w-full h-[84px}] bg-transparent py-[20px] px-[23px] text-white border border-solid outline-none rounded-lg placeholder:italic focus:placeholder-transparent`}
                        />
                        <p
                          className={` text-end text-xs ${
                            inputTextOwn.length >= 500
                              ? "text-red-600"
                              : "text-[#8297BD]"
                          }`}
                        >
                          {inputTextOwn.length} /{500}
                        </p>
                      </div>
                      <Slider
                        readOnly
                        progress
                        min={0}
                        max={25}
                        defaultValue={0}
                        value={RangeSliderValue2}
                        className="mt-5 mb-3 duration "
                      />

                      <p
                        className="text-[#8297BD] text-xs font-medium"
                        id="rangeValue"
                      >
                        {RangeSliderValue2} Sec
                      </p>
                    </div>
                    <div className="w-full flex justify-center items-center gap-3 my-4">
                      <Button
                        className={`rounded-full w-32 ${
                          inputTextOwn == ""
                            ? "hover:cursor-not-allowed rounded-full   hover:shadow-none  hover:bg-nyx-gray-1 hover:text-black  text-black  font-semibold  bg-nyx-gray-1 border-none"
                            : " text-nyx-yellow font-semibold hover:bg-nyx-yellow hover:shadow-none focus:shadow-glow  focus:bg-nyx-yellow focus:text-black"
                        } ${
                          (updateCampaign2.isPending ||
                            mutateScriptGeneration.isPending ||
                            campaignLoading ||
                            isFetching) &&
                          " bg-nyx-gray-1 hover:bg-nyx-gray-1 border-none"
                        } disabled:cursor-not-allowed`}
                        onClick={nextToVideoSett}
                        disabled={
                          updateCampaign2.isPending ||
                          mutateScriptGeneration.isPending ||
                          campaignLoading ||
                          isFetching
                        }
                      >
                        {updateCampaign2.isPending ||
                        mutateScriptGeneration.isPending ||
                        campaignLoading ||
                        isFetching ? (
                          <ButtonLoading />
                        ) : (
                          "Next"
                        )}
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default CreativeType;
