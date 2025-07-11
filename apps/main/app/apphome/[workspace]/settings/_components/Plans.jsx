"use client";
import "../index.css";
import React, { useState } from "react";
import { getPackagesService } from "@nyx-frontend/main/services/productService";
import { PriceTabs } from "@nyx-frontend/main/shared/inputs";
import { PLAN_TABS } from "@nyx-frontend/main/utils/utils";
import { useMutation, useQuery } from "@tanstack/react-query";

const Plans = () => {
  const [planTab, setPlanTab] = useState(1);

  const {
    data: plandata,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["plan-data"],
    queryFn: getPackagesService,
  });

  return (
    <>
      <div className="plan_sec px-3 pt-[42px] md:pt-[72px] pb-20 md:py-[200px] md:px-[20px]">
        <div className="w-full flex justify-center items-center pb-[49px] md:pb-[58px]">
          <div
            className="flex justify-center items-center h-[43px] lg:h-[63px] w-max rounded-full "
            style={{
              background:
                "linear-gradient(180deg, rgba(255, 255, 255, 0.09) 0%, rgba(255, 255, 255, 0.09) 100%)",
            }}
          >
            <PriceTabs
              data={PLAN_TABS}
              tabState={setPlanTab}
              tabStatus={planTab}
            />
          </div>
        </div>

        {isLoading ? (
          <div className="w-full flex flex-col md:flex-row gap-5 justify-center">
            {/* <Loading />
              <Loading />
              <Loading />
              <Loading /> */}
            <h2>Loading...</h2>
          </div>
        ) : (
          <>
            {planTab === 0 && (
              <div className="w-full flex flex-col md:flex-row md:flex-wrap lg:flex-nowrap gap-5 justify-center lg_responsive">
                {plandata?.nyx_packages["Pre-defined"]
                  .filter(
                    (value) =>
                      // value.packageType === "Free" ||
                      value.packageType === "Monthly",
                  )
                  .map((item, index) => (
                    <div
                      key={index}
                      className="w-full md:w-[301px] h-auto rounded-2xl px-[16px] py-[42px] flex flex-row md:flex-col bg-[#3B226F] border-2 border-[#F1BB2E]"
                    >
                      <div className="w-full h-[43%] md:h-[36%] xl:h-[43%] flex flex-col pricing_upperPart">
                        <div className="w-full flex flex-col md:flex-row justify-between">
                          <div className="text-[#FFFFFF] text-[18px] md:text-[31px] font-[500]">
                            {item?.packageName}
                          </div>
                          {item?.packageName === "Pro" && (
                            <div className="bg-[#7048D7] flex items-center justify-center mb-2 md:mb-0 rounded-full w-[67px] h-[25px] md:w-[91px] md:h-[33px] text-white text-[11px] md:text-[14px]">
                              Popular
                            </div>
                          )}
                        </div>

                        <div className="text-[#CACACA] text-[11px] md:text-[14px] font-[400] price_plan_description">
                          {item?.description?.title}
                        </div>
                        {item?.packageName === "Enterprise" ? (
                          <div className="text-[#FFFFFF] text-[24px] md:text-[41px] font-[500]">
                            Custom
                          </div>
                        ) : item?.packagePrice === 0 ? (
                          <div className="text-[#FFFFFF] text-[24px] md:text-[41px] font-[500]">
                            Free
                          </div>
                        ) : (
                          <div className="text-[#FFFFFF] text-[24px] md:text-[41px] font-[500]">
                            ₹{item?.packagePrice}
                            <span className="text-[12px] font-[600]">
                              /Month
                            </span>
                          </div>
                        )}
                        <div
                          className="text-[#FFFFFF] text-[11px] md:text-[14px] font-[600]"
                          style={{ minHeight: "20px" }}
                        >
                          {item?.description?.credits}
                        </div>

                        <div className=" w-full p-[0.5px] bg-[#424242] my-5"></div>

                        {item?.description?.button === "Contact Us" ? (
                          <button
                            //onClick={() => router.push("/demo")}
                            className="px-[0.9px] py-[0.9px] rounded-full md:mb-12 lg:mb-0"
                          >
                            <div className="text-[#F1BB2E] hover:text-black px-4 py-2 md:px-6 md:py-2 flex items-center justify-center h-[36px] md:h-[52px] rounded-full bg-transparent hover:bg-[#F1BB2E] border-2 border-[#F1BB2E]">
                              <div className="w-full  text-[12px] md:text-[16px] font-semibold">
                                Get a demo
                              </div>
                            </div>
                          </button>
                        ) : item?.description?.button === "Get Started" ? (
                          <button
                            //onClick={getStartedButtonClicked}
                            className="px-[0.9px] py-[0.9px] rounded-full md:mb-12 lg:mb-0"
                          >
                            <div className="text-[#F1BB2E] hover:text-black px-4 py-2 md:px-6 md:py-2 flex items-center justify-center h-[36px] md:h-[52px] rounded-full bg-transparent hover:bg-[#F1BB2E] border-2 border-[#F1BB2E]">
                              <div className="w-full  text-[12px] md:text-[16px] font-semibold">
                                Get Started
                              </div>
                            </div>
                          </button>
                        ) : (
                          <button
                            // onClick={() =>
                            //   startPaymetProcess(item?.packageId)
                            // }
                            className="px-[0.9px] py-[0.9px] rounded-full md:mb-12 lg:mb-0"
                          >
                            <div className="text-[#F1BB2E] hover:text-black px-4 py-2 md:px-6 md:py-2 flex items-center justify-center h-[36px] md:h-[52px] rounded-full bg-transparent hover:bg-[#F1BB2E] border-2 border-[#F1BB2E]">
                              <div className="w-full  text-[12px] md:text-[16px] font-semibold">
                                {item?.description?.button}
                              </div>
                            </div>
                          </button>
                        )}
                      </div>
                      <div className="w-full relative h-[54%] flex flex-col md:mt-6 lg:mt-4 xl:mt-0 ml-4">
                        <div className="w-full flex">
                          <ol className="price_data">
                            {item.description.features.map((item, index) => (
                              <li key={index} className="flex w-full gap-2">
                                <div className="w-4 h-4 md:w-5 md:h-5 mt-[1px] md:mt-[8px] mr-1 flex justify-center items-start">
                                  <svg
                                    viewBox="0 0 20 21"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <circle
                                      cx="10.0358"
                                      cy="10.7116"
                                      r="8.29753"
                                      fill="white"
                                      fill-opacity="0.15"
                                    />
                                    <path
                                      d="M10.0013 2.41406C5.4088 2.41406 1.66797 6.15489 1.66797 10.7474C1.66797 15.3399 5.4088 19.0807 10.0013 19.0807C14.5938 19.0807 18.3346 15.3399 18.3346 10.7474C18.3346 6.15489 14.5938 2.41406 10.0013 2.41406ZM10.0013 4.08073C13.6931 4.08073 16.668 7.05563 16.668 10.7474C16.668 14.4392 13.6931 17.4141 10.0013 17.4141C6.30953 17.4141 3.33464 14.4392 3.33464 10.7474C3.33464 7.05563 6.30953 4.08073 10.0013 4.08073ZM13.5788 7.6582L8.33464 12.9023L6.42383 10.9915L5.24544 12.1699L8.33464 15.2591L14.7572 8.83659L13.5788 7.6582Z"
                                      fill="#CACACA"
                                    />
                                  </svg>
                                </div>
                                <div className="w-[85%] text-[#CACACA] text-[11px] md:text-[14px] font-[400] leading-[12px] md:leading-[18px] my-[4px] md:my-[10px]">
                                  {item}{" "}
                                </div>
                              </li>
                            ))}
                          </ol>
                        </div>
                        {item?.packagePrice === 0 && (
                          <div className="ml-2 md:absolute md:-bottom-6 flex justify-start text-[#CACACA] text-[11px] md:text-[14px] font-[400]">
                            <span className="text-red-800">*</span>(removed
                            after 90 days since subscription)
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            )}

            {planTab === 1 && (
              <div className="w-full flex flex-col md:flex-row md:flex-wrap lg:flex-nowrap gap-5 justify-center lg_responsive">
                {plandata?.nyx_packages["Pre-defined"]
                  .filter(
                    (value) =>
                      // value.packageType === "Free" ||
                      value.packageType === "Yearly",
                  )
                  .map((item, index) => (
                    <div
                      key={index}
                      className="w-full md:w-[301px] h-auto rounded-2xl px-[16px] py-[42px] flex flex-row md:flex-col bg-[#3B226F] border-2 border-[#F1BB2E]"
                    >
                      <div className="w-full h-[43%] md:h-[36%] xl:h-[43%] flex flex-col pricing_upperPart">
                        <div className="w-full flex flex-col md:flex-row justify-between">
                          <div className="text-[#FFFFFF] text-[18px] md:text-[31px] font-[500]">
                            {item?.packageName}
                          </div>
                          {item?.packageName === "Pro" && (
                            <div className="bg-[#7048D7] flex items-center justify-center mb-2 md:mb-0 rounded-full w-[67px] h-[25px] md:w-[91px] md:h-[33px] text-white text-[11px] md:text-[14px]">
                              Popular
                            </div>
                          )}
                        </div>

                        <div className="text-[#CACACA] text-[11px] md:text-[14px] font-[400] price_plan_description_yearly">
                          {item?.description?.title}
                        </div>
                        {item?.packageName === "Enterprise" ? (
                          <div className="text-[#FFFFFF] text-[24px] md:text-[41px] font-[500]">
                            Custom
                          </div>
                        ) : item?.packagePrice === 0 ? (
                          <div className="text-[#FFFFFF] text-[24px] md:text-[41px] font-[500]">
                            Free
                          </div>
                        ) : (
                          <div className="flex gap-2 flex-col md:flex-row md:items-center">
                            <div className="text-[#FFFFFF] text-[24px] md:text-[41px] font-[500]">
                              ₹{item?.packagePrice}
                            </div>
                            <div className=" md:mt-3 xl:mt-3 text-[#FFFFFF] text-[11px] md:text-[12px] font-normal">
                              per month billed annually as ₹
                              {item?.packagePrice * 12}
                            </div>
                          </div>
                        )}

                        <div
                          className="text-[#FFFFFF] text-[11px] md:text-[14px] font-[600]"
                          style={{ minHeight: "20px" }}
                        >
                          {item?.description?.credits}
                          {(item?.packageName === "Pro" ||
                            item?.packageName === "Premium") &&
                            "/month"}
                          {item?.packageName === "Free" ? "" : null}
                          {item?.packageName === "Enterprise" ? "" : null}
                        </div>

                        <div className=" w-full p-[0.5px] bg-[#424242] my-5"></div>

                        {item?.description?.button === "Contact Us" ? (
                          <button
                            //onClick={() => router.push("/demo")}
                            className="px-[0.9px] py-[0.9px] rounded-full md:mb-12 lg:mb-0"
                          >
                            <div className="text-[#F1BB2E] hover:text-black px-4 py-2 md:px-6 md:py-2 flex items-center justify-center h-[36px] md:h-[52px] rounded-full bg-transparent hover:bg-[#F1BB2E] border-2 border-[#F1BB2E]">
                              <div className="w-full  text-[12px] md:text-[16px] font-semibold">
                                Get a demo
                              </div>
                            </div>
                          </button>
                        ) : item?.description?.button === "Get Started" ? (
                          <button
                            //onClick={getStartedButtonClicked}
                            className="px-[0.9px] py-[0.9px] rounded-full md:mb-12 lg:mb-0"
                          >
                            <div className="text-[#F1BB2E] hover:text-black px-4 py-2 md:px-6 md:py-2 flex items-center justify-center h-[36px] md:h-[52px] rounded-full bg-transparent hover:bg-[#F1BB2E] border-2 border-[#F1BB2E]">
                              <div className="w-full  text-[12px] md:text-[16px] font-semibold">
                                Get Started
                              </div>
                            </div>
                          </button>
                        ) : (
                          <button
                            // onClick={() =>
                            //   startPaymetProcess(item?.packageId)
                            // }
                            className="px-[0.9px] py-[0.9px] rounded-full md:mb-12 lg:mb-0"
                          >
                            <div className="text-[#F1BB2E] hover:text-black px-4 py-2 md:px-6 md:py-2 flex items-center justify-center h-[36px] md:h-[52px] rounded-full bg-transparent hover:bg-[#F1BB2E] border-2 border-[#F1BB2E]">
                              <div className="w-full  text-[12px] md:text-[16px] font-semibold">
                                {item?.description?.button}
                              </div>
                            </div>
                          </button>
                        )}
                      </div>
                      <div className="w-full relative h-[54%] flex flex-col md:mt-6 lg:mt-4 xl:mt-0 ml-4">
                        <div className="w-full flex">
                          <ol className="price_data">
                            {item.description.features.map((item, index) => (
                              <li key={index} className="flex w-full gap-2">
                                <div className="w-4 h-4 md:w-5 md:h-5 mt-[1px] md:mt-[8px] mr-1 flex justify-center items-start">
                                  <svg
                                    viewBox="0 0 20 21"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <circle
                                      cx="10.0358"
                                      cy="10.7116"
                                      r="8.29753"
                                      fill="white"
                                      fill-opacity="0.15"
                                    />
                                    <path
                                      d="M10.0013 2.41406C5.4088 2.41406 1.66797 6.15489 1.66797 10.7474C1.66797 15.3399 5.4088 19.0807 10.0013 19.0807C14.5938 19.0807 18.3346 15.3399 18.3346 10.7474C18.3346 6.15489 14.5938 2.41406 10.0013 2.41406ZM10.0013 4.08073C13.6931 4.08073 16.668 7.05563 16.668 10.7474C16.668 14.4392 13.6931 17.4141 10.0013 17.4141C6.30953 17.4141 3.33464 14.4392 3.33464 10.7474C3.33464 7.05563 6.30953 4.08073 10.0013 4.08073ZM13.5788 7.6582L8.33464 12.9023L6.42383 10.9915L5.24544 12.1699L8.33464 15.2591L14.7572 8.83659L13.5788 7.6582Z"
                                      fill="#CACACA"
                                    />
                                  </svg>
                                </div>
                                <div className="w-[85%] text-[#CACACA] text-[11px] md:text-[14px] font-[400] leading-[12px] md:leading-[18px] my-[4px] md:my-[10px]">
                                  {item}{" "}
                                </div>
                              </li>
                            ))}
                          </ol>
                        </div>
                        {item?.packagePrice === 0 && (
                          <div className="ml-2 md:absolute md:-bottom-6 flex justify-start text-[#CACACA] text-[11px] md:text-[14px] font-[400]">
                            <span className="text-red-800">*</span>(removed
                            after 90 days since subscription)
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Plans;
