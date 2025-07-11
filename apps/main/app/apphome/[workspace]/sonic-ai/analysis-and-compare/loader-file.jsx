import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const LoadingFile = (props) => {
  return (
    <div className="h-auto bg-[rgba(42,16,75,0.5)]">
      <SkeletonTheme highlightColor="rgba(108,91,130,0.5)">
        <div>
          <Skeleton
            animation="wave"
            baseColor="rgba(42,16,75,0.5)"
            className="lg:w-auto w-[100px]"
            height={props?.height}
            width={props?.width}
          />
        </div>
      </SkeletonTheme>
    </div>
  );
};

export default LoadingFile;
