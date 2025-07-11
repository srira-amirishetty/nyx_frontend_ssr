/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import { BRAND_TABS_Three } from "@nyx-frontend/main/utils/productConstants";
import Button from "@nyx-frontend/main/components/Button";
import { IMAGE_URL } from "@nyx-frontend/main/components/constants";
import { useMutation } from "@tanstack/react-query";
import { updateTextToVideo } from "@nyx-frontend/main/services/videoGenerationServices";
import { toast } from "react-toastify";



const music = IMAGE_URL + "/assets/textvideo/musicSymbol.svg";
const upload = IMAGE_URL + "/assets/textvideo/upArrow.svg";

const VideoSettings = ({ tab, setBrandTab,campaignId,settingGen ,brandPaintDone}) => {
  const [btnVal, setBtn] = useState(0);
  const[bgmsc,setBgmsc]=useState(null);
  const[bgVal,setBgval]=useState(null);
  const[uploadAudio,setuploadAudio]=useState(null);


  const chngebtn=(e)=>{
    setBgmsc(e.target.value)
    setBgval(e.target.value)

  }


  const clearAll=()=>{
    setBgmsc(null)
  }
  const nextGenerate1=()=>{
    
      if(bgmsc==null){
        setBtn(1);
      }
      else if(bgmsc!=null && uploadAudio!=null){
        toast.error("Choose either Royalty Free or Upload your own music")
      }
      else{

        const data = new FormData();
        data.append("background_music[is_royalty_free]","yes")
        data.append("background_music[audio_url]",bgmsc)
        

        const args={campaignId,data};
        
        updateCampaign5.mutate(args, {
        onSuccess: (response) => {
          
          toast.success("You can generate your Video")
          settingGen(1);
          
        
        },
        onError: (res) => {
          toast.error("Something went wrong")
        },
      });

      }
    }
  

  const nextGenerate=()=>{
      if(uploadAudio==null){
        
        const data={
          "background_music": {
          }
        }
        

        const args={campaignId,data};
        
        updateCampaign5.mutate(args, {
        onSuccess: (response) => {
          
          toast.success("You can generate your Video")
          settingGen(1);
         
        
        },
        onError: (res) => {
          console.log(res)
        },
      });
      }
      else if(bgmsc!=null && uploadAudio!=null){
        toast.error("Choose either Royalty Free or Upload your own music")
      }
      else{
        const data = new FormData();
        data.append("background_music[is_royalty_free]","no")
        data.append("background_music[audio_url]",uploadAudio)
        

        const args={campaignId,data};
        
        updateCampaign5.mutate(args, {
        onSuccess: (response) => {
          
          toast.success("You can generate your Video")
          settingGen(1);
         
        
        },
        onError: (res) => {
          console.log(res)
        },
      });
      }

    }
    
  

  const updateCampaign5 = useMutation({
    mutationKey: ["Update-campaign5"],
    mutationFn: updateTextToVideo,
  });

const handleMusic=(e)=>{
  const file=e.target.files[0];
  setuploadAudio(file);
}


const handleRemoveFile=()=>{
  setuploadAudio(null);
}
  

const handleTab=()=>{
  if(brandPaintDone){
    setBrandTab(BRAND_TABS_Three.BACKGROUND)
  }else{
    toast.error("Please Complete Brand Painting First");
  }
}
  return (
    <>
      <div className="bg-[#3B226F] rounded-lg">
        <h2 className="mb-0">
          <div
            className={`${
              tab === BRAND_TABS_Three.BACKGROUND
            } group relative flex w-full items-center border-0 px-5 py-4 text-left text-base cursor-pointer bg-[#3B226F] text-[#FFFFFF] rounded-lg`}
            onClick={handleTab}
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            <div className="flex w-full justify-between items-center">
              <div
                className={`w-[50%] md:w-full font-semibold flex ${
                  tab === BRAND_TABS_Three.BACKGROUND
                    ? "text-[#FFCB54] text-base"
                    : "text-[#FFFFFF] text-sm"
                }`}
              >
                Background Music
              </div>
            </div>

            <span
              className={`${
                tab === BRAND_TABS_Three.BACKGROUND
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
            height: tab === BRAND_TABS_Three.BACKGROUND ? "auto" : 0,
            opacity: 1,
          }}
          exit={{
            height: 0,
            opacity: 0,
          }}
          className={clsx(`bg-[#3B226F] w-full overflow-hidden rounded-lg`)}
        >
          <div className="py-2 md:px-7 sm:px-4">
            <div className="flex flex-col gap-3">
              <div className="flex flex-row justify-center gap-3">
                <div>
                  <button
                    className={`${
                      btnVal == 0
                        ? ` bg-[#00D8D8] font-bold text-black  border-0 rounded-md p-2`
                        : `border rounded-md p-2 border-[#8297BD] font-light text-white `
                    }`}
                    onClick={() => setBtn(0)}
                  >
                    Royalty Free Music{" "}
                  </button>
                </div>
                <div>
                  <button
                    className={`${
                      btnVal == 1
                        ? ` bg-[#00D8D8] font-bold text-black  border-0 rounded-md p-2`
                        : `border rounded-md p-2 border-[#8297BD] font-light text-white `
                    }`}
                    onClick={() => {
                      setBtn(1);
                    }}
                  >
                    Upload Audio
                  </button>
                </div>
              </div>

              {btnVal == 0 && (
                <>
                <div className="w-full flex flex-col gap-3 mt-2">
                    
                  <div className="py-[6px] px-[10px]  relative flex items-center gap-[12px] bg-[#4A2B89] rounded-[4px] h-10 ">
                    <input
                      id="song1"
                      type="radio"
                      value="http://fidelak.free.fr/reprises/The%20Doors%20-%20People%20are%20Strange.mp3"
                      name="bgmusic"
                  
                      checked={bgmsc=="http://fidelak.free.fr/reprises/The%20Doors%20-%20People%20are%20Strange.mp3"}
                      onChange={chngebtn}
                      className="cursor-pointer  appearance-none bg-transparent w-4 h-4 border-2 border-nyx-white-1 rounded-full checked:bg-nyx-yellow checked:border-nyx-white-1 focus:outline-nyx-white-1"
                    />
                    <label htmlFor="song1">
                      <p className="cursor-pointer text-sm font-normal text-white">
                        Song 1
                      </p>
                    </label>
                    <div>
                      <img
                        className="absolute right-2 top-3 bottom-2"
                        height={"18px"}
                        width={"18px"}
                        src={music}
                        alt="music"
                      />
                    </div>
                  </div>

                  <div className="py-[6px] px-[10px] relative flex items-center gap-[12px] bg-[#4A2B89] rounded-[4px]  h-10">
                    <input
                      id="song2"
                      type="radio"
                      value="song2"
                      name="bgmusic"
                     
                      checked={bgmsc=="song2"}
                      onChange={chngebtn}
                      className="cursor-pointer  appearance-none bg-transparent w-4 h-4 border-2 border-nyx-white-1 rounded-full checked:bg-nyx-yellow checked:border-nyx-white-1 focus:outline-nyx-white-1"
                    />
                    <label htmlFor="song2">
                      <p className="cursor-pointer text-sm font-normal text-white">
                        Song 2
                      </p>
                    </label>
                    <div>
                      <img
                        className="absolute right-2 top-3 bottom-2"
                        height={"18px"}
                        width={"18px"}
                        src={music}
                        alt="music"
                      />
                    </div>
                  </div>

                  <div className="py-[6px] px-[10px] relative flex items-center gap-[12px] bg-[#4A2B89] rounded-[4px] h-10">
                    <input
                      id="song3"
                      type="radio"
                      name="bgmusic"
                    
                      checked={bgmsc=="song3"}
                      onChange={chngebtn}
                      value="song3"
                      className="cursor-pointer  appearance-none bg-transparent w-4 h-4 border-2 border-nyx-white-1 rounded-full checked:bg-nyx-yellow checked:border-nyx-white-1 focus:outline-nyx-white-1"
                    />
                    <label htmlFor="song3">
                      <p className="cursor-pointer text-sm font-normal text-white">
                        Song 3
                      </p>
                    </label>
                    <div>
                      <img
                        className="absolute right-2 top-3 bottom-2"
                        height={"18px"}
                        width={"18px"}
                        src={music}
                        alt="music"
                      />
                    </div>
                  </div>

                  <div className="py-[6px] px-[10px] relative flex items-center gap-[12px] bg-[#4A2B89] rounded-[4px]  h-10">
                    <input
                      id="song4"
                      type="radio"
                      name="bgmusic"
                      
                      value="song4"
                      checked={bgmsc=="song4"}
                      onChange={chngebtn}
                      className="cursor-pointer  appearance-none bg-transparent w-4 h-4 border-2 border-nyx-white-1 rounded-full checked:bg-nyx-yellow checked:border-nyx-white-1 focus:outline-nyx-white-1"
                    />
                    <label htmlFor="song4">
                      <p className="cursor-pointer text-sm font-normal text-white">
                        Song 4
                      </p>
                    </label>
                    <div>
                      <img
                        className="absolute right-2 top-3 bottom-2"
                        height={"18px"}
                        width={"18px"}
                        src={music}
                        alt="music"
                      />
                    </div>
                    
                  </div>

                 
                </div>
                <div className="flex flex-row-reverse">
                  <div className="flex reverse border border-transparent text-white hover:cursor-pointer hover:border hover:bg-[#4A2B89] p-1 rounded-lg" onClick={clearAll}>Reset</div>

                </div>
                <div className="w-full flex justify-center items-center gap-3 my-5">
                    
                    <Button className={`${bgmsc==null?"rounded-full w-40 text-[#F1BB2E]":"rounded-full w-40  bg-nyx-yellow text-black"}`} onClick={nextGenerate1}>
                      {bgmsc==null ? "Next":"Save"}
                    </Button>
                  </div>


                  
                </>
              )}
              {btnVal == 1 && (
                <>
                  {uploadAudio ? (
                  <div className="bg-[#5E32FF]  rounded-md p-3 relative">
                    {uploadAudio?.name}
                    <div >
                    <button
              className="absolute top-1 right-1 bg-black text-white rounded-full p-1 m-2 focus:outline-none"
              onClick={handleRemoveFile}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
                    </div>
                  </div>
                  ) :(

                  <div className="h-[177px] w-full rounded-md m-auto bg-gradient-to-r from-gray-300/40 to-gray-500/25 flex justify-center flex-col items-center z-0  gap-1">
                    <div>
                      <label htmlFor="upload">
                        <img
                          src={upload}
                          alt="upload-audio"
                          className="cursor-pointer"
                        />
                      </label>
                      <input type="file" className="hidden" id="upload" accept="audio/mp3" onChange={handleMusic}></input>
                    </div>
                    <div className="text-[#FFFFFF] z-50 text-[15px]/[12px] font-semibold">
                      Drop your audio here
                    </div>
                  </div>
                  )
                  }
              
                  <div className="w-full flex justify-center items-center gap-3 my-5">
                    <Button className="rounded-full w-40 text-[#F1BB2E]" onClick={()=>setBtn(0)}>
                      Back
                    </Button>
                    <Button className="rounded-full w-40  bg-nyx-yellow text-black" onClick={nextGenerate}>
                      Save
                    </Button>
                  </div>
                </>
              )}
              
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default VideoSettings;
