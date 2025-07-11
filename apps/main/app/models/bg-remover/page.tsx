/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from "react";
import { StableDiffusionTabs } from "@nyx-frontend/main/shared/inputs";
import { STABLE_DIFFUSION_TABS } from "@nyx-frontend/main/utils/utils";
import Bgremove from "../_components/Bgremove";
import Api from "../_components/Api";
import Pricing from "../_components/Pricing";
import { BsChevronRight } from "react-icons/bs"
import { useRouter } from "next/navigation";
import { getTokenAndWorkspace } from "@nyx-frontend/main/utils/userUtils";
import ArrowIcon from "@nyx-frontend/main/components/Icons/ArrowIcon";
import Link from "next/link";

export default function Page() {
  const [diffusionTab, setDiffusionTab] = useState(0);

  return (
    <>
      <div className="bg-[#15072a] w-full h-full flex justify-center items-center">
        <div className="w-[90%] h-full md:p-6 my-20 rounded-md">
          <div className="md:mx-6">
            <div className=" flex text-[11px] md:text-[14px] text-white font-normal mt-4 ">
              <Link href="/models">Models</Link>  <BsChevronRight className="mt-1"/> Image To Image <BsChevronRight className="mt-1"/>
              <span className="text-[11px] md:text-[14px] text-white font-normal">
                Background Remover
              </span>
            </div>
            <div className="flex justify-center md:justify-start font-semibold ">
              <StableDiffusionTabs
                data={STABLE_DIFFUSION_TABS}
                tabState={setDiffusionTab}
                tabStatus={diffusionTab}
              />
            </div>
          </div>
          <div>
            {diffusionTab == 0 && <Bgremove />}
            {diffusionTab == 1 && <Api />}
            {diffusionTab == 2 && <Pricing />}
          </div>
        </div>
      </div>
    </>
  );
}
