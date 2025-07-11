/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import Sidebar from "@nyx-frontend/main/components/Sidebar";
import { IMAGE_URL } from "@nyx-frontend/main/components/constants";
import { TAIL_TITLE } from "@nyx-frontend/main/components/tails";
import Profileicon from "@nyx-frontend/main/components/Profileicon";
import LandscapePopup from "../../LandscapePopUp";
import LoginRoutes from "@nyx-frontend/main/components/LoginRoutes";
import useWorkspace from "@nyx-frontend/main/hooks/useWorkspace";
import { ImageCraftCard } from "./_components/Cards";

function AppImageCraftAI() {
  const { workspace } = useWorkspace();

  return (
    <LoginRoutes>
      <div className="flex w-full">
        <div className="flex w-full">
          <Sidebar />
          <div className="p-5 py-4 w-full toolsetcontainer max-h-[100vh] overflow-hidden overflow-y-auto">
            <Profileicon hide={""}  />
            <TAIL_TITLE
              title="Welcome to ImageCraft AI!"
              style="text-white flex justify-center text-3xl font-bold"
            ></TAIL_TITLE>
            <TAIL_TITLE
              title="Your creatives companion"
              style="text-white flex justify-center text-base font-normal"
            ></TAIL_TITLE>

            <div className="w-full my-5">
              <p className="text-white text-xl font-semibold">
                What would you like to do today?
              </p>
            </div>

            <div className="w-full flex flex-col gap-3">
              <ImageCraftCard
                href={`/apphome/${workspace}/image-craft-ai/text-to-image`}
                src={`${IMAGE_URL}/assets/images/home/ImageCraft1_app.png`}
                title="ImageCraft Generate"
                subTitle="Use your text prompt input to generate campaigns that deliver great engagement and growth."
              />
              <ImageCraftCard
                href={`/apphome/${workspace}/image-craft-ai/image-to-image`}
                src={`${IMAGE_URL}/assets/images/home/ImageCraft2_app.png`}
                title="ImageCraft Image-to-Image"
                subTitle="Generate photoshoots for your products using either prompt, reference or autogenerate."
              />
              <ImageCraftCard
                href=""
                src={`${IMAGE_URL}/assets/images/home/ImageCraft4_app.png`}
                title="ImageCraft AI Catalog"
                subTitle="Generate your own virtual fashion photoshoot with a click! Sell out your inventory instantly."
                comingsoon={true}
              />
              <ImageCraftCard
                href={`/apphome/${workspace}/image-craft-ai/ctr-prediction`}
                src={`${IMAGE_URL}/assets/images/home/ImageCraft3_app.png`}
                title="ImageCraft CTR Prediction"
                subTitle="Get Insights into your image creatives based on predicted CTR Score."
                // comingsoon={true}
              />
            </div>
          </div>
        </div>
      </div>

      <LandscapePopup />
    </LoginRoutes>
  );
}

export default AppImageCraftAI;
