import React from 'react'
import { IMAGE_URL } from "@nyx-frontend/main/components/constants";

import AnimateText from "../text-to-video/_components/AnimateText"
const Imageloader = () => {
  const SECOND = 1000;
  const MINUTE = SECOND * 60;

  const texts = [
    { name: "Analyzing your Image", time: SECOND * 5 },
    { name: "Implementing Animation Style", time: SECOND * 10 },
    { name: "Adding Motion to your image", time: SECOND * 10 },
    { name: "Animating for you", time: Infinity }
  ];

  return (
    <div className="h-full w-full flex-col flex   gap-4">
  <video
    src={`${IMAGE_URL}/video/VideoLoader2.mp4`}
    className="w-full  rounded-md"
    autoPlay
    controls={false}
    loop
  />
  {/* <div className='mt-2 flex justify-center items-center'>
    <AnimateText list={texts} />
  </div> */}
</div>

  )
}

export default Imageloader