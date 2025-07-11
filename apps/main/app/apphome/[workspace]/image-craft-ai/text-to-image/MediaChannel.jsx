/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  BRAND_TABS,
  SOCIAL_MEDIA,
  IMAGE_SIZE,
  INSTAGRAM_IMAGE_SIZE,
  FACEBOOK_IMAGE_SIZE,
  TWITTER_IMAGE_SIZE,
  LINKEDIN_IMAGE_SIZE,
  PINTREST_IMAGE_SIZE,
} from "@nyx-frontend/main/utils/productConstants";
import Button from "@nyx-frontend/main/components/Button";
import { addCampaignService } from "@nyx-frontend/main/services/brandService";
import { useMutation } from "@tanstack/react-query";
import { popupHeader2 } from "@nyx-frontend/main/utils/modalstyles";
import { BrandImageGenerationContext } from "@nyx-frontend/main/hooks/BrandImageGenerationContext";
import { MessagePopupContext } from "@nyx-frontend/main/hooks/MessagePopupContext";
import ArrowIcon from "./_components/ArrowIcon";
import classNames from "@nyx-frontend/main/utils/classNames";
import DisabledButton from "./_components/DisbaledButton";
import MediaBoxes from "./_components/MediaBoxes";
import ButtonLoading from "@nyx-frontend/main/components/ButtonLoading";
import "@nyx-frontend/main/app/_components/toastifyTest/toastify.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const Media = ({
  campignapidata,
  callCampaignApiAtMedia,
  mediaSubmitClick,
  brandDetails,
}) => {
  const [activeBox, setActiveBox] = useState(null);
  const [platformType, setPlatformType] = useState(null);

  /**
   * Use Context
   */
  const { tab, setBrandTab } = useContext(BrandImageGenerationContext);
  const { displayMessagePopup } = useContext(MessagePopupContext);
  const isActive = tab === BRAND_TABS.MEDIA;

  useEffect(() => {
    setActiveBox(null);
    setPlatformType(null);
  }, [brandDetails]);

  const mutateAddMedia = useMutation({
    mutationKey: ["add-media"],
    mutationFn: addCampaignService,
  });

  const onSocialMediaHandler = (value) => {
    if (!platformType) {
      setPlatformType(value);
    } else {
      setPlatformType(null);
    }
  };

  const mediaNextButtonClick = () => {
    mediaSubmitClick();
    if (activeBox.diamension) {
      const payload = {
        name: campignapidata?.campaign?.name,
        brand_id: campignapidata?.campaign?.brand_id,
        objective: campignapidata?.campaign?.objective,
        product_ids: campignapidata?.campaign?.product_ids,
        target_group_ids: campignapidata?.campaign?.target_group_ids,
        ad_platform: platformType?.value,
        creative_type: activeBox?.diamension,
        workspace_id: Number(localStorage.getItem("workspace_id")),
      };
      mutateAddMedia.mutate(payload, {
        onSuccess: (response) => {
          callCampaignApiAtMedia(response);
          setBrandTab(BRAND_TABS.CREATIVE);
        },
        onError: (errorResponse) => {
          console.log(errorResponse.message);
        },
      });
    } else {
      (function () {
        const warning = () => {
          toast.warn(
            <>
              <span className="text-white text-[16px] leading-[20px]">
                {" "}
                Missing Deatils!
              </span>
              <br />
              <span className="text-white text-[12px] leading-[18px] truncate2lines mt-2">
                {" "}
                Please provide the brand name.
              </span>
            </>,
            { autoClose: 5000 }
          );
        };

        warning(); // Invoke the Warning function immediately
      })();
    }
  };

  const onExpandHandler = () => {
    if (campignapidata) {
      if (tab !== BRAND_TABS.MEDIA) {
        setBrandTab(BRAND_TABS.MEDIA);
      } else {
        setBrandTab("");
      }
    } else {
      (function () {
        const error = () => {
          toast.warn(
            <>
              <span className="text-white text-[16px] leading-[20px]">
                {" "}
                Bad Request!
              </span>
              <br />
              <span className="text-white text-[12px] leading-[18px] truncate2lines mt-2">
                {" "}
                Please create a campaign and click next.
              </span>
            </>,
            { autoClose: 5000 }
          );
        };

        error(); // Invoke the Warning function immediately
      })();
    }
  };

  const onSelectHandler = (item) => {
    setActiveBox(item);
  };

  return (
    <>
      <div
        className={classNames(
          `rounded-lg`,
          isActive ? "bg-[#332270]" : "bg-[#23145A]"
        )}
      >
        <h2 className="mb-0">
          <div
            className="group relative flex w-full items-center border-0 px-5 py-4 text-left text-base cursor-pointer text-white rounded-lg"
            onClick={() => onExpandHandler()}
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            <div className="flex w-full justify-between items-center">
              <div
                className={classNames(
                  "w-[50%] md:w-full font-bold flex",
                  isActive ? "text-nyx-yellow text-xl" : "text-white text-sm"
                )}
              >
                Image Sizes{" "}
              </div>
            </div>

            <span
              className={classNames(
                "ml-auto h-5 w-5 shrink-0 transition-transform duration-200 ease-in-out motion-reduce:transition-none",
                isActive ? `rotate-[-180deg] -mr-1` : `dark:fill-white`
              )}
            >
              <ArrowIcon className="h-6 w-6" />
            </span>
          </div>
        </h2>
        <motion.div
          initial={{
            height: 0,
            opacity: 0,
          }}
          animate={{
            height: isActive ? "auto" : 0,
            opacity: 1,
          }}
          exit={{
            height: 0,
            opacity: 0,
          }}
          className="w-full overflow-hidden rounded-lg"
        >
          <div className="py-2 md:px-5 sm:px-4">
            <div className="flex flex-col gap-5">
              {/*
              <div className="w-full flex flex-col gap-4">
                <div style={popupHeader2}>Social Media Creatives</div>

                <div className="flex flex-wrap w-full gap-3">
                  {SOCIAL_MEDIA?.map((socialMediaLogo) => (
                    <button
                      key={socialMediaLogo?.id}
                      className={classNames(
                        "w-[60px] h-[60px] rounded-xl flex justify-center items-center p-1 hover:shadow-gray-800 shadow-none hover:shadow-lg",
                        platformType?.id === socialMediaLogo.id
                          ? "bg-[#5E32FF]"
                          : "bg-[#6653B4]"
                      )}
                      onClick={() => onSocialMediaHandler(socialMediaLogo)}
                    >
                      <img
                        src={socialMediaLogo?.imgsrc}
                        alt={socialMediaLogo?.value}
                      />
                    </button>
                  ))}
                </div>
              </div>
              */}
              {platformType?.value && (
                <div className="w-full flex flex-col gap-4">
                  <div style={popupHeader2}>
                    {String(platformType?.value).charAt(0).toUpperCase() +
                      String(platformType?.value).slice(1)}{" "}
                    Sizes
                  </div>
                  <div className="flex flex-wrap w-full items-end gap-2">
                    {platformType?.value === "instagram" && (
                      <MediaBoxes
                        boxes={INSTAGRAM_IMAGE_SIZE}
                        active={activeBox}
                        onClick={onSelectHandler}
                        name="instagram"
                      />
                    )}
                    {platformType?.value === "facebook" && (
                      <MediaBoxes
                        boxes={FACEBOOK_IMAGE_SIZE}
                        active={activeBox}
                        onClick={onSelectHandler}
                        name="facebook"
                      />
                    )}
                    {platformType?.value === "linkedin" && (
                      <MediaBoxes
                        boxes={LINKEDIN_IMAGE_SIZE}
                        active={activeBox}
                        onClick={onSelectHandler}
                        name="linkedin"
                      />
                    )}
                    {platformType?.value === "twitter" && (
                      <MediaBoxes
                        boxes={TWITTER_IMAGE_SIZE}
                        active={activeBox}
                        onClick={onSelectHandler}
                        name="twitter"
                      />
                    )}
                    {platformType?.value === "pinterest" && (
                      <MediaBoxes
                        boxes={PINTREST_IMAGE_SIZE}
                        active={activeBox}
                        onClick={onSelectHandler}
                        name="pinterest"
                      />
                    )}
                  </div>
                </div>
              )}

              <div className="w-full flex flex-col gap-4">
                {/* <div style={popupHeader2}>Others</div> */}
                <div className="flex flex-wrap w-full items-end gap-2">
                  <MediaBoxes
                    boxes={IMAGE_SIZE}
                    active={activeBox}
                    onClick={onSelectHandler}
                    name="others"
                  />
                </div>
              </div>
              <div className="w-full flex justify-center items-center gap-3 my-5">
                {activeBox?.diamension ? (
                  <Button
                    className="rounded-full w-[109px] hover:shadow-none font-semibold py-1.5 text-nyx-yellow"
                    onClick={mediaNextButtonClick}
                  >
                    {mutateAddMedia.isPending ? <ButtonLoading /> : "Next"}
                  </Button>
                ) : (
                  <DisabledButton>Next</DisabledButton>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Media;