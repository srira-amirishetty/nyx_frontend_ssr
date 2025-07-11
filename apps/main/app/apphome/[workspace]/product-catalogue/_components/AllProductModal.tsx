"use client";
import React, { useState, useRef } from "react";
import Modal from "react-modal";
import { showAllProductStyle } from "@nyx-frontend/main/utils/modalstyles";

interface AllProductProps {
  isOpen: boolean;
  onClose: () => void;
  allProductResults: any;
}

const AllProductModal: React.FC<AllProductProps> = ({
  isOpen,
  onClose,
  allProductResults,
}) => {
  console.log("allProductResults", allProductResults?.data);
  return (
    <Modal
      isOpen={isOpen}
      style={showAllProductStyle}
      onRequestClose={onClose}
      ariaHideApp={false}
    >
      <div className="flex justify-between">
        <div className="text-base font-bold text-[#FFFFFF]">Products</div>
        <div className="cursor-pointer" onClick={onClose}>
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

      <div className="w-full mt-5">
        <table className="min-w-full bg-[#301959] rounded-[10px]  dashboardTableStyle pb-2 ">
          <thead className="bg-[#28134B] rounded-[10px] h-[44px] mt-[12px] sticky top-0 z-[1] ">
            <tr className="text-[#E9BD4E] text-[14px] leading-[18px]">
              <th className="w-1/5 text-left rounded-tl-[10px] px-[20px]">
                ID
              </th>
              <th className="w-1/5 text-left px-[20px]">Title</th>
              <th className="w-1/5 text-left px-[20px]">Description</th>
              <th className="w-1/5 text-left px-[20px]">Link</th>
              <th className="w-1/5 text-left rounded-tr-[10px] px-[20px]">
                Image Link
              </th>
            </tr>
          </thead>

          <tbody>
            {allProductResults?.data?.length > 0 ? (
              allProductResults?.data?.map((item: any, index: any) => (
                <tr
                  key={index}
                  className="text-[14px] leading-[18px] font-[400]"
                  style={{
                    borderBottom:
                      index === allProductResults?.data?.length - 1
                        ? "none"
                        : "1px solid #8297BD",
                  }}
                >
                  <td className="px-[20px] py-[15px] text-[#FFFFFF]">
                    {item?.id}
                  </td>
                  <td className="px-[20px] py-[15px] text-[#FFFFFF]">
                    {item?.name}
                  </td>
                  <td className="px-[20px] py-[15px] text-[#FFFFFF]">
                    {item?.category}
                  </td>
                  <td className="px-[20px] py-[15px] text-[#FFFFFF]">
                    {item?.url}
                  </td>
                  <td className="px-[20px] py-[15px] text-[#FFFFFF]">
                    {item?.image_url}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="px-[20px] py-[15px] text-[#FFFFFF] text-center"
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Modal>
  );
};

export default AllProductModal;
