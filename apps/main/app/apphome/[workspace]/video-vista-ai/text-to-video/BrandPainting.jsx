import React, { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import { BRAND_TABS_Three } from "@nyx-frontend/main/utils/productConstants";
import Button from "@nyx-frontend/main/components/Button";
import LogoComponent from "./LogoComponent";
import { toast } from "react-toastify";
import { useQuery, useMutation } from "@tanstack/react-query";
import { updateTextToVideo } from "@nyx-frontend/main/services/videoGenerationServices";
import { MessagePopupContext } from "@nyx-frontend/main/hooks/MessagePopupContext";
import ButtonLoading from "./ButtonLoading";
import { CreativesTab } from "@nyx-frontend/main/shared/inputs";
import { VIDEO_SLATE } from "@nyx-frontend/main/utils/utils";
import "react-toastify/dist/ReactToastify.css";
import "@nyx-frontend/main/app/_components/toastifyTest/toastify.css";
import { SwitchTab } from "./_components/SwitchTab";

const BrandPainting = ({
  tab,
  setBrandTab,
  campaignId,
  brandDetails,
  videoSetDone,
  settingBrandPaint,
  settingGen,
  generateBtn,
  generate,
  isLoading,
  mutateVideoGeneration,
  mutateVideo,
  isRefetching
}) => {
  const [selectedRectangle, setSelectedRectangle] = useState(null);
  const [uploadedLogos, setUploadedLogos] = useState([]);
  const [uplloadedPlate, setUploadedPlate] = useState([]);
  const [inputId, setInputId] = useState(0);
  const [inputId2, setInputId2] = useState(0);
  const [placement, setPlacement] = useState("");
  const [plate, setPlate] = useState(null);
  const [logos, setLogos] = useState(null);
  const [fileLogo, setFilelogo] = useState(null);
  const [plates, setPlates] = useState(null);
  const [prevPlate, setPrevPlate] = useState(null);
  const [prevPlateLogo, setPrevPlateLogo] = useState(null);
  const [createSlate, setCreateSlate] = useState(0);

  const [startSlates, setStartSlates] = useState(null);
  const [uplloadedStartSlate, setUploadedStartSlate] = useState([]);
  const [inputIdStart, setInputIdStart] = useState(0);

  const [endSlates, setEndSlates] = useState(null);
  const [uplloadedEndSlate, setUploadedEndSlate] = useState([]);
  const [inputIdEnd, setInputIdEnd] = useState(0);

  useEffect(() => {
    setStartSlates(null);
    setEndSlates(null);

    setPlate(null);
    setPlates(null);
    setPrevPlate(null);
    setPrevPlateLogo(null);
    setUploadedPlate([]);
  }, [brandDetails]);

  // const handlePlateUpload = async (event) => {
  //   const uploadedFiles = event.target.files;
  //   const newLogos = [];

  //   setPlates(event.target.files[0]);

  //   const readFile = (file) => {
  //     return new Promise((resolve, reject) => {
  //       const reader = new FileReader();

  //       reader.onload = () => {
  //         resolve({
  //           name: file.name,
  //           url: reader.result,
  //           file1: file,
  //         });
  //       };

  //       reader.onerror = () => {
  //         reject(new Error("Error reading file"));
  //       };

  //       reader.readAsDataURL(file);
  //     });
  //   };

  //   for (let i = 0; i < uploadedFiles.length; i++) {
  //     try {
  //       const logo = await readFile(uploadedFiles[i]);
  //       newLogos.push(logo);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }

  //   setUploadedPlate((prevLogos) => [...prevLogos, ...newLogos]);
  //   setInputId((prevId) => prevId + 1);
  //   event.target.value = null;
  // };

  const handleStartSlateUpload = async (event) => {
    const uploadedFiles = event.target.files;
    const newLogos = [];

    setStartSlates(event.target.files[0]);

    const readFile = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
          resolve({
            name: file.name,
            url: reader.result,
            file1: file,
          });
        };

        reader.onerror = () => {
          reject(new Error("Error reading file"));
        };

        reader.readAsDataURL(file);
      });
    };

    for (let i = 0; i < uploadedFiles.length; i++) {
      try {
        const logo = await readFile(uploadedFiles[i]);
        newLogos.push(logo);
      } catch (error) {
        console.error(error);
      }
    }

    setUploadedStartSlate((prevLogos) => [...prevLogos, ...newLogos]);
    setInputIdStart((prevId) => prevId + 1);
    event.target.value = null;
  };

  const handleEndSlateUpload = async (event) => {
    const uploadedFiles = event.target.files;
    const newLogos = [];

    setEndSlates(event.target.files[0]);

    const readFile = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
          resolve({
            name: file.name,
            url: reader.result,
            file1: file,
          });
        };

        reader.onerror = () => {
          reject(new Error("Error reading file"));
        };

        reader.readAsDataURL(file);
      });
    };

    for (let i = 0; i < uploadedFiles.length; i++) {
      try {
        const logo = await readFile(uploadedFiles[i]);
        newLogos.push(logo);
      } catch (error) {
        console.error(error);
      }
    }

    setUploadedEndSlate((prevLogos) => [...prevLogos, ...newLogos]);
    setInputIdEnd((prevId) => prevId + 1);
    event.target.value = null;
  };

  // const handlePlate = (val) => {
  //   if (val == plates) {
  //     setPlates(null);
  //   } else {
  //     setPlates(val);
  //   }
  // };

  const handleStartSlate = (val) => {
    if (val == startSlates) {
      setStartSlates(null);
    } else {
      setStartSlates(val);
    }
  };

  const handleEndSlate = (val) => {
    if (val == endSlates) {
      setEndSlates(null);
    } else {
      setEndSlates(val);
    }
  };

  const plateChange = (e) => {
    setPlate(e.target.value);
  };

  const nextToMusic = () => {
    if (plate == null && plates == null) {
      const data = {
        brand_plate: {},
      };
      const args = { campaignId, data };

      updateCampaign4.mutate(args, {
        onSuccess: (response) => {
          settingBrandPaint(true);
          setBrandTab(null);
          settingGen(1);
        },
        onError: (res) => {
          console.log(res);
        },
      });
    } else if (plate != null && plates != null) {
      const data = new FormData();

      if (plate == "start") {
        data.append("brand_plate[start_img]", plates);
        data.append("brand_plate[end_img]", "");
      } else {
        data.append("brand_plate[end_img]", plates);
        data.append("brand_plate[start_img]", "");
      }

      const args = { campaignId, data };

      updateCampaign4.mutate(args, {
        onSuccess: (response) => {
          settingBrandPaint(true);
          setBrandTab(null);
          settingGen(1);
          setPrevPlate(plate);
          setPrevPlateLogo(plates);
        },
        onError: (res) => {
          console.log(res);
        },
      });
    } else if (plate === null && plates != null) {
      toast.error("Please choose one start/end plate");
    } else if (plate != null && plates === null) {
      toast.error("Please select the Plate Logo");
    }
  };

  const nextToGenerateVideoFromText = () => {
    if (startSlates == null && endSlates == null) {
      const data = {
        brand_plate: {},
      };
      const args = { campaignId, data };

      updateCampaign4.mutate(args, {
        onSuccess: (response) => {
          settingBrandPaint(true);
          // setBrandTab(null);
          settingGen(1);
          generateBtn(true)
        },
        onError: (res) => {
          toast.error(
            <>
              <span className="text-white text-[20px]">Bad Request</span>
              <br />
              <span className="text-white text-[16px]">
                {res?.response?.data?.message}
              </span>
              <br />

            </>,
            { autoClose: 5000 }
          );

        },
      });
    } else if (startSlates != null || endSlates != null) {
      const data = new FormData();

      if (startSlates) {
        data.append("brand_plate[start_img]", startSlates);
      }

      if (endSlates) {
        data.append("brand_plate[end_img]", endSlates);
      }

      const args = { campaignId, data };

      updateCampaign4.mutate(args, {
        onSuccess: (response) => {
          settingBrandPaint(true);
          setBrandTab(null);
          settingGen(1);
          setPrevPlate(plate);
          setPrevPlateLogo(plates);
          generateBtn(true)
        },
        onError: (res) => {
          toast.error(
            <>
              <span className="text-white text-[20px]">Bad Request</span>
              <br />
              <span className="text-white text-[16px]">
                {res?.response?.data?.message}
              </span>
              <br />

            </>,
            { autoClose: 5000 }
          );
          console.log(res);
        },
      });
    } else if (startSlates === null) {
      toast.error(
        <>
          <span className="text-white text-[20px]">Bad Request</span>
          <br />
          <span className="text-white text-[16px]">
            Please select the Start Logo
          </span>
          <br />

        </>,
        { autoClose: 5000 }
      );
    } else if (endSlates === null) {
      toast.error(
        <>
          <span className="text-white text-[20px]">Bad Request</span>
          <br />
          <span className="text-white text-[16px]">
            Please select the end Slate Logo
          </span>
          <br />

        </>,
        { autoClose: 5000 }
      );
    }
  };

  const updateCampaign4 = useMutation({
    mutationKey: ["Update-campaign4"],
    mutationFn: updateTextToVideo,
  });

  const handleTab = () => {
    if (videoSetDone) {
      if (tab !== BRAND_TABS_Three.PAINTING) {
        setBrandTab(BRAND_TABS_Three.PAINTING);
      } else {
        setBrandTab("");
      }
    } else {

      toast.warn(
        <>
          <span className="text-white text-[20px]">Video Setting is Missing</span>
          <br />
          <span className="text-white text-[16px]">
            {" "}
            Please Complete Video Setting First.
          </span>
        </>,
        { autoClose: 5000 },
      );
    }
  };

  const ClearAll = () => {
    setPlates(null);
    setPlate(null);
  };

  // const handleDeletePlate = (logoToDelete) => {
  //   setUploadedPlate((prevLogos) =>
  //     prevLogos.filter((logo) => logo !== logoToDelete),
  //   );
  // };

  const handleDeleteStartslate = (logoToDelete) => {
    setUploadedStartSlate((prevLogos) =>
      prevLogos.filter((logo) => logo !== logoToDelete),
    );
  };

  const handleDeleteEndslate = (logoToDelete) => {
    setUploadedEndSlate((prevLogos) =>
      prevLogos.filter((logo) => logo !== logoToDelete),
    );
  };

  const { displayMessagePopup } = useContext(MessagePopupContext);
  return (
    <>
      <div className={`${tab === BRAND_TABS_Three.PAINTING ? "bg-[#332270]" : "bg-[#23145A]"} rounded-lg`}>
        <h2 className="mb-0">
          <div
            className={`${tab === BRAND_TABS_Three.PAINTING
              } group relative flex w-full items-center border-0 px-5 py-4 text-left text-base cursor-pointer text-[#FFFFFF] rounded-lg`}
            onClick={handleTab}
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            <div className="flex w-full justify-between items-center">
              <div
                className={`w-[50%] md:w-full font-semibold flex ${tab === BRAND_TABS_Three.PAINTING
                  ? "text-[#FFCB54] text-lg"
                  : "text-[#FFFFFF] text-sm"
                  }`}
              >
                Add Startslate/Endslate{" "}
              </div>
            </div>

            <span
              className={`${tab === BRAND_TABS_Three.PAINTING
                ? `rotate-[-180deg] -mr-1`
                : `dark:fill-white`
                } ml-auto h-5 w-5 shrink-0 transition-transform duration-200 ease-in-out motion-reduce:transition-none`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </span>
          </div>
        </h2>
        <motion.div
          initial={{
            height: 0,
            opacity: 0,
          }}
          animate={{
            height: tab === BRAND_TABS_Three.PAINTING ? "auto" : 0,
            opacity: 1,
          }}
          exit={{
            height: 0,
            opacity: 0,
          }}
          className={` w-full overflow-hidden rounded-lg`}
        >
          <div className="py-2 md:px-7 sm:px-4">
            {/* <div className="flex flex-col gap-5">
              <div className="w-full">
                <>
                  <div className="w-full flex flex-col gap-3">
                    <div className="flex flex-row  justify-between">
                      <div className="flex flex-row">
                        <div className="p-2 flex items-center gap-1 rounded-[4px] ">
                          <input
                            id="startPlate"
                            type="radio"
                            value="start"
                            name="platebtn"
                            checked={plate == "start"}
                            onChange={plateChange}
                            className="cursor-pointer  appearance-none bg-transparent w-4 h-4 border-[2px] border-nyx-white-1 rounded-full checked:bg-nyx-yellow checked:border-nyx-white-1 focus:outline-nyx-white-1 checked:border-[4px]"
                          />
                          <label htmlFor="startPlate">
                            <p
                              className="cursor-pointer text-sm font-normal text-white"
                              title="The video's opening frame that sets the scene"
                            >
                              Start Slate
                            </p>
                          </label>
                        </div>
                        <div className="p-2 flex items-center gap-1 rounded-[4px] ">
                          <input
                            id="endPlate"
                            type="radio"
                            value="end"
                            name="platebtn"
                            checked={plate == "end"}
                            onChange={plateChange}
                            className="cursor-pointer  appearance-none bg-transparent w-4 h-4 border-[2px] border-nyx-white-1 rounded-full checked:bg-nyx-yellow checked:border-nyx-white-1 focus:outline-nyx-white-1 checked:border-[4px]"
                          />
                          <label htmlFor="endPlate">
                            <p
                              className="cursor-pointer text-sm font-normal text-white "
                              title="The video's concluding frame, often with extra info"
                            >
                              End Slate
                            </p>
                          </label>
                        </div>
                      </div>
                      {plate !== null && (
                        <div
                          className="text-white opacity-25 text-sm hover:opacity-100 cursor-pointer hover:underline"
                          onClick={ClearAll}
                        >
                          Clear
                        </div>
                      )}
                    </div>

                    <div className=" w-full flex flex-row mb-5  ">
                      <div className="grid grid-cols-2 2xl:grid-cols-3 gap-4  place-items-center">
                        {uplloadedPlate.map((logo, index) => (
                          <>
                            <div
                              onClick={() => handlePlate(logo.file1)}
                              key={index}
                            >
                              <LogoComponent
                                key={index}
                                logo={logo}
                                logos={plates}
                                onDelete={handleDeletePlate}
                              />
                            </div>
                          </>
                        ))}

                        <div className="w-full mt-3 ml-1">
                          <div className="bg-[#1D1138] flex text-center items-center justify-center w-[155px] h-[35px] text-sm rounded-t-lg text-[#FFF]">
                            Upload Slate
                          </div>
                          <div className="bg-[#6F559A] w-[155px] h-[95px] rounded-b-lg flex justify-center items-center">
                            <label
                              htmlFor={`uploadPlate_${inputId}`}
                              className="border border-nyx-yellow text-nyx-yellow transition-all rounded-full p-3"
                            >
                              <svg
                                viewBox="0 0 17 17"
                                className="w-4 h-4 fill-current text-nyx-yellow"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M15.14 8.5a.797.797 0 0 1-.796.797H9.297v5.047a.797.797 0 0 1-1.594 0V9.297H2.656a.797.797 0 0 1 0-1.594h5.047V2.656a.797.797 0 0 1 1.594 0v5.047h5.047a.797.797 0 0 1 .797.797Z" />
                              </svg>
                            </label>
                            <input
                              type="file"
                              id={`uploadPlate_${inputId}`}
                              className="hidden"
                              accept=".png, .jpg, .jpeg"
                              onChange={handlePlateUpload}
                              multiple
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full flex gap-4 justify-center items-center">
                    <Button
                      className={` mb-2 font-semibold rounded-full w-32  text-nyx-yellow disabled:hover:cursor-not-allowed  hover:shadow-none   hover:text-black  focus:shadow-glow focus:bg-nyx-yellow focus:text-black ${updateCampaign4.isPending && " bg-nyx-gray-1 hover:bg-nyx-gray-1 border-none"} disabled:cursor-not-allowed`}
                      onClick={nextToMusic}
                      disabled={updateCampaign4.isPending}
                    >
                      {updateCampaign4.isPending ? <ButtonLoading /> : "Next"}
                    </Button>
                  </div>
                </>
              </div>
            </div> */}

            <div className="w-full">
              <SwitchTab
                data={VIDEO_SLATE}
                tabState={setCreateSlate}
                tabStatus={createSlate}
              />
            </div>
            <div className="w-full">
              {createSlate === 0 && (
                <div className="w-full py-5 flex flex-col gap-5">
                  <div className="w-full flex flex-wrap place-items-center gap-3">
                    {uplloadedStartSlate.map((logo, index) => (
                      <>
                        <div
                          onClick={() => handleStartSlate(logo.file1)}
                          key={index}
                          className="mx-auto"
                        >
                          <LogoComponent
                            key={index}
                            logo={logo}
                            logos={startSlates}
                            onDelete={handleDeleteStartslate}
                          />
                        </div>
                      </>
                    ))}

                    <div className="w-full mt-3 ml-1 mb-3 mx-auto">
                      <div className="bg-gradient-to-r mx-auto  from-gray-300/40 to-gray-500/25 w-[155px] h-[130px] rounded-lg flex justify-center items-center">
                        <label
                          htmlFor={`uploadPlate_${inputIdStart}`}
                          className="flex flex-col gap-3 text-sm justify-center items-center p-3 text-white"
                        >
                          <svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.8461 27.1647V8.71534L9.96039 14.601L6.79117 11.3186L18.1098 0L29.4284 11.3186L26.2592 14.601L20.3735 8.71534V27.1647H15.8461ZM4.52745 36.2196C3.2824 36.2196 2.21656 35.7763 1.32994 34.8897C0.443313 34.003 0 32.9372 0 31.6921V24.901H4.52745V31.6921H31.6921V24.901H36.2196V31.6921C36.2196 32.9372 35.7763 34.003 34.8897 34.8897C34.003 35.7763 32.9372 36.2196 31.6921 36.2196H4.52745Z" fill="white" />
                          </svg>
                          Upload Plate
                        </label>
                        <input
                          type="file"
                          id={`uploadPlate_${inputIdStart}`}
                          className="hidden"
                          accept=".png, .jpg, .jpeg"
                          onChange={handleStartSlateUpload}
                          multiple
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {createSlate === 1 && (
                <div className="w-full py-5">
                  <div className="w-full flex flex-wrap place-items-center gap-3">
                    {uplloadedEndSlate.map((logo, index) => (
                      <>
                        <div
                          onClick={() => handleEndSlate(logo.file1)}
                          key={index}
                          className="mx-auto"
                        >
                          <LogoComponent
                            key={index}
                            logo={logo}
                            logos={endSlates}
                            onDelete={handleDeleteEndslate}
                          />
                        </div>
                      </>
                    ))}

                    <div className="w-full mt-3 mb-3 ml-1">
                      <div className="bg-gradient-to-r mx-auto from-gray-300/40 to-gray-500/25 w-[155px] h-[130px] rounded-lg flex justify-center items-center">
                        <label
                          htmlFor={`uploadPlate_${inputIdEnd}`}
                          className="flex flex-col gap-3 text-sm justify-center items-center text-white p-3"
                        >
                          <svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.8461 27.1647V8.71534L9.96039 14.601L6.79117 11.3186L18.1098 0L29.4284 11.3186L26.2592 14.601L20.3735 8.71534V27.1647H15.8461ZM4.52745 36.2196C3.2824 36.2196 2.21656 35.7763 1.32994 34.8897C0.443313 34.003 0 32.9372 0 31.6921V24.901H4.52745V31.6921H31.6921V24.901H36.2196V31.6921C36.2196 32.9372 35.7763 34.003 34.8897 34.8897C34.003 35.7763 32.9372 36.2196 31.6921 36.2196H4.52745Z" fill="white" />
                          </svg>
                          Upload Plate
                        </label>
                        <input
                          type="file"
                          id={`uploadPlate_${inputIdEnd}`}
                          className="hidden"
                          accept=".png, .jpg, .jpeg"
                          onChange={handleEndSlateUpload}
                          multiple
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="w-full flex gap-4 justify-center items-center">
              <Button
                className={` mb-2 font-semibold rounded-full w-32  text-nyx-yellow disabled:hover:cursor-not-allowed  hover:shadow-none   hover:text-black  focus:shadow-glow focus:bg-nyx-yellow focus:text-black ${updateCampaign4.isPending && " bg-nyx-gray-1 hover:bg-nyx-gray-1 border-none"} ${createSlate === 0 && " bg-nyx-gray-1 text-gray-700 hover:bg-nyx-gray-1 border-none"} disabled:cursor-not-allowed`}
                onClick={() => setCreateSlate(0)}
                disabled={updateCampaign4.isPending || createSlate === 0}
              >
                {"Back"}
              </Button>
              {createSlate === 0 ? (<Button
                className={` mb-2 font-semibold rounded-full w-32  text-nyx-yellow disabled:hover:cursor-not-allowed  hover:shadow-none   hover:text-black  focus:shadow-glow focus:bg-nyx-yellow focus:text-black ${updateCampaign4.isPending && " bg-nyx-gray-1 hover:bg-nyx-gray-1 border-none"} ${createSlate === 1 && " bg-nyx-gray-1 text-gray-700 hover:bg-nyx-gray-1 border-none"} disabled:cursor-not-allowed`}
                onClick={() => setCreateSlate(1)}
                disabled={updateCampaign4.isPending || createSlate === 1}
              >
                {"Next"}
              </Button>) : ""}
              {createSlate === 1 ? (<Button
                className={` mb-2 font-semibold rounded-full w-32  text-nyx-yellow disabled:hover:cursor-not-allowed  hover:shadow-none   hover:text-black  focus:shadow-glow focus:bg-nyx-yellow focus:text-black ${updateCampaign4.isPending && " bg-nyx-gray-1 hover:bg-nyx-gray-1 border-none"} disabled:cursor-not-allowed`}
                onClick={nextToGenerateVideoFromText}
                disabled={updateCampaign4.isPending}
              >
                {updateCampaign4.isPending ||
                 mutateVideoGeneration.isPending ||
                 mutateVideo.isPending ||
                 isRefetching 
                 ? <ButtonLoading /> : "Generate"}
              </Button>) : ""}
            </div>
          </div>

          {/* <div className=" mx-auto mb-4 w-full px-4 flex justify-center mt-2">
            <Button
              className={`${generate == 0
                ? " bg-nyx-gray-1 rounded-full  font-semibold border-nyx-gray-1 text-black hover:bg-nyx-gray-1 cursor-not-allowed"
                : "hover:shadow-none  text-nyx-yellow  font-semibold shadow-sm rounded-full my-2"
                } ${(isLoading ||
                  mutateVideoGeneration.isPending ||
                  mutateVideo.isPending ||
                  isRefetching) &&
                " bg-nyx-gray-1 border-none"
                } px-20 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:shadow-none disabled:hover:bg-nyx-gray-1 `}
              onClick={generateBtn}
              disabled={
                generate == 0 ||
                isLoading ||
                mutateVideoGeneration.isPending ||
                mutateVideo.isPending ||
                isRefetching
              }
            >
              {isLoading ||
                mutateVideoGeneration.isPending ||
                mutateVideo.isPending ||
                isRefetching ? (
                <ButtonLoading />
              ) : (
                "Generate"
              )}
            </Button>
          </div> */}

        </motion.div>

      </div>



    </>
  );
};

export default BrandPainting;
