import { motion } from "framer-motion";
import classNames from "@nyx-frontend/main/utils/classNames";
import { BRAND_TABS_Three } from "@nyx-frontend/main/utils/productConstants";
import Button from "@nyx-frontend/main/components/Button";
import { useQuery } from "@tanstack/react-query";
import {
  getbrandService,
  getbrandWorkspaceService,
} from "@nyx-frontend/main/services/brandService";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Branding = ({
  tab,
  setBrandTab,
  selectedBrandFromBranding,
  settingBrandDone,
}) => {
  const [selectbrandid, setselectbrandid] = useState(null);
  const router = useRouter();
  const [userBrandClick, setUserBrandClick] = useState(false);
  const [userBrandClickIndex, setuserBrandClickIndex] = useState(null);

  const userSelectedBrand = (id, index) => {
    setselectbrandid(id);
    setUserBrandClick(true);
    setuserBrandClickIndex(index);
  };

  const { data: brandDetails, isPending: brandPending } = useQuery({
    queryKey: ["get-brand2"],
    queryFn: () =>
      getbrandWorkspaceService(localStorage.getItem("workspace_id")),
  });

  const clickonbrand = (id) => {
    if (id) {
      // sessionStorage.setItem("brandid", id);
      router.push(
        `/apphome/${localStorage.getItem("workspace_name")}/onboarding-new?brandid=${id}`,
      );
    } else {
      sessionStorage.removeItem("brandid");
      router.push(
        `/apphome/${localStorage.getItem("workspace_name")}/onboarding-new`,
      );
    }
  };
  const clickonnextinbranding = () => {
    if (selectbrandid != null) {
      selectedBrandFromBranding(selectbrandid);
      setBrandTab(BRAND_TABS_Three.CAMPAIGN);
      settingBrandDone(true);
    }
  };

  return (
    <>
      <div className={`${tab === BRAND_TABS_Three.BRANDING?  "bg-[#332270]":"bg-[#23145A]"} rounded-lg`}>
        <h2 className="mb-0">
          <div
            className={`${
              tab === BRAND_TABS_Three.BRANDING
            } group relative flex w-full items-center border-0 px-5 py-4 text-left text-base cursor-pointer text-white rounded-lg`}
            onClick={() =>
              setBrandTab((prevTab) => {
                return prevTab !== BRAND_TABS_Three.BRANDING
                  ? BRAND_TABS_Three.BRANDING
                  : "";
              })
            }
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            <div className="flex w-full justify-between items-center">
              <div
                className={`w-[50%] md:w-full font-semibold flex ${
                  tab === BRAND_TABS_Three.BRANDING
                    ? "text-nyx-yellow  text-lg"
                    : "text-white text-sm"
                }`}
              >
                Brand Details
                <div
                  div
                  className={`font-normal pl-1 text-nyx-yellow ${
                    tab === BRAND_TABS_Three.BRANDING ? "hidden" : "block"
                  }`}
                >
                  {" "}
                  - (Start New)
                </div>
              </div>
            </div>

            <span
              className={`${
                tab === BRAND_TABS_Three.BRANDING
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
            height: tab === BRAND_TABS_Three.BRANDING ? "auto" : 0,
            opacity: 1,
          }}
          exit={{
            height: 0,
            opacity: 0,
          }}
          className={classNames(
            ` w-full overflow-hidden rounded-lg`,
          )}
        >
          <div className="py-2 md:px-7 sm:px-4">
            <div className="flex flex-col gap-3">
              <div className="text-white font-semibold  text-sm">
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
                    <button
                      key={index}
                      className={`group relative  w-auto p-2 rounded-md flex gap-2  cursor-pointer text-[#FFFFFF] hover:shadow-gray-800 shadow-none hover:shadow-md ${
                        userBrandClick && userBrandClickIndex === index
                          ? "bg-[#5E32FF] text-white"
                          : "bg-[#1D1138] text-[#FFFFFF]"
                      }`}
                      // onClick={()=>setselectbrandid(brand.id)}
                      onClick={() => userSelectedBrand(brand.id, index)}
                    >
                      <div className="text-xs w-full ml-1">
                        {brand.brand_name}
                      </div>
                      <div
                        className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 "
                        onClick={() => clickonbrand(brand.id)}
                      >
                        {userBrandClick && userBrandClickIndex === index ? (
                          <svg
                            width="12"
                            height="14"
                            viewBox="0 0 11 11"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M1.22222 9.77778H2.09306L8.06667 3.80417L7.19583 2.93333L1.22222 8.90694V9.77778ZM0 11V8.40278L8.06667 0.351389C8.18889 0.239352 8.32384 0.152778 8.47153 0.0916667C8.61921 0.0305556 8.77454 0 8.9375 0C9.10046 0 9.25833 0.0305556 9.41111 0.0916667C9.56389 0.152778 9.6963 0.244444 9.80833 0.366667L10.6486 1.22222C10.7708 1.33426 10.86 1.46667 10.916 1.61944C10.972 1.77222 11 1.925 11 2.07778C11 2.24074 10.972 2.39606 10.916 2.54375C10.86 2.69144 10.7708 2.82639 10.6486 2.94861L2.59722 11H0ZM7.62361 3.37639L7.19583 2.93333L8.06667 3.80417L7.62361 3.37639Z"
                              fill="white"
                            />
                          </svg>
                        ) : (
                          <svg
                            width="12"
                            height="14"
                            viewBox="0 0 11 11"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M1.22222 9.77778H2.09306L8.06667 3.80417L7.19583 2.93333L1.22222 8.90694V9.77778ZM0 11V8.40278L8.06667 0.351389C8.18889 0.239352 8.32384 0.152778 8.47153 0.0916667C8.61921 0.0305556 8.77454 0 8.9375 0C9.10046 0 9.25833 0.0305556 9.41111 0.0916667C9.56389 0.152778 9.6963 0.244444 9.80833 0.366667L10.6486 1.22222C10.7708 1.33426 10.86 1.46667 10.916 1.61944C10.972 1.77222 11 1.925 11 2.07778C11 2.24074 10.972 2.39606 10.916 2.54375C10.86 2.69144 10.7708 2.82639 10.6486 2.94861L2.59722 11H0ZM7.62361 3.37639L7.19583 2.93333L8.06667 3.80417L7.62361 3.37639Z"
                              fill="white"
                            />
                          </svg>
                        )}
                      </div>
                    </button>
                  ))
                )}

                {brandDetails?.length == 0 ? (
                  <button
                    className="bg-[#1F1D4D] w-auto p-2 text-white rounded-md text-xs"
                    onClick={() => clickonbrand()}
                  >
                    + Add New
                  </button>
                ) : null}
              </div>
              <div className="w-full flex justify-center items-center">
                <Button
                  className={` mt-6 mb-4  font-semibold ${
                    selectbrandid == null
                      ? " hover:cursor-not-allowed rounded-full w-32  hover:shadow-none hover:bg-nyx-gray-1 hover:text-black  text-black  bg-nyx-gray-1 border-none"
                      : " rounded-full w-32  text-nyx-yellow hover:shadow-none  focus:shadow-glow focus:bg-nyx-yellow focus:text-black"
                  }`}
                  onClick={clickonnextinbranding}
                >
                  Next
                </Button>
                {/* <button className="text-[#8297BD] border border-[#8297BD] px-3 py-2 round">Next</button> */}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Branding;
