/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import Link from "next/link";
import { getModelPlayGround, allmodelcards } from "@nyx-frontend/main/services/model";
import { useQuery } from "@tanstack/react-query";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";

const PlayGroundApi = ({ modelName, inference, latency }) => {
  const { data: playgroundData } = useQuery({
    queryKey: ["playground-model-data", modelName],
    queryFn: async () => {
      return await getModelPlayGround(modelName);
    },
  });

  const { data: models } = useQuery({
    queryKey: ["modeldataDataAll-playground"],
    queryFn: allmodelcards,
  });

  return (
    <>
      <div className="w-full flex flex-col md:flex-row gap-6 md:mt-[72px] lg:mt-[30px]">
        <div className="w-full md:w-[50%] lg:w-[60%] lg:p-5 flex flex-col gap-5 mt-[80px] md:mt-0">
          <div className="flex flex-col">
          <div className="md:hidden h-[90px] grid grid-cols-2 gap-4 mb-4">
            <div
              className="flex flex-col items-center justify-center rounded-lg"
              style={{
                background:
                  "linear-gradient(180deg, #2A1B3B 100%, #FFFFFF 100%)",
              }}
            >
              <p className="text-[20px] md:text-[24px] font-bold">
                {inference}
              </p>{" "}
              <p className="text-[14px] md:text-[16px] font-light">
                Inferences
              </p>
            </div>
            <div
              className="flex flex-col items-center justify-center rounded-lg"
              style={{
                background:
                  "linear-gradient(180deg, #2A1B3B 100%, #FFFFFF 100%)",
              }}
            >
              <p className="text-[20px] md:text-[24px] font-bold">{latency}s</p>{" "}
              <p className="text-[14px] md:text-[16px] font-light">
                Average Latency
              </p>
            </div>
          </div>
            <div
              className="text-[18px] md:text-[24px] font-bold text-white my-4"
              data-testid="model-name"
            >
              {playgroundData?.model_name}
            </div>

            {playgroundData?.model_json?.article?.content
              ?.sort((a, b) => a.displayOrder - b.displayOrder) // Sort the content based on displayOrder
              ?.map((data, index) => (
                <div
                  key={data.displayOrder}
                  className="text-[14px] md:text-[18px] font-light text-white mb-5"
                >
                  {data.type === "paragraph" && <p>{data.text}</p>}
                  {playgroundData.slug === "bg-remover" &&
                    data.displayOrder == 1 && (
                      <ReactCompareSlider
                        className="mt-6 mb-3"
                        itemOne={
                          <ReactCompareSliderImage
                            src="/tback-image.jpg"
                            alt="Image one"
                          />
                        }
                        itemTwo={
                          <ReactCompareSliderImage
                            src="/tfront-image.jpg"
                            alt="Image two"
                          />
                        }
                      />
                    )}
                  {data.type === "image_section" && (
                    <img
                      src={data.images[0].src}
                      alt="Image"
                      width="auto"
                      height={data.images[0].height}
                    />
                  )}
                </div>
              ))}
            {/* <div>
                <img src={`${IMAGE_URL}/models/collage-description.png`} alt="" />
              </div> */}
          </div>
          
        </div>
        <div className=" md:w-[50%] lg:w-[40%] flex flex-col md:mt-8 lg:p-5 md:gap-10 lg:gap-14">
          <div
            className=" max-md:hidden w-full md:max-w-screen-md lg:max-w-screen-lg 
              xl:max-w-screen-xl h-20 flex justify-center text-center items-center rounded-md mb-[38px] md:mb-0"
            style={{
              background: "linear-gradient(180deg, #2A1B3B 100%, #FFFFFF 100%)",
            }}
          >
            <div className="w-1/2 lg:p-2">
              <p className="text-[20px] md:text-[24px] font-bold">
                {inference}
              </p>{" "}
              <p className="text-[14px] md:text-[16px] font-light">
                Inferences
              </p>
            </div>
            <div className="w-1/2 lg:p-2">
              <p className="text-[20px] md:text-[24px] font-bold">{latency}s</p>{" "}
              <p className="text-[14px] md:text-[16px] font-light">
                Average Latency
              </p>
            </div>
          </div>

          
          <div className="w-full flex flex-col gap-5">
            <div className="text-[20px] md:text-[24px] font-semibold">
              Popular Models
            </div>

            <div className="flex flex-col items-center justify-center gap-4">
              {models &&
                models
                  ?.filter((model) => model?.slug !== modelName)
                  ?.map((model) => (
                    <>
                      <div
                        className="w-full md:max-w-screen-md lg:max-w-screen-lg relative
                        xl:max-w-screen-xl h-[170px] rounded-md flex items-start px-4 py-3"
                        style={{
                          background:
                            "linear-gradient(180deg, #2A1B3B 100%, #FFFFFF 100%)",
                        }}
                      >
                        <div className="w-1/2 xl:w-2/6 md:mr-4">
                          <img
                            // src="https://storage.googleapis.com/nyxassets-new/assets/images/model/likelihood.png"
                            src={model?.img_url}
                            alt="likelihood"
                            className="w-full md:max-w-screen-md lg:max-w-screen-lg 
                            xl:max-w-screen-xl h-[147px] rounded-lg"
                          />
                        </div>
                        <div className="w-1/2 md:py-4 px-4  md:px-2 lg:px-3 flex flex-col md:basis-3/5">
                          <p className="text-[14px] md:text-[18px] font-semibold mt-3 md:mt-0">
                            {model?.model_name}
                          </p>
                          <Link href={`/models/${model?.slug}`}>
                            <button
                              className="w-[118px] h-[36px] font-medium rounded-full text-white 
                      bg-gradient-to-r from-[#B631B1] to-[#7048D7] shadow shadow-blue-500/40 
                      hover:shadow-buttonShadow buttonShadowTransition mt-5 md:mt-7 text-center absolute bottom-4"
                            >
                              Try it out
                            </button>
                          </Link>
                        </div>
                      </div>
                    </>
                  ))}

              {/* Model 5 */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlayGroundApi;
