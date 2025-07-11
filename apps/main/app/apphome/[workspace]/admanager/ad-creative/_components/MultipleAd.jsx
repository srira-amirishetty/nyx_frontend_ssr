import React from "react";
import classNames from "@nyx-frontend/main/utils/classNames";
import { FaPlus } from "react-icons/fa6";
import { RiDeleteBin5Line } from "react-icons/ri";

const MultipleAd = ({ ads, activeAd, setActiveAd, addNewAd, removeAd }) => {
  const adCount = Object.keys(ads).length;
  const maxAds = 10;

  const handleAddNewAd = () => {
    if (adCount < maxAds) {
      addNewAd();
    }
  };

  return (
    <div className="w-full flex pl-6 pr-3 mt-2">
      {/* Ads container with even distribution */}
      <div className="flex-1 flex min-w-0 mr-2">
        {Object.keys(ads)?.map((unique_id, index) => (
          <div
            key={`${index}`}
            className="flex-1 text-center cursor-pointer min-w-0 px-0.5"
            onClick={() => setActiveAd(unique_id)}
          >
            <div
              className={classNames(
                "text-xs mt-1 flex flex-col justify-center items-center px-2 py-1 rounded min-w-0",
                unique_id == activeAd
                  ? "bg-[#FFCB54] text-[#000000] font-normal"
                  : "bg-[#332270] text-[#ffffff] font-normal"
              )}
            >
              <p
                className="text-xs leading-tight truncate w-full"
                title={`Ad${index + 1}`}
              >
                {adCount <= 6 ? `Ad${index + 1}` : `${index + 1}`}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Action buttons */}
      <div className="flex gap-1 flex-shrink-0">
        <div
          onClick={handleAddNewAd}
          className={classNames(
            "text-sm cursor-pointer mt-1 flex flex-col justify-center items-center px-2 py-1 rounded",
            adCount >= maxAds
              ? "bg-gray-400 text-gray-600 cursor-not-allowed"
              : "bg-[#020006] text-white hover:bg-[#020006]/80"
          )}
          title={
            adCount >= maxAds ? `Maximum ${maxAds} ads allowed` : "Add new ad"
          }
        >
          <FaPlus />
        </div>
        <div
          onClick={removeAd}
          className={classNames(
            "text-sm cursor-pointer mt-1 flex flex-col justify-center items-center px-2 py-1 rounded bg-[#020006] text-white hover:bg-[#020006]/80"
          )}
          title="Remove ad"
        >
          <RiDeleteBin5Line />
        </div>
      </div>
    </div>
  );
};

export default MultipleAd;
