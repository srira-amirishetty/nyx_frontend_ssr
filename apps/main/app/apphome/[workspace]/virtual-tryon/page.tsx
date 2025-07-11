"use client";

import React, { useEffect, useState } from "react";
import PhotoshootSelection from "./PhotoshootSelection";
import Steper from "./Steper";
import { VIRTUAL_TRYON_TABS } from "@nyx-frontend/main/utils/productConstants";
import Sidebar from "@nyx-frontend/main/components/Sidebar";
import FashionKit from "./FashionKit";
import BackGroundOptions from "./BackGroundOptions";
import {
  createFashionkit,
  imageLikeDisLikeService,
} from "@nyx-frontend/main/services/virtual-tryon";
import { useMutation, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import LandscapePopup from "../../LandscapePopUp";
import {
  useImageActive,
  useImageUrls,
  useImageTabActive,
} from "./_store/store";
import { useShallow } from "zustand/react/shallow";
import Functions from "./_components/Functions";
import VtonOutput from "./VtonOutput";
import LoadingScreen from "./_components/LoadingScreen";
import VtonOutput2 from "./VtonOutput2";
import Profileicon from "@nyx-frontend/main/components/Profileicon";

type OutputImageKeys = "full_body_front" | "full_body_45" | "full_body_back";

export default function Page() {
  const [tab, setBrandTab] = useState<string>(VIRTUAL_TRYON_TABS.PHOTOSHOOT);
  const [fashionKitId, setFashionKitId] = useState<string | null>(null);
  const [steperpro, setStepperPro] = useState<any>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isError2, setIsError2] = useState(false);
  const [refetchfromPhotoShoot, setRefetchfromPhoto] = useState(1);
  const [vtonResponse, setVtonResponse] = useState<any>(null);
  const [vtonResponse2, setVtonResponse2] = useState<any>(null);
  const [selectedTab, setSelectedTab] =
    useState<OutputImageKeys>("full_body_front");
  const [selectKit, setSelectKit] = useState<number>();

  const [tab45front, setTab45front] = useState(false);
  const [tabBack, setTabBack] = useState(false);

  const [
    imageurl,
    setImageUrl,
    setDisLike,
    setLike,
    setSaved,
    setDownload,
    setLoading,
    setImageError,
  ] = useImageUrls(
    useShallow((state) => [
      state.imageUrl,
      state.setImageUrl,
      state.setDisLike,
      state.setLike,
      state.setSaved,
      state.setDownload,
      state.setLoading,
      state.setError,
    ]),
  );

  const fashionKit = useQuery({
    queryKey: ["fashionKit"],
    queryFn: async () => {
      const workspaceId = localStorage.getItem("workspace_id");
      const name = "default title";
      const data = { workspace_id: workspaceId, name: name };
      const res = await createFashionkit(data);
      return res;
    },
  });

  useEffect(() => {
    if (fashionKit.isSuccess) {
      const fashionKitId = fashionKit.data.result.fashion_kit_id;

      setFashionKitId(fashionKitId);
    }

    if (fashionKit.isError) {
      console.log("Error");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fashionKit]);

  let globalKitId;

  if (selectKit) {
    globalKitId = selectKit;
    // console.log("selectKit has a value:", selectKit);
  } else {
    globalKitId = fashionKitId;
    // console.log("selectKit is empty, using fashionKitId:", fashionKitId);
  }

  // console.log(vtonResponse?.generated_photos?.output_image["full_body_front"])
  // console.log(vtonResponse?.generated_photos?.output_image?.selectedTab)

  return (
    <>
      <div className="flex w-full">
        <Sidebar />
        <div className="flex justify-center w-full">
          <div className="w-[95%]">
            <div className="w-full pt-4">
              <Profileicon hide={""} />
            </div>
            <div className="text-[#8297BD] text-[20px] md:text-[24px] font-bold text-center  mb-8">
              Fashion Catalogue
            </div>
            <div className="flex gap-2 w-full h-[85vh] 2xl:h-[85vh] justify-center">
              <div className="w-[35%] bg-[#00000080] flex flex-col gap-4 p-4 overflow-hidden overflow-y-auto rounded-lg">
                <FashionKit
                  tab={tab}
                  setBrandTab={setBrandTab}
                  fashionKitId={fashionKitId}
                  setStepperPro={setStepperPro}
                  selectFashionKit={setSelectKit}
                  refetchfromPhotoShoot={refetchfromPhotoShoot}
                />
                <PhotoshootSelection
                  tab={tab}
                  setBrandTab={setBrandTab}
                  fashionKitId={globalKitId}
                  setStepperPro={setStepperPro}
                  steperpro={steperpro}
                  setVtonResponse={setVtonResponse}
                  setIsLoading={setIsLoading}
                  isLoading={isLoading}
                  setIsError={setIsError}
                  setVtonResponse2={setVtonResponse2}
                  setRefetchfromPhoto={setRefetchfromPhoto}
                  refetchfromPhotoShoot={refetchfromPhotoShoot}
                  setSelectedTab={setSelectedTab}
                  setIsError2={setIsError2}
                  // onSelectedAnglesChange={handleSelectedAngles}
                />
                <BackGroundOptions
                  tab={tab}
                  setBrandTab={setBrandTab}
                  fashionKitId={fashionKitId}
                />
              </div>

              <div className="relative w-[65%] h-[85vh] flex flex-col bg-[#3B236F] rounded-lg">
                <div>
                  {(vtonResponse?.generated_photos?.output_image ||
                    vtonResponse2?.generated_photos?.output_image) &&
                    !isLoading &&
                    !isError &&
                    !isError2 && (
                      <div className="bg-black w-full text-white flex justify-center text-[14px] h-[54px] gap-4">
                        {vtonResponse?.generated_photos?.output_image[
                          "full_body_front"
                        ] && (
                          <button
                            className={`mt-5 ${selectedTab === "full_body_front" ? "border-b-4 border-nyx-yellow font-semibold" : ""}`}
                            onClick={() => {
                              setSelectedTab("full_body_front");
                            }}
                          >
                            {" "}
                            Full Body Front{" "}
                          </button>
                        )}

                        {vtonResponse?.generated_photos?.output_image[
                          "full_body_45"
                        ] && (
                          <button
                            className={`mt-5 ${selectedTab === "full_body_45" ? "border-b-4 border-nyx-yellow font-semibold" : ""}`}
                            onClick={() => {
                              setSelectedTab("full_body_45");
                            }}
                          >
                            {" "}
                            Full Body 45{" "}
                          </button>
                        )}

                        {vtonResponse2?.generated_photos?.output_image[
                          "full_body_back"
                        ] && (
                          <button
                            className={`mt-5 ${selectedTab === "full_body_back" ? "border-b-4 border-nyx-yellow font-semibold" : ""}`}
                            onClick={() => {
                              setSelectedTab("full_body_back");
                            }}
                          >
                            {" "}
                            Full Body Back{" "}
                          </button>
                        )}
                      </div>
                    )}
                  {vtonResponse?.generated_photos?.output_image &&
                  isLoading == false &&
                  !isError &&
                  !isError2 &&
                  (selectedTab == "full_body_45" ||
                    selectedTab == "full_body_front") ? (
                    <VtonOutput
                      vtonResponse={vtonResponse}
                      selectedTab={selectedTab}
                    />
                  ) : null}

                  {vtonResponse2?.generated_photos?.output_image &&
                  isLoading == false &&
                  !isError &&
                  !isError2 &&
                  selectedTab == "full_body_back" ? (
                    <VtonOutput2
                      vtonResponse2={vtonResponse2}
                      selectedTab={selectedTab}
                    />
                  ) : null}
                </div>

                {vtonResponse == null &&
                  isLoading == false &&
                  isError == false &&
                  vtonResponse2 == null &&
                  isError2 == false && (
                    <div className="">
                      <Steper tab={tab} steperpro={steperpro} />
                    </div>
                  )}

                {isLoading && (
                  <>
                    <LoadingScreen />
                    <div className="flex justify-center items-center mt-2"></div>
                  </>
                )}

                {(isError || isError2) && !isLoading && (
                  <>
                    <div className="h-[400px] w-full flex justify-center items-center	mb-8 flex-col">
                      <div className="h-[200px] w-[320px] bg-violet-900 flex justify-center items-center rounded-md p-2">
                        <div className="">
                          <p className=" text-white mb-4 text-center ">
                            There is some error occured please generate again
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <LandscapePopup />
    </>
  );
}
