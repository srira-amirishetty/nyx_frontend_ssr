import React from "react";
import { IMAGE_URL } from "@nyx-frontend/main/components/constants";

const Imageloader = () => {
  return (
    <div className="h-[290px] w-full flex justify-center items-center flex-col">
      <video
        src={`${IMAGE_URL}/video/loading-video.mp4`}
        className="w-auto h-auto max-h-[200px] rounded-md"
        autoPlay
        controls={false}
        loop
      />
    </div>
  );
};

export default Imageloader;
