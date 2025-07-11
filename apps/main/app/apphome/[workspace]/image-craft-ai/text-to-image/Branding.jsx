/* eslint-disable react-hooks/exhaustive-deps */
import { motion } from "framer-motion";
import classNames from "@nyx-frontend/main/utils/classNames";
import { BRAND_TABS } from "@nyx-frontend/main/utils/productConstants";
import Button from "@nyx-frontend/main/components/Button";
import { useQuery } from "@tanstack/react-query";
import {
  getbrandService,
  getbrandWorkspaceService,
} from "@nyx-frontend/main/services/brandService";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BrandImageGenerationContext } from "@nyx-frontend/main/hooks/BrandImageGenerationContext";
import { useImageUrls } from "./_store/store";
import ArrowIcon from "./_components/ArrowIcon";
import DisabledButton from "./_components/DisbaledButton";
import BrandingChip from "./_components/BrandingChip";
import { removeStorage, saveRedirectStorage } from "@nyx-frontend/main/utils/userUtils";
import ButtonLoading from "@nyx-frontend/main/components/ButtonLoading";
import { ToastContainer } from "react-toastify";
import "@nyx-frontend/main/app/_components/toastifyTest/toastify.css";
import "react-toastify/dist/ReactToastify.css";

const Branding = ({ selectedBrandFromBranding, brandSubmitClick }) => {
  const router = useRouter();
  const [selectbrandid, setselectbrandid] = useState(null);
  const [userBrandClick, setUserBrandClick] = useState(false);
  const [userBrandClickIndex, setuserBrandClickIndex] = useState(null);
  const resetImageUrl = useImageUrls((state) => state.resetImageUrl);
  /**
   * Use Context
   */
  const { tab, setBrandTab, setDataFromCreative } = useContext(
    BrandImageGenerationContext,
  );

  const userSelectedBrand = (id, index) => {
    setselectbrandid(id);
    setUserBrandClick(true);
    setuserBrandClickIndex(index);
  };

  const {
    data: brandDetails,
    error: brandDetailError,
    isPending: brandPending,
  } = useQuery({
    queryKey: ["get-brands"],
    queryFn: async () =>
      await getbrandWorkspaceService(localStorage.getItem("workspace_id")),
  });

  // if (brandDetailError && brandDetailError.response.status === 401) {
  //   removeStorage().finally(async () => {
  //     await saveRedirectStorage(window.location.pathname);
  //     router.push("/apphome/login");
  //   });
  //   return <></>;
  // }

  const clickonbrand = (id) => {
    router.push(
      `/apphome/${localStorage.getItem("workspace_name")}/onboarding-new?brandid=${id}`,
    );
    // sessionStorage.setItem("brandid", id);
  };

  const onAddChipHandler = () => {
    router.push(
      `/apphome/${localStorage.getItem("workspace_name")}/onboarding-new`,
    );
    sessionStorage.removeItem("brandid");
  };

  const onNextHandler = () => {
    brandSubmitClick();
    if (selectbrandid !== null) {
      resetImageUrl();
      setDataFromCreative([]);
      selectedBrandFromBranding(selectbrandid);
      setBrandTab(BRAND_TABS.CAMPAIGN);
    } else {
      (function () {
        const warning = () => {
          
          toast.warn(
            <>
              <span className="text-white text-[16px] leading-[20px]">
                {" "}
                Please select a Brand.!
              </span>
              <br />
              <span className="text-white text-[12px] leading-[18px] truncate2lines mt-2">
                {" "}
                Please choose a brand and click next.
              </span>
            </>,
            { autoClose: 5000 },
          );
        };

        warning(); // Invoke the Warning function immediately
      })();
    }
  };

  const onExpandHandler = () => {
    if (tab !== BRAND_TABS.BRANDING) {
      setBrandTab(BRAND_TABS.BRANDING);
    } else {
      setBrandTab("");
    }
  };

  const isActiveTab = tab === BRAND_TABS.BRANDING;

  return (
    <>
      <div className={classNames(`rounded-lg`,isActiveTab?"bg-[#332270]":"bg-[#23145A]")}>
        <h2 className="mb-0">
          <div
            className={classNames(
              `group relative flex w-full items-center border-0 px-5 py-4 text-left text-base cursor-pointer text-white rounded-lg`,
            )}
            onClick={() => onExpandHandler()}
            aria-expanded={"true"}
            aria-controls="collapseOne"
          >
            <div className="flex w-full justify-between items-center">
              <div
                className={classNames(
                  `w-[50%] md:w-full flex font-bold`,
                  isActiveTab
                    ? "text-nyx-yellow text-xl "
                    : "text-white text-sm",
                )}
              >
                Branding Details
                <div
                  className={classNames(
                    `font-normal pl-1 text-nyx-yellow`,
                    isActiveTab ? "hidden" : "block",
                  )}
                >
                  {" "}
                  - (Start New)
                </div>
              </div>
            </div>

            <span
              className={classNames(
                "ml-auto h-5 w-5 shrink-0 transition-transform duration-200 ease-in-out motion-reduce:transition-none",
                isActiveTab ? `rotate-[-180deg] -mr-1` : `dark:fill-white`,
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
            height: isActiveTab ? "auto" : 0,
            opacity: 1,
          }}
          exit={{
            height: 0,
            opacity: 0,
          }}
          className=" w-full overflow-hidden rounded-lg"
        >
          <div className="py-2 md:px-5 sm:px-4">
            <div className="flex flex-col">
              <div className="text-white text-sm font-bold leading-10">
                Choose the Brand <span className="text-[#D13946]">*</span>
              </div>
              <div className="w-full flex flex-wrap gap-2">
                {brandPending ? (
                  <svg
                    width="25"
                    height="25"
                    className="inline text-gray-200 text-center animate-spin dark:text-transparent"
                    viewBox="0 0 25 25"
                    fill="white"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 22.5C10.6333 22.5 9.34167 22.2375 8.125 21.7125C6.90833 21.1875 5.84583 20.4708 4.9375 19.5625C4.02917 18.6542 3.3125 17.5917 2.7875 16.375C2.2625 15.1583 2 13.8667 2 12.5C2 11.1167 2.2625 9.82083 2.7875 8.6125C3.3125 7.40417 4.02917 6.34583 4.9375 5.4375C5.84583 4.52917 6.90833 3.8125 8.125 3.2875C9.34167 2.7625 10.6333 2.5 12 2.5C12.2833 2.5 12.5208 2.59583 12.7125 2.7875C12.9042 2.97917 13 3.21667 13 3.5C13 3.78333 12.9042 4.02083 12.7125 4.2125C12.5208 4.40417 12.2833 4.5 12 4.5C9.78333 4.5 7.89583 5.27917 6.3375 6.8375C4.77917 8.39583 4 10.2833 4 12.5C4 14.7167 4.77917 16.6042 6.3375 18.1625C7.89583 19.7208 9.78333 20.5 12 20.5C14.2167 20.5 16.1042 19.7208 17.6625 18.1625C19.2208 16.6042 20 14.7167 20 12.5C20 12.2167 20.0958 11.9792 20.2875 11.7875C20.4792 11.5958 20.7167 11.5 21 11.5C21.2833 11.5 21.5208 11.5958 21.7125 11.7875C21.9042 11.9792 22 12.2167 22 12.5C22 13.8667 21.7375 15.1583 21.2125 16.375C20.6875 17.5917 19.9708 18.6542 19.0625 19.5625C18.1542 20.4708 17.0958 21.1875 15.8875 21.7125C14.6792 22.2375 13.3833 22.5 12 22.5Z" />
                  </svg>
                ) : (
                  brandDetails?.map((brand, index) => (
                    <BrandingChip
                      key={`brand-chip-${index}`}
                      index={index}
                      brand={brand}
                      isActive={userBrandClick && userBrandClickIndex === index}
                      onClick={userSelectedBrand}
                      onEdit={clickonbrand}
                    />
                  ))
                )}

                {brandDetails?.length == 0 ? (
                  <button
                    className="bg-[#1D1138] w-auto p-2 text-white rounded-md text-sm font-medium hover:shadow-gray-800 shadow-none hover:shadow-md"
                    onClick={onAddChipHandler}
                  >
                    + Add New
                  </button>
                ) : null}
              </div>
              <div className="w-full flex justify-center items-center mt-10 mb-5">
                {userBrandClick ? (
                  <Button
                    className="rounded-full w-[109px] text-nyx-yellow hover:shadow-none font-semibold py-1.5"
                    onClick={onNextHandler}
                  >
                    Next
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

export default Branding;
