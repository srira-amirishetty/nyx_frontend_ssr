import React from "react";
import { IMAGE_URL } from "@nyx-frontend/main/components/constants";

const LoadingScreen = () => {

  return (
<>
    <div className="flex h-100 flex-col items-center justify-center">
        <div className="bg-black w-full text-white flex justify-center text-[14px] h-[54px] gap-4">
          
        </div>
        <div
          className="flex items-center justify-center w-[90%] h-[55vh] mt-10 rounded-lg"
          style={{
            background:
              "linear-gradient(108.46deg, rgba(255, 255, 255, 0.264) 0%, rgba(255, 255, 255, 0.066) 100%)",
          }}
        >
          <div className="h-[90%] w-full flex justify-center items-center  flex-col">
      <video
        src={`${IMAGE_URL}/video/loading-video.mp4`}
        className="w-auto h-auto max-h-[100%] rounded-md"
        autoPlay
        controls={false}
        loop
      />
    </div>
        </div>
        
      </div>
    
    </>
  );
};

export default LoadingScreen;
