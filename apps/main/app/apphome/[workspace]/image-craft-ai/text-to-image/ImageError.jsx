import React from "react";

const ImageError = ({ campaignName }) => {
  return (
    <div className="min-h-[418px] w-full flex justify-center items-center flex-col">
      <div className="h-[108px] w-[316px] bg-violet-900 flex justify-center items-center rounded-md px-4">
        <div className="">
          <p className="text-white mb-4">
            There seems to be a problem, please try again
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImageError;
