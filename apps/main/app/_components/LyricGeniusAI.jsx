import React from "react";
import Section from "./Section";
import { IMAGE_URL } from "@nyx-frontend/main/components/constants";

const LyricGeniusAI = () => {
  return (
    <div>
      <Section
        imageUrl={`${IMAGE_URL}/assets/images/home/LyricGeniusAI.png`}
        title="LyricGenius AI"
        descriptionMain="Meet Your New Lyrics companion"
        description="Maximise your lyrics success with LyricGenius. Write and refine lyrics that connect with listeners, increasing song popularity and sales."
        imageUrl1={`${IMAGE_URL}/assets/images/home/LyricGeniusAI_2.png`}
        card1Title="LyricGenius"
        card1SubTitle="Generate"
        card1Description="Craft and tweak lyrics by genre, mood, and theme to enhance your success odds."
        // imageUrl2={`${IMAGE_URL}/assets/images/home/LyricGeniusAI_3.png`}
        // card2Title="LyricGenius"
        // card2SubTitle="Consultation"
        // card2Description="Receive expert feedback on your lyrics to boost its rhythmic appeal."
        imageUrl3={`${IMAGE_URL}/assets/images/home/LyricGeniusAI_1.png`}
        card3Title="LyricGenius"
        card3SubTitle="Predict"
        card3Description="Get a success probability score for your input lyrics."
        link="/lyrics-genius-ai"
      />
    </div>
  );
};

export default LyricGeniusAI;
