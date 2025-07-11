"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { nanoid } from "nanoid";
import Button from "@nyx-frontend/main/components/Button";
import DownloadIcon from "@nyx-frontend/main/components/Icons/DownloadSVGIcon";
import DeleteIcon from "@nyx-frontend/main/components/Icons/DeleteIcon";
import CrossIcon from "@nyx-frontend/main/components/Icons/CrossSVGIcon";
import DownArrow from "@nyx-frontend/main/components/Icons/DownArrow";
import EditSVGIcon from "@nyx-frontend/main/components/Icons/EditSVGIcon";
import { addTopPopup, chooseModelpopup } from "@nyx-frontend/main/utils/modalstyles";
import CustomAudio from "./CustomAudioPlayer"
import Modal from "react-modal";
type EditPopUp = {
  onCancel: () => void;
  card: any;
  assetRefetch: () => void;
};
import { editBrandCanvasAssets } from "@nyx-frontend/main/services/asset";
import { useMutation } from "@tanstack/react-query";
import { Divider } from "rsuite";
import ShareIcon from "@nyx-frontend/main/components/Icons/ShareSVGIcon";

function EditPopUp({ card, onCancel, assetRefetch }: EditPopUp) {
  const onCancelHandler = () => {
    onCancel();
  };
  const [popUp, setPopUp] = useState(false);
  const [rename, setRename] = useState(card.name);
  const [showTextArea, setShowTextArea] = useState(true);
  const [workspace, setWorkspace] = useState<any>("");
  useEffect(() => {
    const work = localStorage.getItem("workspace_name");
    setWorkspace(work);
  }, []);

  const mutateAsset = useMutation({
    mutationKey: ["Edit-Asset"],
    mutationFn: editBrandCanvasAssets,
  });

  const [newName, setNewName] = useState();

  function handleNewName(e: any) {
    setNewName(e.target.value);
  }

  function handleSave() {
    let data = {
      file_id: card.file_id,
      type: "rename",
      new_name: newName,
    };
    setShowTextArea(true);
    mutateAsset.mutate(data, {
      onSuccess: (response) => {
        //@ts-ignore
        setRename(newName);
        assetRefetch();
      },
      onError: (error) => {
        console.error(error);
      },
    });
  }

  function handleDelete() {
    let data = {
      file_id: card.file_id,
      type: "delete",
      new_name: "",
    };
    mutateAsset.mutate(data, {
      onSuccess: (response) => {
        //@ts-ignore
        onCancelHandler();
        assetRefetch();
        setPopUp(false);
      },
      onError: (error) => {
        console.error(error);
      },
    });
  }
  function handleClick(item: any) {
    const imageID = nanoid();
    localStorage.setItem(imageID, item);
    window.open(`/apphome/${workspace}/brand-canvas?imageID=${imageID}`);
  }
  function handlePopup(i: string) {
    setPopUp(true);
  }
  function formatDate(isoString: string) {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const date = new Date(isoString);
    return date.toLocaleDateString(undefined, options);
  }
  return (
    <div className=" relative flex items-center flex-col">
      <div className="absolute top-2 right-4">
        <button className="cursor-pointer" onClick={onCancelHandler}>
          <CrossIcon className="w-3 h-3" />
        </button>
      </div>
      <div className="w-full mt-8 flex justify-between relative">
        <div className="flex mb-[12px] text-[14px] lg:text-[18px]   text-white">
          <div>
            {showTextArea ? (
              <>
                <div className="flex gap-3">
                  <p className="text-white font-[400] text-[14px]">{rename}</p>
                  <EditSVGIcon
                    onClick={() => setShowTextArea(false)}
                    className="w-4 h-4 mt-1 cursor-pointer"
                  />
                </div>
              </>
            ) : (
              <div className="flex gap-2 justify-between items-center">
                <input
                  type="text"
                  value={newName}
                  className="w-full rounded-lg bg-transparent border-2 border-nyx-yellow  text-white"
                  onChange={handleNewName}
                />
                <Button
                  className="flex-1 shadow-sm shadow-nyx-yellow px-2 text-xs"
                  onClick={handleSave}
                >
                  Save
                </Button>
              </div>
            )}
          </div>
        </div>
        <div className="flex mb-[12px] text-[14px] lg:text-[20px]   text-white">
          {formatDate(card.created_at)}
        </div>
      </div>
      <div className={`flex justify-center w-full  mt-6  mb-5"}`}>
        {card.type === "Images" && (
          <img
            src={card.file_details.signed_image_url}
            alt="Image"
            width={418}
            height={418}
            className="rounded-md w-auto max-w-full min-h-[418px] max-h-[460px]"
          ></img>
        )}
        {card.type === "Videos" && (
          <>
            <video
              src={card.file_details.signed_video_url}
              controls
              width={300}
              height={300}
              className="rounded-md w-auto max-w-full min-h-[418px] max-h-[460px]"
            ></video>
          </>
        )}
        {card.type === "Music" && (
          <div className="w-[800px]">
            <CustomAudio
              url={card.file_details.original_song_url}
              name={card.name}
            />
          </div>
        )}
      </div>
      {card.type !== "Music" && (
        <div className="bg-[#50387B] flex items-center justify-center text-white w-[659px] h-[50px] rounded-xl text-base pl-5 m-10 mt-5 mb-2">
          <div className="relative flex  items-center justify-between gap-x-2  font-normal text-[14px] leading-[22px] text-center px-10">
            <div className="flex justify-between border border-[#FFCB54] rounded-full p-2 cursor-default">
              <div
                className="text-nyx-yellow overflow-hidden"
                onClick={() => handleClick(card.file_details.signed_image_url)}
              >
                Edit with Brand Canvas
              </div>
            </div>
            <button className=" flex justify-center  items-center border rounded-full p-1 h-6 w-6">
              <DownloadIcon className="w-3 h-3" />
            </button>
            <button className="flex justify-center  items-center border rounded-full p-1 h-6 w-6">
              <DeleteIcon
                onClick={() => handlePopup("DELETE")}
                className="w-3 h-3"
              />
            </button>
          </div>
        </div>
      )}

      {card.type === "Music" && (
        <div className="w-full flex justify-between mt-5">
          <div className="flex gap-x-4 text-[14px] ">
            <div className="flex w-fit justify-between items-center border border-[#FFCB54] rounded-full p-2 text-white cursor-pointer ">
              Analyse your music
            </div>
            <div className="flex w-fit justify-between items-center border border-[#FFCB54] rounded-full p-2 text-white cursor-pointer ">
              Enhance your music
            </div>
            <div className="flex w-fit justify-between items-center border border-[#FFCB54] rounded-full p-2 text-white cursor-pointer ">
              Predict Song&apos;s Likability
            </div>
          </div>
          <div className="flex gap-x-2">
            <div className="p-3 rounded-full border border-white w-fit"><DownloadIcon className="w-4 h-4"/></div>
            <div className="p-3 rounded-full border border-white w-fit"><ShareIcon className="w-4 h-4"/></div>
          </div>
        </div>
      )}

      {popUp && (
        <Modal
          isOpen={popUp}
          className=""
          style={addTopPopup}
          onRequestClose={() => setPopUp(false)}
          ariaHideApp={false}
        >
          <div>
            {" "}
            <div className="flex justify-between mt-5">
              <div className="text-xl font-bold text-[#FFFFFF]">Delete</div>

              <div
                className="pr-3 cursor-pointer"
                onClick={() => {
                  setPopUp(false);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path
                    fill="#FFFFFF"
                    d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0s-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.39-.39.39-1.02 0-1.4z"
                  />
                </svg>
              </div>
            </div>
            <div className="w-full my-5">
              <p className="w-full text-center text-[#FFFFFF] text-base">
                Are you sure you want to delete this Asset?
              </p>
            </div>
            <div className="w-full flex gap-4 mb-5 justify-center items-center">
              <Button
                className="rounded-full w-40"
                onClick={() => {
                  setPopUp(false);
                }}
              >
                Cancel
              </Button>
              <Button
                className="rounded-full w-40"
                onClick={() => {
                  handleDelete();
                  setPopUp(false);
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default EditPopUp;
