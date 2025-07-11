/* eslint-disable @next/next/no-img-element */
"use client";
import Hero from "./_components/Hero";
import BrandVisionAI from "./_components/VideoVista";
import Discover from "./_components/Discover";
import { HOW_IT_WORKS, PDP4HW, HOW_IT_WORKS_MOBILE } from "@nyx-frontend/main/components/tails2";
import WhoUse from "./_components/WhoCanUse";
import WhyVideoVista from "./_components/WhyVideoVista";
import PoweredBy from "./_components/PoweredBy";
import TopNav from "./_components/TopNav2";

export default function Home2() {
  return (
    <>
      <TopNav />
      <Hero />

      <div id="image">
        {" "}
        {/* <BrandVisionAI /> */}
        <Discover />
      </div>

      <HOW_IT_WORKS data={PDP4HW}></HOW_IT_WORKS>
      <HOW_IT_WORKS_MOBILE data={PDP4HW}></HOW_IT_WORKS_MOBILE>
      <WhoUse />
      <div id="whyNyxSection">
        {" "}
        <WhyVideoVista />
      </div>

      <PoweredBy />
    </>
  );
}
