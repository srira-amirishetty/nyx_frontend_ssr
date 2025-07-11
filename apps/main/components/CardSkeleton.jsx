import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
const CardSkeleton = () => {
  return (
    <div
      className="h-auto w-full"
      style={{
        background: "rgba(42,16,75,0.5)",
        borderRadius: "10px",
        padding: "1rem",
      }}
    >
      <SkeletonTheme highlightColor="rgba(42,16,75,0.5)">
        <h2>
          <Skeleton
            animation="wave"
            baseColor="rgba(42,16,75,0.5)"
            className="lg:w-auto w-[100px]"
            height={200}
          />
        </h2>
        <br />
        <h2>
          <Skeleton
            animation="wave"
            baseColor="rgba(42,16,75,0.5)"
            className="lg:w-auto w-[100px]"
            height={50}
          />
        </h2>
        <br />
        <h2>
          <Skeleton
            animation="wave"
            baseColor="rgba(42,16,75,0.5)"
            className="lg:w-auto w-[100px]"
            height={50}
          />
        </h2>
      </SkeletonTheme>
    </div>
  );
};

export default CardSkeleton;
