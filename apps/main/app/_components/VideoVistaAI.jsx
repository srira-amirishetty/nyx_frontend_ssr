import React from "react";
import Section2 from "./Section2";
import { IMAGE_URL } from "@nyx-frontend/main/components/constants";

const VideoVistaAI = () => {
  return (
    <div>
      <Section2
        imageUrl={`${IMAGE_URL}/assets/images/home/VideoVista.png`}
        title="VideoVista AI"
        descriptionMain="Meet Your New Video companion"
        description="Elevate your campaigns using VideoVista AI. Transform your ideas into stunning videos for standout campaigns with maximum ROI."
        imageUrl1={`${IMAGE_URL}/assets/images/home/VideoVista1.png`}
        card1Title="VideoVista"
        card1SubTitle="Script-to-Video"
        card1Description="Turn scripts into captivating videos, optimised for clicks and conversions."
        imageUrl2={`${IMAGE_URL}/assets/images/home/VideoVista2.png`}
        card2Title="VideoVista"
        card2SubTitle="Image-to-Video"
        card2Description="Instantly transform images into dynamic videos for enhanced conversion."
        imageUrl3={`${IMAGE_URL}/assets/images/home/VideoVista4.png`}
        card3Title="VideoVista"
        card3SubTitle="Brand Canvas"
        card3Description="Give your creatives a makeover by adding flair to your visuals"
        link="/video-vista-ai"
      />
    </div>
  );
};

export default VideoVistaAI;
