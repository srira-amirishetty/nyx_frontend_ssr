"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import CrossIcon from "../../image-craft-ai/text-to-image/_components/CrossIcon";
import { Button } from "rsuite";
import UploadButton from "./UploadButton";
import TopFrontSVG from "./TopFrontSVG";
import TopBackSVG from "./TopBackSVG";
import OnePieceFrontSVG from "./OnePieceFrontSVG";
import { deleteApparel, UploadApparel } from "@nyx-frontend/main/services/virtual-tryon";
import { useMutation } from "@tanstack/react-query";
import ButtonLoading from "@nyx-frontend/main/components/ButtonLoading";

type AddApparel = {
  onCancel: () => void;
  disabled: boolean;
  fashionKitId: any;
  refetch: any;
  mode: "add" | "edit";
  onePieceData?: any;
  setApparelsArray?: any;
};

function AddApparel({
  onCancel,
  disabled,
  fashionKitId,
  refetch,
  onePieceData,
  mode,
  setApparelsArray,
}: AddApparel) {
  const [Front, setFront] = useState(null);
  const [Back, setBack] = useState(null);
  const [apparelName, setApparelName] = useState("");
  const [apparelDelete, setapparelDelete] = useState(false);
  // const [apparelsArray, setApparelsArray] = useState<any[]>([]);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (mode === "edit" && onePieceData) {
      setApparelName(onePieceData.name);
      const topBackPhoto = onePieceData.photos.find(
        (photo: { file_top_back?: string }) => photo.file_top_back,
      );
      if (topBackPhoto) {
        setBack(topBackPhoto.file_top_back);
      }

      // Find the photo URL for topFront
      const topFrontPhoto = onePieceData.photos.find(
        (photo: { file_top_front?: string }) => photo.file_top_front,
      );
      if (topFrontPhoto) {
        setFront(topFrontPhoto.file_top_front);
      }
    }
  }, [mode, onePieceData]);

  // useEffect(() => {
  //   console.log("Updated apparelsArray:", apparelsArray);
  // }, [apparelsArray]);

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const onCancelHandler = () => {
    // reset();
    onCancel();
  };

  const handleNextClick = () => {
    if (Front && Back) {
      const data = new FormData();
      const photos: { [key: string]: string }[] = []; // Define the type for the photos array

      // Append the name to the FormData
      data.append("name", apparelName);

      // Append the workspace_id if it exists in localStorage
      const workspaceId = localStorage.getItem("workspace_id");
      if (workspaceId) {
        data.append("workspace_id", workspaceId);
      }

      data.append("fashion_kit_id", fashionKitId ? fashionKitId : null);
      data.append("apparel_type", "ONE_PIECE");
      data.append("apparel_position", "TOP");
      if (mode === "edit") {
        data.append("apparel_id", onePieceData.id);
      }

      // Function to append files or add URLs to the photos array
      const appendFileOrPhoto = (key: string, file: any, photoKey: string) => {
        if (file instanceof Object) {
          data.append(key, file);
        } else {
          const photoEntry: { [key: string]: string } = {};
          photoEntry[photoKey] = file;
          photos.push(photoEntry);
        }
      };

      // Append the top front and back files/photos
      appendFileOrPhoto("file_top_front", Front, "file_top_front");
      appendFileOrPhoto("file_top_back", Back, "file_top_back");

      // If there are any URLs in the photos array, append the array as a JSON string to FormData
      if (photos.length > 0) {
        data.append("photos", JSON.stringify(photos));
      }

      // Log the FormData contents to the console
      console.log("FormData contents:");
      mutatetopUpload.mutate(data, {
        onSuccess: (response) => {
          // console.log(response);
          refetch();
          onCancel();
          if(setApparelsArray){

            setApparelsArray((currentApparels:any) => [...currentApparels, response]);
          }
        },
        onError: (res) => {
          console.log(res);
        },
      });
      // data.forEach((value, key) => {
      //   console.log(key, value);
      // });
    } else {
      console.error("Cannot proceed before uploading both product images");
    }
  };

  // useEffect(() => {
  //   console.log("Apparels Array=", apparelsArray);
  // }, [apparelsArray]);

  // useEffect(() => {
  //   console.log("Updated apparelsArray:", apparelsArray);
  //   setApparelsArray(apparelArray);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const mutatetopUpload = useMutation({
    mutationKey: ["upload-One-piece"],
    mutationFn: UploadApparel,
  });

  const mutatedeleteApparel = useMutation({
    mutationKey: ["delete-onepiece"],
    mutationFn: deleteApparel,
  });

  const deleteApparelEdit = () => {
    setapparelDelete(true);
    const data = new FormData();
    data.append("fashion_kit_id", onePieceData.fashion_kit_id);
    data.append("workspace_id", onePieceData.workspace_id);
    data.append("apparel_id", onePieceData.id);

    mutatedeleteApparel.mutate(data, {
      onSuccess: (response) => {
        setapparelDelete(false);
        console.log("response :", response);
        refetch();
        onCancel();
        if(setApparelsArray){

          setApparelsArray((prevArray:any) => prevArray.filter((item:any) => item.id !== onePieceData.id));
        }
      },
      onError: (error) => {
        setapparelDelete(false);
        console.error(error);
      },
    });
  };

  return (
   
      <div className="flex flex-col">
        <div className="flex items-end justify-end">
          {mode === "edit" && (
            <button
              className="pr-3 cursor-pointer"
              onClick={() => deleteApparelEdit()}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 21C6.45 21 5.97917 20.8042 5.5875 20.4125C5.19583 20.0208 5 19.55 5 19V6H4V4H9V3H15V4H20V6H19V19C19 19.55 18.8042 20.0208 18.4125 20.4125C18.0208 20.8042 17.55 21 17 21H7ZM17 6H7V19H17V6ZM9 17H11V8H9V17ZM13 17H15V8H13V17Z"
                  fill="white"
                />
              </svg>
            </button>
          )}
          <button className="cursor-pointer" onClick={onCancelHandler}>
            <CrossIcon className="w-6 h-6 text-white" />
            <span className="sr-only">Close</span>
          </button>
        </div>
        <div className="w-full relative">
          <label
            htmlFor="name"
            className="flex mb-[12px] text-[14px] lg:text-[14px] font-bold w-full text-white"
          >
             Name
            {errors.name && (
              <span className="text-[12px] mt-1 text-[#FF0000]">*</span>
            )}
          </label>
          <input
            type="text"
            id="name"
            placeholder="White fork"
            value={apparelName}
            onChange={(e) => setApparelName(e.target.value)}
            className="text-[12px] text-white lg:text-[14px] w-full h-[40px] border border-[#8297BD] rounded-[4px] px-4 bg-[#ECECEC16] focus:outline-none autofill active:text-[#FFFFFF]"
          />
        </div>
        <div
          className={`flex justify-center gap-7 mt-6 ${Front !== null && Back !== null && "mb-5"}`}
        >
          <UploadButton
            id="topfront"
            setUploadedFile={setFront}
            disabled={disabled}
            uploadedFile={Front}
            BackgroundSvg={OnePieceFrontSVG}
            title={"Full body front"}
            svgStyle={{
              position: "absolute",
              top: "15%",
              left: "5%",
              width: "90%",
              height: "75%",
              zIndex: 0,
            }}
          />
          <UploadButton
            id="topback"
            setUploadedFile={setBack}
            disabled={disabled}
            uploadedFile={Back}
            BackgroundSvg={OnePieceFrontSVG}
            title={"Full body back"}
            svgStyle={{
              position: "absolute",
              top: "15%",
              left: "5%",
              width: "90%",
              height: "75%",
              zIndex: 0,
            }}
          />
        </div>

        {(Front === null || Back === null) && (
          <div className="text-white text-base pl-5 m-10 mt-5 mb-5">
            <div className="relative mb-2 font-normal text-[14px] leading-[22px] text-center px-10">
              Please upload a transparent/individual image of your apparel. From
              the same side as that of model.
            </div>
          </div>
        )}
        <div className="w-full flex justify-center items-center gap-3 mb-5">
          <Button
            className="rounded-full border border-nyx-yellow text-nyx-yellow hover:shadow-none font-semibold h-[37px] w-32"
            onClick={onCancelHandler}
          >
            Cancel
          </Button>

          {mode === "edit" ? (
            <Button
              className={`font-semibold h-[37px] w-32 disabled:bg-nyx-gray-1 disabled:text-black disabled:cursor-not-allowed ${
                Front && Back && apparelName != ""
                  ? `rounded-full hover:shadow-none focus:shadow-glow text-black bg-nyx-yellow cursor-pointer`
                  : `bg-[#8297BD] text-black rounded-full cursor-not-allowed hover:bg-[#8297BD] hover:shadow-transparent border-none`
              }`}
              onClick={handleNextClick}
              disabled={mutatetopUpload.isPending}
            >
              {mutatetopUpload.isPending ? <ButtonLoading /> : "Edit"}
            </Button>
          ) : (
            <Button
              className={`font-semibold h-[37px] w-32 disabled:bg-nyx-gray-1 disabled:text-black disabled:cursor-not-allowed ${
                Front && Back && apparelName != ""
                  ? `rounded-full hover:shadow-none focus:shadow-glow text-black bg-nyx-yellow cursor-pointer`
                  : `bg-[#8297BD] text-black rounded-full cursor-not-allowed hover:bg-[#8297BD] hover:shadow-transparent border-none`
              }`}
              onClick={handleNextClick}
              disabled={mutatetopUpload.isPending}
            >
              {mutatetopUpload.isPending ? <ButtonLoading /> : "Save"}
            </Button>
          )}
        </div>
      </div>
    
  );
}

export default AddApparel;
