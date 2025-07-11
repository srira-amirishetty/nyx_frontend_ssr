import React from "react";
import CarouselSection from "./CarouselSection";
import { IMAGE_URL } from "@nyx-frontend/main/components/constants";

const BrandVisionAI = () => {
  return (
    <div>
      <CarouselSection
        imageUrl={`${IMAGE_URL}/assets/images/home/ImageCraft.png`}
        title="ImageCraft AI"
        descriptionMain="Meet Your New Creative Companion"
        description="Boost conversions with ImageCraft. Transform your ideas into stunning visuals for standout campaigns that maximise ROI with Rapid High-Converting Content Generation."
        imageUrl1={`${IMAGE_URL}/assets/images/home/ImageCraft1.png`}
        card1Title="ImageCraft"
        card1SubTitle="Text-to-Image"
        card1Description="Create compelling visuals from text, tailored to your audience, and optimise for high engagement."
        imageUrl2={`${IMAGE_URL}/assets/images/home/ImageCraft2.png`}
        card2Title="ImageCraft"
        card2SubTitle="Image-to-Image"
        card2Description="Develop captivating backgrounds for your products, tailored to your target audience."
        imageUrl3={`${IMAGE_URL}/assets/images/home/VirtuFit.png`}
        card3Title="ImageCraft"
        card3SubTitle="VirtuFit"
        card3Description="Generate your own virtual fashion photoshoot with a click! Sell out your inventory instantly."
        imageUrl4={`${IMAGE_URL}/assets/images/home/ImageCraft3.png`}
        card4Title="ImageCraft"
        card4SubTitle="Predict"
        card4Description="Predict your creatives' success with NYX and make informed decisions for maximum ROI."
        link="/image-craft-ai"
      />
    </div>
  );
};

export default BrandVisionAI;
