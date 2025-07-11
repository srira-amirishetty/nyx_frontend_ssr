import React, { useState } from "react";
import { useForm } from "react-hook-form";
import CrossIcon from "../../image-craft-ai/text-to-image/_components/CrossIcon";

import { MODELS_POPUP_TRYON } from "@nyx-frontend/main/utils/utils";
import Select from "react-select";
import {
  city,
  gender,
  ageGroup,
  size_category,
  indiaRegion,
} from "@nyx-frontend/main/app/apphome/constants";
import { welcomePopUpStyle } from "@nyx-frontend/main/utils/modalstyles";
import UploadButton from "./UploadButton";
import TopFrontSVG from "./TopFrontSVG";
import TopBackSVG from "./TopBackSVG";
import OnePieceFrontSVG from "./OnePieceFrontSVG";
import { welcomePopupStyles } from "@nyx-frontend/main/app/apphome/optionStyles";
import Image from "next/image";
import Toggle from "./Toggle";
import { addTopPopup, chooseModelpopup } from "@nyx-frontend/main/utils/modalstyles";
import Modal from "react-modal";
import AddTop from "./AddTop";
import Button from "@nyx-frontend/main/components/Button";
import AddBottom from "./AddBottom";
import AddApparel from "./AddApparel";
import ModelPop from "./ModelPop";

type KitPopUp = {
  onCancel: () => void;
  disabled: boolean;
  fashionKitId:any;

};

function KitPopUp({ onCancel, disabled,fashionKitId }: KitPopUp) {
    const [selectedValue, setSelectedValue] = useState("two piece");
    const [isOpen, setIsOpen] = useState(false);
    const [topPopup, setTopPopup] = useState(false);
    const [bottomPopup, setBottomPopup] = useState(false);
    const[ApparelPopup,setApparel]=useState(false)
    const[modelPop,setModel]=useState(false)

  const handleToggleChange = (value: any) => {
    setSelectedValue(value);
    console.log(value);
  };

  const onCancelTopPopup = () => {
    setTopPopup(false);
  };

      const refetch=()=>{
        console.log("refetch when API is available")
      }

      const modelsRefetch=()=>{
        console.log("models refetch done here")
      }

  return (
    <>
      <div>
        <div className="flex flex-col">
          <div className="flex  justify-between flex-row">
            <div className=" font-bold text-white  text-[24px] ">
              Fashion Kit Listing
            </div>
            <button className="cursor-pointer" onClick={onCancel}>
              <CrossIcon className="w-6 h-6 text-white" />
              <span className="sr-only">Close</span>
            </button>
          </div>

          <div className="w-full relative mt-4">
            <label
              htmlFor="name"
              className="flex mb-[12px] text-[18px] lg:text-[14px] font-light w-full text-white"
            >
              Fashion Kit Name
              <span className="text-[12px] mt-1 text-[#FF0000]">*</span>
            </label>
            <input
              type="text"
              id="name"
              placeholder="Kurta"
              className="text-[12px] text-white lg:text-[14px] w-full h-[40px] border border-[#8297BD] rounded-[4px] px-4 bg-[#ECECEC16] focus:outline-none autofill active:text-[#FFFFFF]"
            />
          </div>

          <div className="flex flex-col text-white">
            <Toggle
              id={3}
              value={selectedValue}
              onChange={handleToggleChange}
              option1="one piece"
              option2="two piece"
            />

            {/* ADD TOP */}
            {selectedValue === "two piece" ? (
              <>
                <div className="w-full mt-6">
                  <p>Add Top</p>
                  <hr className="flex flex-col items-center justify-center w-full border-t border-[#999999] my-1" />
                  <div className="bg-[#50387B] w-[136px] h-[100px] rounded-t-lg mt-4">
                    <div className="flex flex-col justify-center items-center w-[136px] h-[100px]">
                      <button
                        className="border border-nyx-yellow text-nyx-yellow transition-all rounded-full p-3"
                        onClick={() => {
                          setTopPopup(true);
                        }}
                      >
                        <svg
                          viewBox="0 0 17 17"
                          className="w-4 h-4 fill-current text-nyx-yellow"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M15.14 8.5a.797.797 0 0 1-.796.797H9.297v5.047a.797.797 0 0 1-1.594 0V9.297H2.656a.797.797 0 0 1 0-1.594h5.047V2.656a.797.797 0 0 1 1.594 0v5.047h5.047a.797.797 0 0 1 .797.797Z" />
                        </svg>
                      </button>
                    </div>
                    <div className="bg-[#1E1239] text-center p-2 rounded-b-lg">
                      <p>Add New</p>
                    </div>
                  </div>
                </div>

                {/* ADD BOTTOM */}
                <div className="w-full mt-[80px]">
                  <p>Add Bottom</p>
                  <hr className="flex flex-col items-center justify-center w-full border-t border-[#999999] my-1" />
                  <div className="bg-[#50387B] w-[136px] h-[100px] rounded-t-lg mt-4">
                    <div className="flex flex-col justify-center items-center w-[136px] h-[100px]">
                      <button
                        className="border border-nyx-yellow text-nyx-yellow transition-all rounded-full p-3"
                        onClick={() => {
                          setBottomPopup(true);
                        }}
                      >
                        <svg
                          viewBox="0 0 17 17"
                          className="w-4 h-4 fill-current text-nyx-yellow"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M15.14 8.5a.797.797 0 0 1-.796.797H9.297v5.047a.797.797 0 0 1-1.594 0V9.297H2.656a.797.797 0 0 1 0-1.594h5.047V2.656a.797.797 0 0 1 1.594 0v5.047h5.047a.797.797 0 0 1 .797.797Z" />
                        </svg>
                      </button>
                    </div>
                    <div className="bg-[#1E1239] text-center p-2 rounded-b-lg">
                      <p>Add New</p>
                    </div>
                  </div>
                </div>

                {/* CHOOSE MODEL */}
                <div className="w-full mt-[80px]">
                  <p>Choose Model</p>
                  <hr className="flex flex-col items-center justify-center w-full border-t border-[#999999] my-1" />
                  <div className="bg-[#50387B] w-[136px] h-[100px] rounded-t-lg mt-4">
                    <div className="flex flex-col justify-center items-center w-[136px] h-[100px]">
                      <button
                        className="border border-nyx-yellow text-nyx-yellow transition-all rounded-full p-3"
                        onClick={() => {
                          setModel(true);
                        }}
                      >
                        <svg
                          viewBox="0 0 17 17"
                          className="w-4 h-4 fill-current text-nyx-yellow"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M15.14 8.5a.797.797 0 0 1-.796.797H9.297v5.047a.797.797 0 0 1-1.594 0V9.297H2.656a.797.797 0 0 1 0-1.594h5.047V2.656a.797.797 0 0 1 1.594 0v5.047h5.047a.797.797 0 0 1 .797.797Z" />
                        </svg>
                      </button>
                    </div>
                    <div className="bg-[#1E1239] text-center p-2 rounded-b-lg">
                      <p>Add New</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-row justify-center items-center gap-4 mt-16 ">
                  <Button className="rounded-full w-32">Cancel</Button>
                  <Button className="rounded-full w-32 bg-nyx-yellow text-black">
                    Save
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="w-full mt-6">
                  <p>Add Apparel</p>
                  <hr className="flex flex-col items-center justify-center w-full border-t border-[#999999] my-1" />
                  <div className="bg-[#50387B] w-[136px] h-[100px] rounded-t-lg mt-4">
                    <div className="flex flex-col justify-center items-center w-[136px] h-[100px]">
                      <button
                        className="border border-nyx-yellow text-nyx-yellow transition-all rounded-full p-3"
                        onClick={() => {
                          setApparel(true);
                        }}
                      >
                        <svg
                          viewBox="0 0 17 17"
                          className="w-4 h-4 fill-current text-nyx-yellow"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M15.14 8.5a.797.797 0 0 1-.796.797H9.297v5.047a.797.797 0 0 1-1.594 0V9.297H2.656a.797.797 0 0 1 0-1.594h5.047V2.656a.797.797 0 0 1 1.594 0v5.047h5.047a.797.797 0 0 1 .797.797Z" />
                        </svg>
                      </button>
                    </div>
                    <div className="bg-[#1E1239] text-center p-2 rounded-b-lg">
                      <p>Add New</p>
                    </div>
                  </div>
                </div>

                {/* ADD BOTTOM */}

                {/* CHOOSE MODEL */}
                <div className="w-full mt-[80px]">
                  <p>Choose Model</p>
                  <hr className="flex flex-col items-center justify-center w-full border-t border-[#999999] my-1" />
                  <div className="bg-[#50387B] w-[136px] h-[100px] rounded-t-lg mt-4">
                    <div className="flex flex-col justify-center items-center w-[136px] h-[100px]">
                      <button
                        className="border border-nyx-yellow text-nyx-yellow transition-all rounded-full p-3"
                        onClick={() => {
                          setModel(true);
                        }}
                      >
                        <svg
                          viewBox="0 0 17 17"
                          className="w-4 h-4 fill-current text-nyx-yellow"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M15.14 8.5a.797.797 0 0 1-.796.797H9.297v5.047a.797.797 0 0 1-1.594 0V9.297H2.656a.797.797 0 0 1 0-1.594h5.047V2.656a.797.797 0 0 1 1.594 0v5.047h5.047a.797.797 0 0 1 .797.797Z" />
                        </svg>
                      </button>
                    </div>
                    <div className="bg-[#1E1239] text-center p-2 rounded-b-lg">
                      <p>Add New</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-row justify-center items-center gap-4 mt-16 ">
                  <Button className="rounded-full w-32">Cancel</Button>
                  <Button className="rounded-full w-32 bg-nyx-yellow text-black">
                    Save
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

        {topPopup ? (
          <Modal
            isOpen={topPopup}
            className=""
            style={addTopPopup}
            onRequestClose={onCancelTopPopup}
            ariaHideApp={false}
          >
            <AddTop onCancel={onCancelTopPopup} disabled={false} fashionKitId={fashionKitId} refetch={refetch} mode="add" topData={null}/>
          </Modal>
        ) : null}

{bottomPopup ? (
          <Modal
            isOpen={bottomPopup}
            className=""
            style={addTopPopup}
            onRequestClose={() => setBottomPopup(false)}
            ariaHideApp={false}
          >
            <AddBottom onCancel={() => setBottomPopup(false)} disabled={false} fashionKitId={fashionKitId} refetch={refetch} mode="add" bottomData={null}/>
          </Modal>
        ) : null}


{ApparelPopup ? (
          <Modal
            isOpen={ApparelPopup}
            className=""
            style={addTopPopup}
            onRequestClose={()=>setApparel(false)}
            ariaHideApp={false}
          >
            <AddApparel onCancel={()=>setApparel(false)} disabled={false} fashionKitId={fashionKitId} refetch={refetch} mode="add" onePieceData={null} />
          </Modal>
        ) : null}

        {modelPop ? (
          <Modal
            isOpen={modelPop}
            className=""
            style={chooseModelpopup}
            onRequestClose={()=>setModel(false)}
            ariaHideApp={false}
          >
            <ModelPop onCancel={()=>setModel(false)} disabled={false} fashionKitId={fashionKitId} modelsRefetch={modelsRefetch} mode="add" modelData={null}  />
          </Modal>
        ) : null}

   </>
  );
}

export default KitPopUp;
