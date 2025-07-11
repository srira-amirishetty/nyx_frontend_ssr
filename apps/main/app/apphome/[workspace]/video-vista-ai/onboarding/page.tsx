/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState,useEffect } from "react";
import Sidebar from "@nyx-frontend/main/components/Sidebar";
import { useRouter } from "next/navigation";
import { BsChevronLeft } from "react-icons/bs";
import Select from "react-select";
import Button from "@nyx-frontend/main/components/Button";
import Modal from "react-modal";
import {
  addTagetGroupPopupStyle,
  addProductPopupStyle,
} from "@nyx-frontend/main/utils/modalstyles";
import {
  creatorOptions,
  BRAND_TABS,
  category,
  ageGroup,
  region,
  demographics,
  gender,
} from "@nyx-frontend/main/utils/productConstants";
import {
  aiImageColourStyles,
  addBrandStyle,
  addBrandStyle2,
} from "@nyx-frontend/main/utils/productStyle";

const Page = () => {
  const [targetGroupPopup, setTargetGroupPopup] = useState(false);
  const [addProductPopup, setAddProductPopup] = useState(false);
  const router = useRouter();
  const handleTargetGroupModal = () => {
    setTargetGroupPopup(false);
  };
  const handleAddProductModal = () => {
    setAddProductPopup(false);
  };
  useEffect(() => {
    const storage = localStorage.getItem("token");
    if (storage) {
    } else {
      router.push("/apphome/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="flex w-full ">
        <Sidebar />
        <div className="w-full px-10 py-5 flex flex-col items-center">
          <div className="w-[70%] h-10 bg-black p-2 flex gap-2">
            <BsChevronLeft className="text-[#FFF] text-xl" />
            <p className="text-[#FFFFFF]">Edit Brand Info</p>
          </div>
          <div className="w-[70%] bg-[#3B236F] h-auto p-5 flex flex-col">
            <p className="text-xl text-[#FFFFFF]">
              Let&apos;s onboard your brand
            </p>
            <div className="w-64 p-0.5 bg-[#FFC01D]"></div>
            <div className="w-full my-5">
              <div className="flex w-full gap-2">
                <div className="pb-3 w-1/2">
                  <p className="text-white font-[400] pb-1">Brand Name</p>
                  <input
                    type="text"
                    className="placeholder:text-sm w-full bg-transparent border border-[#8297BD] rounded-md p-2 font-normal"
                    placeholder="Add Brand"
                    // value={brandName}
                    // onChange={handleInputBrandName}
                  />
                </div>
                <div className="pb-3 w-1/2">
                  <p className="text-white font-[400] text-[16px] pb-1">
                    Category
                  </p>
                  <Select
                    className="text-sm md:text-base"
                    options={category}
                    placeholder="Select Category"
                    styles={aiImageColourStyles}
                    // value={category.find(option => option?.value === selectCategory)}
                    // onChange={categoryHandleChange}
                    components={{
                      IndicatorSeparator: () => null,
                    }}
                  />
                </div>
              </div>

              <div className="w-full text-left text-[#FFFFFF] font-semibold gap-2 text-sm">
                <p className="font-semibold py-2">Product Logo</p>
                <label className="w-full cursor-pointer inline-flex h-[38px] items-center justify-center bg-transparent border border-[#8297BD] rounded-md p-2 font-normal">
                  <input
                    type="file"
                    className="hidden"
                    placeholder="Brand Logo"
                  />
                  {/* <span className="underline text-[#8297BD] text-sm overflow-hidden h-[25px]">
                          {productLogo2 || (productLogo?.name ?? "Click here to Upload logo")}
                            
                          </span> */}
                </label>
              </div>
              <div className="w-full flex gap-3">
                <div className="w-full text-left text-[#FFFFFF] font-semibold gap-2 text-sm">
                  <p className="font-semibold py-2">Brand Description</p>
                  <textarea
                    className="w-full h-[130px] bg-transparent border border-[#8297BD] rounded-lg p-2 font-normal"
                    placeholder="Add text or will be uploaded from web"
                    // value={brandDescription}
                    // onChange={handleBrandDescription}
                  ></textarea>
                </div>
              </div>
              <div className="w-full my-5">
                <div className="bg-[#1D1138] w-[150px] h-[55px] rounded-t-lg text-[#FFF] p-2">
                  Add Logos
                </div>
                <div className="bg-[#50387B] w-[150px] h-[99px] rounded-b-lg flex justify-center items-center">
                  <button className="border border-nyx-yellow text-nyx-yellow transition-all rounded-full p-3">
                    <svg
                      viewBox="0 0 17 17"
                      className="w-4 h-4 fill-current text-nyx-yellow"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M15.14 8.5a.797.797 0 0 1-.796.797H9.297v5.047a.797.797 0 0 1-1.594 0V9.297H2.656a.797.797 0 0 1 0-1.594h5.047V2.656a.797.797 0 0 1 1.594 0v5.047h5.047a.797.797 0 0 1 .797.797Z" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="w-full flex flex-col gap-2">
                <p className="text-xl text-[#FFFFFF]">
                  Provide your product information
                </p>
                <div className="w-[345px] p-0.5 bg-[#FFC01D]"></div>
                <button
                  className="w-max h-max bg-[#1D1138] text-[#FFF] p-2 my-2 text-sm"
                  onClick={() => {
                    setAddProductPopup(true);
                  }}
                >
                  + Add New Product
                </button>
              </div>

              <div className="w-full flex flex-col gap-2">
                <p className="text-xl text-[#FFFFFF]">Set your target groups</p>
                <div className="w-[230px] p-0.5 bg-[#FFC01D]"></div>
              </div>

              <div className="w-full my-5">
                <div className="bg-[#1D1138] w-[150px] h-[55px] rounded-t-lg text-[#FFF] p-2">
                  Add Target Group
                </div>
                <div className="bg-[#50387B] w-[150px] h-[99px] rounded-b-lg flex justify-center items-center">
                  <button
                    className="border border-nyx-yellow text-nyx-yellow transition-all rounded-full p-3"
                    onClick={() => {
                      setTargetGroupPopup(true);
                    }}
                  >
                    <svg
                      viewBox="0 0 17 17"
                      className="w-4 h-4 fill-current text-nyx-yellow"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M15.14 8.5a.797.797 0 0 1-.796.797H9.297v5.047a.797.797 0 0 1-1.594 0V9.297H2.656a.797.797 0 0 1 0-1.594h5.047V2.656a.797.797 0 0 1 1.594 0v5.047h5.047a.797.797 0 0 1 .797.797Z" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="w-full flex gap-4 my-4 justify-center items-center">
                <Button className="rounded-full w-40">Cancel</Button>
                <Button className="rounded-full w-40">Next</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {targetGroupPopup ? (
        <Modal
          isOpen={targetGroupPopup}
          style={addTagetGroupPopupStyle}
          onRequestClose={handleTargetGroupModal}
        >
          <div className="flex justify-between mt-5">
            <div className="text-xl font-bold text-[#FFFFFF]">
              New Taget Group
            </div>
            <div
              className="pr-3 cursor-pointer"
              onClick={handleTargetGroupModal}
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
          <div className="w-full my-5 flex flex-col gap-5">
            <div className="w-full flex flex-col gap-2">
              <div className="text-[#FFFFFF] text-base">Target Name</div>
              <input
                type="text"
                className="w-full bg-transparent border border-[#8297BD] rounded-md p-2 font-normal text-[#FFFFFF] placeholder:text-sm"
                placeholder="Suggest Target Group Name"
              />
            </div>
            <div className="w-full flex flex-col gap-2">
              <div className="text-[#FFFFFF] text-base">Gender</div>
              <div className="w-full flex gap-3">
                <button className="hover:bg-nyx-sky transition-colors text-sm font-normal border border-[#8297BD] hover:border-nyx-sky rounded text-white cursor-pointer hover:text-black w-1/3 text-center py-2 px-4">
                  Male
                </button>
                <button className="hover:bg-nyx-sky transition-colors text-sm font-normal border border-[#8297BD] hover:border-nyx-sky rounded text-white cursor-pointer hover:text-black w-1/3 text-center py-2 px-4">
                  Female
                </button>
                <button className="hover:bg-nyx-sky transition-colors text-sm font-normal border border-[#8297BD] hover:border-nyx-sky rounded text-white cursor-pointer hover:text-black w-1/3 text-center py-2 px-4">
                  All
                </button>
              </div>
            </div>
            <div className="w-full flex flex-col gap-2">
              <div className="text-[#FFFFFF] text-base">Age Group</div>
              <Select
                className="text-sm md:text-base"
                options={ageGroup}
                placeholder="Select Age"
                styles={aiImageColourStyles}
                // value={ageGroup.find(
                //   (option) => option?.value === productAgeGroup
                // )}
                // onChange={handleInputAgeGroup}
                components={{
                  IndicatorSeparator: () => null,
                }}
              />
            </div>
            <div className="w-full flex flex-col gap-2">
              <div className="text-[#FFFFFF] text-base">Region</div>
              <Select
                className="text-sm md:text-base"
                options={region}
                menuPlacement="top"
                placeholder="Select Region"
                styles={aiImageColourStyles}
                // value={region.find((option) => option?.value === ProductRegion)}
                // onChange={handleInputRegion}
                components={{
                  IndicatorSeparator: () => null,
                }}
              />
            </div>
          </div>

          <div className="w-full flex gap-4 mt-6 justify-center items-center">
            <Button className="rounded-full w-40">Cancel</Button>
            <Button className="rounded-full w-40">Next</Button>
          </div>
        </Modal>
      ) : null}
      {addProductPopup ? (
        <Modal
          isOpen={addProductPopup}
          style={addProductPopupStyle}
          onRequestClose={handleAddProductModal}
        >
          <div className="flex justify-between mt-5">
            <div className="text-xl font-bold text-[#FFFFFF]">Add Product</div>
            <div
              className="pr-3 cursor-pointer"
              onClick={handleAddProductModal}
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
          <div className="w-full my-5 flex flex-col gap-5">
            <div className="w-full flex flex-col gap-2">
              <div className="text-[#FFFFFF] text-base">Product Name</div>
              <input
                type="text"
                className="placeholder:text-sm w-full bg-transparent border border-[#8297BD] rounded-md p-2 font-normal text-[#FFFFFF]"
                placeholder="Add Product Name"
              />
            </div>
            <div className="w-full flex flex-col gap-2">
              <div className="text-[#FFFFFF] text-base">
                Product Description
              </div>
              <input
                type="text"
                className="placeholder:text-sm w-full bg-transparent border border-[#8297BD] rounded-md p-2 font-normal text-[#FFFFFF]"
                placeholder="Select Category"
              />
            </div>
            <div className="w-full flex flex-col gap-2">
              <div className="text-[#FFFFFF] text-base">Brand Logos</div>
              <div className="w-full mt-3">
                <div className="bg-[#452A80] w-[150px] h-[55px] rounded-t-lg text-[#FFF] p-2">
                  Add Logo
                </div>
                <div className="bg-[#6653B4] w-[150px] h-[99px] rounded-b-lg flex justify-center items-center">
                  <button className="border border-nyx-yellow text-nyx-yellow transition-all rounded-full p-3">
                    <svg
                      viewBox="0 0 17 17"
                      className="w-4 h-4 fill-current text-nyx-yellow"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M15.14 8.5a.797.797 0 0 1-.796.797H9.297v5.047a.797.797 0 0 1-1.594 0V9.297H2.656a.797.797 0 0 1 0-1.594h5.047V2.656a.797.797 0 0 1 1.594 0v5.047h5.047a.797.797 0 0 1 .797.797Z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div className="w-full flex gap-4 mt-6 justify-center items-center">
              <Button className="rounded-full w-40">Cancel</Button>
              <Button className="rounded-full w-40">Next</Button>
            </div>
          </div>
        </Modal>
      ) : null}
    </>
  );
};

export default Page;
