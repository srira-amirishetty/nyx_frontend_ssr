/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import { Slider, Tooltip } from "rsuite";
import "./rsuiteSlider.css";
import "rsuite/Slider/styles/index.css";
import "rsuite/RangeSlider/styles/index.css";
import { diffusionServices } from "@nyx-frontend/main/services/model";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { IMAGE_URL } from "@nyx-frontend/main/components/constants";

const OutpaintingPlayground = () => {
  const [RangeSliderValue, setRangeSliderValue] = useState(0);
  const [inputPromt, setInputPrompt] = useState("");
  const [outputURL, setOutputURL] = useState("");
  const [loading, setloading] = useState(false);
  const [inference, setInference] = useState(500);
  const [latency, setlatency] = useState(10.2);
  const [time, setTime] = useState(1.1);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(URL.createObjectURL(e.target.files[0]));
    // Handle file selection here if needed
  };

  const mutategenerateServices = useMutation({
    mutationKey: ["image-generate"],
    mutationFn: diffusionServices,
  });

  const generateButtonClicked = () => {
    setloading(true);
    let data = {
      generate_id: 1,
      num_inference_steps: RangeSliderValue,
      // lora_scale: 0.1,
      // image_path: "ml_models/1/",
      // image_name: "datetime.png",
      // seed: 1,
      prompt: inputPromt,
    };
    mutategenerateServices.mutate(data, {
      onSuccess: (response) => {
        console.log(response);
        setOutputURL(response?.output_url);
        setInference(response?.total_inference);
        setlatency(response?.avg_latency);
        setTime(response?.time_response);
        setloading(false);
      },
      onError: (errorResponse) => {
        console.log(errorResponse);
        setloading(false);
      },
    });
  };

  return (
    <>
      <div className="flex flex-col mt-8 text-white w-full h-full">
        <div className="w-full h-[700px] flex flex-col md:flex-row">
          {/* Prompt section starts*/}
          <div className="md:w-1/2 lg:p-5">
            <div
              className="flex flex-col items-center w-full h-auto md:h-auto bg-[#2A1B3B] 
            rounded-md md:p-5 border-[0.96px] border-[#8297BD]"
            >
              <div
                className="w-full h-auto rounded-md p-2 lg:p-5 flex flex-col gap-5"
                style={{
                  background:
                    "linear-gradient(180deg, #2A1B3B 100%, #FFFFFF 100%)",
                }}
              >
                <div className="w-full">
                  <div className="flex flex-col">
                    {selectedFile ? (
                      <div className="w-full h-[230px] mt-2">
                        <img
                          src={selectedFile}
                          alt="Selected"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                    ) : (
                      <div className="w-full h-[230px] mt-2 bg-neutral-500" />
                    )}
                    <input
                      id="fileInput"
                      type="file"
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                    />
                    <button
                      className="w-full border border-[#B631B1] rounded-full h-[36px] mt-4"
                      onClick={() => {
                        document.getElementById("fileInput").click();
                      }}
                    >
                      + Upload
                    </button>
                  </div>
                </div>
                <div className="w-full">
                  <label
                    htmlFor="prompt"
                    className="flex mb-[12px] text-[14px] lg:text-[14px] font-semibold w-full text-white"
                  >
                    Prompt
                  </label>
                  <textarea
                    type="text"
                    id="prompt"
                    placeholder="cyborg in a battlefield, explosions, highly detailed"
                    className=" text-[12px] lg:text-[14px] w-full h-[123px] md:h-[150px] rounded-[4px] px-4 py-2 bg-transparent border border-[#8297BD] focus:outline-none autofill active:text-[#FFFFFF]"
                    value={inputPromt}
                    onChange={(e) => setInputPrompt(e.target.value)}
                  />
                </div>
              </div>
              <button
                className="w-[309px] h-[36px] font-medium rounded-full text-[14px] text-white 
                bg-gradient-to-r from-[#B631B1] to-[#7048D7] shadow shadow-blue-500/40 
                hover:shadow-buttonShadow buttonShadowTransition mt-4 mb-4 text-center"
                onClick={generateButtonClicked}
              >
                {loading ? "Generating..." : "Generate"}
              </button>
            </div>
          </div>
          {/* Prompt section ends*/}

          {/* Image generated section starts*/}
          <div className="md:w-1/2 md:pl-2 lg:p-5 object-contain mt-5 md:mt-0">
            {outputURL.length > 0 ? (
              <div className="w-full h-full">
                <img
                  src={outputURL}
                  alt="output"
                  className="h-full w-full rounded-md"
                />
              </div>
            ) : (
              <div className="w-full h-full">
                <img
                  //src="https://storage.googleapis.com/nyxassets-new/assets/images/model/diffusion_default.png"
                  // src={`https://storage.googleapis.com/nyxassets-new/assets/images/model/bg-remove.png `}
                  src="https://storage.googleapis.com/nyxassets-new/assets/images/model/sample/outpainting-model.png"
                  alt="default"
                  className="lg:mx-auto lg:px-4 w-full h-[375px] md:h-[390.33px] 
                  lg:h-[540.33px] xl:h-[640.33px] lg:max-w-screen-lg 
                  xl:max-w-screen-xl object-fill mt-4 md:mt-0"
                />
              </div>
            )}
            {outputURL.length > 0 ? (
              <div className="my-3 text-[12px]">
                Generated in <span>{time}</span> s
              </div>
            ) : null}
          </div>

          {/* Image generated section ends*/}
        </div>

        {/* Model details section starts*/}
        <div className="w-full flex flex-col md:flex-row">
          <div className="w-full md:w-[50%] lg:w-[60%] lg:p-5 flex flex-col gap-5 mt-[280px] md:mt-0 lg:mt-[80px]">
            <div className="flex flex-col">
              <div className="text-[18px] md:text-[24px] font-bold text-white my-4">
                NYX Diffusion Maharashtra
              </div>
              <div className="text-[14px] md:text-[18px] font-light text-white mb-5">
                NYX Diffusion Maharashtra is an innovative image generation
                model developed by NYX Today, utilising the powerful base model
                provided by stabilityai, `stable-diffusion-xl-base-1.0`.
                Designed to cater to a wide range of users, this model is our
                entry-level offering, providing accessibility without
                compromising on quality.
              </div>
              <div>
                {/* <img src={`${IMAGE_URL}/models/Group%20Image.png`} alt="" /> */}
              </div>

              <div className="text-[14px] md:text-[18px] font-light text-white my-5">
                NYX Diffusion Maharashtra has been specifically trained on a
                curated dataset of 280 images from Maharashtra, enabling it to
                generate high-quality images that capture the essence and
                diversity of this vibrant Indian state. Whether you&apos;re
                looking to create visuals of Maharashtra&apos;s bustling urban
                landscapes or its serene rural settings, this model can cater to
                your creative needs.
              </div>
              <div className="text-[14px] md:text-[18px] font-light text-white my-5">
                Details regarding the API access and pricing plans will be
                announced soon. This will allow developers, artists, and content
                creators to integrate NYX Diffusion Maharashtra seamlessly into
                their projects.
              </div>
              <div className="text-[14px] md:text-[18px] font-light text-white my-5">
                Stay tuned for the launch of other NYX Diffusion Models, which
                are being trained on significantly larger datasets to cover a
                broader spectrum of themes and styles. These advanced models
                will offer enhanced capabilities and higher precision in image
                generation.
              </div>
              <div className="text-[14px] md:text-[18px] font-light text-white my-5">
                NYX Diffusion Maharashtra opens up a realm of possibilities for
                generating digital images with a local touch. We are excited to
                see how you will leverage this model to explore, create, and
                inspire. Stay connected for more updates on our offerings,
                including detailed API access and competitive pricing options.
              </div>
            </div>
          </div>
          <div className="md:w-[50%] lg:w-[40%] flex flex-col mt-5 lg:p-5 md:gap-10 lg:gap-14 ml-4">
            <div
              className="w-full md:max-w-screen-md lg:max-w-screen-lg 
              xl:max-w-screen-xl h-20 flex justify-center text-center items-center rounded-md mb-[38px] md:mb-0"
              style={{
                background:
                  "linear-gradient(180deg, #2A1B3B 100%, #FFFFFF 100%)",
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
                <p className="text-[20px] md:text-[24px] font-bold">
                  {latency}s
                </p>{" "}
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
                {/* Model 2 */}
                <div
                  className="w-full md:max-w-screen-md lg:max-w-screen-lg relative
                  xl:max-w-screen-xl h-[101px] md:h-[147px] rounded-md flex items-start"
                  style={{
                    background:
                      "linear-gradient(180deg, #2A1B3B 100%, #FFFFFF 100%)",
                  }}
                >
                  <div className="md:basis-2/5">
                    <img
                      // src="https://storage.googleapis.com/nyxassets-new/assets/images/model/inpainting-tab.png"
                      src="https://storage.googleapis.com/nyxassets-new/assets/images/model/listing/inpainting.png"
                      alt="inpainting"
                      className="w-full md:max-w-screen-md lg:max-w-screen-lg 
                      xl:max-w-screen-xl h-[100px] md:h-[147px]"
                    />
                  </div>
                  <div className="w-auto md:py-4 px-4 md:px-3 flex flex-col md:basis-3/5">
                    <p className="text-[14px] md:text-[18px] font-semibold mt-3 md:mt-0">
                      Inpainting
                    </p>

                    <button
                      className="w-[118px] h-[36px] font-medium rounded-full text-white 
                      bg-gradient-to-r from-[#B631B1] to-[#7048D7] shadow shadow-blue-500/40 
                      hover:shadow-buttonShadow buttonShadowTransition mt-5 md:mt-7 text-center absolute bottom-4"
                    >
                      Try it out
                    </button>
                  </div>
                </div>

                {/* Model 3 */}
                <div
                  className="w-full md:max-w-screen-md lg:max-w-screen-lg relative
                  xl:max-w-screen-xl h-[101px] md:h-[147px] rounded-md flex items-start"
                  style={{
                    background:
                      "linear-gradient(180deg, #2A1B3B 100%, #FFFFFF 100%)",
                  }}
                >
                  <div className="md:basis-2/5">
                    <img
                      // src="https://storage.googleapis.com/nyxassets-new/assets/images/model/popular.png"
                      src="https://storage.googleapis.com/nyxassets-new/assets/images/model/listing/outpainting_predictor.png"
                      alt="outpainting_predictor"
                      className="w-full md:max-w-screen-md lg:max-w-screen-lg 
                      xl:max-w-screen-xl h-[100px] md:h-[147px]"
                    />
                  </div>
                  <div className="w-auto md:py-4 px-4 md:px-3 flex flex-col md:basis-3/5">
                    <p className="text-[14px] md:text-[18px] font-semibold mt-3 md:mt-0">
                      Outpainting
                    </p>

                    <button
                      className="w-[118px] h-[36px] font-medium rounded-full text-white 
                      bg-gradient-to-r from-[#B631B1] to-[#7048D7] shadow shadow-blue-500/40 
                      hover:shadow-buttonShadow buttonShadowTransition mt-5 md:mt-7 text-center absolute bottom-4"
                    >
                      Try it out
                    </button>
                  </div>
                </div>

                {/* Model 4 */}
                <div
                  className="w-full md:max-w-screen-md lg:max-w-screen-lg relative
                  xl:max-w-screen-xl h-[101px] md:h-[147px] rounded-md flex items-start"
                  style={{
                    background:
                      "linear-gradient(180deg, #2A1B3B 100%, #FFFFFF 100%)",
                  }}
                >
                  <div className="md:basis-2/5">
                    <img
                      // src="https://storage.googleapis.com/nyxassets-new/assets/images/model/bg-remove.png"
                      src="https://storage.googleapis.com/nyxassets-new/assets/images/model/listing/bg_remove.png"
                      alt="bg_remove"
                      className="w-full md:max-w-screen-md lg:max-w-screen-lg 
                      xl:max-w-screen-xl h-[100px] md:h-[147px]"
                    />
                  </div>
                  <div className="w-auto md:py-4 px-4 md:px-3 flex flex-col md:basis-3/5">
                    <p className="text-[14px] md:text-[18px] font-semibold mt-3 md:mt-0">
                      Bg remove
                    </p>

                    <button
                      className="w-[118px] h-[36px] font-medium rounded-full text-white 
                      bg-gradient-to-r from-[#B631B1] to-[#7048D7] shadow shadow-blue-500/40 
                      hover:shadow-buttonShadow buttonShadowTransition mt-5 md:mt-7 text-center absolute bottom-4"
                    >
                      Try it out
                    </button>
                  </div>
                </div>

                {/* Model 5 */}
                <div
                  className="flex items-start w-full md:max-w-screen-md lg:max-w-screen-lg 
                  xl:max-w-screen-xl h-[101px] md:h-[147px] rounded-md relative"
                  style={{
                    background:
                      "linear-gradient(180deg, #2A1B3B 100%, #FFFFFF 100%)",
                  }}
                >
                  <div className="md:basis-2/5">
                    <img
                      // src="https://storage.googleapis.com/nyxassets-new/assets/images/model/likelihood.png"
                      src="https://storage.googleapis.com/nyxassets-new/assets/images/model/listing/image_predictor.png"
                      alt="image_predictor"
                      className="w-full md:max-w-screen-md lg:max-w-screen-lg 
                      xl:max-w-screen-xl h-[100px] md:h-[147px]"
                    />
                  </div>
                  <div className="w-auto md:py-4 px-4 md:px-3 flex flex-col mt-3 md:mt-0 md:basis-3/5">
                    <p className="text-[14px] md:text-[18px] font-semibold mt-0">
                      Image likelihood predictor
                    </p>

                    <button
                      className="w-[118px] h-[36px] font-medium rounded-full text-white 
                      bg-gradient-to-r from-[#B631B1] to-[#7048D7] shadow shadow-blue-500/40 
                      hover:shadow-buttonShadow buttonShadowTransition mt-5 md:mt-7 text-center absolute bottom-4"
                    >
                      Try it out
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OutpaintingPlayground;
