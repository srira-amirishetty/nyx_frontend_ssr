import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const BudgetLoading = () => {
  return (
    <div className=" w-[288px] h-[93px] rounded-[8px]">
      <SkeletonTheme highlightColor="rgba(108,91,130,0.5)">
        <div>
          <Skeleton
            animation="wave"
            baseColor="rgba(255, 255, 255, 0.09)"
            className="w-[288px] h-[93px] rounded-[8px] "
          />
        </div>
      </SkeletonTheme>
    </div>
  );
};

export default BudgetLoading;
