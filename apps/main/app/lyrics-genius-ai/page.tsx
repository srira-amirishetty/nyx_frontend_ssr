/* eslint-disable @next/next/no-img-element */
"use client";
import Hero from "./_components/Hero";
import BrandVisionAI from "./_components/LyricsGeniusAI";
import { HOW_IT_WORKS, PDP3HW,HOW_IT_WORKS_MOBILE } from "@nyx-frontend/main/components/tails2";
import WhoUse from "./_components/WhoCanUse";
import WhyLyricsGenius from "./_components/WhyLyricsGenius"
import PoweredBy from "./_components/PoweredBy";

export default function Home2() {
  return (
    <>
      <Hero />
      <BrandVisionAI />
      <HOW_IT_WORKS data={PDP3HW}></HOW_IT_WORKS>
      <HOW_IT_WORKS_MOBILE data={PDP3HW}></HOW_IT_WORKS_MOBILE>
      <WhoUse />
      <WhyLyricsGenius/>
      <PoweredBy/>
    </>
  );
}