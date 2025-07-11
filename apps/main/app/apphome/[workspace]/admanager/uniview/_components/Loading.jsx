import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Loading = () => {
  return (
    <div className=" w-full h-[150px] rounded-xl px-[40px] py-[30px]">
      <SkeletonTheme highlightColor="rgba(108,91,130,0.5)">
        <div>
          <Skeleton
            animation="wave"
            baseColor="rgba(255, 255, 255, 0.09)"
            className="w-full h-[130px] rounded-xl "
          />
        </div>
      </SkeletonTheme>
    </div>
  );
};

export default Loading;
