import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Loading = () => {
  return (
    <div className="mt-11 w-[300px] h-[300px] rounded-3xl">
      <SkeletonTheme highlightColor="rgba(108,91,130,0.5)">
        <div>
          <Skeleton
            animation="wave"
            baseColor="rgba(255, 255, 255, 0.09)"
            className="w-[300px] h-[300px] rounded-3xl"
          />
        </div>
      </SkeletonTheme>
    </div>
  );
};

export default Loading;
