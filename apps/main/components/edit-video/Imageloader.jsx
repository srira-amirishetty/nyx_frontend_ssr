import React, { useState, useRef, useEffect } from "react";
import { IMAGE_URL } from "@nyx-frontend/main/components/constants";

const Imageloader = () => {
  const [progress, setProgress] = useState(0);
  const interval = useRef();

  return (
    <div className="h-full w-full  flex items-center justify-center pt-10 flex-col rounded-xl">
      <video
        src={`${IMAGE_URL}/video/VideoLoader2.mp4`}
        className="w-[80%] rounded-xl"
        autoPlay
        controls={false}
        loop
        // style={{ height: "410px" , borderRadius:"8px" }}
      />
    </div>
  );
};

export default Imageloader;