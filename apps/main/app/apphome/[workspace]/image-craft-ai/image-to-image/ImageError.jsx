import React from "react";

const ImageError = () => {
  return (
    <div className="h-[385px] w-full flex justify-center items-center mb-16 flex-col">
      {/* <div className="w-full flex pl-4 mb-5">
        <div className="w-max bg-[#00000080] p-2 z-50 text-white rounded-md font-normal">
          <span className="font-semibold px-2">Campaign :</span>
          {campaignName}
        </div>
      </div> */}

      <div className="h-[108px] w-[316px] bg-[#23145A] flex justify-center items-center rounded-md px-4">
        <div className="">
          <p className="text-white mb-4">Your Output will not generated. Please try again</p>
        </div>
      </div>
    </div>
  );
};

export default ImageError;
