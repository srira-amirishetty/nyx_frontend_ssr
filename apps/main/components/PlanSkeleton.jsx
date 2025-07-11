import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
const PlanSkeleton = () => {
  return (
    <div className="h-auto w-[90%] bg-[rgba(42,16,75,0.5)]">
      <SkeletonTheme highlightColor="rgba(108,91,130,0.5)">
        <h2>
          <Skeleton
            animation="wave"
            baseColor="rgba(42,16,75,0.5)"
            className="lg:w-auto w-[100px]"
            height={60}
          />
        </h2>
      </SkeletonTheme>
    </div>
  );
};

export default PlanSkeleton;
